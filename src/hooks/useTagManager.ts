'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchRandomTags } from '@/utils/fetch-tags';
import { Quote } from '@/utils/fetch-quote';

interface QuotableQuote {
  content: string;
  author: {
    name: string;
  };
}

interface TagManagerDependencies {
  applyRandomColorScheme: () => void;
  resetExplanation: () => void;
}

export function useTagManager({ applyRandomColorScheme, resetExplanation }: TagManagerDependencies) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isTagsLoading, setIsTagsLoading] = useState(true);
  const [tagQuotes, setTagQuotes] = useState<Quote[]>([]);
  const [showCarousel, setShowCarousel] = useState(false);

  const refreshTags = useCallback(async () => {
    setIsTagsLoading(true);
    try {
      const newTags = await fetchRandomTags();
      if (selectedTag && !newTags.includes(selectedTag)) {
        newTags[0] = selectedTag;
      }
      setSelectedTags(newTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setIsTagsLoading(false);
    }
  }, [selectedTag]);

  const handleTagClick = async (tag: string, onNewQuote: (quote?: Quote) => void) => {
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
    setSelectedTag(tag === selectedTag ? null : tag);
    setIsTagsLoading(true);
    
    resetExplanation();
    
    try {
      const response = await fetch(`https://api.quotable.kurokeita.dev/api/quotes/random?limit=10&tags=${formattedTag}`);
      const data = await response.json();
      
      const quotesArray = Array.isArray(data) ? data : data.quotes || [];
      const uniqueQuotes = new Set(quotesArray.map((quote: QuotableQuote) => quote.content));
      const availableQuotesCount = uniqueQuotes.size;
      
      applyRandomColorScheme();
      
      if (availableQuotesCount === 1) {
        const firstQuote = quotesArray[0] as QuotableQuote;
        onNewQuote({
          content: firstQuote.content,
          author: firstQuote.author.name
        });
      } else if (availableQuotesCount > 1) {
        const uniqueQuotesArray = Array.from(uniqueQuotes);
        const quotes = uniqueQuotesArray.slice(0, 5).map(content => {
          const quote = quotesArray.find((q: QuotableQuote) => q.content === content) as QuotableQuote;
          return {
            content: quote.content,
            author: quote.author.name
          };
        });
        
        setTagQuotes(quotes);
        setShowCarousel(true);
      } else {
        onNewQuote();
      }

      const newTags = await fetchRandomTags();
      if (tag && !newTags.includes(tag)) {
        newTags[0] = tag;
      }
      setSelectedTags(newTags);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      onNewQuote();
    } finally {
      setIsTagsLoading(false);
    }
  };

  useEffect(() => {
    refreshTags();
  }, [refreshTags]);

  return {
    selectedTags,
    selectedTag,
    isTagsLoading,
    tagQuotes,
    showCarousel,
    setShowCarousel,
    handleTagClick,
    refreshTags
  };
} 