import { Book } from "../models/book.js";
import { Peminjaman } from "../models/peminjaman.js";

// GET semua transaksi peminjaman
export async function getAllPeminjaman(req, res) {
  try {
    const peminjaman = await Peminjaman.findAll({
      include: [{ model: Book, as: "buku" }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(peminjaman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST pinjam buku
export async function pinjamBuku(req, res) {
  try {
    const { bookId } = req.params;
    const { namaPeminjam, tanggalPinjam } = req.body; // ganti jadi camelCase

    const book = await Book.findByPk(bookId, {
      include: [{ model: Peminjaman, as: "riwayat" }],
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    // cek apakah masih ada peminjaman aktif
    const sedangDipinjam = book.riwayat.some(r => r.tanggalDikembalikan === null);
    if (sedangDipinjam) {
      return res.status(400).json({ message: "Buku sedang dipinjam" });
    }

    const peminjaman = await Peminjaman.create({
      bookId,
      namaPeminjam,
      tanggalPinjam: tanggalPinjam || new Date(),
      tanggalDikembalikan: null,
    });

    res.status(201).json(peminjaman);
  } catch (error) {
    console.error("❌ Error di pinjamBuku:", error);
    res.status(500).json({ error: error.message });
  }
}

// PUT kembalikan buku
export async function kembalikanBuku(req, res) {
  try {
    const { id } = req.params; // id peminjaman
    const { tanggalDikembalikan } = req.body;

    console.log("📥 Request kembalikanBuku:", { id, tanggalDikembalikan });

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      console.warn("⚠️ Peminjaman tidak ditemukan:", id);
      return res.status(404).json({ message: "Peminjaman not found" });
    }

    if (peminjaman.tanggalDikembalikan !== null) {
      console.warn("⚠️ Buku sudah dikembalikan:", peminjaman.id);
      return res.status(400).json({ message: "Buku sudah dikembalikan sebelumnya" });
    }

    await peminjaman.update({
      tanggalDikembalikan: tanggalDikembalikan || new Date(),
    });

    console.log("✅ Buku berhasil dikembalikan:", peminjaman.id);

    res.status(200).json({ message: "Buku berhasil dikembalikan", peminjaman });
  } catch (error) {
    console.error("❌ Error di kembalikanBuku:", error);
    res.status(500).json({ error: error.message });
  }
}

