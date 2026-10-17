import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge.jsx';

function CharacterDetails() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const numericId = parseInt(id, 10);
    if (!numericId || numericId < 1) {
      setError('Invalid character ID.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Character not found.');
        }
        if (!res.ok) {
          throw new Error('Failed to fetch character details.');
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
          setError(err.message || 'An error occurred.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p>Loading character details...</p>;
  }

  if (error || !character) {
    return (
      <div className="details-container">
        <p>{error || 'Character not found.'}</p>
        <Link to="/characters" className="details-back-link">
          Back to Characters
        </Link>
      </div>
    );
  }

  const episodeCount = Array.isArray(character.episode) ? character.episode.length : 0;

  return (
    <div className="details-container">
      <Link to="/characters" className="details-back-link">
        &larr; Back to Characters
      </Link>

      <div className="details-card">
        <h1>{character.name}</h1>
        <img
          src={character.image}
          alt={character.name}
          className="details-image"
        />
        <div className="details-info">
          <p>
            <strong>Status:</strong> <StatusBadge status={character.status} />
          </p>
          <p>
            <strong>Gender:</strong> {character.gender || 'Unknown'}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin?.name || 'Unknown'}
          </p>
          <p>
            <strong>Current location:</strong> {character.location?.name || 'Unknown'}
          </p>
          <p>
            <strong>Number of episodes:</strong> {episodeCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
