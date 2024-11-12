import React, { useState } from 'react';
import PdfViewer from './components/PdfViewer';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pdfUrl = `${process.env.PUBLIC_URL}/Sample.pdf`; // Reference PDF in the public folder

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">PDF Co-Viewer</h1>

      {/* Admin Toggle Button */}
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 mb-8"
      >
        {isAdmin ? 'Switch to Viewer Mode' : 'Switch to Admin Mode'}
      </button>

      {/* PdfViewer Component */}
      <div className="w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white">
        <PdfViewer isAdmin={isAdmin} pdfUrl={pdfUrl} />
      </div>
    </div>
  );
}

export default App;
