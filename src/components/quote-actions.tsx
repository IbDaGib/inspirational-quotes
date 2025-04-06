import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface QuoteActionsProps {
  isGeneratingExplanation: boolean;
  isGeneratingImage: boolean;
  showCopiedMessage: boolean;
  currentScheme: {
    text: string;
    background: string;
  };
  onGenerateExplanation: () => void;
  onShare: () => void;
}

export function QuoteActions({ 
  isGeneratingExplanation,
  isGeneratingImage,
  showCopiedMessage,
  currentScheme,
  onGenerateExplanation,
  onShare
}: QuoteActionsProps) {
  return (
    <div className="flex gap-4 sm:gap-6 md:gap-8 mb-2 sm:mb-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onGenerateExplanation}
            disabled={isGeneratingExplanation}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-all duration-300",
              isGeneratingExplanation ? "opacity-50" : "hover:opacity-90"
            )}
            style={{ 
              backgroundColor: currentScheme.text,
              color: currentScheme.background,
              transition: 'all 0.5s ease-in-out'
            }}
          >
            {isGeneratingExplanation ? "Generating..." : "Explanation"}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" style={{ color: currentScheme.text }}>
          Generate AI explanation for this quote
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onShare}
            disabled={isGeneratingImage}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
              isGeneratingImage ? "opacity-50" : "hover:opacity-90"
            )}
            style={{ 
              backgroundColor: currentScheme.text,
              color: currentScheme.background,
              transition: 'all 0.5s ease-in-out'
            }}
          >
            {isGeneratingImage ? (
              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" style={{ color: currentScheme.text }}>
          {isGeneratingImage ? "Generating image..." : showCopiedMessage ? "Copied!" : "Share quote as image"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
} 