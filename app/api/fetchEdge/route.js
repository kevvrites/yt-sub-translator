import { YoutubeTranscript } from "youtube-transcript";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// fetches transcript using npm youtube-transcript
const fetchTranscript = async (videoURL) => {
  const transcriptResults = await YoutubeTranscript.fetchTranscript(videoURL);
  return transcriptResults;
};

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export const runtime = 'edge'

const handler = async (req) => {
    const { searchParams } = new URL(req.url);
    const videoLink = searchParams.get("videoURL");
    const source = searchParams.get("sourcelang");
    const target = searchParams.get("targetlang");
    const format = searchParams.get("format");

    console.log(videoLink, source, target, format)
    const transcript = await fetchTranscript(videoLink);
    
    console.log(transcript)
    //OPENAI
    const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets from the user. Translate the ${source} text segments into ${target}. Return the updated JSON object with the translated text segments, while leaving the other parts of the JSON file unchanged.`;
    const transcriptString = JSON.stringify(transcript)

    try {
        const completion = await openai.createChatCompletion({
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
            stream: true,
            n: 1,
        })

        const stream = OpenAIStream(completion)
        return new StreamingTextResponse(stream)
    } catch (error) {
        console.error(error)

        return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
                "content-tpe": "application/json"
            }
        })
    }
}

export default handler



