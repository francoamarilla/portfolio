import { content } from '../content'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
import { Pending } from './Pending'
import { SectionHeading } from './SectionHeading'
import styles from './About.module.css'

const { about: ui } = content.ui
const { about } = content

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHeading section="about" title={ui.title} />

        <div className={styles.grid}>
          {about.statement ? (
            <SplitReveal as="p" className={styles.statement}>
              {about.statement}
            </SplitReveal>
          ) : (
            <Reveal className={styles.statement}>
              <Pending>{ui.statementPending}</Pending>
            </Reveal>
          )}

          <div className={styles.side}>
            <Reveal className={styles.body}>
              {about.body?.length ? about.body.map((p) => <p key={p}>{p}</p>) : <Pending>{ui.bodyPending}</Pending>}
            </Reveal>

            <div className={styles.block}>
              <h3 className={`mono ${styles.label}`}>{ui.focusLabel}</h3>
              {/* detalle visual: los ejes del perfil conectados como nodos de un sistema */}
              <Reveal className={styles.focus} stagger={0.12}>
                {about.focus.map((f) => (
                  <div key={f.title} className={styles.focusItem}>
                    <span className={styles.node} aria-hidden="true" />
                    <p className={styles.focusTitle}>{f.title}</p>
                    {f.text && <p className={styles.focusText}>{f.text}</p>}
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal className={styles.block}>
              <h3 className={`mono ${styles.label}`}>{ui.educationLabel}</h3>
              <p className={styles.education}>
                <span className={styles.institution}>{about.education.institution}</span>
                {about.education.detail ?? <Pending>{ui.educationPending}</Pending>}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
