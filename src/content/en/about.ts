import type { AboutCopy, EducationCopy } from '../../types/content'

export const about: AboutCopy = {
  statement:
    "I'm a Full Stack Developer and AI Engineer: I build complete management systems, from the database and API to the interface, and integrate AI assistants governed by business rules.",
  body: [
    'I work with Java 21 and Spring Boot on the backend, Angular and React with TypeScript on the frontend, PostgreSQL with Flyway, and Python with FastAPI for tool-calling AI services.',
    'I care about security and data consistency: JWT authentication, role-based access control, multi-tenant isolation with Row-Level Security, and automated testing with JUnit, Testcontainers and LLM evaluations.',
    'My main project, Causario, is in use as a pilot at a law firm in Córdoba.',
  ],
}

export const education: EducationCopy[] = [
  {
    title: 'Associate Degree in Programming',
    institution: 'National Technological University (UTN) — Córdoba Regional Faculty',
    period: '2025–2027 · In progress',
    description:
      'Coursework in software architecture, object-oriented programming, design patterns, databases and full stack development.',
  },
  {
    title: 'Electromechanical Technician',
    institution: 'EPET N.º 1',
    period: '2014–2019 · Completed',
  },
]
