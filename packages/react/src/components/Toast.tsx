/* Toast — Torob Design System
 * تأیید می‌کند که چیزی اتفاق افتاد. هرگز مسدود نمی‌کند.
 * Docs: /components/toast.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const show = useCallback(t => {
    const id = crypto.randomUUID();
    setItems(x => [...x.slice(-2), { ...t, id }]);          // never more than three
    const ms = t.duration ?? (t.action ? 8000 : 4200);       // actions need reachable time
    if (ms) setTimeout(() => setItems(x => x.filter(i => i.id !== id)), ms);
  }, []);
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="t-toast-region" role="status" aria-live="polite">
        {items.map(t => (
          <div key={t.id} className={clsx('t-toast', t.tone && `t-toast--${t.tone}`)}
               role={t.tone === 'critical' ? 'alert' : undefined}>
            <div className="t-toast__body">
              <div className="t-toast__title">{t.title}</div>
              {t.desc && <div className="t-toast__desc">{t.desc}</div>}
            </div>
            {t.action && <button className="t-toast__action" onClick={t.action.onClick}>{t.action.label}</button>}
            <button className="t-toast__close" aria-label="بستن"
                    onClick={() => setItems(x => x.filter(i => i.id !== t.id))}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
