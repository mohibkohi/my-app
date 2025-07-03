import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import WorkPage from './components/WorkPage';
import HomePage from './components/HomePage';
import './CSS/index.css';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <header>
        <button
          type="button"
          className="burger"
          title="Menu"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="burger__bun"></span>
          <span className="burger__meat"></span>
          <span className="burger__bun"></span>
        </button>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className="nav-link" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className="nav-link" to="/work" onClick={() => setMenuOpen(false)}>Work</Link>
        </nav>
      </header>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;