import type { ProjectData } from '../types/content'

// el sitio vive bajo /portfolio/ en GitHub Pages: las rutas de /public llevan ese prefijo
const asset = (path: string) => import.meta.env.BASE_URL + path

/**
 * Datos no traducibles de cada proyecto. El orden del array es el orden en pantalla.
 * Los textos (y el alt de cada imagen de la galería, en el mismo orden) viven en src/content/<lang>/projects.ts.
 */
export const projects: ProjectData[] = [
  {
    slug: 'causario',
    name: 'Causario',
    featured: true,
    technologies: ['Java 21', 'Spring Boot 3.5', 'Angular', 'TypeScript', 'Electron', 'PostgreSQL 16', 'Flyway', 'Docker Compose', 'GitHub Actions', 'CI/CD'],
    logo: asset('projects/causario/logo.svg'),
    brand: ['#0F5142', '#2F8770'],
    coverImage: asset('projects/causario/01-inicio.webp'),
    gallery: [
      asset('projects/causario/02-expedientes.webp'),
      asset('projects/causario/03-expediente-detalle.webp'),
      asset('projects/causario/05-agenda-lista.webp'),
      asset('projects/causario/06-agenda-calendario.webp'),
      asset('projects/causario/09-modelos.webp'),
    ],
    // Código principal privado; el enlace público lleva únicamente a la documentación del proyecto.
    showcaseUrl: 'https://github.com/francoamarilla/causario-showcase',
    demoUrl: 'https://francoamarilla.github.io/causario-demo/',
  },
  {
    slug: 'recepta',
    name: 'Recepta',
    featured: true,
    technologies: ['Java 21', 'Spring Boot 4', 'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Claude', 'Tool Calling', 'LLM Evaluation', 'JWT', 'Flyway'],
    logo: asset('projects/recepta/logo.webp'),
    brand: ['#2F5D50', '#4F8F7B'],
    coverImage: asset('projects/recepta/01-agenda-asistente.webp'),
    gallery: [
      asset('projects/recepta/02-estadisticas.webp'),
      asset('projects/recepta/03-asistente-config.webp'),
      asset('projects/recepta/04-inicio.webp'),
    ],
    repositoryUrl: 'https://github.com/francoamarilla/Recepta',
    demoUrl: 'https://recepta-wheat.vercel.app/login',
  },
  {
    slug: 'acopio',
    name: 'Acopio',
    technologies: ['Java 21', 'Spring Boot 3', 'React', 'TypeScript', 'PostgreSQL', 'Flyway', 'JWT', 'REST API'],
    logo: asset('projects/acopio/logo.svg'),
    brand: ['#3D5A2C', '#9CBF6E'],
    coverImage: asset('projects/acopio/01-inicio.webp'),
    gallery: [
      asset('projects/acopio/02-movimientos.webp'),
      asset('projects/acopio/03-ventas.webp'),
      asset('projects/acopio/04-productos.webp'),
    ],
    repositoryUrl: 'https://github.com/francoamarilla/Acopio',
  },
  {
    slug: 'sticky',
    name: 'Sticky Fingers',
    technologies: ['Java 21', 'Spring Boot 3', 'Angular', 'TypeScript', 'PostgreSQL', 'WebSockets', 'STOMP', 'JWT', 'Docker Compose', 'JUnit', 'Mockito', 'Linux'],
    logo: asset('projects/sticky/logo.webp'),
    brand: ['#8F1116', '#E0262C'],
    coverImage: asset('projects/sticky/panel-pedidos.webp'),
    gallery: [
      asset('projects/sticky/panel-carta.webp'),
      asset('projects/sticky/panel-ofertas.webp'),
      asset('projects/sticky/panel-informes.webp'),
    ],
    repositoryUrl: 'https://github.com/francoamarilla/StickyFingers',
  },
]
