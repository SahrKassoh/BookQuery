import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import FindBook from "./FindBook";
import CreateBook from "./CreateBook";
import Library from "./library";
import './Home.css';
function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-book">Create Book</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/find-book">Find Book</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/library" element={<Library />} />
        <Route path="/find-book" element={<FindBook />} />
      </Routes>

      <footer className="footer">
        <div className="container">
          <p>Made by Sahr Kassoh</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;


