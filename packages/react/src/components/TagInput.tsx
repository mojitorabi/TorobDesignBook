/* TagInput — Torob Design System
 * چند مقدار در یک فیلد: کلیدواژه‌های محصول، برچسب سفارش.
 * Docs: /components/tag-input.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function TagInput({ value, onChange, max, placeholder }) {
  const [draft, setDraft] = useState('');
  const commit = () => {
    const t = draft.trim();
    if (t && !value.includes(t) && (!max || value.length < max)) onChange([...value, t]);
    setDraft('');
  };
  return (
    <div className="t-taginput">
      {value.map(t => (
        <Tag key={t} label={t} onRemove={() => onChange(value.filter(x => x !== t))} />
      ))}
      <input value={draft} placeholder={value.length ? undefined : placeholder}
             onChange={e => setDraft(e.target.value)}
             onKeyDown={e => {
               if (e.key === 'Enter' || e.key === '،') { e.preventDefault(); commit(); }
               if (e.key === 'Backspace' && !draft) onChange(value.slice(0, -1));
             }} />
    </div>
  );
}
