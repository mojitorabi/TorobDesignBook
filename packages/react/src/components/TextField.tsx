/* TextField — Torob Design System
 * ورودی تک‌خطی با برچسب، راهنما و خطا.
 * Docs: /components/text-field.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function TextField({ label, hint, error, required, size = 'lg', id, ...rest }) {
  const uid = useId(), fid = id ?? uid, msgId = fid + '-msg';
  return (
    <div className="t-field">
      <label className="t-field__label" htmlFor={fid}>{label}{required && <span className="t-field__req">*</span>}</label>
      <div className={clsx('t-input', size !== 'lg' && `t-input--${size}`)} data-invalid={!!error || undefined}>
        <input className="t-input__el" id={fid} aria-invalid={!!error || undefined}
               aria-describedby={(error || hint) ? msgId : undefined} aria-required={required} {...rest} />
      </div>
      {error ? <span className="t-field__error" id={msgId}><WarningIcon />{error}</span>
             : hint && <span className="t-field__hint" id={msgId}>{hint}</span>}
    </div>
  );
}
