/* BottomSheet — Torob Design System
 * Torob's dominant overlay. Filters, sort, store detail, variant picker.
 * Docs: /components/bottom-sheet.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function BottomSheet({ open, onClose, title, adaptive = true, children, footer }) {
  const ref = useRef(null);
  useFocusTrap(ref, open);
  useLockBodyScroll(open);
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <>
      <div className="t-scrim" onClick={onClose} />
      <div className={clsx('t-sheet', adaptive && 't-sheet--adaptive')} ref={ref}
           role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="t-sheet__grip" />
        <div className="t-sheet__head">
          <span className="t-sheet__title" id="sheet-title">{title}</span>
          <IconButton size="sm" label="بستن" onClick={onClose}><CloseIcon /></IconButton>
        </div>
        <div className="t-sheet__body">{children}</div>
        {footer && <div className="t-sheet__foot">{footer}</div>}
      </div>
    </>, document.body);
}
