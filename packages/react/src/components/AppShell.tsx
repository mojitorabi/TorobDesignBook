/* AppShell — Torob Design System
 * اسکلت پنل فروشنده: نوار کناری، نوار بالا، محتوا.
 * Docs: /components/app-shell.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function AppShell({ nav, current, collapsed, children, topbar, brand }) {
  return (
    <div className="t-shell" data-nav={collapsed ? 'collapsed' : undefined}>
      <div className="t-shell__brand">{brand}</div>
      <div className="t-shell__top">{topbar}</div>
      <nav className="t-shell__nav" aria-label="ناوبری پنل">
        {nav.map(g => (
          <Fragment key={g.title}>
            {g.title && <div className="t-navgroup__title">{g.title}</div>}
            {g.items.map(i => (
              <a key={i.href} href={i.href} className="t-navitem"
                 aria-label={collapsed ? i.label : undefined}
                 aria-current={i.href === current ? 'page' : undefined}>
                {i.icon}{!collapsed && i.label}
                {i.count != null && !collapsed && <span className="t-navitem__count">{toFa(i.count)}</span>}
              </a>
            ))}
          </Fragment>
        ))}
      </nav>
      <main className="t-shell__main" id="main">{children}</main>
    </div>
  );
}
