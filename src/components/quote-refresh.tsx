import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface QuoteRefreshProps {
  loading: boolean;
  isVisible: boolean;
  isRotating: boolean;
  isHovering: boolean;
  currentScheme: {
    text: string;
    background: string;
  };
  onNewQuote: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function QuoteRefresh({ 
  loading,
  isVisible,
  isRotating,
  isHovering,
  currentScheme,
  onNewQuote,
  onMouseEnter,
  onMouseLeave
}: QuoteRefreshProps) {
  return (
    <div className="mt-2 sm:mt-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onNewQuote}
            disabled={loading}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="cursor-pointer flex items-center justify-center w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px] xl:w-[50px] xl:h-[50px]"
            style={{ 
              color: currentScheme.text,
              opacity: isVisible ? 1 : 0,
              transition: 'fill 0.5s, opacity 0.3s'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="transition-transform duration-600 w-full h-full"
              style={{ 
                transform: isRotating 
                  ? 'rotate(-180deg)' 
                  : isHovering 
                    ? 'rotate(180deg)' 
                    : 'none',
                transition: 'transform 0.6s ease-in-out'
              }}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" style={{ color: currentScheme.text }}>
          Get a new quote
        </TooltipContent>
      </Tooltip>
    </div>
  );
} 