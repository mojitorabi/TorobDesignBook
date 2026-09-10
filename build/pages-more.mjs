import { specimen, section, table, guidance, esc } from './site-lib.mjs';

const FA = '۰۱۲۳۴۵۶۷۸۹';
const toFa = n => String(n).replace(/[0-9]/g, d => FA[+d]);

/* ─────────────────── فاصله، گردی، ارتفاع ─────────────────── */
export function spacingPage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const spaces = Object.entries(m.base).filter(([p]) => p.startsWith('space.'));

  let body = `<div class="prose"><p>یک شبکهٔ ۴ پیکسلی. ده پله، و هر کدام مضربی از چهار — نه ۶ هست، نه ۱۰، نه ۱۴. اگر مقداری روی مقیاس نیست، پاسخ تغییر چیدمان است، نه افزودن یک توکن تازه.</p></div>
  ${specimen({ label: 'مقیاس فاصله', canvas: 'fog', stageClass: 'spec__stage--stack', dir: 'ltr', html: spaces.map(([p, t]) =>
    `<div style="display:flex;align-items:center;gap:14px"><code style="inline-size:118px;font-size:12px">--t-${p.replace(/\./g, '-')}</code><span style="inline-size:46px;font-size:12px;color:var(--t-fg-secondary)">${t.value}</span><span style="block-size:15px;inline-size:${t.value};background:var(--t-fg-brand);border-radius:2px;min-inline-size:1px"></span></div>`).join('') })}`;

  body += S('rhythm', 'ریتم', `<div class="prose">
    <p>درون یک گروه تنگ، بین گروه‌ها سخاوتمند. فاصله‌ای که دو چیز را از هم جدا می‌کند باید به‌وضوح بزرگ‌تر از فاصله‌ای باشد که اجزای هرکدام را به هم می‌بندد؛ وگرنه چشم نمی‌تواند گروه‌بندی را پیدا کند.</p>
    <ul>
      <li><code>space.1</code> (۴ پیکسل) — آیکون تا برچسب خودش، داخل نشان‌ها</li>
      <li><code>space.2</code> (۸ پیکسل) — اجزای درون یک کامپوننت</li>
      <li><code>space.3</code> (۱۲ پیکسل) — اجزای کامپوننت با فضای نفس‌کشیدن</li>
      <li><code>space.4</code> (۱۶ پیکسل) — حاشیهٔ صفحه. هر چیدمان ۳۷۵ پیکسلی در منبع از همین استفاده می‌کند: ۳۷۵ منهای ۳۲ می‌شود ۳۴۳، که دقیقاً عرض باکس خرید است.</li>
      <li><code>space.6</code> (۲۴ پیکسل) — بین بخش‌ها</li>
      <li><code>space.8</code> و بالاتر — بین نواحی اصلی</li>
    </ul>
    <p><strong>بالای یک عنوان بیشتر از زیرش فضا بگذارید.</strong> عنوان به محتوایی تعلق دارد که پس از آن می‌آید و فضای سفید همان چیزی است که این را می‌گوید.</p>
  </div>`);

  const radii = Object.entries(m.base).filter(([p]) => p.startsWith('radius.'));
  body += S('radius', 'گردی گوشه', `<div class="prose"><p><strong>۱۲ پیکسل پیش‌فرض است.</strong> این سلیقه نیست: ۱۰۴ مورد از ۱۳۲ گردی گوشه در منبع اسکچ ۱۲ پیکسل است. بقیهٔ پله‌ها برای چیزهایی‌اند که <em>درون</em> یک ظرف ۱۲ پیکسلی می‌نشینند، یا برای سطوحی بزرگ‌تر از یک کارت.</p></div>
    ${specimen({ label: 'مقیاس گردی', canvas: 'fog', dir: 'ltr', html: radii.map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:70px;block-size:70px;background:var(--t-bg-subtle);border:1px solid var(--t-border-default);border-radius:${t.value}"></div><div style="font-size:11px;margin-block-start:8px;color:var(--t-fg-secondary)">${p.replace('radius.', '')}<br>${t.value}</div></div>`).join('') })}
    ${table(['توکن', 'مقدار', 'کاربرد'], radii.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, t.value, t.description ?? '']))}`);

  const elev = Object.entries(m.base).filter(([p]) => p.startsWith('elevation.'));
  body += S('elevation', 'ارتفاع', `<div class="prose">
      <p>سه پلهٔ واقعی، به‌علاوهٔ دو خط مویی. این نردبان فقط برای سطوح <strong>مات</strong> است؛ <a href="./glass.html">ارتفاع روی شیشه دوحالته است</a>.</p>
      <p>جفت خط مویی همان <code>Store Card - Light/Dark</code> منبع را بازتولید می‌کند، که خط بالا و پایینش را به‌جای کادر، با دو سایهٔ بدون بلور در ±۰٫۵ پیکسل کشیده بود.</p>
    </div>
    ${specimen({ label: 'نردبان ارتفاع', canvas: 'fog', dir: 'ltr', html: elev.filter(([p]) => /elevation\.[0-3]$/.test(p)).map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:96px;block-size:66px;background:var(--t-bg-fog);border-radius:12px;box-shadow:${t.value}"></div><div style="font-size:11px;margin-block-start:9px;color:var(--t-fg-secondary)">elevation-${p.split('.')[1]}</div></div>`).join('') })}
    ${table(['توکن', 'مقدار', 'کاربرد'], elev.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, `<code style="font-size:11.5px">${esc(String(t.value))}</code>`, t.description ?? '']))}`);

  return { body, toc, title: 'فاصله و چیدمان', description: 'یک شبکهٔ ۴ پیکسلی، گردی پیش‌فرض ۱۲ و سه پلهٔ ارتفاع.', eyebrow: 'مبانی' };
}

/* ─────────────────────────── حرکت ─────────────────────────── */
export function motionPage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const d = Object.entries(m.base).filter(([p]) => p.startsWith('duration.'));
  const e = Object.entries(m.base).filter(([p]) => p.startsWith('easing.'));

  let body = `<div class="prose">
    <p>ترب ابزار خریدی است که یک‌دستی، توی اتوبوس، روی یک گوشی میان‌رده استفاده می‌شود. حرکت اینجا تأیید می‌کند چه اتفاقی افتاد و نشان می‌دهد چیزی از کجا آمد. هرگز یک نمایش نیست.</p>
    <p>چهار مدت، چهار منحنی. کل واژگان همین است.</p>
  </div>
  ${table(['مدت', 'مقدار', 'کاربرد'], d.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, t.value, t.description ?? '']))}
  ${table(['منحنی', 'مقدار', 'کاربرد'], e.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, `<code style="font-size:11.5px">cubic-bezier(${t.value.join(', ')})</code>`, t.description ?? '']))}`;

  body += S('demo', 'منحنی‌ها', `<div class="prose"><p>روی هر مربع هاور کنید. <code>out</code> پیش‌فرض است: کاهش‌شتاب نمایی که سریع می‌رسد و نرم می‌نشیند. حسش این است که رابط دارد به شما پاسخ می‌دهد، نه اینکه دارد برایتان انیمیشن پخش می‌کند.</p></div>
    ${specimen({ label: 'مقایسهٔ منحنی‌ها', canvas: 'fog', dir: 'ltr', html: e.map(([p, t]) => {
      const n = p.replace('easing.', '');
      return `<div style="text-align:center"><div class="motion-demo" style="--e:cubic-bezier(${t.value.join(',')});inline-size:112px;block-size:52px;border-radius:10px;background:var(--t-bg-subtle);border:1px solid var(--t-border-default);display:grid;place-items:start;padding:11px;overflow:hidden"><span style="inline-size:26px;block-size:26px;border-radius:7px;background:var(--t-fg-brand);transition:translate 480ms var(--e)"></span></div><div style="font-size:11px;margin-block-start:7px;color:var(--t-fg-secondary)">${n}</div></div>`;
    }).join('') + `<style>.motion-demo:hover > span { translate: 58px 0; }</style>` })}`);

  body += S('rules', 'قواعد', guidance([
    'از حالتی شروع کنید که از قبل دیده می‌شود. عناصر نباید هنگام بارگذاری از هیچ محو شوند.',
    'سطوح شیشه‌ای شفافیت و بلور را <em>با هم</em> انیمیت می‌کنند.',
    'در هر صفحه یک لحظهٔ نویسنده‌محور، نه یک ورود برای هر بخش.',
    'ریزتعامل‌ها روی ۱۲۰ میلی‌ثانیه؛ زیر آستانه‌ای که تأخیر محسوس شود.',
  ], [
    'حرکتی که یک کنش را عقب می‌اندازد. برگهٔ ۳۲۰ میلی‌ثانیه‌ای سقف است.',
    'منحنی فنری بیرون از قلب علاقه‌مندی. یک پرش در کل سیستم یک امضاست؛ پنج تا یک شهربازی است.',
    'انیمیت‌کردن <code>width</code>، <code>height</code>، <code>top</code> یا <code>left</code>. از <code>transform</code> و <code>opacity</code> استفاده کنید.',
    'پارالاکس یا ربودن اسکرول، هرجای یک جریان خرید.',
  ]));

  body += S('reduced', 'کاهش حرکت', `<div class="prose"><p>یک مدیا کوئری کل سیستم را جمع می‌کند. هر انیمیشنی در ترب از همین‌جا در دسترس است و این فقط به این دلیل درست است که مدت‌ها از توکن می‌آیند، نه از عددهای پراکنده در CSS کامپوننت‌ها.</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">layout.css</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="rm-src">کپی</button></div></div>
    <pre class="code" id="rm-src"><code>@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}</code></pre></div>
    <div class="note"><strong>یک استثنا:</strong> اسپینر کند می‌شود، نه اینکه بایستد. اسپینر یخ‌زده مثل یک صفحهٔ کرش‌کرده خوانده می‌شود.</div>`);

  return { body, toc, title: 'حرکت', description: 'چهار مدت، چهار منحنی. حرکت تأیید می‌کند؛ هرگز اجرا نمی‌کند.', eyebrow: 'مبانی' };
}

/* ─────────────────────── راست‌چین و فارسی ─────────────────────── */
export function rtlPage() {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  let body = `<div class="prose">
    <p>هر استایل متنی در منبع اسکچ <code>align: right</code> است. ترب یک محصول فارسی است و راست‌چین حالتی نیست که پشتیبانی شود؛ جهتی است که سیستم در آن ساخته شده. چپ‌چین حالت ثانویه است.</p>
    <div class="note"><strong>تنها قاعده‌ای که اهمیت دارد:</strong> هرگز یک جهت فیزیکی ننویسید. نه <code>margin-left</code>، نه <code>padding-right</code>، نه <code>left: 0</code>، نه <code>text-align: right</code>. ویژگی‌های منطقی هر دو جهت را با یک اعلان مدیریت می‌کنند و همه‌جایی که ترب منتشر می‌شود پشتیبانی می‌شوند.</div>
  </div>`;

  body += S('properties', 'ویژگی‌های منطقی', table(['به‌جای', 'بنویسید'], [
    ['<code>margin-left</code> / <code>margin-right</code>', '<code>margin-inline-start</code> / <code>margin-inline-end</code>'],
    ['<code>padding-top</code> / <code>padding-bottom</code>', '<code>padding-block-start</code> / <code>padding-block-end</code>'],
    ['<code>left</code> / <code>right</code>', '<code>inset-inline-start</code> / <code>inset-inline-end</code>'],
    ['<code>text-align: right</code>', '<code>text-align: start</code>'],
    ['<code>border-radius: 8px 0 0 8px</code>', '<code>border-start-start-radius</code> / <code>border-end-start-radius</code>'],
    ['<code>width</code> / <code>height</code>', '<code>inline-size</code> / <code>block-size</code>'],
    ['<code>border-left</code>', '<code>border-inline-start</code>'],
  ]));

  body += S('icons', 'آیکون‌ها', `<div class="prose">
      <p>سه دسته، سه پاسخ متفاوت:</p>
      <ul>
        <li><strong>جهت‌دار</strong> — شورون، فلش، بازگشت. اینها قرینه می‌شوند. کلاس <code>.t-icon--directional</code> را اضافه کنید تا سیستم بچرخاندشان.</li>
        <li><strong>قرینه‌های کربن</strong> — پنج آیکون نسخهٔ <code>--mirror</code> عمداً کشیده‌شده دارند (<code>search--locate</code>، <code>run</code>، <code>list--checked</code>، <code>list--numbered</code>، <code>summary--KPI</code>). هرجا چنین نسخه‌ای هست از آن استفاده کنید: قرینهٔ دستی از یک ترنسفورم CSS بهتر است، چون ترنسفورم هر متنی را هم که داخل آیکون کشیده شده برمی‌گرداند.</li>
        <li><strong>بقیه</strong> — دوربین، قلب، تلفن. اینها قرینه <em>نمی‌شوند</em>. برگرداندنشان رایج‌ترین اشتباه راست‌چین است و رابط را خراب جلوه می‌دهد.</li>
      </ul>
    </div>
    ${specimen({ label: 'قرینه می‌شود یا نمی‌شود', canvas: 'fog', html: `<div style="display:flex;gap:26px;align-items:center">
  <div style="text-align:center"><svg class="t-icon t-icon--lg t-icon--directional" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M10 16 20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z"/></svg><div class="t-body-sm t-tone-secondary" style="margin-block-start:5px">قرینه می‌شود</div></div>
  <div style="text-align:center"><svg class="t-icon t-icon--lg" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z"/></svg><div class="t-body-sm t-tone-secondary" style="margin-block-start:5px">نمی‌شود</div></div>
  <div style="text-align:center"><svg class="t-icon t-icon--lg" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M29,26H3a1,1,0,0,1-1-1V8A1,1,0,0,1,3,7H9.46l1.71-2.55A1,1,0,0,1,12,4h8a1,1,0,0,1,.83.45L22.54,7H29a1,1,0,0,1,1,1V25A1,1,0,0,1,29,26ZM4,24H28V9H22a1,1,0,0,1-.83-.45L19.46,6H12.54L10.83,8.55A1,1,0,0,1,10,9H4Z"/><path d="M16,22a6,6,0,1,1,6-6A6,6,0,0,1,16,22Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,16,12Z"/></svg><div class="t-body-sm t-tone-secondary" style="margin-block-start:5px">نمی‌شود</div></div>
</div>`, note: 'این نمونه را به انگلیسی ببرید و ببینید کدام نشانه‌ها جابه‌جا می‌شوند.' })}`);

  body += S('numerals', 'اعداد و دوجهتی', `<div class="prose">
      <ul>
        <li>اعداد فارسی ۰۱۲۳۴۵۶۷۸۹ با ٬ به‌عنوان جداکنندهٔ هزارگان و ٫ به‌عنوان اعشار.</li>
        <li>نام‌های لاتین محصول مدام داخل جمله‌های فارسی می‌نشینند. هر رشته‌ای را که جهتش را نمی‌توانید پیش‌بینی کنید در <code>.t-bidi</code> بپیچید (<code>unicode-bidi: isolate</code>). بدون آن، یک شمارهٔ مدل در انتهای جمله به سمت اشتباه می‌پرد.</li>
        <li>شمارهٔ تلفن، نشانی اینترنتی و کد، رشته‌های چپ‌چین‌اند. ایزوله‌شان کنید.</li>
        <li>ابعاد مثل ۳۴۳×۷۲ هم خنثی‌اند و بدون ایزوله‌سازی وارونه خوانده می‌شوند. همین صفحه آنها را خودکار ایزوله می‌کند.</li>
      </ul>
    </div>
    ${specimen({ label: 'ایزوله‌سازی دوجهتی', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div class="t-body-lg">گوشی اپل <span class="t-bidi">iPhone 11 (Stock) 128 GB</span> — ۲۳٬۵۵۰٬۰۰۰ تومان</div>
<div class="t-body-md t-tone-secondary">تماس: <span class="t-bidi">۰۲۱-۸۸۷۷۶۶۵۵</span> · کد فروشنده <span class="t-bidi">TRB-4829</span></div>` })}`);

  body += S('motion', 'حرکت هم جهت دارد', `<div class="prose">
      <p>یک پنل کناری از انتهای محور وارد می‌شود. در راست‌چین یعنی از چپ و در چپ‌چین یعنی از راست. <code>translateX</code> به‌تنهایی نمی‌تواند این را بگوید، پس سیستم یک ضریب جهت در اختیار می‌گذارد:</p>
    </div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">base.css</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="dir-src">کپی</button></div></div>
    <pre class="code" id="dir-src"><code>:root                        { --t-dir: -1; }
:root[dir="rtl"], [dir="rtl"] { --t-dir:  1; }
:root[dir="ltr"], [dir="ltr"] { --t-dir: -1; }

/* A panel entering from the inline end, in either direction */
@keyframes t-panel-in {
  from { transform: translateX(calc(100% * var(--t-dir, -1) * -1)); }
}</code></pre></div>`);

  body += S('checklist', 'سیاههٔ بازبینی', guidance([
    'پیش از انتشار، هر صفحه را به چپ‌چین ببرید. کلید زبان روی هر نمونه در این سایت دقیقاً همین کار را می‌کند.',
    'با یک رشتهٔ فارسی بلند و یک رشتهٔ لاتین بلند در یک فیلد تست کنید.',
    'بررسی کنید که شورون بازگشت و جلو در هر دو جهت به سمت درست اشاره کنند.',
    'مطمئن شوید بعد از تعویض زبان، اعداد جدولی می‌مانند و جداکننده‌ها درست‌اند.',
  ], [
    'هر ویژگی جهت فیزیکی. دنبال <code>margin-left</code>، <code>padding-right</code> و <code>text-align: right</code> بگردید.',
    'قرینه‌کردن آیکون‌های غیرجهت‌دار.',
    '<code>dir="rtl"</code> ثابت روی کامپوننت‌ها. جهت به <code>&lt;html&gt;</code> تعلق دارد.',
    'برخورد با راست‌چین به‌عنوان یک مرحلهٔ تست در انتها. این یک قید زمان ساخت است.',
  ]));

  return { body, toc, title: 'راست‌چین و فارسی', description: 'راست‌چین حالتی نیست که این سیستم پشتیبانی کند. جهتی است که در آن ساخته شده.', eyebrow: 'مبانی' };
}

/* ─────────────────────── واکنش‌گرایی ─────────────────────── */
export function responsivePage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const bp = Object.entries(m.base).filter(([p]) => p.startsWith('breakpoint.'));
  let body = `<div class="prose">
    <p>هر بیست‌ونه صفحهٔ نمونه در منبع اسکچ ۳۷۵ پیکسل عرض دارد. این سیستم هرگز بالاتر از یک گوشی طراحی نشده بود، پس این صفحه مستندسازی یک رفتار موجود نیست؛ تصمیم دربارهٔ این است که آن رفتار چه باید باشد.</p>
    <div class="note note--new"><strong>هر شش نقطهٔ شکست تازه‌اند.</strong> از اعداد خود منبع استخراج شده‌اند: ۳۷۵ مبدأ طراحی است، ۳۴۳ عرض باکس خرید (۳۷۵ منهای حاشیه‌ها) و شبکهٔ محصول دوتایی است چون نمونه‌ها همین را نشان می‌دهند.</div>
    <div class="note"><strong>پنل فروشنده جدا حساب می‌شود.</strong> پنل B2B روی دسکتاپ زندگی می‌کند و متراکم است؛ رفتار واکنش‌گرایش از پایین به بالا نیست، از بالا به پایین است. <a href="../patterns/seller-panel.html">الگوی پنل فروشنده</a> را ببینید.</div>
  </div>
  ${table(['توکن', 'مقدار', 'چه چیزی تغییر می‌کند'], bp.map(([p, t]) => [`<code>--t-breakpoint-${p.split('.')[1]}</code>`, t.value, t.description ?? '']))}`;

  body += S('behaviour', 'چه چیزی تطبیق می‌یابد', table(['عنصر', 'گوشی', 'تبلت (md)', 'دسکتاپ (xl)'], [
    ['شبکهٔ محصول', '۲ ستون', '۴ ستون', '۶ ستون'],
    ['برگهٔ پایینی', 'برگهٔ پایینی', 'پنل ۴۲۰ پیکسلی کناری', 'پنل کناری'],
    ['منو', 'برگهٔ پایینی', 'پاپ‌اور', 'پاپ‌اور'],
    ['ناوبری', 'ناوبری پایین', 'ناوبری بالا', 'ناوبری بالا + مسیر راهنما'],
    ['نقشه و فهرست', 'تعویض بینشان', 'تعویض', 'کنار هم'],
    ['توست', 'تمام‌عرض با فاصله', '۳۸۰ پیکسل، انتهای محور', '۳۸۰ پیکسل، انتهای محور'],
    ['مسیر راهنما', 'پنهان', 'دیده‌شونده', 'دیده‌شونده'],
    ['ظرف', 'حاشیهٔ ۱۶ پیکسلی', 'حاشیهٔ ۲۴ پیکسلی', 'سقف ۱۲۸۰ پیکسل، حاشیهٔ ۳۲'],
  ]));

  body += S('corners', 'موارد مرزی', `<div class="prose"><p>شکست‌هایی که واقعاً در تولید اتفاق می‌افتند و کاری که سیستم برای هرکدام می‌کند.</p></div>
    ${table(['مورد', 'رفتار'], [
      ['کادر دید زیر ۳۶۰ پیکسل', 'هیچ‌چیز نباید بشکند. دکمه‌ها تمام‌عرض می‌شوند، فوترهای دوتایی روی هم می‌روند و برچسب‌ها کوتاه می‌شوند نه بریده.'],
      ['عنوان بسیار بلند محصول', '<code>.t-clamp-2</code> روی کارت‌ها و <code>.t-truncate</code> در ردیف‌ها. هرگز قیمت را برای جاکردن عنوان نبرید.'],
      ['نام بلند فارسی فروشگاه', 'در مرز ظرف ببرید، هرگز وسط کلمه. کلمات فارسی مثل لاتین نمی‌شکنند.'],
      ['متن لاتین داخل فارسی', 'ایزوله‌سازی <code>.t-bidi</code>، وگرنه جملهٔ اطرافش جابه‌جا می‌شود.'],
      ['بزرگ‌نمایی ۳۰۰ درصدی مرورگر', 'چیدمان به یک ستون بازآرایی می‌شود. هیچ‌چیز به اسکرول افقی وابسته نیست، به‌جز ریل‌هایی که برای همین ساخته شده‌اند.'],
      ['ناچ و نشانگر خانه', '<code>env(safe-area-inset-*)</code> روی ناوبری پایین، برگه‌ها و ناحیهٔ توست.'],
      ['گوشی افقی', 'برگه‌ها روی ۹۰ درصد ارتفاع کادر دید متوقف می‌شوند تا دستگیره و فوتر در دسترس بمانند.'],
      ['بزرگ‌نمایی فقط‌متن تا ۲۰۰ درصد', 'همهٔ اندازه‌ها روی ریشه‌ای مقیاس‌پذیر تعریف شده‌اند؛ هیچ ظرف متنی ارتفاع ثابت ندارد.'],
      ['تصویر کند یا غایب', 'اسکلت‌ها ابعاد نهایی را می‌گیرند، پس وقتی تصویر می‌رسد چیزی جابه‌جا نمی‌شود.'],
      ['بدون جاوااسکریپت', 'محتوا رندر می‌شود. لایه‌ها و کلید زبان به‌صورت بهبود تدریجی اضافه می‌شوند.'],
    ])}`);

  body += S('test', 'اندازه‌های تست', `<div class="prose"><p>پیش از انتشار هر صفحه، آن را در این شش اندازه ببینید. اولی همان است که فراموش می‌شود و همان است که می‌شکند.</p></div>
    ${table(['عرض', 'دستگاه', 'چرا'], [
      ['۳۲۰ پیکسل', 'آیفون SE نسل اول / اندروید قدیمی', 'کف واقعی. اگر اینجا دوام بیاورد، همه‌جا دوام می‌آورد.'],
      ['۳۶۰ پیکسل', 'بیشتر اندرویدهای میان‌رده', 'رایج‌ترین عرض در ترافیک ترب.'],
      ['۳۷۵ پیکسل', 'آیفون SE / mini', 'مبدأ طراحی. هر صفحهٔ منبع همین است.'],
      ['۷۶۸ پیکسل', 'آیپد عمودی', 'جایی که برگه‌ها به پنل تبدیل می‌شوند.'],
      ['۱۰۲۴ پیکسل', 'آیپد افقی', 'جایی که ریل فیلتر دائمی ظاهر می‌شود.'],
      ['۱۴۴۰ پیکسل', 'لپ‌تاپ', 'جایی که نقشه و فهرست کنار هم می‌نشینند.'],
    ])}`);

  return { body, toc, title: 'واکنش‌گرایی', description: 'منبع فقط ۳۷۵ پیکسل است. این صفحه می‌گوید چطور رشد می‌کند و کجا نباید بشکند.', eyebrow: 'مبانی' };
}
