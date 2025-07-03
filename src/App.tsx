import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import WorkPage from './components/WorkPage';
import HomePage from './components/HomePage';
import './CSS/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ marginBottom: 32, display: 'flex', gap: 16 }}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/work">Work</Link>
      </nav>
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