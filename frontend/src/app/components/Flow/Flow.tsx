'use client'

import styles from "./Flow.module.scss"
import { BookOpen, Eye, Heart, Plus } from "lucide-react"

export default function Flow() {
  return (
    <section className={styles.flow}>
      <div className={styles.container}>
        <h2 className={styles.title}>Как это работает</h2>
        <p className={styles.subtitle}>Показываем UX-флоу</p>

        <div className={styles.steps}>
          <div className={styles.step}>
            <Eye className={styles.icon} />
            <span>1. Открой термин</span>
          </div>
          <div className={styles.step}>
            <BookOpen className={styles.icon} />
            <span>2. Прочитай</span>
          </div>
          <div className={styles.step}>
            <Heart className={styles.icon} />
            <span>3. Сохрани</span>
          </div>
          <div className={styles.step}>
            <Plus className={styles.icon} />
            <span>4. Добавь свой</span>
          </div>
        </div>
      </div>
    </section>
  )
}