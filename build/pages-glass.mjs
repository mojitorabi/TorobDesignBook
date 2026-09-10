import { specimen, section, table, guidance } from './site-lib.mjs';

export function glassPage(m) {
  const toc = [], S = (id, t, inner) => { toc.push({ id, label: t }); return section(id, t, inner); };

  let body = `<div class="prose">
    <p>شیشهٔ اپل <strong>ضخیم</strong> است: ۵۰ تا ۸۰ پیکسل بلور، تقویت اشباع، هایلایت‌های براق لایه‌لایه، و عدسی‌ای که آنچه پشتش هست را خم می‌کند. شیشهٔ ترب <strong>نازک</strong> است: یک ورق نیمه‌شفاف از رنگ سطح، یک لبهٔ مویی، و سایه‌ای آن‌قدر کوچک که به‌جای سایهٔ افتاده، مثل یک لبهٔ بلندشده خوانده شود.</p>
    <p>همین خویشتن‌داری نکتهٔ اصلی است. شیشه اینجا یک متریال <em>ساختاری</em> است: سطحی را نشان می‌دهد که بالای محتوا شناور است — یک نوار، یک برگه، یک ریل فیلتر، یک کنترل روی نقشه. هرگز تزئین نیست.</p>
  </div>

  ${specimen({ label: 'متریال، روی نقشه', canvas: 'map', stageClass: 'spec__stage--center', html: `<div style="display:flex;flex-direction:column;gap:12px;align-items:center">
  <div class="t-glass" style="padding:14px 18px;min-inline-size:250px"><span class="t-body-md-strong">۳۰٪ — سطح شناور</span><div class="t-body-sm t-tone-secondary">نوار، برگه، ریل فیلتر</div></div>
  <div class="t-glass t-glass--list" style="padding:14px 18px;min-inline-size:250px"><span class="t-body-md-strong">۵۰٪ — پس‌زمینهٔ فهرست</span><div class="t-body-sm t-tone-secondary">محتوا داخلش اسکرول می‌شود</div></div>
  <div class="t-glass t-glass--selected" style="padding:14px 18px;min-inline-size:250px"><span class="t-body-md-strong">۶۰٪ — انتخاب‌شده</span><div class="t-body-sm t-tone-secondary">بدون ارتفاع، با حلقهٔ آبی</div></div>
</div>` })}`;

  body += S('recipe', 'دستور ساخت', `<div class="prose"><p>عیناً از دوازده استایل لایهٔ شیشه‌ای یکتا در <code>Torob Tokens.sketch</code> استخراج شده است.</p></div>
    ${table(['', 'روشن', 'ملایم', 'تیره'], [
      ['<strong>ته‌رنگ</strong>', '<code>rgba(255,255,255,0.30)</code>', '<code>rgba(33,43,54,0.30)</code>', '<code>rgba(28,33,39,0.44)</code>'],
      ['<strong>لبهٔ مویی</strong>', '<code>1px #FFFFFF</code>', '<code>1px #212B36</code>', '<code>rgba(120,131,143,0.28)</code>'],
      ['<strong>ریزسایه</strong>', '<code>-0.5px 0.5px 1px #CBD5E1</code>', '<code>-0.5px 0.5px 1px #475569</code>', '<code>-0.5px 0.5px 1px rgba(0,0,0,.6)</code>'],
      ['<strong>حلقهٔ انتخاب</strong>', '<code>0.5px #3468CC</code>', '<code>0.5px #60A5FA</code>', '<code>0.5px #60A5FA</code>'],
      ['<strong>بلور پس‌زمینه</strong>', '<code>16px</code> <span class="status-pill status-pill--new">افزوده</span>', '<code>16px</code>', '<code>16px</code>'],
      ['<strong>اشباع</strong>', '<code>1</code> — بدون تقویت', '<code>1</code>', '<code>1</code>'],
    ])}
    <div class="note note--new"><strong>بلور تنها چیزی است که اضافه شده.</strong> منبع اسکچ هیچ‌جا بلور پس‌زمینه ندارد؛ حتی یک لایه. شیشه فقط نیمه‌شفافی بود. روی نقشه یا شبکهٔ متراکم محصول، این کدر خوانده می‌شود نه شیشه‌ای، چون چیزی نیست که پیش‌زمینه را از پس‌زمینه جدا کند. ۱۶ پیکسل یک‌چهارم مقدار اپل است و برای همین کار کافی است. با <code>--t-glass-blur: 0px</code> دقیقاً همان چیزی می‌شود که در اسکچ طراحی شده.</div>
    <div class="note"><strong>پوستهٔ تیرهٔ واقعی ته‌رنگ خودش را دارد.</strong> ته‌رنگ <code>#212B36</code> پوستهٔ ملایم روی زمینهٔ مشکی مثل یک کارت خاکستری خوانده می‌شود، نه شیشه، چون چیز تیره‌تری پشتش نیست. پوستهٔ تیره یک ته‌رنگ نزدیک‌به‌مشکی با آلفای بالاتر می‌گیرد تا هنوز نیمه‌شفاف دیده شود.</div>`);

  body += S('ladder', 'نردبان شفافیت', `<div class="prose">
      <p>شفافیت تنها اهرمی است که تغییر می‌کند. سه پله دارد و هر کدام معنای متفاوتی می‌دهند. این همان بخشی است که تیم‌ها اشتباه می‌گیرند، پس ارزش دارد صریح گفته شود:</p>
    </div>
    ${table(['سطح', 'کلاس', 'شفافیت', 'لبه', 'سایه', 'یعنی'], [
      ['سطح شناور', '<code>.t-glass</code>', '۳۰٪', 'مویی', 'دارد', 'سطحی که <em>بالای</em> محتوا شناور است'],
      ['فهرست', '<code>.t-glass--list</code>', '۵۰٪', 'ندارد', 'ندارد', 'برگه‌ای که محتوا <em>داخلش</em> اسکرول می‌شود'],
      ['ثابت', '<code>.t-glass--solid</code>', '۶۰٪', 'ندارد', 'ندارد', 'در حالت آرامش، هم‌سطح با اطرافش'],
      ['انتخاب‌شده', '<code>.t-glass--selected</code>', '۶۰٪', '۰٫۵ پیکسل آبی', 'ندارد', 'انتخاب‌شده'],
      ['ریل فیلتر', '<code>.t-glass--filters</code>', '۳۰٪', 'مویی بیرونی', 'هایلایت بالا + لبه', 'ریلی که بالای فهرست در حال اسکرول نشسته'],
    ])}
    <div class="prose"><p><strong>ارتفاع روی شیشه دوحالته است.</strong> یک سطح شیشه‌ای یا ریزسایهٔ مویی را دارد یا ندارد. نردبان سایه وجود ندارد؛ آن مال <a href="./elevation.html">سطوح مات</a> است. عمق فراتر از لبهٔ مویی را شفافیت و حلقهٔ انتخاب می‌رسانند.</p></div>`);

  body += S('budget', 'بودجهٔ کارایی', `<div class="prose">
      <p><code>backdrop-filter</code> کامپوزیتور را مجبور می‌کند هر فریمی که عنصر حرکت می‌کند، همهٔ آنچه پشتش هست را دوباره نمونه‌برداری کند. روی سخت‌افزار میان‌ردهٔ اندروید که بیشتر ترافیک ترب را می‌سازد، این تفاوت میان یک اسکرول ۶۰ فریمی و یک اسکرول به‌وضوح پرش‌دار است.</p>
      <p>پس بودجه یک عدد سخت است، نه یک پیشنهاد:</p>
    </div>
    <div class="note note--warn"><strong>حداکثر سه سطح با <code>backdrop-filter</code> در هر کادر دید.</strong> توکن: <code>--t-glass-max-layers: 3</code>. یک هدر چسبان، یک ریل فیلتر و یک برگهٔ پایینی کل سهمیه است. شبکه‌ای از کارت‌های شیشه‌ای، شیشه نیست؛ یک باگ نرخ فریم است.</div>
    <div class="prose"><ul>
      <li>هرگز شیشه روی آیتم فهرست، ردیف جدول یا هر چیزی که تکرار می‌شود.</li>
      <li>هرگز شیشه درون شیشه. لایهٔ داخلی خروجی لایهٔ بیرونی را نمونه‌برداری می‌کند و هر دو دوباره ترکیب می‌شوند.</li>
      <li>شفافیت و بلور را <strong>با هم</strong> انیمیت کنید، هرگز فقط بلور را؛ بلور تنها به‌جای حرکت، تأخیر خوانده می‌شود.</li>
      <li>به‌جای بلورکردن ظرفی که متن هم دارد، ته‌رنگ را روی یک <code>::before</code> بگذارید؛ بلورکردن یک ظرف اسکرول‌شونده در هر فریم اسکرول اجرا می‌شود.</li>
    </ul></div>`);

  body += S('degradation', 'افت تدریجی', `<div class="prose">
      <p>دو دلیل مستقل برای کنارگذاشتن نیمه‌شفافی. هر دو به یک نتیجه می‌رسند: یک سطح مات با همان فام و همان هندسه، تا چیزی جابه‌جا نشود.</p>
      <ul>
        <li><code>@supports not (backdrop-filter: blur(1px))</code>: مرورگر نمی‌تواند.</li>
        <li><code>@media (prefers-reduced-transparency: reduce)</code>: کاربر خواسته که نکند. این یک تنظیم دسترس‌پذیری واقعی است، برای افراد با حساسیت دهلیزی و برای کم‌بینایانی که به بیشترین کنتراست متن نیاز دارند.</li>
      </ul>
      <p>جایگزین <code>#F8FAFC</code> در روشن، <code>#212B36</code> در ملایم و <code>#14181D</code> در تیره است. چیدمان، فاصله و گردی دست‌نخورده می‌مانند؛ فقط شفافیت می‌رود.</p>
    </div>
    ${specimen({ label: 'شیشه و جایگزین مات آن، کنار هم', canvas: 'map', stageClass: 'spec__stage--center', html: `<div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
  <div class="t-glass" style="padding:16px 20px"><span class="t-body-md-strong">شیشه</span><div class="t-body-sm t-tone-secondary">backdrop-filter: blur(16px)</div></div>
  <div class="t-glass" style="padding:16px 20px;backdrop-filter:none;-webkit-backdrop-filter:none;background:var(--t-glass-fallback)"><span class="t-body-md-strong">جایگزین مات</span><div class="t-body-sm t-tone-secondary">reduced-transparency</div></div>
</div>` })}`);

  body += S('usage', 'کاربرد', guidance([
    'نوارها، برگه‌ها، ریل‌های فیلتر و کنترل‌هایی که روی نقشه یا عکس می‌نشینند.',
    'حداکثر سه لایهٔ شیشه در هر کادر دید.',
    'بگذارید لبهٔ مویی کار خودش را بکند؛ همان چیزی است که سطح را مثل یک ورق نشان می‌دهد، نه یک لکهٔ رنگ.',
    'پیش از انتشار هر سطح شیشه‌ای تازه، روی یک اندروید میان‌رده واقعی تستش کنید.',
  ], [
    'شیشه روی عناصر تکرارشونده — کارت، ردیف، سلول. بودجهٔ فریم دقیقاً همان‌جا تمام می‌شود.',
    'شیشه روی پس‌زمینهٔ تخت تک‌رنگ. وقتی پشتش چیزی نیست، نیمه‌شفافی فقط یک خاکستری کمی اشتباه خوانده می‌شود.',
    'شیشهٔ تودرتو.',
    'بالابردن بلور برای «شیشه‌ای‌تر شدن». بعد از حدود ۲۰ پیکسل دیگر ترب نیست، iOS است.',
    'نردبان سایه روی شیشه. ارتفاع اینجا دوحالته است.',
  ]));

  body += S('code', 'کد', `${specimen({
    label: 'کلاس‌ها', canvas: 'plain', dir: 'ltr',
    html: `<pre class="code" style="inline-size:100%;background:var(--t-bg-sunken);border-radius:10px"><code>&lt;div class="t-glass"&gt;…&lt;/div&gt;
&lt;div class="t-glass t-glass--list"&gt;…&lt;/div&gt;
&lt;div class="t-glass t-glass--selected"&gt;…&lt;/div&gt;</code></pre>`
  })}
  <div class="spec" data-spec>
    <div class="spec__bar"><span class="spec__label">glass.css — قاعدهٔ کامل</span>
      <div class="spec__tools"><button class="site-tool copy-btn" data-copy="glass-src">کپی</button></div></div>
    <pre class="code" id="glass-src"><code>.t-glass {
  background-color: var(--t-glass-fill);
  border: var(--t-border-thin) solid var(--t-glass-border);
  box-shadow: var(--t-glass-shadow);
  border-radius: var(--t-radius-md);
  backdrop-filter: blur(var(--t-glass-blur)) saturate(var(--t-glass-saturate));
  -webkit-backdrop-filter: blur(var(--t-glass-blur)) saturate(var(--t-glass-saturate));
}

/* Two independent reasons to go opaque. Same hue, same geometry. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .t-glass { background-color: var(--t-glass-fallback); }
}
@media (prefers-reduced-transparency: reduce) {
  .t-glass { background-color: var(--t-glass-fallback); backdrop-filter: none; }
}</code></pre>
  </div>`);

  return { body, toc, title: 'شیشه', description: 'شیشهٔ ترب نازک است، نه ضخیم. ته‌رنگ، لبهٔ مویی و ریزسایه — با بلوری یک‌چهارم اپل.', eyebrow: 'مبانی' };
}
