'use client'

import Link from "next/link"
import styles from "./Footer.module.scss"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          UX Glossary
        </Link>
        <p className={styles.text}>
          © {year} UX Glossary. Все права защищены.
        </p>
      </div>
    </footer>
  )
}