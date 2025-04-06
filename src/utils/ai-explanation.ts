export const getAIExplanation = async (quote: string, author: string): Promise<string> => {
  try {
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quote, author }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch explanation');
    }

    const data = await response.json();
    return data.explanation;
  } catch (error) {
    console.error('Error fetching AI explanation:', error);
    return "Sorry, I couldn't generate an explanation at this time.";
  }
}; 