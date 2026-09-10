/* ListItem — Torob Design System
 * یک ردیف در فهرست. ردیف آخر کامپوننت جدا نیست.
 * Docs: /components/list-item.html
 * Replaces: List / Item, List / last item
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function ListItem({ as: As = 'button', lead, trail, title, subtitle, ...rest }) {
  return (
    <As className="t-list-item" {...rest}>
      {lead && <span className="t-list-item__lead">{lead}</span>}
      <span className="t-list-item__body">
        <span className="t-list-item__title">{title}</span>
        {subtitle && <span className="t-list-item__sub">{subtitle}</span>}
      </span>
      {trail && <span className="t-list-item__trail">{trail}</span>}
    </As>
  );
}
