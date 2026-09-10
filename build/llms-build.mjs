#!/usr/bin/env node
/* Machine-readable channel #2: llms.txt + a Markdown twin of every page.
   For AI tools without MCP access. Generated from the same registry. */
import { writeFileSync, mkdirSync, readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { loadComponents } from './site-lib.mjs';
import { buildModel } from './tokens-lib.mjs';

const OUT = join(ROOT, 'site');
const components = await loadComponents();
const model = buildModel();
const guidelines = JSON.parse(readFileSync(join(ROOT, 'packages/mcp/guidelines.json'), 'utf8'));
const icons = JSON.parse(readFileSync(join(ROOT, 'packages/icons/index.json'), 'utf8'));
const strip = s => String(s ?? '').replace(/<[^>]+>/g, '');
const cssVar = p => '--t-' + p.replace(/\./g, '-');

/* ---- llms.txt: the index ---- */
const groups = {};
for (const c of components) (groups[c.group] ??= []).push(c);

const llms = `# Rahnamā — Torob Design System

> The design system for Torob and Torob Nearby, an Iranian price-comparison
> marketplace. Persian, RTL-first, mobile-first. ${components.length} components,
> ${Object.keys(model.base).length + Object.keys(model.modes.light).length} design tokens,
> ${icons.length.toLocaleString('en-US')} IBM Carbon icons.

Everything is generated from source/tokens/*.json and source/components/*.mjs.
An MCP server (packages/mcp/server.mjs) exposes all of it to coding agents —
prefer that over scraping these files when it is available.

## Non-negotiable rules
- NEVER hardcode a colour, spacing, radius or duration. Use tokens.
- NEVER write a physical direction (margin-left, padding-right, left:,
  text-align:right, border-left). This product is RTL. Logical properties only.
- NEVER use negative letter-spacing — it breaks Persian letterform joining.
- Persian numerals (۰۱۲۳۴۵۶۷۸۹) with ٬ separators in product surfaces.
- Icon-only buttons require aria-label. Touch targets >= 44px.
- At most 3 glass (backdrop-filter) surfaces per viewport; never on repeating elements.

## Foundations
- [Colour](/foundations/color.md): nine families plus brand. Sky is the neutral spine and inverts wholesale between modes.
- [Typography](/foundations/typography.md): IRANYekanX at Medium 500 / Bold 700 / ExtraBold 800. Persian-generous leading.
- [Glass](/foundations/glass.md): the signature material. Thin, not Apple-thick. 16px blur, 3-layer budget.
- [Elevation](/foundations/elevation.md): three steps, opaque surfaces only.
- [Spacing](/foundations/spacing.md): 4px grid. 12px default radius.
- [Motion](/foundations/motion.md): four durations, four curves.
- [Iconography](/foundations/iconography.md): IBM Carbon at 16 and 20px.
- [RTL & Persian](/foundations/rtl.md): logical properties, bidi isolation, icon mirroring.
- [Responsive](/foundations/responsive.md): six breakpoints; the source was 375-only.
- [Accessibility](/foundations/accessibility.md): WCAG 2.1 AA, machine-verified.
- [Content & voice](/foundations/content.md): Persian copy patterns and fixed terminology.

## Components
${Object.entries(groups).map(([g, list]) => `### ${g}\n${list.map(c =>
  `- [${c.name}](/components/${c.slug}.md): ${c.summary}${c.legacy?.length ? ` — replaces ${c.legacy.length} legacy Sketch name(s)` : ''}`).join('\n')}`).join('\n\n')}

## Resources
- [Token browser](/tokens.md)
- [Icon library](/icons.md)
- [Naming & migration](/migration.md): every legacy Sketch symbol name and what replaced it.
- [AI & MCP setup](/ai.md)
- [Full system in one file](/llms-full.txt)
`;
writeFileSync(join(OUT, 'llms.txt'), llms);

/* ---- Markdown twin of every component page ---- */
function componentMd(c) {
  const L = [`# ${c.name}`, ``, c.summary, ``, `- Group: ${c.group}`, `- Status: ${c.status}`, `- CSS: ${(c.classes ?? []).join(', ')}`];
  if (c.legacy?.length) L.push(``, `## Replaces (legacy Sketch symbols)`, ...c.legacy.map(l => `- \`${l}\``));
  if (c.description?.length) L.push(``, `## Why it is shaped this way`, ...c.description.map(d => strip(d)));
  if (c.props?.length) L.push(``, `## Props`, `| Prop | Type | Default | Description |`, `|---|---|---|---|`,
    ...c.props.map(p => `| \`${p[0]}\` | ${strip(p[1])} | \`${p[2]}\` | ${strip(p[3])} |`));
  if (c.anatomy?.length) L.push(``, `## Anatomy`, ...c.anatomy.map(a => `- **${a[0]}** — ${strip(a[1])}`));
  if (c.use?.length) L.push(``, `## Do`, ...c.use.map(u => `- ${strip(u)}`));
  if (c.avoid?.length) L.push(``, `## Don't`, ...c.avoid.map(a => `- ${strip(a)}`));
  if (c.a11y?.length) L.push(``, `## Accessibility`, ...c.a11y.map(a => `- ${strip(a)}`));
  if (c.responsive) L.push(``, `## Responsive`, strip(c.responsive));
  for (const s of c.specimens ?? []) L.push(``, `## Example — ${s.label}`, '```html', s.html, '```');
  if (c.react) L.push(``, `## React`, '```jsx', c.react, '```');
  return L.join('\n');
}
mkdirSync(join(OUT, 'components'), { recursive: true });
for (const c of components) writeFileSync(join(OUT, 'components', `${c.slug}.md`), componentMd(c));

/* ---- Markdown for foundations, from the guideline source ---- */
mkdirSync(join(OUT, 'foundations'), { recursive: true });
const FOUND_MD = {
  'glass': guidelines.glass, 'rtl': guidelines.rtl, 'motion': guidelines.motion,
  'accessibility': guidelines.accessibility, 'responsive': guidelines.responsive, 'content': guidelines.content,
};
for (const [slug, text] of Object.entries(FOUND_MD)) writeFileSync(join(OUT, 'foundations', `${slug}.md`), text);

const tokenMd = [`# Design tokens`, ``, `## Semantic (use these)`, ``,
  `| Token | Light | Dark | Note |`, `|---|---|---|---|`,
  ...Object.entries(model.modes.light).map(([p, t]) =>
    `| \`var(${cssVar(p)})\` | \`${t.value}\` | \`${model.modes.dark[p]?.value ?? '—'}\` | ${t.description ?? ''} |`),
  ``, `## Primitives (do not use directly)`, ``, `| Token | Value |`, `|---|---|`,
  ...Object.entries(model.base).map(([p, t]) => `| \`var(${cssVar(p)})\` | \`${Array.isArray(t.value) ? t.value.join(', ') : t.value}\` |`),
].join('\n');
writeFileSync(join(OUT, 'tokens.md'), tokenMd);

const migMd = [`# Naming & migration`, ``, `| Legacy Sketch name | Component | CSS class |`, `|---|---|---|`,
  ...components.flatMap(c => (c.legacy ?? []).map(l => `| \`${l}\` | ${c.name} | \`${(c.classes ?? [])[0] ?? ''}\` |`)),
].join('\n');
writeFileSync(join(OUT, 'migration.md'), migMd);

writeFileSync(join(OUT, 'icons.md'), [`# Icon library`, ``,
  `${icons.length.toLocaleString('en-US')} IBM Carbon icons at 16 and 20px.`, ``,
  `Do not invent icon names — every name below is exact.`, ``,
  ...icons.map(i => `- \`${i.n}\` (${i.c}/${i.s})${i.m ? ' — RTL mirror twin available' : ''}`)].join('\n'));

writeFileSync(join(OUT, 'index.md'), llms);

/* Every page advertises a .md twin via <link rel="alternate">, so every page
   must have one. Pages without hand-written Markdown get a generated stub
   derived from their rendered HTML. */
{
  const htmlToMd = html => html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<header class="site-bar"[\s\S]*?<\/header>/, '')
    .replace(/<nav class="site-nav"[\s\S]*?<\/nav>/, '')
    .replace(/<nav class="site-toc"[\s\S]*?<\/nav>/, '')
    .replace(/<pre class="code"[^>]*><code>([\s\S]*?)<\/code><\/pre>/g, (_, c) => '\n```\n' + c.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"') + '\n```\n')
    .replace(/<h1[^>]*>/g, '\n# ').replace(/<h2[^>]*>/g, '\n## ').replace(/<h3[^>]*>/g, '\n### ')
    .replace(/<li[^>]*>/g, '\n- ').replace(/<tr[^>]*>/g, '\n| ').replace(/<\/t[dh]>/g, ' | ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

  const walkHtml = dir => {
    for (const e of readdirSync(dir)) {
      const fp = join(dir, e);
      if (statSync(fp).isDirectory()) { if (e !== 'assets') walkHtml(fp); continue; }
      if (!e.endsWith('.html')) continue;
      const mdPath = fp.replace(/\.html$/, '.md');
      if (existsSync(mdPath)) continue;
      writeFileSync(mdPath, htmlToMd(readFileSync(fp, 'utf8')));
    }
  };
  walkHtml(OUT);
}
writeFileSync(join(OUT, 'ai.md'), `# AI & MCP setup\n\nSee packages/mcp/server.mjs. Nine tools: search_components, get_component,\nget_tokens, resolve_token, search_icons, get_icon, get_guidelines,\nvalidate_code, get_migration.\n\n${guidelines.naming}`);

/* ---- llms-full.txt: everything, one file ---- */
const full = [llms, ``, `# ═══ GUIDELINES ═══`, ...Object.entries(guidelines).map(([k, v]) => `\n## ${k}\n${v}`),
  ``, `# ═══ TOKENS ═══`, tokenMd, ``, `# ═══ COMPONENTS ═══`, ...components.map(componentMd)].join('\n');
writeFileSync(join(OUT, 'llms-full.txt'), full);

/* ---- Agent rules ---- */
const rules = `# Torob Design System — rules for AI agents

This project uses the Torob Design System (Rahnamā). An MCP server named
"torob-design" exposes it. Use it — do not guess at values.

## Before writing any UI
1. search_components(<what you are building>) — it also accepts legacy Sketch
   names like "Button / Red / Default", "Store-Card/VLP", "POI/Cluster".
2. get_component(<name>) for props, HTML and the accessibility contract.
3. get_guidelines("rtl") and get_guidelines("glass") if either is involved.

## Non-negotiable
- NEVER hardcode a colour, spacing, radius or duration. get_tokens() first.
- NEVER write a physical direction: no margin-left, padding-right, left:,
  text-align:right, border-left. Logical properties only. This product is RTL.
- NEVER use negative letter-spacing. It breaks Persian letterform joining.
- Persian numerals (۰۱۲۳۴۵۶۷۸۹) with ٬ separators in product surfaces.
- Icon-only buttons require aria-label.
- Touch targets >= 44px.
- At most 3 glass surfaces per viewport; never on repeating elements.
- Direction lives on <html dir>, never on a component.

## Before you present code
Run validate_code() on it and fix everything it reports.

## Quick reference
Surfaces   var(--t-bg-canvas) var(--t-bg-fog) var(--t-bg-subtle)
Text       var(--t-fg-default) var(--t-fg-secondary) var(--t-fg-disabled)
Borders    var(--t-border-subtle) var(--t-border-default) var(--t-border-control)
Actions    var(--t-action-primary-bg) var(--t-action-accent-bg)
Spacing    var(--t-space-1..20)   4px grid
Radius     var(--t-radius-md)     12px default
Motion     var(--t-duration-micro|standard|sheet) + var(--t-easing-out)
Glass      class="t-glass" / --list / --solid / --selected / --filters
`;
writeFileSync(join(ROOT, 'packages/mcp/AGENT_RULES.md'), rules);
writeFileSync(join(ROOT, 'CLAUDE.md'), rules);
writeFileSync(join(ROOT, '.cursorrules'), rules);

console.log(`✓ llms.txt (${(llms.length / 1024).toFixed(1)}KB) · llms-full.txt (${(full.length / 1024).toFixed(0)}KB)`);
console.log(`✓ ${components.length} component .md twins + 6 foundation + 4 resource`);
console.log(`✓ agent rules → CLAUDE.md, .cursorrules, packages/mcp/AGENT_RULES.md`);
