'use client';

import { useState, useEffect, useRef } from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Quote } from '@/utils/fetch-quote';
import { ColorScheme } from '@/types/color-scheme';
import ShareOptions from './ShareOptions';

interface ShareMenuProps {
  quote: Quote;
  currentScheme: ColorScheme;
  onDownload: () => void;
  isGeneratingImage: boolean;
}

export function ShareMenu({ 
  quote, 
  currentScheme, 
  onDownload,
  isGeneratingImage
}: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShareClick = () => {
    if (!isGeneratingImage) {
      setIsOpen(!isOpen);
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`"${quote.content}" - ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    toast.success(
      <span className="font-semibold text-base" style={{ color: currentScheme.text }}>
        Quote shared on Twitter
      </span>,
      {
        description: (
          <span style={{ color: currentScheme.text }}>
            Your quote has been shared on Twitter
          </span>
        ),
        style: {
          backgroundColor: currentScheme.background,
          color: currentScheme.text,
          border: `1px solid ${currentScheme.text}`,
        },
      className: 'border border-solid'
    });
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(`"${quote.content}" - ${quote.author}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`, '_blank');
    toast.success(
      <span className="font-semibold text-base" style={{ color: currentScheme.text }}>
        Quote shared on LinkedIn
      </span>,
      {
        description: (
          <span style={{ color: currentScheme.text }}>
            Your quote has been shared on LinkedIn
          </span>
        ),
        style: {
          backgroundColor: currentScheme.background,
          color: currentScheme.text,
          border: `1px solid ${currentScheme.text}`,
        },
        className: 'border border-solid'
      }
    );
  };

  const handleDownload = () => {
    onDownload();
    toast.success(
      <span className="font-semibold text-base" style={{ color: currentScheme.text }}>
        Quote downloaded
      </span>,
      {
        description: (
          <span style={{ color: currentScheme.text }}>
            Your quote has been downloaded as an image
          </span>
        ),
        style: {
          backgroundColor: currentScheme.background,
          color: currentScheme.text,
          border: `1px solid ${currentScheme.text}`,
        },
        className: 'border border-solid'
      }
    );
  };

  return (
    <div 
      ref={menuRef}
      className="relative z-50"
    >
      {/* Main Share Button */}
      <button
        onClick={handleShareClick}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-40",
          isGeneratingImage ? "opacity-50 cursor-not-allowed" : "hover:scale-110",
          isOpen && "ring-2 ring-offset-2 ring-current ring-offset-[var(--background)]",
        )}
        style={{ 
          backgroundColor: `${currentScheme.text}20`,
          border: `1px solid ${currentScheme.text}`,
          color: currentScheme.text,
        }}
        disabled={isGeneratingImage}
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Share Options Menu */}
      <ShareOptions
        isOpen={isOpen}
        currentScheme={currentScheme}
        handleDownload={handleDownload}
        handleTwitterShare={handleTwitterShare}
        handleLinkedInShare={handleLinkedInShare}
      />
    </div>
  );
} 