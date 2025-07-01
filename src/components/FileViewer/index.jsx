import React from 'react';
import PDFViewer from './PDFViewer';
import PPTViewer from './PPTViewer';

const FileViewer = ({ url, ftype }) => {
    return (
        <div>
            {
                ftype == "pdf" && <PDFViewer pdfUrl={url} />
            }


            {
                (ftype == "ppt" || ftype == "pptx")  && <PPTViewer pptUrl={url} />
            }
            
        </div>
    );
};

export default FileViewer;