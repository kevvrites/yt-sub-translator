import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, res) {
  const requestBody = await req.json();
  const transcript = requestBody.transcript;
  const source = requestBody.sourcelang;
  const target = requestBody.targetlang;

  const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets from the user. Translate the ${source} text segments into ${target}. Return the updated JSON object with the translated text segments, while leaving the other parts of the JSON file unchanged.`;

  const transcriptString = JSON.stringify(transcript);

  const payload = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      { role: "system", content: system_prompt },
      { role: "user", content: transcriptString },
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 10000,
    n: 1,
    stream: true,
  };

  const response = await openai.chat.completions.create(payload);
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
