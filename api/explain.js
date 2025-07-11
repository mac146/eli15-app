import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const question = req.body.question;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  const prompt = `Explain "${question}" like I'm 15 years old.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    res.json({ explanation: reply });
  } catch (err) {
    console.error("❌ OpenAI API Error:", err.message);
    res.status(500).json({ error: "API call failed" });
  }
}
