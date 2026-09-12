#!/usr/bin/env node
/* What the CSS actually supports, read from the CSS itself.
   For every root class it reports modifiers, element parts and the
   interactive states that have a rule. A gap here is a gap in the system,
   not in the documentation. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const src = join(ROOT, 'packages', 'css', 'src');
let css = '';
for (const f of readdirSync(src).filter(f => f.endsWith('.css')).sort()) css += readFileSync(join(src, f), 'utf8');
css = css.replace(/\/\*[\s\S]*?\*\//g, '');

const roots = new Map();
const get = n => { if (!roots.has(n)) roots.set(n, { mods: new Set(), parts: new Set(), states: new Set(), attrs: new Set() }); return roots.get(n); };
const STATES = ['hover', 'focus-visible', 'active', 'disabled', 'checked', 'invalid'];

/** Split a selector list on commas that are not inside brackets. */
function topSplit(list) {
  const out = []; let depth = 0, cur = '';
  for (const ch of list) {
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

for (const m of css.matchAll(/(^|\})([^{}@]+)\{/g)) {
  for (const raw of topSplit(m[2])) {
    const s = raw.trim();
    if (!s || s.startsWith('@') || s === 'from' || s === 'to' || /^\d/.test(s)) continue;
    const classes = [...s.matchAll(/\.(t-[a-z0-9_-]+)/g)].map(c => c[1]);
    if (!classes.length) continue;
    const first = classes[0];
    const root = first.split('__')[0].split('--')[0];
    const r = get(root);
    for (const c of classes) {
      if (!c.startsWith(root)) continue;
      const tail = c.slice(root.length);
      if (tail.startsWith('--')) r.mods.add(tail.slice(2));
      else if (tail.startsWith('__')) r.parts.add(tail.slice(2).split('--')[0]);
    }
    // A state counts whether it is written as a pseudo-class, as a forced
    // [data-state] value or as the ARIA attribute that means the same thing.
    for (const st of STATES) {
      const key = st.replace('-visible', '');
      if (s.includes(':' + st) ||
          s.includes(`data-state~="${key}"`) || s.includes(`data-state="${key}"`) ||
          (st === 'disabled' && s.includes('aria-disabled')) ||
          (st === 'checked' && /aria-(checked|pressed|selected)/.test(s)) ||
          (st === 'invalid' && (s.includes('aria-invalid') || s.includes('data-invalid')))) r.states.add(st);
    }
    for (const am of s.matchAll(/\[((?:aria|data)-[a-z-]+)(?:[~^|*$]?=)?"?([a-z0-9 -]*)"?\]/g)) r.attrs.add(am[1] + (am[2] ? '=' + am[2] : ''));
  }
}

// drop utility/token-ish roots that are not components
const SKIP = /^t-(icon|num|bidi|body|h[1-6]|tone|caption|visually|glass|dir|space|sr)/;
const rows = [...roots.entries()].filter(([n, r]) => !SKIP.test(n) && (r.mods.size + r.parts.size + r.states.size) > 0).sort();

/* Focus is not in this list: 01-base gives every natively focusable element a
   ring, so a component only needs its own rule when its control is a div or a
   span — and those are caught in review, not here. */
const KEY = ['hover', 'active', 'disabled'];
let gaps = 0;
console.log(`${rows.length} component root classes\n`);
console.log('root'.padEnd(20) + 'mods parts  states'.padEnd(46) + 'missing');
for (const [n, r] of rows) {
  const interactive = r.states.size > 0 || [...r.attrs].some(a => /aria-(pressed|selected|checked|expanded|current|disabled)/.test(a));
  const noPress = /^t-(input|field|search|taginput|table|toast|alert|cal|otp)$/.test(n);
  const missing = interactive ? KEY.filter(s => !r.states.has(s) && !(noPress && s === 'active')) : [];
  if (missing.length) gaps++;
  console.log(`.${n}`.padEnd(20) +
    String(r.mods.size).padStart(4) + String(r.parts.size).padStart(6) + '  ' +
    ([...r.states].join(' ') || '—').padEnd(44) +
    (missing.length ? '✗ ' + missing.join(' ') : ''));
}
console.log(`\n${gaps} interactive components with an incomplete state set`);
if (gaps && process.env.CSS_MAP_STRICT !== '0') process.exitCode = 1;
writeFileSync(join(ROOT, 'source', 'generated', 'css-map.json'), JSON.stringify(Object.fromEntries([...roots].map(([k, v]) => [k, { mods: [...v.mods], parts: [...v.parts], states: [...v.states], attrs: [...v.attrs] }])), null, 1));
