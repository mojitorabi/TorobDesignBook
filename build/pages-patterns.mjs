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
    <span class="spec__label">${esc(note ?? '۳۷۵ × ۶۴۰')}</span>
    <div class="spec__tools">
      <button class="site-tool" data-spec-locale data-locale="fa" aria-label="تغییر زبان و جهت این نمونه" title="زبان و جهت">فارسی</button>
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
  page('patterns/nearby-stores', 'فروشگاه‌های اطراف', 'صفحهٔ اصلی «خرید از اطراف»: نقشه، فهرست و کلید تعویض میانشان.',
    [
      [null, null, `<div class="prose">
        <p>از صفحه‌های ۱ و ۱-۱ منبع اسکچ بازسازی شده، فقط با کامپوننت‌های همین سیستم. کل صفحه هشت کامپوننت است: <a href="../components/page-header.html">PageHeader</a>، <a href="../components/search-field.html">SearchField</a>، <a href="../components/switch.html">Switch</a>، <a href="../components/segmented-control.html">SegmentedControl</a>، <a href="../components/filter-chip.html">FilterChip</a>، <a href="../components/store-card.html">StoreCard</a>، <a href="../components/map-pin.html">MapPin</a> و <a href="../components/bottom-nav.html">BottomNav</a>.</p>
      </div>`],
      ['list', 'نمای فهرست', `${phone(`
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
  ${bottomNav('اطراف من')}`, 'فروشگاه‌های اطراف — فهرست')}
        <div class="prose"><p><strong>ریزتعامل‌های این صفحه:</strong> تراشه‌های فیلتر همان‌جا روشن و خاموش می‌شوند؛ سگمنت انتخابش را جابه‌جا می‌کند؛ کارت فروشگاه هنگام هاور دو پیکسل با ارتفاع ۲ بالا می‌آید؛ ریل محصول چسبان اسکرول می‌شود. همه‌اش در قاب بالا زنده است — امتحان کنید.</p></div>`],
      ['map', 'نمای نقشه', `<div class="prose"><p>همان داده، حالت دیگر. هرچه روی نقشه شناور است شیشه‌ای است و دقیقاً سه لایهٔ شیشه وجود دارد: کلید تعویض، ظرف پین‌ها و کارت فروشگاه. کل بودجه همین است.</p></div>
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
  ${bottomNav('اطراف من')}`, 'فروشگاه‌های اطراف — نقشه')}
        <div class="prose"><p><strong>امتحان کنید:</strong> روی یک پین بزنید. انتخاب جابه‌جا می‌شود، پین ۱٫۱۲ برابر بزرگ می‌شود و از قرمز برند به آبی می‌رود. قرمز حالت آرامش می‌ماند؛ بار اضافه روی آن سیگنال قیمت را می‌کشد.</p></div>`],
      ['rules', 'این الگو چه چیزی را حل می‌کند', guidance([
        'فاصله سرِ هر کارت است؛ همان دلیلی که خریدار در این صفحه است.',
        'ساعت کاری پیش از لمس دیده می‌شود. فروشگاه بسته یعنی یک سفر هدررفته.',
        'نقشه و فهرست داده‌های یکسانی دارند، پس Switch تغییر نماست نه فیلتر.',
        'فیلترهای اعمال‌شده به‌صورت تراشه دیده‌شونده می‌مانند. هرگز آنها را در «۳ فیلتر» جمع نکنید.',
      ], [
        'نقشه بدون معادل فهرستی. نقشه به‌تنهایی دسترس‌پذیر نیست.',
        'قیمت روی هر پین در زوم شهر؛ نقشه ناخوانا می‌شود. اول نقطه، بعد خوشه.',
        'بیش از سه لایهٔ شیشه روی نقشه.',
        'پنهان‌کردن ناوبری پایین هنگام اسکرول. مجموعهٔ مقصدها باید ثابت باشد.',
      ])],
    ]);

  /* ── PDP ── */
  page('patterns/product-detail', 'صفحهٔ محصول', 'قیمت، فروشنده‌ها، گونه‌ها و مشخصات — صفحه‌ای که تصمیم در آن گرفته می‌شود.',
    [
      [null, null, `<div class="prose"><p>از صفحه‌های ۳، ۳-۱ و ۳-۳. باکس خرید عنصر تعیین‌کننده است: قیمت، فروشنده و کنش را در یک هدف لمس جمع می‌کند و هرجا لازم باشد افشای «آگهی» را هم می‌آورد.</p></div>`],
      ['screen', 'خود صفحه', `${phone(`
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
  </div>`, 'صفحهٔ محصول')}
        <div class="prose"><p><strong>به ظاهر قیمت دقت کنید.</strong> هر عدد در فهرست فروشنده‌ها جدولی است، پس ستون در یک نگاه خوانده می‌شود. ردیف ناموجود خاکستری است نه قرمز؛ نبود کالا خطا نیست و قرمز اینجا با سیگنال تخفیف رقابت می‌کرد.</p></div>`],
      ['specs', 'مشخصات', `<div class="prose"><p>صفحهٔ ۳-۵ منبع چهل ردیف ویژگی بدون هیچ ساختاری است. یک <a href="../components/accordion.html">Accordion</a> به خریدار اجازه می‌دهد آن دو ردیفی را که برایش مهم است پیدا کند.</p></div>
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
  </div>`, 'مشخصات')}`],
    ]);

  /* ── Search & filter ── */
  page('patterns/search-and-filter', 'جست‌وجو و فیلتر', 'از یک فیلد خالی تا مجموعهٔ نتایج فیلترشده، و راه برگشت.',
    [
      [null, null, `<div class="prose"><p>ترب از جست‌وجو شروع می‌شود. این جریان سه حالت SearchField، جست‌وجوهای اخیر، برگهٔ فیلتر و راه جبران «نتیجه‌ای نبود» را پوشش می‌دهد؛ همان حالتی که بیشتر سیستم‌ها فراموشش می‌کنند.</p></div>`],
      ['recent', 'فیلد خالی، جست‌وجوهای اخیر', phone(`
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
  </div>`, 'جست‌وجو — خالی')],
      ['results', 'نتایج همراه فیلتر', phone(`
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
  </div>`, 'جست‌وجو — نتایج')],
      ['sheet', 'برگهٔ فیلتر', `<div class="prose"><p>روی گوشی یک <a href="../components/bottom-sheet.html">BottomSheet</a> و از نقطهٔ md یک پنل کناری ۴۲۰ پیکسلی — همان کامپوننت، همان مارک‌آپ. فوتر تعداد نتایج را زنده می‌شمارد، پس اعمال‌کردن هرگز یک جهش در تاریکی نیست.</p></div>
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
  </div>`, 'برگهٔ فیلتر')}`],
      ['empty', 'نتیجه‌ای نبود — راه جبران', `<div class="prose"><p>حالتی که بیشتر سیستم‌ها به‌صورت یک شانه بالا انداختن منتشرش می‌کنند. فیلتری را که باید حذف شود نام ببرید و آن را در یک دکمه بگذارید.</p></div>
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
  </div>`, 'نتیجه‌ای نبود')}`],
    ]);

  /* ── Feedback & errors ── */
  page('patterns/feedback-and-errors', 'بازخورد و خطا', 'لایه‌ای که کیت اولیه کاملاً نداشت.',
    [
      [null, null, `<div class="prose">
        <p>بیست‌ونه صفحه در منبع اسکچ، و حتی یک تأیید، خطا یا حالت بارگذاری به‌عنوان کامپوننت وجود نداشت. این رده‌بندی می‌گوید کِی سراغ کدام سطح بروید.</p>
      </div>
      ${table(['موقعیت', 'سطح', 'چرا'], [
        ['کنشی موفق شد', '<a href="../components/toast.html">Toast</a>', 'گذرا، بدون مسدودکردن، امکان واگرد.'],
        ['شرطی برقرار مانده', '<a href="../components/alert.html">Alert</a>', 'تا حل‌شدن می‌ماند و راه‌حلش را با خود دارد.'],
        ['یک فیلد اشتباه است', 'InlineMessage', 'زیر همان کنترلی می‌نشیند که توصیفش می‌کند.'],
        ['تصمیمی نمی‌تواند صبر کند', '<a href="../components/modal.html">Modal</a>', 'گران‌ترین تعامل. کم استفاده کنید.'],
        ['هنوز چیزی اینجا نیست', '<a href="../components/empty-state.html">EmptyState</a>', 'همیشه راه خروج را نام می‌برد.'],
        ['درخواست شکست خورد', 'EmptyState، گونهٔ خطا', 'اول مشکل، بعد راه جبران، به همین ترتیب.'],
        ['محتوا در حال بارگذاری، شکل معلوم', '<a href="../components/skeleton.html">Skeleton</a>', 'دقیقاً ابعاد نهایی را رزرو می‌کند.'],
        ['محتوا در حال بارگذاری، شکل نامعلوم', '<a href="../components/spinner.html">Spinner</a>', 'فقط وقتی اسکلت کار نمی‌کند.'],
      ])}`],
      ['offline', 'آفلاین', `<div class="prose"><p>ترب روی شبکه‌های موبایلی اجرا می‌شود که قطع می‌شوند. حالت آفلاین به‌جای صفحهٔ خالی، نتایج ذخیره‌شده را نشان می‌دهد و همین را هم می‌گوید.</p></div>
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
  </div>`, 'آفلاین')}`],
      ['loading', 'در حال بارگذاری', `<div class="prose"><p>اسکلت‌ها دقیقاً ابعاد کارت واقعی را می‌گیرند، پس وقتی داده می‌رسد چیزی جابه‌جا نمی‌شود. هر چیز دیگری بدتر از یک اسپینر است.</p></div>
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
  </div>`, 'در حال بارگذاری')}`],
      ['toasts', 'تأیید', `<div class="prose"><p>لنگرانداخته به پایین، چون بالای صفحهٔ ترب جای جست‌وجوست و پایین همان‌جایی است که شست از قبل هست. از دکمه‌های زیر اجرایشان کنید؛ در پایین همین صفحه ظاهر می‌شوند.</p></div>
        <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">زنده</span></div>
        <div class="spec__stage" dir="rtl" lang="fa">
          <button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({title:'به علاقه‌مندی‌ها اضافه شد',desc:'کازاموراتی مفیستو ۱۰۰ میل',action:'واگرد'})">افزوده شد، با واگرد</button>
          <button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'positive',title:'آدرس ذخیره شد'})">ذخیره شد</button>
          <button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'critical',title:'اتصال برقرار نشد',desc:'دوباره تلاش کنید.',action:'تلاش مجدد'})">شکست خورد، با تلاش مجدد</button>
        </div></div>`],
      ['rules', 'قواعد', guidance([
        'هر خطا اول مشکل را نام می‌برد، بعد راه جبران را.',
        'هر حالت خالی یک راه خروج می‌دهد؛ معمولاً شل‌ترین فیلتر برای حذف.',
        'هرجا کنش بازگشت‌پذیر است واگرد بدهید. همین است که توست را از دیالوگ بهتر می‌کند.',
        'خالی‌شدن مجموعهٔ نتایج را با <code>aria-live="polite"</code> اعلام کنید؛ فهرستی که بی‌صدا خالی شود خراب به نظر می‌رسد.',
      ], [
        'توست برای خطایی که نیاز به تصمیم دارد.',
        'توستی که تنها راه رسیدن به یک کنش را حمل می‌کند.',
        'بسته‌شدن خودکار توست دارای کنش، پیش از آنکه کاربر صفحه‌کلید به آن برسد.',
        'یک تصویر مشترک برای خالی و خطا. این دو معنای متفاوتی دارند.',
      ])],
    ]);

  return P;
}

/* ─────────────────── پنل فروشنده (B2B) ─────────────────── */
export function sellerPanelPage() {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const chev = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg>`;

  let body = `<div class="prose">
    <p>پنل فروشنده معکوس اپلیکیشن خریدار است و همین آن را ارزش یک الگوی جداگانه می‌کند. خریدار یک‌دستی روی گوشی است و دنبال یک تصمیم می‌گردد. فروشنده پشت میز، روی صفحهٔ بزرگ، در حال مرور صدها ردیف است و دنبال یک <em>استثنا</em> می‌گردد.</p>
    <p>پس اولویت‌ها جابه‌جا می‌شوند: <strong>تراکم بر آسودگی</strong>، <strong>صفحه‌کلید بر لمس</strong>، <strong>مقایسه‌پذیری بر زیبایی</strong>. اما متریال، توکن‌ها و قواعد راست‌چین همان‌هایی هستند که در سمت خریدار هستند. این یک سیستم دوم نیست؛ همان سیستم است با تنظیمات دیگر.</p>
    <div class="note"><strong>چه چیزی از سمت خریدار عوض می‌شود:</strong> شیشه تقریباً ناپدید می‌شود (پس‌زمینه‌ای برای دیده‌شدن از پشت وجود ندارد)، تراکم بالا می‌رود، اعداد جدولی اجباری‌اند و تاریخ‌ها شمسی‌اند.</div>
  </div>`;

  body += S('shell', 'اسکلت', `<div class="prose"><p>نوار کناری، نوار بالا، یک ناحیهٔ اسکرول. نوار کناری روی عرض کم جمع می‌شود اما ناپدید نمی‌شود؛ فروشنده‌ای که در درخت ناوبری است نباید جایش را گم کند.</p></div>
  <div class="spec" data-spec>
    <div class="spec__bar"><span class="spec__label">پنل فروشنده — داشبورد</span>
      <div class="spec__tools"><button class="site-tool" data-spec-locale data-locale="fa" aria-label="تغییر زبان و جهت این نمونه">فارسی</button></div></div>
    <div class="spec__stage" data-canvas="plain" dir="rtl" lang="fa" style="padding:16px;overflow-x:auto">
      <div class="t-shell-frame" style="inline-size:1100px;flex:none;border:1px solid var(--t-border-default);border-radius:14px;overflow:hidden"><div class="t-shell" style="block-size:520px">
        <div class="t-shell__brand"><span style="inline-size:24px;block-size:24px;border-radius:7px;background:var(--t-action-red-bg-gradient);border:1px solid var(--t-action-red-border);display:grid;place-items:center;color:#fff;font-weight:800;font-size:13px">ت</span><strong style="font-size:14px">پنل فروشنده</strong></div>
        <div class="t-shell__top">
          <div class="t-search" style="max-inline-size:240px"><div class="t-input t-input--sm"><svg class="t-input__icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg><input class="t-input__el" type="search" placeholder="جست‌وجوی سفارش، محصول یا مشتری"></div></div>
          <span style="flex:1"></span>
          <span class="t-kbd">/</span>
          <button class="t-icon-btn t-icon-btn--sm" aria-label="اعلان‌ها"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a4 4 0 0 0-4 4v3L2.5 11h11L12 8.5v-3a4 4 0 0 0-4-4zM6.5 12a1.5 1.5 0 0 0 3 0z"/></svg></button>
          <span class="t-avatar t-avatar--sm">ا</span>
        </div>
        <nav class="t-shell__nav" aria-label="ناوبری پنل">
          <div class="t-navgroup__title">فروش</div>
          <a class="t-navitem" href="#" aria-current="page"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v2H2zm0 4h12v2H2zm0 4h8v2H2z"/></svg>سفارش‌ها<span class="t-navitem__count">۳</span></a>
          <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1 2 4v8l6 3 6-3V4zm0 1.7 4 2v.1L8 6.8 4 4.8v-.1z"/></svg>محصولات<span class="t-navitem__count">۱۴۸</span></a>
          <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M2 12h2V7H2zm4 0h2V3H6zm4 0h2V9h-2z"/></svg>گزارش‌ها</a>
          <div class="t-navgroup__title">فروشگاه</div>
          <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1z"/></svg>اطلاعات فروشگاه</a>
          <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 5.5A2.5 2.5 0 1 0 8 10.5 2.5 2.5 0 0 0 8 5.5zM7 1h2l.3 1.8 1.5.9 1.7-.7 1 1.7-1.3 1.2v1.8l1.3 1.2-1 1.7-1.7-.7-1.5.9L9 14H7l-.3-1.8-1.5-.9-1.7.7-1-1.7 1.3-1.2V7.3L2.5 6.1l1-1.7 1.7.7 1.5-.9z"/></svg>تنظیمات</a>
        </nav>
        <main class="t-shell__main">
          <h2 style="font-size:19px;font-weight:800;margin-block-end:14px">سفارش‌ها</h2>
          <div class="t-stats" style="margin-block-end:16px">
            <div class="t-stat"><div class="t-stat__label">سفارش‌های امروز</div><div class="t-stat__value">۴۸</div><div class="t-stat__delta t-stat__delta--up">▲ ۱۲٪ نسبت به دیروز</div></div>
            <div class="t-stat"><div class="t-stat__label">درآمد هفته</div><div class="t-stat__value">۸۹٬۴۰۰٬۰۰۰</div><div class="t-stat__delta t-stat__delta--down">▼ ۴٪ نسبت به هفتهٔ گذشته</div></div>
            <div class="t-stat"><div class="t-stat__label">نرخ لغو</div><div class="t-stat__value">۲٫۱٪</div><div class="t-stat__delta t-stat__delta--flat">بدون تغییر</div></div>
          </div>
          <div class="t-toolbar">
            <button class="t-btn t-btn--black-ghost t-btn--md">وضعیت${chev}</button>
            <button class="t-btn t-btn--black-ghost t-btn--md"><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۳</span> تا <span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۹</span>${chev}</button>
            <span class="t-toolbar__spacer"></span>
            <span class="t-body-sm t-tone-secondary">۱ تا ۴ از ۴۸۳</span>
            <button class="t-btn t-btn--blue t-btn--md">خروجی اکسل</button>
          </div>
          <div class="t-table-wrap" tabindex="0" role="region" aria-label="جدول سفارش‌ها">
            <table class="t-table t-table--freeze">
              <thead><tr>
                <th scope="col">شمارهٔ سفارش</th><th scope="col">مشتری</th>
                <th scope="col">تاریخ</th><th scope="col">وضعیت</th><th scope="col" class="t-num">مبلغ</th>
              </tr></thead>
              <tbody>
                <tr><td><code>۱۰۲۳۴</code></td><td>سارا محمدی</td><td class="t-num-tabular"><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۹</span></td><td><span class="t-badge t-badge--positive">ارسال شده</span></td><td class="t-num">۲٬۴۵۰٬۰۰۰</td></tr>
                <tr aria-selected="true"><td><code>۱۰۲۳۳</code></td><td>رضا کریمی</td><td class="t-num-tabular"><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۹</span></td><td><span class="t-badge t-badge--caution">در انتظار پرداخت</span></td><td class="t-num">۸۹۰٬۰۰۰</td></tr>
                <tr><td><code>۱۰۲۳۲</code></td><td>مینا رضایی</td><td class="t-num-tabular"><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۸</span></td><td><span class="t-badge t-badge--info">در حال آماده‌سازی</span></td><td class="t-num">۱۵٬۸۰۰٬۰۰۰</td></tr>
                <tr><td><code>۱۰۲۳۱</code></td><td>حسین نوری</td><td class="t-num-tabular"><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۸</span></td><td><span class="t-badge t-badge--critical">لغو شده</span></td><td class="t-num">۳۲۰٬۰۰۰</td></tr>
              </tbody>
            </table>
          </div>
        </main>
      </div></div>
    </div>
    <div class="spec__note">قاب ۱۱۰۰ پیکسل است تا چیدمان دسکتاپ را نشان دهد؛ اگر پنجره باریک‌تر است، افقی اسکرول کنید. هدر جدول هنگام اسکرول می‌چسبد و ستون شمارهٔ سفارش روی لبهٔ راست ثابت می‌ماند. ستون مبلغ جدولی است.</div>
  </div>`);

  body += S('density', 'تراکم و صفحه‌کلید', `<div class="prose">
      <p>دو چیز که پنل را از اپلیکیشن جدا می‌کنند و هر دو معمولاً فراموش می‌شوند.</p>
      <p><strong>تراکم ویژگی جدول است، نه صفحه.</strong> یک صفحه می‌تواند هم‌زمان یک جدول متراکم و یک جدول راحت داشته باشد؛ فروشنده‌ای که دنبال یک استثناست تراکم می‌خواهد، و همان فروشنده هنگام بازبینی یک سفارش، فضا می‌خواهد.</p>
      <p><strong>صفحه‌کلید مسیر اصلی است، نه جایگزین.</strong> فروشنده‌ای که روزی سیصد سفارش را می‌بیند از ماوس استفاده نمی‌کند. هر کنشی که در نوار ابزار هست باید یک میان‌بر داشته باشد و هر میان‌بری باید در همان‌جا نمایش داده شود.</p>
    </div>
    ${table(['میان‌بر', 'کنش'], [
      ['<span class="t-kbd">/</span>', 'فوکوس روی جست‌وجو'],
      ['<span class="t-kbd">j</span> · <span class="t-kbd">k</span>', 'ردیف بعدی و قبلی'],
      ['<span class="t-kbd">x</span>', 'انتخاب ردیف جاری'],
      ['<span class="t-kbd">Enter</span>', 'باز کردن ردیف'],
      ['<span class="t-kbd">Esc</span>', 'لغو انتخاب یا بستن لایه'],
      ['<span class="t-kbd">?</span>', 'فهرست میان‌برها'],
    ])}
    <div class="note note--warn"><strong>میان‌برها باید کشف‌پذیر باشند.</strong> میان‌بری که مستند نیست وجود ندارد. دکمهٔ <span class="t-kbd">?</span> بخشی از کامپوننت است، نه یک صفحهٔ راهنمای جدا (معیار ۳.۲.۶ نسخهٔ ۲.۲ — کمک یکنواخت).</div>`);

  body += S('sizes', 'همهٔ اندازه‌ها', `<div class="prose">
      <p>پنل دسکتاپ‌محور است، اما فروشنده هم گوشی دارد. رفتار در هر اندازه تعریف‌شده است، نه اینکه به حال خودش رها شود.</p>
    </div>
    ${table(['عرض', 'نوار کناری', 'جدول', 'آمار'], [
      ['۳۲۰ تا ۷۶۷', 'کشو', 'هر ردیف یک کارت', 'تک‌ستونی'],
      ['۷۶۸ تا ۱۰۲۳', 'کشو', 'اسکرول افقی با ستون ثابت', 'دوستونی'],
      ['۱۰۲۴ تا ۱۲۷۹', 'جمع‌شده به آیکون', 'جدول کامل', 'سه‌ستونی'],
      ['۱۲۸۰ و بالاتر', 'باز، ۲۴۸ پیکسل', 'جدول کامل، تراکم قابل انتخاب', 'چهار یا پنج‌ستونی'],
    ])}
    <div class="prose"><p><strong>جدول را روی گوشی فشرده نکنید.</strong> پنج ستون در ۳۷۵ پیکسل خوانا نیست، هر کاری با اندازهٔ قلم بکنید. هر ردیف را به یک کارت تبدیل کنید: عنوان، سه فیلد کلیدی و یک منوی سرریز.</p></div>`);

  body += S('rules', 'قواعد', guidance([
    'اعداد جدولی و تراز به انتهای محور، در هر ستون قابل مقایسه.',
    'تاریخ‌ها شمسی؛ تبدیل در سمت سرور انجام می‌شود، نه در ذهن کاربر.',
    'نوار کنش گروهی در جای نوار ابزار ظاهر می‌شود تا جدول نپرد.',
    'برای هر کنش نوار ابزار یک میان‌بر صفحه‌کلید، و نمایش آن میان‌بر در همان‌جا.',
    'تعداد کل نتایج همیشه دیده شود؛ در یک پنل، خودش داده است.',
  ], [
    'شیشه در پنل. پس‌زمینه‌ای برای دیده‌شدن از پشت وجود ندارد و فقط هزینهٔ فریم می‌دهد.',
    'اسکرول بی‌نهایت. فروشنده باید بتواند به ردیف ۴۰۰ برگردد.',
    'کنش‌هایی که فقط هنگام هاور ظاهر می‌شوند؛ با صفحه‌کلید و لمس کشف نمی‌شوند.',
    'انتخابگر تاریخ میلادی با برچسب فارسی.',
    'فشرده‌کردن جدول پنج‌ستونی در عرض ۳۷۵ پیکسل.',
  ]));

  return { body, toc, title: 'پنل فروشنده (B2B)', description: 'همان سیستم، تنظیمات دیگر: تراکم بر آسودگی، صفحه‌کلید بر لمس، مقایسه‌پذیری بر زیبایی.', eyebrow: 'الگوها' };
}
