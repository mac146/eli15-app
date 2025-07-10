import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    const question=req.body.question;
    const prompt=`Explain "${question}" like I'm 15 years old.`

   const response=await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
   messages: [{ role: "user", content: prompt }],
  temperature: 0.7
 })
   const reply = response.choices[0].message.content;
   try{
    res.json({ explanation: reply });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }

}
