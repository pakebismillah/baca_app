// Status Badge Component
const StatusBadge = ({ sedangDipinjam }) => {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full border";
  const statusClasses = sedangDipinjam
    ? "bg-red-50 text-red-700 border-red-200"
    : "bg-green-50 text-green-700 border-green-200";

  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      {sedangDipinjam ? "Sedang Dipinjam" : "Tersedia"}
    </span>
  );
};

// Action Buttons Component
const BookActions = ({ book, onEdit, onDelete, onPinjam, onKembalikan }) => {
  return (
    <div className="flex gap-2">
      {/* Tombol Pinjam - hanya muncul jika buku tersedia */}
      {!book.sedangDipinjam && (
        <button
          onClick={() => onPinjam(book)}
          className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium transition-colors"
          title="Pinjam buku"
        >
          Pinjam
        </button>
      )}

      {/* Tombol Kembalikan - hanya muncul jika buku sedang dipinjam */}
      {book.sedangDipinjam && (
        <button
          onClick={() => onKembalikan(book)}
          className="px-3 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs font-medium transition-colors"
          title="Kembalikan buku"
        >
          Kembalikan
        </button>
      )}

      {/* Tombol Edit - selalu ada */}
      <button
        onClick={() => onEdit(book)}
        className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium transition-colors"
        title="Edit buku"
      >
        Edit
      </button>

      {/* Tombol Hapus - hanya bisa hapus jika tidak sedang dipinjam */}
      <button
        onClick={() => onDelete(book.id)}
        disabled={book.sedangDipinjam}
        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
          book.sedangDipinjam
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
        title={
          book.sedangDipinjam
            ? "Tidak bisa hapus buku yang sedang dipinjam"
            : "Hapus buku"
        }
      >
        Hapus
      </button>
    </div>
  );
};

// Peminjam Info Component
const PeminjamInfo = ({ book }) => {
  if (!book.sedangDipinjam) {
    return <span className="text-gray-400 text-sm">-</span>;
  }

  const activePeminjaman = book.riwayat?.find(
    (r) => r.tanggalDikembalikan === null
  );

  if (!activePeminjaman) {
    return <span className="text-gray-400 text-sm">-</span>;
  }

  const tanggalPinjam = new Date(
    activePeminjaman.tanggalPinjam
  ).toLocaleDateString("id-ID");

  return (
    <div className="text-sm text-center">
      <div className="font-bold text-gray-900">
        {activePeminjaman.namaPeminjam}
      </div>
      <div className="text-gray-500 text-xs">Sejak: {tanggalPinjam}</div>
    </div>
  );
};

export default function BookList({
  books,
  onEdit,
  onDelete,
  onPinjam,
  onKembalikan,
  selectedBookId,
}) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">📚</div>
        <p className="text-gray-500">Tidak ada buku yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">
              Judul
            </th>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">
              Penulis
            </th>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">
              Tahun
            </th>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">
              Status
            </th>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">
              Peminjam
            </th>
            <th className="px-6 py-4 text-left font-semibold text-gray-900">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className={`border-t border-gray-200 hover:bg-gray-50 transition-colors ${
                selectedBookId === book.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{book.judul}</div>
              </td>
              <td className="px-6 py-4 text-gray-700">{book.penulis}</td>
              <td className="px-6 py-4 text-gray-700">
                {book.tahun_publish || "-"}
              </td>
              <td className="px-6 py-4">
                <StatusBadge sedangDipinjam={book.sedangDipinjam} />
              </td>
              <td className="px-6 py-4 text-center">
                <PeminjamInfo book={book} />
              </td>

              <td className="px-6 py-4">
                <BookActions
                  book={book}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPinjam={onPinjam}
                  onKembalikan={onKembalikan}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
