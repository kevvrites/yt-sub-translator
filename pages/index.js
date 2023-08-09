import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Image from "next/image";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/square_cctr_logo.png" />
      </Head>
      <ul>
        <li>
          <Link href="../transcript">Transcript Fetch</Link>
        </li>
      </ul>

      <h3>Todo</h3>
      <ul>
        <li style={{ color: "red" }}>Add support for file downloads</li>
        <li>Clean up interfaces</li>
        <li>Fix broken links/error handling</li>
        <li>...youtube video doesnt have subtitles enabled</li>
        <li>...make fetch before enable translate</li>
        <li>...parser errors from attempting to parse too early</li>
      </ul>
    </Layout>
  );
}
