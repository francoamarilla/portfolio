import type { AboutCopy, EducationCopy } from '../../types/content'

export const about: AboutCopy = {
  statement:
    'Soy Full Stack Developer y AI Engineer: construyo sistemas de gestión completos, desde la base de datos y la API hasta la interfaz, e integro asistentes de IA controlados por reglas de negocio.',
  body: [
    'Trabajo con Java 21 y Spring Boot en el backend, Angular y React con TypeScript en el frontend, PostgreSQL con Flyway, y Python con FastAPI para servicios de IA basados en tool calling.',
    'Cuido la seguridad y la consistencia de los datos: autenticación JWT, control de acceso por roles, aislamiento multi-tenant con Row-Level Security y pruebas automatizadas con JUnit, Testcontainers y evaluaciones de LLMs.',
    'Mi proyecto principal, Causario, se utiliza en una implementación piloto en un estudio jurídico de Córdoba.',
  ],
}

export const education: EducationCopy[] = [
  {
    title: 'Tecnicatura Universitaria en Programación',
    institution: 'Universidad Tecnológica Nacional — Facultad Regional Córdoba',
    period: '2025–2027 · En curso',
    description:
      'Formación en arquitectura de software, programación orientada a objetos, patrones de diseño, bases de datos y desarrollo Full Stack.',
  },
  {
    title: 'Técnico Electromecánico',
    institution: 'EPET N.º 1',
    period: '2014–2019 · Finalizado',
  },
]
