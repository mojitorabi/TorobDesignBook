/* MapPin — Torob Design System
 * نشانگرهای نقشه: فروشگاه، قیمت، انتخاب‌شده، خوشه، نقطه و «شما اینجا هستید».
 * Docs: /components/map-pin.html
 * Replaces: POI/Selected + Price, POI/Not-selected + Price, POI/Normal with name, POI/Selected, POI/Normal, POI/Dot, POI/Cluster, Pin
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function MapPin({ variant = 'poi', selected = false, price, count, label, icon }) {
  if (variant === 'dot') return <span className="t-pin t-pin--dot" role="img" aria-label={label} />;
  if (variant === 'me') return <span className="t-pin t-pin--me" role="img" aria-label="موقعیت شما" />;
  if (variant === 'cluster') return <button className="t-cluster" aria-label={`${toFa(count)} فروشگاه در این ناحیه`}>{toFa(count)}</button>;
  if (variant === 'hero') return (
    <button className="t-pin t-pin--hero" aria-pressed="true" aria-label={label}>
      <span className="t-pin__drop"><span className="t-pin__face">{icon}</span></span>
      <span className="t-pin__spot" /><span className="t-pin__label">{label}</span>
    </button>
  );
  if (variant === 'price') return (
    <button className="t-pin t-pin--price" aria-pressed={selected} aria-label={`${label}، ${price} تومان`}>
      <span className="t-pin__pill">{icon}{price}</span>
      <span className="t-pin__tail" /><span className="t-pin__spot" /><span className="t-pin__label">{label}</span>
    </button>
  );
  return <button className="t-pin" aria-label={label}>{icon}</button>;
}
