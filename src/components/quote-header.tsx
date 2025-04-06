interface QuoteHeaderProps {
  currentScheme: {
    text: string;
    background: string;
  };
}

export function QuoteHeader({ currentScheme }: QuoteHeaderProps) {
  return (
    <header 
      className="w-full py-2 sm:py-3 md:py-4"
      style={{ 
        backgroundColor: currentScheme.background,
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <h1 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-center"
        style={{ 
          color: currentScheme.text,
          transition: 'all 0.5s ease-in-out'
        }}
      >
        Quote of the Day
      </h1>
    </header>
  );
} 