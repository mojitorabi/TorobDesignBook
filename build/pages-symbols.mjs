/* The symbols gallery: every master on the Sketch Components page, rebuilt
   from system classes, shown next to Sketch's own export with a match score.

   Four ways to look at each one:
     کد        the live HTML render (default)
     اسکچ      the exact-frame @2x export from Sketch
     روی هم    Sketch over code at 50%, for alignment
     تفاوت     difference blend — black where they agree

   Scores come from build/dev/pixel-diff.mjs (source/sketch/match.json). */
import { readFileSync, existsSync } from 'node:fs';
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
  const matchFile = join(ROOT, 'source/sketch/match.json');
  const match = existsSync(matchFile) ? JSON.parse(readFileSync(matchFile, 'utf8')) : {};
  const norm = s => s.replace(/‌/g, '').replace(/\s*\/\s*/g, '/').toLowerCase().trim();
  const owner = new Map();
  for (const c of components) for (const l of c.legacy ?? []) owner.set(norm(l), c);

  const rows = spec.symbols.map(s => ({ s, c: owner.get(norm(s.name)), code: SYMBOL_CODE[s.name]?.code ?? '', sp: SPECIMENS[s.id], m: match[s.id], notes: NOTES[s.id] ?? [], family: familyOf(s.name) }));
  const scored = rows.filter(r => r.m);
  const mean = scored.reduce((a, r) => a + r.m.score, 0) / (scored.length || 1);
  const high = scored.filter(r => r.m.score >= 95).length;
  const sized = scored.filter(r => r.m.sizeOk).length;
  const noted = rows.filter(r => r.notes.length).length;

  const toc = [];
  const S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };

  let body = `<div class="prose">
    <p>هر ${num(spec.masters)} مستر صفحهٔ <strong>Components</strong> در فایل اسکچ، اینجا از کلاس‌های همین سیستم ساخته شده است. کنار هر کدام خروجی خود اسکچ هست تا بتوانید با چشم خودتان مقایسه کنید.</p>
  </div>
  <div class="sym-stats">
    <div><strong>${num(spec.masters)}</strong><span>سیمبل از کد</span></div>
    <div><strong>${num(Math.round(mean * 10) / 10)}٪</strong><span>میانگین تطابق</span></div>
    <div><strong>${num(high)}</strong><span>بالای ۹۵٪</span></div>
    <div><strong>${num(sized)}</strong><span>اندازهٔ دقیق</span></div>
  </div>`;

  const scoreLevel = s => s >= 95 ? 'high' : s >= 90 ? 'mid' : 'low';
  let n = 0;
  const card = r => {
    const { s, c, sp, m } = r;
    const id = `sym${++n}`;
    const theme = sp?.theme ?? 'light';
    const wide = s.width > 240;
    const html = sp ? uniqueIds(sp.html, id) : '';
    const notes = r.notes.map(([k, t]) => `<li data-tone="${KIND[k].tone}"><strong>${KIND[k].fa}.</strong> ${t}</li>`).join('');
    return `<article class="sym${wide ? ' sym--wide' : ''}" id="${id}" data-family="${r.family}" data-k="${esc((s.label + ' ' + (c?.name ?? '') + ' ' + r.code).toLowerCase())}">
  <div class="sym__stage" data-theme="${theme}">
    <div class="sym__frame" style="--w:${s.width}px;--h:${s.height}px">
      <div class="sym__code" dir="rtl" lang="fa">${html}</div>
      <img class="sym__sketch" src="%ASSETS%/sketch/${s.id}.png" width="${s.width}" height="${s.height}" alt="${esc(s.label)} در اسکچ" loading="lazy" decoding="async">
    </div>
  </div>
  <div class="sym__meta">
    <div class="sym__line">
      <span class="sym__old" dir="ltr">${esc(s.label)}</span>
      ${m ? `<span class="sym__score" data-level="${scoreLevel(m.score)}" title="سهم پیکسل‌های هم‌رنگ با خروجی اسکچ">${num(m.score)}٪</span>` : ''}
    </div>
    <div class="sym__line sym__line--sub">
      ${c ? `<a class="sym__new" href="components/${c.slug}.html">${esc(c.name)}</a>` : ''}
      <code class="sym__class" dir="ltr">${esc(r.code)}</code>
    </div>
    <div class="sym__line sym__line--foot">
      <span class="sym__size">${dim(s.width, s.height)}</span>
      ${notes ? `<details class="sym__notes"><summary>${num(r.notes.length)} یادداشت</summary><ul>${notes}</ul></details>` : ''}
      <button class="sym__copy" data-sym-copy title="کپی HTML همین سیمبل">کپی HTML</button>
    </div>
  </div>
</article>`;
  };

  body += `<div class="sym-bar" role="toolbar" aria-label="نمایش سیمبل‌ها">
    <div class="t-segmented" role="radiogroup" aria-label="حالت نمایش" id="symMode">
      <button class="t-segmented__item" role="radio" aria-checked="true" data-mode="code">کد</button>
      <button class="t-segmented__item" role="radio" aria-checked="false" data-mode="sketch">اسکچ</button>
      <button class="t-segmented__item" role="radio" aria-checked="false" data-mode="overlay">روی هم</button>
      <button class="t-segmented__item" role="radio" aria-checked="false" data-mode="diff">تفاوت</button>
    </div>
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

  body += S('how', 'امتیاز چطور حساب می‌شود', `<div class="prose">
    <p>هر سیمبل با همان اندازهٔ مستر و در چگالی ۲ برابر رندر می‌شود و با خروجی اسکچ (با قاب دقیق) پیکسل به پیکسل مقایسه می‌شود. امتیاز، سهم پیکسل‌های محتوایی است که رنگشان با اسکچ یکی است؛ جابه‌جایی یک پیکسل دستگاهی در لبه‌ها بخشیده می‌شود، چون موتور متن اسکچ و مرورگر هیچ‌وقت لبهٔ حروف را یکسان نمی‌کشند. برای همین سیمبل‌های پرمتن به ۱۰۰ نمی‌رسند.</p>
    <p>${num(noted)} سیمبل یادداشت دارند: جاهایی که کد عمداً با اسکچ فرق دارد، چون اسکچ با خودش نمی‌خواند، دسترس‌پذیری را رد می‌کند، فونت یا آیکون غیرمجاز دارد، یا نمونه‌اش کش آمده است. هر یادداشت پیشنهادی برای اصلاح در خود فایل اسکچ است.</p>
    <p>برای ساختن دوباره: <code>node build/dev/pixel-diff.mjs</code> (به Playwright نیاز دارد) و خروجی‌های مرجع با برش هم‌اندازهٔ هر مستر از خود اسکچ گرفته می‌شوند.</p>
  </div>`);

  body += `<script>(function(){
  var mode=document.getElementById('symMode'), root=document.querySelector('main');
  mode.addEventListener('click',function(e){var b=e.target.closest('[data-mode]'); if(!b)return;
    mode.querySelectorAll('[data-mode]').forEach(function(x){x.setAttribute('aria-checked', x===b?'true':'false');});
    root.setAttribute('data-sym-mode', b.dataset.mode);});
  mode.addEventListener('keydown',function(e){var d={ArrowLeft:1,ArrowRight:-1}[e.key]; if(!d)return; e.preventDefault();
    var all=[].slice.call(mode.querySelectorAll('[data-mode]')), i=all.findIndex(function(x){return x.getAttribute('aria-checked')==='true';});
    var n=all[(i+d+all.length)%all.length]; n.focus(); n.click();});
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
    description: `هر ${toFa(spec.masters)} سیمبل کیت، ساخته‌شده از کد، کنار خروجی اسکچ با درصد تطابق.`,
    eyebrow: 'مرور کلی',
  };
}
