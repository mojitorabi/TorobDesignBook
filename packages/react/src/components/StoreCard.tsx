/* StoreCard — Torob Design System
 * یک فروشگاه نزدیک: نام، نشانی و فاصله، وضعیت باز/بسته، ریل محصول و دو کنش آبی.
 * Docs: /components/store-card.html
 * Replaces: Store-Card/VLP/With product/Light, Store-Card/VLP/With product/Dark, Store-Card/VLP/Without product/Light, Store-Card/VLP/Without product/Dark, Store-Card/PDP/No product/Light, Store-Card/PDP/No product/Dark, Store-Card/With product, Store-Card/No product
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function StoreCard({ store, context = 'list', products = [], kalabarg = false }) {
  return (
    <article className={clsx('t-store-card', context === 'pdp' && 't-store-card--pdp')}>
      <div className="t-store-card__head">
        <div className="t-store-card__info">
          <a className="t-store-card__name" href={store.href}>{store.name}<ChevronLeft16 className="t-icon t-icon--directional" /></a>
          {context === 'pdp' && <PriceDisplay value={store.price} />}
          <span className="t-store-card__address">{store.address} . <span className="t-store-card__distance">{store.distance}</span></span>
        </div>
        <img className="t-store-card__photo" src={store.photo} alt="" />
      </div>
      <div className="t-store-card__chips">
        <Button size="xs" variant="filter"><StatusDot closed={!store.open} />{store.open ? 'باز' : 'بسته'} تا {store.until}</Button>
        <Button size="xs" variant="filter"><Information16 className="t-icon" />توضیحات</Button>
        <Button size="xs" variant="filter"><Report16 className="t-icon" />گزارش</Button>
        {kalabarg && <Badge tone="kalabarg">کالابرگ</Badge>}
      </div>
      {products.length > 0 && <div className="t-store-card__rail">{products.map(p => <ProductCard key={p.id} product={p} size="sm" />)}</div>}
      <div className="t-store-card__actions">
        <Button family="blue" icon={<SendAltFilled20 />}>ارتباط با فروشگاه</Button>
        <Button family="blue-ghost" icon={<LocationFilled20 />}>مسیریابی</Button>
      </div>
    </article>
  );
}
