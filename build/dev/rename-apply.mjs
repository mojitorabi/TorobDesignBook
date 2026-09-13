#!/usr/bin/env node
/* One-off migration: move every token in source/rename.mjs to its new path in
   the DTCG files, then rewrite every consumer to the new names.

   Kept in build/dev as the record of how the rename was done. It is safe to
   run again: a path already at its new home is skipped. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { ROOT } from '../tokens-lib.mjs';
import { TOKEN_RENAMES, CLASS_RENAMES, cssVar } from '../../source/rename.mjs';

/* ── 1. The DTCG files ────────────────────────────────────────────────── */
const getPath = (tree, path) => path.split('.').reduce((o, k) => o?.[k], tree);
const setPath = (tree, path, value) => {
  const parts = path.split('.');
  let o = tree;
  for (const k of parts.slice(0, -1)) o = (o[k] ??= {});
  o[parts.at(-1)] = value;
};
const delPath = (tree, path) => {
  const parts = path.split('.');
  const parents = [];
  let o = tree;
  for (const k of parts.slice(0, -1)) { parents.push([o, k]); o = o?.[k]; if (!o) return; }
  delete o[parts.at(-1)];
  /* Drop a branch that only held renamed leaves, so `bg` does not linger as
     an empty object next to the `color` it moved into. */
  for (let i = parents.length - 1; i >= 0; i--) {
    const [parent, key] = parents[i];
    const node = parent[key];
    if (node && typeof node === 'object' && !Object.keys(node).some(k => !k.startsWith('$'))) delete parent[key];
  }
};

const tokenDir = join(ROOT, 'source', 'tokens');
let moved = 0;
for (const f of readdirSync(tokenDir).filter(f => f.endsWith('.json'))) {
  const p = join(tokenDir, f);
  const tree = JSON.parse(readFileSync(p, 'utf8'));
  let touched = false;
  for (const [from, to] of Object.entries(TOKEN_RENAMES)) {
    const node = getPath(tree, from);
    if (!node || getPath(tree, to)) continue;
    setPath(tree, to, node);
    delPath(tree, from);
    touched = true; moved++;
  }
  /* References inside values ({bg.canvas}) move with the tokens. */
  let text = JSON.stringify(tree, null, 2);
  for (const [from, to] of Object.entries(TOKEN_RENAMES)) {
    if (text.includes(`{${from}}`)) { text = text.split(`{${from}}`).join(`{${to}}`); touched = true; }
  }
  if (touched) writeFileSync(p, text + '\n');
}
console.log(`tokens moved: ${moved}`);

/* ── 2. Every consumer ────────────────────────────────────────────────── */
const VAR_MAP = Object.fromEntries(Object.entries(TOKEN_RENAMES).map(([a, b]) => [cssVar(a), cssVar(b)]));
/* Longest first, so --t-border-focus is not eaten by a prefix of itself. */
const VAR_KEYS = Object.keys(VAR_MAP).sort((a, b) => b.length - a.length);
const CLASS_KEYS = Object.keys(CLASS_RENAMES).sort((a, b) => b.length - a.length);

const SKIP_DIRS = new Set(['node_modules', '.git', 'site', 'dist', '.pixel-diff', '.transfer', 'ref']);
const EXT = new Set(['.css', '.mjs', '.js', '.json', '.ts', '.tsx', '.md', '.html', '.svg']);
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    if (SKIP_DIRS.has(f)) continue;
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.has(extname(p))) files.push(p);
  }
})(ROOT);

let varHits = 0, classHits = 0, changed = 0;
for (const p of files) {
  if (p.includes('source/rename.mjs') || p.includes('build/dev/rename-apply.mjs')) continue;
  let s = readFileSync(p, 'utf8');
  const before = s;
  for (const k of VAR_KEYS) {
    /* A token name is a whole word: --t-border-thin must not match inside
       --t-border-thin-x, and --t-bg-store-card must win over --t-bg-store-card-rule
       (handled by the longest-first order above). */
    const re = new RegExp(k.replace(/[-]/g, '\\-') + '(?![a-z0-9-])', 'g');
    const n = (s.match(re) ?? []).length;
    if (n) { s = s.replace(re, VAR_MAP[k]); varHits += n; }
  }
  for (const k of CLASS_KEYS) {
    /* Class names appear as `.t-btn`, `t-btn__label`, `"t-btn"`, `t-btn--red`.
       Match the token as a word, allowing the BEM tails to follow. */
    const re = new RegExp('\\b' + k.replace(/[-]/g, '\\-') + '(?![a-z0-9])', 'g');
    const n = (s.match(re) ?? []).length;
    if (n) { s = s.replace(re, CLASS_RENAMES[k]); classHits += n; }
  }
  if (s !== before) { writeFileSync(p, s); changed++; }
}
console.log(`files changed: ${changed}   token references: ${varHits}   class references: ${classHits}`);
