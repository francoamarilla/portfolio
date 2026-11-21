import { content } from '../content'
import { technologies } from '../data/technologies'
import { Reveal } from '../motion/Reveal'
import { SectionHeading } from './SectionHeading'
import { techIcons } from './tech-icons'
import styles from './TechStack.module.css'

const { stack: ui } = content.ui

export function TechStack() {
  return (
    <section id="stack" className={styles.section} aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading section="stack" title={ui.title} />

        <Reveal className={styles.groups} stagger={0.06}>
          {technologies.map((group, i) => (
            <div key={group.id} className={styles.group}>
              <p className={`mono ${styles.index}`} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className={styles.title}>{ui.groups[group.id]}</h3>
              <ul className={styles.chips}>
                {group.items.map((item) => (
                  <li key={item.name} className={`mono ${styles.chip}`}>
                    {item.icon && (
                      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                        <path d={techIcons[item.icon]} />
                      </svg>
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
