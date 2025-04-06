export type Quote = {
  content: string;
  author: string;
};

export const fetchQuote = async (tag?: string): Promise<Quote | null> => {
  try {
    const url = tag 
      ? `https://api.quotable.kurokeita.dev/api/quotes/random?tags=${tag}`
      : 'https://api.quotable.kurokeita.dev/api/quotes/random';
    
    const response = await fetch(url);
    const data = await response.json();
    console.log('Fetched quote:', data);
    
    const quoteData = data.quote || data;
    return {
      content: quoteData.content,
      author: quoteData.author.name
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}; 