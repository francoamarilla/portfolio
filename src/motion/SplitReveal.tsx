import { useRef, type ReactNode, type Ref } from 'react'
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from './gsap'

interface Props {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  id?: string
  children: ReactNode
  /** retraso extra, p. ej. para escalonar contra otro elemento */
  delay?: number
}

/**
 * Título que entra por líneas enmascaradas al llegar al viewport.
 * Las líneas se recalculan solas (autoSplit) si cambia el texto, el ancho o la fuente.
 *
 * Dividir en líneas mide el layout de la página: hacerlo con todos los títulos al cargar
 * costaba ~0,5 s de reflow en un celular. Por eso cada título se divide recién cuando
 * está a 30 % de pantalla de entrar; la animación arranca al llegar al 88 %.
 */
export function SplitReveal({ as: Tag = 'h2', className, id, children, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    (_, contextSafe) => {
      // contextSafe: lo creado más tarde (al acercarse) igual se revierte al desmontar
      const split = contextSafe!(() => {
        SplitText.create(ref.current, {
          type: 'lines',
          mask: 'lines',
          tag: 'span', // spans: válido también dentro de <a> o <span>
          linesClass: 'split-line', // la máscara recibe .split-line-mask (ver global.css)
          // solo se divide por líneas (las palabras quedan enteras): el texto se lee normal.
          // 'auto' pondría aria-label en el contenedor y ocultaría las líneas, y un aria-label
          // en un <span> (p. ej. dentro de un link) los lectores de pantalla lo ignoran.
          aria: 'none',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              stagger: 0.09,
              delay,
              scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
            }),
        })
      })
      gsap.matchMedia().add(MOTION_OK, () => {
        ScrollTrigger.create({ trigger: ref.current, start: 'top bottom+=30%', once: true,
          // diferido: si el título ya está a la vista, onEnter corre dentro de este mismo contexto
          // y contextSafe lo anidaría en sí mismo (recursión infinita en dev con StrictMode)
          onEnter: () => requestAnimationFrame(split),
        })
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref as Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={className} id={id}>
      {children}
    </Tag>
  )
}
