import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";
// const { YoutubeTranscript } = require("youtube-transcript");
// const { NextResponse } = require("next/server");

// helper function for formatting timestamps
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

// fetches transcript using npm youtube-transcript
const fetchTranscript = async (videoURL) => {
  const transcriptResults = await YoutubeTranscript.fetchTranscript(videoURL);
  return transcriptResults;
};

function selectFileFormat(format, translatedTranscript) {
  switch (format) {
    case "txt":
      const txtLines = [];

      for (const txtLine of translatedTranscript) {
        const text = txtLine.text;
        txtLines.push(text);
      }
      const formattedTxtTranscript = txtLines.join("\n");
      return formattedTxtTranscript;
    case "srt":
      const srtLines = [];
      console.log('srt case called.')
      for (let i = 0; i < translatedTranscript.length; i++) {
        console.log(translatedTranscript.length)
        const srtLine = translatedTranscript[i];
        const index = i + 1;
        const srtOffsetTime = msToTime(srtLine.offset);
        const srtEndTime = msToTime(srtLine.offset + srtLine.duration);

        console.log(srtOffsetTime, srtEndTime)

        srtLines.push(index);
        const srtTimestamp = `${srtOffsetTime} --> ${srtEndTime}`;
        srtLines.push(srtTimestamp);

        const srtContent = `${srtLine.text}\n`;
        srtLines.push(srtContent);
      }
      const formattedSrtTranscript = srtLines.join("\n");
      console.log(formattedSrtTranscript)
      return formattedSrtTranscript;
    case "sbv":
      const sbvLines = [];

      for (const sbvLine of translatedTranscript) {
        const sbvOffsetTime = msToTime(sbvLine.offset);
        const sbvEndTime = msToTime(sbvLine.offset + sbvLine.duration);

        const sbvTimestamp = `${sbvOffsetTime},${sbvEndTime}`;
        const sbvContent = `${sbvLine.text}\n`;

        sbvLines.push(sbvTimestamp);
        sbvLines.push(sbvContent);
      }
      const formattedSbvTranscript = sbvLines.join("\n");
      return formattedSbvTranscript;
  }
}

export async function GET(req) {
  // pulling videoURL, source, target, and file format
  const { searchParams } = new URL(req.url);
  const videoLink = searchParams.get("videoURL");
  const source = searchParams.get("sourcelang");
  const target = searchParams.get("targetlang");
  const format = searchParams.get("format");

  console.log("FORMAT SELECTED: ", format)
  const transcript = await fetchTranscript(videoLink);

  // original transcript stored

  // OpenAI gpt-3.5-turbo for translation
  const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets from the user. Translate the ${source} text segments into ${target}. Return the updated JSON object with the translated text segments, while leaving the other parts of the JSON file unchanged.`;

  const transcriptString = JSON.stringify(transcript);

  //prettier-ignore
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { "role": "system", "content": system_prompt },
      { "role": "user", "content": transcriptString}
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    n: 1,
  };

  const openaiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  const openaiJSON = await openaiResponse.json();

  // transcript translation completed

  // format transcript

  const translatedTranscript = JSON.parse(
    openaiJSON.choices[0].message.content
  );

  const formattedTranscript = selectFileFormat(format, translatedTranscript);
  console.log({ formattedTranscript });
  console.log(NextResponse.json({ formattedTranscript }));

  return NextResponse.json(formattedTranscript);
}
