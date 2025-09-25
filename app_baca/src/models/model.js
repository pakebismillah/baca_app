import { Book } from "./book.js";
import { Peminjaman } from "./peminjaman.js";

// relasi semua dikumpulin di sini
Book.hasMany(Peminjaman, { foreignKey: "bookId", as: "riwayat" });
Peminjaman.belongsTo(Book, { foreignKey: "bookId", as: "buku" });

export { Book, Peminjaman };
