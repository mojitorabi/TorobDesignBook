/* StatCard — Torob Design System
 * یک عدد که فروشنده هر روز نگاهش می‌کند.
 * Docs: /components/stat-card.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function StatCard({ label, value, delta }) {
  const DIR = { up: 'افزایش', down: 'کاهش', flat: 'بدون تغییر' };
  return (
    <div className="t-stat">
      <div className="t-stat__label">{label}</div>
      <div className="t-stat__value">{value}</div>
      {delta && (
        <div className={clsx('t-stat__delta', `t-stat__delta--${delta.direction}`)}>
          <span aria-hidden="true">{delta.direction === 'up' ? '▲' : delta.direction === 'down' ? '▼' : ''}</span>
          <span className="t-visually-hidden">{DIR[delta.direction]}</span>
          {delta.value} {delta.period}
        </div>
      )}
    </div>
  );
}
