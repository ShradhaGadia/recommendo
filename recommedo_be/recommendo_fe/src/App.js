import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecommendationsPage from "./components/RecommendationsPage";
import FeedbackPage from "./components/FeedbackPage"; // Import FeedbackPage
import AboutPage from "./components/AboutPage"; // Import AboutPage
import ContactPage from "./components/ContactPage"; // Import ContactPage
import BooksPage from "./components/BooksPage"; 
import SongsPage from "./components/SongsPage";
import MoviesPage from "./components/MoviesPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/songs" element={<SongsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
