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

  /* ── Getting started ── */
  page('start', 'Getting started', 'Install the tokens, copy a component, ship.', 'Overview', [
    [null, null, `<div class="prose">
      <p>The canonical layer is <strong>framework-free CSS custom properties plus CSS classes</strong>. React is a wrapper over that, never a fork of it, which is what lets a mixed stack adopt the system without a rewrite.</p>
    </div>`],
    ['install', 'Install', `<div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Any project — the CSS layer</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="i1">Copy</button></div></div>
      <pre class="code" id="i1"><code>&lt;!-- tokens.css defines every custom property; torob.css imports it --&gt;
&lt;link rel="stylesheet" href="/design-system/packages/css/dist/torob.css"&gt;
&lt;link rel="stylesheet" href="/design-system/packages/css/dist/fonts.css"&gt;

&lt;html lang="fa" dir="rtl"&gt;   &lt;!-- direction lives here, nowhere else --&gt;</code></pre></div>
      <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Tailwind v4</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="i2">Copy</button></div></div>
      <pre class="code" id="i2"><code>/* app.css — maps every token onto Tailwind utilities */
@import "tailwindcss";
@import "/design-system/packages/css/dist/tokens.tailwind.css";

/* bg-fg-default, text-commerce-price, rounded-md, gap-4 … all resolve to tokens */</code></pre></div>
      <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">JS / TS</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="i3">Copy</button></div></div>
      <pre class="code" id="i3"><code>import tokens from '@torob/tokens';

tokens.light.fg.default        // '#1E293B'
tokens.dark.fg.default         // '#F1F5F9'
tokens.glass.light.surface.fill // 'rgba(255, 255, 255, 0.30)'
tokens.radius.md               // '12px'</code></pre></div>`],
    ['first', 'Your first screen', `<div class="prose"><p>Three rules get you 90% of the way:</p>
      <ol>
        <li><strong>Set direction once</strong>, on <code>&lt;html dir="rtl" lang="fa"&gt;</code>. Never on a component.</li>
        <li><strong>Use semantic tokens</strong> — <code>var(--t-fg-default)</code>, not <code>var(--t-color-sky-800)</code> and never <code>#1E293B</code>.</li>
        <li><strong>Logical properties only.</strong> <code>margin-inline-start</code>, not <code>margin-left</code>.</li>
      </ol></div>
      ${specimen({ label: 'A nearby-store screen, from system parts only', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div style="inline-size:100%;max-inline-size:375px;background:var(--t-bg-canvas);border-radius:16px;overflow:hidden;border:1px solid var(--t-border-default)">
  <header class="t-page-header" style="position:relative">
    <button class="t-icon-btn t-icon-btn--sm" aria-label="بازگشت"><svg class="t-icon t-icon--directional" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5 7 10l5 5V5z"/></svg></button>
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
        <button class="t-btn t-btn--primary t-btn--md">تماس تلفنی</button>
        <button class="t-btn t-btn--outline t-btn--md">مسیریابی</button>
      </div>
    </article>
  </div>
  <nav class="t-bottom-nav" style="position:relative" aria-label="ناوبری اصلی">
    <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2 2 9h2v9h5v-6h2v6h5V9h2z"/></svg>خانه</button>
    <button class="t-bottom-nav__item"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>جستجو</button>
    <button class="t-bottom-nav__item" aria-current="page"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8.2A2.2 2.2 0 1 1 10 5.8a2.2 2.2 0 0 1 0 4.4z"/></svg>اطراف من</button>
  </nav>
</div>` })}`],
    ['build', 'Build commands', table(['Command', 'Does'], [
      ['<code>node build/tokens-build.mjs</code>', 'Regenerate all twelve token artefacts from <code>source/tokens/*.json</code>.'],
      ['<code>node build/icons-build.mjs</code>', 'Rebuild the icon package from the Sketch index + Carbon.'],
      ['<code>node build/site-build.mjs</code>', 'Rebuild this website.'],
      ['<code>node build/mcp-build.mjs</code>', 'Regenerate the MCP server\'s data.'],
      ['<code>node build/contrast-check.mjs</code>', 'Verify every colour pair against WCAG AA. Exits non-zero on failure.'],
      ['<code>node build/validate-css.mjs</code>', 'Verify every <code>var()</code> reference resolves.'],
      ['<code>node build/serve.mjs</code>', 'Serve the site on :4321.'],
      ['<code>node build/all.mjs</code>', 'All of the above, in order.'],
    ])],
    ['contrib', 'Changing the system', `<div class="prose">
      <p>Everything flows from <code>source/</code>. Never edit anything in <code>packages/*/dist</code> or <code>site/</code> — those are generated and will be overwritten.</p>
      <ul>
        <li><strong>A colour, size or duration</strong> → <code>source/tokens/*.json</code>, then <code>tokens-build</code>. Run <code>contrast-check</code> before committing.</li>
        <li><strong>A component's CSS</strong> → <code>packages/css/src/*.css</code>.</li>
        <li><strong>A component's docs, props or examples</strong> → <code>source/components/*.mjs</code>. This one file feeds the website, the MCP server and <code>llms.txt</code>.</li>
        <li><strong>Specimen copy in English</strong> → <code>source/i18n.mjs</code>.</li>
      </ul>
    </div>`],
  ]);

  /* ── Elevation ── */
  const elev = Object.entries(m.base).filter(([p]) => p.startsWith('elevation.'));
  page('foundations/elevation', 'Elevation & depth', 'Three steps for opaque surfaces. Glass does not use this ramp.', 'Foundations', [
    [null, null, `<div class="prose">
      <p>Depth in this system is expressed two different ways, and mixing them is the mistake to avoid.</p>
      <ul>
        <li><strong>Opaque surfaces</strong> use the shadow ramp below — three steps, no more.</li>
        <li><strong>Glass surfaces</strong> use a binary hairline: present or absent. See <a href="./glass.html">Glass</a>.</li>
      </ul>
      <p>The source drew its store-card dividers as two zero-blur shadows at ±0.5px rather than as borders. Both are kept as tokens, because a shadow rule sits <em>outside</em> the box model and does not shift the layout the way a border does.</p>
    </div>
    ${specimen({ label: 'The ramp', canvas: 'fog', dir: 'ltr', html: elev.filter(([p]) => /elevation\.[0-3]$/.test(p)).map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:104px;block-size:72px;background:var(--t-bg-fog);border-radius:12px;box-shadow:${t.value}"></div><div style="font-size:11px;margin-block-start:10px;color:var(--t-fg-secondary)">elevation-${p.split('.')[1]}</div></div>`).join('') })}
    ${table(['Token', 'Value', 'Use'], elev.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, `<code style="font-size:11.5px">${esc(String(t.value))}</code>`, t.description ?? '']))}`],
    ['z', 'Stacking order', `<div class="prose"><p>Never write a raw <code>z-index</code>. Every layer in the system has a token, and the gaps between them leave room for product-specific layers.</p></div>
      ${table(['Token', 'Value', 'Layer'], Object.entries(m.base).filter(([p]) => p.startsWith('z.')).map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, String(t.value), p.split('.')[1]]))}`],
    ['rules', 'Rules', guidance([
      'Shadows carry an offset and a soft blur: that is what makes them read as light from above.',
      'One elevation step per interaction. A card that lifts on hover goes 1 → 2, not 1 → 3.',
      'Use the hairline rule pair for list dividers that must not shift layout.',
    ], [
      'A fourth elevation step. If three are not enough, the layering is wrong.',
      'Zero-offset shadows. A colourless halo is decoration, not depth.',
      'The shadow ramp on glass.',
      'Raw z-index values.',
    ])],
  ]);

  /* ── Radius ── */
  const radii = Object.entries(m.base).filter(([p]) => p.startsWith('radius.'));
  page('foundations/radius', 'Radius', '12px is the default — 104 of the 132 radii in the source.', 'Foundations', [
    [null, null, `<div class="prose">
      <p>Six steps. <strong>12px is the default</strong>, and that is not a preference: 104 of the 132 corner radii in the Sketch source are 12px. The other steps exist for things nested <em>inside</em> a 12px container, and for surfaces larger than a card.</p>
      <div class="note"><strong>Nesting rule:</strong> an inner radius should be the outer radius minus the padding between them. A 12px card with 8px padding wants an 8px inner element — not another 12px, which reads as a bubble inside a bubble.</div>
    </div>
    ${specimen({ label: 'The scale', canvas: 'fog', dir: 'ltr', html: radii.map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:70px;block-size:70px;background:var(--t-bg-subtle);border:1px solid var(--t-border-default);border-radius:${t.value}"></div><div style="font-size:11px;margin-block-start:8px;color:var(--t-fg-secondary)">${p.replace('radius.', '')}<br>${t.value}</div></div>`).join('') })}
    ${table(['Token', 'Value', 'Use'], radii.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, t.value, t.description ?? '']))}`],
    ['rtl', 'Radius and direction', `<div class="prose">
      <p>The four-corner shorthand is physical and does not mirror. A bottom sheet whose top corners are rounded is symmetric and safe, but anything asymmetric needs logical corner properties:</p></div>
      <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Logical corners</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="rad-src">Copy</button></div></div>
      <pre class="code" id="rad-src"><code>/* ✗ physical — will not mirror */
border-radius: 12px 0 0 12px;

/* ✓ logical — mirrors with the document */
border-start-start-radius: var(--t-radius-md);
border-end-start-radius: var(--t-radius-md);</code></pre></div>`],
  ]);

  /* ── Iconography ── */
  page('foundations/iconography', 'Iconography', 'IBM Carbon at 16 and 20px. 2,041 icons, five with RTL mirror twins.', 'Foundations', [
    [null, null, `<div class="prose">
      <p>Torob uses <strong>IBM Carbon</strong>, drawn at 16 and 20px. The set is fixed by <code>T IBM Icons (16px, 20px).sketch</code> — the icon package is generated by matching those artboard names against Carbon 11.88, so the two cannot diverge.</p>
      <p>Browse and search the whole set on the <a href="../icons.html">Icon library</a> page.</p>
    </div>`],
    ['sizes', 'Sizes', `<div class="prose"><p>Two drawn sizes. 24px exists as a scale of the 20px artwork for large touch targets, but it is not a separate drawing — Carbon's hinting is optimised for 16 and 20.</p></div>
      ${table(['Class', 'Size', 'Use'], [
        ['<code>.t-icon--sm</code>', '16px', 'Inline with 12px and 14px text, inside chips and small buttons.'],
        ['<code>.t-icon</code>', '20px', 'Default. Icon buttons, list leads, nav.'],
        ['<code>.t-icon--lg</code>', '24px', 'Bottom nav, empty-state art. A scale of the 20px drawing.'],
      ])}
      ${specimen({ label: 'Optical weight at each size', canvas: 'fog', html: `<span class="t-icon--sm" style="display:inline-flex"><svg class="t-icon t-icon--sm" viewBox="0 0 32 32" fill="currentColor"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.6L4.6 11A2 2 0 0 1 4 9.6V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.6a2 2 0 0 1-.6 1.4L20 18.4V26a2 2 0 0 1-2 2z"/></svg></span>
<svg class="t-icon" viewBox="0 0 32 32" fill="currentColor"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.6L4.6 11A2 2 0 0 1 4 9.6V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.6a2 2 0 0 1-.6 1.4L20 18.4V26a2 2 0 0 1-2 2z"/></svg>
<svg class="t-icon t-icon--lg" viewBox="0 0 32 32" fill="currentColor"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.6L4.6 11A2 2 0 0 1 4 9.6V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.6a2 2 0 0 1-.6 1.4L20 18.4V26a2 2 0 0 1-2 2z"/></svg>` })}`],
    ['legacy', 'Two icon systems', `<div class="prose">
      <p>The example screens mix Carbon names with an older set — <code>Icon / 16px / Bell</code>, <code>Icon / 24px / call</code>, <code>Icon / 16px / Chevron tiny / down</code>, <code>Icon / 16px / Report-Off</code>. Those are the pre-Carbon library.</p>
      <p>Standardise on Carbon names. They are lowercase, hyphenated, and describe the object rather than a size: <code>notification</code>, <code>phone</code>, <code>chevron--down</code>, <code>flag</code>.</p></div>
      ${table(['Legacy name', 'Carbon name'], [
        ['<span class="legacy">Icon / 16px / Bell</span>', '<code>notification</code>'],
        ['<span class="legacy">Icon / 16px / Heart</span>', '<code>favorite</code>'],
        ['<span class="legacy">Icon / 24px / call</span>', '<code>phone</code>'],
        ['<span class="legacy">Icon / 24px / Close</span>', '<code>close</code>'],
        ['<span class="legacy">Icon / 16px / Report-Off</span>', '<code>flag</code>'],
        ['<span class="legacy">Icon / 16px / Chevron tiny / down</span>', '<code>chevron--down</code>'],
        ['<span class="legacy">Social-Icons/Telegram · Whatsapp · Bale</span>', '<code>logo--telegram</code>, <code>logo--whatsapp</code>, custom for Bale'],
      ])}`],
    ['rules', 'Rules', guidance([
      'One colour per icon, inherited via <code>currentColor</code>.',
      'Add <code>.t-icon--directional</code> to chevrons and arrows.',
      'Use Carbon\'s <code>--mirror</code> twin where one exists, rather than a CSS flip.',
      'Give standalone icons an accessible name; mark decorative ones <code>aria-hidden</code>.',
    ], [
      'Mixing 16 and 20 in one row — the optical weight differs visibly.',
      'Recolouring individual paths inside an icon.',
      'Mirroring non-directional icons in RTL. This is the most common RTL mistake.',
      'Sizes other than 16, 20 or 24.',
      'Inventing icon names. Search the library first.',
    ])],
  ]);

  /* ── Accessibility ── */
  page('foundations/accessibility', 'Accessibility', 'WCAG 2.1 AA, machine-verified on every build.', 'Foundations', [
    [null, null, `<div class="prose">
      <p>The target is <strong>WCAG 2.1 AA</strong>. The colour half of that is not a review item — <code>build/contrast-check.mjs</code> tests 28 foreground/background pairs across both modes and <strong>exits non-zero</strong> on any failure. It is a build gate.</p>
      <div class="note note--new">Running it against the palette as extracted from Sketch produced <strong>4 text failures and 4 non-text failures</strong>. Every one is fixed in <a href="./color.html#changes">Colour → what changed</a>.</div>
    </div>`],
    ['contract', 'The contract', table(['Area', 'Rule'], [
      ['Text contrast', '≥ 4.5:1. Large text and non-text UI ≥ 3:1.'],
      ['Control borders', 'Use <code>--t-border-control</code>, which meets 3:1. <code>--t-border-default</code> is decorative and deliberately below it.'],
      ['Touch targets', '≥ 44px, even where the visual control is 24 or 32px. Buttons carry a transparent <code>::after</code> that expands the target on coarse pointers.'],
      ['Focus', '2px <code>--t-border-focus</code> at 2px offset. Never removed, only replaced. <code>outline: none</code> is acceptable only inside <code>:focus:not(:focus-visible)</code>.'],
      ['Icon-only controls', '<code>aria-label</code> is required. There is no unlabelled variant of IconButton.'],
      ['Colour alone', 'Never the only channel. Status badges pair colour with a word; the current nav item pairs colour with weight.'],
      ['Overlays', 'Focus trap, focus return to trigger, Escape to close, <code>aria-modal</code>, body scroll locked — not merely covered.'],
      ['Collapsed content', 'The <code>hidden</code> attribute, not <code>height: 0</code>. It must leave the accessibility tree.'],
      ['Live regions', '<code>polite</code> for results and toasts. <code>assertive</code> only for critical — it interrupts.'],
      ['Motion', '<code>prefers-reduced-motion</code> collapses everything to 1ms. The Spinner slows instead of stopping.'],
      ['Transparency', '<code>prefers-reduced-transparency</code> makes every glass surface opaque with identical geometry.'],
      ['Maps', 'A map alone is not accessible. Always ship the list equivalent: that is what <a href="../components/switch.html">Switch</a> is for.'],
    ])],
    ['persian', 'Persian-specific', `<div class="prose"><ul>
      <li><strong>Never negative letter-spacing.</strong> Persian is cursive; tightening breaks the joins between letters and can make words unreadable to someone with low vision.</li>
      <li><strong>Never split a number across elements.</strong> A screen reader reads <code>&lt;span&gt;۱۵&lt;/span&gt;&lt;span&gt;٬۸۰۰&lt;/span&gt;</code> as two separate numbers.</li>
      <li><strong>Set <code>lang</code> correctly.</strong> <code>lang="fa"</code> on Persian content and <code>lang="en"</code> on Latin runs, or the screen reader uses the wrong voice and pronunciation.</li>
      <li><strong>Keep the leading.</strong> The line heights in this system are sized for Persian descenders and stacked diacritics; tightening them clips glyphs.</li>
    </ul></div>`],
    ['testing', 'Testing', `<div class="prose"><ol>
      <li><strong>Keyboard only.</strong> Tab through the whole screen. Every interactive element reachable, focus always visible, order matching the visual order in <em>both</em> directions.</li>
      <li><strong>Screen reader.</strong> VoiceOver in Persian on iOS, TalkBack on Android. Check that prices and distances read as one unit.</li>
      <li><strong>200% text zoom.</strong> Nothing clipped, nothing overlapping.</li>
      <li><strong>Reduced motion and reduced transparency</strong> both on.</li>
      <li><strong><code>node build/contrast-check.mjs</code></strong> before every commit that touches a colour.</li>
    </ol></div>`],
  ]);

  /* ── Content ── */
  page('foundations/content', 'Content & voice', 'Persian, direct, no filler. The user is mid-task on a phone.', 'Foundations', [
    [null, null, `<div class="prose"><p>Every string in the product is Persian and every reader is mid-task, usually one-handed, often on a slow connection. Copy earns its place by moving them forward.</p></div>`],
    ['principles', 'Principles', guidance([
      'Controls name their outcome: «مشاهده فروشندگان», not «بیشتر».',
      'Errors name the problem, then the recovery, in that order.',
      'Empty states distinguish "no results" from "nothing here yet". Different copy, different action.',
      'Confirmations name the outcomes: «حذف آدرس» / «انصراف».',
      'Persian numerals throughout product surfaces.',
    ], [
      '«چیزی یافت نشد» with no next step. An error without a recovery is a dead end.',
      'Blaming the user for a filter combination the interface allowed.',
      'OK / Cancel. They describe the dialog, not the outcome.',
      'Two-line toasts. If it needs two lines, it is an Alert.',
      'Untranslated English UI terms where a Persian word exists.',
    ])],
    ['patterns', 'Copy patterns', table(['Situation', 'Pattern', 'Example'], [
      ['No results after filtering', 'Name the filter to drop', '«فروشگاهی با این فیلترها پیدا نشد — فیلتر «باز الان» را بردارید»'],
      ['Nothing added yet', 'Name who can change it', '«محصولی اضافه نشده — برای اطلاع از محصولات با فروشگاه تماس بگیرید»'],
      ['Network failure', 'Cause, then action', '«اتصال به اینترنت برقرار نیست — نتایج مربوط به آخرین بازدید شماست»'],
      ['Action confirmed', 'Past tense, plus undo', '«به علاقه‌مندی‌ها اضافه شد» + «واگرد»'],
      ['Destructive confirm', 'Name the object and the finality', '«حذف آدرس ذخیره‌شده؟ ... این کار قابل بازگشت نیست.»'],
      ['Out of stock', 'State it plainly, offer the alternative', '«ناموجود» + «فروشگاه‌های دیگر»'],
      ['Sponsored', 'The disclosure, always', '«آگهی»'],
    ])],
    ['terms', 'Terminology', `<div class="prose"><p>Fixed vocabulary. Do not paraphrase these — they are product concepts with legal or commercial meaning.</p></div>
      ${table(['Persian', 'Means', 'Note'], [
        ['ضمانت ترب', 'Torob Guarantee', 'The trust mark. Indigo. Spelled "Gaurantee" in the Sketch swatches: that is a typo.'],
        ['آگهی', 'Sponsored / Ad', 'A required disclosure. Always shown, always real text.'],
        ['نمایندگی رسمی', 'Official dealer', 'Blue.'],
        ['کالابرگ', 'Kalabarg', 'Government subsidy voucher. Not translated.'],
        ['ناموجود', 'Out of stock', 'Grey, not red. Unavailability is not an error.'],
        ['باز الان', 'Open now', 'Green dot plus the word.'],
        ['از ... تومان', 'From X Toman', 'Used when several sellers offer the product.'],
      ])}`],
  ]);

  /* ── Changelog ── */
  page('changelog', 'Changelog', 'What shipped, and what changed from the Sketch source.', 'Overview', [
    [null, null, `<div class="prose">
      <h2 style="font-size:19px;margin-block-start:0">1.0.0</h2>
      <p class="t-tone-secondary" style="margin-block-start:-8px">Initial system, generated from <code>Torob Tokens.sketch</code> and <code>T IBM Icons (16px, 20px).sketch</code>.</p>
      <h3>Added</h3>
      <ul>
        <li>Three-tier token architecture in W3C DTCG format — 166 primitives, 80 semantic tokens per mode.</li>
        <li>Twelve generated token artefacts: CSS, Tailwind v4, SCSS, TS, JS, flat JSON, resolved JSON, SwiftUI, Android XML (day and night), dimens, and a Markdown reference.</li>
        <li>31 components across six groups, of which 16 are new — the whole feedback layer (Toast, Alert, EmptyState, Skeleton, Spinner) and the whole overlay layer (BottomSheet, Modal, Accordion, Menu) were absent from the kit.</li>
        <li>2,041 IBM Carbon icons at 16 and 20px, plus sprites and a searchable browser.</li>
        <li>MCP server with nine tools, including <code>validate_code</code>.</li>
        <li>IRANYekanX wired at nine weights as woff2 (904 KB → 291 KB).</li>
        <li>Six breakpoints and the responsive behaviour for each — the source was 375-only.</li>
        <li>A locale switch on every specimen: direction, copy and numerals together.</li>
      </ul>
      <h3>Changed from the source</h3>
      <ul>
        <li><strong>Backdrop blur added at 16px.</strong> The source had no blur anywhere. Set <code>--t-glass-blur: 0px</code> to render exactly as designed.</li>
        <li><strong>Ten colour corrections</strong>, every one an accessibility failure or a broken ramp. See <a href="foundations/color.html#changes">Colour → what changed</a>.</li>
        <li><strong>All dark-mode status ramps re-derived.</strong> The source reused light values verbatim.</li>
        <li><strong>Component naming moved from colour to intent.</strong> <code>Button / Red</code> → <code>variant="primary"</code>.</li>
        <li><strong>State and theme demoted from components to props and tokens.</strong> 110 Sketch masters → 31 components.</li>
      </ul>
      <h3>Known gaps</h3>
      <ul>
        <li>21 of 2,062 icons in the Sketch library have no match in Carbon 11.88 — 13 are deprecated IBM-internal glyphs (CICS, Cloud Paks, navaids) and 4 are artboards named with two icon names separated by a comma. Listed in <code>packages/icons/unmatched.json</code>.</li>
        <li>Pattern pages (full example flows) are outlined but not yet built.</li>
        <li>The React package ships as source-in-docs; it is not yet published to a registry.</li>
      </ul>
    </div>`],
  ]);

  return P;
}
