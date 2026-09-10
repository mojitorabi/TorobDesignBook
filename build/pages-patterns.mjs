import { section, table, guidance, esc } from './site-lib.mjs';

const I = {
  back: `<svg class="t-icon t-icon--directional" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5 7 10l5 5V5z"/></svg>`,
  backSm: `<svg class="t-icon t-icon--sm t-icon--directional" viewBox="0 0 16 16" fill="currentColor"><path d="M10 3 5 8l5 5V3z"/></svg>`,
  close: `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg>`,
  search: `<svg class="t-input__icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
  pin: `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></svg>`,
  heart: `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 14S1.5 9.9 1.5 5.8A3.3 3.3 0 0 1 8 4.3a3.3 3.3 0 0 1 6.5 1.5C14.5 9.9 8 14 8 14z"/></svg>`,
  filter: `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v1.4H2zm2 4h8v1.4H4zm2 4h4v1.4H6z"/></svg>`,
  phone: `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a1.6 1.6 0 0 0-1.6 1.6C2.4 8.9 6.7 13.2 12 13.2A1.6 1.6 0 0 0 13.6 11.6V9.8a.8.8 0 0 0-.6-.8l-2.2-.4a.8.8 0 0 0-.8.3l-.6.9a7.7 7.7 0 0 1-3.3-3.3l.9-.6a.8.8 0 0 0 .3-.8l-.4-2.2a.8.8 0 0 0-.8-.6H4z"/></svg>`,
  route: `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M14 7 9 2v3H6a4 4 0 0 0 0 8h1v-1.6H6A2.4 2.4 0 0 1 6 6.6h3V9z"/></svg>`,
};

/* A phone frame with a scrollable body. */
const phone = (inner, note) => `<div class="spec" data-spec>
  <div class="spec__bar">
    <span class="spec__label">${esc(note ?? '375 × 640')}</span>
    <div class="spec__tools">
      <button class="site-tool" data-spec-locale data-locale="fa" aria-label="Switch this specimen between Persian and English" title="Language and direction">فارسی</button>
    </div>
  </div>
  <div class="spec__stage spec__stage--phone" dir="rtl" lang="fa">
    <div class="phone">${inner}</div>
  </div>
</div>`;

const storeCard = (name, dist, hours, badges, rail = true, actions = true) => `
<article class="t-store-card" style="border-radius:12px;margin-block-end:8px">
  <div class="t-store-card__head">
    <div class="t-store-card__logo"></div>
    <div class="t-store-card__body">
      <h3 class="t-store-card__name">${name}</h3>
      <div class="t-store-card__meta">
        <span class="t-store-card__distance">${I.pin}${dist}</span>
        <span>${hours}</span>
      </div>
    </div>
  </div>
  ${badges ? `<div class="t-store-card__badges">${badges}</div>` : ''}
  ${rail ? `<div class="t-store-card__rail">${[1, 2, 3, 4].map(() => `<div><div class="t-thumb t-thumb--sm"></div></div>`).join('')}</div>` : ''}
  ${actions ? `<div class="t-store-card__actions">
    <button class="t-btn t-btn--primary t-btn--md">${I.phone}تماس تلفنی</button>
    <button class="t-btn t-btn--outline t-btn--md">${I.route}مسیریابی</button>
  </div>` : ''}
</article>`;

const filterBar = `<div class="t-filter-bar">
  <button class="t-icon-btn t-icon-btn--sm t-filter-bar__lead" aria-label="همه فیلترها">${I.filter}</button>
  <button class="t-chip" aria-pressed="true">تهران</button>
  <button class="t-chip" aria-expanded="false" aria-haspopup="dialog">برند<span class="t-chip__count">۳</span></button>
  <button class="t-chip" aria-expanded="false" aria-haspopup="dialog">قیمت</button>
  <button class="t-chip" aria-pressed="true">ضمانت ترب</button>
  <button class="t-chip" aria-pressed="false">نمایندگی رسمی</button>
  <button class="t-chip" aria-pressed="false">باز الان</button>
</div>`;

const bottomNav = (current) => `<nav class="t-bottom-nav" aria-label="ناوبری اصلی">
  ${[['خانه', 'M10 2 2 9h2v9h5v-6h2v6h5V9h2z'], ['جستجو', 'M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z'], ['اطراف من', 'M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8.2A2.2 2.2 0 1 1 10 5.8a2.2 2.2 0 0 1 0 4.4z'], ['حساب من', 'M10 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3.5 17a6.5 6.5 0 0 1 13 0z']]
    .map(([l, d]) => `<button class="t-bottom-nav__item"${l === current ? ' aria-current="page"' : ''}><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="${d}"/></svg>${l}</button>`).join('')}
</nav>`;

export function patternsPages() {
  const P = {};
  const page = (slug, title, description, sections) => {
    const toc = [];
    const body = sections.map(([id, t, inner]) => {
      if (!id) return inner;
      toc.push({ id, label: t });
      return section(id, t, inner);
    }).join('');
    P[slug] = { title, description, eyebrow: 'Patterns', body, toc };
  };

  /* ── Nearby stores ── */
  page('patterns/nearby-stores', 'Nearby stores', 'The Torob Nearby home screen: map, list, and the switch between them.',
    [
      [null, null, `<div class="prose">
        <p>Rebuilt from screens 1 and 1-1 of the Sketch source, using nothing but system components. The whole screen is eight of them: <a href="../components/page-header.html">PageHeader</a>, <a href="../components/search-field.html">SearchField</a>, <a href="../components/switch.html">Switch</a>, <a href="../components/segmented-control.html">SegmentedControl</a>, <a href="../components/filter-chip.html">FilterChip</a>, <a href="../components/store-card.html">StoreCard</a>, <a href="../components/map-pin.html">MapPin</a> and <a href="../components/bottom-nav.html">BottomNav</a>.</p>
      </div>`],
      ['list', 'List view', `${phone(`
  <header class="t-page-header">
    <button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت">${I.back}</button>
    <div class="t-page-header__title">فروشگاه‌های اطراف<div class="t-page-header__sub">تهران، ۷۸ مورد</div></div>
    <button class="t-icon-btn t-icon-btn--sm" aria-label="موقعیت من"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10.8 1H9.2v2.1a7 7 0 0 0-6.1 6.1H1v1.6h2.1a7 7 0 0 0 6.1 6.1V19h1.6v-2.1a7 7 0 0 0 6.1-6.1H19V9.2h-2.1a7 7 0 0 0-6.1-6.1V1z"/></svg></button>
  </header>
  <div style="padding:12px 16px 0"><div class="t-search"><div class="t-input">${I.search}<input class="t-input__el" type="search" placeholder="جستجو در اطراف من"></div></div></div>
  <div style="padding:12px 16px 8px;display:flex;justify-content:center">
    <div class="t-segmented" role="tablist" aria-label="نمای اطراف">
      <button class="t-segmented__item" role="tab" aria-selected="true">فروشگاه‌ها<span class="t-chip__count">۴۳</span></button>
      <button class="t-segmented__item" role="tab" aria-selected="false">محصولات<span class="t-chip__count">۵۵</span></button>
    </div>
  </div>
  ${filterBar}
  <div class="phone__scroll" style="padding:12px 16px">
    ${storeCard('ادکلن شهر', '۱ کیلومتر', 'باز تا ۲۲:۳۰', '<span class="t-badge t-badge--guarantee">ضمانت ترب</span><span class="t-badge">کالابرگ</span>')}
    ${storeCard('عطر سرای نیک', '۱٫۴ کیلومتر', 'باز تا ۲۱:۰۰', '<span class="t-badge t-badge--positive"><span class="t-badge__dot"></span>باز الان</span>')}
    ${storeCard('گالری رز', '۵۵۰ متر', 'بسته — باز می‌شود ۹:۰۰', '', false)}
  </div>
  ${bottomNav('اطراف من')}`, 'Nearby stores — list')}
        <div class="prose"><p><strong>Micro-interactions here:</strong> filter chips toggle in place; the segmented control moves its selection; store cards lift 2px on hover with elevation-2; the product rail scroll-snaps. All of it is live in the frame above — try it.</p></div>`],
      ['map', 'Map view', `<div class="prose"><p>The same data, the other mode. Everything that floats over the map is glass, and there are exactly three glass layers: the switch, the pins' container, and the store card. That is the whole budget.</p></div>
        ${phone(`
  <div style="position:relative;flex:1;background-color:#EDF1F5;background-image:url('../assets/map-light.svg');background-size:900px auto;background-position:center">
    <div style="position:absolute;inset-block-start:12px;inset-inline:12px;display:flex;justify-content:center">
      <div class="t-switch" role="radiogroup" aria-label="نمای نمایش">
        <span class="t-switch__thumb"></span>
        <button class="t-switch__option" role="radio" aria-checked="false">فهرست</button>
        <button class="t-switch__option" role="radio" aria-checked="true">نقشه</button>
      </div>
    </div>
    <div data-pin-group style="position:absolute;inset-block-start:130px;inset-inline-start:40px"><button class="t-pin" aria-pressed="false" aria-label="ادکلن شهر، ۱۵٬۸۰۰٬۰۰۰ تومان"><span class="t-pin__body">۱۵٫۸ م‌ت</span><span class="t-pin__tail"></span></button></div>
    <div style="position:absolute;inset-block-start:186px;inset-inline-end:56px"><button class="t-pin" aria-pressed="true" aria-label="عطر سرای نیک، ۶٬۲۰۰٬۰۰۰ تومان"><span class="t-pin__body">۶٫۲ م‌ت</span><span class="t-pin__tail"></span></button></div>
    <div style="position:absolute;inset-block-start:96px;inset-inline-end:110px"><button class="t-cluster" aria-label="۲۳ فروشگاه در این ناحیه">۲۳</button></div>
    <div style="position:absolute;inset-block-end:12px;inset-inline:12px">
      <article class="t-store-card t-store-card--glass">
        <div class="t-store-card__head">
          <div class="t-store-card__logo"></div>
          <div class="t-store-card__body">
            <h3 class="t-store-card__name">عطر سرای نیک</h3>
            <div class="t-store-card__meta"><span class="t-store-card__distance">${I.pin}۱٫۴ کیلومتر</span><span>باز تا ۲۱:۰۰</span></div>
          </div>
        </div>
        <div class="t-store-card__actions">
          <button class="t-btn t-btn--primary t-btn--md">${I.phone}تماس</button>
          <button class="t-btn t-btn--outline t-btn--md">${I.route}مسیریابی</button>
        </div>
      </article>
    </div>
  </div>
  ${bottomNav('اطراف من')}`, 'Nearby stores — map')}
        <div class="prose"><p><strong>Try it:</strong> tap a pin. Selection moves, the pin scales 1.12 and switches from brand red to accent blue. Red stays the resting state — overloading it would kill the price signal.</p></div>`],
      ['rules', 'What this pattern fixes', guidance([
        'Distance leads every card — it is the reason the shopper is on this screen.',
        'Opening hours are visible before the tap. A closed store is a wasted journey.',
        'The map and the list carry identical data, so the Switch is a view change, not a filter.',
        'Applied filters stay visible as chips. Never collapse them into “۳ فیلتر”.',
      ], [
        'A map with no list equivalent. A map alone is not accessible.',
        'Prices on every pin at city zoom — the map becomes unreadable. Use dots, then clusters.',
        'More than three glass layers over the map.',
        'Hiding the bottom navigation on scroll. The destination set should be constant.',
      ])],
    ]);

  /* ── PDP ── */
  page('patterns/product-detail', 'Product detail', 'Price, sellers, variants, specs — the screen where the decision happens.',
    [
      [null, null, `<div class="prose"><p>From screens 3, 3-1 and 3-3. The buy box is the load-bearing element: it carries price, seller and action in one target, and the آگهی disclosure where it applies.</p></div>`],
      ['screen', 'The screen', `${phone(`
  <header class="t-page-header">
    <button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت">${I.back}</button>
    <div class="t-page-header__title" style="font-size:14px">گوشی اپل iPhone 11 <span class="t-bidi">128 GB</span></div>
    <button class="t-icon-btn t-icon-btn--sm" aria-label="افزودن به علاقه‌مندی">${I.heart}</button>
  </header>
  <div class="phone__scroll">
    <div style="padding:16px">
      <div class="t-thumb" style="aspect-ratio:1;max-inline-size:180px;margin-inline:auto"></div>
      <h2 class="t-h4" style="margin-block:14px 6px">گوشی اپل (استوک) iPhone 11 | حافظه ۱۲۸ گیگابایت</h2>
      <div class="t-row" style="gap:6px;flex-wrap:wrap;margin-block-end:12px">
        <span class="t-badge t-badge--guarantee">ضمانت ترب</span>
        <span class="t-badge t-badge--info">نمایندگی رسمی</span>
      </div>
      <div class="t-row" style="margin-block-end:14px">
        <span class="t-price t-price--lg"><span class="t-price__from">از</span><span class="t-price__value">۲۳٬۵۵۰٬۰۰۰</span><span class="t-price__unit">تومان</span></span>
        <span class="t-spacer"></span><span class="t-body-sm t-tone-secondary">در ۷۹ فروشگاه</span>
      </div>
      <div class="t-body-sm-strong" style="margin-block-end:7px">حافظه</div>
      <div class="t-segmented t-segmented--block" role="tablist" aria-label="حافظه" style="margin-block-end:16px">
        <button class="t-segmented__item" role="tab" aria-selected="false">۶۴ گیگ</button>
        <button class="t-segmented__item" role="tab" aria-selected="true">۱۲۸ گیگ</button>
        <button class="t-segmented__item" role="tab" aria-selected="false">۲۵۶ گیگ</button>
      </div>
      <button class="t-buybox" style="margin-block-end:8px">
        <span class="t-buybox__body"><span class="t-buybox__price">۲۳٬۵۵۰٬۰۰۰ تومان</span><span class="t-buybox__meta">خرید از تکنولایف · ارسال فوری</span></span>
        ${I.backSm}
      </button>
      <button class="t-buybox t-buybox--accent" style="margin-block-end:16px">
        <span class="t-buybox__body"><span class="t-buybox__price">۲۴٬۹۰۰٬۰۰۰ تومان</span><span class="t-buybox__meta">خرید از دیجی‌کالا · <span class="t-badge t-badge--ad" style="vertical-align:middle">آگهی</span></span></span>
      </button>
      <div class="t-tabs" role="tablist" aria-label="بخش‌های محصول" style="margin-block-end:12px">
        <button class="t-tab" role="tab" aria-selected="true">فروشنده‌ها<span class="t-tab__count">۷۹</span></button>
        <button class="t-tab" role="tab" aria-selected="false">مشخصات</button>
        <button class="t-tab" role="tab" aria-selected="false">نمودار قیمت</button>
      </div>
      <div class="t-list">
        <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">تکنولایف</span><span class="t-list-item__sub">۴٫۶ · ارسال فوری</span></span><span class="t-price t-price--sm"><span class="t-price__value">۲۳٬۵۵۰٬۰۰۰</span></span></button>
        <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">موبایل ولیعصر</span><span class="t-list-item__sub">۱ کیلومتر · فروش حضوری</span></span><span class="t-price t-price--sm"><span class="t-price__value">۲۳٬۹۰۰٬۰۰۰</span></span></button>
        <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">دیجی‌سرا</span><span class="t-list-item__sub">ناموجود</span></span><span class="t-price t-price--sm t-price--unavailable"><span class="t-price__value">ناموجود</span></span></button>
      </div>
    </div>
  </div>`, 'Product detail')}
        <div class="prose"><p><strong>Note the price treatment.</strong> Every number in the seller list is tabular, so the column can be scanned in one pass. The out-of-stock row is grey, not red — unavailability is not an error, and using red here would compete with the discount signal.</p></div>`],
      ['specs', 'Specifications', `<div class="prose"><p>Screen 3-5 in the source is forty attribute rows with no structure. An <a href="../components/accordion.html">Accordion</a> lets the shopper find the two that matter.</p></div>
        ${phone(`
  <header class="t-page-header"><button class="t-icon-btn t-icon-btn--sm" aria-label="بستن">${I.close}</button><div class="t-page-header__title">مشخصات کامل</div></header>
  <div class="phone__scroll" style="padding:12px">
    <div class="t-accordion">
      <div class="t-accordion__item">
        <button class="t-accordion__trigger" aria-expanded="true" aria-controls="pd1"><span class="t-accordion__label">مشخصات کلی</span><svg class="t-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg></button>
        <div class="t-accordion__panel" id="pd1" style="padding:0 0 8px">
          <div class="t-list t-list--zebra" style="background:transparent">
            <div class="t-list-item"><span class="t-list-item__body t-body-md t-tone-secondary">سیستم عامل</span><span class="t-body-md-strong t-bidi">iOS ۲۶</span></div>
            <div class="t-list-item"><span class="t-list-item__body t-body-md t-tone-secondary">حافظه داخلی</span><span class="t-body-md-strong">۱۲۸ گیگابایت</span></div>
            <div class="t-list-item"><span class="t-list-item__body t-body-md t-tone-secondary">ظرفیت باتری</span><span class="t-body-md-strong">۴۸۳۲ میلی‌آمپرساعت</span></div>
          </div>
        </div>
      </div>
      <div class="t-accordion__item">
        <button class="t-accordion__trigger" aria-expanded="false" aria-controls="pd2"><span class="t-accordion__label">دوربین</span><svg class="t-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg></button>
        <div class="t-accordion__panel" id="pd2" hidden>دوربین اصلی ۴۸ مگاپیکسل · دوربین سلفی ۱۲ مگاپیکسل · فیلم‌برداری ۴K</div>
      </div>
      <div class="t-accordion__item">
        <button class="t-accordion__trigger" aria-expanded="false" aria-controls="pd3"><span class="t-accordion__label">بدنه و مقاومت</span><svg class="t-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg></button>
        <div class="t-accordion__panel" id="pd3" hidden>گواهینامه IP53 — مقاوم در برابر پاشیده شدن آب و گرد و غبار. پوشش گوریلا گلس ۳.</div>
      </div>
    </div>
  </div>`, 'Specifications')}`],
    ]);

  /* ── Search & filter ── */
  page('patterns/search-and-filter', 'Search & filter', 'From an empty field to a filtered result set, and back out again.',
    [
      [null, null, `<div class="prose"><p>Torob starts at search. This flow covers the three SearchField states, recent searches, the filter sheet, and the no-results recovery, which is the state most systems forget.</p></div>`],
      ['recent', 'Empty field, recent searches', phone(`
  <header class="t-page-header"><button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت">${I.back}</button><div class="t-page-header__title">جستجو</div></header>
  <div style="padding:12px 16px">
    <div class="t-search" data-state="default"><div class="t-input">${I.search}<input class="t-input__el" type="search" placeholder="جستجو در اطراف من">
      <span class="t-search__actions">
        <button class="t-icon-btn t-icon-btn--sm t-search__tool" aria-label="جستجوی صوتی"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 10a2 2 0 0 0 2-2V4a2 2 0 1 0-4 0v4a2 2 0 0 0 2 2zm4-2a4 4 0 0 1-8 0H3a5 5 0 0 0 4.3 4.9V15h1.4v-2.1A5 5 0 0 0 13 8z"/></svg></button>
        <button class="t-icon-btn t-icon-btn--sm t-search__tool" aria-label="جستجو با تصویر"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M13 4h-2l-1-1.5H6L5 4H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM8 11.2A2.7 2.7 0 1 1 8 5.8a2.7 2.7 0 0 1 0 5.4z"/></svg></button>
      </span></div></div>
  </div>
  <div class="phone__scroll" style="padding:0 16px">
    <div class="t-row" style="margin-block:6px 4px"><span class="t-body-sm-strong">جستجوهای اخیر</span><span class="t-spacer"></span><button class="t-btn t-btn--ghost t-btn--xs">پاک کردن</button></div>
    <div class="t-list">
      <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">ادکلن کازاموراتی</span></span><span class="t-list-item__trail">${I.close}</span></button>
      <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">گوشی اپل استوک</span></span><span class="t-list-item__trail">${I.close}</span></button>
      <button class="t-list-item"><span class="t-list-item__body"><span class="t-list-item__title">مرکز خرید پالادیوم</span><span class="t-list-item__sub">۲۳ فروشگاه · ۱٫۲ کیلومتر</span></span><span class="t-list-item__trail">${I.backSm}</span></button>
    </div>
  </div>`, 'Search — empty')],
      ['results', 'Results with filters', phone(`
  <header class="t-page-header"><button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت">${I.back}</button><div class="t-page-header__title">محصولات اطراف<div class="t-page-header__sub">تهران، ۵۵ مورد</div></div></header>
  <div style="padding:10px 16px 0"><div class="t-search" data-state="searched"><div class="t-input">${I.search}<input class="t-input__el" type="search" value="ادکلن کازاموراتی"><span class="t-search__actions"><button class="t-icon-btn t-icon-btn--sm" aria-label="پاک کردن جستجو">${I.close}</button></span></div></div></div>
  ${filterBar}
  <div class="phone__scroll" style="padding:12px 16px">
    <div class="t-grid-products">
      ${[['کازاموراتی مفیستو ادکلن شرکتی ۱۰۰ میل', '۱۶٬۷۰۰٬۰۰۰', '۷۹', 'ارسال فوری'],
         ['کازاموراتی لا تو ادکلن ۱۰۰ میل', '۱۴٬۲۰۰٬۰۰۰', '۳۴', ''],
         ['کازاموراتی ایتالیکا ۱۲۰ میل', '۱۹٬۹۰۰٬۰۰۰', '۱۲', ''],
         ['کازاموراتی فیوری ۱۰۰ میل', '۱۱٬۵۰۰٬۰۰۰', '۴۱', '']]
        .map(([t, p, n, b]) => `<a class="t-product-card" href="#">
          <div class="t-thumb">${b ? `<div class="t-thumb__badges"><span class="t-badge t-badge--on-image">${b}</span></div>` : ''}<div class="t-thumb__action"><button class="t-icon-btn t-icon-btn--sm" aria-label="افزودن به علاقه‌مندی">${I.heart}</button></div></div>
          <div class="t-product-card__title t-clamp-2">${t}</div>
          <span class="t-price t-price--sm"><span class="t-price__from">از</span><span class="t-price__value">${p}</span><span class="t-price__unit">تومان</span></span>
          <div class="t-product-card__meta">در ${n} فروشگاه</div></a>`).join('')}
    </div>
  </div>`, 'Search — results')],
      ['sheet', 'The filter sheet', `<div class="prose"><p>A <a href="../components/bottom-sheet.html">BottomSheet</a> on a phone, a 420px side panel from md — same component, same markup. The footer counts the result set live, so applying is never a leap of faith.</p></div>
        ${phone(`
  <div style="position:relative;flex:1;overflow:hidden">
    <div style="padding:12px 16px;opacity:.5">
      <div class="t-search"><div class="t-input">${I.search}<input class="t-input__el" value="ادکلن کازاموراتی"></div></div>
    </div>
    <div style="position:absolute;inset:0;background:var(--t-bg-scrim)"></div>
    <div class="t-sheet" style="position:absolute;animation:none;max-block-size:82%">
      <div class="t-sheet__grip"></div>
      <div class="t-sheet__head"><span class="t-sheet__title">فیلترها</span><button class="t-icon-btn t-icon-btn--sm" aria-label="بستن">${I.close}</button></div>
      <div class="t-sheet__body">
        <div class="t-body-sm-strong" style="margin-block:4px 8px">بازه قیمت</div>
        <div class="t-range" style="margin-block-end:14px">
          <div class="t-range__values"><span>۱٬۲۰۰٬۰۰۰ تومان</span><span>۱۸٬۵۰۰٬۰۰۰ تومان</span></div>
          <div class="t-range__track"><div class="t-range__fill" style="inset-inline-start:14%;inline-size:58%"></div>
            <div class="t-range__thumb" style="inset-inline-start:14%" role="slider" aria-valuemin="0" aria-valuemax="30000000" aria-valuenow="1200000" aria-valuetext="۱٬۲۰۰٬۰۰۰ تومان" tabindex="0"></div>
            <div class="t-range__thumb" style="inset-inline-start:72%" role="slider" aria-valuemin="0" aria-valuemax="30000000" aria-valuenow="18500000" aria-valuetext="۱۸٬۵۰۰٬۰۰۰ تومان" tabindex="0"></div></div>
        </div>
        <div class="t-divider" style="margin-block:12px"></div>
        <div class="t-body-sm-strong" style="margin-block-end:4px">ویژگی‌ها</div>
        ${[['ضمانت ترب', 1], ['نمایندگی رسمی', 0], ['باز الان', 1], ['ارسال فوری', 0], ['پرداخت قسطی', 0]].map(([l, on]) =>
          `<label class="t-check"><input type="checkbox"${on ? ' checked' : ''}><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">${l}</span></label>`).join('')}
      </div>
      <div class="t-sheet__foot"><button class="t-btn t-btn--ghost t-btn--md">حذف همه</button><button class="t-btn t-btn--primary t-btn--md">نمایش ۴۳ نتیجه</button></div>
    </div>
  </div>`, 'Filter sheet')}`],
      ['empty', 'No results — the recovery', `<div class="prose"><p>The state most systems ship as a shrug. Name the filter to drop, and put it in a button.</p></div>
        ${phone(`
  <header class="t-page-header"><button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت">${I.back}</button><div class="t-page-header__title">محصولات اطراف<div class="t-page-header__sub">تهران، ۰ مورد</div></div></header>
  <div style="padding:10px 16px 0"><div class="t-search" data-state="searched"><div class="t-input">${I.search}<input class="t-input__el" value="ادکلن کازاموراتی"><span class="t-search__actions"><button class="t-icon-btn t-icon-btn--sm" aria-label="پاک کردن جستجو">${I.close}</button></span></div></div></div>
  ${filterBar}
  <div class="phone__scroll" aria-live="polite">
    <div class="t-empty">
      <div class="t-empty__art"><svg width="40" height="40" viewBox="0 0 32 32" fill="currentColor"><path d="M14 3a11 11 0 1 0 6.7 19.7l6.9 7 1.4-1.4-6.9-6.9A11 11 0 0 0 14 3zm0 2.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z"/></svg></div>
      <div class="t-empty__title">با این فیلترها چیزی پیدا نشد</div>
      <div class="t-empty__desc">در شعاع ۲ کیلومتری ۴۳ محصول هست. فیلتر «باز الان» را بردارید تا همه را ببینید.</div>
      <div class="t-empty__actions"><button class="t-btn t-btn--primary t-btn--md">حذف فیلتر «باز الان»</button><button class="t-btn t-btn--ghost t-btn--md">حذف همه فیلترها</button></div>
    </div>
  </div>`, 'No results')}`],
    ]);

  /* ── Feedback & errors ── */
  page('patterns/feedback-and-errors', 'Feedback & errors', 'The layer the source kit was missing entirely.',
    [
      [null, null, `<div class="prose">
        <p>Twenty-nine screens in the Sketch source, and not one confirmation, error or loading state as a component. This is the taxonomy, which surface to reach for, and when.</p>
      </div>
      ${table(['Situation', 'Surface', 'Why'], [
        ['An action succeeded', '<a href="../components/toast.html">Toast</a>', 'Passing, non-blocking, offers undo.'],
        ['A condition persists', '<a href="../components/alert.html">Alert</a>', 'Stays until resolved. Carries its own fix.'],
        ['One field is wrong', 'InlineMessage', 'Sits under the control it describes.'],
        ['A decision cannot wait', '<a href="../components/modal.html">Modal</a>', 'The most expensive interaction. Use rarely.'],
        ['Nothing here yet', '<a href="../components/empty-state.html">EmptyState</a>', 'Always names the way out.'],
        ['The request failed', 'EmptyState, error variant', 'Problem, then recovery, in that order.'],
        ['Content is loading, shape known', '<a href="../components/skeleton.html">Skeleton</a>', 'Reserves the exact final dimensions.'],
        ['Content is loading, shape unknown', '<a href="../components/spinner.html">Spinner</a>', 'Only when a skeleton cannot work.'],
      ])}`],
      ['offline', 'Offline', `<div class="prose"><p>Torob runs on mobile networks that drop. The offline state shows cached results rather than an empty screen, and says so.</p></div>
        ${phone(`
  <header class="t-page-header"><button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت">${I.back}</button><div class="t-page-header__title">فروشگاه‌های اطراف<div class="t-page-header__sub">تهران، ۷۸ مورد</div></div></header>
  <div style="padding:12px 16px 0">
    <div class="t-alert t-alert--critical" role="alert">
      <svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5 15 14H1zM7.3 6v4h1.4V6zm0 5v1.4h1.4V11z"/></svg>
      <div class="t-alert__body"><div class="t-alert__title">اتصال به اینترنت برقرار نیست</div><div>نتایج نمایش‌داده‌شده مربوط به آخرین بازدید شماست.</div>
        <div class="t-alert__actions"><button class="t-btn t-btn--outline t-btn--sm">تلاش مجدد</button></div></div>
    </div>
  </div>
  <div class="phone__scroll" style="padding:12px 16px">
    ${storeCard('ادکلن شهر', '۱ کیلومتر', 'ساعات کاری نامشخص', '<span class="t-badge">آخرین بروزرسانی ۲ ساعت پیش</span>', false)}
    ${storeCard('عطر سرای نیک', '۱٫۴ کیلومتر', 'ساعات کاری نامشخص', '', false)}
  </div>`, 'Offline')}`],
      ['loading', 'Loading', `<div class="prose"><p>Skeletons match the real card's dimensions exactly, so nothing shifts when the data lands. Anything else is worse than a spinner.</p></div>
        ${phone(`
  <header class="t-page-header"><div class="t-page-header__title">فروشگاه‌های اطراف</div></header>
  <div class="phone__scroll" style="padding:12px 16px" aria-busy="true">
    ${[1, 2, 3].map(() => `<div class="t-store-card" style="border-radius:12px;margin-block-end:8px">
      <div class="t-store-card__head">
        <div class="t-store-card__logo t-skeleton"></div>
        <div class="t-store-card__body" style="gap:6px"><div class="t-skeleton t-skeleton--title" style="inline-size:52%"></div><div class="t-skeleton t-skeleton--text" style="inline-size:74%"></div></div>
      </div>
      <div class="t-store-card__rail">${[1, 2, 3, 4].map(() => `<div><div class="t-thumb t-thumb--sm t-skeleton"></div></div>`).join('')}</div>
    </div>`).join('')}
  </div>`, 'Loading')}`],
      ['toasts', 'Confirmation', `<div class="prose"><p>Bottom-anchored, because the top of a Torob screen is search and the bottom is where the thumb already is. Fire them from the buttons below — they appear at the bottom of this page.</p></div>
        <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Live</span></div>
        <div class="spec__stage" dir="rtl" lang="fa">
          <button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({title:'به علاقه‌مندی‌ها اضافه شد',desc:'کازاموراتی مفیستو ۱۰۰ میل',action:'واگرد'})">Added, with undo</button>
          <button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'positive',title:'آدرس ذخیره شد'})">Saved</button>
          <button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'critical',title:'اتصال برقرار نشد',desc:'دوباره تلاش کنید.',action:'تلاش مجدد'})">Failed, with retry</button>
        </div></div>`],
      ['rules', 'Rules', guidance([
        'Every error names the problem, then the recovery.',
        'Every empty state offers an exit, usually the loosest filter to drop.',
        'Offer undo whenever the action is reversible. That is what makes a toast better than a dialog.',
        'Announce a result set that becomes empty with <code>aria-live="polite"</code> — a silently emptied list looks broken.',
      ], [
        'A toast for an error that needs a decision.',
        'A toast carrying the only path to an action.',
        'Auto-dismissing a toast with an action before a keyboard user can reach it.',
        'The same illustration for empty and error. They mean different things.',
      ])],
    ]);

  return P;
}
