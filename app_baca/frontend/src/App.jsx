import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DatabasePage from "./pages/DatabasePage.jsx";
import AiPage from "./pages/AIPage.jsx";

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Database</Link>
        <Link to="/ai">AI Assistant</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DatabasePage />} />
        <Route path="/ai" element={<AiPage />} />
      </Routes>
    </Router>
  );
}
