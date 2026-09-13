#!/usr/bin/env node
import { buildModel } from './tokens-lib.mjs';
const m = buildModel();

const srgb = c => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
function lum(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}
// Composite an rgba() over an opaque backdrop so translucent tokens are testable.
function flatten(v, bg) {
  const rgba = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?\s*\)$/.exec(v);
  if (!rgba) return v;
  const [, r, g, b, a = '1'] = rgba;
  const bh = bg.replace('#', '');
  const B = [0, 2, 4].map(i => parseInt(bh.slice(i, i + 2), 16));
  const A = parseFloat(a);
  const mix = [r, g, b].map((c, i) => Math.round(parseFloat(c) * A + B[i] * (1 - A)));
  return '#' + mix.map(c => c.toString(16).padStart(2, '0').toUpperCase()).join('');
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const pairs = [
  // [foreground, background, minimum, label]
  ['color.on-surface', 'color.surface', 4.5, 'body on canvas'],
  ['color.on-surface', 'color.surface-raised', 4.5, 'body on card'],
  ['color.on-surface-variant', 'color.surface', 4.5, 'secondary on canvas'],
  ['color.on-surface-variant', 'color.surface-raised', 4.5, 'secondary on card'],
  ['color.brand', 'color.surface', 4.5, 'brand text on canvas'],
  ['color.brand', 'color.surface-raised', 4.5, 'brand text on card'],
  ['color.link', 'color.surface-raised', 4.5, 'link on card'],
  ['color.link', 'color.surface', 4.5, 'link on canvas'],

  // Three button families
  ['color.action.primary.fg', 'color.action.primary.bg', 4.5, 'red button label'],
  ['color.action.accent.fg', 'color.action.accent.bg', 4.5, 'blue button label'],
  ['color.action.neutral.fg', 'color.action.neutral.bg', 4.5, 'black button label'],
  ['color.action.accent.soft-fg', 'color.action.accent.soft-bg', 4.5, 'soft blue button'],
  ['color.action.neutral.ghost-fg', 'color.surface', 4.5, 'black ghost label'],
  ['color.action.primary.outline-fg', 'color.surface', 4.5, 'red outline label'],
  ['color.action.accent.outline-fg', 'color.surface', 4.5, 'blue outline label'],
  ['color.action.disabled.fg', 'color.action.disabled.bg', 4.5, 'disabled label'],
  // The tinted rim is ornament on a filled surface. The fill identifies the
  // control, so 1.4.11 does not govern the rim. Reported, not gated.
  ['color.action.primary.border', 'color.action.primary.bg', 0, 'red button rim (ornament)'],
  ['color.action.accent.border', 'color.action.accent.bg', 0, 'blue button rim (ornament)'],

  ['color.status.positive.on-container', 'color.status.positive.container', 4.5, 'positive alert'],
  ['color.status.caution.on-container', 'color.status.caution.container', 4.5, 'caution alert'],
  ['color.status.critical.on-container', 'color.status.critical.container', 4.5, 'critical alert'],
  ['color.status.info.on-container', 'color.status.info.container', 4.5, 'info alert'],
  ['color.status.guarantee.on-container', 'color.status.guarantee.container', 4.5, 'guarantee badge'],
  ['color.status.neutral.on-container', 'color.status.neutral.container', 4.5, 'neutral badge'],

  ['color.commerce.price', 'color.surface-raised', 4.5, 'price on card'],
  ['color.commerce.price-from', 'color.surface-raised', 4.5, '"from" price line'],
  ['color.commerce.oos', 'color.surface-raised', 4.5, 'out of stock'],
  ['color.commerce.open', 'color.surface-raised', 3.0, 'open-now dot (non-text)'],
  ['color.commerce.official', 'color.surface-raised', 4.5, 'official dealer'],
  ['color.on-solid', 'color.commerce.ad', 4.5, 'ad marker label'],

  ['color.outline-control', 'color.surface', 3.0, 'form-control border'],
  ['color.outline-control', 'color.surface-raised', 3.0, 'form-control border on card'],
  ['color.outline-selected', 'color.surface-raised', 3.0, 'selection ring (non-text)'],
  ['color.focus-ring', 'color.surface', 3.0, 'focus ring on canvas'],
  ['color.focus-ring', 'color.surface-raised', 3.0, 'focus ring on card'],
  // A pin is found by its fill OR its 2px white ring, whichever contrasts.
  ['color.map.poi', 'color.surface-raised', 3.0, 'map pin (fill or ring)', 'color.map.poi-ring'],
  ['color.map.label', 'color.map.label-halo', 4.5, 'map pin label on its halo'],
  ['color.map.cluster-fg', 'color.map.cluster-bg', 4.5, 'cluster count'],

  // Commerce surfaces added with the Sketch-exact components
  ['color.commerce.open-text', 'color.surface-raised', 4.5, '«باز» / near distance'],
  ['color.commerce.distance-near', 'color.surface-store-card', 4.5, 'distance on store card'],
  ['color.on-surface', 'color.surface-store-card', 4.5, 'text on store card'],
  ['color.commerce.rating-fg', 'color.commerce.rating-bg', 4.5, 'seller rating pill'],
  ['color.on-surface', 'color.commerce.perk-bg', 4.5, 'perk pill label'],
  ['color.commerce.ad-badge-fg', 'color.commerce.ad-badge', 4.5, 'آگهی badge on photo'],
  ['color.commerce.ad-badge-fg', 'color.commerce.kalabarg-bg', 4.5, 'کالابرگ badge'],
  ['color.commerce.guarantee-accent', 'color.commerce.guarantee-bg', 4.5, 'ضمانت ترب badge (yellow end)'],
  ['color.outline', 'color.surface', 0, 'decorative divider (informational)'],

  // Small commerce text sits on the grey app canvas, not on a white card —
  // the canvas is the harder of the two, so it is the one worth gating.
  ['color.commerce.price-from', 'color.surface', 4.5, '"from" price on canvas'],
  ['color.commerce.distance', 'color.surface', 4.5, 'distance on canvas'],
  ['color.commerce.closed', 'color.surface', 4.5, 'closed label on canvas'],
  ['color.commerce.oos', 'color.surface', 4.5, 'out of stock on canvas'],
  // The price pin reads as text, so 4.5 applies — in every theme, including
  // the dark ones where the pill surface is dark.
  ['color.map.pill-fg', 'color.surface-raised', 4.5, 'map price pill label'],

  // Text on a filled status surface: a toast, a step marker, a solid badge.
  ['color.status.positive.on-solid', 'color.status.positive.solid', 4.5, 'text on positive solid'],
  ['color.status.critical.on-solid', 'color.status.critical.solid', 4.5, 'text on critical solid'],
  ['color.status.caution.on-solid', 'color.status.caution.solid', 4.5, 'text on caution solid'],
  ['color.status.info.on-solid', 'color.status.info.solid', 4.5, 'text on info solid'],
];

let fails = 0, warns = 0;
for (const mode of Object.keys(m.modes)) {
  const t = { ...m.base, ...m.modes[mode] };
  const canvas = t['color.surface'].value;
  console.log(`\n${'═'.repeat(74)}\n  ${mode.toUpperCase()}\n${'═'.repeat(74)}`);
  for (const [fk, bk, min, label, alt] of pairs) {
    if (!t[fk] || !t[bk]) { console.log(`  ?  missing ${fk} / ${bk}`); continue; }
    const bg = flatten(String(t[bk].value), canvas);
    let fg = flatten(String(t[fk].value), bg);
    if (!/^#[0-9A-F]{6}$/i.test(fg) || !/^#[0-9A-F]{6}$/i.test(bg)) { console.log(`  –  ${label} (non-colour)`); continue; }
    let r = ratio(fg, bg);
    if (alt && t[alt]) { const af = flatten(String(t[alt].value), bg); const ar = ratio(af, bg); if (ar > r) { r = ar; fg = af; } }
    const ok = r >= min;
    if (!ok) { min >= 4.5 ? fails++ : warns++; }
    console.log(`  ${ok ? '✓' : '✗'}  ${r.toFixed(2).padStart(5)} : 1  (need ${min})  ${label.padEnd(28)} ${fg} on ${bg}`);
  }
}
/* Glass is not gated like a flat surface. A bar, a toast or a tooltip floats
   over content the system does not control, so the only honest test is the
   worst case at both ends: composite the translucent fill over pure white and
   over pure black, and require the label to pass against whichever is worse. */
const GLASS = [
  ['color.on-surface-inverse', 'glass.%.inverse.fill', 4.5, 'toast / tooltip label on inverse glass'],
];
console.log(`\n${'═'.repeat(74)}\n  GLASS — worst case over white and over black\n${'═'.repeat(74)}`);
for (const mode of Object.keys(m.modes)) {
  const t = { ...m.base, ...m.modes[mode] };
  for (const [fk, bkTpl, min, label] of GLASS) {
    const bk = bkTpl.replace('%', mode);
    if (!t[fk] || !t[bk]) { console.log(`  ?  missing ${fk} / ${bk}`); continue; }
    let worst = Infinity, over = '';
    for (const backdrop of ['#FFFFFF', '#000000']) {
      const bg = flatten(String(t[bk].value), backdrop);
      const fg = flatten(String(t[fk].value), bg);
      const r = ratio(fg, bg);
      if (r < worst) { worst = r; over = backdrop; }
    }
    const ok = worst >= min;
    if (!ok) fails++;
    console.log(`  ${ok ? '✓' : '✗'}  ${worst.toFixed(2).padStart(5)} : 1  (need ${min})  ${(mode + ' · ' + label).padEnd(46)} worst over ${over}`);
  }
}

console.log(`\n${fails} text failures, ${warns} non-text failures`);
process.exit(fails > 0 ? 1 : 0);
