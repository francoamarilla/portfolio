import { content } from '../../content'
import type { ProjectCopy, ProjectData } from '../../types/content'
import { Pending } from '../Pending'
import styles from './ProjectMeta.module.css'

const { status: statusCopy, projects: copy } = content.ui

/** Estado, trabajo en equipo e integraciones pendientes. No renderiza nada si no hay datos. */
export function ProjectBadges({ project, text }: { project: ProjectData; text: ProjectCopy }) {
  const badges = [
    project.status && { label: statusCopy[project.status], tone: project.status },
    project.team && { label: statusCopy.team, tone: 'neutral' },
    text.upcoming?.length && { label: text.upcomingLabel ?? statusCopy.upcoming, tone: 'pending' },
  ].filter(Boolean) as { label: string; tone: string }[]

  if (!badges.length) return null
  return (
    <ul className={styles.badges}>
      {badges.map((b) => (
        <li key={b.label} className={`mono ${styles.badge}`} data-tone={b.tone}>
          {b.label}
        </li>
      ))}
    </ul>
  )
}

export function ProjectTags({ technologies }: { technologies?: string[] }) {
  if (!technologies?.length) return <Pending>{copy.techPending}</Pending>
  return (
    <ul className={styles.tags}>
      {technologies.map((t) => (
        <li key={t} className="mono">
          {t}
        </li>
      ))}
    </ul>
  )
}
