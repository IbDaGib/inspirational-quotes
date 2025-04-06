// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const fetchRandomTags = async (count: number = 5): Promise<string[]> => {
  try {
    const response = await fetch('https://api.quotable.kurokeita.dev/api/tags');
    const data = await response.json();
    const allTags: string[] = data.map((tag: { name: string }) => tag.name);
    
    // Remove the sortBy=name parameter to get tags in their original order
    // Then apply our improved shuffle algorithm
    const shuffled = shuffleArray(allTags);
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}; 