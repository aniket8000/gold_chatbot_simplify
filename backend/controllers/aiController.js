import { askLLM } from "../services/aiService.js";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "question is required (string)" });
    }

    const aiResponse = await askLLM(question);

    // If gold-related
    if (question.toLowerCase().includes("gold")) {
      return res.json({
        answer: aiResponse,
        suggestion: "Would you like to buy digital gold from our app?"
      });
    }

    res.json({ answer: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI processing failed" });
  }
};
