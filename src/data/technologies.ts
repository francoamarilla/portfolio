import type { TechGroup } from '../types/content'

/**
 * Stack por área. Agregar solo tecnologías confirmadas.
 * state: 'unconfirmed' = a validar · 'in-development' = planificado, todavía no disponible.
 */
export const technologies: TechGroup[] = [
  { id: 'backend', items: [{ name: 'Java' }, { name: 'Spring Boot' }, { name: 'APIs REST' }] },
  { id: 'frontend', items: [{ name: 'Angular' }, { name: 'TypeScript' }] },
  { id: 'databases', items: [{ name: 'PostgreSQL' }] },
  {
    id: 'testing',
    items: [
      { name: 'JUnit', state: 'unconfirmed' },
      { name: 'Mockito', state: 'unconfirmed' },
      { name: 'JaCoCo', state: 'unconfirmed' },
    ],
  },
  {
    id: 'ai',
    // integración prevista en Turnos; todavía no terminada
    items: [
      { name: 'Chatbot WhatsApp', state: 'in-development' },
      { name: 'RAG', state: 'in-development' },
    ],
  },
  { id: 'tools', items: [{ name: 'Git' }, { name: 'GitHub' }] },
]
