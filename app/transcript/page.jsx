"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import LanguageSelector from "../../components/langselect/LanguageSelector";
import FormatSelector from "../../components/formatselect/FormatSelector";
import DownloadButton from "../../components/download/DownloadButton";
export default function Transcript() {
  const [inputUrl, setInputUrl] = useState(
    "https://www.youtube.com/watch?v=1h1gzh3r7OA"
  );
  const [transcript, setTranscript] = useState(
    "Transcript will appear here once processed."
  );
  const [isFetching, setIsFetching] = useState(false);
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [fileFormat, setFileFormat] = useState("txt");

  const handleSourceLanguageChange = (newLanguage) => {
    setSourceLang(newLanguage);
  };
  const handleTargetLanguageChange = (newLanguage) => {
    setTargetLang(newLanguage);
  };
  const handleFormatChange = (newFormat) => {
    setFileFormat(newFormat);
  };

  const fetchTranscript = async () => {
    setIsFetching(true);
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
      throw new Error("Timed out");
    }

    const transcript = await response.json();
    setTranscript(transcript);
    setIsFetching(false);
  };

  const fetchTranscript2 = async () => {
    setIsFetching(true);
    const response = await fetch(
      `api/fetchEdge?videoURL=${inputUrl}&sourcelang=${sourceLang}&targetlang=${targetLang}&format=${fileFormat}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Timed out");
    }

    const transcript = await response.json();
    setTranscript(transcript);
    setIsFetching(false);
  };

  return (
    <div className={styles.container}>
      <h1>Fetch YouTube Transcript</h1>
      <div className={styles.dropdowns}>
        <div className={styles.languagemenu}>
          <LanguageSelector
            defaultLanguage="English"
            labelText="Select Source Language:"
            onSelectLanguage={handleSourceLanguageChange}
          />

          <LanguageSelector
            defaultLanguage="Spanish"
            labelText="Select Target Language:"
            onSelectLanguage={handleTargetLanguageChange}
          />
        </div>
        <div className={styles.formatmenu}>
          <FormatSelector
            defaultFormat={fileFormat}
            labelText="Select Output Format:"
            onSelectFormat={handleFormatChange}
          />
        </div>
      </div>
      <div className={styles.input}>
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
      <div className={styles.buttons}>
        <button onClick={fetchTranscript} disabled={isFetching}>
          {isFetching ? "Fetching..." : "Fetch Transcript"}
        </button>
        <button onClick={fetchTranscript2} disabled={isFetching}>
          {isFetching ? "Fetching..." : "Fetch Edge Transcript"}
        </button>

        <DownloadButton content={transcript} fileExtension={fileFormat} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h2>Transcript:</h2>
        <pre>{transcript}</pre>
      </div>
    </div>
  );
}
