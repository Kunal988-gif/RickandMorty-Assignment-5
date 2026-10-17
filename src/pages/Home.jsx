import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page (Route: /)
 * Contains hero section, introduction, and 'See Characters' CTA button
 */
function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <span className="hero-badge">Dimension C-137 Database</span>
        <h1 className="hero-title">Rick and Morty Explorer</h1>
        <p className="hero-desc">
          Dive into the multidimensional universe of Rick and Morty. Discover characters across
          infinite realities, check their life status, home planets, and episode appearances.
        </p>
        
        <Link to="/characters" className="btn-primary" id="see-characters-cta">
          <span>See Characters</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">🛸</div>
            <h3 className="feature-title">Multiverse Directory</h3>
            <p className="feature-text">
              Browse hundreds of bizarre beings, aliens, clones, and alternate timeline versions of Rick and Morty.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3 className="feature-title">Live Status &amp; Filters</h3>
            <p className="feature-text">
              Instantly track who is Alive, Dead, or unknown with live queries and instant status filtering.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌌</div>
            <h3 className="feature-title">Deep Character Insights</h3>
            <p className="feature-text">
              Inspect origin dimensions, current coordinates, species classification, and total episode credits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
