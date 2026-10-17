import React from 'react';

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
      {status || 'Unknown'}
    </span>
  );
}

export default StatusBadge;
