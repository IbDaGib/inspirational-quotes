'use client';

import { useState, useEffect } from 'react';
import { QuoteDisplay } from '@/components/main/quote-display';
import { fetchQuote, Quote } from '@/utils/fetch-quote';

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchQuote = async (tagOrQuote?: string | Quote) => {
    setLoading(true);
    try {
      if (typeof tagOrQuote === 'string') {
        // If it's a string, treat it as a tag and fetch a new quote
        const newQuote = await fetchQuote(tagOrQuote);
        setQuote(newQuote);
      } else if (tagOrQuote) {
        // If it's a Quote object, use it directly
        setQuote(tagOrQuote);
      } else {
        // If no argument, fetch a random quote
        const newQuote = await fetchQuote();
        setQuote(newQuote);
      }
    } catch (error) {
      console.error('Error handling quote:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchQuote();
  }, []);

  return (
    <QuoteDisplay
      quote={quote}
      loading={loading}
      onNewQuote={handleFetchQuote}
    />
  );
}
