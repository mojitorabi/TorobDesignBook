/* StoreCard — Torob Design System
 * A nearby store, with or without its product rail.
 * Docs: /components/store-card.html
 * Replaces: Store-Card/VLP/With product/Light, Store-Card/VLP/With product/Dark, Store-Card/VLP/Without product/Light, Store-Card/VLP/Without product/Dark, Store-Card/PDP/No product/Light, Store-Card/PDP/No product/Dark, Store-Card/PDP/Online, Store-Card/PDP/Offline, Store-Card/PDP/Online-Offline, Store-Card/With product, Store-Card/No product
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function StoreCard({ store, products = [], context = 'vlp', glass }) {
  return (
    <article className={clsx('t-store-card', glass && 't-store-card--glass')}>
      <div className="t-store-card__head">
        <div className="t-store-card__logo"><img src={store.logo} alt="" /></div>
        <div className="t-store-card__body">
          <h3 className="t-store-card__name">{store.name}</h3>
          <div className="t-store-card__meta">
            <span className="t-store-card__distance"><PinIcon />{formatDistance(store.distance)}</span>
            {store.rating && <Rating value={store.rating} />}
            <OpeningHours hours={store.hours} />
          </div>
        </div>
      </div>
      {store.badges?.length > 0 && (
        <div className="t-store-card__badges">{store.badges.map(b => <Badge key={b} tone={BADGE_TONE[b]}>{BADGE_LABEL[b]}</Badge>)}</div>
      )}
      {context === 'vlp' && (products.length
        ? <div className="t-store-card__rail" role="region" aria-label={`محصولات ${store.name}`}>
            {products.map(p => <ProductCard key={p.id} product={p} size="sm" />)}
          </div>
        : <EmptyState inline title="محصولی اضافه نشده"
                      desc="برای اطلاع از محصولات فروشگاه با آن تماس بگیرید."
                      action={<Button variant="primary" size="md">تماس تلفنی</Button>} />)}
      <div className="t-store-card__actions">
        <Button variant="primary" size="md">تماس تلفنی</Button>
        <Button variant="outline" size="md">مسیریابی</Button>
      </div>
    </article>
  );
}
