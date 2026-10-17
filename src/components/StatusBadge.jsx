import React from 'react';

/**
 * StatusBadge component
 * Displays character status with colored badge:
 * - Alive: green
 * - Dead: red
 * - unknown: grey
 */
function StatusBadge({ status }) {
  const normalizedStatus = (status || 'unknown').toLowerCase();
  
  let statusClass = 'status-unknown';
  if (normalizedStatus === 'alive') {
    statusClass = 'status-alive';
  } else if (normalizedStatus === 'dead') {
    statusClass = 'status-dead';
  }

  return (
    <span className={`status-badge ${statusClass}`}>
      <span className="status-dot"></span>
      {status || 'Unknown'}
    </span>
  );
}

export default StatusBadge;
