import { YoutubeTranscript } from "youtube-transcript";
import fs from "fs";
import path from "path";

const fetchTranscript = async (videoURL) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoURL);
    const transcriptText = transcript.map((item) => item.text).join("\n");
    const fileName = `original_transcript.txt`;
    const filePath = path.join(process.cwd(), fileName);

    fs.writeFileSync(filePath, transcriptText);
    const downloadLink = `/api/download?fileName=${encodeURIComponent(
      fileName
    )}`;

    return downloadLink;
  } catch (error) {
    console.error("Error fetching transcript:", error);
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
