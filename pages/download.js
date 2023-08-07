import React from "react";

const DownloadPage = () => {
  const handleDownload = async () => {
    const res = await fetch("/api/example");
    if (res.ok) {
      // Trigger the download by creating an anchor element
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "example.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("Error fetching file:", res.statusText);
    }
  };

  return (
    <div>
      <h1>Download Example</h1>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default DownloadPage;
