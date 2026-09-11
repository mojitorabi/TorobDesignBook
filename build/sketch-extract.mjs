#!/usr/bin/env node
/* Read the Sketch library and emit two checked-in artefacts:

     source/sketch/symbols.json   every symbolMaster on the Components page,
                                  with its measured frame, radii, fills,
                                  borders, shadows and text styles.
     packages/brand/*.svg         the brand and social marks as real vector
                                  geometry, converted from Sketch curve points.

   The .sketch file is the source of truth for WHAT exists and HOW BIG it is.
   Running this is a local step: the JSON and the SVGs are committed, so the
   site build (and CI) never needs to open a .sketch file.

   Usage:  node build/sketch-extract.mjs                                     */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const SKETCH = join(ROOT, 'Torob Tokens.sketch');
const COMPONENTS_PAGE = 'Components';

/* ── zip access ─────────────────────────────────────────────────────────── */
const entries = execFileSync('unzip', ['-Z1', SKETCH], { encoding: 'utf8', maxBuffer: 1 << 26 })
  .split('\n').filter(Boolean);
const readEntry = name =>
  JSON.parse(execFileSync('unzip', ['-p', SKETCH, name], { encoding: 'utf8', maxBuffer: 1 << 28 }));

/* ── geometry ───────────────────────────────────────────────────────────── */
const r3 = n => Math.round(n * 1000) / 1000;
const pt = s => { const [x, y] = String(s).replace(/[{}\s]/g, '').split(','); return [Number(x), Number(y)]; };

/* Sketch stores curve points normalised to the layer frame. Every edge is a
   cubic: control 1 is the previous point's curveFrom, control 2 is the next
   point's curveTo. Where a point has neither, the edge is a straight line. */
function pathData(layer) {
  const { x, y, width: w, height: h } = layer.frame;
  const abs = s => { const [px, py] = pt(s); return [r3(x + px * w), r3(y + py * h)]; };
  const pts = layer.points ?? [];
  if (!pts.length) return '';
  const P = pts.map(p => ({
    p: abs(p.point),
    from: p.hasCurveFrom ? abs(p.curveFrom) : null,
    to: p.hasCurveTo ? abs(p.curveTo) : null,
  }));
  let d = `M${P[0].p[0]},${P[0].p[1]}`;
  const edge = (a, b) => (a.from || b.to)
    ? `C${(a.from ?? a.p).join(',')} ${(b.to ?? b.p).join(',')} ${b.p.join(',')}`
    : `L${b.p.join(',')}`;
  for (let i = 1; i < P.length; i++) d += edge(P[i - 1], P[i]);
  if (layer.isClosed !== false) d += edge(P[P.length - 1], P[0]) + 'Z';
  return d;
}

/* Corner radius lives in three places and only one of them is authoritative.

   style.corners.radii   what Sketch draws on a frame (artboard, symbol, group)
   points[].cornerRadius what Sketch draws on a shape
   fixedRadius           a LEGACY mirror, often stale

   Reading fixedRadius first is how you conclude the kit is built on 8px
   corners. It isn't: measured against Sketch's own renderer, the controls are
   12 and the buy box is 16. Order matters here. */
function radiusOf(layer) {
  const c = layer.style?.corners;
  if (c?.radii?.some(v => v)) return [...new Set(c.radii)];
  const pr = [...new Set((layer.points ?? []).map(p => p.cornerRadius ?? 0))].filter(Boolean);
  if (pr.length) return pr;
  return layer.fixedRadius ? [layer.fixedRadius] : [];
}
function rectOf(layer) {
  const { x, y, width, height } = layer.frame;
  const rr = radiusOf(layer);
  const r = rr.length === 1 ? rr[0] : 0;
  return { x: r3(x), y: r3(y), width: r3(width), height: r3(height), r: r3(Math.min(r, width / 2, height / 2)) };
}

/* ── colour ─────────────────────────────────────────────────────────────── */
const hex = c => '#' + [c.red, c.green, c.blue].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const rgba = c => c.alpha >= 0.999 ? hex(c) : `rgba(${[c.red, c.green, c.blue].map(v => Math.round(v * 255)).join(',')},${r3(c.alpha)})`;
const POSITION = ['center', 'inside', 'outside'];

function styleOf(layer) {
  const st = layer.style ?? {};
  const on = a => (a ?? []).filter(x => x.isEnabled !== false);
  const out = {};
  const fills = on(st.fills).map(f => f.fillType === 1 && f.gradient
    ? { type: 'gradient', from: pt(f.gradient.from), to: pt(f.gradient.to), stops: f.gradient.stops.map(s => ({ color: rgba(s.color), at: r3(s.position) })) }
    : { type: 'solid', color: rgba(f.color) });
  if (fills.length) out.fills = fills;
  const borders = on(st.borders).map(b => ({ color: rgba(b.color), width: b.thickness, position: POSITION[b.position] ?? b.position }));
  if (borders.length) out.borders = borders;
  const shadows = on(st.shadows).map(s => ({ color: rgba(s.color), x: s.offsetX, y: s.offsetY, blur: s.blurRadius, spread: s.spread }));
  if (shadows.length) out.shadows = shadows;
  const o = st.contextSettings?.opacity;
  if (o != null && o < 1) out.opacity = r3(o);
  return out;
}

function textOf(layer) {
  const a = layer.style?.textStyle?.encodedAttributes ?? {};
  const f = a.MSAttributedStringFontAttribute?.attributes ?? {};
  return {
    text: layer.attributedString?.string ?? '',
    font: f.name ?? null,
    size: f.size ?? null,
    color: a.MSAttributedStringColorAttribute ? rgba(a.MSAttributedStringColorAttribute) : null,
    lineHeight: a.paragraphStyle?.maximumLineHeight ?? null,
    kerning: a.kerning ?? 0,
    align: ['left', 'right', 'center', 'justified'][a.paragraphStyle?.alignment ?? 0] ?? 'left',
  };
}

/* ── walk a master into a spec ──────────────────────────────────────────── */
function specOf(master) {
  const texts = [], icons = [], inner = [];
  (function walk(l, depth) {
    if (l !== master) {
      if (l._class === 'text') texts.push({ ...textOf(l), depth });
      if (l._class === 'symbolInstance') icons.push({ name: l.__symbolName ?? l.name, size: r3(l.frame.width) });
      const rr = radiusOf(l);
      if (rr.length) inner.push({ name: l.name, radius: rr.length === 1 ? rr[0] : rr, w: r3(l.frame.width), h: r3(l.frame.height) });
    }
    (l.layers ?? []).forEach(c => walk(c, depth + 1));
  })(master, 0);

  /* The frame's own radius, else the radius of a background shape that fills
     the frame — a button drawn as "frame + bg rect" must read the same as one
     drawn as a styled frame. */
  const frameR = radiusOf(master);
  const bg = inner.find(i => i.w === r3(master.frame.width) && i.h === r3(master.frame.height));
  const radius = frameR.length === 1 ? frameR[0] : (typeof bg?.radius === 'number' ? bg.radius : 0);

  const pad = { top: master.topPadding ?? 0, end: master.leftPadding ?? 0, bottom: master.bottomPadding ?? 0, start: master.rightPadding ?? 0 };
  const hasPad = Object.values(pad).some(Boolean);

  return {
    name: master.name,
    width: r3(master.frame.width),
    height: r3(master.frame.height),
    radius,
    /* Sketch smooths its corners (a squircle, not an arc). CSS has no
       portable equivalent yet, so this is recorded, not reproduced. */
    cornerSmoothing: master.style?.corners?.smoothing ?? null,
    /* Smart Layout padding, in logical terms: the file is RTL, so Sketch's
       right padding is the inline START. */
    padding: hasPad ? pad : null,
    style: styleOf(master),
    text: texts,
    icons,
    inner,
  };
}

/* ── load ───────────────────────────────────────────────────────────────── */
const doc = readEntry('document.json');
const pageRefs = (doc.pages ?? []).map(p => p._ref + '.json').filter(f => entries.includes(f));
const pages = pageRefs.map(readEntry);
const symbolNames = new Map();
for (const p of pages) (function w(ls) { for (const l of ls ?? []) { if (l._class === 'symbolMaster') symbolNames.set(l.symbolID, l.name); w(l.layers); } })(p.layers);
/* resolve instance names so the spec says "chevron--up", not a UUID */
for (const p of pages) (function w(ls) { for (const l of ls ?? []) { if (l._class === 'symbolInstance') l.__symbolName = symbolNames.get(l.symbolID) ?? null; w(l.layers); } })(p.layers);

const page = pages.find(p => p.name === COMPONENTS_PAGE);
if (!page) throw new Error(`no "${COMPONENTS_PAGE}" page in ${SKETCH}`);
const masters = (page.layers ?? []).filter(l => l._class === 'symbolMaster');

/* Duplicate masters (same name, different id) are a known defect in the
   source file. Keep the first and count the rest. */
const unique = new Map();
const duplicates = [];
for (const m of masters) {
  if (unique.has(m.name)) { duplicates.push(m.name); continue; }
  unique.set(m.name, specOf(m));
}

mkdirSync(join(ROOT, 'source', 'sketch'), { recursive: true });
writeFileSync(join(ROOT, 'source', 'sketch', 'symbols.json'), JSON.stringify({
  $generatedBy: 'build/sketch-extract.mjs',
  $source: 'Torob Tokens.sketch · page "Components"',
  masters: masters.length,
  unique: unique.size,
  duplicateNames: [...new Set(duplicates)].sort(),
  symbols: [...unique.values()].sort((a, b) => a.name.localeCompare(b.name, 'en')),
}, null, 2) + '\n');

/* ── brand + social marks as SVG ────────────────────────────────────────── */
const BRAND_OUT = join(ROOT, 'packages', 'brand');
mkdirSync(BRAND_OUT, { recursive: true });
const find = name => {
  for (const m of masters) if (m.name === name) return m;
  throw new Error('symbol not found: ' + name);
};
const flatPaths = (layer, inheritFill) => {
  const out = [];
  (function walk(l, fill) {
    const st = styleOf(l);
    const f = st.fills?.[0]?.type === 'solid' ? st.fills[0].color : fill;
    if (l._class === 'shapePath' || l._class === 'rectangle' || l._class === 'oval' || l._class === 'polygon' || l._class === 'star') {
      const d = pathData(l);
      if (d) out.push({ d, fill: f, name: l.name });
    }
    (l.layers ?? []).forEach(c => walk(c, f));
  })(layer, inheritFill);
  return out;
};
const svg = (size, inner, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img">${extra}${inner}</svg>\n`;

const brand = {};

/* Torob wordmark / leaf logo — four solid paths, no boolean ops. */
{
  const m = find('Torob_Logo');
  const paths = flatPaths(m, '#000000');
  brand.logo = { size: 32, paths: paths.map(p => ({ d: p.d, fill: p.fill, name: p.name })) };
  writeFileSync(join(BRAND_OUT, 'torob-logo.svg'),
    svg(32, paths.map(p => `<path fill="${p.fill}" d="${p.d}"/>`).join('')));
}

/* The guarantee mark: indigo star, a wave field clipped to the star, and the
   logo filled with the holographic ramp. */
{
  const m = find('Torob star hologram');
  const star = m.layers.find(l => l.name === 'Star');
  const wavy = m.layers.find(l => l.name === 'wavy pattern');
  const logoGroup = m.layers.find(l => l.name === 'torob logo');
  const starD = pathData(star);
  const waveFill = styleOf(wavy).fills[0];
  const logoShape = (logoGroup.layers ?? []).find(l => l._class === 'shapeGroup');
  const logoFill = styleOf(logoShape).fills[0];
  /* wave tiles live two groups down and are positioned relative to them */
  const mask = (wavy.layers ?? []).find(l => l.name === 'Mask');
  const ox = wavy.frame.x + mask.frame.x, oy = wavy.frame.y + mask.frame.y;
  const waves = (mask.layers ?? []).filter(l => l._class === 'shapePath')
    .map(l => pathData({ ...l, frame: { ...l.frame, x: l.frame.x + ox, y: l.frame.y + oy } }));
  const lx = logoGroup.frame.x + logoShape.frame.x, ly = logoGroup.frame.y + logoShape.frame.y;
  const logoPaths = (logoShape.layers ?? []).map(l =>
    pathData({ ...l, frame: { ...l.frame, x: l.frame.x + lx, y: l.frame.y + ly } }));
  const grad = (id, g, box) => {
    const [x1, y1] = g.from, [x2, y2] = g.to;
    return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse"`
      + ` x1="${r3(box.x + x1 * box.width)}" y1="${r3(box.y + y1 * box.height)}"`
      + ` x2="${r3(box.x + x2 * box.width)}" y2="${r3(box.y + y2 * box.height)}">`
      + g.stops.map(s => `<stop offset="${s.at}" stop-color="${s.color}"/>`).join('') + `</linearGradient>`;
  };
  const defs = `<defs>`
    + `<clipPath id="tg-star"><path d="${starD}"/></clipPath>`
    + grad('tg-wave', waveFill, wavy.frame)
    + grad('tg-holo', logoFill, { x: lx, y: ly, width: logoShape.frame.width, height: logoShape.frame.height })
    + `</defs>`;
  const inner = `<path fill="${styleOf(star).fills[0].color}" d="${starD}"/>`
    + `<g clip-path="url(#tg-star)" fill="url(#tg-wave)">${waves.map(d => `<path d="${d}"/>`).join('')}</g>`
    + `<g fill="url(#tg-holo)">${logoPaths.map(d => `<path d="${d}"/>`).join('')}</g>`;
  writeFileSync(join(BRAND_OUT, 'torob-guarantee.svg'), svg(200, inner, defs));
  brand.guarantee = { size: 200, star: starD, waves, logo: logoPaths };
}

/* Social marks.

   A Sketch shapeGroup is ONE path, not a stack of them: its children are
   subpaths and the group's windingRule decides which enclosed regions are
   holes. Drawing the children separately fills the holes in — which is how
   the WhatsApp handset and the Bale glyph disappear. So a shapeGroup is
   flattened into a single <path> carrying the group's own fill. */
const WINDING = ['nonzero', 'evenodd'];
function emit(layer, inheritFill, ctx) {
  const st = styleOf(layer);
  let fill = inheritFill;
  const g = st.fills?.find(x => x.type === 'gradient');
  if (g) {
    const id = `${ctx.prefix}-g${ctx.n++}`, b = layer.frame;
    const [x1, y1] = g.from, [x2, y2] = g.to;
    ctx.defs += `<linearGradient id="${id}" gradientUnits="userSpaceOnUse"`
      + ` x1="${r3(b.x + x1 * b.width)}" y1="${r3(b.y + y1 * b.height)}"`
      + ` x2="${r3(b.x + x2 * b.width)}" y2="${r3(b.y + y2 * b.height)}">`
      + g.stops.map(s => `<stop offset="${s.at}" stop-color="${s.color}"/>`).join('') + `</linearGradient>`;
    fill = `url(#${id})`;
  } else if (st.fills?.[0]?.type === 'solid') fill = st.fills[0].color;

  if (layer._class === 'shapeGroup') {
    /* every descendant outline becomes a subpath of one combined shape */
    const subs = [];
    (function collect(l, dx, dy) {
      for (const c of l.layers ?? []) {
        if (c.layers?.length) collect(c, dx + c.frame.x, dy + c.frame.y);
        else {
          const d = pathData({ ...c, frame: { ...c.frame, x: c.frame.x + dx, y: c.frame.y + dy } });
          if (d) subs.push(d);
        }
      }
    })(layer, layer.frame.x, layer.frame.y);
    if (!subs.length) return '';
    const rule = WINDING[layer.windingRule ?? 0] ?? 'nonzero';
    return `<path fill="${fill}" fill-rule="${rule}" d="${subs.join('')}"/>`;
  }

  if (layer._class === 'rectangle' && rectOf(layer).r) {
    const r = rectOf(layer);
    return `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" rx="${r.r}" fill="${fill}"/>`;
  }

  if (layer._class === 'group' || layer._class === 'symbolMaster') {
    return (layer.layers ?? []).map(c => emit(
      { ...c, frame: { ...c.frame, x: c.frame.x + (layer._class === 'group' ? layer.frame.x : 0), y: c.frame.y + (layer._class === 'group' ? layer.frame.y : 0) } },
      fill, ctx)).join('');
  }

  const d = pathData(layer);
  return d ? `<path fill="${fill}" d="${d}"/>` : '';
}

for (const [file, name] of [['bale', 'Social-Icons/Bale'], ['telegram', 'Social-Icons/Telegram'], ['whatsapp', 'Social-Icons/Whatsapp']]) {
  const m = find(name);
  const ctx = { prefix: file, n: 0, defs: '' };
  const inner = emit({ ...m, frame: { ...m.frame, x: 0, y: 0 } }, 'currentColor', ctx);
  writeFileSync(join(BRAND_OUT, `${file}.svg`), svg(24, inner, ctx.defs ? `<defs>${ctx.defs}</defs>` : ''));
  brand[file] = { size: 24 };
}

/* One sprite so a product surface can <use> a mark instead of inlining an
   11KB holographic star on every card. */
const SPRITE = [];
for (const [id, size] of [['torob-logo', 32], ['torob-guarantee', 200], ['bale', 24], ['telegram', 24], ['whatsapp', 24]]) {
  const file = readFileSync(join(BRAND_OUT, `${id}.svg`), 'utf8');
  const inner = file.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  /* ids inside a sprite share one document, so namespace the gradient ids */
  const scoped = inner.replace(/id="([^"]+)"/g, `id="b-${id}-$1"`).replace(/url\(#([^)]+)\)/g, `url(#b-${id}-$1)`);
  SPRITE.push(`<symbol id="${id}" viewBox="0 0 ${size} ${size}">${scoped}</symbol>`);
}
writeFileSync(join(BRAND_OUT, 'sprite.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${SPRITE.join('')}</svg>\n`);

writeFileSync(join(BRAND_OUT, 'brand.json'), JSON.stringify(brand, null, 2) + '\n');

console.log(`sketch-extract  ${masters.length} masters → ${unique.size} unique`
  + ` (${new Set(duplicates).size} duplicated names)`);
console.log(`                source/sketch/symbols.json`);
console.log(`                packages/brand/ → torob-logo, torob-guarantee, bale, telegram, whatsapp`);
