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
        for (let i = 0; i < translatedTranscript.length; i++) {
            const srtLine = translatedTranscript[i];
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