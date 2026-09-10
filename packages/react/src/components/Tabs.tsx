/* Tabs — Torob Design System
 * Switches sections within a page. Scales past five options.
 * Docs: /components/tabs.html
 * Replaces: Tab/Selected
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Tabs({ options, value, onChange, label }) {
  return (
    <div className="t-tabs" role="tablist" aria-label={label}>
      {options.map(o => (
        <button key={o.value} className="t-tab" role="tab" id={`tab-${o.value}`}
                aria-selected={o.value === value} aria-controls={`panel-${o.value}`}
                tabIndex={o.value === value ? 0 : -1} onClick={() => onChange(o.value)}>
          {o.label}{o.count != null && <span className="t-tab__count">{toFa(o.count)}</span>}
        </button>
      ))}
    </div>
  );
}
