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
import { layout, specimen, section, table, guidance, esc, slugToPath, anchor } from './site-lib.mjs';
import { loadComponents } from './site-lib.mjs';

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
  ['packages/icons/sprite-20.svg', 'assets/sprite-20.svg'],
  ['packages/icons/index.json', 'assets/icons-index.json'],
  ['packages/icons/icons.json', 'assets/icons.json'],
  ['packages/css/dist/tokens.resolved.json', 'assets/tokens.json'],
  ['packages/css/dist/tokens.flat.json', 'assets/tokens.flat.json'],
]) copyFileSync(join(ROOT, from), join(OUT, to));
// torob.css is bundled with an @import for tokens.css — the copy keeps that relative path valid.

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
      <button class="site-tool copy-btn" data-copy-text="${esc(c.classes ? c.classes[0] : 't-' + c.slug)}">${UI_FA.copyClass}</button>
    </div>
    ${legacyBlock(c.legacy)}
  </div>`;

  if (c.description?.length) body += `<div class="prose">${c.description.map(p => `<p>${p}</p>`).join('')}</div>`;

  if (c.specimens?.length) {
    body += S('examples', UI_FA.examples,
      c.specimens.map(s => specimen({ ...s, react: undefined })).join(''));
  }
  if (c.use || c.avoid) body += S('usage', UI_FA.usage, guidance(c.use ?? [], c.avoid ?? []));
  if (c.anatomy?.length) body += S('anatomy', UI_FA.anatomy, table(['بخش', 'توضیح'], c.anatomy.map(([a, b]) => [`<strong>${esc(a)}</strong>`, b])));
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

console.log(`✓ ${components.length} component pages`);
console.log(`✓ ${Object.keys(PAGES).length} foundation / resource / overview pages`);
console.log(`✓ search index: ${searchIndex.length} entries`);
export { components, nav, flatNav, around, write, OUT, layout, specimen, section, table, guidance, toc_ };
var toc_ = null;
