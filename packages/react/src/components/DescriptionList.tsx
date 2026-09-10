/* DescriptionList — Torob Design System
 * جفت‌های برچسب و مقدار برای صفحهٔ جزئیات.
 * Docs: /components/description-list.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function DescriptionList({ items }) {
  return (
    <dl className="t-dl">
      {items.map(i => (
        <Fragment key={i.label}>
          <dt>{i.label}</dt>
          <dd className={clsx(i.numeric && 't-num-tabular')}>{i.value ?? '—'}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
