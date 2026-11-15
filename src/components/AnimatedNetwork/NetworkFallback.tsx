import { useMemo } from 'react'
import { FIELD, fieldFade, project, wave } from './field'

const ASPECT = 16 / 9
/** Filas de la superficie en la versión estática (la escena WebGL usa muchas más). */
const ROWS = 60

/**
 * Versión estática de la escena: misma superficie (en t = 0) y misma cámara.
 * Se usa sin WebGL, con prefers-reduced-motion o ahorro de datos.
 */
export function NetworkFallback({ className }: { className?: string }) {
  const dots = useMemo(() => {
    // un <path> por combinación de tamaño (profundidad), cresta y nivel de opacidad;
    // cada punto es un trazo de largo 0
    const paths = new Map<string, { d: string; lit: boolean; width: number; opacity: number }>()
    const cols = Math.round(ROWS * ((FIELD.halfWidth * 2) / (FIELD.zNear - FIELD.zFar)))
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -FIELD.halfWidth + (c / (cols - 1)) * FIELD.halfWidth * 2
        const z = FIELD.zFar + (r / (ROWS - 1)) * (FIELD.zNear - FIELD.zFar)
        const e = wave(x, z)
        const p = project(x, e, z)
        if (p.dist < 2.5 || Math.abs(p.x) > ASPECT * 1.1 || Math.abs(p.y) > 1.1) continue
        // mismo desvanecimiento que el shader, cuantizado en 4 niveles
        const level = Math.ceil(fieldFade(x, z, p.dist, e * 1.2) * 4)
        if (level === 0) continue
        const band = Math.min(3, Math.floor((p.dist - 3) / 4))
        const lit = e > 0.55
        const key = `${band}${lit}${level}`
        const path = paths.get(key) ?? {
          d: '',
          lit,
          // más tenue que la escena animada en su pico: en estático no hay movimiento que lo compense
          width: 0.06 / (5 + band * 4),
          opacity: (lit ? 0.6 : 0.34) * (level / 4),
        }
        path.d += `M${p.x.toFixed(3)} ${p.y.toFixed(3)}h0`
        paths.set(key, path)
      }
    }
    return [...paths.values()]
  }, [])

  return (
    <svg
      className={className}
      viewBox={`${-ASPECT} -1 ${ASPECT * 2} 2`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {dots.map((b, i) => (
        <path key={i} d={b.d} stroke={b.lit ? 'var(--accent)' : 'var(--muted)'} strokeWidth={b.width} opacity={b.opacity} />
      ))}
    </svg>
  )
}
