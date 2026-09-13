#!/usr/bin/env node
/* One static check on the site's own JavaScript, for the one mistake that has
   now shipped twice.

   `$` is querySelector and `$$` is the array form. Ask `$` for a collection and
   then call .forEach on it and the page throws at that line: the control looks
   right, the classes are right, the contrast is right, and the behaviour the
   component page describes simply never happens. Every other gate passes,
   because no gate runs the page.

   So: find every `$(…)` whose result is immediately used as a list. */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const FILE = join(ROOT, 'packages', 'site-js', 'site.js');
const src = readFileSync(FILE, 'utf8');
/* Used as a list: iterated, indexed, measured, or searched. */
const LIST_USE = /^\s*(\.(forEach|map|filter|find|some|every|reduce|indexOf|slice|join|sort|flatMap)\b|\[|\.length\b)/;

const hits = [];
for (let i = 0; i < src.length; i++) {
  if (src[i] !== '$' || src[i + 1] !== '(') continue;
  if (src[i - 1] === '$') continue;                  // this is $$(
  let depth = 0, j = i + 1;
  for (; j < src.length; j++) {
    if (src[j] === '(') depth++;
    else if (src[j] === ')' && --depth === 0) { j++; break; }
  }
  if (!LIST_USE.test(src.slice(j, j + 14))) continue;
  const line = src.slice(0, i).split('\n').length;
  hits.push(`  site.js:${line}  ${src.slice(src.lastIndexOf('\n', i) + 1, src.indexOf('\n', j)).trim().slice(0, 96)}`);
}

if (hits.length) {
  console.log(`✗ ${hits.length} place(s) ask $ for a list. Use $$:`);
  console.log(hits.join('\n'));
  process.exitCode = 1;
} else {
  console.log('✓ every list operation in site.js comes from $$');
}
