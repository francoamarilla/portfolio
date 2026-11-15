/** Secciones de la home, en orden. El id es el ancla (#projects, etc.). */
export const sectionIds = ['home', 'projects', 'about', 'stack', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]

/** Poner en false antes de publicar para ocultar los bloques de contenido pendiente. */
export const showPlaceholders = true
