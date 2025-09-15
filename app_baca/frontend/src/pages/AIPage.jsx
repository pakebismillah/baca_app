import { useState } from "react";

export default function AiPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const askAi = async () => {
    const res = await fetch("http://localhost:3000/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();
    setHistory([...history, { role: "user", text: input }, { role: "ai", text: data.answer }]);
    setInput("");
  };

  return (
    <div>
      <h1>AI SQL Assistant</h1>
      <div style={{ marginBottom: "1rem" }}>
        {history.map((h, i) => (
          <p key={i}><b>{h.role}:</b> {h.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={askAi}>Send</button>
    </div>
  );
}
