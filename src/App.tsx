import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchTests from './pages/SearchTests';
import TestComparison from './pages/TestComparison';
import BookingPage from './pages/BookingPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchTests />} />
            <Route path="/compare" element={<TestComparison />} />
            <Route path="/book/:testId" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;