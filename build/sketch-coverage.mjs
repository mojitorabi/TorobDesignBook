#!/usr/bin/env node
/* GATE: every symbol on the kit's Components page must map to a component and
   must have code. "Exactly the same as the symbols" is a claim that decays the
   moment someone adds a symbol, so it is checked rather than asserted.

   Reads source/sketch/symbols.json (emitted by build/sketch-extract.mjs). */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { SYMBOL_CODE } from '../source/sketch/symbol-code.mjs';

const spec = JSON.parse(readFileSync(join(ROOT, 'source/sketch/symbols.json'), 'utf8'));

const dir = join(ROOT, 'source', 'components');
const components = [];
for (const f of readdirSync(dir).filter(f => f.endsWith('.mjs')).sort())
  components.push(...(await import(`file://${join(dir, f)}`)).default);

/* Symbol names in the source carry an invisible U+200C and inconsistent
   spacing around the separator. Compare on a normalised form so a zero-width
   character can never silently break the mapping. */
const norm = s => s.replace(/‌/g, '').replace(/\s*\/\s*/g, '/').toLowerCase().trim();

const owner = new Map();
for (const c of components) for (const l of c.legacy ?? []) owner.set(norm(l), c);

const unmapped = [], uncoded = [];
for (const s of spec.symbols) {
  if (!owner.has(norm(s.name))) unmapped.push(s.name);
  if (!SYMBOL_CODE[s.name]) uncoded.push(s.name);
}
const stale = Object.keys(SYMBOL_CODE).filter(n => !spec.symbols.some(s => s.name === n));

const problems = [
  ['not mapped to any component (add the name to that component\'s `legacy`)', unmapped],
  ['has no entry in source/sketch/symbol-code.mjs', uncoded],
  ['in symbol-code.mjs but not in the kit any more', stale],
];
let failed = 0;
for (const [what, list] of problems) {
  if (!list.length) continue;
  failed += list.length;
  console.error(`\n  ✗ ${list.length} symbol(s) ${what}:`);
  list.forEach(n => console.error(`      ${JSON.stringify(n)}`));
}

if (failed) {
  console.error(`\nsketch-coverage: ${failed} problem(s). Every symbol on the`
    + ` Components page needs an owner and a snippet.\n`);
  process.exit(1);
}
console.log(`✓ sketch coverage — ${spec.symbols.length} symbols, all mapped and coded`
  + ` (${spec.masters} masters, ${spec.duplicateNames.length} duplicated names in the source)`);
