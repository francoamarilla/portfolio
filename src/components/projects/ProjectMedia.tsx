import { useRef, useState, type CSSProperties } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../../motion/gsap'
import styles from './ProjectMedia.module.css'

interface Props {
  /** nombre del proyecto: barra del marco y marca de agua del placeholder */
  label: string
  src?: string
  alt?: string
  /** relación de aspecto CSS; reserva el espacio aunque la imagen no exista o tarde en cargar.
   *  'natural': el marco toma la proporción de la captura y la muestra completa, sin recortes */
  ratio?: string
  /** logo del proyecto: se muestra centrado sobre el fondo de marca en lugar de la captura */
  logo?: string
  /** colores de marca [oscuro, claro] para el fondo del logo */
  brand?: [string, string]
  /** desplazamiento leve con el scroll (solo desktop) */
  parallax?: boolean
  className?: string
}

/**
 * Marco de captura. Sin imagen muestra un placeholder identificado, nunca una captura falsa.
 * Reemplazar la captura no cambia el layout: el alto lo define `ratio`.
 */
export function ProjectMedia({ label, src, logo, brand, alt = '', ratio = '16 / 10', parallax = false, className = '' }: Props) {
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
              scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          )
        })
      }
    },
    { scope: root },
  )

  return (
    <figure
      ref={root}
      className={`${styles.frame} ${ratio === 'natural' ? styles.natural : ''} ${className}`}
      style={ratio === 'natural' ? undefined : ({ '--ratio': ratio } as CSSProperties)}
    >
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
          {logo ? (
            <div
              className={`${styles.media} ${styles.brand}`}
              style={brand && ({ '--b1': brand[0], '--b2': brand[1] } as CSSProperties)}
            >
              <span className={styles.halo} aria-hidden="true" />
              <span className={styles.float}>
                {/* decorativo: el nombre ya está en el título de la tarjeta */}
                <img className={styles.logo} src={logo} alt="" decoding="async" />
              </span>
            </div>
          ) : src && !failed ? (
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
            </div>
          )}
        </div>
      </div>
    </figure>
  )
}
