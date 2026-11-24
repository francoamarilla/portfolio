import { describe, expect, it } from 'vitest'
import { languages } from '../content'
import { techIcons } from '../components/tech-icons'
import { isValidHref } from '../lib/url'
import deployWorkflow from '../../.github/workflows/deploy.yml?raw'
import { profile } from './profile'
import { projects } from './projects'
import { socialLinks } from './social-links'
import { technologies } from './technologies'

/*
 * Integridad del contenido: nada inventado, nada roto y los dos idiomas a la par.
 */
const { es, en } = languages

// capturas como data URL (base64): el test lee el tamaño de la cabecera WebP sin depender de node:fs
const webpFiles = import.meta.glob<string>('../../public/projects/*/*.webp', { eager: true, query: '?inline', import: 'default' })

/** [ancho, alto] de un WebP (VP8, VP8L o VP8X) a partir de su data URL */
function webpSize(dataUrl: string): [number, number] {
  const b = Uint8Array.from(atob(dataUrl.split(',')[1].slice(0, 64)), (c) => c.charCodeAt(0))
  const chunk = String.fromCharCode(...b.slice(12, 16))
  const u16 = (i: number) => b[i] | (b[i + 1] << 8)
  const u24 = (i: number) => b[i] | (b[i + 1] << 8) | (b[i + 2] << 16)
  if (chunk === 'VP8 ') return [u16(26) & 0x3fff, u16(28) & 0x3fff]
  if (chunk === 'VP8L') {
    const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24)
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
  }
  return [u24(24) + 1, u24(27) + 1] // VP8X
}

/** Estructura de un objeto (claves y largo de los arrays), sin los textos. */
const shape = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v

describe('proyectos', () => {
  it('son los cuatro aprobados, con los nombres exactos y en orden', () => {
    expect(projects.map((p) => p.name)).toEqual(['Causario', 'Recepta', 'Acopio', 'Sticky Fingers'])
  })

  it('Causario y Recepta van destacados', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual(['causario', 'recepta'])
  })

  it('repositorio y demo son URLs válidas o están vacíos', () => {
    for (const p of projects) {
      for (const url of [p.repositoryUrl, p.demoUrl]) if (url !== undefined) expect(isValidHref(url), url).toBe(true)
    }
  })

  it('Causario no muestra código: el repositorio es privado', () => {
    expect(projects.find((p) => p.slug === 'causario')!.repositoryUrl).toBeUndefined()
  })

  it('Recepta no afirma una integración con WhatsApp', () => {
    for (const lang of [es, en]) expect(JSON.stringify(lang.projects.recepta)).not.toMatch(/whatsapp/i)
  })

  it('las imágenes apuntan a /public con el base del sitio', () => {
    for (const p of projects) {
      for (const img of [p.coverImage, ...(p.gallery ?? [])]) {
        if (img !== undefined) expect(img.src.startsWith(import.meta.env.BASE_URL), img.src).toBe(true)
      }
    }
  })

  it('cada proyecto tiene entre 3 y 4 desafíos técnicos en los dos idiomas', () => {
    for (const p of projects) {
      for (const lang of [es, en]) {
        const n = lang.projects[p.slug].challenges.length
        expect(n >= 3 && n <= 4, `${lang.lang}/${p.slug}: ${n}`).toBe(true)
      }
    }
  })

  it('Recepta ofrece repositorio y demo del panel, sin un acceso aparte al chat', () => {
    const recepta = projects.find((p) => p.slug === 'recepta')!
    expect(recepta.repositoryUrl).toBe('https://github.com/francoamarilla/Recepta')
    expect(recepta.demoUrl).toBe('https://recepta-wheat.vercel.app/login')
    expect(JSON.stringify(recepta)).not.toMatch(/\/chat/)
  })

  it('Sticky Fingers no se presenta como desplegado hoy', () => {
    expect(es.projects.sticky.results?.items.join(' ')).toMatch(/actualmente no está en línea/)
    expect(en.projects.sticky.results?.items.join(' ')).toMatch(/currently offline/)
  })

  it('el deploy genera una página por proyecto, así /projects/<slug> responde 200 en GitHub Pages', () => {
    const copies = deployWorkflow.match(/for s in ([a-z ]+); do/)?.[1].split(' ') ?? []
    expect(copies.sort()).toEqual(projects.map((p) => p.slug).sort())
  })

  it('el tamaño declarado de cada captura es el del archivo (sin saltos de layout ni cambios de proporción)', () => {
    for (const p of projects) {
      for (const img of [p.coverImage, ...(p.gallery ?? [])]) {
        if (!img) continue
        const file = img.src.slice(import.meta.env.BASE_URL.length)
        const dataUrl = webpFiles[`../../public/${file}`]
        expect(dataUrl, file).toBeDefined()
        expect(webpSize(dataUrl), file).toEqual(img.size)
      }
    }
  })

  it('las tarjetas distinguen la demo visual de Causario y la interactiva de Recepta', () => {
    const kinds = Object.fromEntries(projects.map((p) => [p.slug, p.demoKind]))
    expect(kinds).toEqual({ causario: 'visual', recepta: 'interactive', acopio: undefined, sticky: undefined })
    expect(es.ui.projects.demoKinds).toEqual({ visual: 'Demo visual', interactive: 'Demo interactiva' })
    expect(en.ui.projects.demoKinds).toEqual({ visual: 'Visual showcase', interactive: 'Interactive demo' })
  })

  it('cada imagen de galería tiene su alt en los dos idiomas', () => {
    for (const p of projects) {
      for (const lang of [es, en]) expect(lang.projects[p.slug].galleryAlt?.length ?? 0, `${lang.lang}/${p.slug}`).toBe(p.gallery?.length ?? 0)
    }
  })
})

describe('perfil', () => {
  it('el título profesional es exacto', () => {
    expect(profile.role).toBe('Full Stack Developer | AI Engineer')
  })

  it('educación tiene solo los dos títulos aprobados', () => {
    for (const lang of [es, en]) {
      expect(lang.education.map((e) => e.period)).toEqual(
        lang.lang === 'es' ? ['2025–2027 · En curso', '2014–2019 · Finalizado'] : ['2025–2027 · In progress', '2014–2019 · Completed'],
      )
    }
    expect(es.education.map((e) => e.title)).toEqual(['Tecnicatura Universitaria en Programación', 'Técnico Electromecánico'])
  })

  it('ningún texto menciona Ingeniería Industrial ni calificativos de seniority', () => {
    const all = JSON.stringify({ es, en, profile })
    expect(all).not.toMatch(/industrial/i)
    expect(all).not.toMatch(/\b(senior|junior|semi-?senior|trainee)\b/i)
  })
})

describe('idiomas', () => {
  it('español e inglés tienen la misma estructura', () => {
    expect(shape(en)).toEqual(shape(es))
  })
})

describe('links', () => {
  it('los links sociales son válidos o están vacíos', () => {
    for (const l of socialLinks) if (l.url !== undefined) expect(isValidHref(l.url), l.url).toBe(true)
  })

  it('el email usa mailto:', () => {
    const email = socialLinks.find((l) => l.id === 'email')?.url
    if (email !== undefined) expect(email.startsWith('mailto:')).toBe(true)
  })
})

describe('tech stack', () => {
  it('cada logo referenciado existe', () => {
    for (const g of technologies) for (const i of g.items) if (i.icon) expect(techIcons[i.icon], i.icon).toBeDefined()
  })
})
