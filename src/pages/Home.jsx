import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Rick and Morty Explorer</h1>
      <p>Explore characters from across the Rick and Morty universe.</p>
      <Link to="/characters" className="cta-button">
        See Characters
      </Link>
    </div>
  );
}

export default Home;
