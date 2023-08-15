import { Manrope } from "next/font/google";
import Footer from "../components/footer/Footer.jsx";
const manrope = Manrope({ subsets: ["latin"] });
import "./globals.css";
import { cookies } from "next/headers";
import { LIGHT_COLORS, DARK_COLORS } from "../constants";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle.jsx";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "YouTube Subtitle Translator",
  description: "A site to get and translate YouTube video transcripts.",
  keywords:
    "Javascript, YouTube, Subtitle, Translate, Translation, Tool, Transcript",
  author: "Kevin Liu",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  const savedTheme = cookies().get("color-theme");
  const theme = savedTheme?.value || "light";

  const themeColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;
  return (
    <html lang="en" data-color-theme={theme} styles={themeColors}>
      <body>
        <div className={manrope.className}>
          <div className={styles.container}>
            <div className={styles.siteheader}>
              <Link
                className={styles.links}
                href="/about"
                style={{ textDecoration: "none" }}
              >
                About
              </Link>
              <div className={styles.banner}>
                <div className={styles.logo}>
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
                <div className={styles.title}>
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <h1 className={styles.heading}>
                      YouTube Subtitle Translator
                    </h1>
                  </Link>
                </div>
              </div>
              <ThemeToggle initialTheme={theme} />
            </div>
            {children}
            <Footer />
            <analytics />
          </div>
        </div>
      </body>
    </html>
  );
}
