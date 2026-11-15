/**
 * Constantes y funciones compartidas por la escena WebGL y el fallback SVG,
 * para que ambos dibujen la misma composición.
 */
export const CAMERA = { position: [0, 2.7, 8.5], target: [0, 0.3, 0], fov: 44 } as const
/** Distancia a la que un punto se dibuja a su tamaño nominal. */
export const REF_DIST = 9
/**
 * Superficie de partículas. Es más grande que lo que ve la cámara en cualquier formato:
 * pasa por debajo y por detrás de ella (zNear > posición de cámara), así que ningún borde
 * de la geometría puede entrar en cuadro. La misma grilla se usa en desktop y mobile.
 */
export const FIELD = { halfWidth: 18, zFar: -11, zNear: 9, cols: 200, rows: 112 } as const

// elipse inscripta en la geometría: sobre ella la opacidad ya es 0
const EDGE = { cz: (FIELD.zFar + FIELD.zNear) / 2, rx: FIELD.halfWidth, rz: (FIELD.zNear - FIELD.zFar) / 2 }

/* Oleaje base. GLSL y JS deben mantenerse idénticos: el fallback dibuja la misma superficie en t = 0. */
export const WAVE_GLSL = /* glsl */ `
float wave(vec2 p, float t) {
  float e = sin(p.x * 0.42 + t * 0.5) * 0.42;
  e += sin(p.y * 0.65 - t * 0.38 + p.x * 0.18) * 0.3;
  e += sin((p.x * 0.8 + p.y * 1.1) * 0.55 + t * 0.7 + sin(p.y * 0.4 + t * 0.2) * 1.5) * 0.18;
  return e;
}`

export function wave(x: number, z: number, t = 0) {
  let e = Math.sin(x * 0.42 + t * 0.5) * 0.42
  e += Math.sin(z * 0.65 - t * 0.38 + x * 0.18) * 0.3
  e += Math.sin((x * 0.8 + z * 1.1) * 0.55 + t * 0.7 + Math.sin(z * 0.4 + t * 0.2) * 1.5) * 0.18
  return e
}

/*
 * Desvanecimiento del campo: las partículas emergen de la oscuridad y vuelven a ella.
 *  - edge: elíptico sobre el plano; garantiza opacidad 0 antes de cualquier borde de la geometría.
 *  - far:  hacia el horizonte.
 *  - near: hacia la cámara (parte inferior de la pantalla). "jitter" desplaza el umbral por punto
 *          para que el final sea irregular y siga a la ola, no una línea recta.
 * GLSL y JS deben mantenerse idénticos.
 */
export const FADE_GLSL = /* glsl */ `
float fieldFade(vec2 p, float dist, float jitter) {
  vec2 q = (p - vec2(0.0, ${EDGE.cz.toFixed(1)})) / vec2(${EDGE.rx.toFixed(1)}, ${EDGE.rz.toFixed(1)});
  float edge = smoothstep(1.0, 0.6, length(q));
  float far = smoothstep(19.0, 9.5, dist);
  float near = smoothstep(3.2, 7.2, dist + jitter);
  return edge * far * near;
}`

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

export function fieldFade(x: number, z: number, dist: number, jitter: number) {
  const edge = smoothstep(1, 0.6, Math.hypot(x / EDGE.rx, (z - EDGE.cz) / EDGE.rz))
  return edge * smoothstep(19, 9.5, dist) * smoothstep(3.2, 7.2, dist + jitter)
}

/**
 * Proyección en perspectiva equivalente a la cámara de la escena (sin paralaje).
 * Devuelve coordenadas con y en [-1, 1] (arriba negativo, como SVG) y x en la misma escala.
 */
export function project(x: number, y: number, z: number) {
  const [, cy, cz] = CAMERA.position
  const fy = CAMERA.target[1] - cy
  const fz = CAMERA.target[2] - cz
  const len = Math.hypot(fy, fz)
  const ry = y - cy
  const rz = z - cz
  const dist = (ry * fy + rz * fz) / len // profundidad sobre el eje de la cámara
  const up = (ry * -fz + rz * fy) / len
  const k = dist * Math.tan((CAMERA.fov * Math.PI) / 360)
  return { x: x / k, y: -up / k, dist }
}
