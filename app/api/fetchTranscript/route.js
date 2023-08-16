import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";

// fetches transcript using npm youtube-transcript
const fetchTranscript = async (videoURL) => {
  const transcriptResults = await YoutubeTranscript.fetchTranscript(videoURL);
  return transcriptResults;
};


export async function GET(req, res) {
  // pulling videoURL, source, target, and file format
  const { searchParams } = new URL(req.url);
  const videoLink = searchParams.get("videoURL");

  const transcript = await fetchTranscript(videoLink); // transcript is a JSON object

  // original transcript stored
  return NextResponse.json(transcript);
}