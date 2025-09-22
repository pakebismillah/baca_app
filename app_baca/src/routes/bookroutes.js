import express from 'express';
import {
    getAllBooks,
    getBookDetail,
    createBook,
    updateBook,
    deleteBook,
    searchBooks
} from '../controllers/bookcontrollers.js';

const router = express.Router();

router.get('/books', getAllBooks);          // list semua buku + status pinjam
router.get('/books/search', searchBooks);   // cari buku
router.get('/books/:id', getBookDetail);    // detail 1 buku + riwayat
router.post('/books', createBook);          // tambah buku
router.put('/books/:id', updateBook);       // update buku
router.delete('/books/:id', deleteBook);    // hapus buku


export default router;