/* DataTable — Torob Design System
 * ردیف‌های داده برای مرور، مرتب‌سازی و انتخاب گروهی.
 * Docs: /components/data-table.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function DataTable({ columns, rows, density = 'comfortable', freezeFirst, sort, onSort }) {
  return (
    <div className="t-table-wrap" tabIndex={0} role="region" aria-label="جدول داده">
      <table className={clsx('t-table', freezeFirst && 't-table--freeze', density === 'compact' && 't-table--compact')}>
        <thead>
          <tr>{columns.map(c => (
            <th key={c.key} scope="col" className={clsx(c.numeric && 't-num')}>
              {c.sortable
                ? <button className="t-table__sort" onClick={() => onSort(c.key)}
                          aria-sort={sort?.key === c.key ? sort.direction : 'none'}>
                    {c.label}<SortIcon />
                  </button>
                : c.label}
            </th>))}
          </tr>
        </thead>
        <tbody>{rows.map(r => (
          <tr key={r.id} aria-selected={r.selected || undefined}>
            {columns.map(c => <td key={c.key} className={clsx(c.numeric && 't-num')}>{c.render(r)}</td>)}
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}
