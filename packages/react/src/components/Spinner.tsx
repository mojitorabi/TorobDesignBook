/* Spinner — Torob Design System
 * انتظار نامعین برای محتوای با شکل نامعلوم.
 * Docs: /components/spinner.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Spinner({ size = 'md', label = 'در حال بارگذاری' }) {
  return (
    <span role="status">
      <span className={clsx('t-spinner', size !== 'md' && `t-spinner--${size}`)} />
      <span className="t-visually-hidden">{label}</span>
    </span>
  );
}
