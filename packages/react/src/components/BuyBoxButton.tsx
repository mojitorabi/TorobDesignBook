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
      className={clsx('t-buy-box', variant === 'blue' && 't-buy-box--offline', compact && 't-buy-box--compact')}
      aria-label={label}
      {...rest}
    >
      <span className="t-buy-box__body">
        <span className="t-buy-box__seller">{seller}</span>
        {!compact && <span className="t-buy-box__price">{price}</span>}
      </span>
      {ad && <span className="t-buy-box__ad">آگهی</span>}
    </button>
  );
}
