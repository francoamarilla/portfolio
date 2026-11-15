import { showPlaceholders } from '../config'
import { content } from '../content'
import { socialLinks } from '../data/social-links'
import { isValidHref } from '../lib/url'
import type { SocialId } from '../types/content'

const { social } = content.ui

export function SocialLinks({ only, className = '' }: { only?: SocialId[]; className?: string }) {
  const links = only ? socialLinks.filter((l) => only.includes(l.id)) : socialLinks
  return (
    <ul className={`social ${className}`}>
      {links.map(({ id, url }) =>
        isValidHref(url) ? (
          <li key={id}>
            <a className="social__link" href={url} {...(url.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
              {social[id]} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ) : (
          showPlaceholders && (
            <li key={id} className="social__pending">
              {social[id]} <span className="mono">— {social.pending}</span>
            </li>
          )
        ),
      )}
    </ul>
  )
}
