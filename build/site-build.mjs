#!/usr/bin/env node
import { writeFileSync, mkdirSync, copyFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { nav, GROUP_FA, UI_FA } from '../source/site.nav.mjs';
import { fa2en } from '../source/i18n.mjs';
import { buildModel } from './tokens-lib.mjs';
import { colorPage, typographyPage } from './pages-foundations.mjs';
import { glassPage } from './pages-glass.mjs';
import { spacingPage, motionPage, rtlPage, responsivePage } from './pages-more.mjs';
import { iconsPage, tokensPage } from './pages-resources.mjs';
import { indexPage, aiPage, migrationPage } from './pages-index.mjs';
import { symbolsPage } from './pages-symbols.mjs';
import { simplePages } from './pages-simple.mjs';
import { patternsPages, sellerPanelPage } from './pages-patterns.mjs';
import { layout, specimen, section, table, guidance, esc, slugToPath, anchor,
         extractElement, stateMatrix, modifierMatrix, STATE_FA, dedupeIds, toFa,
         bestForSelectors } from './site-lib.mjs';
import { loadComponents } from './site-lib.mjs';
import { initFacts } from './facts.mjs';

/* What the stylesheet actually supports, read from the stylesheet.
   The matrices on every component page are drawn from this, so documentation
   cannot claim a variant the CSS does not have, or miss one it does. */
const CSS_MAP = JSON.parse(readFileSync(join(ROOT, 'source', 'generated', 'css-map.json'), 'utf8'));
/* The component's own declarations, grouped by part — a redline table that is
   read from the stylesheet instead of typed next to it. */
const SPECS = JSON.parse(readFileSync(join(ROOT, 'source', 'generated', 'specs.json'), 'utf8'));
const SIZE_MODS = ['xs', 'sm', 'md', 'lg', 'xl'];
const STATE_ORDER = ['default', 'hover', 'focus', 'active', 'selected', 'disabled', 'loading', 'error'];

/* 01-base gives every natively focusable element the focus ring, so a button
   or a link shows a focus state even when its own file says nothing about it. */
const FOCUSABLE = /^<(a|button|input|select|textarea|summary)\b/i;

/** The states this root can actually show, in a fixed order. */
function statesFor(root, sample = '') {
  const m = CSS_MAP[root];
  if (!m) return [];
  const has = new Set(m.states);
  const attrs = m.attrs.join(' ');
  const out = ['default'];
  if (has.has('hover')) out.push('hover');
  if (has.has('focus-visible') || has.has('focus-within') || FOCUSABLE.test(sample.trim())) out.push('focus');
  if (has.has('active')) out.push('active');
  if (has.has('checked') || /aria-(pressed|selected|checked)/.test(attrs)) out.push('selected');
  if (has.has('disabled')) out.push('disabled');
  if (/data-(loading|state)/.test(attrs) && /loading/.test(attrs)) out.push('loading');
  if (has.has('invalid')) out.push('error');
  return out.length > 1 ? out : [];
}

const OUT = join(ROOT, 'site');
mkdirSync(join(OUT, 'assets'), { recursive: true });
mkdirSync(join(OUT, 'components'), { recursive: true });
mkdirSync(join(OUT, 'foundations'), { recursive: true });

/* ---- assets ---- */
for (const [from, to] of [
  ['packages/css/dist/tokens.css', 'assets/tokens.css'],
  ['packages/css/dist/torob.css', 'assets/torob.css'],
  ['packages/css/src-site/site.css', 'assets/site.css'],
  ['packages/css/src-site/fonts.css', 'assets/fonts.css'],
  ['packages/site-js/site.js', 'assets/site.js'],
  ['packages/icons/sprite-16.svg', 'assets/sprite-16.svg'],
  ['packages/brand/sprite.svg', 'assets/brand.svg'],
  ['packages/brand/og.png', 'assets/og.png'],
  ['packages/icons/sprite-20.svg', 'assets/sprite-20.svg'],
  ['packages/icons/index.json', 'assets/icons-index.json'],
  ['packages/icons/icons.json', 'assets/icons.json'],
  ['packages/css/dist/tokens.resolved.json', 'assets/tokens.json'],
  ['packages/css/dist/tokens.flat.json', 'assets/tokens.flat.json'],
]) copyFileSync(join(ROOT, from), join(OUT, to));
// torob.css is bundled with an @import for tokens.css — the copy keeps that relative path valid.

/* Every token export ships with the site. The tokens page offers thirteen
   formats for download, and a download link that points outside the published
   folder is a 404 — which is what these were. */
{
  const dist = join(ROOT, 'packages', 'css', 'dist');
  const out = join(OUT, 'assets', 'tokens');
  mkdirSync(out, { recursive: true });
  for (const f of readdirSync(dist)) copyFileSync(join(dist, f), join(out, f));
}

/* Sample content for specimens (store logos, product photos). Imagery, not
   system assets: it shows the components with the Sketch file's own content.
   And the exact-frame Sketch exports the symbols page compares against. */
for (const [from, to] of [['source/samples', 'assets/samples'], ['source/sketch/ref', 'assets/sketch']]) {
  const src = join(ROOT, from), out = join(OUT, to);
  mkdirSync(out, { recursive: true });
  for (const f of readdirSync(src)) copyFileSync(join(src, f), join(out, f));
}

/* The typeface is part of the site, not a local convenience — copy it from
   the package so a clean checkout produces the same pages. */
{
  const fontsSrc = join(ROOT, 'packages', 'fonts');
  const fontsOut = join(OUT, 'assets', 'fonts');
  mkdirSync(fontsOut, { recursive: true });
  for (const f of readdirSync(fontsSrc).filter(f => f.endsWith('.woff2')))
    copyFileSync(join(fontsSrc, f), join(fontsOut, f));
}

const components = await loadComponents();
/* Numbers the prose states about the system, computed from the system. */
await initFacts();
const flatNav = nav.flatMap(g => g.items).concat(components.map(c => ({ slug: `components/${c.slug}`, title: c.name })));
const around = slug => {
  const i = flatNav.findIndex(p => p.slug === slug);
  return { prev: i > 0 ? flatNav[i - 1] : null, next: i >= 0 && i < flatNav.length - 1 ? flatNav[i + 1] : null };
};
const write = (slug, html) => {
  const p = join(OUT, slugToPath(slug));
  mkdirSync(join(p, '..'), { recursive: true });
  writeFileSync(p, html);
};

/* Legacy names: inline when few, folded when many. */
function legacyBlock(legacy) {
  if (!legacy?.length) return '';
  const chips = `<div class="legacy-list">${legacy.map(l => `<span class="legacy">${esc(l)}</span>`).join('')}</div>`;
  if (legacy.length <= 5) return chips;
  return `<details class="legacy-fold">
    <summary><svg class="legacy-fold__chev" width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg>${legacy.length} ${UI_FA.legacyFold}</summary>
    ${chips}
  </details>`;
}

/* ============================================================
   Component pages
   ============================================================ */
function componentPage(c) {
  const toc = [];
  const S = (id, title, inner) => { toc.push({ id, label: title.replace(/<[^>]+>/g, '') }); return section(id, title, inner); };
  let body = '';

  /* Header meta: status + legacy names */
  body += `<div class="prose" style="max-inline-size:none;margin-block-end:6px">
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-block-end:14px">
      <span class="status-pill status-pill--${c.status}">${c.status === 'revised' ? UI_FA.statusRevised : c.status === 'new' ? UI_FA.statusNew : UI_FA.statusStable}</span>
      <code style="font-size:12px">&lt;${c.name} /&gt;</code>
      <button class="site-tool copy-btn" data-copy-text="${esc(c.root ?? 't-' + c.slug)}">${UI_FA.copyClass}</button>
    </div>
    ${legacyBlock(c.legacy)}
  </div>`;

  /* The component before the prose about the component. A reader who came to
     see what a thing looks like should not have to scroll past an essay. */
  const [hero, ...rest] = c.specimens ?? [];
  if (hero) body += `<div class="spec-hero">${specimen({ ...hero, react: undefined })}</div>`;

  if (c.description?.length) body += `<div class="prose">${c.description.map(p => `<p>${p}</p>`).join('')}</div>`;

  if (c.use || c.avoid) body += S('usage', UI_FA.usage, guidance(c.use ?? [], c.avoid ?? []));
  if (rest.length) body += S('examples', UI_FA.examples, rest.map(s => specimen({ ...s, react: undefined })).join(''));

  /* Variants, sizes and states — rendered, not described. */
  const map = c.root ? CSS_MAP[c.root] : null;
  const allHtml = (c.specimens ?? []).map(sp => sp.html).join('\n');
  const sample = map && c.specimens?.length ? extractElement(allHtml, c.root) : null;
  /* The diagram wants the instance that shows the most of the component, which
     is rarely the first one on the page. */
  const anatomySample = c.anatomySample ?? (c.root && c.specimens?.length
    ? bestForSelectors(allHtml, c.root, (c.anatomy ?? []).map(a => a[2]).filter(Boolean)) : null);
  /* A shell or a sheet fills the page; a matrix of those is a matrix of
     screenshots, which helps nobody. Everything else gets rendered. */
  const NO_MATRIX = ['t-shell', 't-sheet', 't-modal', 't-popover'];
  if (sample && sample.length < 20000 && !NO_MATRIX.includes(c.root)) {
    const mods = (map.mods ?? []).filter(m => !/^(freeze|compact|narrow|adaptive)$/.test(m));
    const sizes = mods.filter(m => SIZE_MODS.includes(m));
    const variants = mods.filter(m => !SIZE_MODS.includes(m));
    if (variants.length > 1) body += S('variants', 'گونه‌ها',
      `<div class="prose"><p>هر گونه‌ای که استایل‌شیت تعریف می‌کند، رندرشده از همان مارک‌آپ. این فهرست از خود CSS خوانده می‌شود، پس نه چیزی جا می‌ماند و نه چیزی ادعا می‌شود که وجود ندارد.</p></div>`
      + modifierMatrix(sample, c.root, variants));
    if (sizes.length > 1) body += S('sizes', 'اندازه‌ها',
      `<div class="prose"><p>یک مقیاس، در همهٔ کامپوننت‌ها یکی.</p></div>` + modifierMatrix(sample, c.root, sizes));
    const states = statesFor(c.root, sample);
    if (states.length > 2) body += S('states', 'حالت‌ها',
      `<div class="prose"><p>هر حالت با <code>data-state</code> هم قابل اعمال است، نه فقط با اشاره‌گر؛ برای همین می‌شود آن را در مستندات، در تست تصویری و در دیف پیکسلی دید.</p></div>`
      + stateMatrix(sample, states));
  }
  if (c.anatomy?.length) {
    /* An annotated drawing beats a table of part names: the number in the
       legend sits on the part it names, and pointing at a row outlines it.
       The drawing is the live component, so it cannot go out of date. */
    const marked = c.anatomy.filter(a => a[2]);
    const legend = c.anatomy.map(([name, desc, sel], i) => {
      const n = sel ? marked.findIndex(m => m[2] === sel) + 1 : 0;
      return `<li class="anatomy__row"${sel ? ` data-part="${esc(sel)}"` : ''}>
        <span class="anatomy__num"${n ? '' : ' data-empty="true"'}>${n ? toFa(n) : '·'}</span>
        <span><strong>${esc(name)}</strong> ${desc}</span>
      </li>`;
    }).join('');
    const diagram = (marked.length && anatomySample) ? `<div class="anatomy" data-anatomy='${esc(JSON.stringify(marked.map(m => m[2])))}'>
      <div class="anatomy__stage" dir="rtl" lang="fa" inert aria-hidden="true">${dedupeIds(anatomySample, 'an')}</div>
    </div>` : '';
    body += S('anatomy', UI_FA.anatomy, diagram + `<ol class="anatomy__legend">${legend}</ol>`);
  }
  /* Specification. Every value below is the declaration the stylesheet makes
     for that part, with the token it comes from — nothing is retyped here. */
  if (c.root) {
    const blocks = (c.anatomy ?? []).map(([name, , sel]) => {
      if (!sel) return '';
      const cls = sel === ':root' ? c.root : (/^\.([a-z0-9_-]+)$/.exec(sel)?.[1]);
      const rows = cls && SPECS[cls];
      if (!rows?.length) return '';
      return `<div class="spec-table">
        <div class="spec-table__head"><strong>${esc(name)}</strong><code>${esc(sel === ':root' ? '.' + c.root : sel)}</code></div>
        ${table(['ویژگی', 'توکن', 'مقدار'], rows.map(r => [
          esc(r.fa),
          r.tokens.length ? r.tokens.map(t => `<code>${esc(t)}</code>`).join(' ') : `<code>${esc(r.value)}</code>`,
          esc(r.resolved.join(' / ') || (r.tokens.length ? '—' : r.value)),
        ]))}
      </div>`;
    }).filter(Boolean).join('');
    if (blocks) body += S('specs', 'مشخصات', `<div class="prose"><p>مقادیر زیر مستقیماً از استایل‌شیت خوانده می‌شوند، نه از یادداشتی کنار آن. هر جا توکنی هست، نام توکن آمده و مقدارش در پوستهٔ روشن.</p></div>${blocks}`);
  }

  if (c.props?.length) body += S('props', UI_FA.props, table(['پراپ', 'نوع', 'پیش‌فرض', 'توضیح'],
    c.props.map(([n, t, d, desc]) => [`<code>${esc(n)}</code>`, `<code style="color:var(--t-fg-link)">${esc(t)}</code>`, `<code>${esc(d)}</code>`, desc])));
  if (c.react) body += S('react', 'React', `<div class="spec" data-spec>
      <div class="spec__bar"><span class="spec__label">${esc(c.name)}.tsx</span>
        <div class="spec__tools"><button class="site-tool copy-btn" data-copy="react-${c.slug}">${UI_FA.copy}</button></div>
      </div>
      <pre class="code" id="react-${c.slug}"><code>${c.react.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>`);
  if (c.a11y?.length) body += S('a11y', UI_FA.a11y, `<ul class="prose" style="max-inline-size:74ch">${c.a11y.map(a => `<li>${a}</li>`).join('')}</ul>`);
  if (c.responsive) body += S('responsive', UI_FA.responsive, `<div class="prose"><p>${c.responsive}</p></div>`);

  /* Where to look next. Everything in the same group solves a neighbouring
     problem, which is the question a reader has at the end of a page. */
  const siblings = components.filter(o => o.group === c.group && o.name !== c.name).slice(0, 6);
  if (siblings.length) body += S('related', 'کامپوننت‌های مرتبط',
    `<div class="related">${siblings.map(o => `<a href="${o.slug}.html" class="related__card">
      <div class="related__name">${esc(o.name)}</div>
      <div class="related__sum">${esc(o.summary)}</div>
    </a>`).join('')}</div>`);

  const { prev, next } = around(`components/${c.slug}`);
  return layout({
    slug: `components/${c.slug}`, title: c.name, description: c.summary,
    eyebrow: GROUP_FA[c.group] ?? c.group, nav, components, body, toc, prev, next,
  });
}

for (const c of components) write(`components/${c.slug}`, componentPage(c));

/* ============================================================
   Foundations, resources and overview pages
   ============================================================ */
const model = buildModel();
const iconIndex = JSON.parse(readFileSync(join(ROOT, 'packages/icons/index.json'), 'utf8'));
const iconCats = JSON.parse(readFileSync(join(ROOT, 'packages/icons/categories.json'), 'utf8'));
const tokenCount = Object.keys(model.base).length + Object.keys(model.modes.light).length;

/* classes are derived the same way the MCP build derives them */
const BLOCK = /\bt-[a-z0-9-]+\b/g;
for (const c of components) {
  const found = new Map();
  for (const s of c.specimens ?? []) for (const m of (s.html ?? '').matchAll(BLOCK)) found.set(m[0], (found.get(m[0]) ?? 0) + 1);
  const root = [...found.keys()].find(k => k === `t-${c.slug}`) ?? [...found.keys()].sort((a, b) => found.get(b) - found.get(a))[0];
  c.classes = [root, ...[...found.keys()].filter(k => k !== root && k.startsWith(root ?? '~'))].filter(Boolean);
}

const PAGES = {
  'index': indexPage({ components, iconCount: iconIndex.length, tokenCount }),
  'ai': aiPage(components.length, iconIndex.length),
  'symbols': symbolsPage(components),
  'migration': migrationPage(components),
  'tokens': tokensPage(model),
  'icons': iconsPage(iconCats, iconIndex.length),
  'foundations/color': colorPage(model),
  'foundations/typography': typographyPage(model),
  'foundations/glass': glassPage(model),
  'foundations/spacing': spacingPage(model),
  'foundations/motion': motionPage(model),
  'foundations/rtl': rtlPage(),
  'foundations/responsive': responsivePage(model),
  ...simplePages(model),
  ...patternsPages(),
  'patterns/seller-panel': sellerPanelPage(),
};

for (const [slug, page] of Object.entries(PAGES)) {
  const { prev, next } = around(slug);
  write(slug, layout({ slug, nav, components, prev, next, ...page }));
}

/* ============================================================
   Search index
   ============================================================ */
const searchIndex = [
  ...flatNav.map(p => ({ t: p.title, u: slugToPath(p.slug), g: 'Page', k: '' })),
  ...components.map(c => ({
    t: c.name, u: `components/${c.slug}.html`, g: c.group,
    k: [c.summary, ...(c.legacy ?? [])].join(' '),
  })),
];
writeFileSync(join(OUT, 'assets', 'search.json'), JSON.stringify(searchIndex));
writeFileSync(join(OUT, 'assets', 'i18n.json'), JSON.stringify(fa2en));

/* ============================================================
   Things a public site is expected to have
   ============================================================ */
const SITE_URL = 'https://mojitorabi.github.io/TorobDesignBook';

/* A sitemap and a robots file, so the book is findable rather than merely
   published. */
const urls = [...flatNav.map(p => slugToPath(p.slug)), ...components.map(c => `components/${c.slug}.html`)];
writeFileSync(join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${SITE_URL}/${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

/* A 404 that belongs to the book, with the search and the whole nav on it —
   a wrong address is usually a nearly-right one. */
write('404', layout({
  slug: 'index', nav, components,
  title: 'این صفحه پیدا نشد',
  description: 'نشانی‌ای که دنبالش بودید در این کتاب نیست.',
  eyebrow: '۴۰۴',
  body: `<div class="prose">
    <p>شاید نامش عوض شده باشد. کامپوننت‌ها در فهرست کناری‌اند، و جست‌وجوی بالای صفحه نام‌های قدیمی اسکچ را هم می‌شناسد — <code>Store-Card/VLP</code> را بزنید و به <a href="components/store-card.html">StoreCard</a> می‌رسید.</p>
    <p><a class="t-btn t-btn--primary t-btn--md" href="index.html">بازگشت به خانه</a></p>
  </div>`,
}));

console.log(`✓ ${components.length} component pages`);
console.log(`✓ ${Object.keys(PAGES).length} foundation / resource / overview pages`);
console.log(`✓ search index: ${searchIndex.length} entries`);
export { components, nav, flatNav, around, write, OUT, layout, specimen, section, table, guidance, toc_ };
var toc_ = null;
