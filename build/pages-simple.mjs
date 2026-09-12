import { specimen, section, table, guidance, esc } from './site-lib.mjs';

export function simplePages(m) {
  const P = {};
  const page = (slug, title, description, eyebrow, sections) => {
    const toc = [];
    const body = sections.map(([id, t, inner]) => {
      if (!id) return inner;
      toc.push({ id, label: t });
      return section(id, t, inner);
    }).join('');
    P[slug] = { title, description, eyebrow, body, toc };
  };

  /* ── شروع کار ── */
  page('start', 'شروع کار', 'توکن‌ها را نصب کنید، کامپوننت را کپی کنید، منتشر کنید.', 'مرور کلی', [
    [null, null, `<div class="prose">
      <p>لایهٔ مرجع، <strong>متغیرهای CSS و کلاس‌های مستقل از فریم‌ورک</strong> است. ری‌اکت یک پوشش نازک روی همان است، نه یک انشعاب از آن. همین چیزی است که به یک پشتهٔ ناهمگون اجازه می‌دهد سیستم را بدون بازنویسی بپذیرد.</p>
    </div>`],
    ['install', 'نصب', `<div class="spec" data-spec><div class="spec__bar"><span class="spec__label">هر پروژه‌ای — لایهٔ CSS</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="i1">کپی</button></div></div>
      <pre class="code" id="i1"><code>&lt;!-- tokens.css همهٔ متغیرها را تعریف می‌کند؛ torob.css آن را ایمپورت می‌کند --&gt;
&lt;link rel="stylesheet" href="/design-system/packages/css/dist/torob.css"&gt;
&lt;link rel="stylesheet" href="/design-system/packages/css/dist/fonts.css"&gt;

&lt;html lang="fa" dir="rtl"&gt;   &lt;!-- جهت اینجا زندگی می‌کند، هیچ‌جای دیگر --&gt;</code></pre></div>
      <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">تیلویند ۴</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="i2">کپی</button></div></div>
      <pre class="code" id="i2"><code>/* app.css — هر توکن را به یوتیلیتی‌های تیلویند نگاشت می‌کند */
@import "tailwindcss";
@import "/design-system/packages/css/dist/tokens.tailwind.css";

/* bg-fg-default، text-commerce-price، rounded-md، gap-4 … همه به توکن حل می‌شوند */</code></pre></div>
      <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">جاوااسکریپت و تایپ‌اسکریپت</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="i3">کپی</button></div></div>
      <pre class="code" id="i3"><code>import tokens from '@torob/tokens';

tokens.light.fg.default          // '#1E293B'
tokens.dim.fg.default            // '#F1F5F9'
tokens.dark.bg.canvas            // '#000000'
tokens.glass.light.surface.fill  // 'rgba(255, 255, 255, 0.30)'
tokens.radius.md                 // '12px'</code></pre></div>`],
    ['first', 'اولین صفحهٔ شما', `<div class="prose"><p>سه قاعده شما را نود درصد راه می‌برد:</p>
      <ol>
        <li><strong>جهت را یک بار تعیین کنید</strong>، روی <code>&lt;html dir="rtl" lang="fa"&gt;</code>. هرگز روی یک کامپوننت.</li>
        <li><strong>از توکن معنایی استفاده کنید</strong> — <code>var(--t-fg-default)</code>، نه <code>var(--t-color-sky-800)</code> و هرگز <code>#1E293B</code>.</li>
        <li><strong>فقط ویژگی منطقی.</strong> <code>margin-inline-start</code>، نه <code>margin-left</code>.</li>
      </ol></div>
      ${specimen({ label: 'یک صفحهٔ فروشگاه‌های اطراف، فقط از اجزای سیستم', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div style="inline-size:100%;max-inline-size:375px;background:var(--t-bg-canvas);border-radius:16px;overflow:hidden;border:1px solid var(--t-border-default)">
  <header class="t-page-header" style="position:relative">
    <button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت"><svg class="t-icon t-icon--directional" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M10 16 20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z"/></svg></button>
    <div class="t-page-header__title">فروشگاه‌های اطراف<div class="t-page-header__sub">تهران، ۷۸ مورد</div></div>
  </header>
  <div class="t-filter-bar">
    <button class="t-chip" aria-pressed="true">تهران</button>
    <button class="t-chip" aria-pressed="false">ضمانت ترب</button>
    <button class="t-chip" aria-pressed="false">باز الان</button>
  </div>
  <div style="padding:var(--t-space-3)">
    <article class="t-store-card" style="border-radius:12px">
      <div class="t-store-card__head">
        <div class="t-store-card__logo"></div>
        <div class="t-store-card__body">
          <h3 class="t-store-card__name">ادکلن شهر</h3>
          <div class="t-store-card__meta"><span class="t-store-card__distance">۱ کیلومتر</span><span>باز تا ۲۲:۳۰</span></div>
        </div>
      </div>
      <div class="t-store-card__badges"><span class="t-badge t-badge--guarantee">ضمانت ترب</span><span class="t-badge">کالابرگ</span></div>
      <div class="t-store-card__actions">
        <button class="t-btn t-btn--red t-btn--md">تماس تلفنی</button>
        <button class="t-btn t-btn--black-ghost t-btn--md">مسیریابی</button>
      </div>
    </article>
  </div>
  <nav class="t-bottom-nav" style="position:relative" aria-label="ناوبری اصلی">
    <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.6123,2.2138a1.01,1.01,0,0,0-1.2427,0L1,13.4194l1.2427,1.5717L4,13.6209V26a2.0041,2.0041,0,0,0,2,2H26a2.0037,2.0037,0,0,0,2-2V13.63L29.7573,15,31,13.4282ZM18,26H14V18h4Zm2,0V18a2.0023,2.0023,0,0,0-2-2H14a2.002,2.002,0,0,0-2,2v8H6V12.0615l10-7.79,10,7.8005V26Z"/></svg>خانه</button>
    <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"/></svg>جست‌وجو</button>
    <button class="t-bottom-nav__item" aria-current="page"><svg class="t-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16,2A11.0134,11.0134,0,0,0,5,13a10.8885,10.8885,0,0,0,2.2163,6.6s.3.3945.3482.4517L16,30l8.439-9.9526c.0444-.0533.3447-.4478.3447-.4478l.0015-.0024A10.8846,10.8846,0,0,0,27,13,11.0134,11.0134,0,0,0,16,2Zm0,15a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,17Z"/><circle cx="16" cy="13" r="4" fill="none"/></svg>اطراف من</button>
  </nav>
</div>` })}`],
    ['build', 'دستورهای بیلد', table(['دستور', 'چه می‌کند'], [
      ['<code>node build/tokens-build.mjs</code>', 'بازتولید هر سیزده خروجی توکن از <code>source/tokens/*.json</code>.'],
      ['<code>node build/icons-build.mjs</code>', 'بازسازی پکیج آیکون از فهرست اسکچ و کربن.'],
      ['<code>node build/site-build.mjs</code>', 'بازسازی همین وب‌سایت.'],
      ['<code>node build/mcp-build.mjs</code>', 'بازتولید دادهٔ سرور MCP.'],
      ['<code>node build/translate-components.mjs</code>', 'اعمال جدول فارسی روی رجیستری کامپوننت‌ها.'],
      ['<code>node build/contrast-check.mjs</code>', 'سنجش هر جفت رنگ در برابر WCAG AA. با شکست، خروجی غیرصفر.'],
      ['<code>node build/validate-css.mjs</code>', 'بررسی اینکه هر ارجاع <code>var()</code> حل می‌شود.'],
      ['<code>node build/verify.mjs</code>', 'خزیدن در سایت ساخته‌شده: لینک شکسته، شناسهٔ تکراری، دکمهٔ بی‌نام.'],
      ['<code>node build/serve.mjs</code>', 'سرو سایت روی درگاه ۴۳۲۱.'],
      ['<code>node build/all.mjs</code>', 'همهٔ موارد بالا، به ترتیب، با دروازه‌ها در میانه.'],
    ])],
    ['contrib', 'تغییر دادن سیستم', `<div class="prose">
      <p>همه‌چیز از <code>source/</code> جاری می‌شود. هرگز چیزی را در <code>packages/*/dist</code> یا <code>site/</code> ویرایش نکنید؛ اینها تولیدشده‌اند و در بیلد بعدی بازنویسی می‌شوند.</p>
      <ul>
        <li><strong>یک رنگ، اندازه یا مدت</strong> ← <code>source/tokens/*.json</code>، بعد <code>tokens-build</code>. پیش از کامیت <code>contrast-check</code> را اجرا کنید.</li>
        <li><strong>CSS یک کامپوننت</strong> ← <code>packages/css/src/*.css</code>.</li>
        <li><strong>مستندات، پراپ‌ها و نمونه‌های یک کامپوننت</strong> ← <code>source/components/*.mjs</code>. همین یک فایل، وب‌سایت، سرور MCP و <code>llms.txt</code> را تغذیه می‌کند.</li>
        <li><strong>متن فارسی مستندات</strong> ← <code>source/fa/components.json</code>، بعد <code>translate-components</code>.</li>
      </ul>
      <div class="note"><strong>محلی و گیت‌هاب همیشه یکی‌اند.</strong> ورک‌فلوی گیت‌هاب همان <code>build/all.mjs</code> را روی همان فایل‌های منبع اجرا می‌کند. سایت منتشرشده تولید می‌شود، نه آپلود؛ پس این دو به‌خاطر یک ژنراتور مشترک یکی می‌مانند، نه به‌خاطر اینکه کسی یادش مانده همگام‌سازی کند.</div>
    </div>`],
  ]);

  /* ── ارتفاع ── */
  const elev = Object.entries(m.base).filter(([p]) => p.startsWith('elevation.'));
  page('foundations/elevation', 'ارتفاع و عمق', 'سه پله برای سطوح مات. شیشه از این نردبان استفاده نمی‌کند.', 'مبانی', [
    [null, null, `<div class="prose">
      <p>عمق در این سیستم به دو شکل متفاوت بیان می‌شود و قاطی‌کردنشان همان اشتباهی است که باید از آن پرهیز کرد.</p>
      <ul>
        <li><strong>سطوح مات</strong> از نردبان سایهٔ زیر استفاده می‌کنند؛ سه پله، نه بیشتر.</li>
        <li><strong>سطوح شیشه‌ای</strong> یک خط مویی دوحالته دارند: هست یا نیست. <a href="./glass.html">شیشه</a> را ببینید.</li>
      </ul>
      <p>منبع، جداکننده‌های کارت فروشگاه را به‌جای کادر با دو سایهٔ بدون بلور در ±۰٫۵ پیکسل کشیده بود. هر دو به‌عنوان توکن نگه داشته شده‌اند، چون یک قاعدهٔ سایه <em>بیرون</em> جعبهٔ چیدمان می‌نشیند و آن‌طور که کادر جابه‌جا می‌کند، چیدمان را جابه‌جا نمی‌کند.</p>
    </div>
    ${specimen({ label: 'نردبان', canvas: 'fog', dir: 'ltr', html: elev.filter(([p]) => /elevation\.[0-3]$/.test(p)).map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:104px;block-size:72px;background:var(--t-bg-fog);border-radius:12px;box-shadow:${t.value}"></div><div style="font-size:11px;margin-block-start:10px;color:var(--t-fg-secondary)">elevation-${p.split('.')[1]}</div></div>`).join('') })}
    ${table(['توکن', 'مقدار', 'کاربرد'], elev.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, `<code style="font-size:11.5px">${esc(String(t.value))}</code>`, t.description ?? '']))}`],
    ['z', 'ترتیب لایه‌ها', `<div class="prose"><p>هرگز <code>z-index</code> خام ننویسید. هر لایه در سیستم توکن خودش را دارد و فاصلهٔ بین آنها برای لایه‌های مخصوص محصول جا باز می‌گذارد.</p></div>
      ${table(['توکن', 'مقدار', 'لایه'], Object.entries(m.base).filter(([p]) => p.startsWith('z.')).map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, String(t.value), p.split('.')[1]]))}`],
    ['rules', 'قواعد', guidance([
      'سایه‌ها آفست و بلور نرم دارند؛ همین است که مثل نور از بالا خوانده می‌شوند.',
      'در هر تعامل یک پلهٔ ارتفاع. کارتی که هنگام هاور بالا می‌آید از ۱ به ۲ می‌رود، نه از ۱ به ۳.',
      'برای جداکنندهٔ فهرست که نباید چیدمان را جابه‌جا کند، از جفت خط مویی استفاده کنید.',
    ], [
      'پلهٔ چهارم ارتفاع. اگر سه تا کافی نیست، لایه‌بندی اشتباه است.',
      'سایه با آفست صفر. هالهٔ بی‌جهت تزئین است، نه عمق.',
      'نردبان سایه روی شیشه.',
      'مقدار <code>z-index</code> خام.',
    ])],
  ]);

  /* ── گردی گوشه ── */
  const radii = Object.entries(m.base).filter(([p]) => p.startsWith('radius.'));
  page('foundations/radius', 'گردی گوشه', '۱۲ پیکسل پیش‌فرض است — ۲۶۳ مورد از ۴۴۳ گردی واقعی در منبع.', 'مبانی', [
    [null, null, `<div class="prose">
      <p>شش پله. <strong>۱۲ پیکسل پیش‌فرض است</strong> و این یک ترجیح نیست: از ۴۴۳ گردی واقعی در منبع، ۲۶۳ مورد دوازده‌اند. بقیهٔ پله‌ها برای چیزهایی هستند که <em>درون</em> یک ظرف ۱۲ پیکسلی می‌نشینند، و برای سطوحی بزرگ‌تر از یک کارت — تصویر محصول ۱۶ است و کارت فروشگاهِ صفحهٔ محصول ۸.</p><p>یک دام در خود فایل هست که ارزش نوشتن دارد. گردی گوشه در سه فیلد ذخیره می‌شود و <code>fixedRadius</code> اغلب کهنه است؛ روی <code>Button / Red / Default</code> عدد ۸ را نگه داشته در حالی که اسکچ ۱۲ می‌کشد. اگر از آن فیلد بخوانید، به این نتیجه می‌رسید که کل کیت روی ۸ بنا شده. <a href="../symbols.html">فهرست سیمبل‌ها</a> اندازه‌گیری‌ها را کنار هم می‌گذارد.</p>
      <div class="note"><strong>قاعدهٔ تودرتویی:</strong> گردی داخلی باید برابر گردی بیرونی منهای فاصلهٔ بینشان باشد. یک کارت ۱۲ پیکسلی با فاصلهٔ داخلی ۸، عنصر داخلی ۸ پیکسلی می‌خواهد؛ نه یک ۱۲ دیگر که مثل حباب توی حباب خوانده می‌شود.</div>
    </div>
    ${specimen({ label: 'مقیاس', canvas: 'fog', dir: 'ltr', html: radii.map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:70px;block-size:70px;background:var(--t-bg-subtle);border:1px solid var(--t-border-default);border-radius:${t.value}"></div><div style="font-size:11px;margin-block-start:8px;color:var(--t-fg-secondary)">${p.replace('radius.', '')}<br>${t.value}</div></div>`).join('') })}
    ${table(['توکن', 'مقدار', 'کاربرد'], radii.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, t.value, t.description ?? '']))}`],
    ['rtl', 'گردی و جهت', `<div class="prose">
      <p>حالت کوتاه چهارگوشه فیزیکی است و قرینه نمی‌شود. برگهٔ پایینی که فقط گوشه‌های بالایش گرد است متقارن و بی‌خطر است، اما هر چیز نامتقارن به ویژگی‌های گوشهٔ منطقی نیاز دارد:</p></div>
      <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">گوشه‌های منطقی</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="rad-src">کپی</button></div></div>
      <pre class="code" id="rad-src"><code>/* ✗ فیزیکی — قرینه نمی‌شود */
border-radius: 12px 0 0 12px;

/* ✓ منطقی — با سند قرینه می‌شود */
border-start-start-radius: var(--t-radius-md);
border-end-start-radius: var(--t-radius-md);</code></pre></div>`],
  ]);

  /* ── آیکون‌نگاری ── */
  page('foundations/iconography', 'آیکون‌نگاری', 'IBM Carbon در ۱۶ و ۲۰ پیکسل. ۲٬۰۴۱ آیکون، پنج تا با قرینهٔ راست‌چین.', 'مبانی', [
    [null, null, `<div class="prose">
      <p>ترب از <strong>IBM Carbon</strong> استفاده می‌کند، کشیده‌شده در ۱۶ و ۲۰ پیکسل. مجموعه را <code>T IBM Icons (16px, 20px).sketch</code> تعیین می‌کند؛ پکیج آیکون با تطبیق نام آن آرت‌بوردها در برابر Carbon 11.88 تولید می‌شود، پس این دو نمی‌توانند از هم فاصله بگیرند.</p>
      <p>کل مجموعه را در صفحهٔ <a href="../icons.html">کتابخانهٔ آیکون</a> مرور و جست‌وجو کنید.</p>
    </div>`],
    ['sizes', 'اندازه‌ها', `<div class="prose"><p>دو اندازهٔ کشیده‌شده. ۲۴ پیکسل به‌عنوان مقیاسی از هنر ۲۰ پیکسلی برای هدف‌های لمسی بزرگ وجود دارد، اما یک نقاشی جداگانه نیست؛ هینتینگ کربن برای ۱۶ و ۲۰ بهینه شده.</p></div>
      ${table(['کلاس', 'اندازه', 'کاربرد'], [
        ['<code>.t-icon--sm</code>', '۱۶ پیکسل', 'هم‌خط با متن ۱۲ و ۱۴ پیکسلی، داخل تراشه و دکمهٔ کوچک.'],
        ['<code>.t-icon</code>', '۲۰ پیکسل', 'پیش‌فرض. دکمهٔ آیکونی، ابتدای ردیف فهرست، ناوبری.'],
        ['<code>.t-icon--lg</code>', '۲۴ پیکسل', 'ناوبری پایین، تصویر حالت خالی. مقیاسی از نقاشی ۲۰ پیکسلی.'],
      ])}`],
    ['legacy', 'دو سیستم آیکون', `<div class="prose">
      <p>صفحه‌های نمونه نام‌های کربن را با یک مجموعهٔ قدیمی‌تر قاطی می‌کنند: <code>Icon / 16px / Bell</code>، <code>Icon / 24px / call</code>، <code>Icon / 16px / Chevron tiny / down</code>، <code>Icon / 16px / Report-Off</code>. اینها کتابخانهٔ پیش از کربن‌اند.</p>
      <p>روی نام‌های کربن استاندارد شوید. حروف کوچک‌اند، با خط تیره جدا می‌شوند و به‌جای اندازه، خودِ شیء را توصیف می‌کنند: <code>notification</code>، <code>phone</code>، <code>chevron--down</code>، <code>flag</code>.</p></div>
      ${table(['نام قدیمی', 'نام کربن'], [
        ['<span class="legacy">Icon / 16px / Bell</span>', '<code>notification</code>'],
        ['<span class="legacy">Icon / 16px / Heart</span>', '<code>favorite</code>'],
        ['<span class="legacy">Icon / 24px / call</span>', '<code>phone</code>'],
        ['<span class="legacy">Icon / 24px / Close</span>', '<code>close</code>'],
        ['<span class="legacy">Icon / 16px / Report-Off</span>', '<code>flag</code>'],
        ['<span class="legacy">Icon / 16px / Chevron tiny / down</span>', '<code>chevron--down</code>'],
        ['<span class="legacy">Social-Icons/Telegram · Whatsapp · Bale</span>', '<code>logo--telegram</code>، <code>logo--whatsapp</code>، و یک آیکون سفارشی برای بله'],
      ])}`],
    ['rules', 'قواعد', guidance([
      'هر آیکون یک رنگ، به ارث رسیده از <code>currentColor</code>.',
      '<code>.t-icon--directional</code> را به شورون‌ها و فلش‌ها اضافه کنید.',
      'هرجا نسخهٔ <code>--mirror</code> کربن هست از آن استفاده کنید، نه از چرخش CSS.',
      'به آیکون مستقل نام دسترس‌پذیر بدهید؛ آیکون تزئینی را <code>aria-hidden</code> کنید.',
    ], [
      'ترکیب ۱۶ و ۲۰ در یک ردیف؛ تفاوت وزن بصری دیده می‌شود.',
      'رنگ‌کردن جداگانهٔ مسیرهای داخل یک آیکون.',
      'قرینه‌کردن آیکون غیرجهت‌دار در راست‌چین. رایج‌ترین اشتباه راست‌چین همین است.',
      'اندازه‌ای غیر از ۱۶، ۲۰ یا ۲۴.',
      'ساختن نام آیکون از خودتان. اول کتابخانه را جست‌وجو کنید.',
    ])],
  ]);

  /* ── دسترس‌پذیری (WCAG 2.2) ── */
  page('foundations/accessibility', 'دسترس‌پذیری', 'هدف WCAG 2.2 سطح AA است، با سنجش ماشینی در هر بیلد.', 'مبانی', [
    [null, null, `<div class="prose">
      <p>هدف <strong>WCAG 2.2 سطح AA</strong> است؛ تازه‌ترین نسخهٔ توصیه‌شدهٔ W3C. نیمهٔ رنگیِ آن یک آیتم بازبینی نیست: <code>build/contrast-check.mjs</code> پنجاه‌ودو جفت پیش‌زمینه و پس‌زمینه را در <strong>هر سه پوسته</strong> می‌سنجد و با هر شکست <strong>خروجی غیرصفر</strong> می‌دهد. یک دروازهٔ بیلد است.</p>
      <div class="note note--new">اجرای همین ابزار روی پالت، همان‌طور که از اسکچ استخراج شد، <strong>چهار شکست متنی و چهار شکست غیرمتنی</strong> داد. هر کدام در <a href="./color.html#changes">رنگ ← چه چیزی تغییر کرد</a> اصلاح شده است.</div>
    </div>`],
    ['new22', 'آنچه نسخهٔ ۲.۲ اضافه کرد', `<div class="prose">
      <p>نسخهٔ ۲.۲ نُه معیار تازه آورد که شش‌تایشان در سطح A یا AA هستند. این سیستم هر شش مورد را پوشش می‌دهد و برای هر کدام مشخص است کجا اعمال می‌شود.</p></div>
      ${table(['معیار', 'سطح', 'کجای این سیستم اعمال می‌شود'], [
        ['<strong>۲.۴.۱۱</strong> فوکوس پوشیده نشود', 'AA', 'هدر چسبان نباید عنصری را که تازه فوکوس گرفته بپوشاند. <code>scroll-padding-block-start</code> برابر ارتفاع نوار به‌علاوهٔ ۲۴ پیکسل روی <code>html</code>.'],
        ['<strong>۲.۴.۱۲</strong> فوکوس پوشیده نشود (بیشتر)', 'AAA', 'هیچ عنصر فوکوس‌شده‌ای هرگز جزئاً هم پوشیده نمی‌شود، چون تنها عنصر چسبان، هدر است.'],
        ['<strong>۲.۴.۱۳</strong> ظاهر فوکوس', 'AAA', 'حلقهٔ ۲ پیکسلی با فاصلهٔ ۲ پیکسل، محیط دست‌کم ۲ پیکسل، با نسبت ۳:۱ در برابر هر دو طرف در هر سه پوسته.'],
        ['<strong>۲.۵.۷</strong> حرکات کشیدنی', 'AA', 'هر کشیدنی جایگزین تک‌اشاره‌ای دارد: برگهٔ پایینی دکمهٔ بستن دارد، اسلایدر بازه با صفحه‌کلید و ورودی عددی کار می‌کند، ریل‌ها دکمهٔ پیمایش دارند.'],
        ['<strong>۲.۵.۸</strong> اندازهٔ هدف (حداقل)', 'AA', 'حداقل ۲۴×۲۴ پیکسل. قاعدهٔ این سیستم ۴۴ پیکسل است و دکمهٔ ۲۴ پیکسلی <code>xs</code> هم ناحیهٔ لمس ۴۴ پیکسلی دارد. جایی که کنترل داخل کنترل دیگری است — ضربدرِ قرص ۳۲ پیکسلی — هدف ۲۴ پیکسل دیده می‌شود و ناحیه‌اش تا ۴۴ پیکسل ارتفاع باز می‌شود، اما در محور افقی کوتاه می‌ماند تا کلیک قرص بغلی را ندزدد.'],
        ['<strong>۳.۲.۶</strong> کمک یکنواخت', 'A', 'راه‌های کمک — جست‌وجو و تماس با فروشگاه — در هر صفحه در جای یکسانی می‌نشینند.'],
        ['<strong>۳.۳.۷</strong> ورود تکراری', 'A', 'اطلاعاتی که کاربر در همان فرآیند وارد کرده دوباره پرسیده نمی‌شود؛ از پیش پر می‌شود یا از فهرست انتخاب می‌شود.'],
        ['<strong>۳.۳.۸</strong> احراز هویت دسترس‌پذیر', 'AA', 'هیچ آزمون شناختی بدون جایگزین. چسباندن رمز از مدیر رمز هرگز مسدود نمی‌شود.'],
        ['<strong>۳.۳.۹</strong> احراز هویت دسترس‌پذیر (بیشتر)', 'AAA', 'بدون معما، بدون بازشناسی تصویر.'],
      ])}`],
    ['contract', 'قرارداد', table(['حوزه', 'قاعده'], [
      ['کنتراست متن', 'دست‌کم ۴٫۵:۱. متن بزرگ و عناصر غیرمتنی رابط دست‌کم ۳:۱.'],
      ['کادر کنترل‌ها', 'از <code>--t-border-control</code> استفاده کنید که ۳:۱ را برآورده می‌کند. <code>--t-border-default</code> تزئینی است و عمداً زیر آن.'],
      ['هدف لمس', 'دست‌کم ۴۴ پیکسل، حتی جایی که کنترل بصری ۲۴ یا ۳۲ پیکسل است. دکمه‌ها یک <code>::after</code> شفاف دارند که روی اشاره‌گرهای درشت ناحیه را گسترش می‌دهد.'],
      ['فوکوس', 'حلقهٔ ۲ پیکسلی <code>--t-border-focus</code> با فاصلهٔ ۲ پیکسل. هرگز حذف نمی‌شود، فقط جایگزین. <code>outline: none</code> تنها درون <code>:focus:not(:focus-visible)</code> پذیرفتنی است.'],
      ['کنترل فقط‌آیکون', '<code>aria-label</code> اجباری است. نسخهٔ بی‌برچسب وجود ندارد.'],
      ['رنگ به‌تنهایی', 'هرگز تنها کانال نیست. نشان‌های وضعیت رنگ را با واژه جفت می‌کنند و آیتم ناوبری جاری رنگ را با وزن.'],
      ['لایه‌ها', 'تلهٔ فوکوس، بازگشت فوکوس به دکمهٔ آغازگر، بستن با Escape، <code>aria-modal</code> و قفل اسکرول بدنه — نه فقط پوشاندن آن.'],
      ['محتوای بسته', 'صفت <code>hidden</code>، نه <code>height: 0</code>. باید از درخت دسترس‌پذیری خارج شود.'],
      ['نواحی زنده', '<code>polite</code> برای نتایج و توست‌ها. <code>assertive</code> فقط برای بحرانی، چون کار کاربر را قطع می‌کند.'],
      ['حرکت', '<code>prefers-reduced-motion</code> همه‌چیز را به ۱ میلی‌ثانیه جمع می‌کند. اسپینر به‌جای ایستادن کند می‌شود.'],
      ['شفافیت', '<code>prefers-reduced-transparency</code> هر سطح شیشه‌ای را با همان هندسه مات می‌کند.'],
      ['نقشه', 'نقشه به‌تنهایی دسترس‌پذیر نیست. همیشه معادل فهرستی را هم عرضه کنید؛ <a href="../components/segmented-control.html">SegmentedControl</a> دقیقاً برای همین است.'],
    ])],
    ['persian', 'مخصوص فارسی', `<div class="prose"><ul>
      <li><strong>هرگز فاصلهٔ حرفی منفی.</strong> فارسی پیوسته است؛ فشرده‌کردن اتصال حروف را می‌شکند و می‌تواند کلمه را برای کم‌بینا ناخوانا کند.</li>
      <li><strong>هرگز یک عدد را بین چند عنصر نشکنید.</strong> صفحه‌خوان <code>&lt;span&gt;۱۵&lt;/span&gt;&lt;span&gt;٬۸۰۰&lt;/span&gt;</code> را دو عدد جدا می‌خواند.</li>
      <li><strong>صفت <code>lang</code> را درست بگذارید.</strong> <code>lang="fa"</code> روی محتوای فارسی و <code>lang="en"</code> روی رشته‌های لاتین، وگرنه صفحه‌خوان با صدا و تلفظ اشتباه می‌خواند.</li>
      <li><strong>ارتفاع خط را نگه دارید.</strong> ارتفاع خط‌های این سیستم برای دنباله‌ها و اعراب فارسی اندازه‌گذاری شده‌اند؛ فشرده‌کردنشان نشانه‌ها را می‌برد.</li>
    </ul></div>`],
    ['testing', 'تست', `<div class="prose"><ol>
      <li><strong>فقط صفحه‌کلید.</strong> با Tab کل صفحه را طی کنید. هر عنصر تعاملی قابل دسترسی، فوکوس همیشه دیده‌شونده، و ترتیب مطابق ترتیب بصری در <em>هر دو</em> جهت.</li>
      <li><strong>صفحه‌خوان.</strong> VoiceOver فارسی روی iOS و TalkBack روی اندروید. بررسی کنید که قیمت و فاصله به‌صورت یک واحد خوانده شوند.</li>
      <li><strong>بزرگ‌نمایی متن تا ۲۰۰ درصد.</strong> هیچ‌چیز بریده یا روی‌هم نیفتد.</li>
      <li><strong>کاهش حرکت و کاهش شفافیت</strong>، هر دو روشن.</li>
      <li><strong>هدف ۲۴×۲۴.</strong> هر هدف لمس را در برابر معیار ۲.۵.۸ بسنجید. سیستم ۴۴ پیکسل می‌دهد؛ کد محصول نباید آن را کم کند.</li>
      <li><strong><code>node build/contrast-check.mjs</code></strong> پیش از هر کامیتی که رنگ را لمس می‌کند.</li>
    </ol></div>`],
    ['audit', 'ممیزی ماشینی', `<div class="prose">
      <p>هر صفحهٔ این کتاب — همهٔ ۶۸ صفحه، در هر سه پوستهٔ روشن، دیم و تیره — با <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener">axe-core</a> و مجموعه‌قاعده‌های <code>wcag2a</code>، <code>wcag2aa</code>، <code>wcag21a</code>، <code>wcag21aa</code> و <code>wcag22aa</code> سنجیده می‌شود. نتیجهٔ فعلی <strong>صفر تخلف</strong> در ۲۰۴ بار اجراست.</p>
      <p>این را با «دسترس‌پذیر است» اشتباه نگیرید. ابزار خودکار در بهترین حالت حدود یک‌سوم معیارها را می‌گیرد: کنتراست، نقش‌های نادرست، نام‌های جاافتاده، اندازهٔ هدف. آنچه نمی‌گیرد و آدم باید ببیند: ترتیب منطقی فوکوس، متن جایگزین <em>درست</em> (نه فقط موجود)، اینکه صفحه‌خوان قیمت را یک عدد بخواند، و اینکه یک جریان با صفحه‌کلید واقعاً تمام‌شدنی باشد.</p>
      <div class="note">آنچه ممیزی این نسخه اصلاح کرد: نوار جست‌وجوی سایت حالا الگوی <code>combobox</code> استاندارد ARIA 1.2 است؛ هر ناحیهٔ اسکرول‌شوندهٔ کد و جدول با صفحه‌کلید قابل پیمایش شده؛ تقویم شمسی ردیف و سرستون گرفت؛ منو همهٔ فرزندانش <code>menuitem</code> شدند؛ <code>aria-sort</code> از دکمه به سرستون رفت؛ قرص قابل‌حذف از «دکمه داخل دکمه» به دو دکمهٔ کنار هم تبدیل شد؛ و سه جفت رنگ که AA را رد می‌کردند اصلاح و در <a href="./color.html#changes">رنگ ← چه چیزی تغییر کرد</a> ثبت شدند.</div>
    </div>`],
  ]);

  /* ── محتوا و لحن ── */
  page('foundations/content', 'محتوا و لحن', 'فارسی، مستقیم، بدون حشو. کاربر وسط کار است، روی گوشی.', 'مبانی', [
    [null, null, `<div class="prose"><p>هر رشتهٔ متن در محصول فارسی است و هر خواننده وسط کاری است، معمولاً یک‌دستی و اغلب روی اتصالی کند. متن وقتی جایش را می‌گیرد که او را جلو ببرد.</p></div>`],
    ['principles', 'اصول', guidance([
      'کنترل‌ها نتیجه را نام می‌برند: «مشاهده فروشندگان»، نه «بیشتر».',
      'خطاها اول مشکل را می‌گویند و بعد راه جبران را — به همین ترتیب.',
      'حالت خالی «نتیجه‌ای نبود» را از «هنوز چیزی اینجا نیست» جدا می‌کند. متن و کنش متفاوت.',
      'تأییدها نتیجه‌ها را نام می‌برند: «حذف آدرس» / «انصراف».',
      'اعداد فارسی در همهٔ سطوح محصول.',
    ], [
      '«چیزی یافت نشد» بدون قدم بعدی. خطای بدون راه جبران یک بن‌بست است.',
      'سرزنش کاربر برای ترکیب فیلتری که خود رابط اجازه‌اش را داد.',
      '«تأیید / انصراف». اینها دیالوگ را توصیف می‌کنند، نه نتیجه را.',
      'توست دوخطی. اگر دو خط لازم دارد، یک Alert است.',
      'واژهٔ انگلیسی رابط، جایی که معادل فارسی وجود دارد.',
    ])],
    ['patterns', 'الگوهای متن', table(['موقعیت', 'الگو', 'نمونه'], [
      ['نتیجه‌ای پس از فیلتر نبود', 'فیلتری را که باید حذف شود نام ببرید', '«فروشگاهی با این فیلترها پیدا نشد — فیلتر «باز الان» را بردارید»'],
      ['هنوز چیزی اضافه نشده', 'بگویید چه کسی می‌تواند تغییرش دهد', '«محصولی اضافه نشده — برای اطلاع از محصولات با فروشگاه تماس بگیرید»'],
      ['خطای شبکه', 'اول علت، بعد کنش', '«اتصال به اینترنت برقرار نیست — نتایج مربوط به آخرین بازدید شماست»'],
      ['کنش تأیید شد', 'زمان گذشته، به‌علاوهٔ واگرد', '«به علاقه‌مندی‌ها اضافه شد» + «واگرد»'],
      ['تأیید مخرب', 'شیء و قطعی‌بودن را نام ببرید', '«حذف آدرس ذخیره‌شده؟ … این کار قابل بازگشت نیست.»'],
      ['ناموجود', 'ساده بگویید و جایگزین بدهید', '«ناموجود» + «فروشگاه‌های دیگر»'],
      ['تبلیغاتی', 'افشا، همیشه', '«آگهی»'],
    ])],
    ['terms', 'واژگان', `<div class="prose"><p>واژگان ثابت. اینها را بازنویسی نکنید؛ مفاهیم محصولی با بار قانونی یا تجاری‌اند.</p></div>
      ${table(['فارسی', 'یعنی', 'یادداشت'], [
        ['ضمانت ترب', 'Torob Guarantee', 'نشان اعتماد. نیلی. در سوآچ‌های اسکچ «Gaurantee» غلط نوشته شده.'],
        ['آگهی', 'Sponsored / Ad', 'افشای الزامی. همیشه دیده می‌شود، همیشه متن واقعی.'],
        ['نمایندگی رسمی', 'Official dealer', 'آبی.'],
        ['کالابرگ', 'Kalabarg', 'کوپن یارانه‌ای دولتی. ترجمه نمی‌شود.'],
        ['ناموجود', 'Out of stock', 'خاکستری، نه قرمز. نبود کالا خطا نیست.'],
        ['باز الان', 'Open now', 'نقطهٔ سبز به‌علاوهٔ واژه.'],
        ['از … تومان', 'From X Toman', 'وقتی چند فروشنده محصول را دارند.'],
      ])}`],
  ]);

  /* ── تغییرات ── */
  page('changelog', 'تغییرات', 'چه چیزی منتشر شد و چه چیزی نسبت به منبع اسکچ تغییر کرد.', 'مرور کلی', [
    [null, null, `<div class="prose">
      <h2 style="margin-block-start:0">۱.۱.۰</h2>
      <h3>افزوده شد</h3>
      <ul>
        <li><strong>پوستهٔ سوم.</strong> آنچه محصول «تیره» می‌نامید یک لاجوردی ملایم بود، پس حالا <code>dim</code> نام دارد؛ <code>dark</code> یک نردبان نزدیک‌به‌مشکی واقعی برای OLED است با دستور شیشهٔ خودش.</li>
        <li><strong>سه خانوادهٔ رنگی دکمه</strong> به‌صورت صریح: قرمز، آبی، مشکی. نام‌های مبتنی بر نیت به‌عنوان نام مستعار می‌مانند.</li>
        <li><strong>نردبان Ink</strong> که خانوادهٔ مشکی واقعاً روی آن اجرا می‌شود.</li>
        <li><strong>وب‌سایت کاملاً فارسی و راست‌چین</strong>، از چرم سایت تا هر ۳۲ صفحهٔ کامپوننت.</li>
        <li><strong>دروازهٔ هم‌سانی کلید پوسته‌ها</strong>: هر سه فایل پوسته باید مجموعه کلید یکسانی تعریف کنند.</li>
        <li><strong>انتشار روی گیت‌هاب پیجز</strong> از همان ژنراتوری که نسخهٔ محلی را می‌سازد.</li>
      </ul>
      <h3>اصلاح شد</h3>
      <ul>
        <li><strong>باکس خرید</strong> حالا دقیقاً با اسکچ می‌خواند: ۳۴۳×۷۲ با گردی ۱۶ (پیش‌تر ۱۲)، لبهٔ داخلی هم‌خانواده، و آفلاین <em>آبی</em> است نه خط‌دار.</li>
        <li><strong>جهت هاور دکمه</strong> وارونه بود. پیش‌فرض گرادیان است و هاور به رنگ تخت جمع می‌شود.</li>
        <li><strong>لبهٔ داخلی ۱ پیکسلی</strong> که کاملاً جا افتاده بود، بازگردانده شد.</li>
        <li><strong>برچسب غیرفعال</strong>: <code>#737373</code> روی <code>#ECEDEF</code> نسبت ۴٫۰۵:۱ می‌داد. حالا ۴٫۸:۱ است.</li>
        <li><strong>نشان آگهی</strong> یک قرص تخت <code>#D70040</code> است، نه نشان زرد ملایم.</li>
        <li><strong>ناوبری موبایل</strong> در راست‌چین به سمت اشتباه می‌لغزید.</li>
        <li><strong>شست کلید Switch</strong> از <code>offsetLeft</code> فیزیکی در برابر یک ویژگی منطقی استفاده می‌کرد و در راست‌چین زیر گزینهٔ اشتباه می‌نشست.</li>
        <li><strong>ابعاد داخل متن فارسی</strong> بدون ایزوله‌سازی وارونه خوانده می‌شدند.</li>
      </ul>
      <h2>۱.۰.۰</h2>
      <p class="t-tone-secondary" style="margin-block-start:-8px">سیستم اولیه، تولیدشده از <code>Torob Tokens.sketch</code> و <code>T IBM Icons (16px, 20px).sketch</code>.</p>
      <ul>
        <li>معماری سه‌لایهٔ توکن با قالب استاندارد W3C DTCG.</li>
        <li>۳۲ کامپوننت در شش گروه، که ۱۶ تای آنها تازه‌اند؛ کل لایهٔ بازخورد و کل لایهٔ لایه‌ها در کیت غایب بودند.</li>
        <li>۲٬۰۴۱ آیکون IBM Carbon در ۱۶ و ۲۰ پیکسل.</li>
        <li>سرور MCP با نُه ابزار، از جمله <code>validate_code</code>.</li>
        <li>IRANYekanX در نُه وزن به‌صورت woff2 (۹۰۴ کیلوبایت TTF ← ۲۹۱ کیلوبایت).</li>
        <li>شش نقطهٔ شکست و رفتار واکنش‌گرای هر کدام؛ منبع فقط ۳۷۵ پیکسل بود.</li>
      </ul>
      <h3>خلأهای شناخته‌شده</h3>
      <ul>
        <li>۲۱ آیکون از ۲٬۰۶۲ آیکون کتابخانهٔ اسکچ در Carbon 11.88 معادلی ندارند؛ ۱۳ مورد نشانه‌های داخلی منسوخ IBM‌اند و ۴ مورد آرت‌بوردهایی که دو نام آیکون را با کاما در یک نام جا داده‌اند. فهرست در <code>packages/icons/unmatched.json</code>.</li>
        <li>پکیج ری‌اکت فقط سورس است و هنوز روی رجیستری منتشر نشده.</li>
      </ul>
    </div>`],
  ]);

  return P;
}
