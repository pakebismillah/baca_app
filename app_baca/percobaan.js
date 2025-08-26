// agent.mts
import dotenv from "dotenv";
dotenv.config();

import { ChatGroq } from "@langchain/groq";
import { SqlToolkit } from "langchain/agents/toolkits/sql";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import readline from "readline";

// 🔥 import Sequelize & model AiLog
import { saveAiLogs } from "./src/service/aiLogsService.js";


// 1️⃣ konek ke Postgres via TypeORM (khusus buat SQL agent)
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

// 2️⃣ model Groq
const agentModel = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
});

// 3️⃣ bikin toolkit SQL
const toolkit = new SqlToolkit(db, agentModel);

// 4️⃣ memory biar thread bisa jalan
const agentCheckpointer = new MemorySaver();

// 5️⃣ bikin agent
const agent = createReactAgent({
  llm: agentModel,
  tools: toolkit.getTools(),
  checkpointSaver: agentCheckpointer,
});

// 6️⃣ setup terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// fungsi tanya ke agent + simpan ke DB
async function askAgent(question) {
  const state = await agent.invoke(
    { messages: [new HumanMessage(question)] },
    { configurable: { thread_id: "42" } }
  );
  const answer = state.messages[state.messages.length - 1].content;

  console.log("\n🤖 AI:", answer);

  // 💾 simpan hasil ke DB
  await saveAiLogs(
    question,         // prompt
    answer,           // response
    { source: "cli" } // metadata opsional (misalnya biar tau ini dari terminal)
  );
}


// loop input terminal
function startChat() {
  rl.question("\n🧑 Kamu: ", async (q) => {
    if (q.toLowerCase() === "exit") {
      rl.close();
      process.exit(0);
    }
    await askAgent(q);
    startChat();
  });
}

console.log("🚀 SQL React Agent siap! (ketik 'exit' untuk keluar)");
startChat();
