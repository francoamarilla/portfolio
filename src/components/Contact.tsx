import { useRef } from 'react'
import { sectionIds } from '../config'
import { content } from '../content'
import { socialLinks } from '../data/social-links'
import { isValidHref } from '../lib/url'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
import { Pending } from './Pending'
import { SocialLinks } from './SocialLinks'
import styles from './Contact.module.css'

const { contact: ui } = content.ui
const INDEX = String(sectionIds.indexOf('contact') + 1).padStart(2, '0')

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const email = socialLinks.find((l) => l.id === 'email')?.url
  const hasEmail = isValidHref(email) && email.startsWith('mailto:')

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

        <Reveal className={styles.row}>
          <p className={styles.body}>{ui.body}</p>
          <div className={styles.emailBlock}>
            <p className={`mono ${styles.label}`}>{ui.emailLabel}</p>
            {hasEmail ? (
              <a className={styles.email} href={email}>
                {email.replace('mailto:', '')}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <Pending>{ui.emailPending}</Pending>
            )}
          </div>
        </Reveal>

        <Reveal className={styles.elsewhere}>
          <p className={`mono ${styles.label}`}>{ui.elsewhere}</p>
          <SocialLinks only={['linkedin', 'github', 'cv']} />
        </Reveal>
      </div>
    </section>
  )
}
