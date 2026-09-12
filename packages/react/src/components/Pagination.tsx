/* Pagination — Torob Design System
 * صفحه‌بندی برای پنل فروشنده، جایی که باید بشود به ردیف ۴۰۰ برگشت.
 * Docs: /components/pagination.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Pagination({ page, pageCount, onChange, siblings = 1 }) {
  const pages = pageRange(page, pageCount, siblings); // [1, '…', 4, 5, 6, '…', 20]
  return (
    <nav className="t-pagination" aria-label="صفحه‌بندی">
      <button className="t-pagination__page" aria-label="صفحهٔ قبلی"
              disabled={page === 1} onClick={() => onChange(page - 1)}><ChevronStart /></button>
      {pages.map((p, i) => p === '…'
        ? <span key={`gap${i}`} className="t-pagination__page" aria-hidden="true">…</span>
        : <button key={p} className="t-pagination__page" aria-label={`صفحهٔ ${toFa(p)}`}
                  aria-current={p === page ? 'page' : undefined}
                  onClick={() => onChange(p)}>{toFa(p)}</button>)}
      <button className="t-pagination__page" aria-label="صفحهٔ بعدی"
              disabled={page === pageCount} onClick={() => onChange(page + 1)}><ChevronEnd /></button>
    </nav>
  );
}
