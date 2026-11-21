import { Link } from 'react-router'
import { content } from '../../content'
import { Reveal } from '../../motion/Reveal'
import { SplitReveal } from '../../motion/SplitReveal'
import type { ProjectData } from '../../types/content'
import { ProjectMedia } from './ProjectMedia'
import { ProjectTags } from './ProjectMeta'
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
    <article className={styles.card} data-layout={layout}>
      {/* por encima del link extendido del título: así el hover del marco es solo del marco.
          Duplica el destino del título, por eso queda fuera del teclado y de lectores de pantalla */}
      <Link to={`/projects/${project.slug}`} className={styles.mediaLink} tabIndex={-1} aria-hidden="true">
        <ProjectMedia
          label={project.name}
          logo={project.logo}
          brand={project.brand}
          ratio={layout === 'wide' ? '21 / 9' : '16 / 10'}
          parallax={layout === 'wide'}
        />
      </Link>

      <div className={styles.body}>
        <div className={styles.head}>
          <p className={`mono ${styles.number}`} aria-hidden="true">
            {number}
          </p>
          {/* el split va dentro del link: así el área clickeable extendida (::after) depende de la tarjeta */}
          <h3 className={styles.title}>
            <Link to={`/projects/${project.slug}`} className={styles.link}>
              <SplitReveal as="span" className={styles.label}>
                {project.name}
              </SplitReveal>
            </Link>
          </h3>
        </div>

        <Reveal className={styles.details}>
          <p className={`mono ${styles.subtitle}`}>{text.subtitle}</p>
          <p className={styles.summary}>{text.summary}</p>
          <ProjectTags technologies={project.technologies} />
          {/* encima del área extendida, para que la flecha responda solo a este texto; mismo destino que el título */}
          <Link to={`/projects/${project.slug}`} className={`mono ${styles.cta}`} tabIndex={-1} aria-hidden="true">
            {ui.viewProject} <span className={styles.arrow}>→</span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
