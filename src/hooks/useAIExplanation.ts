'use client';

import { useState } from 'react';
import { getAIExplanation } from '@/utils/ai-explanation';
import { Quote } from '@/utils/fetch-quote';

export function useAIExplanation() {
  const [aiExplanation, setAIExplanation] = useState<string | null>(null);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [currentQuoteContent, setCurrentQuoteContent] = useState<string | null>(null);

  const generateExplanation = async (quote: Quote) => {
    if (!quote) return;
    
    // If we already have an explanation for this quote, don't generate a new one
    if (aiExplanation && currentQuoteContent === quote.content) {
      return;
    }

    setIsGeneratingExplanation(true);
    try {
      const explanation = await getAIExplanation(quote.content, quote.author);
      setAIExplanation(explanation);
      setCurrentQuoteContent(quote.content);
    } catch (error) {
      console.error('Error generating explanation:', error);
      setAIExplanation("Sorry, I couldn't generate an explanation at this time.");
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  const resetExplanation = () => {
    setAIExplanation(null);
    setCurrentQuoteContent(null);
  };

  return {
    aiExplanation,
    isGeneratingExplanation,
    generateExplanation,
    resetExplanation
  };
} 