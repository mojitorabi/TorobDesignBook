/* FilterChip — Torob Design System
 * One filter facet. Toggles on, or opens a sheet for its options.
 * Docs: /components/filter-chip.html
 * Replaces: Filter/Cell/Cell, Filter/Cell/Icon, Filter/Cell/Icon+Chevron, city filter, official seller
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function FilterChip({ active, count, opens, icon, children, ...rest }) {
  return (
    <button className="t-chip"
            {...(opens ? { 'aria-expanded': !!active, 'aria-haspopup': 'dialog' } : { 'aria-pressed': !!active })}
            {...rest}>
      {icon}{children}
      {count != null && <span className="t-chip__count">{toFa(count)}</span>}
      {opens && <ChevronDown className="t-icon t-icon--sm" />}
    </button>
  );
}
