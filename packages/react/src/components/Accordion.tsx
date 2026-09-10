/* Accordion — Torob Design System
 * افشای تدریجی برای محتوای بلند و قابل مرور.
 * Docs: /components/accordion.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Accordion({ items, multiple, defaultOpen = [] }) {
  const [open, setOpen] = useState(new Set(defaultOpen));
  const toggle = id => setOpen(prev => {
    const next = new Set(multiple ? prev : []);
    prev.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  return (
    <div className="t-accordion">
      {items.map(it => (
        <div className="t-accordion__item" key={it.id}>
          <button className="t-accordion__trigger" aria-expanded={open.has(it.id)}
                  aria-controls={`panel-${it.id}`} id={`trigger-${it.id}`}
                  onClick={() => toggle(it.id)}>
            <span className="t-accordion__label">{it.label}</span>
            <ChevronDown className="t-accordion__chevron" />
          </button>
          <div className="t-accordion__panel" id={`panel-${it.id}`}
               aria-labelledby={`trigger-${it.id}`} hidden={!open.has(it.id)}>
            {it.content}
          </div>
        </div>
      ))}
    </div>
  );
}
