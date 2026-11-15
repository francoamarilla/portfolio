import type { ReactNode } from 'react'
import { showPlaceholders } from '../config'
import { content } from '../content'

/** Marcador visible de contenido faltante. Se oculta entero con showPlaceholders = false. */
export function Pending({ children, block = false }: { children: ReactNode; block?: boolean }) {
  if (!showPlaceholders) return null
  const Tag = block ? 'div' : 'span'
  return (
    <Tag className="pending">
      <span className="pending__tag mono">{content.ui.placeholders.tag}</span>
      {children}
    </Tag>
  )
}
