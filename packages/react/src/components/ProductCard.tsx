/* ProductCard — Torob Design System
 * A product in a grid or rail.
 * Docs: /components/product-card.html
 * Replaces: Product Card/Normal, Product Card/Small, Product Card/Small Empty, Product Card/More/Light, Product Card/More/Dark, Product Card/Empty/Light, Product Card/Empty/Dark, Product Card, Product Pic/Normal, Product Pic/Small
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function ProductCard({ product, size = 'md', state = 'default' }) {
  if (state === 'more') return <a className="t-product-card t-product-card--more" href={product.href}>مشاهده همه<ChevronStart /></a>;
  if (state === 'empty') return <div className="t-product-card t-product-card--empty" aria-hidden="true" />;
  return (
    <a className={clsx('t-product-card', size === 'sm' && 't-product-card--sm')} href={product.href}>
      <ProductThumb src={product.image} alt={product.title} size={size} badges={product.badges} />
      <div className="t-product-card__title t-clamp-2">{product.title}</div>
      <PriceDisplay value={product.priceFrom} from size="sm" />
      <div className="t-product-card__meta">در {toFa(product.sellerCount)} فروشگاه</div>
    </a>
  );
}
