import { Link } from 'react-router'
import { content } from '../content'

const { notFound, meta } = content.ui

export function NotFound() {
  return (
    <section className="container" style={{ minHeight: '80svh', display: 'grid', alignContent: 'center', gap: '1.5rem' }}>
      <title>{`${notFound.title} — ${meta.title}`}</title>
      <meta name="robots" content="noindex" />
      <p className="mono" style={{ color: 'var(--accent)' }}>
        404
      </p>
      <h1 style={{ fontSize: 'var(--fs-h2)' }}>{notFound.title}</h1>
      <p style={{ color: 'var(--muted)' }}>{notFound.body}</p>
      <Link className="btn" to="/" style={{ justifySelf: 'start' }}>
        {notFound.cta}
      </Link>
    </section>
  )
}
