import { YoutubeTranscript } from "youtube-transcript";

const fetchTranscript = async (videoURL) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoURL);
    return transcript;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  const { videoURL } = req.query;

  if (!videoURL) {
    return res.status(400).json({ error: "Video URL is required." });
  }

  try {
    const transcript = await fetchTranscript(videoURL);
    res.status(200).json(transcript);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transcript" });
  }
}
