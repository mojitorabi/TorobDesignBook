const chevD = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg>`;
const sortIcon = `<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg>`;

export default [
{
  name: 'DataTable', slug: 'data-table', group: 'Data', status: 'new',
  legacy: [],
  summary: 'ردیف‌های داده برای مرور، مرتب‌سازی و انتخاب گروهی.',
  description: [
    'پنل فروشنده معکوس اپلیکیشن خریدار است: دسکتاپ‌محور، متراکم، و ساخته‌شده برای مرور صدها ردیف نه برای یک شست روی اتوبوس. کیت اولیه هیچ جدولی نداشت چون هیچ‌کدام از بیست‌ونه صفحهٔ نمونه دسکتاپ نبودند.',
    'سه قاعده کل این کامپوننت را می‌سازند. <strong>ارقام جدولی هرجا عددی قابل مقایسه است</strong>، وگرنه ستون در یک نگاه خوانده نمی‌شود. <strong>تراکم ویژگی جدول است، نه صفحه</strong> — یک صفحه می‌تواند هم‌زمان جدول متراکم و جدول راحت داشته باشد. و <strong>هدر چسبان است</strong>؛ ستون اول هم می‌تواند باشد، که در راست‌چین یعنی لبهٔ راست.',
  ],
  use: [
    'اعداد را با <code>.t-num</code> به انتهای محور تراز کنید و جدولی نگه دارید.',
    'ستون شناسه یا نام را با <code>--freeze</code> ثابت کنید تا هنگام اسکرول افقی مرجع از دست نرود.',
    'نوار ابزار را در جای خودش به نوار کنش گروهی تبدیل کنید تا جدول نپرد.',
    'تعداد نتایج را همیشه نشان دهید؛ در یک پنل، «۱ تا ۲۵ از ۴۸۳» بخشی از خود داده است.',
  ],
  avoid: [
    'ستون کنش که هنگام هاور ظاهر شود؛ با صفحه‌کلید و لمس غیرقابل کشف است.',
    'اسکرول بی‌نهایت در پنل. فروشنده باید بتواند به ردیف ۴۰۰ برگردد.',
    'گنجاندن بیش از حدود هفت ستون بدون امکان انتخاب ستون.',
    'ارقام متناسب در هر ستون عددی.',
  ],
  anatomy: [
    ['ظرف', 'کادر مویی، گردی ۱۲، اسکرول در هر دو محور، سقف ارتفاع ۷۰ درصد کادر دید.'],
    ['هدر', 'چسبان بالا، زمینهٔ ملایم، ۱۲ پیکسل Bold، دکمهٔ مرتب‌سازی با <code>aria-sort</code>.'],
    ['ردیف', 'هاور زمینهٔ ملایم؛ انتخاب‌شده زمینهٔ آبی ملایم و <code>aria-selected</code>.'],
    ['ستون عددی', '<code>.t-num</code> — تراز انتهای محور، ارقام جدولی، بدون شکست خط.'],
    ['ستون ثابت', '<code>--freeze</code> ستون اول را روی <code>inset-inline-start</code> می‌چسباند.'],
  ],
  props: [
    ['density', "'comfortable' | 'compact'", "'comfortable'", 'روی خود جدول، نه روی صفحه.'],
    ['freezeFirst', 'boolean', 'false', 'ستون اول را هنگام اسکرول افقی ثابت نگه می‌دارد.'],
    ['selectable', 'boolean', 'false', 'ستون چک‌باکس و نوار کنش گروهی را فعال می‌کند.'],
    ['sort', '{ key, direction }', '—', 'مرتب‌سازی کنترل‌شده؛ به <code>aria-sort</code> نگاشت می‌شود.'],
  ],
  a11y: [
    'یک <code>&lt;table&gt;</code> واقعی با <code>&lt;th scope="col"&gt;</code>. شبکهٔ ساخته‌شده از <code>div</code> برای صفحه‌خوان جدول نیست.',
    'دکمهٔ مرتب‌سازی <code>aria-sort</code> را روی <code>ascending</code>، <code>descending</code> یا <code>none</code> می‌گذارد و تغییر را با ناحیهٔ زنده اعلام می‌کند.',
    'چک‌باکس انتخاب هر ردیف نام دسترس‌پذیر مخصوص خودش دارد («انتخاب سفارش ۱۰۲۳»)، نه فقط «انتخاب».',
    'ردیف انتخاب‌شده <code>aria-selected</code> می‌گیرد و نه‌فقط با رنگ، که با چک‌باکس هم مشخص می‌شود.',
    'ظرف اسکرول‌شونده <code>tabindex="0"</code> و برچسب می‌گیرد تا کاربر صفحه‌کلید بتواند اسکرولش کند (معیار ۲.۱.۱).',
  ],
  responsive: 'تا نقطهٔ lg اسکرول افقی با ستون اول ثابت. زیر آن هر ردیف به یک کارت تبدیل می‌شود: عنوان، سه فیلد کلیدی و یک منوی سرریز. جدول را روی گوشی فشرده نکنید؛ به کارت تبدیلش کنید.',
  specimens: [
    { label: 'جدول سفارش‌ها', canvas: 'plain', stageClass: 'spec__stage--stack', html: `<div class="t-toolbar">
  <div class="t-search" style="max-inline-size:240px"><div class="t-input t-input--md"><svg class="t-input__icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg><input class="t-input__el" type="search" placeholder="جست‌وجوی سفارش"></div></div>
  <button class="t-btn t-btn--black-ghost t-btn--md">وضعیت${chevD}</button>
  <button class="t-btn t-btn--black-ghost t-btn--md">بازهٔ زمانی${chevD}</button>
  <span class="t-toolbar__spacer"></span>
  <span class="t-body-sm t-tone-secondary">۱ تا ۴ از ۴۸۳</span>
  <button class="t-btn t-btn--blue t-btn--md">خروجی اکسل</button>
</div>
<div class="t-table-wrap">
  <table class="t-table t-table--freeze">
    <thead><tr>
      <th scope="col">شمارهٔ سفارش</th>
      <th scope="col">مشتری</th>
      <th scope="col"><button class="t-table__sort" aria-sort="descending">تاریخ${sortIcon}</button></th>
      <th scope="col">وضعیت</th>
      <th scope="col" class="t-num"><button class="t-table__sort" aria-sort="none">مبلغ${sortIcon}</button></th>
    </tr></thead>
    <tbody>
      <tr><td><code>۱۰۲۳۴</code></td><td>سارا محمدی</td><td><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۹</span></td><td><span class="t-badge t-badge--positive">ارسال شده</span></td><td class="t-num">۲٬۴۵۰٬۰۰۰</td></tr>
      <tr aria-selected="true"><td><code>۱۰۲۳۳</code></td><td>رضا کریمی</td><td><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۹</span></td><td><span class="t-badge t-badge--caution">در انتظار پرداخت</span></td><td class="t-num">۸۹۰٬۰۰۰</td></tr>
      <tr><td><code>۱۰۲۳۲</code></td><td>مینا رضایی</td><td><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۸</span></td><td><span class="t-badge t-badge--info">در حال آماده‌سازی</span></td><td class="t-num">۱۵٬۸۰۰٬۰۰۰</td></tr>
      <tr><td><code>۱۰۲۳۱</code></td><td>حسین نوری</td><td><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۸</span></td><td><span class="t-badge t-badge--critical">لغو شده</span></td><td class="t-num">۳۲۰٬۰۰۰</td></tr>
    </tbody>
  </table>
</div>`, note: 'ستون مبلغ جدولی و تراز انتهای محور است. ردیف دوم انتخاب‌شده است. هدر هنگام اسکرول می‌چسبد.' },
    { label: 'نوار کنش گروهی', canvas: 'plain', html: `<div class="t-toolbar" data-selection="true" style="inline-size:100%">
  <span class="t-toolbar__count">۳ سفارش انتخاب شده</span>
  <button class="t-btn t-btn--blue t-btn--sm">تغییر وضعیت</button>
  <button class="t-btn t-btn--black-ghost t-btn--sm">چاپ برچسب</button>
  <span class="t-toolbar__spacer"></span>
  <button class="t-btn t-btn--ghost t-btn--sm">لغو انتخاب</button>
</div>`, note: 'نوار ابزار در جای خودش تبدیل می‌شود، نه اینکه نواری تازه اضافه شود؛ پس جدول یک پیکسل هم نمی‌پرد.' },
  ],
  react: `export function DataTable({ columns, rows, density = 'comfortable', freezeFirst, sort, onSort }) {
  return (
    <div className="t-table-wrap" tabIndex={0} role="region" aria-label="جدول داده">
      <table className={clsx('t-table', freezeFirst && 't-table--freeze', density === 'compact' && 't-table--compact')}>
        <thead>
          <tr>{columns.map(c => (
            <th key={c.key} scope="col" className={clsx(c.numeric && 't-num')}>
              {c.sortable
                ? <button className="t-table__sort" onClick={() => onSort(c.key)}
                          aria-sort={sort?.key === c.key ? sort.direction : 'none'}>
                    {c.label}<SortIcon />
                  </button>
                : c.label}
            </th>))}
          </tr>
        </thead>
        <tbody>{rows.map(r => (
          <tr key={r.id} aria-selected={r.selected || undefined}>
            {columns.map(c => <td key={c.key} className={clsx(c.numeric && 't-num')}>{c.render(r)}</td>)}
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}`,
},
{
  name: 'StatCard', slug: 'stat-card', group: 'Data', status: 'new',
  legacy: [],
  summary: 'یک عدد که فروشنده هر روز نگاهش می‌کند.',
  description: [
    'ردیف بالای هر داشبورد. کارت آمار وقتی مفید است که <strong>عدد را در برابر چیزی قاب بگیرد</strong> — دورهٔ قبل، هدف، میانگین. یک عدد بدون مرجع فقط یک عدد است.',
    'دلتای خنثی یک شکست در گزارش‌دهی نیست، خودش پاسخ است. «بدون تغییر» را نشان دهید؛ نه اینکه فلش را حذف کنید و خواننده را در حدس بگذارید.',
  ],
  use: ['حداکثر پنج کارت در یک ردیف؛ بیشتر از آن دیگر خلاصه نیست، جدول است.',
    'دلتا را همیشه با دوره‌اش بیاورید: «۱۲٪ نسبت به هفتهٔ گذشته».',
    'اعداد فارسی و ارقام جدولی، تا ردیف کارت‌ها با هم تراز بماند.'],
  avoid: ['کارت آمار بدون مرجع مقایسه.', 'سبز و قرمز به‌تنهایی؛ فلش و واژه را هم بیاورید.',
    'نمودار کوچک تزئینی که داده‌ای نمی‌گوید.'],
  anatomy: [['برچسب', '۱۲ پیکسل ثانویه.'], ['مقدار', '۲۴ پیکسل ExtraBold، جدولی.'],
    ['دلتا', '۱۲ پیکسل با فلش و دوره؛ سبز، قرمز یا خنثی.']],
  props: [['label', 'string', '—', ''], ['value', 'string', '—', 'از پیش با اعداد فارسی قالب‌بندی شده.'],
    ['delta', '{ value, direction, period }', '—', 'جهت: up | down | flat.']],
  a11y: ['مقدار و برچسب یک نام دسترس‌پذیر پیوسته می‌سازند.',
    'جهت دلتا با متن هم بیان می‌شود («افزایش»)، نه فقط با رنگ و فلش.',
    'اگر داشبورد زنده به‌روز می‌شود، ناحیه را <code>aria-live="polite"</code> کنید نه بیشتر.'],
  responsive: 'شبکهٔ خودکار با حداقل ۱۸۰ پیکسل. روی گوشی دوتایی می‌شود و بعد تک‌ستونی؛ هرگز افقی اسکرول نمی‌شود.',
  specimens: [
    { label: 'ردیف آمار', canvas: 'plain', html: `<div class="t-stats" style="inline-size:100%">
  <div class="t-stat"><div class="t-stat__label">سفارش‌های امروز</div><div class="t-stat__value">۴۸</div><div class="t-stat__delta t-stat__delta--up">▲ ۱۲٪ نسبت به دیروز</div></div>
  <div class="t-stat"><div class="t-stat__label">درآمد هفته</div><div class="t-stat__value">۸۹٬۴۰۰٬۰۰۰</div><div class="t-stat__delta t-stat__delta--down">▼ ۴٪ نسبت به هفتهٔ گذشته</div></div>
  <div class="t-stat"><div class="t-stat__label">نرخ لغو</div><div class="t-stat__value">۲٫۱٪</div><div class="t-stat__delta t-stat__delta--flat">بدون تغییر</div></div>
  <div class="t-stat"><div class="t-stat__label">محصولات ناموجود</div><div class="t-stat__value">۷</div><div class="t-stat__delta t-stat__delta--up">▲ ۲ مورد این هفته</div></div>
</div>` },
  ],
  react: `export function StatCard({ label, value, delta }) {
  const DIR = { up: 'افزایش', down: 'کاهش', flat: 'بدون تغییر' };
  return (
    <div className="t-stat">
      <div className="t-stat__label">{label}</div>
      <div className="t-stat__value">{value}</div>
      {delta && (
        <div className={clsx('t-stat__delta', \`t-stat__delta--\${delta.direction}\`)}>
          <span aria-hidden="true">{delta.direction === 'up' ? '▲' : delta.direction === 'down' ? '▼' : ''}</span>
          <span className="t-visually-hidden">{DIR[delta.direction]}</span>
          {delta.value} {delta.period}
        </div>
      )}
    </div>
  );
}`,
},
{
  name: 'DateField', slug: 'date-field', group: 'Data', status: 'new',
  legacy: [],
  summary: 'تاریخ شمسی. تقویم میلادی در پنل فروشنده قابل استفاده نیست.',
  description: [
    'پنل B2B ایرانی روی تقویم <strong>جلالی</strong> کار می‌کند. یک انتخابگر میلادی اینجا یک خلأ بومی‌سازی نیست؛ یک کنترل غیرقابل‌استفاده است. فروشنده «۱۴۰۴/۰۶/۱۹» می‌شناسد، نه «۲۰۲۵-۰۹-۱۰».',
    'دو جزئیات که پیاده‌سازی‌های میلادی همیشه اشتباه می‌گیرند: هفته با <strong>شنبه</strong> شروع می‌شود، و آخر هفته <strong>جمعه</strong> است نه یکشنبه. اگر ستون آخر هفته اشتباه باشد، کل تقویم اشتباه خوانده می‌شود.',
  ],
  use: ['همیشه تاریخ شمسی نشان دهید و در سمت سرور به میلادی تبدیل کنید.',
    'در کنار انتخابگر، ورودی متنی هم بگذارید؛ تایپ‌کردن سریع‌تر از کلیک‌کردن است.',
    'بازه‌های آماده بدهید: امروز، ۷ روز گذشته، این ماه.'],
  avoid: ['انتخابگر میلادی با برچسب فارسی. تبدیل ذهنی کار کاربر نیست.',
    'شروع هفته از یکشنبه.', 'انتخابگر بدون امکان تایپ.'],
  anatomy: [['فیلد', 'ورودی متنی با قالب ۱۴۰۴/۰۶/۱۹ و ارقام جدولی.'],
    ['تقویم', '۲۶۸ پیکسل، شبکهٔ هفت‌ستونی از شنبه.'],
    ['امروز', 'حلقهٔ داخلی آبی.'], ['جمعه', 'فام بحرانی در سرستون و در ستون.']],
  props: [['value', 'string', '—', 'تاریخ شمسی، قالب <code>YYYY/MM/DD</code>.'],
    ['range', 'boolean', 'false', 'انتخاب بازه به‌جای یک روز.'],
    ['presets', 'boolean', 'true', 'میان‌برهای امروز، ۷ روز، این ماه.']],
  a11y: ['شبکه <code>role="grid"</code> است و هر روز <code>role="gridcell"</code>؛ کلیدهای جهت بین روزها و PageUp/PageDown بین ماه‌ها حرکت می‌کنند.',
    'نام دسترس‌پذیر هر روز، تاریخ کامل شمسی است: «۱۹ شهریور ۱۴۰۴، پنجشنبه».',
    'ورودی متنی همیشه در دسترس است، پس هیچ‌چیز فقط با ماوس قابل انجام نیست (معیار ۲.۱.۱ و ۲.۵.۷).',
    '<code>aria-live</code> تغییر ماه را اعلام می‌کند، نه حرکت روی هر روز.'],
  responsive: 'روی دسکتاپ پاپ‌اور، روی گوشی برگهٔ پایینی تمام‌عرض. عرض تقویم ثابت می‌ماند؛ سلول‌ها کوچک نمی‌شوند.',
  specimens: [
    { label: 'انتخابگر تاریخ شمسی', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">
  <div class="t-field" style="inline-size:180px">
    <label class="t-field__label" for="d1">از تاریخ</label>
    <div class="t-input t-input--md"><input class="t-input__el t-num-tabular" id="d1" value="۱۴۰۴/۰۶/۱۹" dir="ltr"></div>
  </div>
  <div class="t-cal">
    <div class="t-cal__head">
      <button class="t-icon-btn t-icon-btn--sm" aria-label="ماه قبل"><svg class="t-icon t-icon--sm t-icon--directional" viewBox="0 0 16 16" fill="currentColor"><path d="M10 3 5 8l5 5V3z"/></svg></button>
      <span class="t-cal__title">شهریور ۱۴۰۴</span>
      <button class="t-icon-btn t-icon-btn--sm" aria-label="ماه بعد"><svg class="t-icon t-icon--sm t-icon--directional" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5V3z"/></svg></button>
    </div>
    <div class="t-cal__grid" role="grid" aria-label="شهریور ۱۴۰۴">
      <div class="t-cal__dow">ش</div><div class="t-cal__dow">ی</div><div class="t-cal__dow">د</div><div class="t-cal__dow">س</div><div class="t-cal__dow">چ</div><div class="t-cal__dow" data-weekend="true">پ</div><div class="t-cal__dow" data-weekend="true">ج</div>
      ${[...Array(31)].map((_, i) => {
        const d = i + 1; const fa = String(d).replace(/[0-9]/g, x => '۰۱۲۳۴۵۶۷۸۹'[+x]);
        const weekend = (i + 6) % 7 === 6;
        return `<button class="t-cal__day" role="gridcell"${d === 19 ? ' aria-selected="true"' : ''}${d === 20 ? ' data-today="true"' : ''}${weekend ? ' data-weekend="true"' : ''}>${fa}</button>`;
      }).join('')}
    </div>
  </div>
</div>`, note: 'هفته از شنبه شروع می‌شود و جمعه آخر هفته است. روز ۱۹ انتخاب‌شده و ۲۰ امروز است.' },
  ],
  react: `/* Jalali conversion belongs in a library, not in the component.
   The component's job is the interaction and the accessible names. */
import { toJalali, jalaliMonthName, jalaliDaysInMonth } from '@torob/date';

export function DateField({ value, onChange, range, presets = true }) {
  const [y, mo] = value.split('/').map(Number);
  const days = jalaliDaysInMonth(y, mo);
  return (
    <div className="t-cal" role="grid" aria-label={\`\${jalaliMonthName(mo)} \${toFa(y)}\`}>
      {/* شنبه first — the Iranian week does not start on Sunday */}
      {['ش','ی','د','س','چ','پ','ج'].map((d, i) => (
        <div key={d} className="t-cal__dow" data-weekend={i === 6 || undefined}>{d}</div>
      ))}
      {Array.from({ length: days }, (_, i) => {
        const day = i + 1;
        return (
          <button key={day} className="t-cal__day" role="gridcell"
                  aria-selected={day === Number(value.split('/')[2])}
                  aria-label={\`\${toFa(day)} \${jalaliMonthName(mo)} \${toFa(y)}\`}
                  onClick={() => onChange(\`\${y}/\${mo}/\${day}\`)}>
            {toFa(day)}
          </button>
        );
      })}
    </div>
  );
}`,
},
{
  name: 'AppShell', slug: 'app-shell', group: 'Layout', status: 'new',
  legacy: [],
  summary: 'اسکلت پنل فروشنده: نوار کناری، نوار بالا، محتوا.',
  description: [
    'پنل B2B از بالا به پایین چیده می‌شود، نه از پایین به بالا. نوار کناری روی دسکتاپ همیشه هست چون فروشنده مدام بین سفارش و محصول جابه‌جا می‌شود.',
    'نوار کناری روی عرض کم <strong>جمع می‌شود، ناپدید نمی‌شود</strong> — به آیکون تبدیل می‌شود. فروشنده‌ای که در درخت ناوبری است نباید جایش را گم کند.',
  ],
  use: ['ناوبری را در حداکثر دو سطح نگه دارید؛ سطح سوم یعنی معماری اطلاعات اشتباه است.',
    'شمارندهٔ کنار آیتم‌ها را زنده نگه دارید؛ «سفارش‌های جدید ۳» خودش یک کنش است.',
    'محتوای اصلی را در همان ناحیه اسکرول کنید، نه کل صفحه؛ نوار کناری باید ثابت بماند.'],
  avoid: ['ناوبری کشویی روی دسکتاپ. جا هست؛ استفاده‌اش کنید.',
    'نوار کناری بدون حالت جاری مشخص.', 'سه ناحیهٔ اسکرول هم‌زمان.'],
  anatomy: [['برند', 'گوشهٔ بالای ابتدای محور، هم‌عرض نوار کناری.'],
    ['نوار بالا', 'جست‌وجو، اعلان، حساب کاربری.'],
    ['نوار کناری', '۲۴۸ پیکسل، جمع‌شونده به ۶۰ پیکسل، اسکرول مستقل.'],
    ['محتوا', 'تنها ناحیهٔ اسکرول‌شوندهٔ اصلی.']],
  props: [['collapsed', 'boolean', 'false', 'نوار کناری را به حالت آیکونی می‌برد.'],
    ['nav', 'NavGroup[]', '—', 'حداکثر دو سطح.']],
  a11y: ['نوار کناری یک <code>&lt;nav&gt;</code> با نام دسترس‌پذیر است و آیتم جاری <code>aria-current="page"</code> می‌گیرد.',
    'پیوند «رفتن به محتوا» اولین عنصر قابل فوکوس صفحه است.',
    'در حالت جمع‌شده، هر آیتم <code>aria-label</code> کامل نگه می‌دارد؛ آیکون تنها کافی نیست.'],
  responsive: 'زیر lg نوار کناری به کشو تبدیل می‌شود و نوار بالا دکمهٔ بازکردنش را می‌گیرد. جدول‌های داخل محتوا مستقل از این تغییر، خودشان به کارت تبدیل می‌شوند.',
  specimens: [
    { label: 'اسکلت پنل', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div class="t-shell" style="block-size:420px;inline-size:100%;max-inline-size:720px;border:1px solid var(--t-border-default);border-radius:12px;overflow:hidden">
  <div class="t-shell__brand"><span style="inline-size:24px;block-size:24px;border-radius:7px;background:var(--t-action-red-bg-gradient);display:grid;place-items:center;color:#fff;font-weight:800;font-size:13px">ت</span><strong style="font-size:14px">پنل فروشنده</strong></div>
  <div class="t-shell__top">
    <div class="t-search" style="max-inline-size:220px"><div class="t-input t-input--sm"><input class="t-input__el" type="search" placeholder="جست‌وجو"></div></div>
    <span style="flex:1"></span>
    <button class="t-icon-btn t-icon-btn--sm" aria-label="اعلان‌ها"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a4 4 0 0 0-4 4v3L2.5 11h11L12 8.5v-3a4 4 0 0 0-4-4zM6.5 12a1.5 1.5 0 0 0 3 0z"/></svg></button>
    <span class="t-avatar t-avatar--sm">ا</span>
  </div>
  <nav class="t-shell__nav" aria-label="ناوبری پنل">
    <div class="t-navgroup__title">فروش</div>
    <a class="t-navitem" href="#" aria-current="page"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v2H2zm0 4h12v2H2zm0 4h8v2H2z"/></svg>سفارش‌ها<span class="t-navitem__count">۳</span></a>
    <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1 2 4v8l6 3 6-3V4zm0 1.7 4 2v.1L8 6.8 4 4.8v-.1z"/></svg>محصولات<span class="t-navitem__count">۱۴۸</span></a>
    <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M2 12h2V7H2zm4 0h2V3H6zm4 0h2V9h-2z"/></svg>گزارش‌ها</a>
    <div class="t-navgroup__title">فروشگاه</div>
    <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1z"/></svg>اطلاعات فروشگاه</a>
    <a class="t-navitem" href="#"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5 15 14H1z"/></svg>تنظیمات</a>
  </nav>
  <main class="t-shell__main">
    <div class="t-stats">
      <div class="t-stat"><div class="t-stat__label">سفارش‌های امروز</div><div class="t-stat__value">۴۸</div><div class="t-stat__delta t-stat__delta--up">▲ ۱۲٪</div></div>
      <div class="t-stat"><div class="t-stat__label">درآمد هفته</div><div class="t-stat__value">۸۹٫۴ م‌ت</div><div class="t-stat__delta t-stat__delta--down">▼ ۴٪</div></div>
    </div>
  </main>
</div>` },
  ],
  react: `export function AppShell({ nav, current, collapsed, children, topbar, brand }) {
  return (
    <div className="t-shell" data-nav={collapsed ? 'collapsed' : undefined}>
      <div className="t-shell__brand">{brand}</div>
      <div className="t-shell__top">{topbar}</div>
      <nav className="t-shell__nav" aria-label="ناوبری پنل">
        {nav.map(g => (
          <Fragment key={g.title}>
            {g.title && <div className="t-navgroup__title">{g.title}</div>}
            {g.items.map(i => (
              <a key={i.href} href={i.href} className="t-navitem"
                 aria-label={collapsed ? i.label : undefined}
                 aria-current={i.href === current ? 'page' : undefined}>
                {i.icon}{!collapsed && i.label}
                {i.count != null && !collapsed && <span className="t-navitem__count">{toFa(i.count)}</span>}
              </a>
            ))}
          </Fragment>
        ))}
      </nav>
      <main className="t-shell__main" id="main">{children}</main>
    </div>
  );
}`,
},
{
  name: 'DescriptionList', slug: 'description-list', group: 'Data', status: 'new',
  legacy: [],
  summary: 'جفت‌های برچسب و مقدار برای صفحهٔ جزئیات.',
  description: ['صفحهٔ جزئیات سفارش، پروفایل فروشگاه، مشخصات محصول. یک <code>&lt;dl&gt;</code> واقعی است، نه یک جدول دو‌ستونی؛ صفحه‌خوان جفت را به‌عنوان جفت می‌خواند.'],
  use: ['برچسب‌ها را کوتاه و موازی نگه دارید.', 'مقادیر عددی را جدولی کنید تا ستون تراز بماند.', 'مقدار خالی را «—» بگذارید، نه اینکه ردیف را حذف کنید.'],
  avoid: ['جدول برای داده‌ای که ستون ندارد.', 'برچسب‌هایی که خودشان جمله‌اند.'],
  anatomy: [['برچسب', 'ستون اول، ثانویه، عرض بر پایهٔ بلندترین برچسب.'], ['مقدار', 'ستون دوم، فام پیش‌فرض.']],
  props: [['items', '{ label, value }[]', '—', '']],
  a11y: ['<code>&lt;dl&gt;</code> با <code>&lt;dt&gt;</code> و <code>&lt;dd&gt;</code>؛ صفحه‌خوان رابطه را می‌فهمد.'],
  responsive: 'زیر ۵۶۰ پیکسل تک‌ستونی می‌شود و برچسب بالای مقدار می‌نشیند.',
  specimens: [
    { label: 'جزئیات سفارش', canvas: 'fog', html: `<dl class="t-dl" style="inline-size:100%;max-inline-size:420px">
  <dt>شمارهٔ سفارش</dt><dd class="t-num-tabular">۱۰۲۳۴</dd>
  <dt>تاریخ ثبت</dt><dd class="t-num-tabular"><span class="t-bidi" dir="ltr">۱۴۰۴/۰۶/۱۹</span> — <span class="t-bidi" dir="ltr">۱۴:۲۲</span></dd>
  <dt>مشتری</dt><dd>سارا محمدی</dd>
  <dt>روش پرداخت</dt><dd>پرداخت اینترنتی</dd>
  <dt>کد رهگیری</dt><dd><span class="t-bidi">TRB-4829-1023</span></dd>
  <dt>مبلغ کل</dt><dd class="t-num-tabular">۲٬۴۵۰٬۰۰۰ تومان</dd>
</dl>` },
  ],
  react: `export function DescriptionList({ items }) {
  return (
    <dl className="t-dl">
      {items.map(i => (
        <Fragment key={i.label}>
          <dt>{i.label}</dt>
          <dd className={clsx(i.numeric && 't-num-tabular')}>{i.value ?? '—'}</dd>
        </Fragment>
      ))}
    </dl>
  );
}`,
},
];
