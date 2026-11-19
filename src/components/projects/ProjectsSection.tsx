import { content } from '../../content'
import { projects } from '../../data/projects'
import { SectionHeading } from '../SectionHeading'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectsSection.module.css'

/**
 * Jerarquía: los `featured` van arriba en formato ancho; el resto, en una grilla compacta.
 * La numeración sigue el orden del array, así que conviene listar primero los destacados.
 */
export function ProjectsSection() {
  const { projects: ui } = content.ui
  const indexed = projects.map((p, i) => ({ p, i }))
  const featured = indexed.filter(({ p }) => p.featured)
  const rest = indexed.filter(({ p }) => !p.featured)

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading section="projects" title={ui.title} intro={ui.intro} count={projects.length} />
        <div className={styles.list}>
          {featured.map(({ p, i }) => (
            <ProjectCard key={p.slug} project={p} index={i} layout="wide" />
          ))}
        </div>
        {rest.length > 0 && (
          <div className={styles.more}>
            <p className={`mono ${styles.moreLabel}`}>{ui.more}</p>
            <div className={styles.grid}>
              {rest.map(({ p, i }) => (
                <ProjectCard key={p.slug} project={p} index={i} layout="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
