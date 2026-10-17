import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard.jsx';
import Loading from '../components/Loading.jsx';

/**
 * Characters Page (Route: /characters)
 * Displays paginated grid of Rick and Morty characters with name search,
 * status filtering, and URL-synchronized pagination.
 */
function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL parameters with safe fallbacks
  const urlPage = parseInt(searchParams.get('page'), 10) || 1;
  const urlName = searchParams.get('name') || '';
  const urlStatus = searchParams.get('status') || '';

  // Local state for search input to allow smooth controlled typing
  const [searchInput, setSearchInput] = useState(urlName);

  // Data fetching states
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync search input if URL changes externally (e.g., browser back button)
  useEffect(() => {
    setSearchInput(urlName);
  }, [urlName]);

  // Fetch characters when page, name, or status query changes
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    // Build the Rick and Morty API URL
    const queryParams = new URLSearchParams();
    queryParams.set('page', urlPage.toString());
    if (urlName.trim()) {
      queryParams.set('name', urlName.trim());
    }
    if (urlStatus.trim()) {
      queryParams.set('status', urlStatus.trim());
    }

    const apiUrl = `https://rickandmortyapi.com/api/character/?${queryParams.toString()}`;

    fetch(apiUrl)
      .then((res) => {
        if (res.status === 404) {
          // The API returns 404 when no characters match the criteria
          return { results: [], info: { pages: 0 } };
        }
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
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
          setError(err.message || 'Failed to fetch characters.');
          setLoading(false);
        }
      });

    // Cleanup to prevent stale responses from updating state
    return () => {
      isCancelled = true;
    };
  }, [urlPage, urlName, urlStatus]);

  // Helper to update search params while preserving other params
  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated);
  };

  // Debounce search input to avoid overwhelming API on rapid typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== urlName) {
        const updated = new URLSearchParams(searchParams);
        if (searchInput.trim()) {
          updated.set('name', searchInput.trim());
        } else {
          updated.delete('name');
        }
        updated.set('page', '1'); // Reset to page 1 on new search
        setSearchParams(updated);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput, urlName, searchParams, setSearchParams]);

  // Handle status filter change
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    updateParams({
      status: selectedStatus,
      page: '1', // Reset pagination to page 1 on status change
    });
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (urlPage > 1) {
      updateParams({ page: (urlPage - 1).toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (urlPage < totalPages) {
      updateParams({ page: (urlPage + 1).toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setSearchParams({ page: '1' });
  };

  return (
    <div className="characters-page">
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', marginBottom: '0.4rem' }}>
          Multiverse Characters
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Explore inhabitants of the Citadel, Dimension C-137, and beyond.
        </p>
      </div>

      {/* Search and Status Filter Controls */}
      <div className="controls-bar">
        <div className="search-box">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            id="character-search-input"
            className="search-input"
            placeholder="Search characters by name (e.g. Rick, Morty)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter-select" className="filter-label">
            Status:
          </label>
          <select
            id="status-filter-select"
            className="filter-select"
            value={urlStatus}
            onChange={handleStatusChange}
          >
            <option value="">All statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      {/* Content Rendering: Loading, Error, Empty, or Character Grid */}
      {loading ? (
        <Loading message="Scanning dimensions for characters..." />
      ) : error ? (
        <div className="state-box">
          <div className="state-icon">⚠️</div>
          <h2 className="state-title">Connection Lost in Deep Space</h2>
          <p className="state-message">{error}</p>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => updateParams({ page: urlPage.toString() })}
          >
            Retry Portal Jump
          </button>
        </div>
      ) : characters.length === 0 ? (
        <div className="state-box">
          <div className="state-icon">🔎</div>
          <h2 className="state-title">No characters found</h2>
          <p className="state-message">
            No lifeforms matched your search criteria. Try a different name or status filter.
          </p>
          <button type="button" className="btn-secondary" onClick={handleClearFilters}>
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Character Cards Grid */}
          <div className="characters-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-bar">
              <button
                type="button"
                id="pagination-prev-btn"
                className="btn-secondary"
                onClick={handlePrevPage}
                disabled={urlPage <= 1}
                aria-label="Previous page"
              >
                &larr; Previous
              </button>

              <span className="page-indicator">
                Page <strong>{urlPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                type="button"
                id="pagination-next-btn"
                className="btn-secondary"
                onClick={handleNextPage}
                disabled={urlPage >= totalPages}
                aria-label="Next page"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Characters;
