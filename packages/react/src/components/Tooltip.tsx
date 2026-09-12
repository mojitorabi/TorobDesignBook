/* Tooltip — Torob Design System
 * نام یک کنترل فقط‌آیکون، روی دسکتاپ. نه بیشتر.
 * Docs: /components/tooltip.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Tooltip({ label, children, delay = 250 }) {
  const [open, setOpen] = useState(false);
  const timer = useRef();
  const id = useId();
  const show = () => { timer.current = setTimeout(() => setOpen(true), delay); };
  const hide = () => { clearTimeout(timer.current); setOpen(false); };
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && hide();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
          onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={hide}>
      {cloneElement(children, { 'aria-describedby': id })}
      <span className="t-tooltip" role="tooltip" id={id} data-open={open || undefined}>{label}</span>
    </span>
  );
}
