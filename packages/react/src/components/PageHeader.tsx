/* PageHeader — Torob Design System
 * Sticky glass header: back, title, actions.
 * Docs: /components/page-header.html
 * Replaces: Header/Profile
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function PageHeader({ title, subtitle, onBack, actions }) {
  return (
    <header className="t-page-header">
      {onBack && <IconButton size="sm" label="بازگشت" onClick={onBack}><ChevronStart className="t-icon--directional" /></IconButton>}
      <div className="t-page-header__title">
        {title}
        {subtitle && <div className="t-page-header__sub">{subtitle}</div>}
      </div>
      {actions}
    </header>
  );
}
