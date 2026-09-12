/* StatusDot — Torob Design System
 * نقطهٔ باز/بسته کنار ساعت کاری فروشگاه.
 * Docs: /components/status-dot.html
 * Replaces: Open Pin/Light, Open Pin/Dark, Close Pin/Light, Close Pin/Dark
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export const StatusDot = ({ closed = false, label }) =>
  <span className={clsx('t-status-dot', closed && 't-status-dot--closed')} {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })} />;
