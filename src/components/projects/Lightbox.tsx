import { useEffect, useRef, type WheelEvent } from 'react'
import { content } from '../../content'
import styles from './Lightbox.module.css'

const { projects: ui, nav } = content.ui

interface Props {
  images: { src: string; alt?: string }[]
  /** imagen abierta; null = cerrado */
  index: number | null
  onChange: (index: number | null) => void
}

/**
 * Visor de imágenes a pantalla completa. <dialog> modal: foco atrapado, Esc y fondo inerte nativos.
 * Flechas del teclado, rueda o botones para recorrer; clic fuera de la imagen para cerrar.
 */
export function Lightbox({ images, index, onChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const many = images.length > 1

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    if (!open) return
    // la página de atrás no scrollea mientras el visor está abierto
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [open])

  const go = (step: number) => index !== null && onChange((index + step + images.length) % images.length)

  // rueda: abajo/derecha = siguiente, arriba/izquierda = anterior; un paso por gesto
  const lastWheel = useRef(0)
  const onWheel = (e: WheelEvent) => {
    if (!many) return
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    const now = performance.now()
    // ponytail: freno fijo de 450 ms para que un trackpad no saltee imágenes; ajustar si se siente lento
    if (Math.abs(delta) < 10 || now - lastWheel.current < 450) return
    lastWheel.current = now
    go(delta > 0 ? 1 : -1)
  }
  const image = index !== null ? images[index] : undefined

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={image?.alt ?? ui.gallery}
      onClose={() => onChange(null)}
      // clic en el fondo (el propio dialog), no en la imagen ni en los botones
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
      onWheel={onWheel}
      onKeyDown={(e) => {
        if (!many) return
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      {image && (
        <figure className={styles.figure}>
          <img className={styles.image} src={image.src} alt={image.alt ?? ''} />
          {(image.alt || many) && (
            <figcaption className={`mono ${styles.caption}`}>
              {image.alt}
              {many && (
                <span className={styles.count}>
                  {' '}
                  {index! + 1} / {images.length}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      <button className={`mono ${styles.close}`} onClick={() => onChange(null)}>
        {nav.close} <span aria-hidden="true">✕</span>
      </button>
      {many && (
        <>
          <button className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label={ui.prev}>
            ←
          </button>
          <button className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label={ui.next}>
            →
          </button>
        </>
      )}
    </dialog>
  )
}
