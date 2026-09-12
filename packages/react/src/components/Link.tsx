/* Link — Torob Design System
 * پیوند درون متن. خط زیرش، نه رنگش، آن را پیوند می‌کند.
 * Docs: /components/link.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Link({ href, variant = 'default', external, children }) {
  return (
    <a href={href}
       className={clsx('t-link', variant === 'quiet' && 't-link--quiet', external && 't-link--external')}
       target={external ? '_blank' : undefined}
       rel={external ? 'noopener' : undefined}>
      {children}
      {external && <span className="t-visually-hidden"> (در تب تازه)</span>}
    </a>
  );
}
