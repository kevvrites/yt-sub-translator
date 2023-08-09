const translate = async () => {
  try {
    console.log(JSON.stringify(transcript));
    const translatedResponse = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transcript),
    });

    if (translatedResponse.ok) {
      console.log("WOKEGE");
      console.log(JSON.parse(translatedResponse)); /////// BREAKING ON THIS LINE <------------------
      const translatedTranscript = await translatedResponse.json(); /////// BREAKING ON THIS LINE <------------------
      console.log("maybe? we'll see this?");
      setTranslatedTranscript(translatedTranscript);
    } else {
      console.error(
        "Error translating transcript:",
        translatedResponse.statusText
      );
    }
  } catch (error) {
    console.error("Error translating transcript:", error);
  }
};
