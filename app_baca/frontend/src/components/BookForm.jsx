import { useState, useEffect } from "react";

// ✅ pindah keluar biar stabil (gak bikin warning)
const initialForm = {
  penulis: "",
  judul: "",
  nama_yang_pinjam: "",
  tahun_publish: "",
  sudah_dikembalikan: false,
  tanggal_pinjam: "",
  tanggal_dikembalikan: "",
};

export default function BookForm({ onSave, selectedBook, onCancel }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        ...initialForm,
        ...selectedBook,
        tahun_publish: selectedBook.tahun_publish || "",
        tanggal_pinjam: selectedBook.tanggal_pinjam
          ? selectedBook.tanggal_pinjam.split("T")[0]
          : "",
        tanggal_dikembalikan: selectedBook.tanggal_dikembalikan
          ? selectedBook.tanggal_dikembalikan.split("T")[0]
          : "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [selectedBook]); // ✅ aman, gak ada warning lagi

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);

    if (!selectedBook) {
      // reset hanya saat tambah buku baru
      setFormData(initialForm);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="penulis"
        placeholder="Penulis"
        value={formData.penulis}
        onChange={handleChange}
        required
      />
      <input
        name="judul"
        placeholder="Judul"
        value={formData.judul}
        onChange={handleChange}
        required
      />
      <input
        name="nama_yang_pinjam"
        placeholder="Nama Peminjam"
        value={formData.nama_yang_pinjam}
        onChange={handleChange}
      />
      <input
        type="number"
        name="tahun_publish"
        placeholder="Tahun Publish"
        value={formData.tahun_publish}
        onChange={handleChange}
      />
      <label>
        Sudah Dikembalikan
        <input
          type="checkbox"
          name="sudah_dikembalikan"
          checked={formData.sudah_dikembalikan}
          onChange={handleChange}
        />
      </label>
      <input
        type="date"
        name="tanggal_pinjam"
        value={formData.tanggal_pinjam}
        onChange={handleChange}
      />
      <input
        type="date"
        name="tanggal_dikembalikan"
        value={formData.tanggal_dikembalikan}
        onChange={handleChange}
      />

      <button type="submit">
        {selectedBook ? "Update Buku" : "Tambah Buku"}
      </button>
      {selectedBook && (
        <button type="button" onClick={onCancel}>
          Batal
        </button>
      )}
    </form>
  );
}
