import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { section, table, esc } from './site-lib.mjs';
import { SYMBOL_CODE, KIND_FA, KIND_NOTE } from '../source/sketch/symbol-code.mjs';

const FA = '۰۱۲۳۴۵۶۷۸۹';
const toFa = n => String(n).replace(/[0-9]/g, d => FA[+d]);
/* A size is a bidi-neutral run: dropped into a Persian sentence the browser
   reorders it and ۳۴۳×۷۲ is read back as ۷۲×۳۴۳. */
const dim = (w, h) => `<span class="t-bidi" dir="ltr">${toFa(w)}×${toFa(h)}</span>`;
/* num() emits markup, so it is for text nodes only — never an attribute.
   Inside placeholder="…" the span would close the tag and break the input. */
const num = n => `<span class="t-bidi" dir="ltr">${toFa(n)}</span>`;

/* The family a symbol belongs to, from its own name. */
const familyOf = name => {
  const head = name.replace(/‌/g, '').split('/')[0].trim();
  if (/^Button$/i.test(head)) return 'Button';
  if (/^Store-Card$/i.test(head)) return 'Store-Card';
  if (/^Product/i.test(head)) return 'Product';
  if (/^(POI|Pin|Open Pin|Close Pin)$/i.test(head)) return 'Map';
  if (/^(Torob_Logo|Torob star hologram|Brand|Social-Icons)$/i.test(head)) return 'Brand';
  if (/^(Search bar|Switch)$/i.test(head)) return 'Inputs';
  if (/^(Tab|List|Header|Segmented Controls)$/i.test(head)) return 'Navigation';
  return head;
};
const FAMILY_FA = {
  Button: 'دکمه', Badge: 'نشان', Filter: 'فیلتر', Product: 'محصول',
  'Store-Card': 'کارت فروشگاه', Map: 'نقشه', Brand: 'برند',
  Inputs: 'ورودی', Navigation: 'ناوبری',
};

export function symbolsPage(components) {
  const spec = JSON.parse(readFileSync(join(ROOT, 'source/sketch/symbols.json'), 'utf8'));
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };

  const norm = s => s.replace(/‌/g, '').replace(/\s*\/\s*/g, '/').toLowerCase().trim();
  const owner = new Map();
  for (const c of components) for (const l of c.legacy ?? []) owner.set(norm(l), c);

  const rows = spec.symbols.map(s => ({
    s, c: owner.get(norm(s.name)), m: SYMBOL_CODE[s.name], family: familyOf(s.name),
  }));
  const families = [...new Set(rows.map(r => r.family))].sort((a, b) => a.localeCompare(b, 'en'));
  const kinds = {};
  for (const r of rows) kinds[r.m.kind] = (kinds[r.m.kind] ?? 0) + 1;
  const componentsHit = new Set(rows.map(r => r.c?.slug)).size;

  let body = `<div class="prose">
    <p>صفحهٔ <strong>Components</strong> در فایل <code>Torob Tokens.sketch</code> ${num(spec.masters)} مستر سیمبل دارد که ${num(spec.unique)} نام یکتا می‌سازند. هر ${num(spec.unique)} نام اینجا هست، با اندازهٔ اندازه‌گیری‌شده و کدی که جایش را گرفته. هیچ سیمبلی بدون کد نیست — این را <code>build/sketch-coverage.mjs</code> در هر ساخت بررسی می‌کند و اگر سیمبلی صاحب نداشته باشد، ساخت شکست می‌خورد.</p>
    <p>اعداد این صفحه <strong>حدس نیستند</strong>. <code>build/sketch-extract.mjs</code> فایل اسکچ را باز می‌کند و هندسه را بیرون می‌کشد؛ جاهایی هم که فایل با خودش نمی‌خواند، خروجی رندرِ خودِ اسکچ اندازه‌گیری شده است.</p>
  </div>`;

  body += S('trap', 'دامی که در فایل هست', `<div class="prose">
    <p>گردی گوشه در فایل اسکچ <strong>سه جا</strong> ذخیره می‌شود و فقط یکی از آنها معتبر است. خواندن از فیلد اشتباه، کل سیستم را روی عدد غلط بنا می‌کند.</p></div>
    ${table(['فیلد', 'چیست', 'اعتبار'], [
      ['<code>style.corners.radii</code>', 'گردی یک قاب — آرت‌بورد، سیمبل، گروه.', '<strong>معتبر</strong>'],
      ['<code>points[].cornerRadius</code>', 'گردی یک شکل.', '<strong>معتبر</strong>'],
      ['<code>fixedRadius</code>', 'آینهٔ قدیمی همان مقدار.', 'اغلب کهنه'],
    ])}
    <div class="prose"><p>روی سیمبل <code>Button / Red / Default</code> فیلد <code>fixedRadius</code> عدد ۸ را نگه داشته و <code>points[].cornerRadius</code> عدد ۱۲ را. اسکچ ۱۲ را می‌کشد. اگر اول <code>fixedRadius</code> را بخوانید، به این نتیجه می‌رسید که کل کیت روی گردی ۸ بنا شده — که نیست. برای همین ترتیب خواندن در استخراج‌گر صریح نوشته شده و با اندازه‌گیری روی خروجی رندر اسکچ راستی‌آزمایی شده است.</p></div>
    ${table(['سیمبل', '<code>fixedRadius</code>', 'مقدار واقعی', 'اندازه‌گیری از رندر'], [
      ['<code>Button / Red / Default</code>', num(8), '<strong>' + num(12) + '</strong>', num(12.1)],
      ['<code>Button/Icon/Icon</code>', num(8), '<strong>' + num(12) + '</strong>', num(12.4)],
      ['<code>Button/Buy box/Ad</code>', num(8), '<strong>' + num(16) + '</strong>', num(15.7)],
      ['<code>Button / Blue /split</code>', '—', '<strong>' + num(12) + '</strong>', num(12.1)],
    ])}
    <div class="note"><strong>گوشه‌ها در اسکچ صاف‌شده‌اند.</strong> هر قاب <code>smoothing: ۰٫۶</code> دارد — یعنی گوشه یک اسکویرکل است، نه کمان دایره. CSS هنوز معادل قابل‌اتکایی برای این ندارد، پس اینجا ثبت شده و بازتولید نشده. تفاوتش در اندازه‌های کوچک زیر آستانهٔ ادراک است و در سطوح بزرگ کمی تیزتر دیده می‌شود.</div>`);

  body += S('kinds', 'هر سیمبل چه می‌شود', `<div class="prose">
    <p>${num(spec.unique)} سیمبل روی ${num(componentsHit)} کامپوننت می‌نشینند. تفاوت اینجاست که بیش از نیمی از آنها اصلاً کامپوننت نبودند.</p></div>
    ${table(['دسته', 'تعداد', 'یعنی'], Object.entries(kinds).sort((a, b) => b[1] - a[1]).map(([k, n]) =>
      [`<strong>${KIND_FA[k]}</strong>`, num(n), KIND_NOTE[k]]))}`);

  const kindChip = k => `<span class="sym-kind" data-kind="${k}">${KIND_FA[k]}</span>`;
  const rowHtml = r => {
    const { s, c, m } = r;
    /* "4 / 12" is a bidi-neutral run; unisolated it reads back as "12 / 4". */
    const pad = s.padding
      ? `<span class="t-bidi" dir="ltr">${toFa(s.padding.top)} / ${toFa(s.padding.start)}</span>`
      : '—';
    return `<tr data-k="${esc((s.name + ' ' + (c?.name ?? '') + ' ' + m.code + ' ' + KIND_FA[m.kind]).toLowerCase())}">
      <td><span class="legacy">${esc(s.name)}</span> ${kindChip(m.kind)}</td>
      <td class="t-num">${dim(s.width, s.height)}</td>
      <td class="t-num">${s.radius ? num(s.radius) : '—'}</td>
      <td class="t-num">${pad}</td>
      <td>${c ? `<a href="components/${c.slug}.html" style="font-weight:600">${esc(c.name)}</a>` : '—'}</td>
      <td><code>${esc(m.code)}</code></td>
    </tr>`;
  };

  body += S('index', 'فهرست کامل', `<div class="wide">
    <div class="site-search" style="max-inline-size:none;margin-block-end:12px">
      <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5	C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"/></svg>
      <input id="symSearch" type="search" placeholder="جست‌وجو در ${toFa(spec.unique)} سیمبل…" autocomplete="off" aria-controls="symTable">
    </div>
    <div class="tbl-wrap"><table class="tbl" id="symTable">
      <thead><tr>
        <th scope="col">سیمبل در اسکچ</th><th scope="col">اندازه</th><th scope="col">گردی</th>
        <th scope="col">فاصله<br><span class="t-body-sm t-tone-secondary">بالا / ابتدا</span></th>
        <th scope="col">کامپوننت</th><th scope="col">کد</th>
      </tr></thead>
      ${families.map(f => `<tbody data-family="${esc(f)}">
        <tr class="sym-group"><th colspan="6" scope="colgroup">${esc(FAMILY_FA[f] ?? f)}<span class="t-tone-secondary" style="font-weight:400"> · ${num(rows.filter(r => r.family === f).length)}</span></th></tr>
        ${rows.filter(r => r.family === f).sort((a, b) => a.s.name.localeCompare(b.s.name, 'en')).map(rowHtml).join('')}
      </tbody>`).join('')}
    </table></div>
    <p id="symEmpty" class="t-tone-secondary" hidden style="padding-block:16px">چیزی پیدا نشد.</p>
  </div>
  <script>(function(){
    var i=document.getElementById('symSearch'), tbl=document.getElementById('symTable');
    var empty=document.getElementById('symEmpty');
    var rows=[].slice.call(tbl.querySelectorAll('tr[data-k]'));
    var heads=[].slice.call(tbl.querySelectorAll('tbody'));
    var t; i.addEventListener('input', function(){ clearTimeout(t); t=setTimeout(function(){
      var q=i.value.toLowerCase().trim(), n=0;
      rows.forEach(function(r){ var hit=!q||r.dataset.k.indexOf(q)>=0; r.hidden=!hit; if(hit)n++; });
      heads.forEach(function(b){
        var any=[].slice.call(b.querySelectorAll('tr[data-k]')).some(function(r){return !r.hidden;});
        b.hidden=!any;
      });
      empty.hidden=n>0;
    },90); });
  })();</script>`);

  body += S('source', 'ناسازگاری‌های منبع', `<div class="prose">
    <p>چیزهایی که هنگام تجزیه پیدا شدند و بهتر است در خود فایل اسکچ اصلاح شوند، نه اینجا.</p></div>
    ${table(['یافته', 'جزئیات'], [
      [`<strong>${toFa(spec.duplicateNames.length)} نام تکراری</strong>`, `${toFa(spec.masters)} مستر با ${toFa(spec.unique)} نام یکتا. <code>Segmented Controls/Selected</code> چهار بار وجود دارد، با دو اندازهٔ متفاوت (${dim(38, 32)} و ${dim(395, 64)}) زیر یک نام.`],
      ['<strong>نیم‌فاصلهٔ نامرئی در نام سیمبل</strong>', '<code dir="ltr">Button/‌Blue/…</code> نویسهٔ U+200C دارد. در اسکچ دیده نمی‌شود و هر تولید کدی را که به نام تکیه کند بی‌صدا می‌شکند. مقایسه‌ها در این سیستم روی شکل نرمال‌شده انجام می‌شوند.'],
      ['<strong>لبهٔ دکمهٔ دونیمه‌ای دو جور است</strong>', `قرمز لبهٔ ${num(1)} پیکسلی بیرونی روی کل کنترل دارد، آبی فقط روی نیمهٔ دوم و درونی. در کد هر دو یکسان رفتار می‌کنند.`],
      ['<strong>قرمز لوگو، قرمز برند نیست</strong>', 'نشان با <code dir="ltr">#E91E33</code> کشیده شده، توکن برند <code dir="ltr">#D73948</code> است.'],
      ['<strong>دو خانوادهٔ فونت در یک کیت</strong>', '<code>Button/Buy box/Cheapest</code> از <code>IRANYekan-Bold</code> استفاده می‌کند و بقیه از <code>IRANYekanX</code>.'],
      ['<strong>نام لایه‌ها کهنه‌اند</strong>', 'داخل <code>Button / Red /split</code> هر دو آیکون <code>Icon / 24px / call</code> نام دارند، ولی اسکچ یک سبد خرید و یک شورون می‌کشد. نام لایه بعد از کپی به‌روز نشده — به همین دلیل آیکون‌ها از رندر خوانده شدند، نه از نام.'],
      ['<strong>فاصلهٔ داخلی ناهماهنگ</strong>', `دکمهٔ پرشده ${num(12)} پیکسل فاصلهٔ افقی دارد و دکمهٔ خط‌دار ${num(15)} — احتمالاً برای جبران لبهٔ ${num(1)} پیکسلی، ولی ${num(15)}+${num(1)} می‌شود ${num(16)}، نه ${num(12)}.`],
    ])}`);

  return {
    body, toc, title: 'فهرست سیمبل‌ها',
    description: `هر ${toFa(spec.unique)} سیمبل کیت اسکچ، با اندازه و کدی که جایش را گرفت.`,
    eyebrow: 'مرور کلی',
  };
}
