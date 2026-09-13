/* Checkbox — Torob Design System
 * چندانتخابی درون یک فرم. با دکمهٔ ذخیره تأیید می‌شود.
 * Docs: /components/checkbox.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Checkbox({ variant = 'checkbox', checked, onChange, label, ...rest }) {
  return (
    <label className={clsx('t-checkbox', variant === 'radio' && 't-checkbox--radio')}>
      <input type={variant} checked={checked} onChange={e => onChange(e.target.checked)} {...rest} />
      <span className="t-checkbox__box">{variant === 'checkbox' && <CheckMark className="t-checkbox__mark" />}</span>
      <span className="t-body-md">{label}</span>
    </label>
  );
}
