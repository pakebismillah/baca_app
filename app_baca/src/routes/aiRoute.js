import express from "express";
import { askAgent } from "../../percobaan.js";

const router = express.Router();

// Satu threadId global untuk semua request
const GLOBAL_THREAD_ID = "main-thread";

router.post("/ai/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await askAgent(question, GLOBAL_THREAD_ID);

    res.json({ question, answer });
  } catch (err) {
    console.error("❌ Error in AI route:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
