import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

interface PreviewProps {
  pdfUrl?: string;
  pdfPageNumber?: string;
}

const Preview: React.FC<PreviewProps> = ({ pdfUrl, pdfPageNumber }) => {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>('');
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0); // Changed to number for Viewer

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const updateScreenHeight = () => setScreenHeight(window.innerHeight);
    updateScreenHeight();
    window.addEventListener('resize', updateScreenHeight);
    return () => window.removeEventListener('resize', updateScreenHeight);
  }, []);

  useEffect(() => {
    if (pdfUrl) {
      const fullPath = pdfUrl;
      const dataFolderIndex = fullPath.indexOf("data/");
      const relativePath = dataFolderIndex !== -1 ? fullPath.substring(dataFolderIndex) : fullPath;
      setCurrentPdfUrl(relativePath);
    }
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfPageNumber) {
      setCurrentPageNumber(parseInt(pdfPageNumber, 10) - 1);
    }
  }, [pdfPageNumber]);

  const uniqueKey = `${currentPdfUrl}-${currentPageNumber}`;

  return (
    <div key={uniqueKey}>
      <Worker workerUrl="./js/pdf-worker-min.js">
        <div style={{ height: `${screenHeight}px` }}>
          {currentPdfUrl && (
            <Viewer 
              fileUrl={currentPdfUrl}
              initialPage={currentPageNumber}
              plugins={[
                defaultLayoutPluginInstance, 
                pageNavigationPluginInstance
              ]}
            />
          )}
        </div>
      </Worker>
    </div>
  );
};

export default Preview;
