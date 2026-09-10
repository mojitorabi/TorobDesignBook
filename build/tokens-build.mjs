#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildModel, cssVar, fmtCssValue, ROOT } from './tokens-lib.mjs';

const OUT = join(ROOT, 'packages', 'css', 'dist');
mkdirSync(OUT, { recursive: true });
const m = buildModel();

/* GATE: every theme must define the same keys. A theme that silently inherits
   another theme's value is how #003D01 green ended up on a #15202B ground. */
{
  const keys = Object.fromEntries(Object.entries(m.modes).map(([k, v]) => [k, new Set(Object.keys(v))]));
  const names = Object.keys(keys);
  const union = new Set(names.flatMap(n => [...keys[n]]));
  const gaps = [];
  for (const k of union) for (const n of names) if (!keys[n].has(k)) gaps.push(`${n} is missing ${k}`);
  if (gaps.length) {
    console.error(`✗ theme key mismatch (${gaps.length}):`);
    for (const g of gaps.slice(0, 20)) console.error('   ' + g);
    process.exit(1);
  }
}
const written = [];
const w = (name, body) => { writeFileSync(join(OUT, name), body); written.push(name); };

const HEAD = `/* Torob Design System — generated from source/tokens/*.json. Do not edit by hand. */\n`;
const decl = (path, t) => `  ${cssVar(path)}: ${fmtCssValue(t)};`;

/* ---------- 1. CSS custom properties ----------
   Three themes. Light is the default. `dim` is the soft navy-slate extracted
   from Sketch; `dark` is true black for OLED. prefers-color-scheme: dark maps
   to `dim`, because that is the gentler default — a reader who wants true
   black opts into it. */
{
  const base = Object.entries(m.base).map(([p, t]) => decl(p, t)).join('\n');
  const modeBlock = mode => Object.entries(m.modes[mode]).map(([p, t]) => decl(p, t)).join('\n');
  const indent = txt => txt.split('\n').map(l => '  ' + l).join('\n');

  w('tokens.css', `${HEAD}
:root {
  color-scheme: light dark;

  /* ---- primitives, material and scale (theme-independent) ---- */
${base}

  /* ---- semantic: light (default) ---- */
${modeBlock('light')}
}

/* Explicit choice wins in both directions. */
:root[data-theme="dim"] {
${modeBlock('dim')}
}

:root[data-theme="dark"] {
${modeBlock('dark')}
}

/* System preference maps to dim, unless the reader pinned a theme. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${indent(indent(modeBlock('dim')))}
  }
}

/* Glass degrades to an opaque surface where backdrop-filter is unavailable
   or the reader has asked for less transparency. */
@media (prefers-reduced-transparency: reduce) {
  :root { --t-glass-blur: 0px; }
}
`);
}

/* ---------- 2. SCSS ---------- */
{
  const lines = [
    ...Object.entries(m.base).map(([p, t]) => `$t-${p.replace(/\./g, '-')}: ${fmtCssValue(t)};`),
    '',
    '// semantic — light is the default export; use the CSS custom properties for runtime theming',
    ...Object.entries(m.modes.light).map(([p, t]) => `$t-${p.replace(/\./g, '-')}: ${fmtCssValue(t)};`),
  ];
  w('tokens.scss', `// Torob Design System — generated. Do not edit.\n${lines.join('\n')}\n`);
}

/* ---------- 3. Tailwind v4 @theme ---------- */
{
  const pick = (obj, pre) => Object.entries(obj).filter(([p]) => p.startsWith(pre));
  const l = m.modes.light;
  const out = [];
  for (const [p, t] of pick(m.base, 'color.')) out.push(`  --color-${p.slice(6).replace(/\./g, '-')}: ${fmtCssValue(t)};`);
  for (const grp of ['bg.', 'fg.', 'border.', 'action.', 'status.', 'commerce.', 'map.'])
    for (const [p, t] of pick(l, grp)) out.push(`  --color-${p.replace(/\./g, '-')}: var(${cssVar(p)});`);
  for (const [p, t] of pick(m.base, 'space.')) out.push(`  --spacing-${p.slice(6)}: ${fmtCssValue(t)};`);
  for (const [p, t] of pick(m.base, 'radius.')) out.push(`  --radius-${p.slice(7)}: ${fmtCssValue(t)};`);
  for (const [p, t] of pick(m.base, 'font.size.')) out.push(`  --text-${p.slice(10)}: ${fmtCssValue(t)};`);
  for (const [p, t] of pick(m.base, 'font.weight.')) out.push(`  --font-weight-${p.slice(12)}: ${fmtCssValue(t)};`);
  for (const [p, t] of pick(m.base, 'font.family.')) out.push(`  --font-${p.slice(12)}: ${fmtCssValue(t)};`);
  for (const [p, t] of pick(m.base, 'breakpoint.')) out.push(`  --breakpoint-${p.slice(11)}: ${fmtCssValue(t)};`);
  for (const [p, t] of pick(m.base, 'duration.')) out.push(`  --t-duration-${p.slice(9)}: ${fmtCssValue(t)};`);
  w('tokens.tailwind.css', `${HEAD}@import "./tokens.css";\n\n@theme inline {\n${out.join('\n')}\n}\n`);
}

/* ---------- 4. TypeScript / JS ---------- */
{
  const nest = (flat) => {
    const root = {};
    for (const [p, t] of Object.entries(flat)) {
      const parts = p.split('.');
      let cur = root;
      for (const k of parts.slice(0, -1)) cur = (cur[k] ??= {});
      cur[parts.at(-1)] = t.value;
    }
    return root;
  };
  const body = {
    ...nest(m.base),
    light: nest(m.modes.light),
    dim: nest(m.modes.dim),
    dark: nest(m.modes.dark),
  };
  w('tokens.ts', `// Torob Design System — generated. Do not edit.\nexport const tokens = ${JSON.stringify(body, null, 2)} as const;\nexport type TorobTokens = typeof tokens;\nexport default tokens;\n`);
  w('tokens.js', `// Torob Design System — generated. Do not edit.\nexport const tokens = ${JSON.stringify(body, null, 2)};\nexport default tokens;\n`);
}

/* ---------- 5. Flat JSON (designers, third-party tooling) ---------- */
{
  const flat = {};
  for (const [p, t] of Object.entries(m.base)) flat[cssVar(p)] = fmtCssValue(t);
  const withMode = { base: flat, light: {}, dim: {}, dark: {} };
  for (const mode of ['light', 'dim', 'dark'])
    for (const [p, t] of Object.entries(m.modes[mode])) withMode[mode][cssVar(p)] = fmtCssValue(t);
  w('tokens.flat.json', JSON.stringify(withMode, null, 2));
}

/* ---------- 6. Resolved model for the MCP server + docs site ---------- */
{
  w('tokens.resolved.json', JSON.stringify(m, null, 2));
}

/* ---------- 7. iOS Swift ---------- */
{
  const hex = v => /^#([0-9A-Fa-f]{6})$/.test(v);
  const swiftColor = v => {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(v.slice(i, i + 2), 16) / 255);
    return `Color(red: ${r.toFixed(4)}, green: ${g.toFixed(4)}, blue: ${b.toFixed(4)})`;
  };
  const camel = p => p.split(/[.\-]/).map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join('').replace(/^(\d)/, '_$1');
  const colors = Object.entries(m.modes.light).filter(([, t]) => hex(String(t.value)));
  const darks = Object.fromEntries(Object.entries(m.modes.dim).filter(([, t]) => hex(String(t.value))));
  const dims = Object.entries(m.base).filter(([, t]) => t.type === 'dimension' && /^[\d.]+px$/.test(String(t.value)));
  w('TorobTokens.swift', `// Torob Design System — generated. Do not edit.\nimport SwiftUI\n\npublic enum TorobColor {\n${colors.map(([p, t]) => `    public static func ${camel(p)}(_ dark: Bool = false) -> Color { dark ? ${darks[p] ? swiftColor(darks[p].value) : swiftColor(t.value)} : ${swiftColor(t.value)} }`).join('\n')}\n}\n\npublic enum TorobSpace {\n${dims.map(([p, t]) => `    public static let ${camel(p)}: CGFloat = ${parseFloat(t.value)}`).join('\n')}\n}\n`);
}

/* ---------- 8. Android XML + Compose ---------- */
{
  const hex = v => /^#([0-9A-Fa-f]{6})$/.test(String(v));
  const snake = p => p.replace(/[.\-]/g, '_');
  const row = (obj) => Object.entries(obj).filter(([, t]) => hex(t.value)).map(([p, t]) => `    <color name="t_${snake(p)}">${t.value}</color>`).join('\n');
  w('colors.xml', `<?xml version="1.0" encoding="utf-8"?>\n<!-- Torob Design System — generated. Do not edit. -->\n<resources>\n${row(m.base)}\n${row(m.modes.light)}\n</resources>\n`);
  w('colors-night.xml', `<?xml version="1.0" encoding="utf-8"?>\n<!-- values-night/colors.xml — generated. Do not edit. -->\n<resources>\n${row(m.modes.dim)}\n</resources>\n`);
  w('colors-night-true.xml', `<?xml version="1.0" encoding="utf-8"?>\n<!-- values-night-true/colors.xml (true dark) — generated. Do not edit. -->\n<resources>\n${row(m.modes.dark)}\n</resources>\n`);
  const dims = Object.entries(m.base).filter(([, t]) => t.type === 'dimension' && /^[\d.]+px$/.test(String(t.value)));
  w('dimens.xml', `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${dims.map(([p, t]) => `    <dimen name="t_${snake(p)}">${parseFloat(t.value)}dp</dimen>`).join('\n')}\n</resources>\n`);
}

/* ---------- 9. llms.txt fragment for token discovery ---------- */
{
  const lines = ['# Torob Design System — tokens', '', '## Semantic tokens (use these)'];
  for (const [p, t] of Object.entries(m.modes.light))
    lines.push(`- \`var(${cssVar(p)})\` — light \`${fmtCssValue(t)}\` / dim \`${fmtCssValue(m.modes.dim[p] ?? t)}\` / dark \`${fmtCssValue(m.modes.dark[p] ?? t)}\`${t.description ? ` — ${t.description}` : ''}`);
  lines.push('', '## Primitives (do not use directly)');
  for (const [p, t] of Object.entries(m.base)) lines.push(`- \`var(${cssVar(p)})\` = \`${fmtCssValue(t)}\``);
  w('tokens.llms.md', lines.join('\n') + '\n');
}

console.log(`✓ ${written.length} token artefacts → packages/css/dist/`);
for (const f of written) console.log('   ' + f);
