# Portfolio — Franco Amarilla

**Full Stack Developer | AI Engineer** · Córdoba, Argentina

[Portfolio en vivo](https://francoamarilla.github.io/portfolio/) · [English version](README.md)

Portfolio personal bilingüe desarrollado con React y TypeScript. Presenta cuatro proyectos mediante casos de estudio, capturas, decisiones técnicas y enlaces a repositorios públicos, documentación o demos, según su disponibilidad.

## Proyectos destacados

| Proyecto | Enfoque | Enlaces |
|---|---|---|
| **Causario** | Gestión jurídica, sincronización de novedades judiciales, integración escritorio/nube, CI/CD | [Documentación pública](https://github.com/francoamarilla/causario-showcase) · [Demo](https://francoamarilla.github.io/causario-demo/) — el código principal es privado |
| **Recepta** | Gestión de turnos con IA, tool calling, evaluación de LLM | [Repositorio](https://github.com/francoamarilla/Recepta) · [Demo](https://recepta-wheat.vercel.app/login) |
| **Acopio** | Gestión de inventario y ventas, consistencia del stock y control de acceso | [Repositorio](https://github.com/francoamarilla/Acopio) |
| **Sticky Fingers** | Pedidos gastronómicos, notificaciones en tiempo real y pruebas automatizadas | [Repositorio](https://github.com/francoamarilla/StickyFingers) |

El showcase de Causario documenta el producto, pero **no** contiene el código privado de la aplicación. Las métricas de evaluación mostradas para Recepta corresponden a escenarios de prueba completos, no a mensajes individuales ni a tráfico de producción.

## Stack tecnológico

- **Aplicación:** React 19, TypeScript, React Router, Vite y CSS Modules.
- **Animaciones y efectos:** GSAP (incluidos ScrollTrigger y SplitText), Three.js mediante React Three Fiber para el fondo del Hero.
- **Tipografía:** Inter, Space Grotesk y JetBrains Mono.
- **Calidad:** TypeScript estricto, Oxlint y Vitest.
- **Despliegue:** GitHub Actions y GitHub Pages.

## Ejecución local

Utilizar Node.js 22.12+ (u otra versión admitida por Vite y las dependencias del proyecto).

```bash
npm ci
npm run dev       # Servidor de desarrollo
npm run build     # Chequeo de TypeScript + build de producción
npm run preview   # Vista previa del build
npm run lint      # Oxlint
npm test          # Vitest
```

## Organización y edición del contenido

El sitio separa componentes, datos de proyectos y textos traducibles:

| Contenido | Archivo |
|---|---|
| Nombre, rol y tecnologías del Hero | `src/data/profile.ts` |
| Orden de proyectos, destacados, tecnologías, imágenes y enlaces | `src/data/projects.ts` |
| Textos de proyectos en español e inglés | `src/content/es/projects.ts`, `src/content/en/projects.ts` |
| Traducciones de interfaz y sección Sobre mí | `src/content/{es,en}/` |
| Selección de idioma y presentación breve | `src/content/index.ts` |
| Correo, GitHub, LinkedIn y CV | `src/data/social-links.ts` |
| Grupos de tecnologías | `src/data/technologies.ts` |
| Tokens visuales y animaciones | `src/styles/`, `src/motion/` |
| Metadatos para compartir el sitio | `index.html` |

Para incorporar un proyecto, actualizar `ProjectSlug` en `src/types/content.ts`, agregar los datos a `src/data/projects.ts` y completar los textos en ambos idiomas. La opción `featured` permite mostrar las tarjetas anchas; el orden del arreglo define el orden de aparición.

Los enlaces externos tienen funciones diferentes: `repositoryUrl` identifica repositorios públicos de código, `showcaseUrl` lleva a documentación pública cuando el código es privado y `demoUrl` enlaza una demo. No se renderizan enlaces inexistentes.

### Idiomas

El español y el inglés ya están implementados. El sitio utiliza la preferencia guardada en `localStorage`, si existe, o el idioma del navegador. La navegación permite cambiar de idioma y recarga la página para aplicar la selección. También se actualiza el atributo HTML `lang`.

### Imágenes y recursos

Las capturas se guardan en `public/projects/<slug>/`. La función `asset()` aplica el prefijo base de Vite, para que las rutas funcionen desde `/portfolio/` en GitHub Pages.

### Animaciones y accesibilidad

GSAP controla las animaciones de entrada y desplazamiento. El Hero utiliza una escena de React Three Fiber cargada por separado, con una alternativa estática. Las animaciones se reducen si el usuario solicita menos movimiento y el contenido sigue siendo legible sin la escena animada.

## Publicación

El portfolio es una aplicación de una sola página (SPA) publicada en:

**https://francoamarilla.github.io/portfolio/**

`vite.config.ts` configura `base: '/portfolio/'`. El workflow `.github/workflows/deploy.yml` instala dependencias, ejecuta pruebas, compila y publica en GitHub Pages. Copia `dist/index.html` a `dist/404.html` para admitir la navegación directa hacia páginas de proyectos con React Router.

El PDF del CV y la imagen para redes sociales se encuentran en `public/`.

## Estado y limitaciones

- Los dos idiomas y los cuatro casos de estudio principales están implementados.
- El sitio es una SPA renderizada en el navegador; el prerenderizado podría mejorar la carga inicial y la indexación.
- Falta una revisión manual en un teléfono real, como indica la [lista de pendientes](CONTENT_TODO.md).
- La documentación refleja el estado del repositorio, no garantiza la disponibilidad continua de las demos externas.
