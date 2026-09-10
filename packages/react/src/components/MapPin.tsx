/* MapPin — Torob Design System
 * یک فروشگاه روی نقشه. چهار تراکم، یک کامپوننت.
 * Docs: /components/map-pin.html
 * Replaces: POI/Selected + Price, POI/Selected, POI/Normal, POI/Dot, POI/Cluster, Pin, Open Pin/Light, Close Pin/Light, Open Pin/Dark, Close Pin/Dark
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function MapPin({ variant = 'pin', selected, price, count, label }) {
  if (variant === 'dot') return <span className="t-pin--dot" role="img" aria-label={label} />;
  if (variant === 'cluster') return <button className="t-cluster" aria-label={`${toFa(count)} فروشگاه در این ناحیه`}>{toFa(count)}</button>;
  return (
    <button className="t-pin" aria-pressed={!!selected} aria-label={label}>
      <span className="t-pin__body">{price ?? <PinIcon />}</span>
      <span className="t-pin__tail" />
    </button>
  );
}
