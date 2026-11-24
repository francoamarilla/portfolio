import type { ProjectData, Shot } from '../types/content'

// el sitio vive bajo /portfolio/ en GitHub Pages: las rutas de /public llevan ese prefijo
const asset = (path: string) => import.meta.env.BASE_URL + path
// captura con su tamaño real en píxeles (data.test.ts lo compara con el archivo)
const shot = (path: string, width: number, height: number): Shot => ({ src: asset(path), size: [width, height] })

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
    coverImage: shot('projects/causario/01-inicio.webp', 1827, 952),
    gallery: [
      shot('projects/causario/02-expedientes.webp', 1847, 957),
      shot('projects/causario/03-expediente-detalle.webp', 1846, 955),
      shot('projects/causario/05-agenda-lista.webp', 1845, 961),
      shot('projects/causario/06-agenda-calendario.webp', 1846, 957),
      shot('projects/causario/09-modelos.webp', 1845, 955),
    ],
    // Código principal privado; el enlace público lleva únicamente a la documentación del proyecto.
    showcaseUrl: 'https://github.com/francoamarilla/causario-showcase',
    demoUrl: 'https://francoamarilla.github.io/causario-demo/',
    demoKind: 'visual',
  },
  {
    slug: 'recepta',
    name: 'Recepta',
    featured: true,
    technologies: ['Java 21', 'Spring Boot 4', 'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Claude', 'Tool Calling', 'LLM Evaluation', 'JWT', 'Flyway'],
    logo: asset('projects/recepta/logo.webp'),
    brand: ['#2F5D50', '#4F8F7B'],
    coverImage: shot('projects/recepta/01-agenda-asistente.webp', 1536, 674),
    gallery: [
      shot('projects/recepta/02-estadisticas.webp', 1536, 674),
      shot('projects/recepta/03-asistente-config.webp', 1536, 674),
      shot('projects/recepta/04-inicio.webp', 1536, 674),
    ],
    repositoryUrl: 'https://github.com/francoamarilla/Recepta',
    demoUrl: 'https://recepta-wheat.vercel.app/login',
    demoKind: 'interactive',
  },
  {
    slug: 'acopio',
    name: 'Acopio',
    technologies: ['Java 21', 'Spring Boot 3', 'React', 'TypeScript', 'PostgreSQL', 'Flyway', 'JWT', 'REST API'],
    logo: asset('projects/acopio/logo.svg'),
    brand: ['#3D5A2C', '#9CBF6E'],
    coverImage: shot('projects/acopio/01-inicio.webp', 1536, 674),
    gallery: [
      shot('projects/acopio/02-movimientos.webp', 1536, 674),
      shot('projects/acopio/03-ventas.webp', 1536, 674),
      shot('projects/acopio/04-productos.webp', 1536, 674),
    ],
    repositoryUrl: 'https://github.com/francoamarilla/Acopio',
  },
  {
    slug: 'sticky',
    name: 'Sticky Fingers',
    technologies: ['Java 21', 'Spring Boot 3', 'Angular', 'TypeScript', 'PostgreSQL', 'WebSockets', 'STOMP', 'JWT', 'Docker Compose', 'JUnit', 'Mockito', 'Linux'],
    logo: asset('projects/sticky/logo.webp'),
    brand: ['#8F1116', '#E0262C'],
    coverImage: shot('projects/sticky/panel-pedidos.webp', 960, 858),
    gallery: [
      shot('projects/sticky/panel-carta.webp', 977, 860),
      shot('projects/sticky/panel-ofertas.webp', 970, 857),
      shot('projects/sticky/panel-informes.webp', 1033, 858),
    ],
    repositoryUrl: 'https://github.com/francoamarilla/StickyFingers',
  },
]
