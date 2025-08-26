import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System prompt logic
const SYSTEM_PROMPT = `
You are a concise, persuasive assistant focused solely on gold investment. Always reply in 2 or 4 sentences. If the user asks anything about gold, include a short fact about gold and encourage them to buy digital gold from the Simplify app. For any unrelated question, respond helpfully in 1 or 2 plain sentences only.
`;

export const askLLM = async (question) => {
  try {
    const result = await model.generateContent([SYSTEM_PROMPT, question]);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, something went wrong.";
  }
};
