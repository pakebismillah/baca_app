// src/components/PinjamModal.jsx
import { useState } from "react";

export default function PinjamModal({ isOpen, onClose, onConfirm, bookTitle, loading }) {
  const [namaPeminjam, setNamaPeminjam] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (namaPeminjam.trim()) {
      onConfirm(namaPeminjam.trim());
      setNamaPeminjam('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pinjam Buku</h3>
        <p className="text-gray-600 mb-4">Buku: <span className="font-medium">{bookTitle}</span></p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Peminjam
            </label>
            <input
              type="text"
              value={namaPeminjam}
              onChange={(e) => setNamaPeminjam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan nama peminjam"
              required
              disabled={loading}
            />
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={loading || !namaPeminjam.trim()}
            >
              {loading ? 'Memproses...' : 'Pinjam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
