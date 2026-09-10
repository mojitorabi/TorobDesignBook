const chevD = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg>`;
const filterIcon = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v1.4H2zm2 4h8v1.4H4zm2 4h4v1.4H6z"/></svg>`;

export default [
{
  name: 'SegmentedControl', slug: 'segmented-control', group: 'Navigation', status: 'revised',
  legacy: ['Segmented Controls/Selected', 'Segmented Controls/Not-selected', 'Segmented Controls/Icon Selected', 'Segmented Controls/Icon Not-selected', 'Segmented Controls/Light/Large/Selected'],
  summary: 'Switches the content below between mutually exclusive views.',
  description: [
    'Five masters in the source, differing only by selection state, icon presence and size. One component, three props. Note the four duplicate <code>Segmented Controls/Selected</code> masters — same name, four distinct symbol IDs.',
    'The large 395×64 variant is a different density, not a different component: <code>size="lg"</code>.',
  ],
  use: ['Two to five options that all fit without scrolling.', 'Switching a view — فروشگاه‌ها ⇄ محصولات — not filtering it.', 'Glass, so it can float over a map or a scrolling list.'],
  avoid: ['More than five options. Use Tabs.', 'Options whose labels truncate.', 'As a filter. Filters accumulate; segments are exclusive.'],
  anatomy: [['Track', 'Glass, radius 12, 3px padding, horizontally scrollable as a last resort.'], ['Item', '26px (44px at lg), 12px Bold, radius 8.'], ['Selected', 'Glass at 60% with the 0.5px blue ring.']],
  props: [['options', '{ value, label, icon?, count? }[]', '—', '2–5.'], ['value', 'string', '—', 'Controlled.'], ['size', "'md' | 'lg'", "'md'", '32 / 64 px track.'], ['block', 'boolean', 'false', 'Options share the width equally.']],
  a11y: ['<code>role="tablist"</code> with <code>role="tab"</code> and <code>aria-selected</code>, wired to the panel via <code>aria-controls</code>.', 'Arrow keys move; the group is one tab stop.'],
  responsive: 'Intrinsic width up to md; <code>block</code> below it so the options fill the row. Never wraps — it scrolls.',
  specimens: [
    { label: 'Stores / products', canvas: 'map', stageClass: 'spec__stage--center', html: `<div class="t-segmented" role="tablist" aria-label="نمای اطراف">
  <button class="t-segmented__item" role="tab" aria-selected="true">فروشگاه‌ها<span class="t-chip__count">۴۳</span></button>
  <button class="t-segmented__item" role="tab" aria-selected="false">محصولات<span class="t-chip__count">۵۵</span></button>
</div>` },
    { label: 'Large, block', canvas: 'fog', html: `<div class="t-segmented t-segmented--lg t-segmented--block" role="tablist" aria-label="مرتب‌سازی" style="max-inline-size:360px">
  <button class="t-segmented__item" role="tab" aria-selected="true">نزدیک‌ترین</button>
  <button class="t-segmented__item" role="tab" aria-selected="false">ارزان‌ترین</button>
  <button class="t-segmented__item" role="tab" aria-selected="false">محبوب‌ترین</button>
</div>` },
  ],
  react: `export function SegmentedControl({ options, value, onChange, size = 'md', block, label }) {
  return (
    <div className={clsx('t-segmented', size === 'lg' && 't-segmented--lg', block && 't-segmented--block')}
         role="tablist" aria-label={label}>
      {options.map(o => (
        <button key={o.value} className="t-segmented__item" role="tab"
                aria-selected={o.value === value} onClick={() => onChange(o.value)}>
          {o.icon}{o.label}{o.count != null && <span className="t-chip__count">{toFa(o.count)}</span>}
        </button>
      ))}
    </div>
  );
}`,
},
{
  name: 'FilterChip', slug: 'filter-chip', group: 'Navigation', status: 'revised',
  legacy: ['Filter/Cell/Cell', 'Filter/Cell/Icon', 'Filter/Cell/Icon+Chevron', 'city filter', 'official seller'],
  summary: 'One filter facet. Toggles on, or opens a sheet for its options.',
  description: [
    'Three cell masters in the kit plus two undocumented one-offs found only on the examples page — <code>city filter</code> and <code>official seller</code>. Those two were never in the component library at all, which is exactly the drift this system exists to close.',
    'Two behaviours share one shape: a <strong>toggle</strong> chip flips on and off in place; a <strong>disclosure</strong> chip carries a chevron and opens a sheet. The chevron is the contract, never show one on a chip that does not open something.',
  ],
  use: ['Show the active count on multi-value facets: «برند ۳».', 'Keep applied filters visible; never collapse them into "۳ فیلتر".', 'Order by how often the facet is used, not alphabetically.'],
  avoid: ['A chevron on a chip that only toggles.', 'More than about eight chips before a "همه فیلترها" entry point.', 'Removing a chip from the rail because it is inactive — the rail must be stable.'],
  anatomy: [['Container', '32px, radius 12, glass. Selected swaps to 60% with the blue ring.'], ['Leading icon', 'Optional 16px.'], ['Label + count', '12px Bold; the count is secondary.'], ['Chevron', 'Present only when the chip opens a sheet.']],
  props: [['active', 'boolean', 'false', 'Selected state.'], ['count', 'number', '—', 'Applied values on a multi-select facet.'], ['opens', 'boolean', 'false', 'Renders the chevron and sets <code>aria-haspopup</code>.']],
  a11y: ['Toggle chips use <code>aria-pressed</code>. Disclosure chips use <code>aria-expanded</code> + <code>aria-haspopup="dialog"</code>. Never both.', 'The accessible name includes the count: "برند، ۳ مورد انتخاب شده".'],
  responsive: 'Horizontal scroll on every size — chips never wrap. The rail bleeds to the viewport edge so a partially visible chip signals more.',
  specimens: [
    { label: 'Filter rail', canvas: 'plain', html: `<div class="t-filter-bar" style="border-radius:12px">
  <button class="t-icon-btn t-icon-btn--sm t-filter-bar__lead" aria-label="همه فیلترها">${filterIcon}</button>
  <button class="t-chip" aria-pressed="true">تهران</button>
  <button class="t-chip" aria-expanded="false" aria-haspopup="dialog">برند<span class="t-chip__count">۳</span>${chevD}</button>
  <button class="t-chip" aria-expanded="false" aria-haspopup="dialog">قیمت${chevD}</button>
  <button class="t-chip" aria-pressed="true">ضمانت ترب</button>
  <button class="t-chip" aria-pressed="false">نمایندگی رسمی</button>
  <button class="t-chip" aria-pressed="false">باز الان</button>
</div>` , note: 'Chips are live — click to toggle. Scroll the rail horizontally.' },
  ],
  react: `export function FilterChip({ active, count, opens, icon, children, ...rest }) {
  return (
    <button className="t-chip"
            {...(opens ? { 'aria-expanded': !!active, 'aria-haspopup': 'dialog' } : { 'aria-pressed': !!active })}
            {...rest}>
      {icon}{children}
      {count != null && <span className="t-chip__count">{toFa(count)}</span>}
      {opens && <ChevronDown className="t-icon t-icon--sm" />}
    </button>
  );
}`,
},
{
  name: 'Tabs', slug: 'tabs', group: 'Navigation', status: 'revised',
  legacy: ['Tab/Selected'],
  summary: 'Switches sections within a page. Scales past five options.',
  description: ['Where SegmentedControl is a compact exclusive switch, Tabs is the page-level one: it scrolls, it carries counts, and it holds an underline rather than a filled pill.'],
  use: ['Product detail sections: فروشنده‌ها · مشخصات · نظرات.', 'Show counts where the number helps the choice.', 'Keep the selected tab in view when the strip scrolls.'],
  avoid: ['Tabs that change the page rather than the section: that is navigation.', 'Nested tab strips.', 'More than about seven.'],
  anatomy: [['Strip', 'Bottom hairline, horizontal scroll, hidden scrollbar.'], ['Tab', '14px Bold, 12px vertical padding.'], ['Indicator', '2px brand underline, scaled in from 0 over 220ms.']],
  props: [['options', '{ value, label, count? }[]', '—', ''], ['value', 'string', '—', 'Controlled.']],
  a11y: ['Full tablist pattern with <code>aria-controls</code> on each tab and <code>aria-labelledby</code> on each panel.', 'Arrow keys move, Home/End jump. Panels are <code>tabindex="0"</code> so their content is reachable.'],
  responsive: 'Scrolls horizontally at every size. Above lg, if all tabs fit, the strip left-aligns rather than stretching.',
  specimens: [
    { label: 'PDP sections', canvas: 'fog', html: `<div class="t-tabs" role="tablist" aria-label="بخش‌های محصول" style="inline-size:100%">
  <button class="t-tab" role="tab" aria-selected="true">فروشنده‌ها<span class="t-tab__count">۷۹</span></button>
  <button class="t-tab" role="tab" aria-selected="false">مشخصات</button>
  <button class="t-tab" role="tab" aria-selected="false">نمودار قیمت</button>
  <button class="t-tab" role="tab" aria-selected="false">نظرات<span class="t-tab__count">۱۲</span></button>
</div>` },
  ],
  react: `export function Tabs({ options, value, onChange, label }) {
  return (
    <div className="t-tabs" role="tablist" aria-label={label}>
      {options.map(o => (
        <button key={o.value} className="t-tab" role="tab" id={\`tab-\${o.value}\`}
                aria-selected={o.value === value} aria-controls={\`panel-\${o.value}\`}
                tabIndex={o.value === value ? 0 : -1} onClick={() => onChange(o.value)}>
          {o.label}{o.count != null && <span className="t-tab__count">{toFa(o.count)}</span>}
        </button>
      ))}
    </div>
  );
}`,
},
{
  name: 'PageHeader', slug: 'page-header', group: 'Navigation', status: 'revised',
  legacy: ['Header/Profile'],
  summary: 'Sticky glass header: back, title, actions.',
  description: ['The source shipped a single 343×56 <code>Header/Profile</code>, duplicated twice. Generalised here: a back affordance, a title with optional subtitle, and trailing actions.'],
  use: ['Sticky at the top of any scrolling screen.', 'Put the location and result count in the subtitle: «تهران، ۷۸ مورد».', 'Cap trailing actions at two; overflow into a menu.'],
  avoid: ['A back button on a root screen.', 'Titles that truncate — shorten the copy instead.'],
  anatomy: [['Container', '56px, glass surface, sticky, hairline bottom.'], ['Leading', 'Back or close. The back chevron mirrors in RTL.'], ['Title block', '16px Bold + optional 12px secondary.'], ['Trailing', 'Up to two icon buttons.']],
  props: [['title / subtitle', 'string', '—', ''], ['onBack', '() => void', '—', 'Omit on root screens.'], ['actions', 'ReactNode', '—', 'Max two.']],
  a11y: ['A real <code>&lt;header&gt;</code> with the title as <code>&lt;h1&gt;</code> on the screen it heads.', 'Back is a button with <code>aria-label="بازگشت"</code>, not a bare glyph.'],
  responsive: '56px throughout. Above lg the title moves inline with a breadcrumb and the header un-sticks if the page is short.',
  specimens: [
    { label: 'Header', canvas: 'map', stageClass: 'spec__stage--stack', html: `<header class="t-page-header" style="border-radius:12px;position:relative;inline-size:100%">
  <button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت"><svg class="t-icon t-icon--directional" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5 7 10l5 5V5z"/></svg></button>
  <div class="t-page-header__title">فروشگاه‌های اطراف<div class="t-page-header__sub">تهران، ۷۸ مورد</div></div>
  <button class="t-icon-btn t-icon-btn--sm" aria-label="اشتراک‌گذاری"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M14 13a2.5 2.5 0 0 0-1.8.8l-4.3-2.5a2.5 2.5 0 0 0 0-2.6l4.3-2.5a2.5 2.5 0 1 0-.7-1.3L7.2 7.4a2.5 2.5 0 1 0 0 5.2l4.3 2.5A2.5 2.5 0 1 0 14 13z"/></svg></button>
</header>` },
  ],
  react: `export function PageHeader({ title, subtitle, onBack, actions }) {
  return (
    <header className="t-page-header">
      {onBack && <IconButton size="sm" label="بازگشت" onClick={onBack}><ChevronStart className="t-icon--directional" /></IconButton>}
      <div className="t-page-header__title">
        {title}
        {subtitle && <div className="t-page-header__sub">{subtitle}</div>}
      </div>
      {actions}
    </header>
  );
}`,
},
{
  name: 'BottomNav', slug: 'bottom-nav', group: 'Navigation', status: 'new',
  legacy: [],
  summary: 'Root-level navigation, anchored where the thumb is.',
  description: ['Absent from the kit despite every example screen being a phone. Glass, safe-area aware, three to five destinations.'],
  use: ['Three to five top-level destinations that never change.', 'Label every item — icons alone are guesswork.', 'Mark the current destination with <code>aria-current="page"</code>.'],
  avoid: ['More than five items.', 'Actions rather than destinations. A "+" that opens a sheet belongs elsewhere.', 'Hiding it on scroll — the destination set should be constant.'],
  anatomy: [['Container', 'Glass, sticky bottom, hairline top, padded for the home indicator.'], ['Item', 'Icon over 12px label, minimum 44px, equal widths.'], ['Current', 'Brand colour and Bold weight — two channels, not just colour.']],
  props: [['items', '{ href, label, icon }[]', '—', '3–5.'], ['current', 'string', '—', 'Matching href.']],
  a11y: ['A <code>&lt;nav&gt;</code> landmark with an accessible name.', 'Current uses <code>aria-current="page"</code>, plus weight and colour so it does not rely on hue alone.'],
  responsive: 'Phone only. From md it is replaced by the sidebar or top navigation — do not render both.',
  specimens: [
    { label: 'Bottom navigation', canvas: 'fog', html: `<nav class="t-bottom-nav" aria-label="ناوبری اصلی" style="border-radius:12px;position:relative;inline-size:100%;max-inline-size:375px">
  <button class="t-bottom-nav__item" aria-current="page"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2 2 9h2v9h5v-6h2v6h5V9h2z"/></svg>خانه</button>
  <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>جستجو</button>
  <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8.2A2.2 2.2 0 1 1 10 5.8a2.2 2.2 0 0 1 0 4.4z"/></svg>اطراف من</button>
  <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3.5 17a6.5 6.5 0 0 1 13 0z"/></svg>حساب من</button>
</nav>` },
  ],
  react: `export function BottomNav({ items, current, label = 'ناوبری اصلی' }) {
  return (
    <nav className="t-bottom-nav" aria-label={label}>
      {items.map(i => (
        <a key={i.href} href={i.href} className="t-bottom-nav__item"
           aria-current={i.href === current ? 'page' : undefined}>
          {i.icon}{i.label}
        </a>
      ))}
    </nav>
  );
}`,
},
{
  name: 'Breadcrumb', slug: 'breadcrumb', group: 'Navigation', status: 'new',
  legacy: [],
  summary: 'Where this page sits in the catalogue.',
  description: ['Torob\'s category tree is deep, and above md there is room to show it. The separator must point along the reading direction — in RTL it points left.'],
  use: ['Category pages and product detail, from md upward.', 'Truncate the middle, never the ends: first … last two.'],
  avoid: ['Breadcrumbs as the only way back on a phone. Give a back button.', 'Making the current page a link.'],
  anatomy: [['Item', '12px, secondary; the current page is default weight Bold.'], ['Separator', 'A logical chevron that mirrors with direction.']],
  props: [['items', '{ href, label }[]', '—', 'Last item is the current page.']],
  a11y: ['<code>&lt;nav aria-label="مسیر"&gt;</code> wrapping an <code>&lt;ol&gt;</code>.', 'The final item carries <code>aria-current="page"</code> and is not a link.'],
  responsive: 'Hidden below md, where PageHeader\'s back button does the job.',
  specimens: [
    { label: 'Breadcrumb', canvas: 'fog', html: `<nav class="t-breadcrumb" aria-label="مسیر">
  <a class="t-breadcrumb__item" href="#">خانه</a><span class="t-breadcrumb__sep">›</span>
  <a class="t-breadcrumb__item" href="#">آرایشی و بهداشتی</a><span class="t-breadcrumb__sep">›</span>
  <a class="t-breadcrumb__item" href="#">عطر و ادکلن</a><span class="t-breadcrumb__sep">›</span>
  <span class="t-breadcrumb__item" aria-current="page">کازاموراتی مفیستو</span>
</nav>` },
  ],
  react: `export function Breadcrumb({ items }) {
  return (
    <nav className="t-breadcrumb" aria-label="مسیر">
      <ol style={{ display: 'contents' }}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.href} style={{ display: 'contents' }}>
              {last ? <span className="t-breadcrumb__item" aria-current="page">{it.label}</span>
                    : <><a className="t-breadcrumb__item" href={it.href}>{it.label}</a>
                        <span className="t-breadcrumb__sep" aria-hidden="true">›</span></>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}`,
},
];
