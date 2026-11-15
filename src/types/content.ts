import type { SectionId } from '../config'

/* ---------- Datos no traducibles (src/data) ---------- */

export type ProjectSlug = 'causario' | 'turnos' | 'stock-api' | 'sticky' | 'farmacia'
export type ProjectStatus = 'in-development' | 'completed'

export interface ProjectData {
  slug: ProjectSlug
  name: string
  status?: ProjectStatus
  team?: boolean
  /** Fuerza el layout ancho en la lista; si se omite, se usa el patrón cíclico. */
  featured?: boolean
  technologies?: string[]
  /** Ruta dentro de /public, p. ej. '/projects/turnos/cover.webp' */
  coverImage?: string
  gallery?: { src: string; alt?: string }[]
  repositoryUrl?: string
  demoUrl?: string
}

export type SocialId = 'email' | 'github' | 'linkedin' | 'cv'
export interface SocialLink {
  id: SocialId
  /** https://… o mailto:… — vacío = pendiente (no se renderiza como link) */
  url?: string
}

export interface ProfileData {
  name?: string
  role: 'Full Stack Developer'
  /** Tecnologías mostradas en la franja inferior del Hero */
  heroStack: string[]
}

export type TechGroupId = 'backend' | 'frontend' | 'databases' | 'testing' | 'ai' | 'tools'
/** unconfirmed: falta validar que sea parte del perfil actual · in-development: planificado, no disponible */
export type TechState = 'unconfirmed' | 'in-development'
export interface TechGroup {
  id: TechGroupId
  items: { name: string; state?: TechState }[]
}

/* ---------- Contenido traducible (src/content/<lang>) ---------- */

export interface ProjectCopy {
  summary?: string
  note?: string
  problem?: string
  solution?: string
  features?: string[]
  /** Funcionalidades planificadas, se muestran marcadas como "En desarrollo" */
  upcoming?: string[]
  /** etiqueta específica para lo planificado; por defecto ui.status.upcoming */
  upcomingLabel?: string
  architecture?: string
  challenges?: string
  learnings?: string
}

export type ProjectDetailKey =
  | 'problem'
  | 'solution'
  | 'features'
  | 'architecture'
  | 'challenges'
  | 'learnings'

export interface UiCopy {
  meta: { title: string; description: string }
  nav: Record<SectionId, string> & { skip: string; menu: string; close: string; label: string }
  hero: { ctaProjects: string; ctaContact: string; scroll: string }
  social: Record<SocialId, string> & { pending: string }
  placeholders: { name: string; brand: string; intro: string; tag: string }
  status: Record<ProjectStatus, string> & { team: string; upcoming: string }
  projects: {
    eyebrow: string
    title: string
    intro: string
    note: string
    counter: string
    viewProject: string
    screenshotPending: string
    summaryPending: string
    techPending: string
    back: string
    prev: string
    next: string
    repo: string
    demo: string
    stack: string
    gallery: string
    galleryPending: string
    sectionPending: string
    sections: Record<ProjectDetailKey, string>
  }
  about: {
    title: string
    statementPending: string
    bodyPending: string
    focusLabel: string
    educationLabel: string
    educationPending: string
  }
  stack: {
    title: string
    intro: string
    groups: Record<TechGroupId, string>
    states: Record<TechState, string>
  }
  contact: {
    title: string
    body: string
    emailLabel: string
    emailPending: string
    elsewhere: string
  }
  footer: { top: string }
  notFound: { title: string; body: string; cta: string }
}

export interface AboutCopy {
  /** frase principal, en tipografía grande */
  statement?: string
  /** párrafos de presentación */
  body?: string[]
  focus: { title: string; text?: string }[]
  education: { institution: string; detail?: string }
}

export interface Content {
  lang: string
  ui: UiCopy
  profile: { intro?: string }
  about: AboutCopy
  projects: Record<ProjectSlug, ProjectCopy>
}
