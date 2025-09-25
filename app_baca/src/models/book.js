import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  penulis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tahun_publish: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: "books",
  timestamps: false
});

