export default async function handler(req, res) {
  const source = "English";
  const target = "Simplified Chinese";
  const system_prompt = `You will be provided with a JSON object containing a series of text segments along with their durations and offsets from the user. Translate the corrected ${source} text segments into ${target}, and return the updated JSON object with the translated text segments, while leaving the other parts of the JSON file unchanged.`;

  const clean_prompt = `Your task is to perform the following steps: Correct any spelling and spacing mistakes in the ${source} text segments provided in the 'text' fields`;

  const { transcript } = req.body;
  const transcriptString = JSON.stringify(transcript);
  // prettier-ignore

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { "role": "system", "content": system_prompt },
      { "role": "user", "content": transcriptString },
    ],
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    n: 1,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  res.status(200).json(json);
}
