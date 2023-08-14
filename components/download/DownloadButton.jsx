import React from 'react';
import download from 'downloadjs';
import styles from './styles.module.css'

const DownloadButton = ({ content, fileExtension, fileName = "transcript",  mimeType = 'text/plain' }) => {
  const handleDownload = () => {
    const formattedFileName = `${fileName}.${fileExtension}`
    download(content, formattedFileName, mimeType);
  };

  return (
    <div>
      <button className={styles.downloadbtn} onClick={handleDownload}>Download Transcript</button>
    </div>
  );
};

export default DownloadButton;