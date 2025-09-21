import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import DatabasePage from "./pages/DatabasePage.jsx";
import AiPage from "./pages/AIPage.jsx";
import LogsPage from "./pages/LogsPage.jsx";

// Modern Icons Component (using emoji for now, but recommend Lucide React)
const Icon = ({ name, className = "" }) => (
  <span className={`mr-3 text-lg ${className}`}>{name}</span>
);

// Mobile Menu Toggle
const MenuToggle = ({ isOpen, setIsOpen }) => (
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
  </button>
);

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/", label: "AI Assistant", icon: "🤖", end: true },
    { path: "/database", label: "Database", icon: "📚" },
    { path: "/logs", label: "Logs", icon: "📊" },
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={() => setSidebarOpen(false)} // Close mobile menu on navigation
      className={({ isActive }) =>
        `flex items-center px-4 py-3 mx-2 rounded-xl transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
        }`
      }
    >
      <Icon name={item.icon} className="group-hover:scale-110 transition-transform" />
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile Menu Toggle */}
        <MenuToggle isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative z-40
          w-72 h-full bg-white shadow-xl
          flex flex-col
          transition-transform duration-300 ease-in-out
          border-r border-gray-200
        `}>
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Baca App</h1>
                <p className="text-sm text-gray-500">Book Management System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 Baca App</p>
              <p className="mt-1">Book Management & AI Assistant</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:ml-0 ml-0">
          <div className="flex-1 p-6 lg:p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<AiPage />} />
              <Route path="/database" element={<DatabasePage />} />
              <Route path="/logs" element={<LogsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}