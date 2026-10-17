import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Characters from './pages/Characters.jsx';
import CharacterDetails from './pages/CharacterDetails.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Root Application Component
 * Sets up BrowserRouter and defines client-side routes for the Rick and Morty Explorer:
 * - Route 1: / -> Home
 * - Route 2: /characters -> Characters list
 * - Route 3: /characters/:id -> Character details
 * - Route 4: * -> 404 Not Found
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navigation Bar present across all pages */}
        <Navbar />

        {/* Main Content Area with Route Switching */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            PS4 College Assignment &bull; Built with React &amp; React Router &bull; Data from{' '}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              The Rick and Morty API
            </a>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
