import React from 'react';

function AdminControls({ onNext, onPrevious, currentPage, numPages }) {
  return (
    <div className="absolute top-4 right-4 flex space-x-4 z-10">
      <button 
        onClick={() => {
          console.log('Previous button clicked');
          onPrevious();
        }} 
        disabled={currentPage <= 1} // Disable if on the first page
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Previous
      </button>

      <button 
        onClick={() => {
          console.log('Next button clicked');
          onNext();
        }}
        disabled={currentPage >= numPages} // Disable if on the last page
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
}

export default AdminControls;
