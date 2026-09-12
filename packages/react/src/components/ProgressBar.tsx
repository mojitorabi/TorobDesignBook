/* ProgressBar — Torob Design System
 * کاری که پیشرفتش را می‌شود شمرد. اگر نمی‌شود، اسپینر است.
 * Docs: /components/progress-bar.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function ProgressBar({ value, label }) {
  const indeterminate = value == null;
  return (
    <div className={clsx('t-progress', indeterminate && 't-progress--indeterminate')}
         role="progressbar" aria-label={label}
         aria-valuenow={indeterminate ? undefined : value}
         aria-valuemin={0} aria-valuemax={100}>
      <div className="t-progress__bar" style={indeterminate ? undefined : { inlineSize: `${value}%` }} />
    </div>
  );
}
