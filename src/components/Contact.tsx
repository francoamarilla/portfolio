import { useRef } from 'react'
import { sectionIds } from '../config'
import { content } from '../content'
import { socialLinks } from '../data/social-links'
import { isValidHref } from '../lib/url'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
import { techIcons } from './tech-icons'
import styles from './Contact.module.css'

const { contact: ui, social, newTab } = content.ui
const INDEX = String(sectionIds.indexOf('contact') + 1).padStart(2, '0')

export function Contact() {
  const root = useRef<HTMLElement>(null)
  // email, LinkedIn y GitHub como botones redondos con logo, en ese orden
  const profiles = (['email', 'linkedin', 'github'] as const)
    .map((id) => ({ id, url: socialLinks.find((l) => l.id === id)?.url }))
    .filter((l): l is { id: 'email' | 'linkedin' | 'github'; url: string } => isValidHref(l.url))
  const email = profiles.find((l) => l.id === 'email')?.url

  // cierre: la línea superior se dibuja de lado a lado al entrar la sección
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(root.current, {
          '--rule': 0,
          duration: 1.8,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="contact" ref={root} className={styles.section} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.index}`} aria-hidden="true">
          ({INDEX})
        </p>
        <SplitReveal className={styles.title} id="contact-title">
          {ui.title}
        </SplitReveal>

        <Reveal className={styles.stack}>
          <p className={styles.body}>{ui.body}</p>

          <ul className={styles.profiles}>
            {profiles.map(({ id, url }) => (
              <li key={id}>
                <a
                  className={styles.profile}
                  href={url}
                  aria-label={id === 'email' ? `${social.email}: ${url.replace('mailto:', '')}` : `${social[id]} ${newTab}`}
                  title={id === 'email' ? url.replace('mailto:', '') : social[id]}
                  {...(url.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {id === 'email' ? (
                    // arroba de trazo (Lucide "at-sign", ISC); los logos de marca son de relleno
                    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.stroke}>
                      <circle cx="12" cy="12" r="4" />
                      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={techIcons[id]} />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {email && (
            <a className={`mono ${styles.address}`} href={email}>
              {email.replace('mailto:', '')}
            </a>
          )}

          <p className={`mono ${styles.location}`}>
            <span className="sr-only">{ui.locationLabel}: </span>
            {ui.location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
