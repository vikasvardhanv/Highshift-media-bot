import { GoogleGenAI } from "@google/genai";
import { QUESTIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateSummary(serviceId: string, serviceName: string, answers: string[]): Promise<string> {
  const serviceQuestions = QUESTIONS[serviceId] || [];

  const promptContent = `
    Please summarize the following project requirements for the '${serviceName}' service.
    The summary should be concise, professional, and confirm understanding.
    Address the potential client directly in a friendly but professional tone.
    Conclude by stating that the next step is to book a call to discuss the project in detail.

    Client's Answers:
    ${serviceQuestions.map((q, i) => `Q: ${q}\nA: ${answers[i] || 'Not provided'}`).join('\n\n')}

    Keep the summary to about 3-4 sentences.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        // FIX: Simplified `contents` for a single text prompt, as per API guidelines.
        contents: promptContent,
        config: {
            systemInstruction: "You are a helpful AI assistant for Highshift Media, an AI consulting agency. Your task is to summarize a potential client's project requirements based on their answers to a questionnaire.",
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return "Thank you for providing your details. It seems there was an issue generating a summary, but we have your information. The next step is to book a call with our team to discuss your project further.";
  }
}
