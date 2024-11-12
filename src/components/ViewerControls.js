import React from 'react';

function ViewerControls({ currentPage, numPages }) {
  return (
    <div className="viewer-controls">
      <span>Page {currentPage} of {numPages}</span>
    </div>
  );
}

export default ViewerControls;