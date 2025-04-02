'use client'

import styles from "./About.module.scss"
import {
  Search,
  Heart,
  PlusCircle,
  Brain,
  LucideIcon
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  label: string
}

const features: Feature[] = [
  { icon: Search, label: "Просматривай термины" },
  { icon: Heart, label: "Сохраняй избранное" },
  { icon: PlusCircle, label: "Добавляй свои определения" },
  { icon: Brain, label: "Учись каждый день" },
]

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <p className={styles.description}>
          Это глоссарий UX-терминов — добавляешь, изучаешь, сохраняешь.<br />
          Всё просто.
        </p>
        <div className={styles.grid}>
          {features.map(({ icon: Icon, label }) => (
            <div className={styles.item} key={label}>
              <Icon size={40} className={styles.icon} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}