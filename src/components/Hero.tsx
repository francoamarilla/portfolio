import { useRef } from 'react'
import { Link } from 'react-router'
import { content } from '../content'
import { profile } from '../data/profile'
import { socialLinks } from '../data/social-links'
import { isValidHref } from '../lib/url'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../motion/gsap'
import { AnimatedNetwork } from './AnimatedNetwork'
import { SocialLinks } from './SocialLinks'
import styles from './Hero.module.css'

const { ui } = content
const cv = socialLinks.find((l) => l.id === 'cv')?.url

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const name = useRef<HTMLHeadingElement>(null)

  /*
   * Entrada: una sola secuencia. Los selectores son data-hero (no clases ni posiciones),
   * así que cambiar textos, agregar un CTA o un link no requiere tocar la animación.
   */
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        SplitText.create(name.current, {
          type: 'lines',
          mask: 'lines',
          tag: 'span',
          linesClass: 'split-line',
          aria: 'none', // ver SplitReveal
          autoSplit: true,
          // devolver la animación permite a SplitText re-dividir (resize/fuentes) sin perder el progreso
          onSplit: (self) => gsap.from(self.lines, { yPercent: 112, duration: 1.6, stagger: 0.12, delay: 0.25 }),
        })

        gsap
          .timeline({ delay: 0.15 })
          .from('[data-hero="role"]', { autoAlpha: 0, x: -14, duration: 1 }, 0)
          .from('[data-hero="line"]', { '--line-scale': 0, duration: 1.8, ease: 'expo.inOut' }, 0.2)
          .from('[data-hero="intro"]', { autoAlpha: 0, y: 26, duration: 1.3 }, 0.8)
          .from('[data-hero="ctas"] > *', { autoAlpha: 0, y: 18, duration: 1.1, stagger: 0.09 }, 0.95)
          .from('[data-hero="social"] li', { autoAlpha: 0, y: 10, duration: 1, stagger: 0.07 }, 1.15)
          .from('[data-hero="line"] > *', { autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: 'power2.out' }, 1.3)
      })
    },
    { scope: root },
  )

  return (
    <section id="home" ref={root} className={styles.hero} aria-labelledby="hero-name">
      <AnimatedNetwork className={styles.network} />

      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.role}`} data-hero="role">
          {profile.role}
        </p>
        <h1 id="hero-name" ref={name} className={styles.name}>
          {profile.name}
        </h1>
        <div className={styles.intro} data-hero="intro">
          {content.profile.intro}
        </div>
        <div className={styles.ctas} data-hero="ctas">
          <Link className="btn btn--primary" to={{ pathname: '/', hash: 'projects' }}>
            {ui.hero.ctaProjects} <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          {isValidHref(cv) && (
            <a className="btn" href={cv} download>
              {ui.hero.ctaCv} <span aria-hidden="true">↓</span>
            </a>
          )}
        </div>
        <div data-hero="social">
          <SocialLinks only={['github', 'linkedin']} />
        </div>
      </div>

      <div className={`container ${styles.bar}`} data-hero="line">
        <p className="mono">{profile.heroStack.join('  /  ')}</p>
        <Link className={`mono ${styles.cue}`} to={{ pathname: '/', hash: 'projects' }} aria-hidden="true" tabIndex={-1}>
          {ui.hero.scroll}
          <span className={styles.cueLine} />
        </Link>
      </div>
    </section>
  )
}
