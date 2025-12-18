
import React, { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <i className="bi bi-apple"></i>
        <a href="#home">home</a>
        <a href="#credits">credits</a>
        <i className="bi bi-image"></i>
      </nav>
    </header>
  )
}