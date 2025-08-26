// services/aiLogService.js
import { AiLog } from "../models/aiLogModels.js";

export const saveAiLogs = async (prompt, response, metadata = null) => {
  try {
    const log = await AiLog.create({
      prompt,
      response,
      metadata, // optional
    });
    return log; // ✅ balikin hasil log, bukan fungsi
  } catch (err) {
    console.error("Gagal simpan log:", err);
  }
};

