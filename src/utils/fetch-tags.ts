export const fetchRandomTags = async (count: number = 5): Promise<string[]> => {
  try {
    const response = await fetch('https://api.quotable.kurokeita.dev/api/tags?sortBy=name');
    const data = await response.json();
    const allTags = data.map((tag: { name: string }) => tag.name);
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}; 