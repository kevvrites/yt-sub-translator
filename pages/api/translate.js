import { Configuration, OpenAIApi } from 'openai-edge'

const source = "English"
const target = "Simplified Chinese"

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export const runtime = 'edge'

export default async function translateTranscript(req, res) {
    try{
        const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets. Your task is to perform the following steps:

        1. Correct any spelling and spacing mistakes in the ${source} text segments provided in the "text" fields.
        2. Translate the corrected English text segments into Simplified Chinese.
        3. Return the updated JSON object with the cleaned and translated text segments, while leaving the other parts of the JSON file unchanged.`
        
        const transcript = await req.json()

        const prompt =  [
            {"role":"system", "content": system_prompt},
            {"role":"user", "content": transcript}
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-16k',
            temperature: 0,
            messages: prompt,
            max_tokens: 10000
        })

        const translatedContent = response

        res.status(200).json({ translatedContent })
    }   catch (error) {
    console.error("Error translating transcript:", error)
    }
}