/* Avatar — Torob Design System
 * لوگوی فروشگاه یا حرف اول نامش، وقتی لوگویی نیست.
 * Docs: /components/avatar.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Avatar({ src, name, size = 'md' }) {
  const initial = meaningfulInitial(name); // drops فروشگاه، گالری، نمایندگی
  return (
    <span className={clsx('t-avatar', size !== 'md' && `t-avatar--${size}`)}>
      {src ? <img src={src} alt="" /> : initial}
    </span>
  );
}
