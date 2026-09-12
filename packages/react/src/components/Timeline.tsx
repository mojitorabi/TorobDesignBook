/* Timeline — Torob Design System
 * وضعیت سفارش: چه شد، کِی شد، حالا کجاست.
 * Docs: /components/timeline.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Timeline({ items }) {
  return (
    <ol className="t-timeline">
      {items.map((it, i) => (
        <li key={i} className="t-timeline__item" data-state={it.state}>
          <span className="t-timeline__dot">
            {it.state === 'done' ? <CheckIcon /> : toFa(i + 1)}
          </span>
          <span className="t-timeline__body">
            <span className="t-timeline__title">{it.title}</span>
            <span className="t-timeline__meta">
              <time dateTime={it.iso}>{it.time}</time>
              {it.state === 'current' && ' — در حال انجام'}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
