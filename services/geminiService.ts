import { GoogleGenAI } from "@google/genai";

let defaultClient: GoogleGenAI | null = null;

const getDefaultClient = (): GoogleGenAI => {
  if (!defaultClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is not set");
    }
    defaultClient = new GoogleGenAI({ apiKey });
  }
  return defaultClient;
};

export const generateToolContent = async (
  systemPrompt: string,
  userInput: string,
  customApiKey?: string
): Promise<string> => {
  try {
    let ai: GoogleGenAI;

    // Use custom key if provided, otherwise fallback to default env key
    if (customApiKey && customApiKey.trim() !== '') {
      ai = new GoogleGenAI({ apiKey: customApiKey });
    } else {
      ai = getDefaultClient();
    }
    
    // We combine the tool's specific system prompt with the user's input
    // to create a specialized task execution.
    const fullPrompt = `${systemPrompt}\n\nUser Input:\n${userInput}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        // High budget for thinking if needed, but keeping it standard for speed
        thinkingConfig: { thinkingBudget: 0 }, 
        temperature: 0.7,
      }
    });

    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Provide a more helpful error if it looks like an API key issue
    if (error.message?.includes('API key') || error.status === 403 || error.status === 400) {
       throw new Error("API Key Error. If using a custom key, please check if it is valid.");
    }
    throw new Error(error.message || "Failed to generate content.");
  }
};