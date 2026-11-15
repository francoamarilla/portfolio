import { Link, useParams } from 'react-router'
import { Pending } from '../components/Pending'
import { ProjectMedia } from '../components/projects/ProjectMedia'
import { ProjectBadges, ProjectTags } from '../components/projects/ProjectMeta'
import { showPlaceholders } from '../config'
import { content } from '../content'
import { projects } from '../data/projects'
import { isValidHref } from '../lib/url'
import { Reveal } from '../motion/Reveal'
import { SplitReveal } from '../motion/SplitReveal'
import type { ProjectCopy, ProjectDetailKey } from '../types/content'
import { NotFound } from './NotFound'
import styles from './ProjectPage.module.css'

const { ui } = content

/** Orden de las secciones del detalle. Agregar o quitar una sección = editar esta lista y los textos. */
const SECTIONS: ProjectDetailKey[] = ['problem', 'solution', 'features', 'architecture', 'challenges', 'learnings']

const hasContent = (k: ProjectDetailKey, text: ProjectCopy) =>
  k === 'features' ? !!(text.features?.length || text.upcoming?.length) : !!text[k]

function SectionBody({ k, text }: { k: ProjectDetailKey; text: ProjectCopy }) {
  if (k === 'features') {
    return (
      <ul className={styles.features}>
        {text.features?.map((f) => (
          <li key={f}>{f}</li>
        ))}
        {text.upcoming?.map((f) => (
          <li key={f} className={styles.upcoming}>
            <span className={`mono ${styles.upcomingTag}`}>{text.upcomingLabel ?? ui.status.upcoming}</span>
            {f}
          </li>
        ))}
      </ul>
    )
  }
  return <p>{text[k]}</p>
}

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <NotFound />

  const project = projects[index]
  const text = content.projects[project.slug]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const links = [
    { href: project.repositoryUrl, label: ui.projects.repo },
    { href: project.demoUrl, label: ui.projects.demo },
  ].filter((l) => isValidHref(l.href))

  return (
    // key: al pasar de un proyecto a otro se remonta todo, así las animaciones de entrada se reinician
    <article key={project.slug} className={styles.page}>
      <title>{`${project.name} — ${ui.meta.title}`}</title>
      <meta name="description" content={text.summary ?? ui.meta.description} />

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
          <ProjectBadges project={project} text={text} />
          {text.summary ? <p className={styles.summary}>{text.summary}</p> : <Pending>{ui.projects.summaryPending}</Pending>}
          {text.note && (
            <p className={styles.note}>
              <span className="mono">{ui.projects.note}</span> {text.note}
            </p>
          )}
          {links.length > 0 && (
            <div className={styles.links}>
              {links.map((l) => (
                <a key={l.label} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </header>

      <div className="container">
        <ProjectMedia label={project.name} src={project.coverImage} ratio="21 / 9" />
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

        {SECTIONS.map((k) => {
          const filled = hasContent(k, text)
          if (!filled && !showPlaceholders) return null
          return (
            <section key={k} className={styles.row} aria-labelledby={`${k}-label`}>
              <h2 id={`${k}-label`} className={`mono ${styles.label}`}>
                {ui.projects.sections[k]}
              </h2>
              <Reveal className={styles.content}>
                {filled ? <SectionBody k={k} text={text} /> : <Pending>{ui.projects.sectionPending}</Pending>}
              </Reveal>
            </section>
          )
        })}

        {(project.gallery?.length || showPlaceholders) && (
          <section className={styles.row} aria-labelledby="gallery-label">
            <h2 id="gallery-label" className={`mono ${styles.label}`}>
              {ui.projects.gallery}
            </h2>
            <div className={styles.content}>
              {project.gallery?.length ? (
                <div className={styles.gallery}>
                  {project.gallery.map((img) => (
                    <ProjectMedia key={img.src} label={project.name} src={img.src} alt={img.alt} />
                  ))}
                </div>
              ) : (
                <Pending>{ui.projects.galleryPending}</Pending>
              )}
            </div>
          </section>
        )}
      </div>

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
