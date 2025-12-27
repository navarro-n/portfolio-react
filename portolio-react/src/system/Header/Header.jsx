import React, { useEffect, useState } from "react"
import styles from "./Header.module.css"

export default function Header() {

  

  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className={styles.header}>
      {/* IZQUIERDA */}
      <div className={styles.left}>
        <i className="bi bi-apple"></i>
        <a href="#home">home</a>
        <a href="#credits">credits</a>
        <i className="bi bi-image"></i>
      </div>

      {/* CENTRO */}
      <div className={styles.center}></div>

      {/* DERECHA */}
      <div className={styles.right}>
        <i className="bi bi-github"></i>
        <i className="bi bi-linkedin"></i>
        <i className="bi bi-envelope-fill"></i>
        <span className={styles.time}>{time}</span>
      </div>
    </header>
  )
}
