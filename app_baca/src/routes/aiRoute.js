import express from "express";
import { askAgent } from "../../percobaan.js";

const router = express.Router();

router.post("/ai/ask", async (req, res) => {
  try {
    const { question, history } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Using a consistent thread_id to maintain conversation history for the user
    const thread_id = "single-user-thread";

    const answer = await askAgent(question, history || [], thread_id);

    res.json({ question, answer });
  } catch (err) {
    console.error("❌ Error in AI route:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
