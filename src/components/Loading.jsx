import React from 'react';

/**
 * Loading component
 * Renders an animated portal spinner and loading text
 */
function Loading({ message = 'Accessing Multiverse Data...' }) {
  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div className="portal-spinner" aria-hidden="true"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default Loading;
