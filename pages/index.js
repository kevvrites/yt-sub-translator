import Head from "next/head";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "@/styles/Home.module.css";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>YouTube Subtitle Translator</title>
        <meta
          name="description"
          content="A site to get and translate YouTube video transcripts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Head}>Hello World!</main>
    </>
  );
}
