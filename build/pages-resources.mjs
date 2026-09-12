import { specimen, section, table, guidance, esc, toFa } from './site-lib.mjs';
import { getFacts } from './facts.mjs';


/* ─────────────────────────── ICONS ─────────────────────────── */
export function iconsPage(cats, count) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const catList = Object.entries(cats).sort((a, b) => Object.values(b[1]).reduce((x, y) => x + y, 0) - Object.values(a[1]).reduce((x, y) => x + y, 0));

  let body = `<div class="prose">
    <p><strong>${toFa(count.toLocaleString('en-US'))} آیکون</strong> در اندازه‌های ۱۶ و ۲۰ پیکسل، از IBM Carbon — دقیقاً همان مجموعه‌ای که در <code>T IBM Icons (16px, 20px).sketch</code> هست و با نام در برابر Carbon 11.88 تطبیق داده شده.</p>
    <p>بر پایهٔ نام، نام مستعار یا دسته جست‌وجو کنید. روی هر آیکون کلیک کنید تا نامش کپی شود؛ با کلید اندازه بین دو اندازهٔ عرضه‌شده جابه‌جا شوید.</p>
  </div>

  <div class="wide" style="margin-block:22px">
    <div style="display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-block-end:14px">
      <div class="site-search" style="flex:1;min-inline-size:220px;max-inline-size:none">
        <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5	C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"/></svg>
        <input id="iconSearch" type="search" aria-label="جست‌وجوی آیکون" placeholder="Search ${count.toLocaleString('en-US')} icons — try “filter”, “location”, “receipt”…" autocomplete="off">
      </div>
      <button class="site-tool" id="iconSize" data-size="20">20px</button>
      <select class="site-tool" id="iconCat" aria-label="دستهٔ آیکون" style="padding-inline:10px">
        <option value="">همهٔ دسته‌ها</option>
        ${catList.map(([c, subs]) => `<option value="${esc(c)}">${esc(c)} (${Object.values(subs).reduce((x, y) => x + y, 0)})</option>`).join('')}
      </select>
      <span class="t-body-sm t-tone-secondary" id="iconCount"></span>
    </div>
    <div id="iconGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:5px"></div>
    <div id="iconMore" style="text-align:center;margin-block-start:18px"></div>
  </div>`;

  body += S('rtl', 'جهت', `<div class="prose">
      <p>کربن برای آیکون‌هایی که معنایشان به جهت خواندن وابسته است نسخهٔ <code>--mirror</code> عمداً کشیده‌شده دارد. هرجا چنین نسخه‌ای هست، در راست‌چین همان را رندر کنید به‌جای چرخش CSS؛ ترنسفورم هر نشانه‌ای را هم که داخل آیکون کشیده شده برمی‌گرداند.</p>
      <p>پنج آیکون در این مجموعه نسخهٔ قرینه دارند: <code>search--locate</code>، <code>run</code>، <code>list--checked</code>، <code>list--numbered</code> و <code>summary--KPI</code>. شورون‌ها و فلش‌ها نسخهٔ قرینه ندارند و به‌جایش از <code>.t-icon--directional</code> استفاده می‌کنند. بقیه — دوربین، قلب، تلفن — نباید برگردند.</p>
    </div>`);

  body += S('usage', 'استفاده از آیکون', `${specimen({ label: 'سه راه استفاده', canvas: 'plain', dir: 'ltr', html: `<pre class="code" style="inline-size:100%;background:var(--t-bg-sunken);border-radius:10px"><code>&lt;!-- 1. Sprite — one request, any icon --&gt;
&lt;svg class="t-icon"&gt;&lt;use href="/assets/sprite-20.svg#t-filter"/&gt;&lt;/svg&gt;

&lt;!-- 2. Inline — when you need to style the paths --&gt;
&lt;svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"&gt;…&lt;/svg&gt;

&lt;!-- 3. React --&gt;
import { Filter } from '@torob/icons';
&lt;Filter size={20} /&gt;</code></pre>` })}
    ${guidance([
      'اندازه را با <code>.t-icon</code> (۲۰ پیکسل)، <code>--sm</code> (۱۶ پیکسل) یا <code>--lg</code> (۲۴ پیکسل) بدهید. فقط ۱۶ و ۲۰ کشیده شده‌اند؛ ۲۴ یک مقیاس است.',
      'بگذارید آیکون‌ها <code>currentColor</code> را به ارث ببرند تا حالت ظرفشان را دنبال کنند.',
      '<code>.t-icon--directional</code> را به شورون‌ها و فلش‌ها اضافه کنید.',
      'به آیکون مستقل نام دسترس‌پذیر بدهید؛ آیکون تزئینی را <code>aria-hidden</code> کنید.',
    ], [
      'ترکیب ۱۶ و ۲۰ در یک ردیف؛ وزن بصری‌شان فرق دارد.',
      'رنگ‌کردن جداگانهٔ مسیرهای یک آیکون. هر آیکون یک رنگ.',
      'قرینه‌کردن آیکون‌های غیرجهت‌دار در راست‌چین.',
      'آیکون در اندازه‌ای غیر از ۱۶، ۲۰ یا ۲۴. هینتینگ کربن برای همین اندازه‌ها کشیده شده.',
    ])}`);

  body += `<script>(function(){
  var grid=document.getElementById('iconGrid'), input=document.getElementById('iconSearch'),
      sizeBtn=document.getElementById('iconSize'), catSel=document.getElementById('iconCat'),
      countEl=document.getElementById('iconCount'), moreEl=document.getElementById('iconMore');
  var idx=null, geo=null, size=20, shown=0, filtered=[], PAGE=180;
  var root=(document.querySelector('link[href$="assets/site.css"]')||{}).href.replace(/site\\.css$/,'');

  function cell(it){
    var g=geo&&geo[it.n]&&geo[it.n].sizes[size];
    return '<button class="swatch" data-copy-text="'+it.n+'" title="'+it.n+'" style="padding:11px 6px;display:flex;flex-direction:column;align-items:center;gap:7px;border-radius:9px">'
      +(g?'<svg viewBox="'+g.viewBox+'" width="'+size+'" height="'+size+'" fill="currentColor" style="color:var(--t-fg-default)">'+g.content+'</svg>':'<span style="inline-size:'+size+'px;block-size:'+size+'px"></span>')
      +'<span style="font-size:9.5px;line-height:1.3;color:var(--t-fg-secondary);word-break:break-word;text-align:center;max-inline-size:86px">'+it.n+'</span></button>';
  }
  function renderMore(){
    var next=filtered.slice(shown, shown+PAGE);
    grid.insertAdjacentHTML('beforeend', next.map(cell).join(''));
    shown+=next.length;
    moreEl.innerHTML = shown<filtered.length
      ? '<button class="t-btn t-btn--outline t-btn--md" id="iconMoreBtn">Show '+Math.min(PAGE,filtered.length-shown)+' more of '+(filtered.length-shown)+'</button>' : '';
    var b=document.getElementById('iconMoreBtn'); if(b) b.onclick=renderMore;
  }
  function apply(){
    var q=(input.value||'').toLowerCase().trim(), c=catSel.value;
    filtered=idx.filter(function(it){
      if(c && it.c!==c) return false;
      if(!q) return true;
      return (it.n+' '+it.f+' '+it.s+' '+(it.a||[]).join(' ')).toLowerCase().indexOf(q)>=0;
    });
    countEl.textContent=filtered.length.toLocaleString('fa-IR')+' آیکون';
    grid.innerHTML=''; shown=0; renderMore();
  }
  Promise.all([fetch(root+'icons-index.json').then(function(r){return r.json()}),
               fetch(root+'icons.json').then(function(r){return r.json()})])
    .then(function(res){ idx=res[0]; geo=res[1]; apply(); })
    .catch(function(){ countEl.textContent='فهرست آیکون بارگذاری نشد.'; });
  var t; input.addEventListener('input',function(){clearTimeout(t);t=setTimeout(apply,110)});
  catSel.addEventListener('change',apply);
  sizeBtn.addEventListener('click',function(){ size=size===20?16:20; sizeBtn.textContent=size+'px'; sizeBtn.dataset.size=size; apply(); });
})();</script>`;

  return { body, toc, title: 'کتابخانهٔ آیکون', description: `${toFa(count.toLocaleString('en-US'))} آیکون IBM Carbon در ۱۶ و ۲۰ پیکسل — دقیقاً همان مجموعهٔ کتابخانهٔ اسکچ ترب.`, eyebrow: 'منابع' };
}

/* ─────────────────────────── TOKENS ─────────────────────────── */
export function tokensPage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const nBase = Object.keys(m.base).length, nSem = Object.keys(m.modes.light).length;

  let body = `<div class="prose">
    <p><strong>${toFa(nBase)} توکن پایه</strong> و <strong>${toFa(nSem)} توکن معنایی در هر پوسته</strong>، تولیدشده از <code>source/tokens/*.json</code> با قالب استاندارد W3C DTCG. هر خروجی زیر — هر استایل‌شیت، هر خروجی پلتفرم، همین وب‌سایت و سرور MCP — از همان فایل‌ها تولید می‌شود. هیچ‌چیزِ پایین‌دستی دستی نگه‌داری نمی‌شود.</p>
  </div>`;

  body += S('exports', 'خروجی‌ها', `<div class="prose"><p>یک دستور، ${toFa(getFacts().exports)} خروجی:</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">terminal</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="tok-cmd">Copy</button></div></div>
    <pre class="code" id="tok-cmd"><code>node build/tokens-build.mjs</code></pre></div>
    ${table(['فایل', 'قالب', 'برای'], [
      ['<code>tokens.css</code>', 'CSS custom properties', 'لایهٔ مرجع. روشن، ملایم، تیره و حالت کاهش شفافیت، همه در یک فایل.'],
      ['<code>tokens.tailwind.css</code>', 'Tailwind v4 <code>@theme</code>', 'پروژه‌های تیلویند ۴؛ به کلاس‌های <code>bg-*</code>، <code>text-*</code> و <code>rounded-*</code> نگاشت می‌شود.'],
      ['<code>tokens.scss</code>', 'SCSS variables', 'خط‌لوله‌های قدیمی Sass.'],
      ['<code>tokens.ts</code> / <code>tokens.js</code>', 'Typed nested object', 'مصرف‌کننده‌های JS و TS، استایلد-کامپوننتس، CSS-in-JS.'],
      ['<code>tokens.flat.json</code>', 'Flat key/value', 'ابزارهای طراحی، خط‌لوله‌های شخص ثالث، Tokens Studio.'],
      ['<code>tokens.resolved.json</code>', 'Full resolved model', 'سرور MCP و همین سایت این را می‌خوانند.'],
      ['<code>TorobTokens.swift</code>', 'SwiftUI', 'آی‌اواس. رنگ‌ها هر دو حالت را در یک فراخوانی حمل می‌کنند.'],
      ['<code>colors.xml</code> / <code>colors-night.xml</code> / <code>dimens.xml</code>', 'Android resources', 'در <code>values/</code> و <code>values-night/</code> بگذارید.'],
      ['<code>tokens.llms.md</code>', 'Markdown', 'عامل‌های هوش مصنوعی بدون دسترسی به MCP.'],
    ])}
    <div class="prose" style="margin-block-start:18px"><p>هر ${toFa(getFacts().exports)} خروجی با خود سایت منتشر می‌شوند، پس می‌شود مستقیم دانلودشان کرد یا در بیلد از همین نشانی خواندشان:</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-block-start:10px">
        ${['tokens.css', 'tokens.tailwind.css', 'tokens.scss', 'tokens.ts', 'tokens.js',
           'tokens.flat.json', 'tokens.resolved.json', 'tokens.llms.md', 'TorobTokens.swift',
           'colors.xml', 'colors-night.xml', 'colors-night-true.xml', 'dimens.xml'].map(f =>
          `<a class="t-btn t-btn--outline t-btn--md" href="assets/tokens/${f}" download>${f}</a>`).join('')}
      </div>
    </div>`);

  body += S('architecture', 'سه لایه', `<div class="prose">
      <p>معماری استاندارد — متریال ۳، ادوبی اسپکتروم و سیلزفورس لایتنینگ همه نسخه‌ای از آن را دارند — و همان دلیلی که تغییر برند به‌جای بازنویسی کل کد، فقط ویرایش توکن است.</p>
      <ol>
        <li><strong>پایه</strong> — <code>--t-color-sky-800</code>. پالت خام. کد محصول هرگز اینها را لمس نمی‌کند.</li>
        <li><strong>معنایی</strong> — <code>--t-fg-default</code>. نقش‌محور، در هر پوسته مقدار خودش را می‌گیرد. <em>این همان لایه‌ای است که شما استفاده می‌کنید.</em></li>
        <li><strong>کامپوننتی</strong> — <code>--t-action-red-bg-hover</code>. اجزای داخلی یک کامپوننت.</li>
      </ol>
    </div>
    ${specimen({ label: 'زنجیرهٔ حل مقدار', canvas: 'plain', dir: 'ltr', html: `<pre class="code" style="inline-size:100%;background:var(--t-bg-sunken);border-radius:10px"><code>--t-fg-default
  ↳ light: {color.sky.800} → #1E293B
  ↳ dark:  {color.sky.100} → #F1F5F9

--t-action-primary-bg-gradient
  ↳ linear-gradient(180deg, {color.red.300} 0%, {color.brand.red} 100%)
  ↳ linear-gradient(180deg, #F04151 0%, #D73948 100%)</code></pre>` })}`);

  body += S('browser', 'مرور', `<div class="wide">
    <div style="display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-block-end:12px">
      <div class="site-search" style="flex:1;min-inline-size:220px;max-inline-size:none">
        <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5	C2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z"/></svg>
        <input aria-label="جست‌وجوی توکن" id="tokenSearch" type="search" placeholder="جست‌وجوی توکن — مثلاً glass، status، radius…" autocomplete="off">
      </div>
      <span class="t-body-sm t-tone-secondary" id="tokenCount"></span>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>توکن</th><th>روشن</th><th>تیره</th><th>لایه</th></tr></thead><tbody id="tokenRows"></tbody></table></div>
  </div>
  <script>(function(){
    var root=(document.querySelector('link[href$="assets/site.css"]')||{}).href.replace(/site\\.css$/,'');
    var rows=document.getElementById('tokenRows'), input=document.getElementById('tokenSearch'), countEl=document.getElementById('tokenCount');
    var all=[];
    function chip(v){
      var isC=/^(#|rgb|hsl|linear-gradient)/.test(String(v));
      return (isC?'<span style="display:inline-block;inline-size:14px;block-size:14px;border-radius:4px;border:1px solid var(--t-border-subtle);background:'+v+';vertical-align:-2px;margin-inline-end:6px"></span>':'')
        +'<code style="font-size:11.5px">'+String(v).replace(/</g,'&lt;')+'</code>';
    }
    function render(list){
      countEl.textContent=list.length.toLocaleString('fa-IR')+' توکن';
      rows.innerHTML=list.slice(0,400).map(function(t){
        return '<tr><td><button class="site-tool copy-btn" data-copy-text="var('+t.k+')" style="font-family:inherit;font-size:11.5px;padding:2px 7px;block-size:auto">'+t.k+'</button></td><td>'+chip(t.l)+'</td><td>'+(t.d!=null?chip(t.d):'<span style="color:var(--t-fg-disabled)">—</span>')+'</td><td>'+t.tier+'</td></tr>';
      }).join('');
    }
    fetch(root+'tokens.json').then(function(r){return r.json()}).then(function(m){
      Object.keys(m.base).forEach(function(p){
        var k='--t-'+p.replace(/\\./g,'-'); var v=m.base[p].value;
        all.push({k:k,l:Array.isArray(v)?v.join(', '):v,d:null,tier:p.indexOf('glass')===0?'Material':p.indexOf('color.')===0?'Primitive':'Scale'});
      });
      Object.keys(m.modes.light).forEach(function(p){
        var k='--t-'+p.replace(/\\./g,'-');
        all.push({k:k,l:m.modes.light[p].value,d:(m.modes.dark[p]||{}).value,tier:'Semantic'});
      });
      all.sort(function(a,b){ return (a.tier==='Semantic'?0:1)-(b.tier==='Semantic'?0:1) || a.k.localeCompare(b.k); });
      render(all);
    });
    var t; input.addEventListener('input',function(){clearTimeout(t);t=setTimeout(function(){
      var q=input.value.toLowerCase().trim();
      render(q?all.filter(function(x){return x.k.toLowerCase().indexOf(q)>=0}):all);
    },110)});
  })();</script>`);

  return { body, toc, title: 'مرورگر توکن', description: `${toFa(nBase)} توکن پایه، ${toFa(nSem)} توکن معنایی در هر پوسته، سیزده قالب خروجی.`, eyebrow: 'منابع' };
}
