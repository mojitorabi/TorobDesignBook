/* Switch — Torob Design System
 * کلید روشن/خاموش. بلافاصله اثر می‌گذارد، بدون دکمهٔ ذخیره.
 * Docs: /components/switch.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Switch({ checked, onChange, label, disabled }) {
  return (
    <label className="t-switch">
      <input type="checkbox" checked={checked} disabled={disabled}
             onChange={e => onChange(e.target.checked)} />
      <span className="t-switch__track"><span className="t-switch__thumb" /></span>
      <span className="t-body-md">{label}</span>
    </label>
  );
}
