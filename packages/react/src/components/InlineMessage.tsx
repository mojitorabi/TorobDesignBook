/* InlineMessage — Torob Design System
 * یک خط زیر فیلد: راهنما، خطا یا تأیید — همان‌جا که مشکل است.
 * Docs: /components/inline-message.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function InlineMessage({ tone = 'neutral', children }) {
  return (
    <span className={clsx('t-inline-msg', tone !== 'neutral' && `t-inline-msg--${tone}`)}>
      {tone === 'critical' && <WarningIcon className="t-icon" width={12} height={12} aria-hidden="true" />}
      {tone === 'positive' && <CheckIcon className="t-icon" width={12} height={12} aria-hidden="true" />}
      {children}
    </span>
  );
}
