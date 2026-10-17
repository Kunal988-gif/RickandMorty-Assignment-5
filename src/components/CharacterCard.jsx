import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';

function CharacterCard({ character }) {
  if (!character) return null;

  return (
    <Link to={`/characters/${character.id}`} className="character-card">
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
      />
      <div className="character-name">{character.name}</div>
      <div className="character-species">{character.species}</div>
      <div>
        <StatusBadge status={character.status} />
      </div>
    </Link>
  );
}

export default CharacterCard;
