import type { AboutCopy } from '../../types/content'

/**
 * About Me. Solo datos confirmados: lo omitido se muestra como pendiente.
 * No agregar empleos, cargos ni años de experiencia sin validarlos.
 */
export const about: AboutCopy = {
  statement: undefined, // TODO: frase de presentación
  body: undefined, // TODO: 1–2 párrafos
  // ejes del perfil según el brief; el texto de cada uno queda para completar
  focus: [{ title: 'Producto' }, { title: 'Arquitectura' }, { title: 'Interfaces' }],
  education: { institution: 'UTN', detail: undefined }, // TODO: carrera y estado
}
