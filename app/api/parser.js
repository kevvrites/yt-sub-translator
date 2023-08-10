export function parseTranscriptToTxt(transcriptData) {
  if (!transcriptData) {
    return;
  }
  const lines = [];

  for (const item of transcriptData) {
    const text = item.text;
    lines.push(text);
  }

  const formattedContent = lines.join("\n");

  return formattedContent;
}

export function parseTranscriptToSrt(transcriptData) {
  if (!transcriptData) {
    return;
  }
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

  // Create an array to store the lines of text
  const lines = [];

  // Loop through the transcriptData and generate formatted content for each item
  for (let i = 0; i < transcriptData.length; i++) {
    const item = transcriptData[i];
    const index = i + 1;
    const offsetTime = msToTime(item.offset);
    const endTime = msToTime(item.offset + item.duration);

    // Format the line for srt index: 1
    lines.push(index);

    // Format the line for srt time: 00:00:00,960 --> 00:00:03,840
    const timeLine = `${offsetTime} --> ${endTime}`;
    lines.push(timeLine);

    // Add the "text" value to a new line after the timeLine
    const contentLine = `${item.text}\n`;
    lines.push(contentLine);
  }

  // Join the lines with newline characters to create the final srt content
  const formattedContent = lines.join("\n");

  // Return the formatted content as a string
  return formattedContent;
}

export function parseTranscriptToSbv(transcriptData) {
  if (!transcriptData) {
    return;
  }
  function msToTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;
  }

  const lines = [];

  for (const item of transcriptData) {
    const offsetTime = msToTime(item.offset);
    const endTime = msToTime(item.offset + item.duration);

    // Format the line for sbv: 0:00:00.960,0:00:03.840
    const timeLine = `${offsetTime},${endTime}`;
    const contentLine = `\n${item.text}\n\n`;

    // Append the formatted lines to the array
    lines.push(timeLine);
    lines.push(contentLine);
  }

  const formattedContent = lines.join("");

  return formattedContent;
}
