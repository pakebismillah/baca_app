import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Peminjaman = sequelize.define("Peminjaman", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  namaPeminjam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggalPinjam: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  tanggalDikembalikan: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  bookId: {   // ⬅ foreign key harus ada
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: "peminjaman",
  timestamps: false
});
