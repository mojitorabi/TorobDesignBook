/* ProductThumb — Torob Design System
 * بلوک تصویر محصول، با جای نشان و جای کنش.
 * Docs: /components/product-thumb.html
 * Replaces: Product Pic/Normal, Product Pic/Small
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function ProductThumb({ src, alt, size = 'md', badges, action }) {
  return (
    <div className={clsx('t-thumb', size !== 'md' && `t-thumb--${size}`)}>
      {src && <img src={src} alt={alt} loading="lazy" />}
      {badges && <div className="t-thumb__badges">{badges}</div>}
      {action && <div className="t-thumb__action">{action}</div>}
    </div>
  );
}
