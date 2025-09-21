import { useState, useEffect } from "react";

export default function BookForm({ onSave, selectedBook, onCancel }) {
  const [form, setForm] = useState({
    penulis: "",
    judul: "",
    nama_yang_pinjam: "",
    tahun_publish: "",
    sudah_dikembalikan: false,
    tanggal_pinjam: "",
    tanggal_kembali: "",
  });

  useEffect(() => {
    if (selectedBook) setForm(selectedBook);
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    if (!selectedBook) {
      setForm({
        penulis: "",
        judul: "",
        nama_yang_pinjam: "",
        tahun_publish: "",
        sudah_dikembalikan: false,
        tanggal_pinjam: "",
        tanggal_kembali: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold mb-2">
        {selectedBook ? "Edit Buku" : "Tambah Buku"}
      </h2>

      <InputField label="Penulis" name="penulis" value={form.penulis} onChange={handleChange} />
      <InputField label="Judul" name="judul" value={form.judul} onChange={handleChange} />
      <InputField
        label="Nama Peminjam"
        name="nama_yang_pinjam"
        value={form.nama_yang_pinjam}
        onChange={handleChange}
      />
      <InputField
        label="Tahun Terbit"
        name="tahun_publish"
        type="number"
        value={form.tahun_publish}
        onChange={handleChange}
      />
      <InputField
        label="Tanggal Pinjam"
        name="tanggal_pinjam"
        type="date"
        value={form.tanggal_pinjam}
        onChange={handleChange}
      />
      <InputField
        label="Tanggal Kembali"
        name="tanggal_kembali"
        type="date"
        value={form.tanggal_kembali}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="sudah_dikembalikan"
          checked={form.sudah_dikembalikan}
          onChange={handleChange}
        />
        <span className="text-sm">Sudah dikembalikan</span>
      </label>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300"
        >
          Batal
        </button>
        <button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
    </div>
  );
}
