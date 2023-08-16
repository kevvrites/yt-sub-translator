import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.h1}>About this project:</div>
      <div className={styles.response}>
        I wanted a tool that can take a YouTube video as input and generate
        translated subtitles that I could upload directly to YouTube. My
        relatives do not know English, but I am not fluent in writing Chinese,
        and using Google Translate/GPT-4 took me 2 hours to translate a 30
        minute video line by line.
      </div>
      <div className={styles.h1}>Features included:</div>
      <div className={styles.response}>
        <ul>
          <li>YouTube transcript fetch</li>
          <li>Subtitle translation using GPT-3.5-turbo</li>
          <li>File generation for easy upload to YouTube</li>
          <li>Supported file formats: .srt, .sbv, .txt</li>
        </ul>
      </div>
      <div className={styles.h1}>FAQ</div>
      <div className={styles.response}>
        <p>Q: How can I search the transcript using a video?</p>
        <p>
          A: You can use Control+F to search for keywords in the transcript
          generated from the video.
        </p>
        <p>Q: Why is it returning an error on my video?</p>
        <p>
          A: The tool will not work for private videos or videos that have
          subtitles/closed captioning disabled. Another possible error is that your video is too long.
        </p>
        <p>Q: How did you make this app?</p>
        <p>
          A: I used Vercel and NextJS for the frontend and backend. The
          transcripts are fetched using npm youtube-transcript and translation
          performed using OpenAI API GPT-3.5-turbo-16k.
        </p>
        <p>Q: How much does it cost to use?</p>
        <p>
          A: Depending on the video and how many words are said (subtitles
          generated). A good estimate is a 30 minute monologue video ≈ $2.
        </p>
        <p>Q: What is the longest video it can process?</p>
        <p>
          A: As of August 2023, the largest token size accepted for the OpenAI
          GPT-3.5-turbo model is 16,000 tokens, or about 12k words. A 30-minute
          video is about 4k words, so the estimate caps out around a 90 minute
          video.
        </p>
        <p>Q: Is this app free to use?</p>
        <p>
          A: For now, I am paying the costs out of pocket. I am unemployed with
          limited income, so please do not abuse it. If you want to support this
          and future creations I make, consider donating{" "}
          <Link className={styles.donate} href="https://ko-fi.com/kevvrites">
            here
          </Link>
          .
          </p>
        <p>Q:</p>
        <p>A:</p>
        <p>Q:</p>
        <p>A:</p>
      </div>
    </div>
  );
};

export default About;
