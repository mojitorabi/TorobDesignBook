/* Toggle — Torob Design System
 * یک بولی. بلافاصله اثر می‌گذارد — بدون دکمهٔ ذخیره.
 * Docs: /components/toggle.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label className="t-toggle">
      <input type="checkbox" checked={checked} disabled={disabled}
             onChange={e => onChange(e.target.checked)} />
      <span className="t-toggle__track"><span className="t-toggle__thumb" /></span>
      <span className="t-body-md">{label}</span>
    </label>
  );
}
