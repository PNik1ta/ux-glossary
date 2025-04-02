'use client'

import Link from "next/link"
import styles from "./Hero.module.scss"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Все <span>UX-термины</span> — в одном месте.<br/> Чётко и просто.
        </h1>
        <p className={styles.subtitle}>
          Интерактивный глоссарий UX-терминов с поиском, избранным и добавлением новых слов.
        </p>
        <Link href="/terms" className={styles.cta}>
          Перейти к терминам
        </Link>
      </div>
    </section>
  )
}