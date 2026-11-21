import { describe, expect, it } from 'vitest'
import { languages } from '../content'
import { techIcons } from '../components/tech-icons'
import { isValidHref } from '../lib/url'
import { projects } from './projects'
import { socialLinks } from './social-links'
import { technologies } from './technologies'

/*
 * Integridad del contenido: nada inventado, nada roto y los dos idiomas a la par.
 */
const { es, en } = languages

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
      for (const src of [p.coverImage, ...(p.gallery ?? [])]) {
        if (src !== undefined) expect(src.startsWith(import.meta.env.BASE_URL), src).toBe(true)
      }
    }
  })

  it('cada imagen de galería tiene su alt en los dos idiomas', () => {
    for (const p of projects) {
      for (const lang of [es, en]) expect(lang.projects[p.slug].galleryAlt?.length ?? 0, `${lang.lang}/${p.slug}`).toBe(p.gallery?.length ?? 0)
    }
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
