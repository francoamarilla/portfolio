import type { ProjectData } from '../types/content'

/**
 * Datos no traducibles de cada proyecto. El orden del array es el orden en pantalla.
 * Los textos (resumen, problema, etc.) viven en src/content/<lang>/projects.ts.
 * No completar campos sin datos reales: lo omitido se muestra como pendiente.
 */
export const projects: ProjectData[] = [
  { slug: 'causario', name: 'Causario' },
  { slug: 'turnos', name: 'Turnos', status: 'in-development' },
  { slug: 'stock-api', name: 'Stock API' },
  { slug: 'sticky', name: 'Sticky' },
  { slug: 'farmacia', name: 'Farmacia', team: true },
]
