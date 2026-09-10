/* Skeleton — Torob Design System
 * شکل محتوایی را نگه می‌دارد که هنوز نرسیده.
 * Docs: /components/skeleton.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Skeleton({ variant = 'block', width, height, className }) {
  return <div className={clsx('t-skeleton', variant !== 'block' && `t-skeleton--${variant}`, className)}
              style={{ inlineSize: width, blockSize: height }} aria-hidden="true" />;
}
