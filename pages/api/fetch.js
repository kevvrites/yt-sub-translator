import { YoutubeTranscript } from "youtube-transcript";

const fetchTranscript = async (videoURL) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoURL);
    return transcript;
  } catch (error) {
    throw new Error("Error fetching transcript");
  }
};

export default async function handler(req, res) {
  const { videoURL } = req.query;

  if (!videoURL || videoURL === "") {
    return res.status(400).json({ error: "Video URL is required." });
  }

  try {
    if(!isValidYouTubeURL(videoURL)) {
      return res.status(400).json({ error: "Invalid YouTube URL format."})
    }

    const transcript = await fetchTranscript(videoURL);

    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: "No transcript data available for the provided video URL."})
    }

    res.status(200).json(transcript);
  } catch (error) {
    console.error("Error fetching transcript:", error)
    res.status(500).json({ error: "Error fetching transcript" });
  }
}

function isValidYouTubeURL(url) {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  return pattern.test(url)
}