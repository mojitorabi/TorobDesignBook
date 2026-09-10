import { specimen, section, table, guidance, esc } from './site-lib.mjs';
import { SITE_NAME, GROUP_FA } from '../source/site.nav.mjs';

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toFa = n => String(n).replace(/[0-9]/g, d => FA_DIGITS[+d]);

/* ─────────────────────────── HOME ─────────────────────────── */
export function indexPage({ components, iconCount, tokenCount }) {
  const groups = {};
  for (const c of components) (groups[c.group] ??= []).push(c);

  let body = `<div class="prose" style="max-inline-size:none;margin-block-start:-14px">
    <div class="note" style="border-inline-start-color:var(--t-fg-brand)">
      <strong>کتاب دیزاین ترب</strong> تنها مرجع این است که ترب و «خرید از اطراف» چه شکلی‌اند، چطور رفتار می‌کنند و چطور ساخته می‌شوند. توکن وارد می‌شود و بقیه بیرون می‌آید: همین وب‌سایت، پکیج CSS، کامپوننت‌های ری‌اکت، نُه قالب خروجی و سرور MCP همه از یک مجموعه فایل تولید می‌شوند. هیچ‌چیزِ پایین‌دستی دستی نگه‌داری نمی‌شود، پس هیچ‌چیزِ پایین‌دستی نمی‌تواند از منبع فاصله بگیرد.
    </div>
  </div>

  <div class="wide" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));margin-block:26px">
    ${[[components.length, 'کامپوننت', 'components/button.html'],
       [tokenCount, 'توکن طراحی', 'tokens.html'],
       [toFa(iconCount.toLocaleString('en-US')), 'آیکون', 'icons.html'],
       ['۹', 'قالب خروجی', 'tokens.html#exports'],
       ['۹', 'ابزار MCP', 'ai.html']].map(([n, l, href]) =>
      `<a href="${href}" style="text-decoration:none;color:inherit;padding:16px 18px;border:1px solid var(--t-border-default);border-radius:12px;background:var(--t-bg-fog);display:block">
        <div style="font-size:27px;font-weight:800;line-height:1.1">${n}</div>
        <div class="t-body-sm t-tone-secondary" style="margin-block-start:3px">${l}</div>
      </a>`).join('')}
  </div>`;

  body += section('start', 'از اینجا شروع کنید', `<div class="wide" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(258px,1fr))">
    ${[
      ['برای توسعه‌دهنده', 'توکن‌ها را نصب کنید، کامپوننت را کپی کنید و منتشر کنید. CSS مستقل از فریم‌ورک، با ری‌اکت روی آن.', 'start.html', 'شروع کار'],
      ['برای عامل‌های هوش مصنوعی', 'کلاد کد، کرسر یا کوپایلت را به سرور MCP وصل کنید تا کد واقعی ترب بنویسند، نه کدی که فقط شبیه آن است.', 'ai.html', 'اتصال به هوش مصنوعی'],
      ['برای طراح', 'هر نام قدیمی سیمبل در اسکچ و چیزی که جایش را گرفت.', 'migration.html', 'نام‌گذاری و مهاجرت'],
      ['متریال', 'شیشهٔ ترب؛ چیست، چه هزینه‌ای دارد و مرزش کجاست.', 'foundations/glass.html', 'شیشه'],
    ].map(([t, d, href, cta]) =>
      `<a href="${href}" style="text-decoration:none;color:inherit;padding:19px 20px;border:1px solid var(--t-border-default);border-radius:12px;background:var(--t-bg-fog);display:flex;flex-direction:column;gap:6px">
        <div style="font-weight:700;font-size:15px">${t}</div>
        <div class="t-body-sm t-tone-secondary" style="flex:1;line-height:1.6">${d}</div>
        <div style="color:var(--t-fg-link);font-size:13px;font-weight:600;margin-block-start:4px">${cta} →</div>
      </a>`).join('')}
  </div>`);

  body += section('material', 'متریال', `<div class="prose">
      <p>شیشهٔ اپل ضخیم است: ۵۰ تا ۸۰ پیکسل بلور، تقویت اشباع و هایلایت‌های براق. شیشهٔ ترب <strong>نازک</strong> است: یک ورق نیمه‌شفاف از رنگ سطح، یک لبهٔ مویی و سایه‌ای آن‌قدر کوچک که مثل یک لبهٔ بلندشده خوانده شود. سطحی را نشان می‌دهد که بالای محتوا شناور است. هرگز تزئین نیست.</p>
    </div>
    ${specimen({ label: 'شیشهٔ ترب روی نقشه', canvas: 'map', stageClass: 'spec__stage--center', html: `<div style="display:flex;flex-direction:column;gap:11px;align-items:center;inline-size:100%;max-inline-size:330px">
  <div class="t-segmented" role="tablist" aria-label="نمای اطراف" style="align-self:center">
    <button class="t-segmented__item" role="tab" aria-selected="true">فروشگاه‌ها<span class="t-chip__count">۴۳</span></button>
    <button class="t-segmented__item" role="tab" aria-selected="false">محصولات<span class="t-chip__count">۵۵</span></button>
  </div>
  <article class="t-store-card t-store-card--glass" style="inline-size:100%">
    <div class="t-store-card__head">
      <div class="t-store-card__logo"></div>
      <div class="t-store-card__body">
        <h3 class="t-store-card__name">ادکلن شهر</h3>
        <div class="t-store-card__meta">
          <span class="t-store-card__distance"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></svg>۱ کیلومتر</span>
          <span>باز تا ۲۲:۳۰</span>
        </div>
      </div>
    </div>
    <div class="t-store-card__badges"><span class="t-badge t-badge--guarantee">ضمانت ترب</span><span class="t-badge">کالابرگ</span></div>
  </article>
</div>` })}`);

  body += section('components', 'کامپوننت‌ها', `<div class="prose"><p>${toFa(components.length)} کامپوننت در شش گروه. هر کدام نام‌های قدیمی سیمبل اسکچ را که جایگزینشان شده با خود دارد، تا واژگان قبلی همچنان کار کند.</p></div>
    <div class="wide">
    ${Object.entries(groups).map(([g, list]) => `
      <h3 style="font-size:14px;font-weight:700;margin-block:26px 9px;color:var(--t-fg-secondary);text-transform:uppercase;letter-spacing:0.07em">${esc(GROUP_FA[g] ?? g)}</h3>
      <div style="display:grid;gap:7px;grid-template-columns:repeat(auto-fill,minmax(216px,1fr))">
        ${list.map(c => `<a href="components/${c.slug}.html" style="text-decoration:none;color:inherit;padding:11px 13px;border:1px solid var(--t-border-subtle);border-radius:9px;background:var(--t-bg-fog);display:flex;align-items:center;gap:8px">
          <span style="font-weight:600;font-size:13.5px">${esc(c.name)}</span>
          ${c.status === 'new' ? '<span class="status-pill status-pill--new" style="font-size:9.5px;padding:1px 6px">تازه</span>' : ''}
          ${c.status === 'revised' ? '<span class="status-pill status-pill--revised" style="font-size:9.5px;padding:1px 6px">تغییر نام</span>' : ''}
        </a>`).join('')}
      </div>`).join('')}
    </div>`);

  body += section('principles', 'اصول', `<div class="prose">
    <ol style="list-style:none;padding:0">
      ${[
        ['راست‌چین جهت است، نه یک حالت.', 'همهٔ استایل‌های متنی در منبع <code>align:right</code> هستند. همه‌جا از ویژگی‌های منطقی استفاده می‌شود؛ چپ‌چین حالت ثانویه است و هر نمونه در این سایت می‌تواند به آن سوئیچ کند.'],
        ['رنگ معنا دارد، نه فقط تأکید.', 'قرمز خرید اینترنتی است، آبی کنش فروشگاهی و مشکی خنثی. نام‌گذاری بر پایهٔ نیت هم پشتیبانی می‌شود، چون نیت از تغییر پالت جان سالم به در می‌برد.'],
        ['حالت، حالت است.', 'منبع <code>Button/Red/Hover</code> را به‌عنوان سیمبل مستقل فرستاده بود. اینجا یک سودوکلاس است. پوسته یک توکن است، نه یک کامپوننت.'],
        ['شیشه ساختاری است.', 'متریالی با بودجهٔ مشخص — سه لایه در هر کادر دید — نه تزئینی که هرجا کارت ساده به نظر می‌رسید اعمال شود.'],
        ['دسترس‌پذیری یک دروازه است.', '۳۷ جفت رنگ در هر سه پوسته و در هر بیلد ماشینی بررسی می‌شوند. یک شکست، بیلد را متوقف می‌کند.'],
        ['ماشین‌خوان از پایه.', 'نُه ابزار MCP، یک <code>llms.txt</code> و یک نسخهٔ مارک‌داون برای هر صفحه. عامل‌های هوش مصنوعی مصرف‌کنندهٔ درجه‌یک‌اند، نه فکر بعدی.'],
      ].map(([t, d], i) => `<li style="display:flex;gap:15px;padding-block:13px;border-block-end:1px solid var(--t-border-subtle)">
        <span style="flex:none;inline-size:24px;block-size:24px;border-radius:7px;background:var(--t-bg-subtle);display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--t-fg-secondary)">${i + 1}</span>
        <span><strong style="color:var(--t-fg-default)">${t}</strong> <span style="color:var(--t-fg-secondary)">${d}</span></span>
      </li>`).join('')}
    </ol></div>`);

  return {
    body, toc: [{ id: 'start', label: 'از اینجا شروع کنید' }, { id: 'material', label: 'متریال' }, { id: 'components', label: 'کامپوننت‌ها' }, { id: 'principles', label: 'اصول' }],
    title: SITE_NAME, description: 'سیستم طراحی ترب. توکن، کامپوننت، آیکون و راهنما — هم برای آدم‌ها، هم برای ماشین‌ها.', eyebrow: 'سیستم طراحی ترب',
  };
}

/* ─────────────────────────── AI / MCP ─────────────────────────── */
export function aiPage(nComponents, nIcons) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };

  let body = `<div class="prose">
    <p>عاملی که نداند سیستم طراحی شما چیست، یکی از خودش می‌سازد. <code>#3B82F6</code> می‌نویسد چون آبیِ تیلویند است، <code>gap: 10px</code> می‌گذارد چون ده عدد رُندی است و <code>margin-left</code> می‌نویسد چون بیشتر داده‌های آموزشی‌اش همین را می‌گویند. هر سهٔ اینها در یک محصول فارسیِ راست‌چینِ توکن‌محور، باگ هستند.</p>
    <p>این سیستم از <strong>چهار مسیر</strong> ماشین‌خوان است، چون ابزارهای کدنویسی روی یک پروتکل توافق ندارند.</p>
  </div>
  ${table(['مسیر', 'چیست', 'برای چه ابزاری'], [
    ['<strong>سرور MCP</strong>', 'نُه ابزار روی stdio — کامپوننت، توکن، آیکون، راهنما، مهاجرت و یک لینتر', 'Claude Code، Cursor، Windsurf، Zed'],
    ['<strong>llms.txt</strong>', 'فهرست ماشین‌خوان در ریشهٔ سایت، به‌علاوهٔ نسخهٔ <code>.md</code> هر صفحه', 'هر مدلی با دسترسی به وب'],
    ['<strong>قواعد عامل</strong>', 'تولید <code>CLAUDE.md</code>، <code>.cursorrules</code> و <code>copilot-instructions.md</code>', 'حفاظ در سطح مخزن'],
    ['<strong>خروجی توکن</strong>', 'نُه قالب، از جمله یک مرجع مارک‌داون', 'هر چیزی که بتواند فایل بخواند'],
  ])}`;

  body += S('mcp', 'سرور MCP', `<div class="prose"><p>مسیر اصلی. همان خروجی‌هایی را می‌خواند که این وب‌سایت می‌خواند، پس نمی‌تواند از آنچه می‌بینید فاصله بگیرد.</p></div>
    ${table(['ابزار', 'چه می‌کند'], [
      ['<code>search_components</code>', 'یافتن کامپوننت با نام، کاربرد یا <strong>نام قدیمی سیمبل در اسکچ</strong>. جست‌وجوی <code>"Button / Red / Default"</code> کامپوننت Button را برمی‌گرداند.'],
      ['<code>get_component</code>', 'مشخصات کامل: پراپ‌ها، ساختار، درست و نادرست، قرارداد دسترس‌پذیری، رفتار واکنش‌گرا، HTML و ری‌اکت.'],
      ['<code>get_tokens</code>', 'مقدار نهایی توکن‌ها در قالب css، js، json، scss، swift یا android.'],
      ['<code>resolve_token</code>', 'ردیابی یک توکن معنایی تا مقدار پایه و نهایی‌اش در هر سه پوسته.'],
      ['<code>search_icons</code>', `جست‌وجو در تمام ${toFa(nIcons.toLocaleString('en-US'))} آیکون بر پایهٔ نام، نام مستعار یا دسته. نام دقیق و قرینهٔ راست‌چین را برمی‌گرداند.`],
      ['<code>get_icon</code>', 'مارک‌آپ SVG به‌همراه قطعهٔ import و راهنمای راست‌چین.'],
      ['<code>get_guidelines</code>', 'قواعد شیشه، راست‌چین، حرکت، دسترس‌پذیری، واکنش‌گرایی، نام‌گذاری، تجارت و محتوا.'],
      ['<code><strong>validate_code</strong></code>', 'لینت‌کردن کد تولیدشده در برابر سیستم. این همان ابزاری است که واقعاً پذیرش را اجبار می‌کند.'],
      ['<code>get_migration</code>', 'نام قدیمی اسکچ ← نام کامپوننت و کلاس.'],
    ])}`);

  body += S('install', 'نصب', `<div class="prose"><p>نودجی‌اس ۱۸ به بالا. نیازی به نصب سراسری نیست.</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Claude Code — فایل .mcp.json در ریشهٔ مخزن</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="mcp-claude">کپی</button></div></div>
    <pre class="code" id="mcp-claude"><code>{
  "mcpServers": {
    "torob-design": {
      "command": "node",
      "args": ["./design-system/packages/mcp/server.mjs"],
      "env": { "TOROB_DS_ROOT": "./design-system" }
    }
  }
}</code></pre></div>

    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Cursor — فایل .cursor/mcp.json</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="mcp-cursor">کپی</button></div></div>
    <pre class="code" id="mcp-cursor"><code>{
  "mcpServers": {
    "torob-design": {
      "command": "node",
      "args": ["/absolute/path/to/design-system/packages/mcp/server.mjs"]
    }
  }
}</code></pre></div>

    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">بررسی درست کارکردن</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="mcp-test">کپی</button></div></div>
    <pre class="code" id="mcp-test"><code>cd design-system/packages/mcp
npm install
node test-server.mjs      # exercises all nine tools and prints the output</code></pre></div>`);

  body += S('validate', 'لینتر همان بخشی است که اهمیت دارد', `<div class="prose">
      <p>مستنداتی که عامل <em>می‌تواند</em> بخواند با مستنداتی که <em>خوانده است</em> یکی نیست. <code>validate_code</code> همین شکاف را می‌بندد: روی هر رابطی که تولید شده اجرایش کنید تا تخلف‌های مشخص را برگرداند، به‌همراه توکنی که باید استفاده می‌شد.</p>
    </div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">ورودی ← خروجی</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="lint-demo">کپی</button></div></div>
    <pre class="code" id="lint-demo"><code>validate_code({ code: \`
.card {
  background: #FFFFFF;
  margin-left: 14px;
  border-radius: 10px;
  text-align: right;
  letter-spacing: -0.02em;
  transition: opacity 250ms ease;
  outline: none;
}\` })

→ 5 error(s), 4 warning(s), 0 suggestion(s).

ERROR line 3  [hardcoded-colour]     #FFFFFF is a literal colour. It matches a
                                     token — use var(--t-color-white) instead.
ERROR line 4  [rtl-physical]         margin-left breaks RTL. Use margin-inline-start.
ERROR line 6  [rtl-physical]         text-align: left/right breaks RTL. Use start/end.
ERROR line 7  [persian-tracking]     Negative letter-spacing breaks Persian
                                     letterform joining. Never use it.
ERROR line 9  [focus-removed]        outline: none removes the focus ring.
WARN  line 4  [off-grid]             14px is off the 4px grid. Nearest: 12px, 16px.
WARN  line 5  [off-scale-radius]     10px is not on the radius scale (4/8/12/16/24).
WARN  line 8  [off-scale-duration]   250ms is not a duration token (120/220/320/480).</code></pre></div>
    <div class="prose"><p>همچنین شیشهٔ تودرتو، تخطی از بودجهٔ شیشه، دکمهٔ آیکونی بدون نام، <code>&lt;img&gt;</code> بدون <code>alt</code>، <code>&lt;div&gt;</code> کلیک‌پذیر و هر نام قدیمی اسکچ را که هنوز در کد مانده پیدا می‌کند.</p></div>`);

  body += S('prompt', 'به عامل چه بگویید', `<div class="prose"><p>این را در <code>CLAUDE.md</code> یا <code>.cursorrules</code> بگذارید. بیلد آن را در <code>packages/mcp/AGENT_RULES.md</code> برایتان تولید می‌کند.</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">AGENT_RULES.md</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="agent-rules">کپی</button></div></div>
    <pre class="code" id="agent-rules"><code># Torob Design System — rules for AI agents

This project uses the Torob Design System (Rahnamā). An MCP server named
"torob-design" exposes it. Use it — do not guess at values.

## Before writing any UI
1. search_components(&lt;what you are building&gt;) — it also accepts legacy
   Sketch names like "Store-Card/VLP" or "POI/Cluster".
2. get_component(&lt;name&gt;) for the props, the HTML and the a11y contract.
3. get_guidelines("rtl") and get_guidelines("glass") if either is involved.

## Non-negotiable
- NEVER hardcode a colour, spacing, radius or duration. get_tokens() first.
- NEVER write a physical direction: no margin-left, padding-right, left:,
  text-align:right, border-left. Logical properties only. This product is RTL.
- NEVER use negative letter-spacing. It breaks Persian letterform joining.
- Persian numerals (۰۱۲۳۴۵۶۷۸۹) with ٬ separators in all product surfaces.
- Icon-only buttons require aria-label.
- Touch targets >= 44px.
- At most 3 glass surfaces per viewport; never on repeating elements.

## Before you present code
Run validate_code() on it and fix everything it reports.</code></pre></div>`);

  body += S('llms', 'llms.txt و نسخه‌های مارک‌داون', `<div class="prose">
      <p>برای ابزارهایی که MCP ندارند. <a href="llms.txt"><code>/llms.txt</code></a> فهرست ساختاریافتهٔ کل سیستم است و <a href="llms-full.txt"><code>/llms-full.txt</code></a> همه‌چیز در یک فایل. هر صفحه هم یک نسخهٔ مارک‌داون دارد؛ کافی است <code>.md</code> را به انتهای هر نشانی اضافه کنید:</p>
    </div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">نسخه‌های مارک‌داون</span></div>
    <pre class="code"><code>/components/button.html   →  /components/button.md
/foundations/glass.html   →  /foundations/glass.md
/tokens.html              →  /tokens.md</code></pre></div>`);

  return { body, toc, title: 'اتصال به هوش مصنوعی', description: 'نُه ابزار MCP، یک llms.txt، قواعد تولیدشده برای عامل‌ها و لینتری که آنها را اجبار می‌کند.', eyebrow: 'مرور کلی' };
}

/* ─────────────────────────── MIGRATION ─────────────────────────── */
export function migrationPage(components) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const rows = [];
  for (const c of components) for (const l of c.legacy ?? []) rows.push({ old: l, name: c.name, cls: c.classes?.[0] ?? '', slug: c.slug, group: c.group });
  rows.sort((a, b) => a.old.localeCompare(b.old));
  const nNew = components.filter(c => c.status === 'new').length;

  let body = `<div class="prose">
    <p><strong>${toFa(rows.length)} نام قدیمی سیمبل اسکچ</strong> روی ${toFa(components.length - nNew)} کامپوننت نگاشت می‌شوند. ${toFa(nNew)} کامپوننت دیگر تازه‌اند و خلأهایی را پر می‌کنند که کیت هرگز نداشت.</p>
    <p>تغییر نامی که کسی نتواند اجرایش کند، تغییر نامی است که کسی نمی‌پذیردش. پس هر نام قدیمی اینجا، در <code>get_migration</code> سرور MCP و در صفحهٔ هر کامپوننت قابل جست‌وجو می‌ماند.</p>
  </div>`;

  body += S('why', 'چهار ادغام', `<div class="prose"><p>۱۱۰ مستر اسکچ با چهار قاعدهٔ مکانیکی به ${toFa(components.length - nNew)} کامپوننت کاهش می‌یابند. هیچ‌کدام تصمیم سلیقه‌ای نیست.</p></div>
    ${table(['قاعده', 'نمونه', 'چرا'], [
      ['<strong>حالت، حالت است</strong>', '<code>Button / Red / Hover</code> · <code>/ Default</code> · <code>/ Disable</code> ← یک <code>Button</code>', 'یک API کامپوننت نمی‌تواند برای هر سودوکلاس یک کامپوننت جدا داشته باشد.'],
      ['<strong>پوسته یک توکن است</strong>', '<code>Store-Card/VLP/With product/Light</code> + <code>/Dark</code> ← یک <code>StoreCard</code>', 'روشن و تیره یک کامپوننت‌اند، زیر مقادیر توکن متفاوت.'],
      ['<strong>نیت، نه فقط رنگ</strong>', '<code>Button / Red</code> ← <code>variant="primary"</code>', 'وقتی پالت تغییر می‌کند، کد نباید تغییر کند.'],
      ['<strong>جایگاه، کامپوننت نیست</strong>', '<code>List / last item</code> ← <code>:last-child</code>', 'فقط به این دلیل وجود داشت که اسکچ نمی‌تواند یک سلکتور را بیان کند.'],
    ])}`);

  body += S('map', 'نقشهٔ نگاشت', `<div class="wide">
    <div class="site-search" style="max-inline-size:none;margin-block-end:12px">
      <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2zm0 1.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"/></svg>
      <input id="migSearch" type="search" placeholder="جست‌وجو در ${toFa(rows.length)} نام قدیمی…" autocomplete="off">
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>نام قدیمی در اسکچ</th><th>کامپوننت</th><th>کلاس CSS</th><th>گروه</th></tr></thead>
    <tbody id="migRows">${rows.map(r => `<tr data-k="${esc((r.old + ' ' + r.name + ' ' + r.cls).toLowerCase())}">
      <td><span class="legacy">${esc(r.old)}</span></td>
      <td><a href="components/${r.slug}.html" style="font-weight:600">${esc(r.name)}</a></td>
      <td><code>${esc(r.cls)}</code></td>
      <td>${esc(GROUP_FA[r.group] ?? r.group)}</td></tr>`).join('')}</tbody></table></div></div>
    <script>(function(){
      var i=document.getElementById('migSearch'), rows=[].slice.call(document.querySelectorAll('#migRows tr'));
      var t; i.addEventListener('input', function(){ clearTimeout(t); t=setTimeout(function(){
        var q=i.value.toLowerCase().trim();
        rows.forEach(function(r){ r.style.display = !q || r.dataset.k.indexOf(q)>=0 ? '' : 'none'; });
      },90); });
    })();</script>`);

  body += S('new', 'کامپوننت‌های تازه', `<div class="prose"><p>${toFa(nNew)} کامپوننت که کیت نداشت. لایهٔ بازخورد بزرگ‌ترین خلأ است: بیست‌ونه صفحهٔ نمونه، و حتی یک تأیید، خطا یا حالت خالی به‌عنوان کامپوننت وجود نداشت.</p></div>
    <div class="wide" style="display:grid;gap:7px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">
    ${components.filter(c => c.status === 'new').map(c => `<a href="components/${c.slug}.html" style="text-decoration:none;color:inherit;padding:12px 14px;border:1px solid var(--t-border-subtle);border-radius:9px;background:var(--t-bg-fog);display:block">
      <div style="font-weight:650;font-size:13.5px">${esc(c.name)}</div>
      <div class="t-body-sm t-tone-secondary" style="margin-block-start:2px;line-height:1.5">${esc(c.summary)}</div></a>`).join('')}
    </div>`);

  body += S('hygiene', 'یافته‌های فایل منبع', `<div class="prose"><p>مشکلاتی که هنگام تجزیهٔ فایل‌های اسکچ پیدا شدند. ارزش دارد در خود منبع اصلاح شوند تا این دو از هم فاصله نگیرند.</p></div>
    ${table(['یافته', 'جزئیات'], [
      ['<strong>۲۴ مستر تکراری</strong>', 'نام یکسان، شناسهٔ متفاوت. <code>Segmented Controls/Selected</code> <strong>چهار</strong> بار وجود دارد؛ <code>Search bar/Default</code>، <code>Product Card/Normal</code>، <code>Header/Profile</code> و ۲۰ مورد دیگر دو بار.'],
      ['<strong>دو نسل سیمبل کنار هم زندگی می‌کنند</strong>', 'صفحهٔ نمونه‌ها از <code>Button/Normal/Primary/Icon</code> و <code>Store-Card/With product</code> استفاده می‌کند؛ صفحهٔ کامپوننت‌ها از <code>Button / Red / Icon</code> و <code>Store-Card/VLP/With product/Light</code>. نمونه‌ها از قبل مهاجرت به نام‌گذاری بر پایهٔ نیت را شروع کرده بودند.'],
      ['<strong>کامپوننت‌های مستندنشده</strong>', '<code>city filter</code>، <code>official seller</code> و <code>Badge / Ad on Buy Box</code> فقط در صفحهٔ نمونه‌ها دیده می‌شوند و هرگز در کتابخانهٔ کامپوننت نبودند.'],
      ['<strong>نیم‌فاصلهٔ نامرئی در نام سیمبل‌ها</strong>', '<code>Button/‌Blue/…</code> و <code>Glass - Dark - ‌List Background</code> نویسهٔ U+200C دارند. در اسکچ نامرئی است و بی‌صدا هر تولید کدی را که به نام تکیه کند می‌شکند.'],
      ['<strong>جداکننده‌های ناهماهنگ</strong>', '<code>Button / Red / Hover</code> در برابر <code>Button/Black ghost/Default</code>؛ <code>Store-Card</code> در برابر <code>Product Card</code>؛ فاصلهٔ اضافه در انتهای <code>Glass - Dark - selected&nbsp;</code>؛ و فاصلهٔ جاافتاده در <code>Glass -Dark</code>.'],
      ['<strong>غلط املایی «Gaurantee»</strong>', 'سه سوآچ رنگ. سیمبل Badge درست نوشته، پس این دو با هم نمی‌خوانند.'],
      ['<strong>فعل، جایی که صفت لازم است</strong>', '<code>Close Pin</code> مثل یک دستور خوانده می‌شود. منظور <em>بسته</em> است.'],
      ['<strong>مقادیر خارج از سیستم</strong>', 'کادرهای <code>#979797</code> و توقف گرادیان <code>#D8D8D8</code> پیش‌فرض‌های اسکچ‌اند که نشت کرده‌اند؛ هیچ‌کدام در پالت نیستند.'],
      ['<strong>دو وزن فونت بلااستفاده</strong>', 'IRANYekanX Regular و DemiBold بارگذاری می‌شوند اما هیچ استایل متنی از آنها استفاده نمی‌کند. حذفشان حجم وب‌فونت را کم می‌کند.'],
      ['<strong>۴ آرت‌بورد آیکون با نام کاماگذاری‌شده</strong>', '<code>"high severity, caution"</code> و سه مورد دیگر، دو نام آیکون را در یک نام آرت‌بورد جا داده‌اند.'],
    ])}`);

  return { body, toc, title: 'نام‌گذاری و مهاجرت', description: `${toFa(rows.length)} نام قدیمی اسکچ و اینکه هر کدام چه شدند.`, eyebrow: 'مرور کلی' };
}
