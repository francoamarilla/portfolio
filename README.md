# Portfolio — Full Stack Developer

Portfolio personal: Home, Projects (con página de detalle por proyecto), About Me, Tech Stack y Contact.

**Stack:** React 19 · TypeScript (strict) · Vite · React Router · GSAP (ScrollTrigger + SplitText) · Three.js vía React Three Fiber (solo el fondo del Hero) · CSS Modules con tokens.

Lo que falta completar (nombre, textos, links, capturas) está listado en [`CONTENT_TODO.md`](./CONTENT_TODO.md).

## Ejecutar

Requiere Node 20.19+ o 22.12+.

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # compila a dist/ (incluye chequeo de tipos)
npm run preview   # sirve dist/ para probar el build
npm run lint      # oxlint
npm test          # test de integridad de datos (Vitest)
```

## Dónde se edita cada cosa

Los componentes no contienen textos ni datos: todo se cambia editando archivos de contenido.

| Qué | Archivo |
|---|---|
| Nombre, rol, tecnologías de la franja del Hero | `src/data/profile.ts` |
| Presentación breve del Hero | `src/content/index.ts` → `profile.intro` |
| Proyectos: orden, estado, stack, capturas, links | `src/data/projects.ts` |
| Proyectos: resumen, problema, solución, funcionalidades… | `src/content/es/projects.ts` |
| About Me | `src/content/es/about.ts` |
| Tech Stack | `src/data/technologies.ts` |
| Email, GitHub, LinkedIn, CV | `src/data/social-links.ts` |
| Textos de interfaz (menú, botones, títulos, etiquetas) | `src/content/es/ui.ts` |
| Colores, tipografía, espacios, duraciones | `src/styles/tokens.css` |
| Metadatos para compartir en redes | `index.html` |

### Contenido pendiente

Cualquier campo opcional que se deje vacío se muestra como un marcador visible con la etiqueta `placeholder`. Nunca se inventa contenido ni se muestran links rotos: un link sin URL válida aparece como "pendiente" y no es clickeable.

Antes de publicar, `showPlaceholders = false` en `src/config.ts` oculta todos los marcadores que queden.

### Agregar un proyecto

1. Sumar el slug al tipo `ProjectSlug` en `src/types/content.ts`.
2. Agregarlo en `src/data/projects.ts`. La posición en el array es el orden en pantalla.
3. Agregar sus textos en `src/content/es/projects.ts`. TypeScript avisa si falta.

Jerarquía: los proyectos con `featured: true` (hoy Causario y Turnos) se muestran arriba en formato ancho; el resto va en una grilla compacta de tres columnas bajo "Otros proyectos". Conviene listar primero los destacados, porque la numeración sigue el orden del array. La página `/projects/<slug>` se genera automáticamente.

### Capturas

Guardarlas en `public/projects/<slug>/` y referenciarlas como `coverImage: '/projects/<slug>/cover.webp'`, o en `gallery` para la galería del detalle. El marco reserva el alto con una proporción fija, así que reemplazar una captura no mueve el layout. Si una ruta está mal, se muestra el placeholder en lugar de un hueco vacío.

Formato recomendado: WebP. Portada de al menos 2000 px de ancho: 21:9 para los destacados y 16:10 para la grilla compacta.

### Agregar un idioma

Los textos traducibles están en `src/content/es/`. Para sumar inglés:

1. Crear `src/content/en/` con los mismos archivos, tipados con `Content`. TypeScript marca cualquier clave faltante.
2. En `src/content/index.ts`, elegir el idioma: hoy exporta `es`; puede pasar a un contexto o a un parámetro de URL.

No hay que tocar componentes.

## Animaciones

- `src/motion/gsap.ts` registra los plugins y define la curva y la duración por defecto.
- `src/motion/SplitReveal.tsx` y `src/motion/Reveal.tsx` son componentes reutilizables (títulos por líneas y aparición de bloques). No dependen del largo del texto ni de la cantidad de elementos.
- Todas las animaciones se crean dentro de `gsap.matchMedia()` con `prefers-reduced-motion: no-preference`. Con movimiento reducido no se crea ninguna y el contenido es visible desde el inicio. El estado oculto inicial lo pone GSAP, no el CSS, así que si el JS falla nada queda invisible.
- **Fondo del Hero:** `src/components/AnimatedNetwork/`.
  - `Scene.tsx` es la escena WebGL. La intensidad de la respuesta al cursor está en el bloque `POINTER`.
  - `field.ts` define la cámara, la ola y el desvanecimiento hacia los bordes. Lo comparten la escena y el fallback.
  - `NetworkFallback.tsx` es la versión SVG estática, que se usa sin WebGL, con movimiento reducido o con ahorro de datos.
  - La escena se carga en un chunk aparte cuando el navegador queda libre y se pausa fuera de pantalla.

## Publicar

Es una SPA: el servidor tiene que responder `index.html` para cualquier ruta (por ejemplo `/projects/turnos`).

- **Vercel:** `vercel.json` con `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- **Netlify:** `public/_redirects` con `/*  /index.html  200`

Antes de publicar, revisar [`CONTENT_TODO.md`](./CONTENT_TODO.md), en especial `og:image` y `og:url`, que necesitan el dominio.

## Estado y limitaciones conocidas

- Lighthouse (celular simulado, build local): Rendimiento ~71, Accesibilidad 100, Buenas prácticas 100, SEO 100.
- **Rendimiento:** lo limita el modelo SPA, que no muestra nada hasta ejecutar el JS (FCP ~3 s en la simulación de 4G). Prerenderizar el HTML en el build sería la mejora más grande.
- **Peso:** el bundle inicial es de ~157 KB gz, repartido en partes casi iguales entre GSAP, React DOM y React Router. La escena 3D (~245 KB gz) carga aparte, después.
- **CLS:** hay un desplazamiento mínimo (0,018) cuando la tipografía definitiva reemplaza a la provisoria en el Hero.
- **Consola:** en desarrollo puede aparecer el aviso `THREE.Clock deprecated`. Viene de React Three Fiber, no del código del proyecto.
