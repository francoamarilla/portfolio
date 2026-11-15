# Brief maestro — Portfolio Full Stack Developer

> **Uso:** especificación de diseño y desarrollo para Claude Code; planificar primero y ejecutar por fases.  
> **Estado:** base visual y funcional por construir, con contenido provisional editable.  
> **Referencia de movimiento y estética:** https://fable-samples.vercel.app/sample-3/  
> **Prioridad:** un portfolio profesional, original y mantenible. No copiar el diseño de referencia.

## 0. Instrucciones para Claude Code

Actuá como **Creative Director, UI/UX Designer y Frontend Engineer** con experiencia en portfolios de desarrolladores y animaciones web avanzadas.

**Objetivo ejecutable:** construir una primera versión real y navegable del portfolio, no solo describirlo. El resultado debe verse profesional aun con datos provisionales y permitir que su dueño complete el contenido más adelante **sin reestructurar componentes ni rehacer animaciones**.

**Forma de trabajo (dos momentos separados):**

1. **Planificación:** inspeccioná la carpeta, leé el brief completo y revisá la referencia y las capturas/videos que aporte el usuario. Presentá un plan verificable con arquitectura, composición, efectos, dependencias y fases. **En Plan Mode no crear ni modificar archivos de la aplicación ni comenzar la implementación. Detenerse tras presentar el plan para aprobación.**
2. **Ejecución posterior a la aprobación:** usá **React + TypeScript + Vite** desde el inicio. No generes Angular ni una prueba en un framework para migrarla después. Revisá los archivos existentes antes de modificar cualquier cosa.
3. Implementá primero una versión funcional y visualmente cuidada de **Home + Projects**; luego About Me, Tech Stack, Contact y las páginas de detalle.
4. Separá el contenido de la presentación y de las animaciones desde el principio. El usuario completará datos y capturas auténticas más adelante.
5. Elegí librerías según necesidad: **GSAP + ScrollTrigger** para secuencias complejas de scroll; **Three.js mediante React Three Fiber** solo si el Hero realmente requiere una escena 3D/WebGL. CSS para interacciones simples. Evitá instalar librerías por anticipado.
6. Ejecutá las verificaciones disponibles (build, lint y tests si existen), revisá rendimiento y accesibilidad, corregí errores y reportá las limitaciones con precisión.
7. Entregá **README.md** para ejecución/personalización y **CONTENT_TODO.md** para contenidos, links y capturas pendientes.

**Modelos de Claude Code (orientación, no requisito técnico):** Claude **Fable es un modelo**, no un diseñador visual separado. Preferir **Opus 5.5 en Plan Mode** para arquitectura; iniciar implementación con Opus y evaluar **Fable 5.2** si hacen falta iteraciones complejas de movimiento, 3D, rendimiento o una refactorización grande. No asumir que Fable produce automáticamente mejores diseños ni acoplar código a un modelo. Si se cambia de modelo, preservar este brief y el plan aprobado como fuente de verdad.

**No inventar:** experiencia profesional, cargos, años de experiencia, clientes, estadísticas, enlaces, funcionalidades ni resultados de proyectos. Todo dato ausente debe ser un placeholder explícito. No usar etiquetas de seniority en la presentación profesional: el título a utilizar es **Full Stack Developer**.

---

## 1. Visión e identidad

Portfolio personal de un **Full Stack Developer** que desarrolla aplicaciones web y sistemas de gestión, con foco en Java, Spring Boot, Angular, TypeScript, PostgreSQL, APIs y soluciones de automatización e IA aplicada cuando corresponda.

Debe comunicar:

- Solidez técnica y capacidad de resolver problemas reales.
- Calidad de producto, criterio visual y atención al detalle.
- Profesionalismo, seriedad y claridad.
- Originalidad visual sin convertirse en una demostración de efectos vacíos.

**Concepto visual:** `Dark Editorial + Minimal Tech` con movimiento de nivel estudio creativo: grandes titulares, composiciones aireadas, jerarquía sólida y animaciones tecnológicas sutiles. El sitio es el portfolio de **una persona**, no una agencia.

### Referencia principal

https://fable-samples.vercel.app/sample-3/

Interesa especialmente la experiencia **AI-FIRST Studio**: concepto visual de nodos/red conectada o *neural wordmark*, fondo oscuro, composición tipográfica ambiciosa, elementos de gradientes y sensaciones de movimiento. Reinterpretar el recurso para representar **software, arquitectura y sistemas interconectados**, no vender un estudio de IA.

Evitar copiar textos, logos, layouts exactos, branding, assets o código exclusivo de la referencia.

### Sistema visual inicial (ajustable con criterio)

| Token | Valor inicial | Uso |
|---|---|---|
| `--bg` | `#11161B` | Fondo principal |
| `--surface` | `#202933` | Paneles y bloques |
| `--text` | `#F2F1ED` | Texto principal |
| `--accent` | `#62C8B5` | Acentos y estados interactivos |

- Títulos: **Space Grotesk** o **Manrope**.
- Texto: **Inter**.
- Detalles técnicos: **JetBrains Mono**.
- Acento contenido; evitar neón, glassmorphism excesivo, gradientes saturados y elementos de ciencia ficción recargados.
- Definir tokens para color, tipografía, espacios, radios y duración de animaciones. Garantizar contraste y foco visible.

---

## 2. Mapa de navegación

**La home tendrá exactamente cinco secciones principales**, en este orden:

1. `Home`
2. `Projects`
3. `About Me`
4. `Tech Stack`
5. `Contact`

Además, cada proyecto debe tener su página individual en `/projects/:slug` con plantilla reutilizable. No agregar secciones principales de Blog, Testimonials o Experience & Education. Incorporar educación dentro de About Me.

Menú de navegación fijo o discreto según convenga, con navegación por anclas, indicador activo si aporta valor y versión mobile clara.

---

## 3. Secciones: contenido y diseño

### 3.1 Home — primera impresión

**Contenido:**

- `[NOMBRE COMPLETO]` como texto grande y editable.
- Título exacto: **Full Stack Developer**.
- Presentación breve provisional **señalada como placeholder**.
- CTA `Explorar proyectos` y `Contactar`.
- Enlaces de GitHub y LinkedIn solo cuando se proporcionen URLs válidas; mientras tanto, mostrarlos como pendientes, no como enlaces rotos.

**Composición y movimiento:**

- Hero editorial de gran formato, buen espacio negativo, texto legible en primer plano.
- Motivo visual original inspirado en la referencia: red de nodos y conexiones dinámicas, pulsos suaves, movimiento orgánico, ligera reacción al puntero; sensación de sistema conectado.
- Interacción contenida: nunca debe dificultar clics, accesibilidad o lectura.
- Carga progresiva y fallback estático de buena calidad para móvil, movimiento reducido o WebGL no disponible.
- Evitar que la animación domine toda la página; CTA visible y claro.

### 3.2 Projects — máxima prioridad

Incluir **exactamente estos cinco proyectos**, con estos nombres:

1. **Causario**
2. **Turnos**
3. **Stock API**
4. **Sticky**
5. **Farmacia**

**Información conocida (no ampliar con suposiciones):**

- **Turnos:** plataforma de gestión para barberías, peluquerías, centros de manicura y otros establecimientos; trabaja con turnos y finanzas del negocio. Está prevista la integración de un chatbot de WhatsApp basado en IA, con conocimiento del negocio (RAG), consultas de disponibilidad a la BD y derivación humana. **La integración del chatbot todavía NO está terminada:** presentarla como `En desarrollo / Integración de IA pendiente`, nunca como disponible.
- **Stock API:** proyecto de gestión de stock mediante API, con control de acceso/roles mencionado en el contexto del proyecto. Verificar implementación exacta antes de detallar funcionalidades.
- **Farmacia:** proyecto de sistema de farmacia realizado en equipo. No asumir características no proporcionadas.
- **Causario y Sticky:** se conocen solo sus nombres. Usar placeholders para descripción, stack, capturas y enlaces. No inferir de qué tratan.

**Tratamiento visual:**

- No utilizar una cuadrícula genérica de cinco tarjetas idénticas.
- Crear una composición editorial consistente que admita los cinco proyectos: destacados amplios, alternancia de proporciones y ritmo visual, sin hacer que alguno parezca irrelevante.
- Tarjetas con nombre, descripción breve, tags reales o placeholders, espacio para captura, y CTA a detalle.
- Animaciones de entrada por scroll; transiciones de hover sobrias; navegación a detalle.
- Si no existen capturas reales, utilizar **marcos y placeholders claramente identificados**, no capturas falsas de software.
- Todo el contenido debe provenir de datos tipados para poder editarlo más adelante.

**Página individual** `/projects/:slug`:

- Hero del proyecto y estado (si corresponde).
- Problema, solución, funcionalidades, decisiones de arquitectura, stack, desafíos y aprendizajes.
- Galería configurable y diagramas opcionales.
- URLs de repositorio/demo solo cuando se aporten; ocultar botones sin enlace válido.
- Navegación de vuelta a proyectos y entre proyectos cuando sea útil.
- Secciones de detalle opcionales: si faltan datos, mostrar un marcador editable en esta primera fase, con opción de ocultarlas antes de producción.

### 3.3 About Me

- Presentación profesional compacta, sin duplicar el CV.
- Enfoque en desarrollar productos, arquitectura e interfaces.
- Formación universitaria en UTN como dato a completar/verificar en el texto final.
- Composición tipográfica editorial con un detalle visual discreto.
- No inventar empleo formal como desarrollador.

### 3.4 Tech Stack

Agrupar y representar tecnologías que el usuario pueda validar:

- **Backend:** Java, Spring Boot, APIs REST.
- **Frontend:** Angular, TypeScript.
- **Databases:** PostgreSQL; incorporar otras solo si se confirman.
- **Testing:** JUnit, Mockito, JaCoCo, si se confirman como parte del perfil actual.
- **AI & Automation:** mostrar integraciones reales; las capacidades planeadas deben estar diferenciadas como `En desarrollo`.
- **Developer Tools:** Git, GitHub y otras herramientas confirmadas.

Sin barras de porcentaje arbitrarias ni rankings de habilidades. Animación suave en grupos o chips, evitando ruido visual.

### 3.5 Contact

- Cierre tipográfico con invitación profesional al contacto.
- Email, LinkedIn, GitHub y CV en datos centralizados, con placeholders claros mientras falten.
- Preferir enlaces `mailto:` y sociales verificados.
- No simular un formulario funcional sin backend o servicio de envío.
- Footer pequeño, coherente con el lenguaje visual.

---

## 4. Animaciones: sofisticación con mantenibilidad

**Principio clave:** las animaciones **no deben romperse al reemplazar placeholders por texto real, cambiar imágenes, agregar proyectos o variar alturas de contenido**.

### Intensidad por sección

| Sección | Intensidad | Efecto preferido |
|---|---|---|
| Home | Alta | Red de nodos / elemento original interactivo y entrada de titulares |
| Projects | Alta | Entradas, cambios de composición y hover elegante |
| About Me | Media | Apariciones tipográficas y ligeros desplazamientos |
| Tech Stack | Baja | Microinteracciones y reveals agrupados |
| Contact | Media | Transición de cierre editorial |

### Reglas técnicas

1. Priorizar transformaciones (`transform`, `opacity`) frente a animar propiedades de layout cuando sea posible.
2. No acoplar timings ni posiciones al largo exacto de un título, al número fijo de tarjetas o a una altura fija en píxeles.
3. Separar animación, componentes y datos. Usar componentes y hooks reutilizables cuando aporten valor.
4. Si se utiliza **GSAP / ScrollTrigger**, encapsular efectos en hooks/componentes, usar `useGSAP` de `@gsap/react` o `gsap.context()` cuando corresponda, limpiar y revertir animaciones al desmontar, y recalcular ScrollTrigger cuando cambie el layout (imágenes, fuentes o datos). Evitar dobles inicializaciones en React Strict Mode.
5. Si se utiliza **Three.js/WebGL**, considerar **React Three Fiber** para integrar la escena en React; controlar `devicePixelRatio`, consumo de CPU/GPU, listeners, recursos y visibilidad; ofrecer fallback estático cuando falte WebGL, se solicite movimiento reducido o el dispositivo no soporte la experiencia.
6. Evitar scroll-jacking, animaciones que bloqueen el contenido o desplazamiento forzado.
7. Respetar `prefers-reduced-motion`, navegación por teclado y legibilidad de pantalla.
8. Mantener buen rendimiento en celulares y equipos modestos; adaptar intensidad, no reducir usabilidad.
9. Dimensionar imágenes con `aspect-ratio` para evitar saltos; permitir reemplazar capturas sin alterar layout.
10. Probar contenido corto/largo, imágenes faltantes, cinco proyectos y más de cinco para verificar extensibilidad, además de distintos tamaños de pantalla.

No es obligatorio utilizar todas las librerías de animación. Preferir la solución más simple que alcance la calidad deseada.

---

## 5. Arquitectura para la versión final

**Stack elegido para este portfolio:** **React + TypeScript (modo estricto) + Vite + React Router**. CSS Modules, SCSS o CSS organizado con tokens de diseño, según proponga el plan. No hace falta backend ni base de datos para el portfolio.

**Animación recomendada, solo donde aporte valor:** GSAP + ScrollTrigger para transiciones avanzadas, CSS para hover y reveals simples, Three.js + React Three Fiber para la red de nodos del Hero si se justifica, y `@gsap/react` para integraciones React cuando se use GSAP. Mantener las dependencias mínimas y no introducir soluciones 3D en secciones que no las requieran.

**Compatibilidad:** rutas y componentes en React; no utilizar Angular Router, servicios, directivas ni componentes Angular. El uso de Angular como tecnología en proyectos existentes puede seguir mostrándose dentro del Tech Stack personal sin confundirse con el framework del portfolio.

**Separar datos y UI** mediante archivos TypeScript tipados (nombres de ejemplo):

- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/technologies.ts`
- `src/data/social-links.ts`

Usar interfaces/types en `src/types/`, sin insertar textos reales en JSX. El reemplazo de cualquier texto, URL, imagen o proyecto debe requerir editar **datos**, no reescribir componentes o animaciones.

**Modelo conceptual de proyecto:** `slug`, `name`, `summary`, `status`, `technologies`, `coverImage`, `gallery`, `problem`, `solution`, `features`, `architecture`, `challenges`, `repositoryUrl`, `demoUrl`. Todos los campos que puedan faltar deben ser opcionales o tener placeholders reconocibles. No suponer que los cinco proyectos poseen todos los campos completos.

**Componentes reutilizables sugeridos:** `Hero`, `SectionHeading`, `ProjectCard`, `ProjectDetail`, `TechGroup`, `SocialLinks`, `Reveal`, `SiteHeader`, `SiteFooter`, `AnimatedNetwork`. Considerar hooks como `useReducedMotion` o una integración de GSAP compartida. Adaptar según arquitectura real; no crear abstracciones innecesarias.

Estilos y textos deben ser editables sin tocar la lógica de animación. Usar rutas reales y estados para contenido aún pendiente. Configurar metadata SEO inicial y etiquetas semánticas. No incluir analytics ni servicios externos sin autorización.

---

## 6. Fases de entrega

### Fase 1: base visual y de código — hacer ahora

- Revisar proyecto existente / iniciar **React + TypeScript con Vite** según corresponda.
- Definir tokens visuales y componentes base.
- Crear Home con animación distintiva y fallback.
- Crear Projects con cinco registros, tarjetas navegables y animaciones mantenibles.
- Crear About Me, Tech Stack y Contact.
- Crear plantilla `/projects/:slug`.
- Implementar responsive y accesibilidad básica.
- Centralizar datos y placeholders.
- Documentar TODOs de contenido y pasos de ejecución.
- Comprobar compilación y corregir errores.

### Fase 2: personalización — dejar preparada, no inventar

- Completar nombre, presentación y enlaces reales.
- Redactar las cinco fichas de proyectos.
- Incorporar capturas y diagramas auténticos.
- Revisar el estado de Turnos y actualizar la integración de IA cuando exista.
- Agregar CV y datos de contacto.
- Revisar rendimiento, accesibilidad y metadatos antes de publicar.

---

## 7. Criterios de aceptación

Considerar terminada la primera fase solo si:

- [ ] La página tiene las **cinco secciones** acordadas y enlaces de navegación funcionales.
- [ ] El Hero posee una identidad visual sólida inspirada en la referencia, **no una copia**.
- [ ] Hay **cinco proyectos** con los nombres exactos y rutas de detalle funcionales.
- [ ] Las funciones pendientes de **Turnos** no se describen como terminadas.
- [ ] **Causario y Sticky** no tienen funcionalidades inventadas.
- [ ] Textos y proyectos están en archivos de datos y no incrustados indiscriminadamente en JSX.
- [ ] Animaciones de entrada/scroll/hover conservan estabilidad con textos de distintas longitudes.
- [ ] El sitio es usable en desktop, tablet y móvil, incluyendo modo de movimiento reducido.
- [ ] No hay enlaces inventados ni botones que simulan acciones inexistentes.
- [ ] El proyecto React/Vite compila, o se informa con precisión qué bloqueó la compilación.
- [ ] Se generan `README.md` y `CONTENT_TODO.md`.

---

## 8. Prompts de uso en Claude Code

### 8.1 Primero: planificación (Opus 5.5 + Plan Mode)

> Leé `@PORTFOLIO_BRIEF.md` completo. Revisá el estado del repositorio y analizá la referencia visual https://fable-samples.vercel.app/sample-3/ (junto con las capturas o grabaciones adjuntas, si las hay). Proponé un plan de implementación para **React + TypeScript + Vite**: componentes y rutas, datos editables, diseño de las cinco secciones, animaciones, dependencias mínimas, rendimiento, accesibilidad, pruebas de aceptación y fases incrementales. Compará brevemente dos opciones para el Hero (CSS/SVG vs React Three Fiber) y justificá tu elección. **No escribas ni modifiques código ahora**. Detenete para que apruebe el plan.

### 8.2 Después: ejecución incremental (Opus 5.5 inicialmente)

> Implementá la **primera fase del plan aprobado** y respetá `@PORTFOLIO_BRIEF.md`. Empezá por estructura React/Vite, tokens y datos tipados, y construí **Home + Projects** con navegación funcional. Hacé comprobaciones técnicas y presentame el resultado para revisar la estética **antes de continuar con las otras secciones**. No inventes información profesional ni detalles de mis proyectos.

### 8.3 Animaciones complejas (evaluar Fable 5.2)

> Revisá el Hero y las transiciones de Projects frente al Sample 3. Mejorá fidelidad del movimiento, fluidez y composición, sin copiar su marca ni su contenido. Conservá los componentes, rutas y datos existentes, respetá `prefers-reduced-motion`, evitá scroll-jacking y verificá fallbacks móviles. Si detectás problemas de arquitectura o rendimiento, proponé correcciones justificadas antes de refactorizaciones grandes. Probá con títulos y textos de longitud variable.

**Cambiar de modelo no reemplaza la revisión visual humana.** Guardar decisiones aprobadas y verificar el resultado en navegador en cada etapa.


