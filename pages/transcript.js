import { useState } from "react";
import {
  parseTranscriptToTxt,
  parseTranscriptToSbv,
  parseTranscriptToSrt,
} from "/pages/api/parser";

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
      setTranscript(data);
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

      {transcript && (
        <div>
          <div>
            <h2>JSON Transcript Object:</h2>
            <pre>{JSON.stringify(transcript, null, 2)}</pre>
          </div>
          <div>
            <h2>Text (.txt) Format:</h2>
            <pre>{parseTranscriptToTxt(transcript)}</pre>
          </div>

          <div>
            <h2>SubViewer (.sbv) Format:</h2>
            <pre>{parseTranscriptToSbv(transcript)}</pre>
          </div>

          <div>
            <h2>SubRip (.srt) Format:</h2>
            <pre>{parseTranscriptToSrt(transcript)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptPage;
