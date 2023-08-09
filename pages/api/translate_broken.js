import { Configuration, OpenAIApi } from "openai-edge";

const source = "English";
const target = "Simplified Chinese";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export default async function handler(req, res) {
  try {
    const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets. Your task is to perform the following steps:

        1. Correct any spelling and spacing mistakes in the ${source} text segments provided in the "text" fields.
        2. Translate the corrected ${source} text segments into ${target}.
        3. Return the updated JSON object with the cleaned and translated text segments, while leaving the other parts of the JSON file unchanged.`;

    const transcript = await req.json();

    // prettier-ignore
    const prompt = [
      { "role": "system", "content": system_prompt },
      { "role": "user", "content": transcript },
    ];

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: prompt,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 10000,
      stream: false,
      n: 1,
    });
    console.dir(response.json());

    const translatedContent = await response.json();
    console.dir(JSON.stringify(translatedContent));
    return JSON.stringify(translatedContent);
  } catch (error) {
    console.error("Error translating transcript:", error);
  }
}
