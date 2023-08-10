import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

function Navbar() {
  return (
    <header>
      <div>
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
      </div>
      <div>
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1 className={styles.heading}>YouTube Subtitle Translator</h1>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
