export type Quote = {
  content: string;
  author: string;
};

export type QuoteDisplayProps = {
  quote: Quote | null;
  loading: boolean;
  onNewQuote: (tagOrQuote?: string | Quote) => void;
}; 