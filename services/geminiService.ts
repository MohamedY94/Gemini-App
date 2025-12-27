
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const synthesizeBrainDump = async (input: string, imageData?: string): Promise<Task[]> => {
  const contents = imageData 
    ? {
        parts: [
          { text: `Synthesize this brain dump into clear, actionable tasks. Assign Energy Points (1-5) based on complexity and focus required. Estimate duration in minutes. Input: ${input}` },
          { inlineData: { data: imageData.split(',')[1], mimeType: 'image/png' } }
        ]
      }
    : `Synthesize this brain dump into clear, actionable tasks. Assign Energy Points (1-5) based on complexity and focus required. Estimate duration in minutes. Input: ${input}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: contents,
    config: {
      systemInstruction: "You are the Prism of FlowState. You convert messy thoughts into structured tasks. Return a JSON array of objects.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            energyPoints: { type: Type.INTEGER, description: "1 to 5 points" },
            durationMinutes: { type: Type.INTEGER }
          },
          required: ["name", "description", "category", "energyPoints", "durationMinutes"]
        }
      }
    }
  });

  const rawJson = response.text;
  const tasks = JSON.parse(rawJson).map((t: any) => ({
    ...t,
    id: Math.random().toString(36).substr(2, 9),
    status: 'draft'
  }));

  return tasks;
};
