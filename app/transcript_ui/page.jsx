"use client";
import { useState } from "react";
export default function Transcript() {
  const [inputUrl, setInputUrl] = useState(
    "https://www.youtube.com/watch?v=1h1gzh3r7OA"
  );
  const [transcript, setTranscript] = useState(
    "Transcript will appear here once processed."
  );
  const [isFetching, setIsFetching] = useState(false);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Simplified Chinese");
  const [fileFormat, setFileFormat] = useState("txt");

  const fetchTranscript = async () => {
    const response = await fetch(
      `api/fetch?videoURL=${inputUrl}&sourcelang=${sourceLang}&targetlang=${targetLang}&format=${fileFormat}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("bad");
    }
    const transcript = await response.json();
    setTranscript(transcript);
  };

  return (
    <div>
      <h1>Fetch YouTube Transcript</h1>
      <div>
        <label>
          Enter YouTube URL:
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            style={{ width: "80%", padding: "0.5rem" }}
          />
        </label>
      </div>
      <div>
        <button onClick={fetchTranscript} disabled={isFetching}>
          {isFetching ? "Fetching..." : "Fetch Transcript"}
        </button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h2>Transcript:</h2>
        <pre>{transcript}</pre>
      </div>
    </div>
  );
}
