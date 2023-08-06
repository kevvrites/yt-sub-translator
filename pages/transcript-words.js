import { useState } from "react";

const TranscriptPage = () => {
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState([]);

  const handleVideoIdChange = (event) => {
    setVideoId(event.target.value);
  };

  const fetchTranscript = async () => {
    try {
      const response = await fetch(`/api/fetch?videoId=${videoId}`);
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
        value={videoId}
        onChange={handleVideoIdChange}
        placeholder="Enter Video ID"
      />
      <button onClick={fetchTranscript}>Fetch Transcript</button>

      {/* Display the fetched transcript */}
      {transcript.length > 0 && (
        <div>
          <h2>Transcript:</h2>
          <pre>
            {transcript.map((item, index) => (
              <span key={index}>
                {item.text}
                <br />
              </span>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TranscriptPage;
