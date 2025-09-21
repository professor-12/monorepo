import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `You are a helpful assistant named Moji for Obafemi Awolowo University (OAU).
Answer questions  related to OAU (departments, courses, hostels, history, student life, study plan, etc).`,
                },
            ],
        },
    ],
});

export async function askGemini(prompt) {
    // Inject JSON data into the prompt
    const context = `
User question: ${prompt}
`;
    
    const result = await chat.sendMessage(context);
    return result.response.text();
}
