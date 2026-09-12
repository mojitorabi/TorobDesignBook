/* Tag — Torob Design System
 * برچسب کوچک روی داده. خواندنی، نه کلیک‌کردنی — مگر ضربدر داشته باشد.
 * Docs: /components/tag.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Tag({ label, onRemove }) {
  return (
    <span className="t-tag">
      {label}
      {onRemove && (
        <button className="t-tag__remove" aria-label={`حذف ${label}`} onClick={onRemove}>
          <CloseIcon className="t-icon" width={12} height={12} />
        </button>
      )}
    </span>
  );
}
