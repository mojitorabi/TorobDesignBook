/* Skeleton — Torob Design System
 * Holds the shape of content that has not arrived.
 * Docs: /components/skeleton.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Skeleton({ variant = 'block', width, height, className }) {
  return <div className={clsx('t-skeleton', variant !== 'block' && `t-skeleton--${variant}`, className)}
              style={{ inlineSize: width, blockSize: height }} aria-hidden="true" />;
}
