import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        className="w-full rounded-xl border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        placeholder="Cari judul buku..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
