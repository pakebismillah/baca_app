import { useEffect, useState } from "react";
import BookForm from "../components/BookForm.jsx";
import BookList from "../components/BookList.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function DatabasePage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const API_URL = "http://localhost:3000/books";

  async function fetchBooks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setBooks(data);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function handleSave(bookData) {
    if (selectedBook) {
      await fetch(`${API_URL}/${selectedBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
    }
    setSelectedBook(null);
    fetchBooks();
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchBooks();
  }

  async function handleSearch(query) {
    const params = new URLSearchParams(query);
    const res = await fetch(`${API_URL}/search?${params}`);
    const data = await res.json();
    setBooks(data);
  }

  return (
    <div>
      <h1>Manajemen Buku</h1>
      <BookForm
        onSave={handleSave}
        selectedBook={selectedBook}
        onCancel={() => setSelectedBook(null)}
      />
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} onDelete={handleDelete} onEdit={setSelectedBook} />
    </div>
  );
}
