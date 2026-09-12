import { specimen, section, table, guidance, esc, toFa } from './site-lib.mjs';
import { getFacts } from './facts.mjs';

const sw = (name, value, note) => `<button class="swatch" data-copy-text="var(${name})" title="Copy var(${name})">
  <div class="swatch__chip" style="background:${value}"></div>
  <div class="swatch__meta"><div class="swatch__name">${esc(name.replace('--t-', ''))}</div><div class="swatch__val">${esc(value)}</div>${note ? `<div class="swatch__val">${esc(note)}</div>` : ''}</div>
</button>`;

const grid = items => `<div class="swatch-grid">${items.join('')}</div>`;

/* ─────────────────────────── COLOUR ─────────────────────────── */
export function colorPage(m) {
  const toc = [], S = (id, t, inner) => { toc.push({ id, label: t }); return section(id, t, inner); };
  const fam = (prefix) => Object.entries(m.base).filter(([p]) => p.startsWith(`color.${prefix}.`))
    .map(([p, t]) => sw('--t-' + p.replace(/\./g, '-'), t.value, t.description?.startsWith('[NEW]') ? 'NEW' : ''));
  const chip = v => `<span style="display:inline-flex;align-items:center;gap:7px"><span style="inline-size:15px;block-size:15px;border-radius:4px;border:1px solid var(--t-border-subtle);background:${v}"></span><code>${esc(String(v))}</code></span>`;
  const semantic = (prefix) => Object.entries(m.modes.light).filter(([p]) => p.startsWith(prefix))
    .map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`,
      chip(t.value),
      chip(m.modes.dim[p]?.value ?? t.value),
      chip(m.modes.dark[p]?.value ?? t.value),
      t.description ?? '']);

  let body = `<div class="prose">
    <p>نُه خانواده به‌علاوهٔ رنگ برند. <strong>Sky</strong> ستون فقرات است؛ بین پوسته‌ها یکجا وارونه می‌شود و هر سطح، کادر و فام متن خنثی را حمل می‌کند. بقیه معنا دارند.</p>
    <div class="note"><strong>از توکن‌های معنایی استفاده کنید، نه پایه‌ای.</strong> <code>--t-fg-default</code> خودش در روشن به Sky 800 و در تیره به Sky 100 حل می‌شود. اگر مستقیم سراغ <code>--t-color-sky-800</code> بروید، خودتان را به یک پوسته میخکوب می‌کنید و بقیه را می‌شکنید.</div>
  </div>`;

  body += S('semantic', 'توکن‌های معنایی', `<div class="prose"><p>این همان لایه‌ای است که کد محصول مصرف می‌کند. هر توکن زیر در هر پوسته مقدار خودش را می‌گیرد.</p></div>
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">سطوح</h3>${table(['توکن', 'روشن', 'ملایم', 'تیره', 'یادداشت'], semantic('bg.'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">پیش‌زمینه</h3>${table(['توکن', 'روشن', 'ملایم', 'تیره', 'یادداشت'], semantic('fg.'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">کادرها</h3>${table(['توکن', 'روشن', 'ملایم', 'تیره', 'یادداشت'], semantic('border.'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">تجارت</h3>
    <div class="prose"><p>Torob-specific meaning. These are load-bearing — do not substitute a generic status colour for <code>commerce.oos</code> or <code>commerce.ad</code>.</p></div>
    ${table(['توکن', 'روشن', 'ملایم', 'تیره', 'یادداشت'], semantic('commerce.'))}`);

  body += S('status', 'وضعیت', `<div class="prose">
      <p>پنج نیت به‌علاوهٔ خنثی. هر کدام چهار نقش دارند: <code>fg</code>، <code>bg</code>، <code>border</code> و <code>solid</code>.</p>
      <div class="note note--new"><strong>نردبان‌های تیره از نو استخراج شده‌اند، نه بازاستفاده.</strong> منبع اسکچ مقادیر روشن را عیناً در هر دو حالت فرستاده بود، یعنی متن سبز <code>#003D01</code> روی زمینهٔ <code>#15202B</code> — عملاً نامرئی. هر نردبان تیره اینجا مقدار متفاوتی دارد و کنتراستش سنجیده شده.</div>
    </div>
    ${table(['توکن', 'روشن', 'ملایم', 'تیره', 'یادداشت'], semantic('status.'))}
    ${specimen({ label: 'وضعیت در عمل', canvas: 'fog', html: `<span class="t-badge t-badge--positive">باز الان</span><span class="t-badge t-badge--caution">موجودی کم</span><span class="t-badge t-badge--critical">ناموجود</span><span class="t-badge t-badge--info">نمایندگی رسمی</span><span class="t-badge t-badge--guarantee">ضمانت ترب</span><span class="t-badge">کالابرگ</span>` })}`);

  body += S('primitives', 'رنگ‌های پایه', `<div class="prose"><p>پالت خام، عیناً از <code>sharedSwatches</code> منبع اسکچ استخراج شده. مقادیر با نشان <strong>NEW</strong> افزوده یا اصلاح شده‌اند. روی هر سوآچ کلیک کنید تا متغیرش کپی شود.</p></div>
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">برند</h3>${grid(fam('brand'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Sky — ستون خنثی</h3>${grid(fam('sky'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">آبی</h3>${grid(fam('blue'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">قرمز</h3>${grid(fam('red'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">سبز</h3>${grid(fam('green'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">زرد</h3>${grid(fam('yellow'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">بنفش</h3>${grid(fam('purple'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">نارنجی</h3>${grid(fam('orange'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">ضمانت ترب</h3>${grid(fam('guarantee'))}`);

  body += S('changes', 'چه چیزی نسبت به منبع اسکچ تغییر کرد', `<div class="prose">
    <p>سیزده اصلاح. هر کدام یا یک شکست دسترس‌پذیری بود یا یک نردبان شکسته. هیچ‌کدام تصمیم سلیقه‌ای نیست.</p></div>
    ${table(['تغییر', 'چرا'], [
      ['<code>sky.600</code> added', 'Sky 500 یعنی <code>#64748B</code> روی بوم نسبت ۴٫۳۴:۱ می‌دهد که زیر AA است. متن ثانویه حالا <code>#5E6D83</code> با نسبت ۴٫۸۰:۱ است.'],
      ['<code>red.600</code> added', 'قرمز برند به‌عنوان <em>متن</em> روی بوم ۴٫۲۰:۱ می‌دهد. پرکردن، لوگو و پین نقشه همان <code>#D73948</code> اصلی را نگه می‌دارند؛ متن از <code>#CD2A39</code> استفاده می‌کند.'],
      ['<code>red.350</code>, <code>red.200</code> added', 'پیش‌زمینهٔ برند و بحرانی روی زمینهٔ تیره هر دو رد شدند. روشن‌تر و دوباره سنجیده شدند.'],
      ['<code>green.600</code> added', '<code>#4CAF50</code> روی سفید ۲٫۷۸:۱ می‌دهد که زیر حداقل ۳:۱ برای نشانگر غیرمتنی «باز الان» است.'],
      ['<code>purple.300</code> corrected', 'منبع <code>#9333EA</code> داشت که از <code>purple.500</code> تیره‌تر است. یک نردبان وارونه.'],
      ['<code>guarantee.50</code> corrected', 'منبع <code>#D6F1FF</code> داشت؛ فیروزه‌ای، خارج از خانوادهٔ نیلی ۳۰۰ و ۸۰۰.'],
      ['<code>orange</code>, <code>yellow.200/400</code>, <code>purple.200</code>, <code>guarantee.500</code> added', 'نارنجی فقط یک ۵۰۰ داشت. بقیه خلأهایی داشتند که مقادیر دستی موردی را تحمیل می‌کردند.'],
      ['<code>border.control</code> split from <code>border.default</code>', 'معیار ۱.۴.۱۱ برای مرز کنترل‌ها نسبت ۳:۱ می‌خواهد. جداکنندهٔ تزئینی فهرست به آن نیازی ندارد؛ یک توکن نمی‌توانست هر دو را سرویس بدهد.'],
      ['<code>border.selected</code> darkened on light', 'Blue 300 روی کارت ۲٫۵۴:۱ می‌دهد. Blue 500 همان زبان آبی را با ۴٫۷۹:۱ نگه می‌دارد. پوسته‌های تیره Blue 300 را نگه می‌دارند.'],
      ['همهٔ نردبان‌های وضعیت تیره از نو استخراج شدند', 'منبع مقادیر روشن را عیناً در حالت تیره تکرار کرده بود.'],
      ['<code>commerce.price-from</code>, <code>distance</code>, <code>closed</code>, <code>oos</code> → <code>sky.600</code>', 'همان مشکل Sky 500: این‌ها متن ۱۲ پیکسلی روی بوم خاکستری‌اند و ۴٫۳۴:۱ می‌دادند. حالا ۴٫۸۰:۱.'],
      ['<code>map.pill-fg</code> added', 'متن قرص قیمت روی نقشه در پوسته‌های تیره Blue 500 بود، یعنی ۲٫۷۳:۱ روی سطح تیره. در تیره Blue 300 شد (۵٫۶۴:۱)؛ روشن همان Blue 500 ماند.'],
      ['نشان «آگهی» روی جعبهٔ خرید آبی', 'سفید روی Blue 300 نسبت ۲٫۵۴:۱ می‌داد. رنگ قرص همان ماند و متن تیره شد (۵٫۷۵:۱).'],
    ])}
    <div class="note"><strong>خودتان راستی‌آزمایی کنید:</strong> دستور <code>node build/contrast-check.mjs</code> ${toFa(getFacts().contrastPairs)} جفت پیش‌زمینه و پس‌زمینه را در هر سه پوسته اجرا می‌کند و با هر شکست AA خروجی غیرصفر می‌دهد. این یک دروازه است، نه یک گزارش.</div>`);

  return { body, toc, title: 'رنگ', description: 'نُه خانواده به‌علاوهٔ برند. Sky ستون فقرات است؛ بقیه معنا حمل می‌کنند.', eyebrow: 'مبانی' };
}

/* ─────────────────────────── TYPOGRAPHY ─────────────────────────── */
export function typographyPage(m) {
  const toc = [], S = (id, t, inner) => { toc.push({ id, label: t }); return section(id, t, inner); };
  const row = (cls, label, size, lh, weight, oldName) => `<tr>
    <td><code>.${cls}</code></td>
    <td>${size} / ${lh}</td><td>${weight}</td>
    <td>${oldName ? `<span class="legacy">${esc(oldName)}</span>` : '—'}</td>
    <td dir="rtl" lang="fa" class="${cls}" style="white-space:nowrap">فروشگاه‌های اطراف</td>
  </tr>`;

  let body = `<div class="prose">
    <p><strong>IRANYekanX</strong> کل سیستم را حمل می‌کند: فارسی، لاتین و هر دو مجموعهٔ اعداد. سه وزن کار را انجام می‌دهند: <strong>Medium ۵۰۰</strong> پیش‌فرض متن، <strong>Bold ۷۰۰</strong> برای تأکید و <strong>ExtraBold ۸۰۰</strong> برای عنوان‌ها.</p>
    <div class="note"><strong>Medium، نه Regular.</strong> کیت اولیه همهٔ استایل‌های متن را روی Medium گذاشته و همین درست است: وزن Regular برای فارسی در اندازه‌های رابط کاربری بیش‌ازحد نازک است، جایی که تراکم نقطه‌ها و اعراب، ضخامت قلم را می‌خورد.</div>
  </div>`;

  body += S('scale', 'مقیاس', `<div class="prose"><p>شش اندازه، هر کدام با ارتفاع خط ثابت. نسبت‌ها بین ۱٫۶۷ تا ۱٫۷۵ هستند؛ سخاوتمند برای فارسی و غیرقابل مذاکره: فارسی دنباله‌های عمیق و اعراب روی‌هم دارد که ارتفاع خط ۱٫۴ آنها را می‌برد.</p></div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>کلاس</th><th>اندازه / ارتفاع خط</th><th>وزن</th><th>قبلاً</th><th>نمونه</th></tr></thead>
      <tbody>
        ${row('t-h1', 'H1', '24px', '40px', 'ExtraBold 800', 'Heading/H1')}
        ${row('t-h2', 'H2', '20px', '36px', 'ExtraBold 800', 'Heading/H2')}
        ${row('t-h3', 'H3', '18px', '32px', 'ExtraBold 800', 'Heading/H3')}
        ${row('t-h4', 'H4', '16px', '28px', 'Bold 700', 'Heading/H4')}
        ${row('t-h5', 'H5', '14px', '24px', 'Bold 700', 'Heading/H5')}
        ${row('t-body-lg', 'Body large', '16px', '28px', 'Medium 500', 'Normal/NR main')}
        ${row('t-body-lg-strong', 'Body large strong', '16px', '28px', 'Bold 700', 'Normal/NB main')}
        ${row('t-body-md', 'Body medium', '14px', '24px', 'Medium 500', 'Small/SR main')}
        ${row('t-body-md-strong', 'Body medium strong', '14px', '24px', 'Bold 700', 'Small/SB main')}
        ${row('t-body-sm', 'Body small', '12px', '20px', 'Medium 500', 'Tiny/TR main')}
        ${row('t-body-sm-strong', 'Body small strong', '12px', '20px', 'Bold 700', 'Tiny/TB bold')}
      </tbody></table></div>`);

  body += S('tone', 'فام', `<div class="prose"><p>رنگ محوری جدا از اندازه است. ترکیبشان کنید: <code>class="t-body-md t-tone-secondary"</code>. چهار فام روی Sky نگاشت می‌شوند و با پوسته وارونه می‌شوند.</p></div>
    ${specimen({ label: 'فام‌ها', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<span class="t-body-lg t-tone-default">متن اصلی — قیمت و عنوان محصول</span>
<span class="t-body-lg t-tone-secondary">متن ثانویه — تعداد فروشگاه و فاصله</span>
<span class="t-body-lg t-tone-disabled">غیرفعال — گزینه در دسترس نیست</span>
<span class="t-body-lg t-tone-brand">برند — قیمت ویژه</span>` })}
    <div class="prose"><p>فام <code>reverse</code> در منبع حالا <code>t-tone-inverse</code> است، برای متن روی سطح پرشده یا معکوس.</p></div>`);

  body += S('naming', 'نام‌گذاری', `<div class="prose">
      <p>نام‌های منبع رمزی بودند. <code>Tiny/TR sec</code> هیچ سرنخی نمی‌دهد که TR یعنی «Tiny Regular» — و اصلاً Regular نیست، Medium است. نام‌های تازه اندازه و نقش را می‌گویند.</p>
      <p>دو نسل نام‌گذاری در فایل اسکچ کنار هم زندگی می‌کنند. لایهٔ کتابخانهٔ قدیمی‌تر از <code>ui / small / regular 50</code> با IRANYekan قبل از نسخهٔ X استفاده می‌کند و نسل تازه‌تر از <code>Tiny/TR sec</code>. هر دو اینجا نگاشت شده‌اند.</p>
    </div>
    ${table(['نام تازه', 'قبلاً (نسل اخیر)', 'قبلاً (کتابخانهٔ قدیمی)'], [
      ['<code>.t-body-sm t-tone-secondary</code>', '<span class="legacy">Tiny/TR sec</span>', '<span class="legacy">ui / small / regular 50</span>'],
      ['<code>.t-body-sm</code>', '<span class="legacy">Tiny/TR main</span>', '<span class="legacy">ui / small / regular 80</span>'],
      ['<code>.t-body-sm-strong t-tone-inverse</code>', '<span class="legacy">Tiny/TB reverse</span>', '<span class="legacy">ui / small / bold reverse</span>'],
      ['<code>.t-body-md-strong</code>', '<span class="legacy">Small/SB main</span>', '<span class="legacy">ui / normal / bold 80</span>'],
      ['<code>.t-body-lg-strong</code>', '<span class="legacy">Normal/NB main</span>', '<span class="legacy">ui / large / bold 80</span>'],
      ['<code>.t-body-lg-strong t-tone-inverse</code>', '<span class="legacy">Normal/NB reverse</span>', '<span class="legacy">ui / large / bold reverse</span>'],
      ['<code>.t-h5</code>', '<span class="legacy">Heading/H5</span>', '<span class="legacy">heading / h5</span>'],
    ])}`);

  body += S('numerals', 'اعداد و متن دوجهته', `<div class="prose">
      <p>ترب اعداد فارسی (۰۱۲۳۴۵۶۷۸۹) را با جداکنندهٔ هزارگان ٬ و اعشار ٫ نشان می‌دهد. نام‌های لاتین محصول مدام داخل رشته‌های فارسی می‌آیند (<em>گوشی اپل iPhone 11</em>)، پس متن دوجهته قاعده است، نه استثنا.</p>
      <ul>
        <li><strong>در فهرست‌ها همیشه ارقام جدولی.</strong> کلاس <code>.t-num-tabular</code>. ستونی از قیمت‌های متناسب قابل مرور نیست.</li>
        <li><strong>رشته‌های غیرقابل‌پیش‌بینی را ایزوله کنید</strong> با <code>.t-bidi</code> (<code>unicode-bidi: isolate</code>). وگرنه نام فروشگاه و شمارهٔ مدل که کاربر وارد کرده، جملهٔ اطرافشان را جابه‌جا می‌کنند.</li>
        <li><strong>هرگز یک عدد را بین چند عنصر نشکنید.</strong> صفحه‌خوان <code>&lt;span&gt;۱۵&lt;/span&gt;&lt;span&gt;٬۸۰۰&lt;/span&gt;</code> را دو عدد جدا می‌خواند.</li>
      </ul>
    </div>
    ${specimen({ label: 'جدولی در برابر متناسب', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div style="display:flex;gap:34px">
  <div><div class="t-body-sm t-tone-secondary" style="margin-block-end:6px">Tabular ✓</div>
    <div class="t-body-lg-strong t-num-tabular">۱۵٬۸۰۰٬۰۰۰</div>
    <div class="t-body-lg-strong t-num-tabular">۹٬۹۹۰٬۰۰۰</div>
    <div class="t-body-lg-strong t-num-tabular">۲۳٬۵۵۰٬۰۰۰</div></div>
  <div><div class="t-body-sm t-tone-secondary" style="margin-block-end:6px">Proportional ✗</div>
    <div class="t-body-lg-strong">۱۵٬۸۰۰٬۰۰۰</div>
    <div class="t-body-lg-strong">۹٬۹۹۰٬۰۰۰</div>
    <div class="t-body-lg-strong">۲۳٬۵۵۰٬۰۰۰</div></div>
</div>` })}`);

  body += S('rules', 'قواعد', guidance([
    'متن اصلی را Medium ۵۰۰ بگذارید. Regular برای فارسی روی نمایشگر بیش‌ازحد نازک است.',
    'ارتفاع خط‌ها را همان‌طور که هست نگه دارید. برای دنباله‌ها و اعراب فارسی اندازه‌گذاری شده‌اند.',
    'ارقام جدولی در هر فهرستی از اعداد.',
    'رشته‌های متنی غیرقابل‌پیش‌بینی را در <code>.t-bidi</code> بپیچید.',
  ], [
    'فاصلهٔ حرفی منفی. فارسی پیوسته است؛ فشرده‌کردن، اتصال حروف را می‌شکند.',
    'وزن‌های خارج از ۵۰۰ / ۷۰۰ / ۸۰۰ در رابط محصول. بقیهٔ وزن‌ها عرضه می‌شوند اما بخشی از سیستم نیستند.',
    'ضخیم مصنوعی. هر وزن برش واقعی خودش را دارد؛ ضخیم جعلی مرورگر، فرم حروف فارسی را نابود می‌کند.',
    'فونت جایگزین لاتین جلوتر از IRANYekanX در پشته؛ اعدادشان با هم نمی‌خوانند.',
  ]));

  return { body, toc, title: 'تایپوگرافی', description: 'IRANYekanX در سه وزن، روی مقیاسی سخاوتمند برای فارسی.', eyebrow: 'مبانی' };
}
