/* FilterBar — Torob Design System
 * ردیف افقی تراشه‌های فیلتر، بالای هر فهرست نتیجه.
 * Docs: /components/filter-bar.html
 * Replaces: Filter/Filter
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function FilterBar({ items, sticky = false, onChange }) {
  return (
    <div className={clsx('t-filter-bar', sticky && 't-filter-bar--sticky')}>
      {items.map(item =>
        item.type === 'divider'
          ? <span key={item.id} className="t-filter-bar__divider" aria-hidden="true" />
          : <FilterChip key={item.id} {...item} onChange={v => onChange(item.id, v)} />
      )}
    </div>
  );
}
