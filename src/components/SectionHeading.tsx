import { sectionIds, type SectionId } from '../config'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
import styles from './SectionHeading.module.css'

interface Props {
  section: SectionId
  title: string
  intro?: string
  /** cantidad opcional mostrada junto al título, p. ej. proyectos */
  count?: number
}

/** Encabezado editorial de sección: índice mono, título grande e intro opcional. */
export function SectionHeading({ section, title, intro, count }: Props) {
  const index = String(sectionIds.indexOf(section) + 1).padStart(2, '0')
  return (
    <header className={styles.heading}>
      <p className={`mono ${styles.index}`} aria-hidden="true">
        ({index})
        {count !== undefined && <span className={styles.count}> — {String(count).padStart(2, '0')}</span>}
      </p>
      {/* el título no va dentro de un flex: SplitText fijaría el ancho mínimo como ancho de línea */}
      <SplitReveal className={styles.title} id={`${section}-title`}>
        {title}
      </SplitReveal>
      {intro && (
        <Reveal className={styles.intro}>
          <p>{intro}</p>
        </Reveal>
      )}
    </header>
  )
}
