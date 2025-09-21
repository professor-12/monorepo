import { askGemini } from "../services/ai.service.js";

export const prompt = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message)
            return res.status(400).json({ error: "Message required" });
        const result = await askGemini(message);
        res.json({ data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
