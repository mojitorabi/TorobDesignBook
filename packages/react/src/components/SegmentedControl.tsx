/* SegmentedControl — Torob Design System
 * Switches the content below between mutually exclusive views.
 * Docs: /components/segmented-control.html
 * Replaces: Segmented Controls/Selected, Segmented Controls/Not-selected, Segmented Controls/Icon Selected, Segmented Controls/Icon Not-selected, Segmented Controls/Light/Large/Selected
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function SegmentedControl({ options, value, onChange, size = 'md', block, label }) {
  return (
    <div className={clsx('t-segmented', size === 'lg' && 't-segmented--lg', block && 't-segmented--block')}
         role="tablist" aria-label={label}>
      {options.map(o => (
        <button key={o.value} className="t-segmented__item" role="tab"
                aria-selected={o.value === value} onClick={() => onChange(o.value)}>
          {o.icon}{o.label}{o.count != null && <span className="t-chip__count">{toFa(o.count)}</span>}
        </button>
      ))}
    </div>
  );
}
