import { Book, Peminjaman } from "../models/model.js";

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
    const sedangDipinjam = await Peminjaman.findOne({
      where: { bookId, tanggalDikembalikan: null },
    });
    if (sedangDipinjam) {
      return res.status(400).json({ message: "Buku sedang dipinjam" });
    }

    const peminjaman = await Peminjaman.create({
      bookId,
      namaPeminjam,
      tanggalPinjam: new Date(), // jadi kita tinggal input nama aja
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

    const peminjaman = await Peminjaman.findByPk(id);

    if (!peminjaman) {
      return res.status(404).json({ message: "Peminjaman not found" });
    }

    if (peminjaman.tanggalDikembalikan !== null) {
      return res
        .status(400)
        .json({ message: "Buku sudah dikembalikan sebelumnya" });
    }

    // langsung isi tanggal sekarang
    peminjaman.tanggalDikembalikan = new Date();
    await peminjaman.save();

    res.status(200).json({
      message: "Buku berhasil dikembalikan",
      peminjaman,
    });
  } catch (error) {
    console.error("❌ Error di kembalikanBuku:", error);
    res.status(500).json({ error: error.message });
  }
}

