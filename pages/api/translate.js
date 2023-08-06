// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration);

// const source = "English"
// const target = "Simplified Chinese"

// // with open('clean-transcript.txt', 'r', encoding='utf-8') as file:
// //     transcript = file.read()

// const system_prompt_template = `You will be given lines of text in ${source}, and your task is to translate them into ${target}. Preserve the original line formatting, specifically the number of lines in the file. The translated version should map to the original file as closely as possible.`

// let prompt = [{"role": "system", "content": system_prompt}]

// // prompt.append({"role": "user", "content": transcript})

// // response = openai.ChatCompletion.create(
// //     model="gpt-3.5-turbo",
// //     messages=prompt,
// //     temperature=0,
// // )

// // with open('translated-transcript.txt', 'w+', encoding='utf-8') as f:
// //     f.write(response["choices"][0]["message"]["content"])
