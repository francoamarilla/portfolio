import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { CAMERA, FADE_GLSL, FIELD, REF_DIST, WAVE_GLSL } from './field'

const INTRO_SECONDS = 2.8

/* Respuesta al puntero. Valores bajos a propósito: la ola acompaña al cursor, no lo persigue. */
const POINTER = {
  swell: 0.14, // cuánto se eleva la superficie bajo el cursor
  ripple: 0.05, // altura de las ondas al moverlo
  glow: 0.45, // cuánto se encienden los puntos cercanos
  follow: 2, // velocidad con la que la escena alcanza al cursor (más bajo = más suave)
  parallax: 0.15, // desplazamiento de cámara
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDpr;
  uniform float uFade;   // atenuación al scrollear
  uniform float uAmp;    // amplitud de la ola (intro y scroll)
  uniform float uIntro;  // 0 → 1 al entrar
  uniform float uEnergy; // 0 → 1 según la velocidad del puntero
  uniform vec2 uPointer; // puntero proyectado sobre el plano (x, z)
  attribute float aSeed;
  varying float vEnergy;
  varying float vAlpha;
  varying float vSoft;
  ${WAVE_GLSL}
  ${FADE_GLSL}

  void main() {
    vec3 p = position;
    float d = distance(p.xz, uPointer);
    float e = wave(p.xz, uTime);
    e += smoothstep(3.0, 0.0, d) * ${POINTER.swell.toFixed(3)};
    e += sin(d * 2.0 - uTime * 2.5) * exp(-d * 0.6) * uEnergy * ${POINTER.ripple.toFixed(3)};
    e *= uAmp;
    p.y = e;

    vec4 mv = viewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = -mv.z;

    // la escena se revela desde el centro hacia afuera
    float r = length(p.xz - vec2(0.0, -2.0)) / 18.0;
    float reveal = smoothstep(r, r + 0.3, uIntro * 1.6);
    // el umbral del fade cercano varía con la ola y por punto: el campo se disuelve, no se corta
    float fade = fieldFade(p.xz, dist, e * 1.2 + (aSeed - 0.5) * 1.6);

    float glow = smoothstep(2.6, 0.0, d) * ${POINTER.glow.toFixed(3)};
    vEnergy = clamp(smoothstep(0.1, 0.8, e) * 0.8 + glow, 0.0, 1.0); // se encienden las crestas
    vSoft = smoothstep(6.0, 2.5, dist);                               // desenfoque de los puntos cercanos
    vAlpha = reveal * fade * (0.55 + 0.45 * aSeed) * uFade;
    gl_PointSize = (1.3 + aSeed * 1.7) * (1.0 + vSoft * 1.6) * uDpr * (${REF_DIST.toFixed(1)} / dist);

    // invisible (fuera del fade o antes del reveal): no rasterizar. Los puntos cercanos a la cámara
    // son los más grandes y casi todos tienen alpha 0; dibujarlos igual era el grueso del costo de GPU.
    if (vAlpha < 0.004) {
      gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
      gl_PointSize = 0.0;
    }
  }`

const fragmentShader = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uMuted;
  varying float vEnergy;
  varying float vAlpha;
  varying float vSoft;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float shape = smoothstep(0.5, 0.5 - mix(0.1, 0.45, vSoft), d);
    vec3 col = mix(uMuted, uAccent, vEnergy);
    gl_FragColor = vec4(col, shape * vAlpha * mix(0.3, 0.95, vEnergy) * mix(1.0, 0.4, vSoft));
    #include <colorspace_fragment>
  }`

function buildField() {
  const { cols, rows, halfWidth } = FIELD
  const positions = new Float32Array(cols * rows * 3)
  const seeds = new Float32Array(cols * rows)
  const dx = (halfWidth * 2) / (cols - 1)
  const dz = (FIELD.zNear - FIELD.zFar) / (rows - 1)
  for (let r = 0, i = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++, i++) {
      // grilla con un leve desorden: se leen las filas en perspectiva sin verse mecánica
      positions[i * 3] = -halfWidth + c * dx + (Math.random() - 0.5) * dx * 0.3
      positions[i * 3 + 2] = FIELD.zFar + r * dz + (Math.random() - 0.5) * dz * 0.3
      seeds[i] = Math.random()
    }
  }
  const field = new THREE.BufferGeometry()
  field.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  field.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  return field
}

function Field() {
  const { gl, camera } = useThree()
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0, moved: false })
  const clock = useRef({ t: 0, energy: 0, scroll: 0 })

  const { geometry, material, uniforms, ray } = useMemo(() => {
    const css = getComputedStyle(document.documentElement)
    const color = (v: string) => new THREE.Color(css.getPropertyValue(v).trim() || '#ffffff')
    const uniforms = {
      uTime: { value: 0 },
      uDpr: { value: 1 },
      uFade: { value: 1 },
      uAmp: { value: 0 },
      uIntro: { value: 0 },
      uEnergy: { value: 0 },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uAccent: { value: color('--accent') },
      uMuted: { value: color('--muted') },
    }
    return {
      geometry: buildField(),
      material: new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      }),
      uniforms,
      ray: new THREE.Vector3(),
    }
  }, [])

  useEffect(() => {
    const canvas = gl.domElement
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const p = pointer.current
      p.tx = ((e.clientX - r.left) / r.width) * 2 - 1
      p.ty = -(((e.clientY - r.top) / r.height) * 2 - 1)
      p.moved = true
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      geometry.dispose()
      material.dispose()
    }
  }, [gl, geometry, material])

  // mutar uniforms y cámara por frame es el patrón de R3F (no dispara renders de React)
  /* oxlint-disable react/immutability */
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1) // al volver a la pestaña no saltar
    const c = clock.current
    const p = pointer.current
    c.t += delta

    // sin puntero (touch o todavía quieto) un foco recorre la superficie solo
    if (!p.moved) {
      p.tx = Math.sin(c.t * 0.23) * 0.55
      p.ty = -0.25 + Math.cos(c.t * 0.31) * 0.3
    }
    const ease = 1 - Math.exp(-delta * POINTER.follow)
    // lo que falta recorrer hasta el puntero real ≈ su velocidad
    const lag = Math.hypot(p.tx - p.x, p.ty - p.y)
    p.x += (p.tx - p.x) * ease
    p.y += (p.ty - p.y) * ease
    c.energy += (Math.min(lag * 2, 1) - c.energy) * (1 - Math.exp(-delta * 1.5))

    // la rueda del mouse scrollea a saltos: suavizarlo evita que cámara y fade avancen escalonados
    const targetScroll = Math.min(window.scrollY / window.innerHeight, 1)
    c.scroll += (targetScroll - c.scroll) * (1 - Math.exp(-delta * 8))
    const scroll = c.scroll
    const intro = 1 - Math.pow(1 - Math.min(c.t / INTRO_SECONDS, 1), 3)

    camera.position.set(
      CAMERA.position[0] + p.x * POINTER.parallax,
      CAMERA.position[1] + p.y * POINTER.parallax * 0.4 + scroll * 0.8,
      CAMERA.position[2],
    )
    camera.lookAt(...CAMERA.target)
    camera.updateMatrixWorld()

    // puntero → punto sobre el plano y = 0 (si apunta por encima del horizonte, se aleja)
    ray.set(p.x, p.y, 0.5).unproject(camera).sub(camera.position).normalize()
    if (ray.y < -0.02) {
      const k = -camera.position.y / ray.y
      uniforms.uPointer.value.set(camera.position.x + ray.x * k, camera.position.z + ray.z * k)
    } else {
      uniforms.uPointer.value.set(99, 99)
    }

    uniforms.uTime.value = c.t
    uniforms.uDpr.value = gl.getPixelRatio()
    uniforms.uIntro.value = intro
    uniforms.uEnergy.value = c.energy
    uniforms.uAmp.value = (0.2 + 0.8 * intro) * (1 - scroll * 0.8)
    uniforms.uFade.value = 1 - scroll * 0.8
  })
  /* oxlint-enable react/immutability */

  // frustumCulled off: el shader desplaza los vértices fuera del bounding volume original
  return <points geometry={geometry} material={material} frustumCulled={false} />
}

export default function Scene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]} // los puntos son difusos: por encima de 1.5 no se nota y el costo crece al cuadrado
      camera={{ position: [...CAMERA.position], fov: CAMERA.fov, near: 0.1, far: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={onReady}
    >
      <Field />
    </Canvas>
  )
}
