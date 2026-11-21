import type { TechGroup } from '../types/content'

/** Stack por área. Solo tecnologías confirmadas, sin niveles ni porcentajes. */
export const technologies: TechGroup[] = [
  {
    id: 'languages',
    items: [
      { name: 'Java', icon: 'openjdk' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'SQL' },
    ],
  },
  { id: 'ai', items: [{ name: 'LLM Integration' }, { name: 'Tool Calling' }, { name: 'LLM Evaluation' }] },
  {
    id: 'backend',
    items: [
      { name: 'Spring Boot', icon: 'springboot' },
      { name: 'Spring Security', icon: 'springsecurity' },
      { name: 'Spring Data JPA', icon: 'spring' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'REST API' },
    ],
  },
  {
    id: 'frontend',
    items: [
      { name: 'Angular', icon: 'angular' },
      { name: 'React', icon: 'react' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS / SCSS', icon: 'sass' },
    ],
  },
  {
    id: 'databases',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Flyway', icon: 'flyway' },
    ],
  },
  { id: 'testing', items: [{ name: 'JUnit 5', icon: 'junit5' }, { name: 'Mockito' }] },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Docker Compose', icon: 'docker' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
]
