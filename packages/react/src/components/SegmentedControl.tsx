/* SegmentedControl — Torob Design System
 * دو یا سه نمای هم‌وزن در یک ریل شیشه‌ای؛ مثل «فروشگاه‌ها ⇄ محصولات».
 * Docs: /components/segmented-control.html
 * Replaces: Switch/Left, Switch/Right
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function SegmentedControl({ options, value, onChange, label, block = false }) {
  const move = (e, i) => {
    const d = { ArrowLeft: 1, ArrowRight: -1 }[e.key];   /* RTL: left is "next" */
    if (!d) return;
    e.preventDefault();
    const n = options[(i + d + options.length) % options.length];
    onChange(n.value);
  };
  return (
    <div className={clsx('t-segmented', block && 't-segmented--block')} role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button key={o.value} className="t-segmented__item" role="radio"
                aria-checked={o.value === value} tabIndex={o.value === value ? 0 : -1}
                onClick={() => onChange(o.value)} onKeyDown={e => move(e, i)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
