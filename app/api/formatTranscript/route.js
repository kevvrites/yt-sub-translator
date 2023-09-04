import { NextResponse } from "next/server";

function msToTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")},${milliseconds
    .toString()
    .padStart(3, "0")}`;
}

export async function POST(req) {
  const requestBody = await req.json();
  const transcript = requestBody.transcript;
  const format = requestBody.format;

  switch (format) {
    case "txt":
      const txtLines = [];

      for (const txtLine of transcript) {
        const text = txtLine.text;
        txtLines.push(text);
      }
      const formattedTxtTranscript = txtLines.join("\n");

      return NextResponse.json(formattedTxtTranscript);
    case "srt":
      const srtLines = [];
      for (let i = 0; i < transcript.length; i++) {
        const srtLine = transcript[i];
        const index = i + 1;
        const srtOffsetTime = msToTime(srtLine.offset);
        const srtEndTime = msToTime(srtLine.offset + srtLine.duration);

        srtLines.push(index);
        const srtTimestamp = `${srtOffsetTime} --> ${srtEndTime}`;
        srtLines.push(srtTimestamp);

        const srtContent = `${srtLine.text}\n`;
        srtLines.push(srtContent);
      }
      const formattedSrtTranscript = srtLines.join("\n");
      return NextResponse.json(formattedSrtTranscript);
    case "sbv":
      const sbvLines = [];

      for (const sbvLine of transcript) {
        const sbvOffsetTime = msToTime(sbvLine.offset);
        const sbvEndTime = msToTime(sbvLine.offset + sbvLine.duration);

        const sbvTimestamp = `${sbvOffsetTime},${sbvEndTime}`;
        const sbvContent = `${sbvLine.text}\n`;

        sbvLines.push(sbvTimestamp);
        sbvLines.push(sbvContent);
      }
      const formattedSbvTranscript = sbvLines.join("\n");
      return NextResponse.json(formattedSbvTranscript);
  }
}
