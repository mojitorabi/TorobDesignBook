/* Select — Torob Design System
 * یک انتخاب از فهرستی که ارزش باز کردن یک برگه را ندارد.
 * Docs: /components/select.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Select({ value, onChange, options, size = 'lg', invalid, ...rest }) {
  return (
    <div className="t-select">
      <div className={clsx('t-input', size !== 'lg' && `t-input--${size}`)}
           data-invalid={invalid || undefined}>
        <select className="t-input__el" value={value} aria-invalid={invalid || undefined}
                onChange={e => onChange(e.target.value)} {...rest}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <ChevronDown className="t-icon t-icon--sm t-select__chevron" aria-hidden="true" />
    </div>
  );
}
