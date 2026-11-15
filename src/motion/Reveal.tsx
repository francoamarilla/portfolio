import { useRef, type ReactNode } from 'react'
import { gsap, MOTION_OK, useGSAP } from './gsap'

interface Props {
  className?: string
  children: ReactNode
  /** separación entre hijos; 0 = entran juntos */
  stagger?: number
  delay?: number
}

/**
 * Los hijos directos aparecen con un desplazamiento corto al llegar al viewport.
 * No depende de cuántos hijos haya ni de su alto.
 */
export function Reveal({ className, children, stagger = 0.08, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(ref.current!.children, {
          autoAlpha: 0,
          y: 24,
          duration: 1.1,
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
