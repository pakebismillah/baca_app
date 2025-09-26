import {Book, Peminjaman} from "../models/model.js"
import { Op } from "sequelize";

// GET all books + status apakah sedang dipinjam
export async function getAllBooks(req, res) {
  try {
    const books = await Book.findAll({
      include: [{ model: Peminjaman, as: "riwayat" }],
    });

    const data = books.map(book => {
      const sedangDipinjam = book.riwayat.some(r => r.tanggalDikembalikan === null);
      return {
        id: book.id,
        penulis: book.penulis,
        judul: book.judul,
        tahun_publish: book.tahun_publish,
        sedangDipinjam,
        riwayat: book.riwayat.map(r => ({
      id: r.id,
      namaPeminjam: r.namaPeminjam,
      tanggalPinjam: r.tanggalPinjam,
      tanggalDikembalikan: r.tanggalDikembalikan,
    }))
      };
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET detail buku + riwayat peminjaman
export async function getBookById(req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id, {
      include: [{ model: Peminjaman, as: "riwayat" }],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("❌ Error getBookById:", error);
    res.status(500).json({ error: error.message });
  }
}


// POST create new book
export async function createBook(req, res) {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// PUT update book by id
export async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE book by id
export async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.destroy();
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET search books
export async function searchBooks(req, res) {
  try {
    const { q } = req.query; // ambil query 'q' dari frontend
    const whereClause = {};

    if (q) {
      // search di judul atau penulis
      whereClause[Op.or] = [
        { judul: { [Op.iLike]: `%${q}%` } },
        { penulis: { [Op.iLike]: `%${q}%` } }
      ];
    }

    const books = await Book.findAll({
      where: whereClause,
      include: [{ model: Peminjaman, as: "riwayat" }],
    });

    // tambahkan properti sedangDipinjam supaya frontend bisa langsung pakai
    const data = books.map(book => {
      const sedangDipinjam = book.riwayat.some(r => r.tanggalDikembalikan === null);
      return {
        id: book.id,
        penulis: book.penulis,
        judul: book.judul,
        tahun_publish: book.tahun_publish,
        sedangDipinjam,
        riwayat: book.riwayat.map(r => ({
          id: r.id,
          namaPeminjam: r.namaPeminjam,
          tanggalPinjam: r.tanggalPinjam,
          tanggalDikembalikan: r.tanggalDikembalikan,
        }))
      };
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

