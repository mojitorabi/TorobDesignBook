/* BottomNav — Torob Design System
 * ناوبری سطح ریشه، لنگرانداخته جایی که شست هست.
 * Docs: /components/bottom-nav.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function BottomNav({ items, current, label = 'ناوبری اصلی' }) {
  return (
    <nav className="t-bottom-nav" aria-label={label}>
      {items.map(i => (
        <a key={i.href} href={i.href} className="t-bottom-nav__item"
           aria-current={i.href === current ? 'page' : undefined}>
          {i.icon}{i.label}
        </a>
      ))}
    </nav>
  );
}
