import React from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <h2>Contacto</h2>
      <p>Email: <a href="mailto:tu@email.com">tu@email.com</a></p>
    </section>
  )
}