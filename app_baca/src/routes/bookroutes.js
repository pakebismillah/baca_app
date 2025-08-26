import express from 'express';
import {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    searchBooks
} from '../controllers/bookcontrollers.js';

const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.get('/books/search', searchBooks);

export default router;