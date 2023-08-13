import { Manrope } from "next/font/google";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
const manrope = Manrope({ subsets: ["latin"] });
import "./globals.css";
import { Metadata } from "next";

export const metadata = {
  title: "YouTube Subtitle Translator",
  description: "A site to get and translate YouTube video transcripts.",
  keywords:
    "Javascript, YouTube, Subtitle, Translate, Translation, Tool, Transcript",
  author: "Kevin Liu",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={manrope.className}>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
