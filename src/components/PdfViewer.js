import React, { useState, useEffect, useCallback } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import AdminControls from './AdminControls';

pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min.js');

const PdfViewer = ({ isAdmin, pdfUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    if (isAdmin) {
      set(ref(db, 'currentPage'), currentPage);
      console.log('Admin Mode: Updated Firebase with current page:', currentPage);
    }
  }, [currentPage, isAdmin]);

  useEffect(() => {
    if (!isAdmin) {
      const pageRef = ref(db, 'currentPage');
      const unsubscribe = onValue(pageRef, (snapshot) => {
        const page = snapshot.val();
        if (page && page !== currentPage) {
          setCurrentPage(page);
          console.log('Viewer Mode: Synced page from Firebase:', page);
        }
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const onLoadSuccess = ({ numPages: loadedPages }) => {
    setNumPages(loadedPages);
    console.log('PDF loaded. Total pages:', loadedPages);
  };

  const onPrevious = useCallback(() => {
    if (isAdmin && currentPage > 1) {
      console.log('Previous button function triggered');
      setCurrentPage(() => currentPage - 1);
    }
  }, [isAdmin, currentPage]);

  const onNext = useCallback(() => {
    if (isAdmin && currentPage < numPages) {
      console.log('Next button function triggered');
      setCurrentPage(() => currentPage + 1);
    }
  }, [isAdmin, currentPage, numPages]);

  const handlePageChange = ({ currentPage }) => {
    const page = currentPage + 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative w-full h-96 mt-6">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={pdfUrl}
          pageIndex={currentPage - 1}
          onPageChange={handlePageChange}
          onLoadSuccess={onLoadSuccess}  // Ensure onLoadSuccess is properly triggered
        />
      </Worker>

      {isAdmin && (
        <AdminControls
          onPrevious={onPrevious}
          onNext={onNext}
          currentPage={currentPage}
          numPages={numPages}
        />
      )}
    </div>
  );
};

export default PdfViewer;
