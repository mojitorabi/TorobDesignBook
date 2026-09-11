/* SplitButton — Torob Design System
 * یک کنش اصلی، و کنش‌های وابسته‌اش پشت یک شورون.
 * Docs: /components/split-button.html
 * Replaces: Button / Red /split, Button / Blue /split
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function SplitButton({ variant = 'red', children, onAction, menuLabel, items = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="t-btn-split">
      <button type="button" className={`t-btn t-btn--${variant}`} onClick={onAction}>
        {children}
      </button>
      <button
        type="button"
        className={`t-btn t-btn--${variant} t-btn-split__more`}
        aria-label={menuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <Icon name="chevron--down" size={20} />
      </button>
      {open && <Menu items={items} onClose={() => setOpen(false)} />}
    </div>
  );
}
