import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default NotFound;
