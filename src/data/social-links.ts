import type { SocialLink } from '../types/content'

/** Sin url válida no se renderiza: nunca un link roto. */
export const socialLinks: SocialLink[] = [
  { id: 'email', url: 'mailto:franco24amarilla@gmail.com' },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/franco-maximiliano-amarilla/' },
  { id: 'github', url: 'https://github.com/francoamarilla' },
  { id: 'cv', url: `${import.meta.env.BASE_URL}FrancoAmarilla-CV.pdf` },
]
