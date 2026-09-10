/* RangeSlider — Torob Design System
 * Two-handle range. Torob's most-used filter had no control.
 * Docs: /components/range-slider.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function RangeSlider({ min, max, value, onChange, step = 1, format = String }) {
  const pct = v => ((v - min) / (max - min)) * 100;
  return (
    <div className="t-range">
      <div className="t-range__values"><span>{format(value[0])}</span><span>{format(value[1])}</span></div>
      <div className="t-range__track">
        <div className="t-range__fill" style={{ insetInlineStart: pct(value[0]) + '%', inlineSize: (pct(value[1]) - pct(value[0])) + '%' }} />
        {value.map((v, i) => (
          <div key={i} className="t-range__thumb" role="slider" tabIndex={0}
               style={{ insetInlineStart: pct(v) + '%' }}
               aria-valuemin={min} aria-valuemax={max} aria-valuenow={v} aria-valuetext={format(v)}
               onKeyDown={e => handleKey(e, i, v, { min, max, step, value, onChange })} />
        ))}
      </div>
    </div>
  );
}
