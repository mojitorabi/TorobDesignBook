import { specimen, section, table, guidance, esc } from './site-lib.mjs';

const mk = (title, description, eyebrow = 'Foundations') => ({ title, description, eyebrow, toc: [], body: '' });

/* ─────────────────── SPACING / RADIUS / ELEVATION ─────────────────── */
export function spacingPage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const spaces = Object.entries(m.base).filter(([p]) => p.startsWith('space.'));
  let body = `<div class="prose"><p>A 4px grid. Ten steps, and every one of them is a multiple of four — there is no 6, no 10, no 14. If a value is not on the scale, the answer is to change the layout, not to add a token.</p></div>
  ${specimen({ label: 'The scale', canvas: 'fog', stageClass: 'spec__stage--stack', dir: 'ltr', html: spaces.map(([p, t]) =>
    `<div style="display:flex;align-items:center;gap:14px"><code style="inline-size:118px;font-size:12px">--t-${p.replace(/\./g, '-')}</code><span style="inline-size:44px;font-size:12px;color:var(--t-fg-secondary)">${t.value}</span><span style="block-size:15px;inline-size:${t.value};background:var(--t-fg-brand);border-radius:2px;min-inline-size:1px"></span></div>`).join('') })}`;

  body += S('rhythm', 'Rhythm', `<div class="prose">
    <p>Tight inside a group, generous between groups. The gap that separates two things must be visibly larger than the gap that binds their parts — otherwise the eye cannot find the grouping.</p>
    <ul>
      <li><code>space.1</code> (4px) — icon to its own label, badge internals</li>
      <li><code>space.2</code> (8px) — items inside one component</li>
      <li><code>space.3</code> (12px) — component internals with breathing room</li>
      <li><code>space.4</code> (16px) — the screen gutter. Every 375px layout in the source uses it: 375 − 32 = 343, which is exactly the buy box width.</li>
      <li><code>space.6</code> (24px) — between sections</li>
      <li><code>space.8</code>+ (32px+) — between major regions</li>
    </ul>
    <p><strong>More space above a heading than below it.</strong> A heading belongs to the content that follows, and the whitespace is what says so.</p>
  </div>`);

  const radii = Object.entries(m.base).filter(([p]) => p.startsWith('radius.'));
  body += S('radius', 'Radius', `<div class="prose"><p><strong>12px is the default.</strong> Not a preference: 104 of the 132 corner radii in the Sketch source are 12px. The other steps are for things nested inside 12px containers, or for surfaces larger than a card.</p></div>
    ${specimen({ label: 'Radius scale', canvas: 'fog', dir: 'ltr', html: radii.map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:66px;block-size:66px;background:var(--t-bg-subtle);border:1px solid var(--t-border-default);border-radius:${t.value}"></div><div style="font-size:11px;margin-block-start:7px;color:var(--t-fg-secondary)">${p.replace('radius.', '')}<br>${t.value}</div></div>`).join('') })}
    ${table(['Token', 'Value', 'Use'], radii.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, t.value, t.description ?? '']))}`);

  const elev = Object.entries(m.base).filter(([p]) => p.startsWith('elevation.'));
  body += S('elevation', 'Elevation', `<div class="prose">
      <p>Three real steps, plus two hairline rules. This ramp is for <strong>opaque</strong> surfaces only — <a href="./glass.html">glass elevation is binary</a>.</p>
      <p>The hairline pair reproduces <code>Store Card - Light/Dark</code> from the source, which drew its top and bottom rules as two zero-blur shadows at ±0.5px rather than as borders.</p>
    </div>
    ${specimen({ label: 'Elevation ramp', canvas: 'fog', dir: 'ltr', html: elev.filter(([p]) => /elevation\.[0-3]$/.test(p)).map(([p, t]) =>
      `<div style="text-align:center"><div style="inline-size:96px;block-size:66px;background:var(--t-bg-fog);border-radius:12px;box-shadow:${t.value}"></div><div style="font-size:11px;margin-block-start:9px;color:var(--t-fg-secondary)">elevation-${p.split('.')[1]}</div></div>`).join('') })}
    ${table(['Token', 'Value', 'Use'], elev.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, `<code style="font-size:11.5px">${esc(String(t.value))}</code>`, t.description ?? '']))}`);

  return { body, toc, title: 'Spacing & layout', description: 'A 4px grid, a 12px default radius, and three steps of elevation.', eyebrow: 'Foundations' };
}

/* ─────────────────────────── MOTION ─────────────────────────── */
export function motionPage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const d = Object.entries(m.base).filter(([p]) => p.startsWith('duration.'));
  const e = Object.entries(m.base).filter(([p]) => p.startsWith('easing.'));

  let body = `<div class="prose">
    <p>Torob is a shopping tool used one-handed, on a bus, on a mid-range phone. Motion here confirms what happened and shows where a thing came from. It is never a flourish.</p>
    <p>Four durations, four curves. That is the whole vocabulary.</p>
  </div>
  ${table(['Duration', 'Value', 'Use'], d.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, t.value, t.description ?? '']))}
  ${table(['Easing', 'Value', 'Use'], e.map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`, `<code style="font-size:11.5px">cubic-bezier(${t.value.join(', ')})</code>`, t.description ?? '']))}`;

  body += S('demo', 'The curves', `<div class="prose"><p>Hover each square. <code>out</code> is the default: exponential ease-out, arriving fast and settling soft — it feels like the interface is responding to you rather than playing an animation at you.</p></div>
    ${specimen({ label: 'Easing comparison', canvas: 'fog', dir: 'ltr', html: e.map(([p, t]) => {
      const n = p.replace('easing.', '');
      return `<div style="text-align:center"><div class="motion-demo" style="--e:cubic-bezier(${t.value.join(',')});inline-size:112px;block-size:52px;border-radius:10px;background:var(--t-bg-subtle);border:1px solid var(--t-border-default);display:grid;place-items:start;padding:11px;overflow:hidden"><span style="inline-size:26px;block-size:26px;border-radius:7px;background:var(--t-fg-brand);transition:translate 480ms var(--e)"></span></div><div style="font-size:11px;margin-block-start:7px;color:var(--t-fg-secondary)">${n}</div></div>`;
    }).join('') + `<style>.motion-demo:hover > span { translate: 58px 0; }</style>` })}`);

  body += S('rules', 'Rules', guidance([
    'Animate from an already-visible default. Elements should never fade in from nothing on load.',
    'Glass animates opacity and blur <em>together</em>.',
    'One authored moment per screen, not an entrance on every section.',
    'Micro-interactions at 120ms — below the threshold where a delay is perceptible.',
  ], [
    'Motion that delays an action. A 320ms sheet is the ceiling.',
    'The spring curve outside the favourites heart. One overshoot in the system is a signature; five is a bounce house.',
    'Animating <code>width</code>, <code>height</code>, <code>top</code> or <code>left</code>. Use <code>transform</code> and <code>opacity</code>.',
    'Parallax or scroll-jacking anywhere in a shopping flow.',
  ]));

  body += S('reduced', 'Reduced motion', `<div class="prose"><p>One media query collapses the entire system. Every animation in Torob is reachable from here, which is only true because durations come from tokens rather than from literals scattered through component CSS.</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">layout.css</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="rm-src">Copy</button></div></div>
    <pre class="code" id="rm-src"><code>@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}</code></pre></div>
    <div class="note"><strong>One exception:</strong> the Spinner slows rather than stopping. A frozen spinner reads as a crashed page.</div>`);

  return { body, toc, title: 'Motion', description: 'Four durations, four curves. Motion confirms; it never performs.', eyebrow: 'Foundations' };
}

/* ─────────────────────────── RTL ─────────────────────────── */
export function rtlPage() {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  let body = `<div class="prose">
    <p>Every text style in the Sketch source is <code>align: right</code>. Torob is a Persian product and RTL is not a mode it supports. It is the direction it is built in. LTR is the secondary case.</p>
    <div class="note"><strong>The one rule that matters:</strong> never write a physical direction. No <code>margin-left</code>, no <code>padding-right</code>, no <code>left: 0</code>, no <code>text-align: right</code>. Logical properties handle both directions from one declaration, and they are supported everywhere Torob ships.</div>
  </div>`;

  body += S('properties', 'Logical properties', table(['Instead of', 'Write'], [
    ['<code>margin-left</code> / <code>margin-right</code>', '<code>margin-inline-start</code> / <code>margin-inline-end</code>'],
    ['<code>padding-top</code> / <code>padding-bottom</code>', '<code>padding-block-start</code> / <code>padding-block-end</code>'],
    ['<code>left</code> / <code>right</code>', '<code>inset-inline-start</code> / <code>inset-inline-end</code>'],
    ['<code>text-align: right</code>', '<code>text-align: start</code>'],
    ['<code>border-radius: 8px 0 0 8px</code>', '<code>border-start-start-radius</code> / <code>border-end-start-radius</code>'],
    ['<code>width</code> / <code>height</code>', '<code>inline-size</code> / <code>block-size</code>'],
    ['<code>border-left</code>', '<code>border-inline-start</code>'],
  ]));

  body += S('icons', 'Icons', `<div class="prose">
      <p>Three categories, three different answers:</p>
      <ul>
        <li><strong>Directional</strong> — chevrons, arrows, back. These mirror. Add <code>.t-icon--directional</code> and the system flips them.</li>
        <li><strong>Carbon mirror twins</strong> — five icons ship a purpose-drawn <code>--mirror</code> variant (<code>search--locate</code>, <code>run</code>, <code>list--checked</code>, <code>list--numbered</code>, <code>summary--KPI</code>). Where one exists, use it: a hand-drawn mirror beats a CSS transform, which also flips any embedded text.</li>
        <li><strong>Everything else</strong> — a camera, a heart, a phone. These do <em>not</em> mirror. Flipping them is the most common RTL mistake, and it makes the interface feel broken.</li>
      </ul>
    </div>
    ${specimen({ label: 'Mirrors vs stays', canvas: 'fog', html: `<div style="display:flex;gap:26px;align-items:center">
  <div style="text-align:center"><svg class="t-icon t-icon--lg t-icon--directional" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5 7 10l5 5V5z"/></svg><div class="t-body-sm t-tone-secondary" style="margin-block-start:5px">mirrors</div></div>
  <div style="text-align:center"><svg class="t-icon t-icon--lg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 17S3 12.5 3 7.8A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.8C17 12.5 10 17 10 17z"/></svg><div class="t-body-sm t-tone-secondary" style="margin-block-start:5px">stays</div></div>
  <div style="text-align:center"><svg class="t-icon t-icon--lg" viewBox="0 0 20 20" fill="currentColor"><path d="M15 5h-2l-1.2-1.8H8.2L7 5H5a1.2 1.2 0 0 0-1.2 1.2v8.6A1.2 1.2 0 0 0 5 16h10a1.2 1.2 0 0 0 1.2-1.2V6.2A1.2 1.2 0 0 0 15 5zm-5 9a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8z"/></svg><div class="t-body-sm t-tone-secondary" style="margin-block-start:5px">stays</div></div>
</div>`, note: 'Switch this specimen to English and watch which glyphs move.' })}`);

  body += S('numerals', 'Numerals and bidi', `<div class="prose">
      <ul>
        <li>Persian-Indic numerals ۰۱۲۳۴۵۶۷۸۹ with ٬ as the thousands separator and ٫ as the decimal.</li>
        <li>Latin product names sit inside Persian sentences constantly. Wrap any run whose direction you cannot predict in <code>.t-bidi</code> (<code>unicode-bidi: isolate</code>) — without it, a model number at the end of a sentence will jump to the wrong side.</li>
        <li>Phone numbers, URLs and codes are LTR runs. Isolate them.</li>
      </ul>
    </div>
    ${specimen({ label: 'Bidi isolation', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div class="t-body-lg">گوشی اپل <span class="t-bidi">iPhone 11 (Stock) 128 GB</span> — ۲۳٬۵۵۰٬۰۰۰ تومان</div>
<div class="t-body-md t-tone-secondary">تماس: <span class="t-bidi">۰۲۱-۸۸۷۷۶۶۵۵</span> · کد فروشنده <span class="t-bidi">TRB-4829</span></div>` })}`);

  body += S('motion', 'Motion has a direction too', `<div class="prose">
      <p>A side panel slides in from the inline end. In RTL that is the left; in LTR the right. <code>translateX</code> cannot express that on its own, so the system exposes a direction scalar:</p>
    </div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">base.css</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="dir-src">Copy</button></div></div>
    <pre class="code" id="dir-src"><code>:root                        { --t-dir: -1; }
:root[dir="rtl"], [dir="rtl"] { --t-dir:  1; }
:root[dir="ltr"], [dir="ltr"] { --t-dir: -1; }

/* A panel entering from the inline end, in either direction */
@keyframes t-panel-in {
  from { transform: translateX(calc(100% * var(--t-dir, -1) * -1)); }
}</code></pre></div>`);

  body += S('checklist', 'Review checklist', guidance([
    'Toggle every screen to LTR before shipping. The locale switch on each specimen here does exactly that.',
    'Test with a long Persian string and a long Latin string in the same field.',
    'Check that back and forward chevrons point the right way in both directions.',
    'Verify that numbers stay tabular and separators stay correct after the switch.',
  ], [
    'Any physical direction property. Grep for <code>margin-left</code>, <code>padding-right</code>, <code>text-align: right</code>.',
    'Mirroring non-directional icons.',
    'Hardcoded <code>dir="rtl"</code> on components. Direction belongs on <code>&lt;html&gt;</code>.',
    'Treating RTL as a QA pass at the end. It is a build-time constraint.',
  ]));

  return { body, toc, title: 'RTL & Persian', description: 'RTL is not a mode this system supports. It is the direction it is built in.', eyebrow: 'Foundations' };
}

/* ─────────────────────────── RESPONSIVE ─────────────────────────── */
export function responsivePage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const bp = Object.entries(m.base).filter(([p]) => p.startsWith('breakpoint.'));
  let body = `<div class="prose">
    <p>Every one of the 29 example screens in the Sketch source is 375px wide. This system has never been designed above a phone, so this page is not documentation of an existing behaviour, it is the decision about what that behaviour should be.</p>
    <div class="note note--new"><strong>All six breakpoints are new.</strong> They are derived from the source's own numbers: 375 is the design origin, 343 is the buy-box width (375 − 32 gutters), and the product grid is 2-up because that is what the examples show.</div>
  </div>
  ${table(['Token', 'Value', 'What changes'], bp.map(([p, t]) => [`<code>--t-breakpoint-${p.split('.')[1]}</code>`, t.value, t.description ?? '']))}`;

  body += S('behaviour', 'What adapts', table(['Element', 'Phone', 'Tablet (md)', 'Desktop (xl)'], [
    ['Product grid', '2 columns', '4 columns', '6 columns'],
    ['Bottom sheet', 'Bottom sheet', '420px inline-end panel', 'Inline-end panel'],
    ['Menu', 'Bottom sheet', 'Popover', 'Popover'],
    ['Navigation', 'BottomNav', 'Top nav', 'Top nav + breadcrumb'],
    ['Map + list', 'Switch between them', 'Switch', 'Side by side'],
    ['Toast', 'Full-width inset', '380px, inline end', '380px, inline end'],
    ['Breadcrumb', 'Hidden', 'Visible', 'Visible'],
    ['Container', '16px gutters', '24px gutters', '1280px max, 32px gutters'],
  ]));

  body += S('corners', 'Corner cases', `<div class="prose"><p>The failures that actually happen in production, and what the system does about each.</p></div>
    ${table(['Case', 'Handling'], [
      ['Viewport below 360px', 'Nothing may break. Buttons go <code>block</code>, two-up footers stack, labels shorten rather than truncate.'],
      ['Very long product titles', '<code>.t-clamp-2</code> on cards, <code>.t-truncate</code> in rows. Never clamp the price to fit the title.'],
      ['Long Persian store names', 'Truncate at the container, never mid-word. Persian words do not break like Latin ones.'],
      ['Latin text inside Persian', '<code>.t-bidi</code> isolation, or the run reorders the sentence.'],
      ['A 300% browser zoom', 'The layout reflows to a single column. Nothing depends on horizontal scroll except designated rails.'],
      ['Notch and home indicator', '<code>env(safe-area-inset-*)</code> on BottomNav, sheets and the toast region.'],
      ['Landscape phone', 'Sheets cap at 90dvh so the grip and footer stay reachable.'],
      ['Text-only zoom to 200%', 'All sizing is in px against a rem-scalable root; no fixed-height text containers.'],
      ['Slow or absent images', 'Skeletons match final dimensions, so nothing shifts when they land.'],
      ['No JS', 'Content renders. Progressive enhancement covers overlays and the locale switch.'],
    ])}`);

  body += S('test', 'Test sizes', `<div class="prose"><p>Before shipping any screen, check it at these six. The first is the one people forget and the one that breaks.</p></div>
    ${table(['Width', 'Device', 'Why'], [
      ['320px', 'iPhone SE 1st gen / old Android', 'The true floor. If it survives here it survives anywhere.'],
      ['360px', 'Most mid-range Android', 'The single most common width in Torob\'s traffic.'],
      ['375px', 'iPhone SE / mini', 'The design origin. Every source screen is this.'],
      ['768px', 'iPad portrait', 'Where sheets become panels.'],
      ['1024px', 'iPad landscape', 'Where the persistent filter rail appears.'],
      ['1440px', 'Laptop', 'Where map and list sit side by side.'],
    ])}`);

  return { body, toc, title: 'Responsive', description: 'The source is 375-only. This is how it grows, and where it must not break.', eyebrow: 'Foundations' };
}
