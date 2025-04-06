import React from 'react';
import { cn } from '@/lib/utils';
import { ColorScheme } from '@/types/color-scheme';

interface ShareButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  delay: string;
  isOpen: boolean;
  currentScheme: ColorScheme;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick, icon, delay, isOpen, currentScheme }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
      "hover:scale-110 transform relative z-50",
      isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    )}
    style={{ 
      backgroundColor: `${currentScheme.text}20`,
      border: `1px solid ${currentScheme.text}`,
      color: currentScheme.text,
      transitionDelay: delay,
      willChange: 'transform, opacity'
    }}
  >
    {icon}
  </button>
);

export default ShareButton; 