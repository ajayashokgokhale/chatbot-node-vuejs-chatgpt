const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const app = express();
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors()); // Enable CORS

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to check if a query is related to "Obagi"
const isQueryRelatedToObagi = (message) => {
    // Simple keyword matching (you can expand this logic)
    const obagiKeywords = ["obagi", "anti-aging", "skincare", "vitamin c", "retinol", "obagi products"];
    const lowerCaseMessage = message.toLowerCase();
    return obagiKeywords.some((keyword) => lowerCaseMessage.includes(keyword));
};

app.post("/chat", async (req, res) => {
    const { message } = req.body;

    // Validate if the query is related to "Obagi"
    if (!isQueryRelatedToObagi(message)) {
        return res.status(400).json({
            error: "This chatbot is designed to answer questions related to Obagi products only. Please ask relevant questions.",
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant specializing in anti-aging products, particularly Obagi." },
                { role: "user", content: message },
            ],
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Chatbot server running on http://localhost:${PORT}`));