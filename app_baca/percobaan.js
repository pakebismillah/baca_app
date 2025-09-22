// percobaan.js
import dotenv from "dotenv";
dotenv.config();

import { ChatGroq } from "@langchain/groq";
import { SqlToolkit } from "langchain/agents/toolkits/sql";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { saveAiLogs } from "./src/service/aiLogsService.js";

// 1️⃣ koneksi ke DB
const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

await datasource.initialize();
const db = await SqlDatabase.fromDataSourceParams({ appDataSource: datasource });

// 2️⃣ setup LLM + agent
const agentModel = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
});

const toolkit = new SqlToolkit(db, agentModel);
const agentCheckpointer = new MemorySaver();

const agent = createReactAgent({
  llm: agentModel,
  tools: [...toolkit.getTools()],
  checkpointSaver: agentCheckpointer,
});

export async function askAgent(question) {
  const state = await agent.invoke(
    { messages: [new HumanMessage(question)] },
    { configurable: { thread_id: "42" } }
  );

  // Ambil pesan terakhir
  const lastMsg = state.messages[state.messages.length - 1];

  // Kalau masih function-call, cari sebelum terakhir
  let answer = lastMsg.content;
  if (typeof answer !== "string") {
    const prev = state.messages[state.messages.length - 2];
    answer = prev?.content || "⚠️ AI tidak mengembalikan jawaban teks.";
  }

  // Simpan ke DB
  await saveAiLogs(question, answer, { source: "admin" });

  return answer;
}

