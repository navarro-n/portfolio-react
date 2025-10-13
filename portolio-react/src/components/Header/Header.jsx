
import React, { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.brand}>Irene Pinillos Navarro</div>
      <nav className={styles.nav}>
        <a href="#projects">home</a>
        <a href="#about">credits</a>
      </nav>
    </header>
  )
}