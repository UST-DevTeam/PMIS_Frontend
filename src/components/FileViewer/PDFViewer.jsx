import React, { useState, useEffect } from 'react';
import { Document, Page } from '@react-pdf/renderer';

const PDFViewer = ({ pdfBlob }) => {
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    if (pdfBlob) {
      // Use Blob URL to display PDF
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    }
  }, [pdfBlob]);

  return (
    <div>
      {pdfBlob && (
        <Document file={pdfBlob}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;

