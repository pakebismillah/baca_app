/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.jsx";
import BookList from "../components/BookList.jsx";
import SearchBar from "../components/SearchBAr.jsx";
import Spinner from "../components/Spinner.jsx";

// Success/Error Message Component
const AlertMessage = ({ message, type = 'success', onClose }) => {
  const baseClasses = "px-4 py-3 rounded-lg relative mb-6 border-l-4 shadow-sm";
  const typeClasses = {
    success: "bg-green-50 border-green-400 text-green-700 border-l-green-500",
    error: "bg-red-50 border-red-400 text-red-700 border-l-red-500",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-700 border-l-yellow-500"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} animate-slide-down`} role="alert">
      <div className="flex items-center justify-between">
        <span className="block sm:inline font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Page Header Component
const PageHeader = ({ title, subtitle }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

export default function DatabasePage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  const API_URL = "http://localhost:3000/books";

  // Show message with auto-dismiss
  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
  };

  async function fetchBooks() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      showMessage('Gagal memuat data buku', 'error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function handleSave(bookData) {
    setLoading(true);
    try {
      const dataToSend = {
        ...bookData,
        tahun_publish: bookData.tahun_publish ? parseInt(bookData.tahun_publish) : null,
        tanggal_pinjam: bookData.tanggal_pinjam || null,
        tanggal_dikembalikan: bookData.tanggal_dikembalikan || null,
      };

      const url = selectedBook ? `${API_URL}/${selectedBook.id}` : API_URL;
      const method = selectedBook ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Failed to save book');

      setSelectedBook(null);
      await fetchBooks();
      showMessage(`Buku berhasil ${selectedBook ? 'diperbarui' : 'ditambahkan'}!`, 'success');
    } catch (error) {
      showMessage('Gagal menyimpan data buku', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error('Failed to delete book');
      
      await fetchBooks();
      showMessage("Buku berhasil dihapus!", 'success');
   
    } catch (error) {
      showMessage('Gagal menghapus buku', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: query.judul });
      const res = await fetch(`${API_URL}/search?${params}`);
      if (!res.ok) throw new Error('Search failed');
      
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      showMessage('Gagal melakukan pencarian', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleClearSearch = () => {
    fetchBooks();
  };

  return (
    <div className="min-h-full">
      {/* Page Header */}
      <PageHeader 
        title="Manajemen Buku" 
        subtitle="Kelola koleksi buku perpustakaan Anda dengan mudah"
      />

      {/* Alert Messages */}
      {message && (
        <AlertMessage
          message={message}
          type={messageType}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Book Form */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedBook ? 'Edit Buku' : 'Tambah Buku Baru'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedBook ? 'Perbarui informasi buku yang dipilih' : 'Tambahkan buku baru ke dalam database'}
              </p>
            </div>
            <div className="p-6">
              <BookForm
                onSave={handleSave}
                selectedBook={selectedBook}
                onCancel={() => setSelectedBook(null)}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Book List */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Daftar Buku</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Total {books.length} buku dalam database
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
                </div>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner />
                </div>
              ) : (
                <BookList 
                  books={books} 
                  onDelete={handleDelete} 
                  onEdit={setSelectedBook}
                  selectedBookId={selectedBook?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}