import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { quote, author } = await request.json();

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" });

    const prompt = `Please provide a brief interpretation of this quote: "${quote}" by ${author}. 
    - Keep it under 200 characters
    - Use * for bold and _ for italics
    - Focus on the core meaning
    - Make it inspiring and practical`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Ensure the response is within character limit
    const limitedText = text.length > 200 ? text.substring(0, 197) + '...' : text;
    
    return NextResponse.json({ explanation: limitedText });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: "Sorry, I couldn't generate an explanation at this time." },
      { status: 500 }
    );
  }
} 