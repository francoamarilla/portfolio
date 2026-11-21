import { content } from '../content'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
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
          <SplitReveal as="p" className={styles.statement}>
            {about.statement}
          </SplitReveal>

          <Reveal className={styles.body}>
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
