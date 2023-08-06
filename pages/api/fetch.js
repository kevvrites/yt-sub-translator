import { YoutubeTranscript } from "youtube-transcript";

// const fetchTranscript = async (videoId) => {
//   try {
//     const transcript = await YoutubeTranscript.fetchTranscript(videoId);
//     console.log(transcript);
//   } catch (error) {
//     console.error("Error fetching transcript:", error);
//   }
// };

// const videoId = "1h1gzh3r7OA";
// fetchTranscript(videoId);

// pages/api/fetch.js

const fetchTranscript = async (videoId) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required." });
  }

  try {
    const transcript = await fetchTranscript(videoId);
    res.status(200).json(transcript);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transcript" });
  }
}
