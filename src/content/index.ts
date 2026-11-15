import type { Content } from '../types/content'
import { about } from './es/about'
import { projects } from './es/projects'
import { ui } from './es/ui'

const es: Content = {
  lang: 'es',
  ui,
  profile: { intro: undefined }, // TODO: presentación breve
  about,
  projects,
}

// ponytail: idioma único. Para sumar inglés: crear content/en con el tipo Content
// y elegir el objeto acá (o desde un contexto) — los componentes no cambian.
export const content = es
