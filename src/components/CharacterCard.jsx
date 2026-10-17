import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';

/**
 * CharacterCard component
 * Displays character image, name, species, and status badge
 * Links directly to /characters/:id
 */
function CharacterCard({ character }) {
  if (!character) return null;

  return (
    <Link 
      to={`/characters/${character.id}`} 
      className="character-card"
      aria-label={`View details for ${character.name}`}
    >
      <div className="character-card-media">
        <img
          src={character.image}
          alt={character.name}
          className="character-card-img"
          loading="lazy"
        />
      </div>

      <div className="character-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
          <h3 className="character-card-title">{character.name}</h3>
        </div>

        <div className="character-card-meta">
          <span className="character-species">{character.species}</span>
          <StatusBadge status={character.status} />
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
