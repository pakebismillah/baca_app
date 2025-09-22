import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { Book } from "./book.js";

export const Peminjaman = sequelize.define(
  "Peminjaman",
  {
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
  },
  {
    tableName: "peminjaman",
  }
);

// Relasi
Book.hasMany(Peminjaman, { foreignKey: "bookId", as: "riwayat" });
Peminjaman.belongsTo(Book, { foreignKey: "bookId", as: "buku" });
