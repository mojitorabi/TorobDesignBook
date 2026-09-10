/* BuyBoxButton — Torob Design System
 * The PDP commerce target: price, seller and action in one tap.
 * Docs: /components/buy-box-button.html
 * Replaces: Button/Buy box/Ad, Button/Buy box/Cheapest, Button/Offline Buy box/Ad
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function BuyBoxButton({ variant = 'primary', price, meta, ad, ...rest }) {
  return (
    <button className={clsx('t-buybox', variant !== 'primary' && `t-buybox--${variant}`)} {...rest}>
      <span className="t-buybox__body">
        <span className="t-buybox__price">{price}</span>
        <span className="t-buybox__meta">
          {meta}{ad && <> · <span className="t-badge t-badge--ad">آگهی</span></>}
        </span>
      </span>
    </button>
  );
}
