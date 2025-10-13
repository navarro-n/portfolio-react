import React from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
import { projects } from '../../utils/data'
import styles from './ProjectsList.module.css'

export default function ProjectsList() {
  return (
    <section className={styles.list} id="projects">
      {projects.map(p => (
        <ProjectCard key={p.id} {...p} />
      ))}
    </section>
  )
}