export default function BookList({ books, onDelete, onEdit }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Peminjam</th>
          <th>Tahun</th>
          <th>Sudah Dikembalikan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.judul}</td>
            <td>{book.penulis}</td>
            <td>{book.nama_yang_pinjam || "-"}</td>
            <td>{book.tahun_publish || "-"}</td>
            <td>{book.sudah_dikembalikan ? "Ya" : "Belum"}</td>
            <td>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
