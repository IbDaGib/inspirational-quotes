import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'scheme-1': {
          background: '#FF8B8B',
          text: '#F9F7E8',
        },
        'scheme-2': {
          background: '#F9F7E8',
          text: '#61BFAD',
        },
        'scheme-3': {
          background: '#61BFAD',
          text: '#F9F7E8',
        },
        'scheme-4': {
          background: '#19AAD1',
          text: '#FDC766',
        },
        'scheme-5': {
          background: '#C6D7C7',
          text: '#F26A4B',
        },
        'scheme-6': {
          background: '#F0CF61',
          text: '#E7E6E1',
        },
        'scheme-7': {
          background: '#B7E3E4',
          text: '#F26A4B',
        },
      },
      fontFamily: {
        'source-serif-pro': ['Source Serif Pro', 'serif'],
        'fraunces': ['Fraunces', 'serif'],
        'lora': ['Lora', 'serif'],
        'ibm-plex-sans': ['IBM Plex Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
};

export default config; 