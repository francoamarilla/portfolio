import type { SocialLink } from '../types/content'

/** Completar url cuando existan. Sin url válida se muestran como "pendiente", nunca como link roto. */
export const socialLinks: SocialLink[] = [
  { id: 'github' },
  { id: 'linkedin' },
  { id: 'email' }, // formato: 'mailto:nombre@dominio.com'
  { id: 'cv' }, // p. ej. '/cv.pdf' dentro de /public
]
