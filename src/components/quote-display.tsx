import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { colorSchemes } from '@/constants/color-schemes';
import { fonts } from '@/constants/fonts';
import { QuoteDisplayProps } from '@/types/quote';
import { fetchRandomTags } from '@/utils/fetch-tags';
import { getAIExplanation } from '@/utils/ai-explanation';
import { Quote } from '@/utils/fetch-quote';
import { TagsSkeleton } from './ui/tags-skeleton';
import { QuoteHeader } from './quote-header';
import { QuoteContent } from './quote-content';
import { QuoteExplanation } from './quote-explanation';
import { QuoteActions } from './quote-actions';
import { QuoteRefresh } from './quote-refresh';
import { QuoteCarousel } from './ui/quote-carousel';
import { CarouselSkeleton } from './ui/carousel-skeleton';
import html2canvas from 'html2canvas';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface QuoteResponse {
  content: string;
  author: {
    name: string;
  };
}

export function QuoteDisplay({ quote, loading, onNewQuote }: QuoteDisplayProps) {
  const [currentScheme, setCurrentScheme] = useState(colorSchemes[0]);
  const [currentFont, setCurrentFont] = useState(fonts[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [aiExplanation, setAIExplanation] = useState<string | null>(null);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [isTagsLoading, setIsTagsLoading] = useState(true);
  const [currentQuoteContent, setCurrentQuoteContent] = useState<string | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const quoteImageRef = useRef<HTMLDivElement>(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [tagQuotes, setTagQuotes] = useState<Quote[]>([]);

  const getRandomIndex = (arrayLength: number, lastIndex: number) => {
    let index;
    do {
      index = Math.floor(Math.random() * arrayLength);
    } while (index === lastIndex);
    return index;
  };

  const applyRandomColorScheme = useCallback(() => {
    const randomSchemeIndex = getRandomIndex(colorSchemes.length, colorSchemes.indexOf(currentScheme));
    setCurrentScheme(colorSchemes[randomSchemeIndex]);
  }, [currentScheme]);

  const applyRandomFont = useCallback(() => {
    const randomFontIndex = getRandomIndex(fonts.length, fonts.indexOf(currentFont));
    setCurrentFont(fonts[randomFontIndex]);
  }, [currentFont]);

  const handleNewQuote = async () => {
    setIsRotating(true);
    setIsVisible(false);
    setAIExplanation(null);
    setIsTagsLoading(true);
    
    try {
      // Call onNewQuote without a tag to get a random quote
      onNewQuote();
      applyRandomColorScheme();
      applyRandomFont();
      
      // Fetch new random tags
      const newTags = await fetchRandomTags();
      setSelectedTags(newTags);
      setSelectedTag(null);
      
      setIsVisible(true);
      setIsRotating(false);
    } catch (error) {
      console.error('Error fetching new quote:', error);
      setIsVisible(true);
      setIsRotating(false);
    } finally {
      setIsTagsLoading(false);
    }
  };

  const handleTagClick = async (tag: string) => {
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
    setSelectedTag(tag === selectedTag ? null : tag);
    setIsVisible(false);
    setIsRotating(true);
    setAIExplanation(null);
    
    try {
      // Fetch multiple quotes to check availability
      const response = await fetch(`https://api.quotable.kurokeita.dev/api/quotes/random?limit=10&tags=${formattedTag}`);
      const data = await response.json();
      
      // Check if data is an array, if not, try to access the quotes property
      const quotesArray = Array.isArray(data) ? data : data.quotes || [];
      
      // Count unique quotes by content
      const uniqueQuotes = new Set(quotesArray.map((quote: QuoteResponse) => quote.content));
      const availableQuotesCount = uniqueQuotes.size;
      
      // Log the actual number of unique quotes
      console.log(`Tag "${formattedTag}" has ${availableQuotesCount} unique quotes available`);
      
      if (availableQuotesCount === 1) {
        // If only one quote is available, display it directly
        const firstQuote = quotesArray[0];
        onNewQuote({
          content: firstQuote.content,
          author: firstQuote.author.name
        });
      } else {
        // If multiple quotes are available, take up to 5 unique quotes
        const uniqueQuotesArray = Array.from(uniqueQuotes);
        const quotes = uniqueQuotesArray.slice(0, 5).map(content => {
          const quote = quotesArray.find((q: QuoteResponse) => q.content === content);
          return {
            content: quote.content,
            author: quote.author.name
          };
        });
        
        setTagQuotes(quotes);
        setShowCarousel(true);
      }

      // Apply random color scheme
      applyRandomColorScheme();
    } catch (error) {
      console.error('Error fetching quotes:', error);
      // Fallback to single quote if there's an error
      onNewQuote(formattedTag);
    }
    
    setIsVisible(true);
    setIsRotating(false);
    
    // Refresh random tags, ensuring the selected tag (if any) is included
    setIsTagsLoading(true);
    const newTags = await fetchRandomTags();
    if (selectedTag && !newTags.includes(selectedTag)) {
      newTags[0] = selectedTag;
    }
    setSelectedTags(newTags);
    setIsTagsLoading(false);
  };

  const handleGenerateExplanation = async () => {
    if (!quote) return;
    
    // If we already have an explanation for this quote, don't generate a new one
    if (aiExplanation && currentQuoteContent === quote.content) {
      return;
    }

    setIsGeneratingExplanation(true);
    try {
      const explanation = await getAIExplanation(quote.content, quote.author);
      setAIExplanation(explanation);
      setCurrentQuoteContent(quote.content);
    } catch (error) {
      console.error('Error generating explanation:', error);
      setAIExplanation("Sorry, I couldn't generate an explanation at this time.");
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  const handleShare = async () => {
    if (!quote) return;
    setIsGeneratingImage(true);

    try {
      if (quoteImageRef.current) {
        // Configure html2canvas options for better quality and performance
        const canvas = await html2canvas(quoteImageRef.current, {
          scale: 3, // Increased scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: currentScheme.background,
          logging: false,
          removeContainer: true,
          imageTimeout: 15000,
          onclone: (clonedDoc) => {
            // Ensure fonts are loaded in the cloned document
            const link = clonedDoc.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;700&family=Roboto:wght@400;700&family=Source+Serif+Pro:wght@400;700&family=Fraunces:wght@400;700&family=Lora:wght@400;700&family=IBM+Plex+Sans:wght@400;700&display=swap';
            clonedDoc.head.appendChild(link);

            // Add font-display: block to ensure fonts are rendered immediately
            const style = clonedDoc.createElement('style');
            style.textContent = `
              @font-face {
                font-display: block !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });

        try {
          // Optimize the canvas for JPEG format
          const optimizedCanvas = document.createElement('canvas');
          const ctx = optimizedCanvas.getContext('2d', { alpha: false });
          if (ctx) {
            // Set dimensions for higher quality
            optimizedCanvas.width = 1920;  // Increased width for better quality
            optimizedCanvas.height = 1920; // Increased height for better quality
            
            // Use better image smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw with solid background
            ctx.fillStyle = currentScheme.background;
            ctx.fillRect(0, 0, optimizedCanvas.width, optimizedCanvas.height);
            
            // Draw the original canvas content with crisp rendering
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 
                                 0, 0, optimizedCanvas.width, optimizedCanvas.height);

            // Convert to JPEG with maximum quality
            const imageData = optimizedCanvas.toDataURL('image/jpeg', 1.0);
            
            // Create download link
            const link = document.createElement('a');
            const fileName = `quote-${Date.now()}.jpg`;
            link.download = fileName;
            link.href = imageData;
            link.click();

            // Clean up resources
            URL.revokeObjectURL(link.href);
            canvas.remove();
            optimizedCanvas.remove();
            
            // Show success message
            setShowCopiedMessage(true);
            setTimeout(() => setShowCopiedMessage(false), 2000);
          }
        } catch (error) {
          console.error('Error optimizing image:', error);
          // Fallback to basic canvas download if optimization fails
          const basicImageData = canvas.toDataURL('image/jpeg', 0.9);
          const link = document.createElement('a');
          link.download = `quote-${Date.now()}.jpg`;
          link.href = basicImageData;
          link.click();
          URL.revokeObjectURL(link.href);
          canvas.remove();
        }
      }
    } catch (error) {
      console.error('Error in share process:', error);
      // Fallback to copying text
      try {
        await navigator.clipboard.writeText(`"${quote.content}" - ${quote.author}`);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleQuoteSelect = (selectedQuote: Quote) => {
    // Update the parent component's quote state through onNewQuote
    onNewQuote(selectedQuote);
    setIsVisible(true);
    setShowCarousel(false);
    setIsRotating(false);
  };

  // Update currentQuoteContent when quote changes
  useEffect(() => {
    if (quote) {
      setCurrentQuoteContent(quote.content);
    }
  }, [quote]);

  // Fetch initial tags when component mounts
  useEffect(() => {
    const fetchInitialTags = async () => {
      setIsTagsLoading(true);
      try {
        const newTags = await fetchRandomTags();
        setSelectedTags(newTags);
      } catch (error) {
        console.error('Error fetching initial tags:', error);
      } finally {
        setIsTagsLoading(false);
      }
    };

    fetchInitialTags();
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ 
        backgroundColor: currentScheme.background,
        transition: 'background-color 0.5s ease-in-out'
      }}
    >
      <QuoteHeader currentScheme={currentScheme} />

      <main className="flex-1 flex flex-col items-center p-2 sm:p-4 md:p-8 lg:p-12 mt-20 sm:mt-16 md:mt-14 lg:mt-12 pb-4 sm:pb-8">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-[800px] min-w-[280px] flex flex-col items-center h-full">
          <div className="w-full text-center mb-8 sm:mb-10">
            {isTagsLoading ? (
              <TagsSkeleton style={{ color: currentScheme.text }} />
            ) : (
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
                {selectedTags.map((tag) => (
                  <Tooltip key={tag}>
                    <TooltipTrigger asChild>
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={cn(
                          "px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105",
                          selectedTags.includes(tag) 
                            ? "opacity-100" 
                            : "opacity-50 hover:opacity-100"
                        )}
                        style={{ 
                          backgroundColor: `${currentScheme.text}20`,
                          color: currentScheme.text,
                          border: `1px solid ${currentScheme.text}`,
                          transform: 'translateZ(0)',
                          transition: 'all 0.5s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = currentScheme.text;
                          e.currentTarget.style.color = currentScheme.background;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${currentScheme.text}20`;
                          e.currentTarget.style.color = currentScheme.text;
                        }}
                      >
                        {tag}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" style={{ color: currentScheme.text }}>
                      Show {tag} quotes
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>

          <QuoteContent 
            quote={quote}
            loading={loading}
            isVisible={isVisible}
            currentFont={currentFont}
            currentScheme={currentScheme}
          />

          {quote && (
            <div className="w-full mt-2 sm:mt-4 flex flex-col items-center">
              <QuoteActions
                isGeneratingExplanation={isGeneratingExplanation}
                isGeneratingImage={isGeneratingImage}
                showCopiedMessage={showCopiedMessage}
                currentScheme={currentScheme}
                onGenerateExplanation={handleGenerateExplanation}
                onShare={handleShare}
              />
              
              <QuoteExplanation
                aiExplanation={aiExplanation}
                isGeneratingExplanation={isGeneratingExplanation}
                currentScheme={currentScheme}
              />
            </div>
          )}

          <div className="flex-1 min-h-[4rem]" />

          <QuoteRefresh
            loading={loading}
            isVisible={isVisible}
            isRotating={isRotating}
            isHovering={isHovering}
            currentScheme={currentScheme}
            onNewQuote={handleNewQuote}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />

          {/* Hidden div for image generation */}
          <div 
            ref={quoteImageRef}
            className="fixed -left-[9999px] w-[1080px] h-[1080px] p-16 flex flex-col items-center justify-center relative"
            style={{ 
              backgroundColor: currentScheme.background,
              border: `20px solid ${currentScheme.text}20`,
              boxShadow: `0 0 30px ${currentScheme.text}20`,
              transition: 'all 0.5s ease-in-out'
            }}
          >
            {/* Decorative corner elements */}
            <div 
              className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4"
              style={{ borderColor: currentScheme.text }}
            />
            <div 
              className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4"
              style={{ borderColor: currentScheme.text }}
            />
            <div 
              className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4"
              style={{ borderColor: currentScheme.text }}
            />
            <div 
              className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4"
              style={{ borderColor: currentScheme.text }}
            />

            {/* Quote content */}
            {quote && (
              <div className="w-full text-center relative z-10">
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1"
                  style={{ backgroundColor: currentScheme.text }}
                />
                <p 
                  className={cn(
                    "text-5xl tracking-[0.02em] px-[5%] italic mb-12",
                    currentFont
                  )}
                  style={{ color: currentScheme.text }}
                >
                  &ldquo;{quote.content}&rdquo;
                </p>
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1"
                  style={{ backgroundColor: currentScheme.text }}
                />
                <p 
                  className={cn(
                    "text-2xl text-right mt-8",
                    currentFont
                  )}
                  style={{ color: currentScheme.text }}
                >
                  - {quote.author}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCarousel ? (
        isTagsLoading ? (
          <CarouselSkeleton 
            style={{ 
              backgroundColor: currentScheme.background,
              border: `2px solid ${currentScheme.text}`
            }} 
          />
        ) : (
          <QuoteCarousel
            quotes={tagQuotes}
            currentFont={currentFont}
            currentScheme={currentScheme}
            onQuoteSelect={handleQuoteSelect}
            tag={selectedTag || ''}
          />
        )
      ) : null}
    </div>
  );
} 