/** Secciones de la home, en orden. El id es el ancla (#projects, etc.). */
export const sectionIds = ['home', 'about', 'projects', 'stack', 'education', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]
