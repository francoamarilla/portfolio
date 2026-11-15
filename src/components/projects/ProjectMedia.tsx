import { useRef, useState, type CSSProperties } from 'react'
import { content } from '../../content'
import { gsap, MOTION_OK, useGSAP } from '../../motion/gsap'
import styles from './ProjectMedia.module.css'

interface Props {
  /** nombre del proyecto: barra del marco y marca de agua del placeholder */
  label: string
  src?: string
  alt?: string
  /** relación de aspecto CSS; reserva el espacio aunque la imagen no exista o tarde en cargar */
  ratio?: string
  /** desplazamiento leve con el scroll (solo desktop) */
  parallax?: boolean
  className?: string
}

/**
 * Marco de captura. Sin imagen muestra un placeholder identificado, nunca una captura falsa.
 * Reemplazar la captura no cambia el layout: el alto lo define `ratio`.
 */
export function ProjectMedia({ label, src, alt = '', ratio = '16 / 10', parallax = false, className = '' }: Props) {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  // ruta rota o archivo faltante: se muestra el placeholder en vez de un hueco vacío
  const [failed, setFailed] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
          .from(viewport.current, { clipPath: 'inset(12% 9% 12% 9%)', duration: 1.6, ease: 'expo.inOut' })
          .from(inner.current, { scale: 1.18, duration: 1.8, ease: 'expo.out' }, 0.1)
      })
      if (parallax) {
        mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
          gsap.fromTo(
            inner.current,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      }
    },
    { scope: root },
  )

  return (
    <figure ref={root} className={`${styles.frame} ${className}`} style={{ '--ratio': ratio } as CSSProperties}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className="mono">{label}</span>
      </div>
      <div ref={viewport} className={styles.viewport}>
        <div ref={inner} className={styles.inner}>
          {src && !failed ? (
            <img
              className={styles.media}
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className={`${styles.media} ${styles.placeholder}`}>
              <span className={styles.ghost} aria-hidden="true">
                {label}
              </span>
              <span className={`mono ${styles.pending}`}>{content.ui.projects.screenshotPending}</span>
            </div>
          )}
        </div>
      </div>
    </figure>
  )
}
