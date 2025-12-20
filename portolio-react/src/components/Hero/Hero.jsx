import React from 'react'
import styles from './Hero.module.css'

export default function Hero({ name = 'Irene Pinillos', role = 'Frontend developer' }) {
  return (
    <section className={styles.hero} aria-label="Hero">
    </section>
  )
}