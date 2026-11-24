import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { Lightbox } from '../components/projects/Lightbox'
import { ProjectMedia } from '../components/projects/ProjectMedia'
import { ProjectTags } from '../components/projects/ProjectMeta'
import { content } from '../content'
import { projects } from '../data/projects'
import { isValidHref } from '../lib/url'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
import type { ProjectCopy, ProjectDetailKey } from '../types/content'
import { NotFound } from './NotFound'
import styles from './ProjectPage.module.css'

const { ui } = content

/** Orden de las secciones del detalle. */
const SECTIONS: ProjectDetailKey[] = ['problem', 'solution', 'challenges', 'features', 'highlights']

function SectionBody({ k, text }: { k: ProjectDetailKey; text: ProjectCopy }) {
  const value = text[k]
  if (typeof value === 'string') return <p>{value}</p>
  return (
    <ul className={styles.features}>
      {value.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  // imagen ampliada en el visor (índice en `images`); null = cerrado
  const [zoomed, setZoomed] = useState<number | null>(null)
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  const project = projects[index]
  const text = content.projects[project.slug]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  // portada + galería, en el orden en que se recorren en el visor
  const images = [
    ...(project.coverImage ? [{ src: project.coverImage.src, alt: project.name }] : []),
    ...(project.gallery ?? []).map((shot, i) => ({ src: shot.src, alt: text.galleryAlt?.[i] })),
  ]
  // el nombre empieza con el del proyecto, que es el texto visible en la barra del marco (WCAG 2.5.3)
  const zoomLabel = (alt?: string) =>
    `${alt && alt !== project.name ? `${project.name}: ${alt}` : project.name} (${ui.projects.zoom})`
  const zoomable = (i: number, media: ReactNode) => (
    <button type="button" className={styles.zoom} onClick={() => setZoomed(i)} aria-label={zoomLabel(images[i].alt)}>
      {media}
    </button>
  )
  const links = [
    { href: project.repositoryUrl, label: ui.projects.repo },
    { href: project.showcaseUrl, label: ui.projects.showcase },
    { href: project.demoUrl, label: ui.projects.demo },
  ].filter((l) => isValidHref(l.href))

  return (
    // key: al pasar de un proyecto a otro se remonta todo, así las animaciones de entrada se reinician
    <article key={project.slug} className={styles.page}>
      <title>{`${project.name} — ${ui.meta.title}`}</title>
      <meta name="description" content={text.summary} />

      <header className={`container ${styles.hero}`}>
        <Link to={{ pathname: '/', hash: 'projects' }} className={`mono ${styles.back}`}>
          <span aria-hidden="true">←</span> {ui.projects.back}
        </Link>
        <p className={`mono ${styles.counter}`}>
          {String(index + 1).padStart(2, '0')} {ui.projects.counter} {String(projects.length).padStart(2, '0')}
        </p>
        <SplitReveal as="h1" className={styles.title}>
          {project.name}
        </SplitReveal>
        <Reveal className={styles.intro} delay={0.3}>
          <p className={`mono ${styles.subtitle}`}>{text.subtitle}</p>
          <p className={styles.summary}>{text.summary}</p>
          {links.length > 0 && (
            <div className={styles.links}>
              {links.map((l) => (
                <a key={l.label} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {ui.newTab}</span>
                </a>
              ))}
            </div>
          )}
          {text.linksNote && <p className={styles.note}>{text.linksNote}</p>}
        </Reveal>
      </header>

      <div className="container">
        {project.coverImage ? (
          zoomable(0, <ProjectMedia
              label={project.name}
              src={project.coverImage.src}
              size={project.coverImage.size}
              ratio="natural"
              priority
            />)
        ) : (
          <ProjectMedia label={project.name} ratio="21 / 9" />
        )}
      </div>

      <div className={`container ${styles.sections}`}>
        <section className={styles.row} aria-labelledby="stack-label">
          <h2 id="stack-label" className={`mono ${styles.label}`}>
            {ui.projects.stack}
          </h2>
          <div className={styles.content}>
            <ProjectTags technologies={project.technologies} />
          </div>
        </section>

        {SECTIONS.map((k) => (
          <section key={k} className={styles.row} aria-labelledby={`${k}-label`}>
            <h2 id={`${k}-label`} className={`mono ${styles.label}`}>
              {ui.projects.sections[k]}
            </h2>
            <Reveal className={styles.content}>
              <SectionBody k={k} text={text} />
            </Reveal>
          </section>
        ))}

        {text.results && (
          <section className={styles.row} aria-labelledby="results-label">
            <h2 id="results-label" className={`mono ${styles.label}`}>
              {text.results.title}
            </h2>
            <Reveal className={styles.content}>
              <ul className={styles.features}>
                {text.results.items.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {text.results.note && <p className={styles.note}>{text.results.note}</p>}
            </Reveal>
          </section>
        )}

        {project.gallery?.length ? (
          <section className={styles.row} aria-labelledby="gallery-label">
            <h2 id="gallery-label" className={`mono ${styles.label}`}>
              {ui.projects.gallery}
            </h2>
            <div className={styles.content}>
              <div className={styles.gallery}>
                {project.gallery.map((shot, i) => {
                  const at = i + (project.coverImage ? 1 : 0)
                  return (
                    <div key={shot.src}>
                      {zoomable(at, <ProjectMedia label={project.name} src={shot.src} size={shot.size} alt={text.galleryAlt?.[i]} ratio="natural" />)}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <Lightbox images={images} index={zoomed} onChange={setZoomed} />

      <nav className={`container ${styles.pager}`} aria-label={ui.projects.title}>
        <Link to={`/projects/${prev.slug}`} className={styles.pagerLink}>
          <span className="mono">← {ui.projects.prev}</span>
          <span className={styles.pagerName}>{prev.name}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className="mono">{ui.projects.next} →</span>
          <span className={styles.pagerName}>{next.name}</span>
        </Link>
      </nav>
    </article>
  )
}
