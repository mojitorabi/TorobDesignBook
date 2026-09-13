#!/usr/bin/env node
/* GATE: the old names still work.

   The rename in source/rename.mjs promised two things to anyone with Torob
   code already written: every old token still resolves, and every old class
   still selects. A promise that nothing checks is a promise that breaks on a
   Tuesday, so this checks both, in the built output rather than the source.

   It also checks the reverse: that no old name is still being *used* inside
   this repository. Compatibility is for other people's code. Ours moves. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { TOKEN_RENAMES, CLASS_RENAMES, cssVar } from '../source/rename.mjs';

const tokensCss = readFileSync(join(ROOT, 'packages/css/dist/tokens.css'), 'utf8');
const torobCss = readFileSync(join(ROOT, 'packages/css/dist/torob.css'), 'utf8');

let fails = 0;

/* 1. Every old token is defined, and points at its new name. */
let tokenGaps = [], checkedTokens = 0;
for (const [from, to] of Object.entries(TOKEN_RENAMES)) {
  const oldVar = cssVar(from), newVar = cssVar(to);
  /* The map names every role any family could carry; only the pairs the model
     actually produced are a promise. */
  if (!new RegExp(`${newVar}\\s*:`).test(tokensCss)) continue;
  checkedTokens++;
  if (!tokensCss.includes(`${oldVar}: var(${newVar});`)) tokenGaps.push(`${oldVar} → ${newVar}`);
}

/* 2. Every old class still appears in a selector, next to its new name. */
let classGaps = [];
for (const [oldName, newName] of Object.entries(CLASS_RENAMES)) {
  /* A root may only ever appear with a BEM tail (.t-nav-group__title). */
  if (!new RegExp(`\\.${newName}(?:__|--)?[a-z0-9-]*(?![a-z0-9_-])`).test(torobCss)) { classGaps.push(`.${newName} is not in the bundle`); continue; }
  if (!new RegExp(`:is\\(\\.${newName}[^)]*, \\.${oldName}`).test(torobCss)) classGaps.push(`.${oldName} has no alias`);
}

/* 3. Nothing inside this repository still writes an old name. */
const SKIP = new Set(['node_modules', '.git', 'site', 'dist', '.pixel-diff', '.transfer', 'ref', 'dev']);
const EXT = new Set(['.css', '.mjs', '.js', '.json', '.ts', '.tsx']);
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    if (SKIP.has(f)) continue;
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.has(extname(p))) files.push(p);
  }
})(ROOT);

const stale = [];
for (const p of files) {
  /* The three files that implement the compatibility naturally name both. */
  if (/source\/rename\.mjs|build\/rename-check\.mjs|build\/css-bundle\.mjs|build\/tokens-build\.mjs/.test(p)) continue;
  const s = readFileSync(p, 'utf8');
  for (const from of Object.keys(TOKEN_RENAMES)) {
    const v = cssVar(from);
    if (new RegExp(v + '(?![a-z0-9-])').test(s)) stale.push(`${p.slice(ROOT.length + 1)}  ${v}`);
  }
  for (const oldName of Object.keys(CLASS_RENAMES)) {
    if (new RegExp('\\b' + oldName + '(?![a-z0-9])').test(s)) stale.push(`${p.slice(ROOT.length + 1)}  ${oldName}`);
  }
}

const report = (label, list) => {
  if (!list.length) { console.log(`✓ ${label}`); return; }
  fails++;
  console.log(`✗ ${label}`);
  for (const l of list.slice(0, 12)) console.log('    ' + l);
  if (list.length > 12) console.log(`    … and ${list.length - 12} more`);
};

report(`${checkedTokens} renamed tokens: the old name still resolves`, tokenGaps);
report(`${Object.keys(CLASS_RENAMES).length} renamed classes: the old class still selects`, classGaps);
report('nothing in this repository writes an old name', [...new Set(stale)]);

process.exitCode = fails ? 1 : 0;
