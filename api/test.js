import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function checkKey() {
  try {
    const models = await openai.models.list();
    console.log("✅ API key is valid. Models:", models.data.map(m => m.id));
  } catch (err) {
    console.error("❌ Invalid API key or error:", err.message);
  }
}

checkKey();
