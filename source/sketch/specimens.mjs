/* Every Sketch symbol, rebuilt from system classes.

   Keyed by the Sketch master's object id (names repeat in the file; ids do
   not). Each entry is the HTML a product team would write for that symbol,
   plus the context the symbol assumes: `theme`, and inline sizes only where
   the master is a fixed-width SLOT in its screen (two buttons sharing a 343px
   row are 162.5px each; the button itself hugs its label).

   build/dev/pixel-diff.mjs renders each one at the master's size and scores
   it against source/sketch/ref/<id>.png. The symbols page shows both. */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ICONS = JSON.parse(readFileSync(join(ROOT, 'packages/icons/icons.json'), 'utf8'));

/** A Carbon icon from the kit's IBM library, inline. */
export const icon = (name, size = 20, cls = 't-icon') => {
  const e = ICONS[name];
  if (!e) throw new Error(`no icon "${name}"`);
  const g = e.sizes[size] ?? e.sizes[20];
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="${g.viewBox}" fill="currentColor" aria-hidden="true">${g.content}</svg>`;
};

/** The Torob mark, inline (an external <use> is blocked cross-origin). */
export const logo = (cls = 't-icon') => readFileSync(join(ROOT, 'packages/brand/torob-logo.svg'), 'utf8')
  .trim().replace('<svg ', `<svg class="${cls}" aria-hidden="true" `).replace(/ role="img"/, '').replace(/ width="32" height="32"/, '');

/** The Torob mark in one colour (currentColor), for the white plate. */
export const logoMono = (cls = '') => readFileSync(join(ROOT, 'packages/brand/torob-logo.svg'), 'utf8')
  .trim().replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
  .replace('<svg ', `<svg${cls ? ` class="${cls}"` : ''} aria-hidden="true" `).replace(/ role="img"/, '').replace(/ width="32" height="32"/, '');

/** The ضمانت ترب star, inline. */
let holo = 0;
export const guarantee = (size = 16, cls = 't-icon') => readFileSync(join(ROOT, 'packages/brand/torob-guarantee.svg'), 'utf8')
  .trim().replace(/id="tg-/g, `id="tg${++holo}-`).replace(/url\(#tg-/g, `url(#tg${holo}-`)
  .replace('<svg ', `<svg class="${cls}" aria-hidden="true" `).replace(/ role="img"/, '').replace(/ width="200" height="200"/, ` width="${size}" height="${size}"`);

const TOROB = JSON.parse(readFileSync(join(ROOT, 'packages/icons/torob/index.json'), 'utf8'));
/** A Torob Library glyph (the few icons that are not Carbon), inline. */
export const ticon = (name, cls = 't-icon') => {
  const g = TOROB[name];
  if (!g) throw new Error(`no torob icon "${name}"`);
  if (g.attrs.includes('stroke=')) cls += ' t-icon--stroke';
  return `<svg class="${cls}" width="${g.size}" height="${g.size}" viewBox="${g.viewBox}" ${g.attrs} aria-hidden="true">${g.content}</svg>`;
};

/** Sample imagery. Consumers replace %ASSETS% with their own asset base. */
export const sample = f => `%ASSETS%/samples/${f}`;

/* The ground each theme's symbols sit on when compared. Sketch's "Dark" is
   the system's dim theme. */
export const GROUND = { light: '#FFFFFF', dark: '#15202B', dim: '#15202B' };

const S = {};
const add = (id, html, opts = {}) => { S[id] = { html: html.trim(), ...opts }; };

/* ───────────── Buttons ───────────── */
add('7BE18F04-4654-4C3A-81E4-991626D590FB', `<button class="t-btn t-btn--red" style="inline-size:111px">خرید اینترنتی</button>`);
add('394E4478-1EA8-462E-A041-D332C0241F8D', `<button class="t-btn t-btn--red" data-state="hover" style="inline-size:111px">خرید اینترنتی</button>`);
add('3E6E9397-637C-4B37-8080-82E31462F562', `<button class="t-btn t-btn--red" disabled style="inline-size:111px">خرید اینترنتی</button>`);
add('8B15F240-F1E9-4F22-ADEF-1A6CE9E90EC0', `<button class="t-btn t-btn--red" style="inline-size:162.5px">${icon('send--alt--filled')}برو به سایت</button>`);
add('ACABA83F-4A6F-4221-BE1E-109DB5357E73', `<button class="t-btn t-btn--black">عنوان</button>`);
add('A7D7E08F-4F3C-4F24-AE0A-944973305015', `<button class="t-btn t-btn--black" data-state="hover">عنوان</button>`);
add('17F27B29-82A7-4835-9CF5-62EE492DD36B', `<button class="t-btn t-btn--black" disabled>عنوان</button>`);
add('2C9CE530-4396-4529-A844-88D1A4989DEA', `<button class="t-btn t-btn--black-ghost">عنوان</button>`);
add('3030DFDE-AADC-490A-928C-525CBF581E09', `<button class="t-btn t-btn--black-ghost" data-state="hover">عنوان</button>`);
add('3737D472-40B9-4886-A9F6-6AEFB24EE6B4', `<button class="t-btn t-btn--glass" style="inline-size:162.5px">${icon('location--filled')}مسیریابی</button>`);
add('58C31AC1-6BCF-4917-943C-CAD03D4AF0D1', `<button class="t-btn t-btn--blue" aria-expanded="false">اطلاعات تماس${ticon('chevron-tiny--down', 't-icon t-icon--tiny t-icon--end')}</button>`);
add('C07442FE-F899-4509-9542-13467E49BF26', `<button class="t-btn t-btn--blue" data-state="hover" aria-expanded="false">اطلاعات تماس${ticon('chevron-tiny--down', 't-icon t-icon--tiny t-icon--end')}</button>`);
add('30985458-21FF-45EB-B83D-92DA3272B6D5', `<button class="t-btn t-btn--blue" aria-expanded="true">اطلاعات تماس${ticon('chevron-tiny--down', 't-icon t-icon--tiny t-icon--end')}</button>`);
add('51800D41-20BE-460E-855F-9669DFF68041', `<button class="t-btn t-btn--blue" style="inline-size:162.5px">${icon('send--alt--filled')}ارتباط با فروشگاه</button>`);
add('A7D7BED9-EB1A-4FBA-A0EF-F2C353AD23DF', `<button class="t-btn t-btn--glass t-btn--blue-ghost" style="inline-size:162.5px">${icon('location--filled')}مسیریابی</button>`);
add('76FC76F5-42F1-4BCE-A05C-04151B492E30', `<button class="t-btn t-btn--glass t-btn--blue-ghost" style="inline-size:162.5px">${icon('location--filled')}مسیریابی</button>`, { theme: 'dim' });
add('CB47F42E-18D9-4AF5-AA01-200F6936BD5B', `<button class="t-btn t-btn--blue t-btn--sm">فروشگاه‌ها</button>`);
add('C23CEACE-F7D1-4C52-A0A7-9239B76116D6', `<button class="t-btn t-btn--xs t-btn--filter">${ticon('report')}گزارش</button>`);
add('0A78F262-B375-4282-9C3D-1642B54A81D6', `<div class="t-btn-split"><button class="t-btn t-btn--red">${icon('shopping--cart')}برو به سایت</button><button class="t-btn t-btn--red t-btn-split__more" aria-label="فروشگاه‌های دیگر">${icon('chevron--down')}</button></div>`);
add('BB4AF158-2170-4FFB-9534-14DC72B6A77F', `<div class="t-btn-split"><button class="t-btn t-btn--blue">${icon('shopping--cart')}برو به سایت</button><button class="t-btn t-btn--blue t-btn-split__more" aria-label="فروشگاه‌های دیگر">${icon('chevron--down')}</button></div>`);

/* Icon-only */
add('F8D486A1-1216-4546-B67E-FFC7A66D0D82', `<button class="t-icon-btn t-icon-btn--accent" aria-label="تماس">${icon('phone--filled')}</button>`);
add('74A28072-5A8E-402F-802F-FD5057864C4B', `<button class="t-icon-btn t-icon-btn--accent-ghost" aria-label="تماس">${icon('phone--filled')}</button>`);
add('250D8218-29C2-455F-A7FC-4944D8CD2633', `<button class="t-icon-btn t-icon-btn--glass" aria-label="ترب">${logo()}</button>`);
add('214DDA2D-686C-43A6-BDAC-6F98D8E6F835', `<button class="t-icon-btn t-icon-btn--sm t-icon-btn--round t-icon-btn--filter" aria-label="بیشتر">${icon('overflow-menu--horizontal', 16)}</button>`);
add('1B633B15-BE37-43EB-A4B2-DF506A1BB5ED', `<button class="t-icon-btn t-icon-btn--sm t-icon-btn--round t-icon-btn--filter" aria-label="بیشتر">${icon('overflow-menu--horizontal', 16)}</button>`);

/* Buy box */
add('D4AC33F9-CA8E-4652-8230-EE1E1EE74474', `<button class="t-buybox"><span class="t-buybox__body"><span class="t-buybox__seller">خرید از تکنولایف</span><span class="t-buybox__price">۱۶٫۱۰۰٫۰۰۰ تومان</span></span><span class="t-buybox__ad">آگهی</span></button>`);
add('5808E4E2-B1FC-41F2-8177-39495890277E', `<button class="t-buybox t-buybox--offline"><span class="t-buybox__body"><span class="t-buybox__seller">خرید از تکنولایف</span><span class="t-buybox__price">۱۶٫۱۰۰٫۰۰۰ تومان</span></span><span class="t-buybox__ad">آگهی</span></button>`);
add('EA7A75AF-3DA7-4F06-BFAB-6479DC719785', `<button class="t-buybox t-buybox--compact"><span class="t-buybox__body"><span class="t-buybox__seller">خرید از ارزان‌ترین فروشنده</span></span></button>`);

/* ───────────── Badges ───────────── */
add('315B0EC6-2861-415F-BF74-F747D5848801', `<span class="t-badge t-badge--kalabarg">${ticon('kalabarg')}کالابرگ</span>`);
add('DA7AE168-E69A-4E98-A43B-3FCAEDB71415', `<span class="t-badge t-badge--ad">آگهی${ticon('megaphone')}</span>`);
add('82A7EE65-515C-49FD-97F4-1D25863F6717', `<span class="t-badge t-badge--guarantee"><span class="t-badge__label">ضمانت ترب</span>${ticon('chevron-tiny--down')}</span>`);
add('EC91320E-5599-4C4F-B28F-239C17854AAD', `<span class="t-badge t-badge--plain">${icon('delivery')}ارسال فوری</span>`);

/* ───────────── Filter chips ───────────── */
const chevron16 = icon('chevron--down', 16, 't-icon t-chip__chevron');
add('C138D556-0275-47BD-9CE4-0D2435AD7D72', `<button class="t-chip">باز الان</button>`);
add('D2DDC6B8-4C43-4F40-AEF6-E70574AD3EC6', `<button class="t-chip">${guarantee()}ضمانت ترب</button>`);
add('A4BEA973-E62A-4965-B0B4-82B919925BE7', `<button class="t-chip" aria-haspopup="listbox">${icon('location', 16)}تهران${chevron16}</button>`);
add('FA29F459-8F18-478C-BF57-FF012D84B665', `<div class="t-filter-bar t-filter-bar--flush">
  <button class="t-chip t-chip--action">${icon('sort--ascending')}مرتب‌سازی</button>
  <button class="t-chip t-chip--action">${icon('filter', 16)}فیلترها</button>
  <button class="t-chip" aria-haspopup="listbox">${icon('location', 16)}تهران${chevron16}</button>
  <button class="t-chip">${guarantee()}ضمانت ترب</button>
  <button class="t-chip" aria-haspopup="listbox">برند${chevron16}</button>
  <button class="t-chip" aria-haspopup="listbox">قیمت${chevron16}</button>
  <span class="t-filter-bar__divider" aria-hidden="true"></span>
  <button class="t-chip" aria-haspopup="listbox">${icon('checkmark--outline', 16)}نمایندگی رسمی${chevron16}</button>
  <button class="t-chip">باز الان</button>
</div>`);

/* ───────────── Choice chips ───────────── */
add('3CBA7995-8CC1-40A7-9070-2F63F75BF35C', `<button class="t-choice" aria-pressed="false">همه‌ی نتایج</button>`);
add('3719A070-266C-4F80-8E48-58DF1325D168', `<button class="t-choice" aria-pressed="true">کافه</button>`);
add('3CF4AA95-CF8A-40F0-B63A-995669205927', `<button class="t-choice" aria-pressed="false">${icon('location', 16)}تهران</button>`);
add('370B044C-7D5B-4C2A-AA43-709C25C86ED5', `<span class="t-choice"><button class="t-choice__action" aria-pressed="true">${icon('location', 16)}تهران</button><button class="t-choice__clear" aria-label="حذف تهران">${icon('close', 16)}</button></span>`);
const row = (city) => `<div class="t-chip-group" role="group" aria-label="دسته‌ها" style="padding-inline:0 12px">
  <button class="t-choice" aria-pressed="false">همه‌ی نتایج</button>
  ${city ? `<span class="t-choice"><button class="t-choice__action" aria-pressed="true">${icon('location', 16)}تهران</button><button class="t-choice__clear" aria-label="حذف تهران">${icon('close', 16)}</button></span>` : `<button class="t-choice" aria-pressed="true">کافه</button>`}
  <button class="t-choice" aria-pressed="false">موبایل</button>
  <button class="t-choice" aria-pressed="false">رستوران</button>
  <button class="t-choice" aria-pressed="false">گل فروشی</button>
  <button class="t-choice" aria-pressed="false">داروخانه</button>
</div>`;
add('7559E738-C3E9-487D-B595-99463A4EC7D5', row(false));
add('6462765E-2967-441D-A712-B646C6EB5B96', row(true));

/* ───────────── Segmented control ───────────── */
add('D8CA050D-7C28-4F10-BEB8-97D42C72D086', `<div class="t-segmented" role="radiogroup" aria-label="نمایش"><button class="t-segmented__item" role="radio" aria-checked="false">فروشگاه‌ها</button><button class="t-segmented__item" role="radio" aria-checked="true">محصولات</button></div>`);
add('2A388996-6F45-4842-8001-33C49394B07B', `<div class="t-segmented" role="radiogroup" aria-label="نمایش"><button class="t-segmented__item" role="radio" aria-checked="true">فروشگاه‌ها</button><button class="t-segmented__item" role="radio" aria-checked="false">محصولات</button></div>`);

/* ───────────── Search ───────────── */
const tools = `<span class="t-search__actions"><button class="t-search__tool" aria-label="جستجوی صوتی">${icon('microphone')}</button><button class="t-search__tool" aria-label="جستجو با تصویر">${icon('camera', 16)}</button></span>`;
const clear = `<span class="t-search__actions"><button class="t-search__clear" aria-label="پاک کردن جستجو">${icon('close')}</button></span>`;
add('B73DBE71-DFD2-41CB-9F69-FB990D55A6DB', `<div class="t-search" data-state="default" role="search" style="inline-size:299px"><div class="t-input">${icon('search', 16, 't-input__icon')}<input class="t-input__el" type="search" placeholder="جستجو در اطراف من" aria-label="جستجو">${tools}</div></div>`);
add('F0B38598-91C1-47C5-AAEC-1EDB0792A641', `<div class="t-search" data-state="typing" role="search" style="inline-size:299px"><div class="t-input"><input class="t-input__el" type="search" value="ادکلن کازاموراتی ۱۲۰ " aria-label="جستجو">${clear}</div></div>`);
add('E897991E-7F8D-4BF6-BAD0-0480A16C5645', `<div class="t-search" data-state="searched" role="search" style="inline-size:299px"><div class="t-input"><input class="t-input__el" type="search" value="ادکلن کازاموراتی ۱۲۰ میل" aria-label="جستجو">${clear}</div></div>`);

/* ───────────── List ───────────── */
add('F63E8B5F-5F73-46E9-AB52-FCB8BD2024B5', `<div class="t-list" style="inline-size:327px"><a class="t-list-item" href="#"><span class="t-list-item__lead">${icon('lifesaver')}</span><span class="t-list-item__body"><span class="t-list-item__title">پشتیبانی</span></span><span class="t-list-item__trail">${icon('chevron--left')}</span></a></div>`);
add('E8E2F020-7E8B-4D92-8F69-B0C48ACFD390', `<div class="t-list" style="inline-size:327px"><a class="t-list-item" href="#"><span class="t-list-item__lead">${icon('information', 16)}</span><span class="t-list-item__body"><span class="t-list-item__title">درباره ترب‌پی</span></span><span class="t-list-item__trail">${icon('chevron--left')}</span></a></div>`);

/* ───────────── Header ───────────── */
add('4BF08B65-CAD6-4882-8DCD-3158721D53F6', `<header class="t-page-header t-page-header--plain" style="inline-size:343px">
  <button class="t-page-header__close" aria-label="بستن">${icon('close')}</button>
  <div class="t-page-header__main">
    <span class="t-page-header__media"><img src="${sample('store-logo-wave.svg')}" alt=""></span>
    <div class="t-page-header__text">
      <span class="t-page-header__title">ادکلن شهر</span>
      <a class="t-hours" href="#"><span class="t-status-dot"></span><span class="t-hours__state">باز</span> تا ۲۲:۳۰${icon('chevron--left')}</a>
    </div>
  </div>
  <button class="t-icon-btn t-icon-btn--sm t-icon-btn--round t-icon-btn--filter" aria-label="بیشتر">${icon('overflow-menu--horizontal', 16)}</button>
</header>`);

/* ───────────── Status dots ───────────── */
add('5DADA39D-C59B-4C1B-8EF8-B7C667B9124C', `<span class="t-status-dot" role="img" aria-label="باز"></span>`);
add('BDAAEDAD-47F9-42EC-B5E7-6E412B5BC706', `<span class="t-status-dot t-status-dot--closed" role="img" aria-label="بسته"></span>`);
add('22CE258C-E778-44DA-8FF9-6FF491E35413', `<span class="t-status-dot" role="img" aria-label="باز"></span>`, { theme: 'dim' });
add('CF0EE74F-37D4-49E3-A2AA-50F2D3084692', `<span class="t-status-dot t-status-dot--closed" role="img" aria-label="بسته"></span>`, { theme: 'dim' });

/* ───────────── Map ───────────── */
const shop = (cls = 't-icon') => ticon('cosmetic-store', cls);
add('F1BBEC31-4D16-4BB3-892C-7257C2A43601', `<button class="t-pin" aria-label="رستوران">${icon('restaurant', 16)}</button>`, { note: 'sf' });
add('7341B7CF-E5B7-45CF-9F55-517731648668', `<button class="t-pin" aria-label="رستوران">${icon('restaurant', 16)}</button>`, { note: 'sf' });
add('22043FBC-A47D-4828-9FBB-AC9604F021DD', `<span class="t-pin t-pin--dot" role="img" aria-label="فروشگاه"></span>`);
add('E4A9B4B0-3C9F-4436-9C9E-5DED2F2CBA6F', `<button class="t-cluster" aria-label="۵۵ فروشگاه در این ناحیه">۵۵</button>`);
add('65D3A449-8572-4EBF-9F05-78B63C752374', `<button class="t-pin t-pin--price" aria-pressed="false" aria-label="ادکلن شهر، ۵٬۷۰۰ تومان"><span class="t-pin__pill">${shop()}۵٬۷۰۰</span></button>`);
add('1EA5654D-C993-4442-85A6-63FCFCE972B0', `<button class="t-pin t-pin--price" aria-pressed="true" aria-label="ادکلن شهر، ۱۵٬۸۰۰٬۰۰۰ تومان"><span class="t-pin__pill">${shop()}۱۵٫۸۰۰٫۰۰۰</span><span class="t-pin__tail"></span><span class="t-pin__spot"></span><span class="t-pin__label">ادکلن شهر</span></button>`);
add('82A88842-3175-4C7A-8FC7-A0DF3927F930', `<button class="t-pin t-pin--hero" aria-pressed="true" aria-label="ادکلن شهر"><span class="t-pin__drop"><span class="t-pin__face">${shop()}</span></span><span class="t-pin__spot"></span><span class="t-pin__label">ادکلن شهر</span></button>`);
add('BD8D64A1-20DD-43DA-85C4-74256CB57AF4', `<span class="t-pin t-pin--me" role="img" aria-label="موقعیت شما"></span>`);

/* ───────────── Brand ───────────── */
add('3926B714-3A7E-4B66-A7A5-59F523E2089D', `<span class="t-brand" role="img" aria-label="ترب">${logo('')}</span>`);
add('3C1C31C5-310C-48AE-B3E8-C31E30F506E0', `<span class="t-brand t-brand--plate" role="img" aria-label="ترب">${logoMono()}</span>`);
add('B7DDEE1B-C17E-4026-861D-ECFD00E4A822', `<span class="t-guarantee" role="img" aria-label="ضمانت ترب" style="--_s:200px">${guarantee(200, '')}</span>`);

/* ───────────── Product ───────────── */
const adBadge = `<span class="t-badge t-badge--ad">آگهی${ticon('megaphone')}</span>`;
const pic = (sm) => `<div class="t-thumb${sm ? ' t-thumb--sm' : ''}"><img src="${sample('perfume-proud.png')}" alt="ادکلن مفیستو"><div class="t-thumb__badges">${adBadge}</div></div>`;
const priceSm = `<span class="t-price t-price--sm"><span class="t-price__value">۱۵٫۸۰۰٫۰۰۰</span><span class="t-price__unit">تومان</span></span>`;
add('56045C40-7EC5-4AB7-8A14-A132D3511AE1', `<div style="inline-size:153px">${pic(false)}</div>`, { note: 'badge-stretch' });
add('99973E3D-5B46-4C18-BA6D-EBBAF70D0DD4', `<div style="inline-size:96px">${pic(true)}</div>`, { note: 'badge-stretch' });
add('1F956E7E-BC4C-44BD-843A-A2844E748D14', `<div style="inline-size:96px">${pic(true)}</div>`, { note: 'badge-stretch' });
const small = `<a class="t-product-card t-product-card--sm" href="#" style="inline-size:96px">${pic(true)}<span class="t-product-card__title">کازاموراتی | مفیستو<br>ادکلن شرکتی | ۱۰۰ میل</span>${priceSm}</a>`;
add('010F7DA2-C959-4036-B6D1-E1A10BE1705F', small);
add('811403E0-0303-4036-9872-91C4A192C1A5', small);
add('8EAF2AE4-CDD5-4FFE-8DF6-C446058D4A45', `<a class="t-product-card t-product-card--sm" href="#" style="inline-size:96px"><div class="t-thumb t-thumb--sm t-thumb--none">${icon('image--copy')}</div><span class="t-product-card__title" data-lines="3">کازاموراتی | مفیستو<br>ادکلن شرکتی | ۱۰۰ میلی<br>خوشبو و زیبا</span>${priceSm}</a>`);
const moreCell = f => `<span class="t-product-card__cell"><img src="${sample(f)}" alt=""></span>`;
const more = (order = ['perfume-b.jpg', 'perfume-c.jpg', 'perfume-a.jpg']) => `<a class="t-product-card t-product-card--more" href="#" aria-label="۴۳۵ محصول دیگر"><span class="t-product-card__grid">${order.map(moreCell).join('')}<span class="t-product-card__cell"><span class="t-bidi" dir="ltr">+۴۳۵</span></span></span></a>`;
const moreDark = ['perfume-b.jpg', 'perfume-a.jpg', 'perfume-c.jpg'];
add('FFD20D3E-31B9-42FB-B723-D3F9BB22B694', more());
add('DCF7BFE3-8CC5-4C6B-A937-39F217AC1B3A', more(moreDark), { theme: 'dim' });
const empty = `<div class="t-product-card t-product-card--empty" aria-hidden="true"><span class="t-product-card__cell">${icon('image--copy')}</span></div>`;
add('F7FD4B2E-220E-4D24-83A0-8C0E4DF743A4', empty);
add('7F1F6906-EEB4-4E5D-B7B0-7A026DE9A1A6', empty, { theme: 'dim' });
add('641CDD78-38C5-4142-A597-74BBABBB77D6', `<a class="t-product-card" href="#" style="inline-size:153px">
  ${pic(false)}
  <span class="t-product-card__title">کازاموراتی | مفیستو<br>ادکلن شرکتی | ۱۰۰ میل</span>
  <span class="t-product-card__tags"><span class="t-product-card__tag">ماندگاری بالا</span><span class="t-product-card__tag">گرم و تلخ</span><span class="t-product-card__tag">خنک</span><span class="t-product-card__tag">عصاره چوب</span></span>
  <span class="t-product-card__buy">
    <span class="t-price"><span class="t-price__value"><span class="t-price__from">از</span> ۱۶٫۷۰۰٫۰۰۰</span><span class="t-price__unit">تومان</span></span>
    <span class="t-product-card__foot"><span class="t-product-card__meta">در ۷۹ فروشگاه</span><span class="t-product-card__actions"><button aria-label="خبرم کن">${icon('notification', 16)}</button><button aria-label="علاقه‌مندی" aria-pressed="false">${icon('favorite', 16)}</button></span></span>
  </span>
</a>`);

/* ───────────── Store card ───────────── */
const storeActions = (dim) => `<div class="t-store-card__actions"><button class="t-btn t-btn--blue">${icon('send--alt--filled')}ارتباط با فروشگاه</button><button class="t-btn t-btn--blue-ghost">${icon('location--filled')}مسیریابی</button></div>`;
const statusChip = (open) => `<button class="t-btn t-btn--xs t-btn--filter"><span class="t-status-dot${open ? '' : ' t-status-dot--closed'}"></span>${open ? 'باز' : 'بسته'} تا ۲۲:۳۰</button>`;
const chips = (open, kala) => `<div class="t-store-card__chips">${statusChip(open)}<button class="t-btn t-btn--xs t-btn--filter">${icon('information', 16)}توضیحات</button><button class="t-btn t-btn--xs t-btn--filter">${ticon('report')}گزارش</button>${kala ? `<span class="t-badge t-badge--kalabarg">${ticon('kalabarg')}کالابرگ</span>` : ''}</div>`;
const storeHead = (pdp) => `<div class="t-store-card__head"><div class="t-store-card__info"><a class="t-store-card__name" href="#">ادکلن شهر${icon('chevron--left', 16)}</a>${pdp ? `<span class="t-price"><span class="t-price__value">۱۵٫۸۰۰٫۰۰۰</span><span class="t-price__unit">تومان</span></span>` : ''}<span class="t-store-card__address">ولیعصر، حافظ . <span class="t-store-card__distance">۱ کیلومتر</span></span></div><img class="t-store-card__photo" src="${sample('store-mobile-shahr.png')}" alt=""></div>`;
const rail = (dim) => `<div class="t-store-card__rail">${small}${small}${more(dim ? moreDark : undefined)}</div>`;
const store = ({ pdp = false, withRail = false, open = true, kala = true, dim = false } = {}) =>
  `<article class="t-store-card${pdp ? ' t-store-card--pdp' : ''}" style="inline-size:375px">${storeHead(pdp)}${chips(open, kala)}${withRail ? rail(dim) : ''}${storeActions()}</article>`;
add('24B92E1D-830A-4F1A-87E4-8E0432DBC4CB', store({ withRail: true, open: false, kala: false }));
add('C924F389-BA2C-46BF-AEFF-F855728BC745', store({ withRail: true, open: false, kala: true, dim: true }), { theme: 'dim' });
add('91C9981D-8479-45B5-ABA9-71CB166E7A74', store({ open: true, kala: true }));
add('BF7AF680-AA4A-4DE6-B551-840D08F3D790', store({ open: true, kala: true }), { theme: 'dim' });
add('6E4C8C1C-BA6E-4200-BEE7-239DD4B0D65F', store({ pdp: true, open: true, kala: true }));
add('09EB68E3-D89A-4C8C-9D08-9FFDE396B14B', store({ pdp: true, open: false, kala: true }), { theme: 'dim' });

/* ───────────── Offer card ───────────── */
const seller = () => `<span class="t-offer__seller">${guarantee(24, 't-guarantee')}<a class="t-offer__name" href="#">ادکلن شهر${icon('chevron--left', 16)}</a></span>`;
const rating = `<span class="t-rating-pill">${icon('star--filled', 16)}۵ (۸ ماه در ترب)</span>`;
const note = `<p class="t-offer__note">رجیستر شده | ۱۲ ماه گارانتی داریا همراه پایتخت + تضمین رجیستری</p>`;
const address = `<p class="t-offer__address">ولیعصر، حافظ . ۱ کیلومتر</p>`;
const perks = (fast) => `<div class="t-offer__row"><span class="t-offer__perks"><button class="t-perk" aria-expanded="false">${ticon('delivery--free')}ارسال رایگان${fast ? `${ticon('delivery--fast')}ارسال فوری` : ''}${ticon('chevron-tiny--down', 't-icon t-icon--tiny')}</button><span class="t-perk"><span class="t-bidi" dir="ltr">+۲</span></span></span><button class="t-btn t-btn--xs t-btn--filter">${ticon('report')}گزارش</button></div>`;
const priceLg = `<span class="t-price t-price--lg"><span class="t-price__value">۱۵٫۸۰۰٫۰۰۰</span><span class="t-price__unit">تومان</span></span>`;
const priceXl = `<span class="t-price t-price--xl"><span class="t-price__value">۱۵٫۸۰۰٫۰۰۰</span><span class="t-price__unit">تومان</span></span>`;
const splitBtn = (fam, label, iconName) => `<div class="t-btn-split"><button class="t-btn t-btn--${fam}">${icon(iconName)}${label}</button><button class="t-btn t-btn--${fam} t-btn-split__more" aria-label="گزینه‌های دیگر">${icon('chevron--down')}</button></div>`;
add('6867FED2-4D53-4C52-AD54-C93776F8E53B', `<article class="t-offer" style="inline-size:380px"><div class="t-offer__top"><div class="t-offer__head">${seller()}${priceLg}</div>${note}</div>${perks(true)}<div class="t-offer__row"><button class="t-btn t-btn--red">${icon('shopping--cart')}برو به سایت</button>${rating}</div></article>`);
add('262C26ED-53BA-4CD8-B2C4-00322D945A1F', `<article class="t-offer" style="inline-size:380px"><div class="t-offer__top"><div class="t-offer__head">${seller()}${priceLg}</div>${note}${address}</div>${perks(true)}<div class="t-offer__row">${splitBtn('blue', 'ارتباط با فروشگاه', 'shopping--cart')}${rating}</div></article>`);
add('C1BF73E9-DD90-4643-9141-D246A3347492', `<article class="t-offer" style="inline-size:380px"><div class="t-offer__top"><div class="t-offer__head">${seller()}${rating}</div>${note}${address}</div>${perks(false)}<div class="t-offer__row">${splitBtn('red', 'برو به سایت', 'shopping--cart')}${priceXl}</div></article>`);

export const SPECIMENS = S;
