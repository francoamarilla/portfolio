import type { Content, Lang } from '../types/content'
import * as enAbout from './en/about'
import { projects as enProjects } from './en/projects'
import { ui as enUi } from './en/ui'
import * as esAbout from './es/about'
import { projects as esProjects } from './es/projects'
import { ui as esUi } from './es/ui'

const es: Content = {
  lang: 'es',
  ui: esUi,
  profile: { intro: 'Desarrollo aplicaciones web e integro soluciones de inteligencia artificial para resolver problemas reales.' },
  about: esAbout.about,
  education: esAbout.education,
  projects: esProjects,
}

const en: Content = {
  lang: 'en',
  ui: enUi,
  profile: { intro: 'I build web applications and integrate artificial intelligence solutions to solve real problems.' },
  about: enAbout.about,
  education: enAbout.education,
  projects: enProjects,
}

export const languages = { es, en }
const KEY = 'lang'

function pick(): Lang {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // storage bloqueado: se usa el idioma del navegador
  }
  const browser = globalThis.navigator?.language
  return browser && !browser.startsWith('es') ? 'en' : 'es'
}

// ponytail: el idioma se fija al cargar y cambiarlo recarga la página, así los `const { ui } = content`
// a nivel de módulo siguen valiendo. Pasar a un contexto si hace falta cambiar en caliente.
export const content = languages[pick()]

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    // ponytail: sin storage la elección no persiste entre recargas; sumar ?lang= si hiciera falta
  }
  location.reload()
}
