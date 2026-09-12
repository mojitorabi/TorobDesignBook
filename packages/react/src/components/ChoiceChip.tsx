/* ChoiceChip — Torob Design System
 * یک دسته از میان چند دسته. ردیفی از قرص‌های شیشه‌ای که افقی اسکرول می‌شود.
 * Docs: /components/choice-chip.html
 * Replaces: Segmented Controls/Not-selected, Segmented Controls/Selected, Segmented Controls/Icon Not-selected, Segmented Controls/Icon Selected, Tab/Selected
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function ChoiceChips({ options, value, onChange, onClear, label }) {
  return (
    <div className="t-chip-group" role="group" aria-label={label}>
      {options.map(o => {
        const on = o.value === value;
        return (
          <span key={o.value} className="t-choice">
            <button className="t-choice__action" aria-pressed={on} onClick={() => onChange(o.value)}>
              {o.icon}{o.label}
            </button>
            {on && onClear && (
              <button className="t-choice__clear" aria-label={`حذف ${o.label}`}
                      onClick={onClear}><Close16 className="t-icon" /></button>
            )}
          </span>
        );
      })}
    </div>
  );
}
