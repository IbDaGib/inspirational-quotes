interface QuoteHeaderProps {
  currentScheme: {
    text: string;
    background: string;
  };
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

export function QuoteHeader({ currentScheme }: QuoteHeaderProps) {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

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
        Quote of {formattedDate}
      </h1>
    </header>
  );
}