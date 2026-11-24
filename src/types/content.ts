import type { SectionId } from '../config'

/* ---------- Datos no traducibles (src/data) ---------- */

export type ProjectSlug = 'causario' | 'recepta' | 'acopio' | 'sticky'

/** captura con su tamaño real [ancho, alto]: reserva el alto antes de cargar (sin saltos de layout).
 *  data.test.ts compara el tamaño con el archivo. */
export interface Shot {
  src: string
  size: [number, number]
}

/** visual: presentación pública del proyecto; interactive: la aplicación real con datos de demostración */
export type DemoKind = 'visual' | 'interactive'

export interface ProjectData {
  slug: ProjectSlug
  name: string
  /** layout ancho en la lista; el resto va en la grilla compacta */
  featured?: boolean
  technologies: string[]
  /** logo para fondo oscuro: imagen de la tarjeta en la lista */
  logo: string
  /** colores de marca [oscuro, claro]: fondo y halo de la tarjeta */
  brand: [string, string]
  /** con asset(): lleva el prefijo del base del sitio */
  coverImage?: Shot
  gallery?: Shot[]
  repositoryUrl?: string
  /** Public documentation or showcase; not the proprietary source repository. */
  showcaseUrl?: string
  demoUrl?: string
  /** tipo de demo, mostrado en la tarjeta de la home */
  demoKind?: DemoKind
}

export type SocialId = 'email' | 'github' | 'linkedin' | 'cv'
export interface SocialLink {
  id: SocialId
  /** https://…, mailto:… o ruta local — sin url no se renderiza */
  url?: string
}

export interface ProfileData {
  name: string
  role: string
  /** Tecnologías mostradas en la franja inferior del Hero */
  heroStack: string[]
}

export type TechGroupId = 'languages' | 'ai' | 'backend' | 'frontend' | 'databases' | 'testing' | 'tools'
export interface TechGroup {
  id: TechGroupId
  /** icon: clave en src/components/tech-icons.ts; sin icon se muestra solo el texto */
  items: { name: string; icon?: string }[]
}

/* ---------- Contenido traducible (src/content/<lang>) ---------- */

export interface ProjectCopy {
  subtitle: string
  summary: string
  problem: string
  solution: string
  features: string[]
  highlights: string[]
  /** Desafíos y decisiones técnicas: 3 o 4, verificables en el código del proyecto */
  challenges: string[]
  /** Nota breve debajo de los botones de repositorio y demo */
  linksNote?: string
  /** alt de cada imagen de la galería, en el mismo orden que ProjectData.gallery */
  galleryAlt?: string[]
  /** Validación (Causario), evaluación (Recepta) o estado (Sticky Fingers) */
  results?: { title: string; items: string[]; note?: string }
}

export type ProjectDetailKey = 'problem' | 'solution' | 'challenges' | 'features' | 'highlights'

export interface EducationCopy {
  title: string
  institution: string
  period: string
  description?: string
}

export type Lang = 'es' | 'en'

export interface UiCopy {
  meta: { title: string; description: string }
  nav: Record<SectionId, string> & { skip: string; menu: string; close: string; label: string; lang: string }
  /** texto para lectores de pantalla en los links que abren otra pestaña */
  newTab: string
  hero: { ctaProjects: string; ctaCv: string; scroll: string }
  social: Record<SocialId, string>
  projects: {
    title: string
    intro: string
    counter: string
    more: string
    viewProject: string
    /** etiqueta en la tarjeta de los proyectos con demo pública, según su tipo */
    demoKinds: Record<DemoKind, string>
    back: string
    prev: string
    next: string
    repo: string
    showcase: string
    demo: string
    stack: string
    gallery: string
    zoom: string
    sections: Record<ProjectDetailKey, string>
  }
  about: { title: string }
  stack: { title: string; groups: Record<TechGroupId, string> }
  education: { title: string }
  contact: { title: string; body: string; location: string; locationLabel: string }
  footer: { top: string }
  notFound: { title: string; body: string; cta: string }
}

export interface AboutCopy {
  /** frase principal, en tipografía grande */
  statement: string
  /** párrafos de presentación */
  body: string[]
}

export interface Content {
  lang: Lang
  ui: UiCopy
  profile: { intro: string }
  about: AboutCopy
  education: EducationCopy[]
  projects: Record<ProjectSlug, ProjectCopy>
}
