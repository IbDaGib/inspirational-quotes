import React from 'react';
import ShareButton from './ShareButton';
import { Download, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorScheme } from '@/types/color-scheme';

interface ShareOptionsProps {
  isOpen: boolean;
  currentScheme: ColorScheme;
  handleDownload: () => void;
  handleTwitterShare: () => void;
  handleLinkedInShare: () => void;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({
  isOpen,
  currentScheme,
  handleDownload,
  handleTwitterShare,
  handleLinkedInShare
}) => (
  <ul 
    className={cn(
      "fixed md:absolute bottom-32 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-4",
      "transition-all duration-300 origin-bottom z-50",
      isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
    )}
    style={{
      willChange: 'transform, opacity'
    }}
  >
    <li><ShareButton onClick={handleDownload} icon={<Download className="w-4 h-4" />} delay="0ms" isOpen={isOpen} currentScheme={currentScheme} /></li>
    <li><ShareButton onClick={handleTwitterShare} icon={<Twitter className="w-4 h-4" />} delay="100ms" isOpen={isOpen} currentScheme={currentScheme} /></li>
    <li><ShareButton onClick={handleLinkedInShare} icon={<Linkedin className="w-4 h-4" />} delay="200ms" isOpen={isOpen} currentScheme={currentScheme} /></li>
  </ul>
);

export default ShareOptions; 