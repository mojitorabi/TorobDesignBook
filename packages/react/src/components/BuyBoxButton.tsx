/* BuyBoxButton — Torob Design System
 * هدف خرید در صفحهٔ محصول. رنگ می‌گوید اینترنتی یا حضوری.
 * Docs: /components/buy-box-button.html
 * Replaces: Button/Buy box/Ad, Button/Buy box/Cheapest, Button/Offline Buy box/Ad, Badge / Ad on Buy Box
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function BuyBoxButton({ variant = 'red', compact, ad, seller, price, ...rest }) {
  const label = [price, seller, ad && 'آگهی'].filter(Boolean).join('، ');
  return (
    <button
      className={clsx('t-buybox', variant === 'blue' && 't-buybox--offline', compact && 't-buybox--compact')}
      aria-label={label}
      {...rest}
    >
      {ad && <span className="t-buybox__ad">آگهی</span>}
      <span className="t-buybox__body">
        <span className="t-buybox__seller">{seller}</span>
        {!compact && <span className="t-buybox__price">{price}</span>}
      </span>
    </button>
  );
}
