import { useState, useEffect } from "react";

// Input Field Component
function InputField({ label, name, value, onChange, type = "text", required = false, disabled = false }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          disabled 
            ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      />
    </div>
  );
}

export default function BookForm({ onSave, selectedBook, onCancel, loading }) {
  const [form, setForm] = useState({
    penulis: "",
    judul: "",
    tahun_publish: "",
  });

  useEffect(() => {
    if (selectedBook) {
      setForm({
        penulis: selectedBook.penulis || "",
        judul: selectedBook.judul || "",
        tahun_publish: selectedBook.tahun_publish || "",
      });
    } else {
      setForm({
        penulis: "",
        judul: "",
        tahun_publish: "",
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!form.judul.trim() || !form.penulis.trim()) {
      return;
    }

    onSave(form);
    
    // Reset form hanya jika bukan edit
    if (!selectedBook) {
      setForm({
        penulis: "",
        judul: "",
        tahun_publish: "",
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    
    // Reset form ke state awal
    if (selectedBook) {
      setForm({
        penulis: selectedBook.penulis || "",
        judul: selectedBook.judul || "",
        tahun_publish: selectedBook.tahun_publish || "",
      });
    } else {
      setForm({
        penulis: "",
        judul: "",
        tahun_publish: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Judul Buku"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          required={true}
          disabled={loading}
        />

        <InputField
          label="Penulis"
          name="penulis"
          value={form.penulis}
          onChange={handleChange}
          required={true}
          disabled={loading}
        />

        <InputField
          label="Tahun Terbit"
          name="tahun_publish"
          type="number"
          value={form.tahun_publish}
          onChange={handleChange}
          disabled={loading}
        />

        {/* Info untuk editing */}
        {selectedBook && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800 mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Informasi Buku</span>
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <div>Status: {selectedBook.sedangDipinjam ? 'Sedang Dipinjam' : 'Tersedia'}</div>
              {selectedBook.sedangDipinjam && selectedBook.riwayat && (
                <div>
                  {(() => {
                    const activePeminjaman = selectedBook.riwayat.find(r => r.tanggalDikembalikan === null);
                    return activePeminjaman ? `Dipinjam oleh: ${activePeminjaman.namaPeminjam}` : '';
                  })()}
                </div>
              )}
              {selectedBook.riwayat && selectedBook.riwayat.length > 0 && (
                <div>Total peminjaman: {selectedBook.riwayat.length} kali</div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading || !form.judul.trim() || !form.penulis.trim()}
            className="flex-1 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              selectedBook ? 'Perbarui Buku' : 'Tambah Buku'
            )}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p className="mb-2">💡 <strong>Tips:</strong></p>
        <ul className="space-y-1 ml-4">
          <li>• Peminjaman dikelola terpisah melalui tombol "Pinjam" dan "Kembalikan" di daftar buku</li>
          <li>• Form ini hanya untuk mengelola informasi dasar buku</li>
          <li>• Buku yang sedang dipinjam tidak bisa dihapus</li>
        </ul>
      </div>
    </div>
  );
}