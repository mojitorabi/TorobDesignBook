/* Badge — Torob Design System
 * نشانگر کوتاه وضعیت یا ویژگی.
 * Docs: /components/badge.html
 * Replaces: Badge/Card, Badge/Card-Picture, Badge/Card/Guarantee, Badge/Card/Normal, Badge/Card/Open, Badge / Ad on Buy Box
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Badge({ tone = 'neutral', size = 'md', onImage, dot, icon, children }) {
  return (
    <span className={clsx('t-badge', tone !== 'neutral' && `t-badge--${tone}`,
                          size === 'sm' && 't-badge--sm', onImage && 't-badge--on-image')}>
      {dot && <span className="t-badge__dot" />}
      {icon}
      {tone === 'guarantee' ? <span className="t-badge__label">{children}</span> : children}
    </span>
  );
}
