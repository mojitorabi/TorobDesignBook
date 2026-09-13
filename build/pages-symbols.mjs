/* The symbols gallery: every master on the Sketch Components page, rebuilt
   from system classes.

   One card per master, showing the finished component and the two names it
   answers to — the old Sketch name and the standard name in this system.
   The old exports and the pixel scores are a build-time check
   (build/dev/pixel-diff.mjs), not something a reader needs to look at. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { section, esc, uniqueIds } from './site-lib.mjs';
import { SYMBOL_CODE } from '../source/sketch/symbol-code.mjs';
import { SPECIMENS } from '../source/sketch/specimens.mjs';
import { NOTES, KIND } from '../source/sketch/notes.mjs';

const FA = '۰۱۲۳۴۵۶۷۸۹';
const toFa = n => String(n).replace(/[0-9]/g, d => FA[+d]).replace('.', '٫');
const num = n => `<span class="t-bidi" dir="ltr">${toFa(n)}</span>`;
const dim = (w, h) => `<span class="t-bidi" dir="ltr">${toFa(w)}×${toFa(h)}</span>`;

const familyOf = name => {
  const head = name.replace(/‌/g, '').split('/')[0].trim();
  if (/^Button$/i.test(head)) return 'Button';
  if (/^Store-Card$/i.test(head)) return 'Store';
  if (/^Product/i.test(head)) return 'Product';
  if (/^(POI|Pin|Open Pin|Close Pin)$/i.test(head)) return 'Map';
  if (/^(Torob_Logo|Torob star hologram|Brand)$/i.test(head)) return 'Brand';
  if (/^(Search bar|List|Header)$/i.test(head)) return 'Inputs';
  if (/^(Segmented Controls|Tab|Switch|Filter)$/i.test(head)) return 'Chips';
  return head;
};
const FAMILY_FA = { Button: 'دکمه', Badge: 'نشان', Chips: 'قرص و انتخابگر', Inputs: 'جست‌وجو، فهرست، سرتیتر', Map: 'نقشه', Product: 'محصول', Store: 'فروشگاه و پیشنهاد', Brand: 'برند' };
const ORDER = ['Button', 'Badge', 'Chips', 'Inputs', 'Map', 'Product', 'Store', 'Brand'];

export function symbolsPage(components) {
  const spec = JSON.parse(readFileSync(join(ROOT, 'source/sketch/symbols.json'), 'utf8'));
  const norm = s => s.replace(/‌/g, '').replace(/\s*\/\s*/g, '/').toLowerCase().trim();
  const owner = new Map();
  for (const c of components) for (const l of c.legacy ?? []) owner.set(norm(l), c);

  const rows = spec.symbols.map(s => ({ s, c: owner.get(norm(s.name)), code: SYMBOL_CODE[s.name]?.code ?? '', sp: SPECIMENS[s.id], notes: NOTES[s.id] ?? [], family: familyOf(s.name) }));
  const noted = rows.filter(r => r.notes.length).length;

  const toc = [];
  const S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };

  let body = `<div class="prose">
    <p>آنچه می‌بینید کد است، نه تصویر اسکچ. زیر هر کارت، نام استاندارد تازه و نام قدیمی همان سیمبل آمده تا بدانید هر چیزی حالا کجاست.</p>
  </div>`;

  let n = 0;
  const card = r => {
    const { s, c, sp } = r;
    const id = `sym${++n}`;
    const theme = sp?.theme ?? 'light';
    const wide = s.width > 240;
    const html = sp ? uniqueIds(sp.html, id) : '';
    const notes = r.notes.map(([k, t]) => `<li data-tone="${KIND[k].tone}"><strong>${KIND[k].fa}.</strong> ${t}</li>`).join('');
    return `<article class="sym${wide ? ' sym--wide' : ''}" id="${id}" data-family="${r.family}" data-k="${esc((s.label + ' ' + (c?.name ?? '') + ' ' + r.code).toLowerCase())}">
  <div class="sym__stage" data-theme="${theme}">
    <div class="sym__frame" style="--w:${s.width}px;--h:${s.height}px">
      <div class="sym__code" dir="rtl" lang="fa">${html}</div>
    </div>
  </div>
  <div class="sym__meta">
    <div class="sym__line">
      ${c ? `<a class="sym__new" href="components/${c.slug}.html">${esc(c.name)}</a>` : '<span class="sym__new sym__new--none">بدون کامپوننت متناظر</span>'}
      <span class="sym__size">${dim(s.width, s.height)}</span>
    </div>
    <div class="sym__line sym__line--sub">
      <span class="sym__was">قبلاً</span>
      <span class="sym__old" dir="ltr">${esc(s.label)}</span>
    </div>
    <div class="sym__line sym__line--foot">
      <code class="sym__class" dir="ltr">${esc(r.code)}</code>
      <button class="sym__copy" data-sym-copy title="کپی HTML همین سیمبل">کپی HTML</button>
      ${notes ? `<details class="sym__notes"><summary>${num(r.notes.length)} تفاوت عمدی با اسکچ</summary><ul>${notes}</ul></details>` : ''}
    </div>
  </div>
</article>`;
  };

  body += `<div class="sym-bar">
    <div class="t-search sym-bar__search" data-state="default"><div class="t-input"><input class="t-input__el" type="search" id="symSearch" placeholder="جست‌وجوی نام قدیمی یا جدید…" aria-label="جست‌وجوی سیمبل" autocomplete="off"></div></div>
  </div>
  <div class="t-chip-group sym-families" role="group" aria-label="خانواده" id="symFam">
    <button class="t-choice" aria-pressed="true" data-fam="">همه</button>
    ${ORDER.map(f => `<button class="t-choice" aria-pressed="false" data-fam="${f}">${FAMILY_FA[f]} <span class="t-bidi" dir="ltr">${toFa(rows.filter(r => r.family === f).length)}</span></button>`).join('')}
  </div>`;

  for (const f of ORDER) {
    const list = rows.filter(r => r.family === f).sort((a, b) => a.s.label.localeCompare(b.s.label, 'en'));
    if (!list.length) continue;
    /* Not section(): its .prose wrapper would style the specimens' own
       paragraphs and links. */
    const hid = `f-${f.toLowerCase()}`;
    toc.push({ id: hid, label: FAMILY_FA[f] });
    body += `<section class="sym-section"><h2 id="${hid}" class="sym-section__title">${FAMILY_FA[f]}</h2><div class="sym-grid" data-group="${f}">${list.map(card).join('')}</div></section>`;
  }
  body += `<p id="symEmpty" class="t-tone-secondary" hidden>چیزی پیدا نشد.</p>`;

  body += S('how', 'این صفحه چطور ساخته می‌شود', `<div class="prose">
    <p>هیچ‌کدام از این کارت‌ها تصویر نیستند. همه با همان HTML و همان کلاس‌هایی ساخته شده‌اند که در محصول استفاده می‌کنید؛ روی هر کدام «کپی HTML» بزنید و همان را بردارید.</p>
    <p>درستی هندسه در زمان ساخت بررسی می‌شود: هر سیمبل با اندازهٔ مستر رندر و پیکسل به پیکسل با خروجی خود اسکچ مقایسه می‌شود (<code>node build/dev/pixel-diff.mjs</code>). این کار بیرون از صفحه انجام می‌شود تا چیزی که شما می‌بینید فقط نسخهٔ نهایی باشد.</p>
    <p>${num(noted)} سیمبل «تفاوت عمدی» دارند: جایی که کد از قصد با اسکچ فرق می‌کند، چون اسکچ با خودش نمی‌خواند، دسترس‌پذیری را رد می‌کند، فونت یا آیکون غیرمجاز دارد، یا نمونه‌اش کش آمده است. هر کدام پیشنهادی برای اصلاح فایل اسکچ است.</p>
  </div>`);

  body += `<script>(function(){
  var q=document.getElementById('symSearch'), fam=document.getElementById('symFam'), cur='', empty=document.getElementById('symEmpty');
  var cards=[].slice.call(document.querySelectorAll('.sym'));
  function apply(){var t=q.value.trim().toLowerCase(), shown=0;
    cards.forEach(function(c){var ok=(!cur||c.dataset.family===cur)&&(!t||c.dataset.k.indexOf(t)>=0); c.hidden=!ok; if(ok)shown++;});
    document.querySelectorAll('.sym-grid').forEach(function(g){var s=g.closest('section'); if(s) s.hidden=![].some.call(g.children,function(c){return !c.hidden;});});
    empty.hidden=shown>0;}
  q.addEventListener('input',apply);
  document.addEventListener('click',function(e){var b=e.target.closest('[data-sym-copy]'); if(!b)return;
    var src=b.closest('.sym').querySelector('.sym__code').innerHTML.trim(), was=b.textContent;
    (navigator.clipboard?navigator.clipboard.writeText(src):Promise.reject()).then(function(){b.textContent='کپی شد';setTimeout(function(){b.textContent=was;},1400);},function(){b.textContent='⌘C';});});
  fam.addEventListener('click',function(e){var b=e.target.closest('[data-fam]'); if(!b)return; cur=b.dataset.fam;
    fam.querySelectorAll('[data-fam]').forEach(function(x){x.setAttribute('aria-pressed', x===b?'true':'false');}); apply();});
})();</script>`;

  return {
    body, toc, title: 'سیمبل‌های اسکچ',
    description: `هر ${toFa(spec.masters)} سیمبل کیت، ساخته‌شده از کد، با نام قدیمی و نام استاندارد جدیدش.`,
    eyebrow: 'مرور کلی',
  };
}
