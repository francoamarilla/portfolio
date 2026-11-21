import { content } from '../content'
import { profile } from '../data/profile'
import styles from './SiteFooter.module.css'

const { ui } = content
// año calculado al cargar el módulo: no cambia entre renders
const YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <p className="mono">
          © {YEAR} {profile.name}
        </p>
        <p className={`mono ${styles.role}`}>{profile.role}</p>
        {/* scroll suave vía CSS (scroll-behavior), respeta prefers-reduced-motion */}
        <button className={`mono ${styles.top}`} onClick={() => window.scrollTo({ top: 0 })}>
          {ui.footer.top} <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  )
}
