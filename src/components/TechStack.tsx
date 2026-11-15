import { content } from '../content'
import { technologies } from '../data/technologies'
import { Reveal } from '../motion/Reveal'
import type { TechState } from '../types/content'
import { SectionHeading } from './SectionHeading'
import styles from './TechStack.module.css'

const { stack: ui } = content.ui

export function TechStack() {
  // la leyenda aparece solo si algún ítem la necesita
  const states = [...new Set(technologies.flatMap((g) => g.items.map((i) => i.state)))].filter(Boolean) as TechState[]

  return (
    <section id="stack" className={styles.section} aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading section="stack" title={ui.title} intro={ui.intro} />

        <Reveal className={styles.groups} stagger={0.06}>
          {technologies.map((group, i) => (
            <div key={group.id} className={styles.group}>
              <p className={`mono ${styles.index}`} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className={styles.title}>{ui.groups[group.id]}</h3>
              <ul className={styles.chips}>
                {group.items.map((item) => (
                  <li key={item.name} className={`mono ${styles.chip}`} data-state={item.state}>
                    {item.name}
                    {item.state && <span className="sr-only"> ({ui.states[item.state]})</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        {states.length > 0 && (
          <ul className={styles.legend} aria-hidden="true">
            {states.map((s) => (
              <li key={s} className="mono">
                <span className={styles.chip} data-state={s} />
                {ui.states[s]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
