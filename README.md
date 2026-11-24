# Portfolio — Franco Amarilla

**Full Stack Developer | AI Engineer** · Córdoba, Argentina

[Live portfolio](https://francoamarilla.github.io/portfolio/) · [Versión en español](README.es.md)

A bilingual personal portfolio built with React and TypeScript. It presents four software projects through case studies, screenshots, technical decisions, and links to public source repositories, documentation, or demos as available.

## Featured projects

| Project | Focus | Links |
|---|---|---|
| **Causario** | Legal practice management, court-update synchronization, desktop/cloud integration, CI/CD | [Public documentation showcase](https://github.com/francoamarilla/causario-showcase) · [Demo](https://francoamarilla.github.io/causario-demo/) — main source code is private |
| **Recepta** | AI-assisted appointment management, tool calling, LLM evaluations | [Repository](https://github.com/francoamarilla/Recepta) · [Demo](https://recepta-wheat.vercel.app/login) |
| **Acopio** | Inventory and sales management, stock consistency, access control | [Repository](https://github.com/francoamarilla/Acopio) |
| **Sticky Fingers** | Food ordering, real-time notifications, automated tests | [Repository](https://github.com/francoamarilla/StickyFingers) |

The Causario showcase documents the product but does **not** contain its private application source code. The evaluation figures shown for Recepta refer to complete test scenarios, not individual chat messages or production traffic.

## Technology stack

- **Application:** React 19, TypeScript, React Router, Vite, CSS Modules.
- **Motion and visuals:** GSAP (including ScrollTrigger and SplitText), Three.js via React Three Fiber for the hero background.
- **Typography:** Inter, Space Grotesk and JetBrains Mono.
- **Quality:** strict TypeScript checks, Oxlint and Vitest.
- **Deployment:** GitHub Actions and GitHub Pages.

## Run locally

Use Node.js 22.12+ (or another version supported by the project's Vite and dependencies).

```bash
npm ci
npm run dev       # Local development server
npm run build     # TypeScript checks + production build
npm run preview   # Preview the production build
npm run lint      # Oxlint
npm test          # Vitest
```

## Project structure and editing

The site separates reusable UI, project metadata, and translated text:

| Purpose | Location |
|---|---|
| Name, role, hero technologies | `src/data/profile.ts` |
| Project order, featured status, technologies, images, external links | `src/data/projects.ts` |
| Spanish and English project descriptions | `src/content/es/projects.ts`, `src/content/en/projects.ts` |
| Spanish and English UI copy and About content | `src/content/{es,en}/` |
| Language selection and introductory copy | `src/content/index.ts` |
| Email, GitHub, LinkedIn and CV links | `src/data/social-links.ts` |
| Technology groups | `src/data/technologies.ts` |
| Design tokens and animations | `src/styles/`, `src/motion/` |
| Social-sharing metadata | `index.html` |

To add a project, update `ProjectSlug` in `src/types/content.ts`, add its metadata to `src/data/projects.ts`, and provide matching text for both languages. The `featured` flag controls the wider cards; the array defines the display order.

External project URLs have distinct meanings: `repositoryUrl` points to a public source repository, `showcaseUrl` points to public documentation when the source is private, and `demoUrl` points to an interactive demo. Missing links are not rendered.

### Languages

Spanish and English are implemented. The site uses a saved preference from `localStorage` when available, otherwise the browser language. Visitors can switch languages in the navigation; the page reloads to apply the selection. The HTML `lang` attribute is updated accordingly.

### Screenshots and assets

Images are stored under `public/projects/<slug>/` and referenced by the project data. The `asset()` helper applies Vite's base URL, so assets work under the GitHub Pages `/portfolio/` path.

### Motion and accessibility

GSAP provides entrance and scroll animations. The hero uses a separately loaded React Three Fiber scene with a static fallback. Motion is reduced when the visitor prefers reduced motion, and the content remains readable without the animated scene.

## Deployment

The site is a client-rendered single-page application deployed to:

**https://francoamarilla.github.io/portfolio/**

`vite.config.ts` sets `base: '/portfolio/'`. The workflow at `.github/workflows/deploy.yml` runs dependency installation, tests and the production build, then deploys to GitHub Pages. It copies `dist/index.html` to `dist/404.html` so direct visits to React Router project pages can load on GitHub Pages.

The CV download and social-sharing image are stored in `public/`.

## Status and limitations

- Both languages and all four featured case studies are implemented.
- This is a client-rendered SPA; pre-rendering could improve first-load performance and indexing.
- A manual review on a physical mobile device remains on the [content checklist](CONTENT_TODO.md).
- The documentation describes the current repository state, not guaranteed uptime for third-party project demos.
