"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
// import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import styles from "./styles.module.css";

function Navbar() {
  return (
    <div className={styles.container}>
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
            <h1 className={styles.heading}>YouTube Subtitle Translator</h1>
          </Link>
        </div>
      </div>

      <button>Toggle</button>
      <Link
        href="/login"
        className={styles.links}
        style={{ textDecoration: "none" }}
      >
        Login
      </Link>

      <Link
        href="/register"
        className={styles.links}
        style={{ textDecoration: "none" }}
      >
        Register
      </Link>
      <button
        onClick={() => {
          console.log("logout");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
