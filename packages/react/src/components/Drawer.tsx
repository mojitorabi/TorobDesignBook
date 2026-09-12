/* Drawer — Torob Design System
 * پنل کناری تمام‌ارتفاع: ناوبری پنل روی گوشی، فیلترهای دسکتاپ.
 * Docs: /components/drawer.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Drawer({ open, onClose, modal = true, label, children }) {
  const ref = useRef(null);
  useFocusTrap(ref, open && modal);
  useEscape(onClose, open);
  if (!open) return null;
  return createPortal(
    <>
      {modal && <div className="t-scrim" onClick={onClose} />}
      <aside className="t-drawer" ref={ref} aria-label={label}
             role={modal ? 'dialog' : undefined} aria-modal={modal || undefined}>
        {children}
      </aside>
    </>, document.body);
}
