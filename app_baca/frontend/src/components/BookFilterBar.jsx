import SearchBar from "./SearchBAr.jsx";

export default function BookFilterBar({ filterStatus, onFilterChange, onSearch }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-start sm:items-center">
      {/* Filter Status */}
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
      >
        <option value="all">Semua Status</option>
        <option value="tersedia">Hanya Tersedia</option>
        <option value="dipinjam">Sedang Dipinjam</option>
      </select>

      {/* Search Bar */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
