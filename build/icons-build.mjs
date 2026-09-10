#!/usr/bin/env node
/* Build the Torob icon package from the Sketch icon index + Carbon metadata.
   The Sketch file defines WHICH icons ship; Carbon supplies the geometry. */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const SCRATCH = process.env.TOROB_SCRATCH;
const OUT = join(ROOT, 'packages', 'icons');
mkdirSync(join(OUT, 'svg', '16'), { recursive: true });
mkdirSync(join(OUT, 'svg', '20'), { recursive: true });

const sketch = JSON.parse(readFileSync(join(SCRATCH, 'icons_index.json'), 'utf8'));
const carbon = JSON.parse(readFileSync(join(SCRATCH, 'carbon/node_modules/@carbon/icons/metadata.json'), 'utf8'));

/* ---- 1. What the Sketch file actually ships ---- */
const wanted = new Map(); // key: lowercase carbon name -> { name, category, subcategory, sizes:Set }
for (const r of sketch) {
  if (r.cls !== 'symbolMaster' || !r.name) continue;
  const parts = r.name.split('/').map(s => s.trim());
  if (parts.length < 4) continue;
  const [category, subcategory, name, size] = [parts[0], parts[1], parts.slice(2, -1).join('/'), Number(parts.at(-1))];
  const key = name.toLowerCase();
  if (!wanted.has(key)) wanted.set(key, { name, category, subcategory, sizes: new Set() });
  wanted.get(key).sizes.add(size);
}

/* ---- 2. Index Carbon by name ---- */
const byName = new Map();
for (const ic of carbon.icons) byName.set(ic.name.toLowerCase(), ic);

/* ---- 3. Serialise a Carbon descriptor to SVG ---- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function serialise(node) {
  const attrs = Object.entries(node.attrs ?? {}).map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  const kids = (node.content ?? []).map(serialise).join('');
  return kids ? `<${node.elem}${attrs}>${kids}</${node.elem}>` : `<${node.elem}${attrs}/>`;
}
const innerOf = d => (d.content ?? []).map(serialise).join('');

/* ---- 4. Build ---- */
const registry = {};
const missing = [];
let files = 0;
const sprites = { 16: [], 20: [] };

for (const [key, meta] of [...wanted].sort((a, b) => a[0].localeCompare(b[0]))) {
  const ic = byName.get(key);
  if (!ic) { missing.push(meta.name); continue; }
  const entry = {
    name: meta.name,
    friendlyName: ic.friendlyName ?? meta.name,
    category: meta.category,
    subcategory: meta.subcategory,
    carbonCategory: ic.category ?? null,
    aliases: ic.aliases ?? [],
    /* Carbon ships explicit --mirror twins for icons that must flip in RTL.
       If this icon has one, RTL should render the twin, not a CSS transform. */
    mirror: byName.has(`${key}--mirror`) ? `${meta.name}--mirror` : null,
    isMirror: key.endsWith('--mirror'),
    sizes: {},
  };
  for (const size of [16, 20]) {
    if (!meta.sizes.has(size)) continue;
    const out = (ic.output ?? []).find(o => o.size === size) ?? (ic.output ?? []).find(o => o.size === 32);
    if (!out?.descriptor) continue;
    const inner = innerOf(out.descriptor);
    const vb = out.descriptor.attrs?.viewBox ?? `0 0 ${size} ${size}`;
    entry.sizes[size] = { viewBox: vb, content: inner };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}" fill="currentColor">${inner}</svg>`;
    writeFileSync(join(OUT, 'svg', String(size), `${meta.name}.svg`), svg);
    files++;
    sprites[size].push(`<symbol id="t-${meta.name}" viewBox="${vb}">${inner}</symbol>`);
  }
  if (Object.keys(entry.sizes).length) registry[meta.name] = entry;
}

/* ---- 4b. Carbon's size-agnostic status indicators live at svg/*.svg, outside
   metadata.json. The Sketch file references several by name, so include them. ---- */
{
  const dir = join(SCRATCH, 'carbon/node_modules/@carbon/icons/svg');
  for (const f of readdirSync(dir).filter(f => f.endsWith('.svg'))) {
    const name = f.replace(/\.svg$/, '');
    if (registry[name]) continue;
    const raw = readFileSync(join(dir, f), 'utf8');
    const vb = (/viewBox="([^"]+)"/.exec(raw) ?? [, '0 0 16 16'])[1];
    const inner = raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
    const entry = { name, friendlyName: name, category: 'Status', subcategory: 'Indicator',
                    carbonCategory: 'Status', aliases: [], mirror: null, isMirror: false, sizes: {} };
    for (const size of [16, 20]) {
      entry.sizes[size] = { viewBox: vb, content: inner };
      writeFileSync(join(OUT, 'svg', String(size), `${name}.svg`),
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}" fill="currentColor">${inner}</svg>`);
      files++;
      sprites[size].push(`<symbol id="t-${name}" viewBox="${vb}">${inner}</symbol>`);
    }
    registry[name] = entry;
  }
}

writeFileSync(join(OUT, 'icons.json'), JSON.stringify(registry));
for (const size of [16, 20]) {
  writeFileSync(join(OUT, `sprite-${size}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${sprites[size].join('')}</svg>`);
}

/* Lean index for search UIs — no geometry. */
const index = Object.values(registry).map(e => ({
  n: e.name, f: e.friendlyName, c: e.category, s: e.subcategory,
  a: e.aliases, m: e.mirror ? 1 : 0, z: Object.keys(e.sizes).map(Number),
}));
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index));

const cats = {};
for (const e of Object.values(registry)) ((cats[e.category] ??= {})[e.subcategory] ??= 0, cats[e.category][e.subcategory]++);
writeFileSync(join(OUT, 'categories.json'), JSON.stringify(cats, null, 2));

console.log(`✓ ${Object.keys(registry).length} icons  ·  ${files} SVG files  ·  ${index.filter(i => i.m).length} with RTL mirror twins`);
if (missing.length) {
  console.log(`\n⚠ ${missing.length} icons in the Sketch file have no Carbon match:`);
  console.log('   ' + missing.slice(0, 24).join(', ') + (missing.length > 24 ? ` … +${missing.length - 24}` : ''));
  writeFileSync(join(OUT, 'unmatched.json'), JSON.stringify(missing, null, 2));
}
