/* EmptyState — Torob Design System
 * A valid state with nothing in it. Always names the way out.
 * Docs: /components/empty-state.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function EmptyState({ variant = 'empty', inline, art, title, desc, action, code }) {
  return (
    <div className={clsx('t-empty', variant === 'error' && 't-empty--error', inline && 't-empty--inline')}>
      {art && <div className="t-empty__art" aria-hidden="true">{art}</div>}
      <div className="t-empty__title">{title}</div>
      {desc && <div className="t-empty__desc">{desc}</div>}
      {action && <div className="t-empty__actions">{action}</div>}
      {code && <div className="t-empty__code">{code}</div>}
    </div>
  );
}
