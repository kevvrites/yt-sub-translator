import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Manrope } from "next/font/google";

const name = "Kevin Liu";
const manrope = Manrope({ subsets: ["latin"] });
export const siteTitle = "YouTube Subtitle Translator";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/public/rect_cctr_logo.png" />
        <meta
          name="description"
          content="A site to get and translate YouTube video transcripts."
        />
        <meta
          name="keywords"
          content="Javascript, YouTube, Subtitle, Translate, Translation, Tool, Transcript"
        />
        <meta name="author" content={name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className={styles.header}>
        <Link href="/" styles={{ textDecoration: "none" }}>
          <Image
            priority
            src="/rect_cctr_logo.png"
            className={styles.borderHorizLogo}
            height={160}
            width={250}
            alt="logo of CC translator"
          />
        </Link>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 className={styles.heading}>YouTube Subtitle Translator</h1>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
