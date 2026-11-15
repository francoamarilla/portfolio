import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
gsap.defaults({ ease: 'expo.out', duration: 1.2 })

// Las fuentes cambian alturas: recalcular posiciones de triggers al terminar de cargar.
document.fonts?.ready.then(() => ScrollTrigger.refresh())

/** Rama de gsap.matchMedia() donde se crean animaciones. Fuera de ella el contenido queda estático y visible. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, SplitText, useGSAP }
