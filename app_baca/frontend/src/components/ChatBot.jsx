import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatBot({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="border-t bg-gray-50 p-3 flex items-center gap-2">
      <input
        type="text"
        className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        placeholder="Ketik pesan..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-600 transition"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
