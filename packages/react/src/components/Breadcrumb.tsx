/* Breadcrumb — Torob Design System
 * این صفحه کجای درخت دسته‌بندی است.
 * Docs: /components/breadcrumb.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Breadcrumb({ items }) {
  return (
    <nav className="t-breadcrumb" aria-label="مسیر">
      <ol style={{ display: 'contents' }}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.href} style={{ display: 'contents' }}>
              {last ? <span className="t-breadcrumb__item" aria-current="page">{it.label}</span>
                    : <><a className="t-breadcrumb__item" href={it.href}>{it.label}</a>
                        <span className="t-breadcrumb__sep" aria-hidden="true">›</span></>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
