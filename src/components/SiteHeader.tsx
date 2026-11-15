import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { sectionIds, type SectionId } from '../config'
import { content } from '../content'
import { profile } from '../data/profile'
import styles from './SiteHeader.module.css'

const { nav, placeholders } = content.ui

export function SiteHeader() {
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)
  const menu = useRef<HTMLDialogElement>(null)
  const { pathname } = useLocation()

  // se oculta al bajar y reaparece al subir
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 240)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // sección activa: la que cruza la mitad del viewport
  useEffect(() => {
    if (pathname !== '/') return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId)),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])

  const current = pathname === '/' ? active : null
  const openMenu = () => menu.current?.showModal()
  const closeMenu = () => menu.current?.close()

  const links = (inMenu = false) =>
    sectionIds.map((id) => (
      <li key={id}>
        <Link
          to={{ pathname: '/', hash: id }}
          className={styles.link}
          aria-current={current === id ? 'true' : undefined}
          onClick={inMenu ? closeMenu : undefined}
        >
          {nav[id]}
        </Link>
      </li>
    ))

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ''}`}>
      <a className="skip-link" href="#main">
        {nav.skip}
      </a>
      <div className={`container ${styles.bar}`}>
        <Link to={{ pathname: '/', hash: 'home' }} className={styles.brand}>
          {profile.name ?? placeholders.brand}
        </Link>
        <nav aria-label={nav.label} className={styles.desktop}>
          <ul>{links()}</ul>
        </nav>
        <button className={`mono ${styles.menuBtn}`} onClick={openMenu} aria-haspopup="dialog">
          {nav.menu}
        </button>
      </div>

      {/* <dialog> modal: foco atrapado y Esc nativos */}
      <dialog ref={menu} className={styles.menu} aria-label={nav.label}>
        <button className={`mono ${styles.menuBtn}`} onClick={closeMenu}>
          {nav.close}
        </button>
        <nav aria-label={nav.label}>
          <ul>{links(true)}</ul>
        </nav>
      </dialog>
    </header>
  )
}
