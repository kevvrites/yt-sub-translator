"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import LanguageSelector from "../../components/langselect/LanguageSelector";
import FormatSelector from "../../components/formatselect/FormatSelector";
import DownloadButton from "../../components/download/DownloadButton";

export default function Transcript() {
  const [inputUrl, setInputUrl] = useState(
    ""
  );
  const [transcript, setTranscript] = useState(
    "Transcript will appear here once processed."
  );
  const [isFetching, setIsFetching] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false)
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
      `api/fetchTranscript?videoURL=${inputUrl}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const transcript = await response.json();
    setTranscript(JSON.stringify(transcript, null, 2));
    setIsFetching(false);
  };

  const translateTranscript = async () => {
    setIsTranslating(true);
    const response = await fetch(
      `api/translate?transcript=${transcript}&sourcelang=${sourceLang}&targetlang=${targetLang}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const translatedtranscript = await response.json();
    setTranscript(JSON.stringify(translatedtranscript, null, 2));
    setIsTranslating(false);
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
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <label className={styles.label}>
            Enter YouTube URL:
          </label>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className={styles.inputField}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.doAll} onClick={fetchTranscript} disabled={isFetching}>
          {isFetching ? "Processing" : "DO ALL (only working for videos < 3:30)"}
        </button>
        <button className={styles.fetch} onClick={fetchTranscript2} disabled={isFetching}>
          {isFetching ? "Fetching..." : "Fetch JSON Transcript"}
        </button>
        <button className={styles.translate} onClick={translateTranscript} disabled={isFetching || isTranslating}>
          {isTranslating ? "Translating..." : "Translate JSON Transcript"}
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
