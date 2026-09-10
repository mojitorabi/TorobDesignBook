#!/usr/bin/env node
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const dist = join(ROOT, 'packages', 'css', 'dist');
const src = join(ROOT, 'packages', 'css', 'src');

// Every custom property the token build defines.
const tokenCss = readFileSync(join(dist, 'tokens.css'), 'utf8');
const defined = new Set([...tokenCss.matchAll(/(?:^|[{;])\s*(--t-[\w-]+)\s*:/gm)].map(m => m[1]));

// Plus properties the component layer defines itself.
let componentCss = '';
for (const f of readdirSync(src).filter(f => f.endsWith('.css')).sort()) componentCss += readFileSync(join(src, f), 'utf8');
for (const m of componentCss.matchAll(/(?:^|[{;])\s*(--[\w-]+)\s*:/gm)) defined.add(m[1]);

const used = new Map();
for (const m of componentCss.matchAll(/var\((--[\w-]+)/g)) used.set(m[1], (used.get(m[1]) ?? 0) + 1);

const missing = [...used.keys()].filter(v => !defined.has(v)).sort();
const unusedTokens = [...defined].filter(v => v.startsWith('--t-') && !used.has(v)).sort();

console.log(`defined: ${defined.size}   referenced: ${used.size}`);
if (missing.length) {
  console.log(`\n✗ ${missing.length} UNRESOLVED var() references:`);
  for (const v of missing) console.log(`    ${v}  (used ${used.get(v)}×)`);
} else {
  console.log('\n✓ every var() reference resolves');
}
console.log(`\n  ${unusedTokens.length} tokens defined but not referenced by the CSS layer (expected — exports and primitives)`);
process.exit(missing.length ? 1 : 0);
