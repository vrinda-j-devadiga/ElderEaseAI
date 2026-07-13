const axios = require("axios");

exports.chatWithAI = async (req, res) => {
  try {
    if (!req.body?.message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: `
You are ElderEase AI, a friendly healthcare assistant for elderly people.

Rules:
- Answer in simple and easy English.
- Keep responses under 120 words unless the user asks for more details.
- Use bullet points whenever possible.
- Give only general health guidance.
- Never diagnose diseases.
- Never prescribe medicines or dosages.
- For serious symptoms, advise the user to consult a doctor immediately.
- End every answer with:
  "This information is for general guidance and is not a substitute for professional medical advice."
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "ElderEase AI",
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("========== OPENROUTER ERROR ==========");
    console.error(error.response?.status);
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "AI service unavailable.",
    });
  }
};