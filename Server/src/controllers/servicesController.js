const axios = require("axios");
require("dotenv").config();
const useCohere = require("../config/cohereAI.js");

const enhanceText = async (req, res) => {
    const text = req.body.text;

    if (!text) return res.status(400).json({ error: 1, message: "Missing some required fields" });

    try {
        const prompt = `Enhance the following text for charity, checking grammar, and professional tone, it is a description charity should be less than 70 words (just give me a enhanced text): ${text}`;

        let response = await useCohere(prompt);

        res.json({ error: 0, results: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 1, message: "Server is broken" });
    }
};

module.exports = {
    enhanceText
};
