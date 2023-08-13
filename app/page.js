import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Take any YouTube video.
        <br />
        Get subtitles in any language - in less than 5 minutes.
      </div>
      <div className={styles.videoContainer}>
        <div className={styles.video} alt="placeholder for video">
          Video here
        </div>
      </div>
      <div className={styles.cta}>
        <button className={styles.button}>button component</button>
      </div>
    </div>
  );
}
