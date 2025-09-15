import { Book } from '../models/book.js';
import { Op } from 'sequelize';

// GET all books
export async function getAllBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
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
    if (!book) return res.status(404).json({ message: 'Book not found' });

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
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET search books
export async function searchBooks(req, res) {
  try {
    const { penulis, judul, nama_yang_pinjam } = req.query;
    const whereClause = {};

    if (penulis) whereClause.penulis = { [Op.iLike]: `%${penulis}%` };
    if (judul) whereClause.judul = { [Op.iLike]: `%${judul}%` };
    if (nama_yang_pinjam) whereClause.nama_yang_pinjam = { [Op.iLike]: `%${nama_yang_pinjam}%` };

    const books = await Book.findAll({ where: whereClause });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
