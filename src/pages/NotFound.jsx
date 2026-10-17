import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Page (Route: *)
 * Shown when navigating to unknown routes
 */
function NotFound() {
  return (
    <div className="state-box">
      <div className="state-icon">🌀</div>
      <h1 className="state-title">Page not found</h1>
      <p className="state-message">
        Looks like you stepped into a non-existent dimension! The portal you followed leads to nowhere.
      </p>
      <Link to="/" className="btn-primary" id="not-found-home-btn">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
