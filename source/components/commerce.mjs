const heart = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 14S1.5 9.9 1.5 5.8A3.3 3.3 0 0 1 8 4.3a3.3 3.3 0 0 1 6.5 1.5C14.5 9.9 8 14 8 14z"/></svg>`;
const star = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z"/></svg>`;
const pinIcon = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></svg>`;

export default [
{
  name: 'PriceDisplay', slug: 'price-display', group: 'Commerce', status: 'new',
  legacy: [],
  summary: 'The most-read element on any Torob surface.',
  description: [
    'Never formalised in the kit, yet the price treatment repeats identically across every product card, store card and buy box in the source. Extracting it is the difference between one price format and forty.',
    'Three rules make it work: <strong>tabular figures</strong> so a column of prices aligns; <strong>Persian numerals</strong> with the ٬ separator; and the currency word تومان always secondary, never competing with the number.',
  ],
  use: ['Tabular figures in any list — a ragged price column is unreadable at a glance.', 'Use <code>from</code> when several sellers offer the product: «از ۱۶٬۷۰۰٬۰۰۰ تومان».', 'Out of stock is grey, not red. Unavailability is not an error.'],
  avoid: ['Proportional figures in lists.', 'Making تومان the same size as the number.', 'Red for every price — red is discount and brand. Overloading it kills the discount signal.'],
  anatomy: [['Value', '16px ExtraBold, tabular, Persian numerals.'], ['Unit', '12px Medium secondary — تومان.'], ['From', '12px prefix for multi-seller ranges.'], ['Was', '12px struck through, secondary.']],
  props: [['value', 'number | string', '—', 'Formatted by the component.'], ['size', "'sm' | 'md' | 'lg'", "'md'", '14 / 16 / 20 px.'], ['from', 'boolean', 'false', 'Prefixes از.'], ['was', 'number', '—', 'Struck-through original.'], ['unavailable', 'boolean', 'false', 'Grey ناموجود treatment.']],
  a11y: ['The accessible name must be spoken-readable: "پانزده میلیون و هشتصد هزار تومان" is not required, but "۱۵٬۸۰۰٬۰۰۰ تومان" must be one continuous string, not split across elements that a screen reader reads separately.', 'Struck-through prices need <code>&lt;s&gt;</code> plus a visually hidden "قیمت قبلی".'],
  responsive: 'Size steps with context, not breakpoint: sm in a card, md in a list row, lg in a buy box.',
  specimens: [
    { label: 'Price treatments', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<span class="t-price t-price--lg"><span class="t-price__value">۱۵٬۸۰۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span>
<span class="t-price"><span class="t-price__from">از</span><span class="t-price__value">۱۶٬۷۰۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span>
<span class="t-price"><span class="t-price__value">۱۲٬۴۰۰٬۰۰۰</span><span class="t-price__unit">تومان</span><s class="t-price__was">۱۵٬۸۰۰٬۰۰۰</s></span>
<span class="t-price t-price--unavailable"><span class="t-price__value">ناموجود</span></span>` },
    { label: 'Tabular alignment in a list', note: 'Tabular figures are what make this column scannable. Switch the specimen to English to see the same rule hold for Latin numerals.', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div class="t-list" style="max-inline-size:320px;background:transparent">
  <div class="t-list-item"><span class="t-list-item__body t-body-md">تکنولایف</span><span class="t-price t-price--sm"><span class="t-price__value">۱۵٬۸۰۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span></div>
  <div class="t-list-item"><span class="t-list-item__body t-body-md">دیجی‌کالا</span><span class="t-price t-price--sm"><span class="t-price__value">۱۶٬۱۰۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span></div>
  <div class="t-list-item"><span class="t-list-item__body t-body-md">ادکلن شهر</span><span class="t-price t-price--sm"><span class="t-price__value">۹٬۹۹۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span></div>
</div>` },
  ],
  react: `const FA = '۰۱۲۳۴۵۶۷۸۹';
export const toFa = n => String(n).replace(/\\d/g, d => FA[+d]);
export const formatPrice = n => toFa(n.toLocaleString('en-US')).replace(/,/g, '٬');

export function PriceDisplay({ value, size = 'md', from, was, unavailable, unit = 'تومان' }) {
  if (unavailable) return <span className="t-price t-price--unavailable"><span className="t-price__value">ناموجود</span></span>;
  return (
    <span className={clsx('t-price', size !== 'md' && \`t-price--\${size}\`)}>
      {from && <span className="t-price__from">از</span>}
      <span className="t-price__value">{formatPrice(value)}</span>
      <span className="t-price__unit">{unit}</span>
      {was != null && <s className="t-price__was">{formatPrice(was)}</s>}
    </span>
  );
}`,
},
{
  name: 'Badge', slug: 'badge', group: 'Commerce', status: 'revised',
  legacy: ['Badge/Card', 'Badge/Card-Picture', 'Badge/Card/Guarantee', 'Badge/Card/Normal', 'Badge/Card/Open', 'Badge / Ad on Buy Box'],
  summary: 'A short status or attribute marker.',
  description: [
    'Six masters differing only in fill and placement. One component with <code>tone</code>, plus an <code>onImage</code> flag that swaps to glass so the badge stays legible over a product photograph, which is exactly what <code>Badge/Card-Picture</code> was.',
    'Note: the swatch names in the source misspell it "Gaurantee". Corrected to <code>guarantee</code> throughout.',
  ],
  use: ['One or two words. A badge is not a sentence.', 'The آگهی marker is a legal disclosure, always show it, always as real text.', 'At most two badges per card.'],
  avoid: ['Badges as buttons. If it is tappable, it is a Chip.', 'Colour alone to carry meaning — pair it with the word.', 'Stacking three or more; the card stops being scannable.'],
  anatomy: [['Container', '20px (24 at lg), radius 4, no border.'], ['Dot', 'Optional 6px leading indicator for live status.'], ['Label', '12px Bold, never wraps.']],
  props: [['tone', "'neutral' | 'positive' | 'caution' | 'critical' | 'info' | 'guarantee' | 'brand' | 'ad'", "'neutral'", ''], ['size', "'md' | 'lg'", "'md'", '20 / 24 px.'], ['onImage', 'boolean', 'false', 'Glass treatment for use over photography.'], ['dot', 'boolean', 'false', 'Live status indicator.']],
  a11y: ['Badges are content, not decoration, never <code>aria-hidden</code>.', 'A dot-only badge needs a visually hidden label.'],
  responsive: 'Never resizes. If the row is tight, drop badges by priority rather than shrinking them.',
  specimens: [
    { label: 'Tones', canvas: 'fog', html: `<span class="t-badge t-badge--guarantee">ضمانت ترب</span>
<span class="t-badge t-badge--positive"><span class="t-badge__dot"></span>باز الان</span>
<span class="t-badge t-badge--info">نمایندگی رسمی</span>
<span class="t-badge t-badge--ad">آگهی</span>
<span class="t-badge t-badge--brand">۱۵٪ تخفیف</span>
<span class="t-badge">کالابرگ</span>
<span class="t-badge t-badge--caution">موجودی کم</span>
<span class="t-badge t-badge--critical">ناموجود</span>` },
    { label: 'Over a photograph', canvas: 'photo', html: `<span class="t-badge t-badge--on-image t-badge--lg">ارسال فوری</span>
<span class="t-badge t-badge--on-image t-badge--lg">۳ فروشگاه</span>
<span class="t-badge t-badge--brand t-badge--lg">۱۵٪</span>` },
  ],
  react: `export function Badge({ tone = 'neutral', size = 'md', onImage, dot, children }) {
  return (
    <span className={clsx('t-badge', tone !== 'neutral' && \`t-badge--\${tone}\`,
                          size === 'lg' && 't-badge--lg', onImage && 't-badge--on-image')}>
      {dot && <span className="t-badge__dot" />}
      {children}
    </span>
  );
}`,
},
{
  name: 'ProductCard', slug: 'product-card', group: 'Commerce', status: 'revised',
  legacy: ['Product Card/Normal', 'Product Card/Small', 'Product Card/Small Empty', 'Product Card/More/Light', 'Product Card/More/Dark', 'Product Card/Empty/Light', 'Product Card/Empty/Dark', 'Product Card', 'Product Pic/Normal', 'Product Pic/Small'],
  summary: 'A product in a grid or rail.',
  description: [
    'Ten masters collapse to one component with three props. Light and dark were separate symbols — they are now the same component under a theme. <code>More</code> and <code>Empty</code> were separate masters too; they are states, not components.',
    '<code>Product Pic</code> is split out as <a href="./product-thumb.html">ProductThumb</a>, because the image block is reused on its own inside store cards.',
  ],
  use: ['Two-up on phones: that is Torob\'s density and it is correct.', 'Clamp the title to two lines. A third line pushes the price below the fold.', 'Show the seller count where it exists: «در ۷۹ فروشگاه».'],
  avoid: ['Truncating the price to fit the title.', 'More than two badges over the image.', 'Different card heights in one row — clamp so they align.'],
  anatomy: [['Thumb', '153:186 aspect, radius 12, with a badge slot and an action slot at opposite top corners.'], ['Title', '12px, clamped to two lines.'], ['Price', 'PriceDisplay, sm.'], ['Meta', 'Seller count or attribute tags.']],
  props: [['size', "'md' | 'sm'", "'md'", '153px / 96px intrinsic.'], ['state', "'default' | 'empty' | 'more'", "'default'", 'empty is a placeholder slot; more is a rail terminator.'], ['badges / action', 'ReactNode', '—', 'Over the image.']],
  a11y: ['The whole card is one link with one accessible name — not a link on the image plus another on the title.', 'The favourite button sits outside that link, or nesting makes it unreachable.', 'Images need real <code>alt</code>; decorative badges over them do not repeat it.'],
  responsive: '2-up under 480, 3-up to 768, 4-up to 1024, 5-up to 1280, then 6-up. The card widens; the aspect ratio never changes.',
  specimens: [
    { label: 'Product grid', canvas: 'plain', html: `<div class="t-grid-products" style="inline-size:100%;max-inline-size:520px">
  <a class="t-product-card" href="#">
    <div class="t-thumb"><div class="t-thumb__badges"><span class="t-badge t-badge--on-image">ارسال فوری</span></div><div class="t-thumb__action"><button class="t-icon-btn t-icon-btn--sm" aria-label="افزودن به علاقه‌مندی">${heart}</button></div></div>
    <div class="t-product-card__title t-clamp-2">کازاموراتی مفیستو ادکلن شرکتی ۱۰۰ میل</div>
    <span class="t-price t-price--sm"><span class="t-price__from">از</span><span class="t-price__value">۱۶٬۷۰۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span>
    <div class="t-product-card__meta">در ۷۹ فروشگاه</div>
  </a>
  <a class="t-product-card" href="#">
    <div class="t-thumb"><div class="t-thumb__badges"><span class="t-badge t-badge--brand t-badge--on-image">۱۵٪</span></div></div>
    <div class="t-product-card__title t-clamp-2">گوشی اپل iPhone 11 حافظه ۱۲۸ گیگابایت</div>
    <span class="t-price t-price--sm"><span class="t-price__value">۲۳٬۵۵۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span>
    <div class="t-product-card__meta">در ۱۲ فروشگاه</div>
  </a>
</div>` },
    { label: 'Loading and terminal states', canvas: 'plain', html: `<div class="t-grid-products" style="inline-size:100%;max-inline-size:520px">
  <div class="t-product-card"><div class="t-thumb t-skeleton"></div><div class="t-skeleton t-skeleton--text" style="inline-size:92%"></div><div class="t-skeleton t-skeleton--text" style="inline-size:64%"></div><div class="t-skeleton t-skeleton--text" style="inline-size:44%;block-size:1.3em"></div></div>
  <a class="t-product-card t-product-card--more" href="#">مشاهده همه<svg class="t-icon t-icon--sm t-icon--directional" viewBox="0 0 16 16" fill="currentColor"><path d="M10 3 5 8l5 5V3z"/></svg></a>
</div>` },
  ],
  react: `export function ProductCard({ product, size = 'md', state = 'default' }) {
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
}`,
},
{
  name: 'ProductThumb', slug: 'product-thumb', group: 'Commerce', status: 'revised',
  legacy: ['Product Pic/Normal', 'Product Pic/Small'],
  summary: 'The product image block, with its badge and action slots.',
  description: [
    'Split out of ProductCard because it is reused on its own — inside store-card rails, in the PDP gallery, and in search suggestions. Two masters in the source, duplicated four times between them.',
    'The aspect ratio is fixed at <strong>153:186</strong> (the source\'s Normal size) and never changes. Product photography arrives at every ratio imaginable; a fixed frame with <code>object-fit: cover</code> is what keeps a grid from looking ragged.',
  ],
  use: ['Always give a real <code>alt</code> — the product title.', 'Badges go at the leading top corner, the favourite action at the trailing top corner. They must never collide.', 'Show the subtle ground while the image loads; the frame reserves its own space so nothing shifts.'],
  avoid: ['Letting the image dictate the height. That is what makes a grid ragged.', 'More than two badges — the photograph disappears under them.', 'A favourite button nested inside the card\'s link. It becomes unreachable.'],
  anatomy: [['Frame', '153:186 aspect, radius 12, overflow hidden, subtle ground.'], ['Image', '<code>object-fit: cover</code>, fills the frame.'], ['Badge slot', 'Leading top, stacks downward.'], ['Action slot', 'Trailing top, single control.']],
  props: [['size', "'md' | 'sm' | 'square'", "'md'", '153:186 / 96:112 / 1:1.'], ['src / alt', 'string', '—', 'alt is required.'], ['badges / action', 'ReactNode', '—', 'Corner slots.']],
  a11y: ['<code>alt</code> carries the product title. A decorative badge over the image does not repeat it.', 'The action slot sits outside the card link, or nesting makes it unreachable by keyboard.'],
  responsive: 'The frame widens with its grid cell; the aspect ratio is constant at every breakpoint.',
  specimens: [
    { label: 'Sizes and slots', canvas: 'fog', html: `<div style="inline-size:153px"><div class="t-thumb"><div class="t-thumb__badges"><span class="t-badge t-badge--on-image">ارسال فوری</span></div><div class="t-thumb__action"><button class="t-icon-btn t-icon-btn--sm" aria-label="افزودن به علاقه‌مندی">${heart}</button></div></div></div>
<div style="inline-size:96px"><div class="t-thumb t-thumb--sm"></div></div>
<div style="inline-size:96px"><div class="t-thumb t-thumb--square"></div></div>
<div style="inline-size:153px"><div class="t-thumb t-skeleton"></div></div>` },
  ],
  react: `export function ProductThumb({ src, alt, size = 'md', badges, action }) {
  return (
    <div className={clsx('t-thumb', size !== 'md' && \`t-thumb--\${size}\`)}>
      {src && <img src={src} alt={alt} loading="lazy" />}
      {badges && <div className="t-thumb__badges">{badges}</div>}
      {action && <div className="t-thumb__action">{action}</div>}
    </div>
  );
}`,
},
{
  name: 'StoreCard', slug: 'store-card', group: 'Commerce', status: 'revised',
  legacy: ['Store-Card/VLP/With product/Light', 'Store-Card/VLP/With product/Dark', 'Store-Card/VLP/Without product/Light', 'Store-Card/VLP/Without product/Dark', 'Store-Card/PDP/No product/Light', 'Store-Card/PDP/No product/Dark', 'Store-Card/PDP/Online', 'Store-Card/PDP/Offline', 'Store-Card/PDP/Online-Offline', 'Store-Card/With product', 'Store-Card/No product'],
  summary: 'A nearby store, with or without its product rail.',
  description: [
    'The most-duplicated component in the source: eleven masters across two contexts (VLP and PDP), two themes and four content shapes. Theme collapses into the token layer, so what remains is one component with a <code>context</code> and an optional rail.',
    'The hairline rules above and below reproduce <code>Store Card - Light/Dark</code> exactly — two zero-blur shadows at ±0.5px, which is how the source drew a divider without a border.',
  ],
  use: ['Lead with distance — it is the reason the shopper is on this screen.', 'Show the product rail only when the store has products connected to Torob.', 'Keep تماس and مسیریابی as the two primary actions; everything else goes in an overflow.'],
  avoid: ['Hiding opening hours. باز / بسته changes whether the card is actionable at all.', 'A rail with fewer than three products — use the empty state instead.', 'Separate light and dark components. That is what tokens are for.'],
  anatomy: [['Head', 'Logo 48px, name, meta row with distance, rating, hours.'], ['Badges', 'Trust markers: ضمانت ترب, کالابرگ, پرداخت قسطی.'], ['Rail', 'Horizontal product scroll, snap-aligned, 96px cells.'], ['Actions', 'Hairline-separated footer, equal-width buttons.']],
  props: [['context', "'vlp' | 'pdp'", "'vlp'", 'VLP shows the rail; PDP shows the price for this product.'], ['glass', 'boolean', 'false', 'For use over the map.'], ['store', 'Store', '—', ''], ['products', 'Product[]', '[]', 'Empty renders the no-products state.']],
  a11y: ['The card is an <code>&lt;article&gt;</code> with an <code>&lt;h3&gt;</code> store name — not a giant link, because it contains its own actions.', 'The rail is a labelled scroll region reachable by keyboard.', 'Distance and hours are text, never icon-only.'],
  responsive: 'Full width to md. From lg it caps at 420px inside the split layout. The rail scroll-snaps at every size.',
  specimens: [
    { label: 'With product rail', canvas: 'plain', html: `<article class="t-store-card" style="max-inline-size:375px;border-radius:12px">
  <div class="t-store-card__head">
    <div class="t-store-card__logo"></div>
    <div class="t-store-card__body">
      <h3 class="t-store-card__name">ادکلن شهر</h3>
      <div class="t-store-card__meta">
        <span class="t-store-card__distance">${pinIcon}۱ کیلومتر</span>
        <span class="t-rating">${star}<span class="t-rating__value">۴٫۶</span></span>
        <span>باز تا ۲۲:۳۰</span>
      </div>
    </div>
  </div>
  <div class="t-store-card__badges">
    <span class="t-badge t-badge--guarantee">ضمانت ترب</span>
    <span class="t-badge">کالابرگ</span>
    <span class="t-badge">پرداخت قسطی</span>
  </div>
  <div class="t-store-card__rail">
    <div><div class="t-thumb t-thumb--sm"></div><div class="t-product-card__meta t-clamp-2" style="margin-block-start:4px">ادکلن کازاموراتی</div></div>
    <div><div class="t-thumb t-thumb--sm"></div><div class="t-product-card__meta t-clamp-2" style="margin-block-start:4px">اسپری بدن نویا</div></div>
    <div><div class="t-thumb t-thumb--sm"></div><div class="t-product-card__meta t-clamp-2" style="margin-block-start:4px">ادکلن دیور ساواج</div></div>
    <div><div class="t-thumb t-thumb--sm"></div><div class="t-product-card__meta t-clamp-2" style="margin-block-start:4px">عطر جیبی</div></div>
  </div>
  <div class="t-store-card__actions">
    <button class="t-btn t-btn--primary t-btn--md">تماس تلفنی</button>
    <button class="t-btn t-btn--outline t-btn--md">مسیریابی</button>
  </div>
</article>` },
    { label: 'Glass, over the map', canvas: 'map', stageClass: 'spec__stage--center', html: `<article class="t-store-card t-store-card--glass" style="max-inline-size:340px">
  <div class="t-store-card__head">
    <div class="t-store-card__logo"></div>
    <div class="t-store-card__body">
      <h3 class="t-store-card__name">مرکز خرید پالادیوم</h3>
      <div class="t-store-card__meta"><span class="t-store-card__distance">${pinIcon}۵۵۰ متر</span><span>۲۳ فروشگاه</span></div>
    </div>
  </div>
</article>` },
    { label: 'No products connected', canvas: 'plain', note: 'Taken verbatim from screen 4-4 in the source: a real state with a real recovery path, not a shrug.', html: `<article class="t-store-card" style="max-inline-size:375px;border-radius:12px">
  <div class="t-store-card__head">
    <div class="t-store-card__logo"></div>
    <div class="t-store-card__body">
      <h3 class="t-store-card__name">گالری رز</h3>
      <div class="t-store-card__meta"><span class="t-store-card__distance">${pinIcon}۵۵۰ متر</span><span>بسته — باز می‌شود ۹:۰۰</span></div>
    </div>
  </div>
  <div class="t-empty t-empty--inline">
    <div class="t-empty__art"><svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor"><path d="M26 8h-4V6a4 4 0 0 0-8 0v2h-4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-10-2a2 2 0 0 1 4 0v2h-4zm10 18H10V10h16z"/></svg></div>
    <div class="t-empty__title">محصولی اضافه نشده</div>
    <div class="t-empty__desc">برای اطلاع از محصولات فروشگاه با آن تماس بگیرید.</div>
    <div class="t-empty__actions"><button class="t-btn t-btn--primary t-btn--md">تماس تلفنی</button></div>
  </div>
</article>` },
  ],
  react: `export function StoreCard({ store, products = [], context = 'vlp', glass }) {
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
        ? <div className="t-store-card__rail" role="region" aria-label={\`محصولات \${store.name}\`}>
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
}`,
},
{
  name: 'MapPin', slug: 'map-pin', group: 'Commerce', status: 'revised',
  legacy: ['POI/Selected + Price', 'POI/Selected', 'POI/Normal', 'POI/Dot', 'POI/Cluster', 'Pin', 'Open Pin/Light', 'Close Pin/Light', 'Open Pin/Dark', 'Close Pin/Dark'],
  summary: 'A store on the map. Four densities, one component.',
  description: [
    'Ten masters. <code>POI</code> is an abbreviation nobody outside mapping uses, so it becomes <code>MapPin</code>. <code>Close Pin</code> is renamed <code>Closed</code> — an adjective, not a verb; "close pin" reads as an instruction.',
    'The four densities are a zoom ladder, not four components: <code>dot</code> when the map is zoomed out, <code>cluster</code> when pins would overlap, <code>pin</code> at street level, and <code>pin</code> with a price when the shopper is comparing.',
  ],
  use: ['Dots below street zoom; pins with prices only when comparing.', 'Cluster whenever pins would overlap — a pile of pins is worse than a number.', 'Selection grows the pin and switches it to blue.'],
  avoid: ['Prices on every pin at city zoom. The map becomes unreadable.', 'Brand red for the selected state — red is the resting pin.', 'Pins smaller than 32px. They cannot be tapped.'],
  anatomy: [['Body', '32px pill, brand fill, elevation-2.'], ['Tail', '6px triangle that inherits the body colour.'], ['Dot', '8px, secondary.'], ['Cluster', '48px circle, opaque, hairline border, tabular count.']],
  props: [['variant', "'pin' | 'dot' | 'cluster'", "'pin'", ''], ['selected', 'boolean', 'false', 'Scales 1.12 and switches to accent.'], ['price / count', 'string | number', '—', '']],
  a11y: ['Each pin is a button with an accessible name that includes the store and price.', 'The map needs a list equivalent — a map alone is not accessible. That is what the Switch component is for.'],
  responsive: 'Identical at every breakpoint. Density is driven by zoom level, never by viewport.',
  specimens: [
    { label: 'Zoom ladder', canvas: 'map', stageClass: 'spec__stage--center', html: `<div data-pin-group style="display:flex;gap:26px;align-items:center">
  <button class="t-pin" aria-pressed="false" aria-label="ادکلن شهر، ۱۵٬۸۰۰٬۰۰۰ تومان"><span class="t-pin__body">۱۵٫۸ م‌ت</span><span class="t-pin__tail"></span></button>
  <button class="t-pin" aria-pressed="true" aria-label="عطر سرای نیک، ۶٬۲۰۰٬۰۰۰ تومان"><span class="t-pin__body">۶٫۲ م‌ت</span><span class="t-pin__tail"></span></button>
  <button class="t-pin" aria-pressed="false" aria-label="گالری رز"><span class="t-pin__body">${pinIcon}</span><span class="t-pin__tail"></span></button>
  <span class="t-pin--dot" role="img" aria-label="فروشگاه"></span>
  <button class="t-cluster" aria-label="۲۳ فروشگاه در این ناحیه">۲۳</button>
</div>`, note: 'Pins are live — click to change selection.' },
  ],
  react: `export function MapPin({ variant = 'pin', selected, price, count, label }) {
  if (variant === 'dot') return <span className="t-pin--dot" role="img" aria-label={label} />;
  if (variant === 'cluster') return <button className="t-cluster" aria-label={\`\${toFa(count)} فروشگاه در این ناحیه\`}>{toFa(count)}</button>;
  return (
    <button className="t-pin" aria-pressed={!!selected} aria-label={label}>
      <span className="t-pin__body">{price ?? <PinIcon />}</span>
      <span className="t-pin__tail" />
    </button>
  );
}`,
},
{
  name: 'ListItem', slug: 'list-item', group: 'Commerce', status: 'revised',
  legacy: ['List / Item', 'List / last item'],
  summary: 'A row in a list. The last row is not a separate component.',
  description: ['<code>List / last item</code> existed only because Sketch cannot express <code>:last-child</code>. In code, the divider is removed by a selector — there is one component.'],
  use: ['Recent searches, settings, spec sheets, seller lists.', 'Use <code>--zebra</code> for dense spec tables: that is the <code>Spec / Desc / Even cell</code> style from the source.'],
  avoid: ['A separate last-row component.', 'Rows below 44px.', 'Two competing tap targets in one row without separating them visually.'],
  anatomy: [['Row', '56px minimum, 16px inline padding, hairline bottom.'], ['Lead / Trail', 'Icon or control slots at the two inline ends.'], ['Body', 'Title 14px + optional 12px secondary.']],
  props: [['lead / trail', 'ReactNode', '—', ''], ['title / subtitle', 'string', '—', ''], ['as', "'button' | 'a' | 'div'", "'button'", 'Non-interactive rows must not be buttons.']],
  a11y: ['A non-interactive row is a <code>&lt;div&gt;</code> or <code>&lt;li&gt;</code>, never a disabled button.', 'When the row and its trailing control both act, they are separate targets with separate names.'],
  responsive: '56px throughout. Above lg, dense lists may drop to 48px.',
  specimens: [
    { label: 'Recent searches', canvas: 'plain', html: `<div class="t-list" style="max-inline-size:340px">
  <button class="t-list-item"><span class="t-list-item__lead"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 8 8h-1.6A6.4 6.4 0 1 1 10 3.6zM9.2 6v4.6l3.6 2.1.8-1.3-3-1.7V6z"/></svg></span><span class="t-list-item__body"><span class="t-list-item__title">ادکلن کازاموراتی</span></span><span class="t-list-item__trail"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg></span></button>
  <button class="t-list-item"><span class="t-list-item__lead"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 8 8h-1.6A6.4 6.4 0 1 1 10 3.6zM9.2 6v4.6l3.6 2.1.8-1.3-3-1.7V6z"/></svg></span><span class="t-list-item__body"><span class="t-list-item__title">گوشی اپل استوک</span></span><span class="t-list-item__trail"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg></span></button>
  <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">مرکز خرید پالادیوم</span><span class="t-list-item__sub">۲۳ فروشگاه · ۱٫۲ کیلومتر</span></span><span class="t-list-item__trail"><svg class="t-icon t-icon--sm t-icon--directional" viewBox="0 0 16 16" fill="currentColor"><path d="M10 3 5 8l5 5V3z"/></svg></span></button>
</div>` },
    { label: 'Spec table, zebra', canvas: 'plain', html: `<div class="t-list t-list--zebra" style="max-inline-size:340px">
  <div class="t-list-item"><span class="t-list-item__body t-body-md t-tone-secondary">سیستم عامل</span><span class="t-body-md-strong">iOS ۲۶</span></div>
  <div class="t-list-item"><span class="t-list-item__body t-body-md t-tone-secondary">ظرفیت باتری</span><span class="t-body-md-strong">۴۸۳۲ میلی‌آمپرساعت</span></div>
  <div class="t-list-item"><span class="t-list-item__body t-body-md t-tone-secondary">کیفیت دوربین اصلی</span><span class="t-body-md-strong">۴۸ مگاپیکسل</span></div>
</div>` },
  ],
  react: `export function ListItem({ as: As = 'button', lead, trail, title, subtitle, ...rest }) {
  return (
    <As className="t-list-item" {...rest}>
      {lead && <span className="t-list-item__lead">{lead}</span>}
      <span className="t-list-item__body">
        <span className="t-list-item__title">{title}</span>
        {subtitle && <span className="t-list-item__sub">{subtitle}</span>}
      </span>
      {trail && <span className="t-list-item__trail">{trail}</span>}
    </As>
  );
}`,
},
];
