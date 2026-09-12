/* OfferCard — Torob Design System
 * پیشنهاد یک فروشنده در صفحهٔ محصول: فروشنده، ضمانت، مزایا، قیمت و دکمهٔ خرید.
 * Docs: /components/offer-card.html
 * Replaces: Store-Card/PDP/Online, Store-Card/PDP/Offline, Store-Card/PDP/Online-Offline
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function OfferCard({ offer }) {
  const buy = offer.type === 'online'
    ? <Button family="red" icon={<ShoppingCart20 />}>برو به سایت</Button>
    : <SplitButton family={offer.type === 'offline' ? 'blue' : 'red'} icon={<ShoppingCart20 />}
                   label={offer.type === 'offline' ? 'ارتباط با فروشگاه' : 'برو به سایت'} />;
  return (
    <article className="t-offer">
      <div className="t-offer__top">
        <div className="t-offer__head">
          <span className="t-offer__seller"><GuaranteeMark size={24} /><a className="t-offer__name" href={offer.store.href}>{offer.store.name}<ChevronLeft16 className="t-icon t-icon--directional" /></a></span>
          {offer.type === 'both' ? <RatingPill {...offer.rating} /> : <PriceDisplay value={offer.price} size="lg" />}
        </div>
        <p className="t-offer__note">{offer.warranty}</p>
        {offer.type !== 'online' && <p className="t-offer__address">{offer.store.address} . {offer.store.distance}</p>}
      </div>
      <div className="t-offer__row">
        <span className="t-offer__perks">{offer.perks}</span>
        <Button size="xs" variant="filter"><Report16 className="t-icon" />گزارش</Button>
      </div>
      <div className="t-offer__row">
        {buy}
        {offer.type === 'both' ? <PriceDisplay value={offer.price} size="xl" /> : <RatingPill {...offer.rating} />}
      </div>
    </article>
  );
}
