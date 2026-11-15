import { useEffect, useRef, useState, type ComponentType } from 'react'
import { NetworkFallback } from './NetworkFallback'
import styles from './AnimatedNetwork.module.css'

type SceneComponent = ComponentType<{ active: boolean; onReady: () => void }>

function canRunLive() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Fondo del Hero: superficie de partículas que ondula y responde al puntero.
 * Si el entorno lo soporta carga la escena WebGL (chunk aparte), que hace su propia entrada;
 * si no (o si el chunk falla) queda la versión SVG estática.
 */
export function AnimatedNetwork({ className = '' }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(canRunLive)
  const [Scene, setScene] = useState<SceneComponent | null>(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!live) return
    let mounted = true
    // la escena (three + R3F, ~245 KB gz) se pide cuando el navegador queda libre:
    // no compite con la primera pintura ni con la entrada del Hero
    const load = () =>
      import('./Scene').then(
        (m) => mounted && setScene(() => m.default),
        () => mounted && setLive(false),
      )
    const idle = 'requestIdleCallback' in window
    const id = idle ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1200)
    return () => {
      mounted = false
      if (idle) cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [live])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (root.current) io.observe(root.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={root} className={`${styles.root} ${ready ? styles.ready : ''} ${className}`} aria-hidden="true">
      {!live && <NetworkFallback className={styles.fallback} />}
      {live && Scene && (
        <div className={styles.canvas}>
          <Scene active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  )
}
