/* Switch — Torob Design System
 * A two-position selector. Both positions are named destinations.
 * Docs: /components/switch.html
 * Replaces: Switch/Left, Switch/Right
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Switch({ options, value, onChange, label }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current, active = el?.querySelector('[aria-checked="true"]');
    if (!el || !active) return;
    /* inset-inline-start is measured from the RIGHT edge in RTL, but offsetLeft
       is always from the left. Measure the logical distance, or the thumb lands
       under the wrong option in RTL. */
    const cs = getComputedStyle(el);
    const rtl = cs.direction === 'rtl';
    const p = el.getBoundingClientRect(), a = active.getBoundingClientRect();
    const border = parseFloat(rtl ? cs.borderInlineEndWidth : cs.borderInlineStartWidth) || 0;
    const thumb = el.querySelector('.t-switch__thumb');
    thumb.style.insetInlineStart = ((rtl ? p.right - a.right : a.left - p.left) - border) + 'px';
    thumb.style.inlineSize = active.offsetWidth + 'px';
  }, [value]);
  return (
    <div className="t-switch" role="radiogroup" aria-label={label} ref={ref}>
      <span className="t-switch__thumb" />
      {options.map(o => (
        <button key={o.value} className="t-switch__option" role="radio"
                aria-checked={o.value === value} onClick={() => onChange(o.value)}>
          {o.icon}{o.label}
        </button>
      ))}
    </div>
  );
}
