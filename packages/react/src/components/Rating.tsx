/* Rating — Torob Design System
 * امتیاز فروشنده، با تعدادی که پشتش است.
 * Docs: /components/rating.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Rating({ value, count, size = 'md' }) {
  const px = size === 'sm' ? 12 : 14;
  return (
    <span className="t-rating" role="img"
          aria-label={`${toFa(value)} از ۵${count ? `، بر پایهٔ ${toFa(count)} نظر` : ''}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <StarIcon key={i} className="t-icon" width={px} height={px} aria-hidden="true"
                  style={{ opacity: i <= Math.round(value) ? 1 : 0.3 }} />
      ))}
      <span className="t-rating__value">{toFa(value.toFixed(1))}</span>
      {count != null && <span className="t-rating__count">({toFa(count)} نظر)</span>}
    </span>
  );
}
