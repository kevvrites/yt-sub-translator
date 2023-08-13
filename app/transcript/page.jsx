"use client";
import { useState } from "react";
import styles from './styles.module.css'
import LanguageSelector from "../../components/langselect/LanguageSelector"
import FormatSelector from "../../components/formatselect/FormatSelector"

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
    console.log(newLanguage)
    setSourceLang(newLanguage);
  };
  const handleTargetLanguageChange = (newLanguage) => {
    setTargetLang(newLanguage);
    console.log(newLanguage)
  };
  const handleFormatChange = (newFormat) => {
    console.log('format changed')
    setFileFormat(newFormat);
    console.log(newFormat);
  };

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
    <div className={styles.container}>
      <h1>Fetch YouTube Transcript</h1>
      <div className={styles.dropdowns}>
      {/* Source Language Selector */}
      <div className={styles.languagemenus}>
      <LanguageSelector
        defaultLanguage="English"
        labelText="Select Source Language:"
        onSelectLanguage={handleSourceLanguageChange}
      />

      {/* Target Language Selector */}
      <LanguageSelector
        defaultLanguage="Spanish"
        labelText="Select Target Language:"
        onSelectLanguage={handleTargetLanguageChange}
      />
</div>
<div className={styles.formatmenu}>
      <FormatSelector
        defaultFormat= {fileFormat}
        labelText="Select Output Format:"
        onSelectFormat={handleFormatChange}
      /></div>
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
