export const fonts = [
  'font-source-serif-pro',
  'font-fraunces',
  'font-lora',
  'font-ibm-plex-sans',
  'font-playfair-display',
  'font-merriweather',
  'font-raleway',
  'font-cormorant',
  'font-montserrat',
  'font-cinzel'
];

export const getRandomFont = () => {
  return fonts[Math.floor(Math.random() * fonts.length)];
};