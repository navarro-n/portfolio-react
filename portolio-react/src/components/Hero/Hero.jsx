import React from 'react'
import styles from './Hero.module.css'

export default function Hero({ name = 'Irene Pinillos', role = 'Frontend developer' }) {
  return (
    <section className={styles.hero} aria-label="Hero">
      <h1>{name}</h1>
      <p>{role}</p>
      <a className={styles.cta} href="#projects">Ver proyectos</a>
    </section>
  )
}