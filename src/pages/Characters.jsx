import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard.jsx';

function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = parseInt(searchParams.get('page'), 10) || 1;
  const urlName = searchParams.get('name') || '';
  const urlStatus = searchParams.get('status') || '';

  const [searchInput, setSearchInput] = useState(urlName);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    queryParams.set('page', urlPage.toString());
    if (urlName.trim()) {
      queryParams.set('name', urlName.trim());
    }
    if (urlStatus.trim()) {
      queryParams.set('status', urlStatus.trim());
    }

    fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`)
      .then((res) => {
        if (res.status === 404) {
          return { results: [], info: { pages: 0 } };
        }
        if (!res.ok) {
          throw new Error('Failed to fetch characters.');
        }
        return res.json();
      })
      .then((data) => {
        if (!isCancelled) {
          setCharacters(data.results || []);
          setTotalPages(data.info ? data.info.pages : 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message || 'Error loading characters.');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [urlPage, urlName, urlStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== urlName) {
        const updated = new URLSearchParams(searchParams);
        if (searchInput.trim()) {
          updated.set('name', searchInput.trim());
        } else {
          updated.delete('name');
        }
        updated.set('page', '1');
        setSearchParams(updated);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, urlName, searchParams, setSearchParams]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    const updated = new URLSearchParams(searchParams);
    if (selectedStatus) {
      updated.set('status', selectedStatus);
    } else {
      updated.delete('status');
    }
    updated.set('page', '1');
    setSearchParams(updated);
  };

  const handlePrevPage = () => {
    if (urlPage > 1) {
      const updated = new URLSearchParams(searchParams);
      updated.set('page', (urlPage - 1).toString());
      setSearchParams(updated);
    }
  };

  const handleNextPage = () => {
    if (urlPage < totalPages) {
      const updated = new URLSearchParams(searchParams);
      updated.set('page', (urlPage + 1).toString());
      setSearchParams(updated);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '16px' }}>Characters</h1>

      <div className="controls-bar">
        <input
          type="text"
          placeholder="Filter by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <label htmlFor="status-select">
          Status:{' '}
          <select
            id="status-select"
            value={urlStatus}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading characters...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p>No characters found.</p>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <div className="characters-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={urlPage <= 1}
            >
              Previous
            </button>

            <span>
              Page {urlPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={urlPage >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Characters;
