# Contenido pendiente

Todo lo que falta para pasar de la versión con placeholders a la definitiva. Cada ítem indica el archivo donde se completa. Lo que se deje vacío se sigue mostrando como placeholder, nunca como contenido inventado.

Al terminar, `showPlaceholders = false` en `src/config.ts` oculta los marcadores que queden.

## Identidad

- [ ] **Nombre completo** → `src/data/profile.ts` (`name`). Se usa en el Hero, el header y el footer.
- [ ] **Presentación breve del Hero**, 1–2 frases → `src/content/index.ts` (`profile.intro`).
- [ ] Revisar las tecnologías de la franja inferior del Hero → `src/data/profile.ts` (`heroStack`).

## Links y contacto

En `src/data/social-links.ts`. Sin URL válida se muestran como "pendiente".

- [ ] **GitHub**: URL del perfil.
- [ ] **LinkedIn**: URL del perfil.
- [ ] **Email** en formato `mailto:nombre@dominio.com`.
- [ ] **CV**: subir el PDF a `public/` (por ejemplo `public/cv.pdf`) y poner `url: '/cv.pdf'`.

## Proyectos

Datos en `src/data/projects.ts` (estado, stack, capturas, repo, demo); textos en `src/content/es/projects.ts`.

Para cada proyecto: resumen, problema, solución, funcionalidades, decisiones de arquitectura, desafíos, aprendizajes, stack, portada, galería y links de repositorio/demo (solo si son públicos).

### Causario
- [ ] Todo: hoy solo se conoce el nombre. No hay ningún dato cargado.

### Turnos
- [ ] Stack.
- [ ] Problema, solución, arquitectura, desafíos, aprendizajes.
- [ ] Capturas.
- [ ] Repo o demo, si son públicos.
- [ ] **Cuando la integración de IA esté terminada:** pasar el chatbot de `upcoming` a `features` y quitar `upcomingLabel`. Revisar también `src/data/technologies.ts` (grupo `ai`) y el test en `src/data/data.test.ts`, que hoy exige que figure como "en desarrollo".

### Stock API
- [ ] **Verificar** la implementación real antes de detallar: el resumen actual ("gestión de stock mediante una API, con control de acceso por roles") lleva la nota "a verificar". Quitar `note` cuando esté confirmado.
- [ ] Stack, funcionalidades, arquitectura, capturas, links.

### Sticky
- [ ] Todo: hoy solo se conoce el nombre.

### Farmacia
- [ ] Qué partes del sistema desarrollaste vos dentro del equipo.
- [ ] Stack, funcionalidades, capturas, links.

### Capturas
- [ ] Portadas en `public/projects/<slug>/`, formato WebP, al menos 2000 px de ancho.
- [ ] Opcional: imágenes de galería y diagramas de arquitectura (`gallery`).

## About Me

En `src/content/es/about.ts`.

- [ ] **Frase de presentación** (`statement`): una frase, en tipografía grande.
- [ ] **Presentación** (`body`): 1–2 párrafos sobre cómo trabajás y qué construís. Sin duplicar el CV.
- [ ] **Enfoque:** los tres ejes (Producto, Arquitectura, Interfaces) admiten un texto corto opcional (`text`).
- [ ] **Formación UTN:** carrera, facultad regional y estado (`education.detail`). Verificar.
- [ ] No agregar empleos, cargos ni años de experiencia que no se puedan respaldar.

## Tech Stack

En `src/data/technologies.ts`.

- [ ] **Confirmar Testing:** JUnit, Mockito y JaCoCo figuran "a confirmar". Si son parte del perfil actual, quitar `state: 'unconfirmed'`; si no, eliminarlos.
- [ ] Databases: agregar otras bases solo si se confirman.
- [ ] Developer Tools: agregar otras herramientas confirmadas (por ejemplo IDE, Docker, Postman).
- [ ] AI & Automation: cuando haya integraciones terminadas, quitar `state: 'in-development'`.

## Textos de interfaz propuestos (revisar)

En `src/content/es/ui.ts`. Los redacté como punto de partida; cambiarlos si no representan tu voz.

- [ ] Intro de Projects: "Aplicaciones web y sistemas de gestión. Cada ficha reúne…"
- [ ] Intro de Tech Stack: "Tecnologías con las que trabajo, agrupadas por área…"
- [ ] Título de Contact: "Construyamos algo sólido."
- [ ] Texto de Contact: "Si tenés un proyecto, una propuesta o una consulta técnica, escribime."

## Antes de publicar

- [ ] Definir el dominio y agregar en `index.html`:
  - `og:url`
  - `og:image`: imagen de 1200×630 px en `public/`, con URL absoluta
  - `<link rel="canonical">`
  - cambiar `twitter:card` a `summary_large_image`
- [ ] Revisar `og:locale` (`es_AR`) en `index.html`.
- [ ] Configurar el rewrite SPA del hosting (ver README → Publicar).
- [ ] `showPlaceholders = false` en `src/config.ts`.
- [ ] `npm test`, `npm run lint` y `npm run build` sin errores.
- [ ] Revisión final en un celular real: legibilidad del Hero, fluidez de las animaciones, links.
