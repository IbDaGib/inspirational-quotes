'use client';

import { useState, RefObject } from 'react';
import html2canvas from 'html2canvas';
import { Quote } from '@/utils/fetch-quote';
import { ColorScheme } from '../types/color-scheme';

export function useQuoteImage(quoteImageRef: RefObject<HTMLDivElement | null>) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const generateAndDownloadImage = async (quote: Quote, currentScheme: ColorScheme) => {
    if (!quote) return;
    setIsGeneratingImage(true);

    try {
      if (quoteImageRef.current) {
        const canvas = await html2canvas(quoteImageRef.current, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: currentScheme.background,
          logging: false,
          removeContainer: true,
          imageTimeout: 15000,
          onclone: (clonedDoc) => {
            const link = clonedDoc.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;700&family=Roboto:wght@400;700&family=Source+Serif+Pro:wght@400;700&family=Fraunces:wght@400;700&family=Lora:wght@400;700&family=IBM+Plex+Sans:wght@400;700&display=swap';
            clonedDoc.head.appendChild(link);

            const style = clonedDoc.createElement('style');
            style.textContent = `
              @font-face {
                font-display: block !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });

        try {
          const optimizedCanvas = document.createElement('canvas');
          const ctx = optimizedCanvas.getContext('2d', { alpha: false });
          if (ctx) {
            optimizedCanvas.width = 1920;
            optimizedCanvas.height = 1920;
            
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            ctx.fillStyle = currentScheme.background;
            ctx.fillRect(0, 0, optimizedCanvas.width, optimizedCanvas.height);
            
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 
                               0, 0, optimizedCanvas.width, optimizedCanvas.height);

            const imageData = optimizedCanvas.toDataURL('image/jpeg', 1.0);
            
            const link = document.createElement('a');
            const fileName = `quote-${Date.now()}.jpg`;
            link.download = fileName;
            link.href = imageData;
            link.click();

            URL.revokeObjectURL(link.href);
            canvas.remove();
            optimizedCanvas.remove();
            
            setShowCopiedMessage(true);
            setTimeout(() => setShowCopiedMessage(false), 2000);
          }
        } catch (error) {
          console.error('Error optimizing image:', error);
          const basicImageData = canvas.toDataURL('image/jpeg', 0.9);
          const link = document.createElement('a');
          link.download = `quote-${Date.now()}.jpg`;
          link.href = basicImageData;
          link.click();
          URL.revokeObjectURL(link.href);
          canvas.remove();
        }
      }
    } catch (error) {
      console.error('Error in share process:', error);
      try {
        await navigator.clipboard.writeText(`"${quote.content}" - ${quote.author}`);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return {
    isGeneratingImage,
    showCopiedMessage,
    generateAndDownloadImage,
    setShowCopiedMessage
  };
} 