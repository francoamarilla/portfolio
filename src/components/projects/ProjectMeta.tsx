import styles from './ProjectMeta.module.css'

export function ProjectTags({ technologies }: { technologies: string[] }) {
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
