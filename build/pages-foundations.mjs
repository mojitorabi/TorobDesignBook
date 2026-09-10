import { specimen, section, table, guidance, esc } from './site-lib.mjs';

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
  const semantic = (prefix) => Object.entries(m.modes.light).filter(([p]) => p.startsWith(prefix))
    .map(([p, t]) => [`<code>--t-${p.replace(/\./g, '-')}</code>`,
      `<span style="display:inline-flex;align-items:center;gap:7px"><span style="inline-size:15px;block-size:15px;border-radius:4px;border:1px solid var(--t-border-subtle);background:${t.value}"></span><code>${esc(String(t.value))}</code></span>`,
      `<span style="display:inline-flex;align-items:center;gap:7px"><span style="inline-size:15px;block-size:15px;border-radius:4px;border:1px solid var(--t-border-subtle);background:${m.modes.dark[p]?.value ?? t.value}"></span><code>${esc(String(m.modes.dark[p]?.value ?? '—'))}</code></span>`,
      t.description ?? '']);

  let body = `<div class="prose">
    <p>Nine families plus the brand. <strong>Sky</strong> is the spine. It inverts wholesale between modes and carries every neutral surface, border and text tone. Everything else is meaning.</p>
    <div class="note"><strong>Use semantic tokens, not primitives.</strong> <code>--t-fg-default</code> resolves to Sky 800 in light and Sky 100 in dark automatically. Reaching for <code>--t-color-sky-800</code> directly pins you to one mode and breaks the other.</div>
  </div>`;

  body += S('semantic', 'Semantic tokens', `<div class="prose"><p>This is the layer product code consumes. Every token below resolves per mode.</p></div>
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Surfaces</h3>${table(['Token', 'Light', 'Dark', 'Notes'], semantic('bg.'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Foreground</h3>${table(['Token', 'Light', 'Dark', 'Notes'], semantic('fg.'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Borders</h3>${table(['Token', 'Light', 'Dark', 'Notes'], semantic('border.'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Commerce</h3>
    <div class="prose"><p>Torob-specific meaning. These are load-bearing — do not substitute a generic status colour for <code>commerce.oos</code> or <code>commerce.ad</code>.</p></div>
    ${table(['Token', 'Light', 'Dark', 'Notes'], semantic('commerce.'))}`);

  body += S('status', 'Status', `<div class="prose">
      <p>Five intents plus neutral. Each carries four roles: <code>fg</code>, <code>bg</code>, <code>border</code> and <code>solid</code>.</p>
      <div class="note note--new"><strong>Dark mode ramps are re-derived, not reused.</strong> The Sketch source shipped identical light values in both modes, which put <code>#003D01</code> green text on a <code>#15202B</code> ground — effectively invisible. Every dark ramp here is a different value, contrast-checked.</div>
    </div>
    ${table(['Token', 'Light', 'Dark', 'Notes'], semantic('status.'))}
    ${specimen({ label: 'Status in use', canvas: 'fog', html: `<span class="t-badge t-badge--positive">باز الان</span><span class="t-badge t-badge--caution">موجودی کم</span><span class="t-badge t-badge--critical">ناموجود</span><span class="t-badge t-badge--info">نمایندگی رسمی</span><span class="t-badge t-badge--guarantee">ضمانت ترب</span><span class="t-badge">کالابرگ</span>` })}`);

  body += S('primitives', 'Primitives', `<div class="prose"><p>The raw palette, extracted verbatim from <code>sharedSwatches</code> in the Sketch source. Values marked <strong>NEW</strong> were added or corrected — see the notes at the end of this page. Click any swatch to copy its variable.</p></div>
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Brand</h3>${grid(fam('brand'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Sky — the neutral spine</h3>${grid(fam('sky'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Blue</h3>${grid(fam('blue'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Red</h3>${grid(fam('red'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Green</h3>${grid(fam('green'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Yellow</h3>${grid(fam('yellow'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Purple</h3>${grid(fam('purple'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Orange</h3>${grid(fam('orange'))}
    <h3 style="font-size:15px;font-weight:700;margin-block:26px 6px">Guarantee — ضمانت ترب</h3>${grid(fam('guarantee'))}`);

  body += S('changes', 'What changed from the Sketch source', `<div class="prose">
    <p>Ten corrections. Every one is either an accessibility failure or a broken ramp — none is a taste call.</p></div>
    ${table(['Change', 'Why'], [
      ['<code>sky.600</code> added', 'Sky 500 <code>#64748B</code> measures 4.34:1 on the canvas — below AA. Secondary text now uses <code>#5E6D83</code> at 4.80:1.'],
      ['<code>red.600</code> added', 'Brand red as <em>text</em> measures 4.20:1 on the canvas. Fills, logo and map pins keep the true <code>#D73948</code>; text uses <code>#CD2A39</code>.'],
      ['<code>red.350</code>, <code>red.200</code> added', 'Brand and critical foregrounds on dark grounds both failed. Lightened and re-checked.'],
      ['<code>green.600</code> added', '<code>#4CAF50</code> measures 2.78:1 on white — below the 3:1 non-text minimum for the open-now indicator.'],
      ['<code>purple.300</code> corrected', 'The source had <code>#9333EA</code>, which is darker than <code>purple.500</code>. An inverted ramp.'],
      ['<code>guarantee.50</code> corrected', 'The source had <code>#D6F1FF</code> — cyan, off-family from the indigo 300 and 800.'],
      ['<code>orange</code>, <code>yellow.200/400</code>, <code>purple.200</code>, <code>guarantee.500</code> added', 'Orange shipped only a 500. The others had gaps that forced hardcoded one-offs.'],
      ['<code>border.control</code> split from <code>border.default</code>', 'WCAG 1.4.11 requires 3:1 for control boundaries. A decorative list divider does not need it — one token could not serve both.'],
      ['<code>border.selected</code> darkened on light', 'Blue 300 measures 2.54:1 on a card. Blue 500 keeps the blue language at 4.79:1. Dark mode keeps Blue 300.'],
      ['All dark status ramps re-derived', 'The source reused light values verbatim in dark mode.'],
    ])}
    <div class="note"><strong>Verify it yourself:</strong> <code>node build/contrast-check.mjs</code> runs 28 foreground/background pairs across both modes and exits non-zero on any AA failure. It is the gate, not a report.</div>`);

  return { body, toc, title: 'Colour', description: 'Nine families plus the brand. Sky is the spine; everything else carries meaning.', eyebrow: 'Foundations' };
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
    <p><strong>IRANYekanX</strong> carries the whole system — Persian, Latin, and both numeral sets. Three weights do the work: <strong>Medium 500</strong> is the body default, <strong>Bold 700</strong> is emphasis, <strong>ExtraBold 800</strong> is headings.</p>
    <div class="note"><strong>Medium, not Regular.</strong> The source kit sets every body style in Medium. That is correct: IRANYekanX Regular is too light for Persian at UI sizes, where the density of dots and diacritics eats the stroke.</div>
  </div>`;

  body += S('scale', 'The scale', `<div class="prose"><p>Six sizes, each with a fixed line height. The ratios run 1.67 to 1.75 — Persian-generous, and not negotiable: Persian has deep descenders and stacked diacritics that a 1.4 leading clips.</p></div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Class</th><th>Size / Leading</th><th>Weight</th><th>Was</th><th>Specimen</th></tr></thead>
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

  body += S('tone', 'Tone', `<div class="prose"><p>Colour is a separate axis from size. Compose them: <code>class="t-body-md t-tone-secondary"</code>. The four tones map onto Sky and invert with the theme.</p></div>
    ${specimen({ label: 'Tones', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<span class="t-body-lg t-tone-default">متن اصلی — قیمت و عنوان محصول</span>
<span class="t-body-lg t-tone-secondary">متن ثانویه — تعداد فروشگاه و فاصله</span>
<span class="t-body-lg t-tone-disabled">غیرفعال — گزینه در دسترس نیست</span>
<span class="t-body-lg t-tone-brand">برند — قیمت ویژه</span>` })}
    <div class="prose"><p>The <code>reverse</code> tone from the source is now <code>t-tone-inverse</code>, for text on a filled or inverse surface.</p></div>`);

  body += S('naming', 'Naming', `<div class="prose">
      <p>The source names were cryptic. <code>Tiny/TR sec</code> gives no clue that TR means "Tiny Regular", and it is not even Regular, it is Medium. The new names say the size and the role.</p>
      <p>Two generations of naming coexist in the Sketch file. The older library layer uses <code>ui / small / regular 50</code> in the pre-X IRANYekan; the newer uses <code>Tiny/TR sec</code>. Both map here.</p>
    </div>
    ${table(['New', 'Was (recent)', 'Was (legacy library)'], [
      ['<code>.t-body-sm t-tone-secondary</code>', '<span class="legacy">Tiny/TR sec</span>', '<span class="legacy">ui / small / regular 50</span>'],
      ['<code>.t-body-sm</code>', '<span class="legacy">Tiny/TR main</span>', '<span class="legacy">ui / small / regular 80</span>'],
      ['<code>.t-body-sm-strong t-tone-inverse</code>', '<span class="legacy">Tiny/TB reverse</span>', '<span class="legacy">ui / small / bold reverse</span>'],
      ['<code>.t-body-md-strong</code>', '<span class="legacy">Small/SB main</span>', '<span class="legacy">ui / normal / bold 80</span>'],
      ['<code>.t-body-lg-strong</code>', '<span class="legacy">Normal/NB main</span>', '<span class="legacy">ui / large / bold 80</span>'],
      ['<code>.t-body-lg-strong t-tone-inverse</code>', '<span class="legacy">Normal/NB reverse</span>', '<span class="legacy">ui / large / bold reverse</span>'],
      ['<code>.t-h5</code>', '<span class="legacy">Heading/H5</span>', '<span class="legacy">heading / h5</span>'],
    ])}`);

  body += S('numerals', 'Numerals and bidirectional text', `<div class="prose">
      <p>Torob shows Persian-Indic numerals (۰۱۲۳۴۵۶۷۸۹) with the ٬ thousands separator and ٫ decimal. Latin product names appear inside Persian strings constantly — <em>گوشی اپل iPhone 11</em>, so bidirectional text is the norm, not an edge case.</p>
      <ul>
        <li><strong>Always use tabular figures in lists.</strong> <code>.t-num-tabular</code>. A column of proportional prices cannot be scanned.</li>
        <li><strong>Isolate unpredictable runs</strong> with <code>.t-bidi</code> (<code>unicode-bidi: isolate</code>). User-generated store names and model numbers will otherwise reorder the sentence around them.</li>
        <li><strong>Never split a number across elements.</strong> A screen reader reads <code>&lt;span&gt;۱۵&lt;/span&gt;&lt;span&gt;٬۸۰۰&lt;/span&gt;</code> as two numbers.</li>
      </ul>
    </div>
    ${specimen({ label: 'Tabular vs proportional', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div style="display:flex;gap:34px">
  <div><div class="t-body-sm t-tone-secondary" style="margin-block-end:6px">Tabular ✓</div>
    <div class="t-body-lg-strong t-num-tabular">۱۵٬۸۰۰٬۰۰۰</div>
    <div class="t-body-lg-strong t-num-tabular">۹٬۹۹۰٬۰۰۰</div>
    <div class="t-body-lg-strong t-num-tabular">۲۳٬۵۵۰٬۰۰۰</div></div>
  <div><div class="t-body-sm t-tone-secondary" style="margin-block-end:6px">Proportional ✗</div>
    <div class="t-body-lg-strong">۱۵٬۸۰۰٬۰۰۰</div>
    <div class="t-body-lg-strong">۹٬۹۹۰٬۰۰۰</div>
    <div class="t-body-lg-strong">۲۳٬۵۵۰٬۰۰۰</div></div>
</div>` })}`);

  body += S('rules', 'Rules', guidance([
    'Set body copy in Medium 500. Regular is too light for Persian on screen.',
    'Keep the line heights as given. They are sized for Persian descenders and diacritics.',
    'Tabular figures in every list of numbers.',
    'Wrap unpredictable text runs in <code>.t-bidi</code>.',
  ], [
    'Negative letter-spacing. Persian is cursive — tightening breaks the joins between letters.',
    'Weights outside 500 / 700 / 800 in product UI. The other cuts ship, but they are not part of the system.',
    'Synthetic bold. Every weight has a real cut; browser-faked bold destroys Persian letterforms.',
    'Latin fallback fonts in the stack ahead of IRANYekanX — the numerals will not match.',
  ]));

  return { body, toc, title: 'Typography', description: 'IRANYekanX at three weights, on a Persian-generous scale.', eyebrow: 'Foundations' };
}
