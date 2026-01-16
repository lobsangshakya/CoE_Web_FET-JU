
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Assume API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateResearchIdeas = async (topic: string): Promise<string[]> => {
  if (!API_KEY) {
    return Promise.resolve([
        "API Key not configured. Please set up your Gemini API Key.",
        "Mock Idea 1: Develop a new algorithm for topic modeling.",
        "Mock Idea 2: Analyze the impact of climate change on local agriculture using satellite imagery.",
        "Mock Idea 3: Create a low-cost water filtration system for rural areas."
    ]);
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 5 innovative and specific research project ideas related to the topic: "${topic}". The ideas should be suitable for university-level research.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    ideas: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                            description: "A single research idea."
                        }
                    }
                }
            },
            temperature: 0.8,
            topP: 0.9,
        }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.ideas || [];
  } catch (error) {
    console.error("Error generating research ideas:", error);
    return ["An error occurred while generating ideas. Please try again."];
  }
};
