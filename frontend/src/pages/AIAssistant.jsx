import { useState } from "react";
import Sidebar from "../components/Sidebar";
import genAI from "../config/gemini";
import ReactMarkdown from "react-markdown";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(
        `You are ElderEase AI, a healthcare assistant.
Give short, simple and helpful health advice.
Question: ${question}`
      );

      const text = result.response.text();

      setResponse(text);
    } catch (error) {
      console.log(error);

      setResponse(
        "Unable to connect to Gemini AI."
      );
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <h1>🤖 AI Health Assistant</h1>

<p className="ai-subtitle">
  Ask health-related questions and get instant guidance.
</p>

        <div className="section-card">

          <input
            className="ai-input"
            type="text"
            placeholder="Ask any health question..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <button
            className="ai-btn"
            onClick={askAI}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          {response && (
            <div className="ai-response">
              <h3>🤖 ElderEase AI</h3>

              <ReactMarkdown>
  {response}
</ReactMarkdown>
            </div>
          )}

          <div className="ai-suggestions">
  <h3>💡 Try Asking</h3>

  <div className="suggestion-list">
    <button onClick={() => setQuestion("What foods are good for diabetes?")}>
      🍎 What foods are good for diabetes?
    </button>

    <button onClick={() => setQuestion("How much water should elderly people drink?")}>
      💧 How much water should elderly people drink?
    </button>

    <button onClick={() => setQuestion("What are the symptoms of high blood pressure?")}>
      ❤️ Symptoms of high blood pressure
    </button>

    <button onClick={() => setQuestion("How can I improve my sleep?")}>
      😴 How can I improve my sleep?
    </button>
  </div>
</div>

        </div>

      </div>
    </div>
  );
}

export default AIAssistant;