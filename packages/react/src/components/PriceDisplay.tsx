/* PriceDisplay — Torob Design System
 * پرخوانده‌ترین عنصر در هر سطح ترب.
 * Docs: /components/price-display.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

const FA = '۰۱۲۳۴۵۶۷۸۹';
export const toFa = n => String(n).replace(/\d/g, d => FA[+d]);
export const formatPrice = n => toFa(n.toLocaleString('en-US')).replace(/,/g, '٬');

export function PriceDisplay({ value, size = 'md', from, was, unavailable, unit = 'تومان' }) {
  if (unavailable) return <span className="t-price t-price--unavailable"><span className="t-price__value">ناموجود</span></span>;
  return (
    <span className={clsx('t-price', size !== 'md' && `t-price--${size}`)}>
      {from && <span className="t-price__from">از</span>}
      <span className="t-price__value">{formatPrice(value)}</span>
      <span className="t-price__unit">{unit}</span>
      {was != null && <s className="t-price__was">{formatPrice(was)}</s>}
    </span>
  );
}
