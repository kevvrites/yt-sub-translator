// components/TranscriptDownloadButton.js
import React from "react";

const TranscriptDownloadButton = ({ format }) => {
  const handleDownload = async () => {
    try {
      // Fetch the transcript from the API endpoint
      const response = await fetch(`/api/transcript?format=${format}`);

      // Convert the response to text
      const transcriptContent = await response.text();

      // Create a Blob and create a download link
      const blob = new Blob([transcriptContent], { type: `text/${format}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transcript.${format}`;
      a.click();

      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  return <button onClick={handleDownload}>Download {format}</button>;
};

export default TranscriptDownloadButton;
