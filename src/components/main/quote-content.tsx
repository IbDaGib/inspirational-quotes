import { cn } from "@/lib/utils";
import { Quote } from "@/utils/fetch-quote";
import { QuoteSkeleton } from "../ui/quote-skeleton";

interface QuoteContentProps {
  quote: Quote | null;
  loading: boolean;
  isVisible: boolean;
  currentFont: string;
  currentScheme: {
    text: string;
    background: string;
  };
}

export function QuoteContent({ 
  quote, 
  loading, 
  isVisible, 
  currentFont, 
  currentScheme 
}: QuoteContentProps) {
  return (
    <div className="w-full">
      {loading ? (
        <QuoteSkeleton style={{ color: currentScheme.text }} />
      ) : quote ? (
        <div className={cn(
          "transition-opacity duration-300 flex flex-col items-center p-2 sm:p-4 md:p-6 relative",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-4">
            <p 
              className={cn(
                "text-[1.2em] sm:text-[1.1em] md:text-[1.3em] lg:text-[1.6em] xl:text-[2em] tracking-[0.02em] px-[2%] sm:px-[3%] md:px-[5%] italic",
                currentFont
              )}
              style={{ 
                color: currentScheme.text,
                transition: 'all 0.5s ease-in-out'
              }}
            >
              &ldquo;{quote.content}&rdquo;
            </p>
            <p 
              className={cn(
                "text-[0.7em] sm:text-[0.65em] md:text-[0.78em] lg:text-[0.9em] xl:text-[1.1em] text-right mt-1 sm:mt-2 w-full",
                currentFont
              )}
              style={{ 
                color: currentScheme.text,
                transition: 'all 0.5s ease-in-out'
              }}
            >
              - {quote.author}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
} 