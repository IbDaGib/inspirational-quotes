export interface ColorScheme {
  name: string;
  background: string;
  text: string;
  category: 'warm' | 'cool' | 'neutral' | 'contrast' | 'pastel' | 'vibrant';
}

export const colorSchemes: ColorScheme[] = [
  // Warm Schemes
  {
    name: 'Coral Dream',
    background: '#FF8B8B',
    text: '#F9F8E6',
    category: 'warm'
  },
  {
    name: 'Sunset Glow',
    background: '#E54B4B',
    text: '#FFFFFF',
    category: 'warm'
  },
  {
    name: 'Autumn Leaves',
    background: '#E88565',
    text: '#181A27',
    category: 'warm'
  },
  {
    name: 'Crimson Tide',
    background: '#E33946',
    text: '#FDEDB2',
    category: 'warm'
  },
  {
    name: 'Rustic Red',
    background: '#E75153',
    text: '#58B89D',
    category: 'warm'
  },
  {
    name: 'Blazing Orange',
    background: '#F87C4C',
    text: '#FEDCCC',
    category: 'warm'
  },
  {
    name: 'Golden Hour',
    background: '#F0CF61',
    text: '#EBE8E1',
    category: 'warm'
  },

  // Cool Schemes
  {
    name: 'Ocean Depths',
    background: '#005397',
    text: '#FF8788',
    category: 'cool'
  },
  {
    name: 'Mountain Mist',
    background: '#0E38B1',
    text: '#FFFFFF',
    category: 'cool'
  },
  {
    name: 'Arctic Blue',
    background: '#19AAD1',
    text: '#FFCC4C',
    category: 'cool'
  },
  {
    name: 'Deep Sea',
    background: '#167C80',
    text: '#FFFFFF',
    category: 'cool'
  },
  {
    name: 'Teal Waters',
    background: '#61BFAD',
    text: '#FFFFFF',
    category: 'cool'
  },
  {
    name: 'Sky Blue',
    background: '#0BBCD6',
    text: '#E6625E',
    category: 'cool'
  },
  {
    name: 'Navy Night',
    background: '#283470',
    text: '#15A29C',
    category: 'cool'
  },

  // Neutral Schemes
  {
    name: 'Classic Ivory',
    background: '#F9F7E8',
    text: '#62BFAD',
    category: 'neutral'
  },
  {
    name: 'Stone Gray',
    background: '#C7C6C4',
    text: '#008E8F',
    category: 'neutral'
  },
  {
    name: 'Sand Dune',
    background: '#F2DDBC',
    text: '#FF67B9',
    category: 'neutral'
  },
  {
    name: 'Muted Gray',
    background: '#C0C2CE',
    text: '#012F63',
    category: 'neutral'
  },
  {
    name: 'Warm Beige',
    background: '#EFE8D8',
    text: '#FF4552',
    category: 'neutral'
  },
  {
    name: 'Soft Stone',
    background: '#EAEAEA',
    text: '#ABCEE2',
    category: 'neutral'
  },

  // Contrast Schemes
  {
    name: 'Midnight Gold',
    background: '#12162D',
    text: '#8B743D',
    category: 'contrast'
  },
  {
    name: 'Black Cherry',
    background: '#000000',
    text: '#FF0000',
    category: 'contrast'
  },
  {
    name: 'Deep Ocean',
    background: '#0A005A',
    text: '#F0F0F0',
    category: 'contrast'
  },
  {
    name: 'Dark Forest',
    background: '#371722',
    text: '#BBAB9B',
    category: 'contrast'
  },
  {
    name: 'Charcoal',
    background: '#1B1D1C',
    text: '#EA1821',
    category: 'contrast'
  },
  {
    name: 'Deep Space',
    background: '#121738',
    text: '#D17C78',
    category: 'contrast'
  },

  // Pastel Schemes
  {
    name: 'Cotton Candy',
    background: '#F3C9DD',
    text: '#72AEC5',
    category: 'pastel'
  },
  {
    name: 'Mint Fresh',
    background: '#BEF6E9',
    text: '#BB828B',
    category: 'pastel'
  },
  {
    name: 'Lavender Mist',
    background: '#9C9CDD',
    text: '#CAE9BF',
    category: 'pastel'
  },
  {
    name: 'Peach Blossom',
    background: '#FBCBC1',
    text: '#000000',
    category: 'pastel'
  },
  {
    name: 'Soft Rose',
    background: '#EDB5BD',
    text: '#000000',
    category: 'pastel'
  },
  {
    name: 'Morning Sky',
    background: '#B7E3E4',
    text: '#F03F35',
    category: 'pastel'
  },

  // Vibrant Schemes
  {
    name: 'Electric Lime',
    background: '#FBFE56',
    text: '#0B64C0',
    category: 'vibrant'
  },
  {
    name: 'Neon Pink',
    background: '#FF6090',
    text: '#81072C',
    category: 'vibrant'
  },
  {
    name: 'Sunshine Yellow',
    background: '#FDB90B',
    text: '#FB5408',
    category: 'vibrant'
  },
  {
    name: 'Emerald Green',
    background: '#32B67A',
    text: '#FFFFFF',
    category: 'vibrant'
  },
  {
    name: 'Royal Purple',
    background: '#9357A9',
    text: '#000000',
    category: 'vibrant'
  },
  {
    name: 'Electric Blue',
    background: '#0BBCD6',
    text: '#E6625E',
    category: 'vibrant'
  }
];

// Helper functions
export const getSchemesByCategory = (category: ColorScheme['category']) => {
  return colorSchemes.filter(scheme => scheme.category === category);
};

export const getRandomScheme = () => {
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
};

export const getRandomSchemeByCategory = (category: ColorScheme['category']) => {
  const categorySchemes = getSchemesByCategory(category);
  return categorySchemes[Math.floor(Math.random() * categorySchemes.length)];
}; 