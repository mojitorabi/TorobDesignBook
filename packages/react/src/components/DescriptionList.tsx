/* DescriptionList — Torob Design System
 * جفت‌های برچسب و مقدار برای صفحهٔ جزئیات.
 * Docs: /components/description-list.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function DescriptionList({ items }) {
  return (
    <dl className="t-description-list">
      {items.map(i => (
        <Fragment key={i.label}>
          <dt>{i.label}</dt>
          <dd className={clsx(i.numeric && 't-numerals-tabular')}>{i.value ?? '—'}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
