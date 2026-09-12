/* ProductCard — Torob Design System
 * یک محصول در شبکه یا ریل: عکس، عنوان دوخطی، قیمت «از…» و تعداد فروشگاه.
 * Docs: /components/product-card.html
 * Replaces: Product Card/Normal, Product Card/Small, Product Card/Small Empty, Product Card/More/Light, Product Card/More/Dark, Product Card/Empty/Light, Product Card/Empty/Dark, Product Card
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function ProductCard({ product, size = 'md', variant = 'default', tags = [] }) {
  if (variant === 'empty') return <div className="t-product-card t-product-card--empty" aria-hidden="true"><span className="t-product-card__cell"><ImageCopy20 className="t-icon" /></span></div>;
  if (variant === 'more') return (
    <a className="t-product-card t-product-card--more" href={product.href} aria-label={`${toFa(product.moreCount)} محصول دیگر`}>
      <span className="t-product-card__grid">
        {product.preview.slice(0, 3).map(src => <span key={src} className="t-product-card__cell"><img src={src} alt="" /></span>)}
        <span className="t-product-card__cell"><bdi dir="ltr">+{toFa(product.moreCount)}</bdi></span>
      </span>
    </a>
  );
  const sm = size === 'sm';
  return (
    <a className={clsx('t-product-card', sm && 't-product-card--sm')} href={product.href}>
      <ProductThumb src={product.image} alt={product.title} size={size} badges={product.ad && <Badge tone="ad">آگهی</Badge>} />
      <span className="t-product-card__title">{product.title}</span>
      {!sm && tags.length > 0 && <span className="t-product-card__tags">{tags.map(t => <span key={t} className="t-product-card__tag">{t}</span>)}</span>}
      {sm ? <PriceDisplay value={product.price} size="sm" /> : (
        <span className="t-product-card__buy">
          <PriceDisplay value={product.priceFrom} from />
          <span className="t-product-card__foot">
            <span className="t-product-card__meta">در {toFa(product.sellerCount)} فروشگاه</span>
            <span className="t-product-card__actions">
              <button aria-label="خبرم کن"><Notification16 className="t-icon" /></button>
              <button aria-label="علاقه‌مندی" aria-pressed={!!product.saved}><Favorite16 className="t-icon" /></button>
            </span>
          </span>
        </span>
      )}
    </a>
  );
}
