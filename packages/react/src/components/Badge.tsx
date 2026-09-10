/* Badge — Torob Design System
 * A short status or attribute marker.
 * Docs: /components/badge.html
 * Replaces: Badge/Card, Badge/Card-Picture, Badge/Card/Guarantee, Badge/Card/Normal, Badge/Card/Open, Badge / Ad on Buy Box
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Badge({ tone = 'neutral', size = 'md', onImage, dot, children }) {
  return (
    <span className={clsx('t-badge', tone !== 'neutral' && `t-badge--${tone}`,
                          size === 'lg' && 't-badge--lg', onImage && 't-badge--on-image')}>
      {dot && <span className="t-badge__dot" />}
      {children}
    </span>
  );
}
