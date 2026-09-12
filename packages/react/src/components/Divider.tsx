/* Divider — Torob Design System
 * یک خط مویی. اول ببینید فاصله کافی نیست.
 * Docs: /components/divider.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Divider({ orientation = 'horizontal' }) {
  return orientation === 'vertical'
    ? <span className="t-divider t-divider--vertical" role="separator" aria-orientation="vertical" />
    : <hr className="t-divider" />;
}
