/* Modal — Torob Design System
 * برای گرفتن یک تصمیم کار را قطع می‌کند. کم استفاده کنید.
 * Docs: /components/modal.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Modal({ open, onClose, title, children, footer }) {
  const ref = useRef(null);
  useFocusTrap(ref, open);
  useLockBodyScroll(open);
  if (!open) return null;
  return createPortal(
    <>
      <div className="t-scrim" onClick={onClose} />
      <div className="t-modal" ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="t-modal__head">
          <span className="t-modal__title" id="modal-title">{title}</span>
        </div>
        <div className="t-modal__body">{children}</div>
        {footer && <div className="t-modal__foot">{footer}</div>}
      </div>
    </>, document.body);
}
