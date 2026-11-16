import { Link } from 'react-router'
import { content } from '../../content'
import { Reveal } from '../../motion/Reveal'
import { SplitReveal } from '../../motion/SplitReveal'
import type { ProjectData } from '../../types/content'
import { Pending } from '../Pending'
import { ProjectMedia } from './ProjectMedia'
import { ProjectBadges, ProjectTags } from './ProjectMeta'
import styles from './ProjectCard.module.css'

export type CardLayout = 'wide' | 'compact'

const { projects: ui } = content.ui

interface Props {
  project: ProjectData
  index: number
  layout: CardLayout
}

/**
 * Fila editorial de un proyecto. Toda la tarjeta es clickeable (el link del título se extiende),
 * pero hay un único <a> para lectores de pantalla y teclado.
 */
export function ProjectCard({ project, index, layout }: Props) {
  const text = content.projects[project.slug]
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className={`${styles.card} project-hover`} data-layout={layout}>
      <ProjectMedia
        className={styles.media}
        label={project.name}
        src={project.coverImage}
        ratio={layout === 'wide' ? '21 / 9' : '16 / 10'}
        parallax={layout === 'wide'}
      />

      <div className={styles.body}>
        <div className={styles.head}>
          <p className={`mono ${styles.number}`} aria-hidden="true">
            {number}
          </p>
          {/* el split va dentro del link: así el área clickeable extendida (::after) depende de la tarjeta */}
          <h3 className={styles.title}>
            <Link to={`/projects/${project.slug}`} className={styles.link}>
              <SplitReveal as="span">{project.name}</SplitReveal>
            </Link>
          </h3>
        </div>

        <Reveal className={styles.details}>
          <ProjectBadges project={project} text={text} />
          {text.summary ? <p className={styles.summary}>{text.summary}</p> : <Pending>{ui.summaryPending}</Pending>}
          <ProjectTags technologies={project.technologies} />
          <span className={`mono ${styles.cta}`} aria-hidden="true">
            {ui.viewProject} <span className={styles.arrow}>→</span>
          </span>
        </Reveal>
      </div>
    </article>
  )
}
