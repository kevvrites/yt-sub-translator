import { useState } from "react";

const TranscriptPage = () => {
  const [videoURL, setVideoURL] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleVideoURLChange = (event) => {
    setVideoURL(event.target.value);
  };

  const fetchTranscript = async () => {
    try {
      const response = await fetch(`/api/fetch?videoURL=${videoURL}`);
      const data = await response.json();
      setTranscript(data); // Store the fetched transcript in the component's state
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoURL}
        onChange={handleVideoURLChange}
        placeholder="Enter Video URL"
      />
      <button onClick={fetchTranscript}>Fetch Transcript</button>

      {/* Display the fetched transcript */}
      {transcript && (
        <div>
          <h2>Transcript:</h2>
          <pre>{JSON.stringify(transcript, null, 2)}</pre>
        </div>
      )}
      <Link
        to="/pages/api/download?fileName=original_transcript.txt"
        target="_blank"
        download
      >
        Download
      </Link>
    </div>
  );
};

export default TranscriptPage;
