import { useState } from "react";
import {
  parseTranscriptToTxt,
  parseTranscriptToSbv,
  parseTranscriptToSrt,
} from "/pages/api/parser";
import { translateTranscript } from '/pages/api/translate'

const TranscriptPage = () => {
  const [videoURL, setVideoURL] = useState("https://www.youtube.com/watch?v=1h1gzh3r7OA");
  const [transcript, setTranscript] = useState("");
  const [translatedTranscript, setTranslatedTranscript] = useState("");
  const [isValidURL, setIsValidURL] = useState(true);

  function isValidYouTubeURL(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
    return pattern.test(url)
  }

  const handleVideoURLChange = (event) => {
    const inputURL = event.target.value;
    const isValid = isValidYouTubeURL(inputURL);
    setIsValidURL(isValid);
    setVideoURL(inputURL);
  }

  const fetchTranscript = async () => {
    try {
      const response = await fetch(`/api/fetch?videoURL=${videoURL}`);
      const data = await response.json();
      setTranscript(data);
      console.log(transcript)
      // console.log(transcript.json())
      console.log(JSON.stringify(transcript))
      console.log(JSON.parse(JSON.stringify(transcript)))
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  const translate = async () => {
    try {
      console.log(JSON.stringify(transcript))
      const translatedResponse = await fetch(`/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transcript),
      });
      try {
        if (translatedResponse.ok) {
          console.log("WOKEGE")
          console.log(JSON.parse(translatedResponse))                   /////// BREAKING ON THIS LINE <------------------
          const translatedTranscript = await translatedResponse.json(); /////// BREAKING ON THIS LINE <------------------
          console.log("maybe? we'll see this?")
          setTranslatedTranscript(translatedTranscript);
        } else {
          console.error("Error translating transcript:", translatedResponse.statusText)
        }
      } catch (error) {
        console.error("Error parsing JSON response:", error)
      }
    } catch (error) {
      console.error("Error translating transcript:", error);
    }
  }

  console.log('rendering')
  return (
    <div>
      <input
        type="text"
        value={videoURL}
        onChange={handleVideoURLChange}
        placeholder="Enter Video URL"
      />
      {!isValidURL && (
        <p style={{ color: 'red' }}> Invalid YouTube URL</p>
      )}

      <button onClick={fetchTranscript}>Fetch Transcript</button>
      <button onClick={translate}>Translate Transcript</button>

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

      {!translatedTranscript && (
        <div>No translation available</div>
      )}

      {translatedTranscript && (
        <div>
          <div>
            <h2>JSON Transcript Object:</h2>
            <pre>{JSON.stringify(translatedTranscript, null, 2)}</pre>
          </div>
          <div>
            <h2>Text (.txt) Format:</h2>
            <pre>{parseTranscriptToTxt(translatedTranscript)}</pre>
          </div>

          <div>
            <h2>SubViewer (.sbv) Format:</h2>
            <pre>{parseTranscriptToSbv(translatedTranscript)}</pre>
          </div>

          <div>
            <h2>SubRip (.srt) Format:</h2>
            <pre>{parseTranscriptToSrt(translatedTranscript)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptPage;
