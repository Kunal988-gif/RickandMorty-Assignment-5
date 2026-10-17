import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge.jsx';
import Loading from '../components/Loading.jsx';

/**
 * CharacterDetails Page (Route: /characters/:id)
 * Fetches and displays detailed character attributes by ID from useParams()
 */
function CharacterDetails() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    // Validate that id is a valid positive number
    const numericId = parseInt(id, 10);
    if (!numericId || numericId < 1) {
      setLoading(false);
      setError(`Invalid character ID "${id}". Please provide a valid numeric ID.`);
      return;
    }

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error(`Character with ID #${id} does not exist in Citadel records.`);
        }
        if (!res.ok) {
          throw new Error(`Failed to load character (Error ${res.status}: ${res.statusText})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isCancelled) {
          setCharacter(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message || 'An unexpected error occurred.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return <Loading message={`Retrieving dimension data for character #${id}...`} />;
  }

  if (error || !character) {
    return (
      <div className="state-box">
        <div className="state-icon">📡</div>
        <h2 className="state-title">Character Not Found</h2>
        <p className="state-message">{error || 'Unable to retrieve character data.'}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/characters" className="btn-secondary">
            &larr; Back to Characters
          </Link>
          <Link to="/" className="btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const episodeCount = Array.isArray(character.episode) ? character.episode.length : 0;

  return (
    <div className="details-page">
      <Link to="/characters" className="details-nav-back" id="back-to-characters-link">
        <span aria-hidden="true">&larr;</span> Back to Characters
      </Link>

      <div className="details-card">
        {/* Character Image */}
        <div className="details-media">
          <img
            src={character.image}
            alt={character.name}
            className="details-img"
          />
        </div>

        {/* Character Details Information */}
        <div className="details-content">
          <div className="details-header">
            <div>
              <h1 className="details-name">{character.name}</h1>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Citadel Subject ID #{character.id}
              </p>
            </div>
            <StatusBadge status={character.status} />
          </div>

          <div className="details-grid">
            {/* Species */}
            <div className="info-item">
              <span className="info-label">Species</span>
              <p className="info-value">{character.species || 'Unknown'}</p>
            </div>

            {/* Gender */}
            <div className="info-item">
              <span className="info-label">Gender</span>
              <p className="info-value">{character.gender || 'Unknown'}</p>
            </div>

            {/* Origin */}
            <div className="info-item">
              <span className="info-label">Origin</span>
              <p className="info-value">{character.origin?.name || 'Unknown'}</p>
            </div>

            {/* Current Location */}
            <div className="info-item">
              <span className="info-label">Last Known Location</span>
              <p className="info-value">{character.location?.name || 'Unknown'}</p>
            </div>

            {/* Episode Count */}
            <div className="info-item" style={{ gridColumn: '1 / -1' }}>
              <span className="info-label">Episode Appearances</span>
              <p className="info-value">
                Featured in <strong style={{ color: 'var(--portal-green)' }}>{episodeCount}</strong> {episodeCount === 1 ? 'episode' : 'episodes'}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="details-actions">
            <Link to="/characters" className="btn-secondary" id="details-back-btn">
              &larr; All Characters
            </Link>
            <Link to="/" className="btn-primary" id="details-home-btn">
              Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
