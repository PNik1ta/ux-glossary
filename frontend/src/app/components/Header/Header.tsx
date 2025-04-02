'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { User, LogOut } from "lucide-react"
import styles from "./Header.module.scss"
import AuthModal from "../AuthModal/AuthModal"
import { UserService } from "@/services/user.service"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    UserService.getProfile()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
    } catch (err) {
      console.warn("Logout error:", err)
    }
	 localStorage.removeItem('at')
    localStorage.removeItem('rt')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>UX Glossary</Link>
        <nav className={styles.nav}>
          <Link href="/terms" className={styles.link}>Термины</Link>
        </nav>
        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className={styles.profile}>
                <User size={20} />
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <button className={styles.buttonOutline} onClick={() => setOpenModal(true)}>
                Вход
              </button>
              <button className={styles.buttonFilled} onClick={() => setOpenModal(true)}>
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>

      <AuthModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </header>
  )
}
