import express from "express";
import {
  getAllPeminjaman,
  pinjamBuku,
  kembalikanBuku
} from "../controllers/peminjamanController.js";

const router = express.Router();

router.get("/peminjaman", getAllPeminjaman);           // list semua peminjaman
router.post("/peminjaman/:bookId/pinjam", pinjamBuku); // pinjam buku
router.put("/peminjaman/:id/kembalikan", kembalikanBuku); // kembalikan buku

export default router;
