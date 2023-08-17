"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import LanguageSelector from "../../components/langselect/LanguageSelector";
import FormatSelector from "../../components/formatselect/FormatSelector";
import DownloadButton from "../../components/download/DownloadButton";

export default function Transcript() {
  const shortytvideo = "youtube.com/watch?v=1h1gzh3r70A";
  const [inputUrl, setInputUrl] = useState("youtube.com/watch?v=1h1gzh3r7OA");
  const [transcript, setTranscript] = useState(
    "Transcript will appear here once processed."
  );

  // States
  const [isFetching, setIsFetching] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  // Defaults
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [fileFormat, setFileFormat] = useState("txt");

  // Default handlers
  const handleSourceLanguageChange = (newLanguage) => {
    setSourceLang(newLanguage);
  };

  const handleTargetLanguageChange = (newLanguage) => {
    setTargetLang(newLanguage);
  };

  const handleFormatChange = (newFormat) => {
    setFileFormat(newFormat);
  };

  // Entire Process
  const doAll = async () => {
    setIsFetching(true);
    transcript = await fetchTranscript();
    setTranscript(transcript);
    setIsFetching(false);
    setIsTranslating(true);
    const translatedTranscript = await translateTranscript();
    setTranscript(translatedTranscript);
    setIsTranslating(false);
  };

  const fetchTranscript = async () => {
    setIsFetching(true);
    const response = await fetch(`api/fetchTranscript?videoURL=${inputUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const transcript = await response.json();
    setTranscript(transcript);
    setIsFetching(false);
  };

  const translateTranscript = async () => {
    setIsTranslating(true);

    const requestBody = {
      transcript: transcript,
      sourcelang: sourceLang,
      targetlang: targetLang,
    };

    try {
      const response = await fetch("api/translateTranscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const translatedTranscript = await response.json();
      setTranscript(translatedTranscript);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const ParseTranscript = async () => {
    setIsParsing(true);

    const requestBody = {
      transcript: transcript,
      format: fileFormat,
    };

    try {
      const response = await fetch("api/parseTranscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedTranscript = await response.json();
      setTranscript(parsedTranscript);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsParsing(false);
    }
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
          <label className={styles.label}>Enter YouTube URL:</label>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className={styles.inputField}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.doAll}
          onClick={fetchTranscript}
          disabled={isFetching}
        >
          {isFetching
            ? "Processing"
            : "DO ALL (only working for videos < 3:30)"}
        </button>
        <button
          className={styles.fetch}
          onClick={fetchTranscript2}
          disabled={isFetching}
        >
          {isFetching ? "Fetching..." : "Fetch JSON Transcript"}
        </button>
        <button
          className={styles.translate}
          onClick={translateTranscript}
          disabled={isFetching || isTranslating}
        >
          {isTranslating ? "Translating..." : "Translate JSON Transcript"}
        </button>

        <DownloadButton content={transcript} fileExtension={fileFormat} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h2>Transcript:</h2>
        <pre>{JSON.stringify(transcript, null, 2)}</pre>
      </div>
    </div>
  );
}
