import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Manrope } from "next/font/google";
import Navbar from ".//components/navbar.jsx";

const name = "Kevin Liu";
const manrope = Manrope({ subsets: ["latin"] });
export const siteTitle = "YouTube Subtitle Translator";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head className={styles.header}>
        <link rel="icon" href="/rect_cctr_logo.png" />
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
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
