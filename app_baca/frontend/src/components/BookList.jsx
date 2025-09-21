export default function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Judul</th>
            <th className="px-4 py-2">Penulis</th>
            <th className="px-4 py-2">Peminjam</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{b.judul}</td>
              <td className="px-4 py-2">{b.penulis}</td>
              <td className="px-4 py-2">{b.nama_yang_pinjam || "-"}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    b.sudah_dikembalikan ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.sudah_dikembalikan ? "Dikembalikan" : "Dipinjam"}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(b)}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(b)}
                  className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
