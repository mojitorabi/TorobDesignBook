/* Textarea — Torob Design System
 * متن چندخطی: نقد کاربر، توضیح محصول، پاسخ فروشنده.
 * Docs: /components/textarea.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Textarea({ value, onChange, rows = 5, maxLength, invalid, hint, label, id }) {
  const near = maxLength && value.length > maxLength * 0.8;
  return (
    <div className="t-field">
      <label className="t-field__label" htmlFor={id}>{label}</label>
      <div className="t-input t-input--textarea" data-invalid={invalid || undefined}>
        <textarea className="t-input__el" id={id} rows={rows} value={value}
                  maxLength={maxLength} aria-invalid={invalid || undefined}
                  onChange={e => onChange(e.target.value)} />
      </div>
      {hint && <span className="t-field__hint">{hint}</span>}
      {near && <span className="t-field__hint" aria-live="polite">{toFa(maxLength - value.length)} کاراکتر مانده</span>}
    </div>
  );
}
