import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState({ penulis: "", judul: "", nama_yang_pinjam: "" });

  function handleChange(e) {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="penulis"
        placeholder="Cari Penulis"
        value={query.penulis}
        onChange={handleChange}
      />
      <input
        name="judul"
        placeholder="Cari Judul"
        value={query.judul}
        onChange={handleChange}
      />
      <input
        name="nama_yang_pinjam"
        placeholder="Cari Peminjam"
        value={query.nama_yang_pinjam}
        onChange={handleChange}
      />
      <button type="submit">Cari</button>
    </form>
  );
}
