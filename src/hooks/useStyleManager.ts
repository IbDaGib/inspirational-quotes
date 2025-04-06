'use client';

import { useState, useCallback } from 'react';
import { colorSchemes } from '@/constants/color-schemes';
import { fonts } from '@/constants/fonts';

const getRandomIndex = (arrayLength: number, lastIndex: number) => {
  let index;
  do {
    index = Math.floor(Math.random() * arrayLength);
  } while (index === lastIndex);
  return index;
};

export function useStyleManager() {
  const [currentScheme, setCurrentScheme] = useState(colorSchemes[0]);
  const [currentFont, setCurrentFont] = useState(fonts[0]);

  const applyRandomColorScheme = useCallback(() => {
    const randomSchemeIndex = getRandomIndex(colorSchemes.length, colorSchemes.indexOf(currentScheme));
    setCurrentScheme(colorSchemes[randomSchemeIndex]);
  }, [currentScheme]);

  const applyRandomFont = useCallback(() => {
    const randomFontIndex = getRandomIndex(fonts.length, fonts.indexOf(currentFont));
    setCurrentFont(fonts[randomFontIndex]);
  }, [currentFont]);

  return {
    currentScheme,
    currentFont,
    applyRandomColorScheme,
    applyRandomFont
  };
} 