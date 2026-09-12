#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

/* ── Forced states ──────────────────────────────────────────────────────────
   A state you cannot see is a state nobody maintains. Every interactive state
   in this system answers to its real pseudo-class AND to a matching value in
   [data-state], so the same pixels can be rendered in documentation, in a
   screenshot test and in a pixel diff without a live pointer.

       :hover          [data-state~="hover"]
       :focus-visible  [data-state~="focus"]
       :focus-within   [data-state~="focus"]
       :active         [data-state~="active"]
       :disabled       [data-state~="disabled"]

   The pairing is made here rather than by hand, so component CSS stays plain
   CSS and no rule can drift out of the set. :is() takes the specificity of its
   most specific argument, and a pseudo-class and an attribute selector weigh
   the same, so nothing in the cascade moves. */
const FORCED = [
  [/:hover\b/g, ':is(:hover, [data-state~="hover"])'],
  [/:focus-visible\b/g, ':is(:focus-visible, [data-state~="focus"])'],
  [/:focus-within\b/g, ':is(:focus-within, [data-state~="focus"])'],
  [/:active\b/g, ':is(:active, [data-state~="active"])'],
  [/:disabled\b/g, ':is(:disabled, [data-state~="disabled"])'],
];

/** Rewrite selectors only: comments and declaration bodies are left alone. */
function forceStates(css) {
  let out = '', i = 0;
  while (i < css.length) {
    const c = css.indexOf('/*', i);
    const block = c === -1 ? css.slice(i) : css.slice(i, c);
    out += block.replace(/([^{}@;]+)(\{)/g, (m, sel, brace) => {
      let s = sel;
      for (const [re, rep] of FORCED) s = s.replace(re, rep);
      return s + brace;
    });
    if (c === -1) break;
    const end = css.indexOf('*/', c + 2);
    out += end === -1 ? css.slice(c) : css.slice(c, end + 2);
    i = end === -1 ? css.length : end + 2;
  }
  return out;
}

const src = join(ROOT, 'packages', 'css', 'src');
const out = join(ROOT, 'packages', 'css', 'dist');
mkdirSync(out, { recursive: true });
const files = readdirSync(src).filter(f => f.endsWith('.css')).sort();
let body = '';
for (const f of files) body += `\n/* ═══ ${f} ═══ */\n` + forceStates(readFileSync(join(src, f), 'utf8'));
writeFileSync(join(out, 'torob.css'), '@import "./tokens.css";\n' + body);
writeFileSync(join(out, 'fonts.css'), readFileSync(join(ROOT, 'packages/css/src-site/fonts.css'), 'utf8'));
const forced = (body.match(/data-state~=/g) ?? []).length;
console.log(`✓ torob.css — ${files.length} parts, ${(body.length / 1024).toFixed(1)}KB, ${forced} forced-state selectors`);
