import React from 'react'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ title, description, img, links = {} }) {
  return (
    <article className={styles.card}>
      {img && <img src={img} alt={title} className={styles.img} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.links}>
        {links.live && <a href={links.live}>Demo</a>}
        {links.repo && <a href={links.repo}>Repo</a>}
      </div>
    </article>
  )
}