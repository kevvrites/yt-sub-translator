import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Image from "next/image";
import { Manrope } from "next/font/google";
import styles from "@/styles/Home.module.css";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>

        <link rel="icon" href="/square_cctr_logo.png" />
      </Head>
      <main className={styles.Head}>Hello World!</main>
    </Layout>
  );
}
