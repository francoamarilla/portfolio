import { content } from '../content'
import { Reveal } from '../motion/Reveal'
import { SectionHeading } from './SectionHeading'
import styles from './Education.module.css'

const { education: ui } = content.ui

export function Education() {
  return (
    <section id="education" className={styles.section} aria-labelledby="education-title">
      <div className="container">
        <SectionHeading section="education" title={ui.title} />

        <Reveal className={styles.list} stagger={0.08}>
          {content.education.map((e) => (
            <article key={e.title} className={styles.item}>
              <p className={`mono ${styles.period}`}>{e.period}</p>
              <div className={styles.body}>
                <h3 className={styles.title}>{e.title}</h3>
                <p className={styles.institution}>{e.institution}</p>
                {e.description && <p className={styles.description}>{e.description}</p>}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
