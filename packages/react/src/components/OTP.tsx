/* OTP — Torob Design System
 * کد پیامکی. اولین کنترلی که هر کاربر ایرانی لمس می‌کند.
 * Docs: /components/otp.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function OTP({ length = 5, value, onChange, onComplete, invalid }) {
  const refs = useRef([]);
  const set = (i, ch) => {
    const next = (value.padEnd(length).slice(0, i) + ch + value.slice(i + 1)).trim();
    onChange(next);
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
    if (next.length === length) onComplete?.(next);
  };
  return (
    <fieldset className="t-fieldset">
      <legend className="t-field__label">{`کد ${toFa(length)}‌رقمی پیامک‌شده`}</legend>
      <div className={clsx('t-otp', invalid && 't-otp--error')}>
        {Array.from({ length }, (_, i) => (
          <input key={i} ref={el => (refs.current[i] = el)} className="t-otp__slot"
                 inputMode="numeric" maxLength={1} value={value[i] ?? ''}
                 data-filled={value[i] ? true : undefined}
                 aria-label={`رقم ${toFa(i + 1)} از ${toFa(length)}`}
                 autoComplete={i === 0 ? 'one-time-code' : undefined}
                 onChange={e => set(i, e.target.value.replace(/\D/g, ''))}
                 onKeyDown={e => {
                   if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
                 }}
                 onPaste={e => {
                   e.preventDefault();
                   const code = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
                   onChange(code);
                   if (code.length === length) onComplete?.(code);
                 }} />
        ))}
      </div>
    </fieldset>
  );
}
