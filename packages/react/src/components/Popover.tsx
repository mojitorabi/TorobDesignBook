/* Popover — Torob Design System
 * یک لایهٔ کوچک که به عنصری چسبیده است. پایهٔ منو و انتخابگرها.
 * Docs: /components/popover.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Popover({ open, onOpenChange, trigger, align = 'start', children }) {
  const ref = useRef(null);
  const isPhone = useMediaQuery('(max-width: 767px)');
  useReturnFocus(ref, open);
  if (isPhone) return <BottomSheet open={open} onClose={() => onOpenChange(false)}>{children}</BottomSheet>;
  return (
    <span style={{ position: 'relative' }}>
      {cloneElement(trigger, { 'aria-expanded': open, 'aria-haspopup': 'true' })}
      {open && <div className="t-popover" ref={ref} data-align={align}>{children}</div>}
    </span>
  );
}
