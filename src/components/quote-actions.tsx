import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ShareMenu } from "./ui/share-menu";
import { Quote } from "@/utils/fetch-quote";

interface QuoteActionsProps {
  quote: Quote;
  isGeneratingExplanation: boolean;
  isGeneratingImage: boolean;
  currentScheme: {
    text: string;
    background: string;
  };
  onGenerateExplanation: () => void;
  onShare: () => void;
}

export function QuoteActions({ 
  quote,
  isGeneratingExplanation,
  isGeneratingImage,
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
      
      <ShareMenu
        quote={quote}
        currentScheme={currentScheme}
        onDownload={onShare}
        isGeneratingImage={isGeneratingImage}
      />
    </div>
  );
} 