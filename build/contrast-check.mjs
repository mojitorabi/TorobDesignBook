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
  ['fg.default', 'bg.canvas', 4.5, 'body on canvas'],
  ['fg.default', 'bg.fog', 4.5, 'body on card'],
  ['fg.secondary', 'bg.canvas', 4.5, 'secondary on canvas'],
  ['fg.secondary', 'bg.fog', 4.5, 'secondary on card'],
  ['fg.brand', 'bg.canvas', 4.5, 'brand text on canvas'],
  ['fg.link', 'bg.fog', 4.5, 'link on card'],
  ['action.primary.fg', 'action.primary.bg', 4.5, 'primary button label'],
  ['action.accent.fg', 'action.accent.bg', 4.5, 'accent button label'],
  ['action.neutral.fg', 'action.neutral.bg', 4.5, 'neutral button label'],
  ['action.accent.soft-fg', 'action.accent.soft-bg', 4.5, 'soft accent button'],
  ['action.neutral.ghost-fg', 'bg.canvas', 4.5, 'ghost button label'],
  ['status.positive.fg', 'status.positive.bg', 4.5, 'positive alert'],
  ['status.caution.fg', 'status.caution.bg', 4.5, 'caution alert'],
  ['status.critical.fg', 'status.critical.bg', 4.5, 'critical alert'],
  ['status.info.fg', 'status.info.bg', 4.5, 'info alert'],
  ['status.guarantee.fg', 'status.guarantee.bg', 4.5, 'guarantee badge'],
  ['status.neutral.fg', 'status.neutral.bg', 4.5, 'neutral badge'],
  ['commerce.price', 'bg.fog', 4.5, 'price on card'],
  ['commerce.price-from', 'bg.fog', 4.5, '"from" price line'],
  ['commerce.oos', 'bg.fog', 4.5, 'out of stock'],
  ['commerce.open', 'bg.fog', 3.0, 'open-now dot (non-text)'],
  ['commerce.official', 'bg.fog', 4.5, 'official dealer'],
  ['border.control', 'bg.canvas', 3.0, 'form-control border'],
  ['border.control', 'bg.fog', 3.0, 'form-control border on card'],
  ['border.default', 'bg.canvas', 0, 'decorative divider (informational)'],
  ['border.selected', 'bg.fog', 3.0, 'selection ring (non-text)'],
  ['border.focus', 'bg.canvas', 3.0, 'focus ring (non-text)'],
  ['map.poi', 'bg.fog', 3.0, 'map pin (non-text)'],
];

let fails = 0, warns = 0;
for (const mode of ['light', 'dark']) {
  const t = { ...m.base, ...m.modes[mode] };
  const canvas = t['bg.canvas'].value;
  console.log(`\n${'═'.repeat(74)}\n  ${mode.toUpperCase()}\n${'═'.repeat(74)}`);
  for (const [fk, bk, min, label] of pairs) {
    if (!t[fk] || !t[bk]) { console.log(`  ?  missing ${fk} / ${bk}`); continue; }
    const bg = flatten(String(t[bk].value), canvas);
    const fg = flatten(String(t[fk].value), bg);
    if (!/^#[0-9A-F]{6}$/i.test(fg) || !/^#[0-9A-F]{6}$/i.test(bg)) { console.log(`  –  ${label} (non-colour)`); continue; }
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) { min >= 4.5 ? fails++ : warns++; }
    console.log(`  ${ok ? '✓' : '✗'}  ${r.toFixed(2).padStart(5)} : 1  (need ${min})  ${label.padEnd(28)} ${fg} on ${bg}`);
  }
}
console.log(`\n${fails} text failures, ${warns} non-text failures`);
process.exit(fails > 0 ? 1 : 0);
