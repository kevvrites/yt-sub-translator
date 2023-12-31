import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Take any YouTube video.
        <br />
        Get subtitles in any language - in less than 10 minutes.
      </div>
      <div className={styles.videoContainer}>
        <div className={styles.video} alt="placeholder for video">
          <Image
            src="/howto-slide.png"
            height={720}
            width={1280}
            alt="logo of CC translator">
          </Image>
        </div>
      </div>
      <div className={styles.cta}>
      <Link href='/transcript'><button className={styles.button}>Try it yourself</button></Link>
      </div>
    </div>
  );
}
