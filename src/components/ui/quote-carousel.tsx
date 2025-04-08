'use client';

import { Quote } from "@/utils/fetch-quote";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./shadcn/carousel";
import { CarouselApi } from "./shadcn/carousel-api";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./shadcn/tooltip";

interface QuoteCarouselProps {
  quotes: Quote[];
  currentFont: string;
  currentScheme: {
    text: string;
    background: string;
  };
  onQuoteSelect: (quote: Quote) => void;
  tag: string;
}

export function QuoteCarousel({
  quotes,
  currentFont,
  currentScheme,
  onQuoteSelect,
  tag,
}: QuoteCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div 
          className="p-6 rounded-lg shadow-xl"
          style={{ 
            backgroundColor: currentScheme.background,
            border: `2px solid ${currentScheme.text}`
          }}
        >
          <h2 
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: currentScheme.text }}
          >
            Choose a {tag} Quote
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {quotes.map((quote, index) => (
                <CarouselItem key={index}>
                  <div 
                    className="p-1 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => onQuoteSelect(quote)}
                  >
                    <div className="flex flex-col items-center justify-center p-6 rounded-lg"
                      style={{ 
                        backgroundColor: `${currentScheme.text}10`,
                        border: `1px solid ${currentScheme.text}`
                      }}
                    >
                      <blockquote className={cn(
                        "text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium",
                        currentFont
                      )} style={{ color: currentScheme.text }}>
                        &ldquo;{quote.content}&rdquo;
                      </blockquote>
                      <p className={cn(
                        "mt-4 text-base sm:text-lg md:text-xl lg:text-2xl",
                        currentFont
                      )} style={{ color: currentScheme.text }}>
                        - {quote.author}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <CarouselPrevious 
                        className="static translate-y-0 hover:scale-110 transition-transform duration-200"
                        style={{ 
                          backgroundColor: `${currentScheme.text}20`,
                          color: currentScheme.text,
                          border: `1px solid ${currentScheme.text}`
                        }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    sideOffset={10}
                    style={{ 
                      color: currentScheme.text, 
                      backgroundColor: currentScheme.background, 
                      border: `1px solid ${currentScheme.text}` 
                    }}
                  >
                    <p>Previous quote</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span 
                className="text-sm"
                style={{ color: currentScheme.text }}
              >
                {current + 1} of {quotes.length}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <CarouselNext 
                        className="static translate-y-0 hover:scale-110 transition-transform duration-200"
                        style={{ 
                          backgroundColor: `${currentScheme.text}20`,
                          color: currentScheme.text,
                          border: `1px solid ${currentScheme.text}`
                        }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    sideOffset={10}
                    style={{ 
                      color: currentScheme.text, 
                      backgroundColor: currentScheme.background, 
                      border: `1px solid ${currentScheme.text}` 
                    }}
                  >
                    <p>Next quote</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
} 