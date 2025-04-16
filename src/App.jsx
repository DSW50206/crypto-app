import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CryptoList from "./components/CryptoList";
import FavoriteList from "./components/FavoriteList";

function App() {
  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <h1>CryptoApp 💰</h1>
        <nav style={{ marginBottom: "2rem" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>
            🏠 Strona główna
          </Link>
          <Link to="/favorites">⭐ Ulubione</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CryptoList />} />
          <Route path="/favorites" element={<FavoriteList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
