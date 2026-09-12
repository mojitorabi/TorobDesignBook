/* Radio — Torob Design System
 * یکی از چند گزینه، وقتی همه باید هم‌زمان دیده شوند.
 * Docs: /components/radio.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function RadioGroup({ name, value, onChange, options, legend }) {
  return (
    <fieldset className="t-fieldset">
      <legend className="t-field__label">{legend}</legend>
      {options.map(o => (
        <label key={o.value} className="t-check t-check--radio">
          <input type="radio" name={name} value={o.value}
                 checked={value === o.value} onChange={() => onChange(o.value)} />
          <span className="t-check__box" />
          <span className="t-body-md">{o.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
