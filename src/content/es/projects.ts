import type { ProjectCopy, ProjectSlug } from '../../types/content'

/**
 * Textos de proyectos en español. Solo información confirmada:
 * todo campo omitido se muestra como pendiente.
 */
export const projects: Record<ProjectSlug, ProjectCopy> = {
  causario: {},
  turnos: {
    summary:
      'Plataforma de gestión para barberías, peluquerías, centros de manicura y otros establecimientos: turnos y finanzas del negocio.',
    features: ['Gestión de turnos', 'Gestión de finanzas del negocio'],
    upcomingLabel: 'Integración de IA pendiente',
    upcoming: [
      'Chatbot de WhatsApp con IA: conocimiento del negocio (RAG), consulta de disponibilidad en la base de datos y derivación a una persona.',
    ],
  },
  'stock-api': {
    summary: 'Gestión de stock mediante una API, con control de acceso por roles.',
    note: 'Detalle de implementación a verificar.',
  },
  sticky: {},
  farmacia: {
    summary: 'Sistema de farmacia desarrollado en equipo.',
  },
}
