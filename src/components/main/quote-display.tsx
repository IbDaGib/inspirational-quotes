'use client';

// External
import { useState, useRef } from 'react';

// Internal Components
import { QuoteHeader } from './quote-header';
import { QuoteContent } from './quote-content';
import { QuoteExplanation } from './quote-explanation';
import { QuoteActions } from './quote-actions';
import { QuoteRefresh } from './quote-refresh';
import { QuoteCarousel } from '../ui/quote-carousel';
import { CarouselSkeleton } from '../ui/carousel-skeleton';
import { TagsSkeleton } from '../ui/tags-skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/shadcn/tooltip';

// Hooks
import { useStyleManager } from '@/hooks/useStyleManager';
import { useTagManager } from '@/hooks/useTagManager';
import { useQuoteImage } from '@/hooks/useQuoteImage';
import { useAIExplanation } from '@/hooks/useAIExplanation';

// Utils & Types
import { cn } from '@/lib/utils';
import { QuoteDisplayProps } from '@/types/quote';
import { Quote } from '@/utils/fetch-quote';

export function QuoteDisplay({ quote, loading, onNewQuote }: QuoteDisplayProps) {
  // UI State
  const [isVisible, setIsVisible] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Refs
  const quoteImageRef = useRef<HTMLDivElement>(null);

  // Style Management
  const { currentScheme, currentFont, applyRandomColorScheme, applyRandomFont } = useStyleManager();

  // AI Explanation
  const {
    aiExplanation,
    isGeneratingExplanation,
    generateExplanation,
    resetExplanation
  } = useAIExplanation();

  // Tag Management
  const { 
    selectedTags, 
    selectedTag, 
    isTagsLoading, 
    tagQuotes, 
    showCarousel, 
    setShowCarousel, 
    handleTagClick, 
    refreshTags 
  } = useTagManager({ 
    applyRandomColorScheme, 
    applyRandomFont,
    resetExplanation 
  });

  // Image Generation
  const { 
    isGeneratingImage, 
    generateAndDownloadImage 
  } = useQuoteImage(quoteImageRef);

  // Event Handlers
  const handleNewQuote = async () => {
    setIsRotating(true);
    setIsVisible(false);
    resetExplanation();
    
    try {
      onNewQuote();
      applyRandomColorScheme();
      applyRandomFont();
      await refreshTags();
      setIsVisible(true);
    } catch (error) {
      console.error('Error fetching new quote:', error);
    } finally {
      setIsRotating(false);
    }
  };

  const handleQuoteSelect = (selectedQuote: Quote) => {
    onNewQuote(selectedQuote);
    setIsVisible(true);
    setShowCarousel(false);
    setIsRotating(false);
    resetExplanation();
  };

  // Render Functions
  const renderTags = () => (
    isTagsLoading ? (
      <TagsSkeleton style={{ color: currentScheme.text }} />
    ) : (
      <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center">
        {selectedTags.map((tag) => (
          <Tooltip key={tag}>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleTagClick(tag, onNewQuote)}
                className={cn(
                  "px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105",
                  selectedTags.includes(tag) ? "opacity-100" : "opacity-50 hover:opacity-100"
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
    )
  );

  const renderCarousel = () => {
    if (!showCarousel) return null;
    
    return isTagsLoading ? (
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
    );
  };

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
            {renderTags()}
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
                quote={quote}
                isGeneratingExplanation={isGeneratingExplanation}
                isGeneratingImage={isGeneratingImage}
                currentScheme={currentScheme}
                onGenerateExplanation={() => generateExplanation(quote)}
                onShare={() => generateAndDownloadImage(quote, currentScheme)}
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

      {renderCarousel()}
    </div>
  );
}