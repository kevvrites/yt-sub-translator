import { NextResponse } from "next/server";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const transcript = JSON.parse(searchParams.get("transcript"));
  console.log(typeof transcript)
  const source = searchParams.get("sourcelang");
  const target = searchParams.get("targetlang");


  // original transcript stored
  // return NextResponse.json(transcript);

  // OpenAI gpt-3.5-turbo for translation
  const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets from the user. Translate the ${source} text segments into ${target}. Return the updated JSON object with the translated text segments, while leaving the other parts of the JSON file unchanged.`;

  const transcriptString = JSON.stringify(transcript, null, 0);

  //prettier-ignore
  const payload = {
    model: "gpt-3.5-turbo-16k",
    messages: [
      { "role": "system", "content": system_prompt },
      { "role": "user", "content": transcriptString}
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 10000,
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
  return NextResponse.json(JSON.parse(openaiJSON.choices[0].message.content));
}
