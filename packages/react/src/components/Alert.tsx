/* Alert — Torob Design System
 * Page-level status that stays until it is resolved.
 * Docs: /components/alert.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Alert({ tone = 'info', title, actions, onDismiss, children }) {
  return (
    <div className={clsx('t-alert', `t-alert--${tone}`)} role={tone === 'critical' ? 'alert' : 'status'}>
      <span className="t-alert__icon" aria-hidden="true">{TONE_ICON[tone]}</span>
      <div className="t-alert__body">
        {title && <div className="t-alert__title">{title}</div>}
        <div>{children}</div>
        {actions && <div className="t-alert__actions">{actions}</div>}
      </div>
      {onDismiss && <IconButton size="sm" label="بستن" onClick={onDismiss}><CloseIcon /></IconButton>}
    </div>
  );
}
