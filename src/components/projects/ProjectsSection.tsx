import { content } from '../../content'
import { projects } from '../../data/projects'
import { SectionHeading } from '../SectionHeading'
import { ProjectCard, type CardLayout } from './ProjectCard'
import styles from './ProjectsSection.module.css'

/** Patrón cíclico: con 5, 6 o más proyectos la composición se repite sin posiciones fijas. */
const PATTERN: CardLayout[] = ['wide', 'media-left', 'media-right']

export function ProjectsSection() {
  const { projects: ui } = content.ui
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading section="projects" title={ui.title} intro={ui.intro} count={projects.length} />
        <div className={styles.list}>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} layout={p.featured ? 'wide' : PATTERN[i % PATTERN.length]} />
          ))}
        </div>
      </div>
    </section>
  )
}
