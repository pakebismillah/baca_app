import Book from '../models/book.js';

// GET all books
export async function getAllBooks(req, res) {
    const books = await Book.findAll();
    res.json(books);
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
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.update(req.body);
    res.json(book);
}

// DELETE book by id
export async function deleteBook(req, res) {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.destroy();
    res.json({ message: 'Book deleted' });
}

// GET search books
export async function searchBooks(req, res) {
    const { author, title } = req.query;
    const whereClause = {};
    if (author) whereClause.author = author;
    if (title) whereClause.title = title;

    const books = await Book.findAll({ where: whereClause });
    res.json(books);
}
