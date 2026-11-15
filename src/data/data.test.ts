import { describe, expect, it } from 'vitest'
import { content } from '../content'
import { isValidHref } from '../lib/url'
import { projects } from './projects'
import { socialLinks } from './social-links'
import { technologies } from './technologies'

/*
 * Integridad del contenido. Protege las reglas del brief al editar datos:
 * nada inventado, nada roto, nada marcado como terminado si no lo está.
 */
describe('proyectos', () => {
  it('son los cinco del brief, con los nombres exactos y en orden', () => {
    expect(projects.map((p) => p.name)).toEqual(['Causario', 'Turnos', 'Stock API', 'Sticky', 'Farmacia'])
  })

  it('tienen slugs únicos y aptos para URL', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('cada proyecto tiene textos en el idioma activo', () => {
    for (const p of projects) expect(content.projects[p.slug]).toBeDefined()
  })

  it('repositorio y demo son URLs válidas o están vacíos', () => {
    for (const p of projects) {
      for (const url of [p.repositoryUrl, p.demoUrl]) if (url !== undefined) expect(isValidHref(url), url).toBe(true)
    }
  })

  it('Turnos no figura como terminado y su integración de IA sigue marcada como pendiente', () => {
    const turnos = projects.find((p) => p.slug === 'turnos')!
    expect(turnos.status).not.toBe('completed')
    const text = content.projects.turnos
    // el chatbot nunca puede aparecer entre las funcionalidades disponibles
    expect((text.features ?? []).join(' ')).not.toMatch(/chatbot|whatsapp|rag|ia\b/i)
  })

  it('Causario y Sticky no tienen funcionalidades inventadas', () => {
    for (const slug of ['causario', 'sticky'] as const) {
      expect(content.projects[slug].features ?? []).toHaveLength(0)
    }
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
  it('la IA aplicada sigue marcada como en desarrollo mientras no exista', () => {
    const ai = technologies.find((g) => g.id === 'ai')!
    for (const item of ai.items) expect(item.state).toBe('in-development')
  })
})
