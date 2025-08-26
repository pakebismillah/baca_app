import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const AiLog = sequelize.define("ai_logs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
});
