import { ExplanationSkeleton } from "../ui/explanation-skeleton";

interface QuoteExplanationProps {
  aiExplanation: string | null;
  isGeneratingExplanation: boolean;
  currentScheme: {
    text: string;
    background: string;
  };
}

export function QuoteExplanation({ 
  aiExplanation, 
  isGeneratingExplanation, 
  currentScheme 
}: QuoteExplanationProps) {
  return (
    <div className="w-full mt-4 flex flex-col items-center">
      {isGeneratingExplanation ? (
        <ExplanationSkeleton style={{ color: currentScheme.text }} />
      ) : aiExplanation ? (
        <div 
          className="w-full p-4 rounded-lg transition-opacity duration-300"
          style={{ 
            backgroundColor: `${currentScheme.text}20`,
            color: currentScheme.text,
            border: `1px solid ${currentScheme.text}`
          }}
        >
          <p className="text-sm">
            {aiExplanation.split(/(\*.*?\*|_.*?_)/g).map((part, index) => {
              if (part.startsWith('*') && part.endsWith('*')) {
                return <span key={index} className="font-bold">{part.slice(1, -1)}</span>;
              } else if (part.startsWith('_') && part.endsWith('_')) {
                return <span key={index} className="italic">{part.slice(1, -1)}</span>;
              }
              return part;
            })}
          </p>
        </div>
      ) : null}
    </div>
  );
} 