import { GoogleGenAI } from "@google/genai";

// Initialize the client
// Note: In a real app, ensure process.env.API_KEY is set. 
// For this demo, we assume the environment variable is injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDesignAdvice = async (roomType: string, style: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I am redesigning my ${roomType} in a ${style} style. Give me 3 short, punchy bullet points of advice for furniture selection and color palette. Keep it under 50 words total.`,
    });
    
    return response.text || "Could not generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Expert advice is currently unavailable. Please try again later.";
  }
};

export const redesignRoom = async (base64Image: string, prompt: string, mode: 'style' | 'edit' = 'style'): Promise<string | null> => {
  try {
    // Basic cleanup of base64 string if it includes the header
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    let textPrompt = "";
    if (mode === 'style') {
        textPrompt = `Redesign this interior room to have a "${prompt}" style. Keep the original room layout, perspective, and furniture placement exactly the same, but change the materials, colors, and decor to match the requested style. High quality, photorealistic.`;
    } else {
        textPrompt = `Edit this room image based on this instruction: "${prompt}". IMPORTANT: Only perform the specific edit requested (e.g., adding an object, changing a specific color). Do NOT redesign the whole room. Keep the existing furniture, layout, and style exactly as is unless the instruction requires changing it. Photorealistic, seamless integration.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: textPrompt
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          }
        ]
      }
    });

    // Check for image in response
    if (response.candidates && response.candidates[0].content.parts) {
       for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
             return `data:image/png;base64,${part.inlineData.data}`;
          }
       }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Redesign Error:", error);
    throw error;
  }
};