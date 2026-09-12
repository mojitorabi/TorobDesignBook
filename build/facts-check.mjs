#!/usr/bin/env node
/* GATE: numbers the book states about itself must be true.
   Prose drifts silently — "۴۳ کامپوننت" survives long after the sixty-third
   is added, and nobody notices because nothing checks it. This reads the
   built pages back and compares every "<number> <noun>" against the facts.

   The changelog is exempt: a release note states what was true at that
   release, and rewriting history is worse than a stale sentence. */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { facts } from './facts.mjs';

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toEn = s => s.replace(/[۰-۹]/g, d => FA_DIGITS.indexOf(d)).replace(/٬/g, '');

const f = await facts();
/* noun in the prose → the fact it must agree with */
/* Each noun carries a set of values the system can justify: the total, and the
   sub-totals a sentence may legitimately quote. A number outside the set is
   one nobody can trace back to the system, which is the definition of stale.
   Small numbers are prose ("یک گروه"، "سه قالب") and are left alone. */
const small = n => n <= 9;
const CLAIMS = [
  [/(?<![۰-۹٬])([۰-۹][۰-۹٬]*)\s*کامپوننت/g, [f.components, f.newComponents, f.components - f.newComponents], 'components'],
  [/(?<![۰-۹٬])([۰-۹][۰-۹٬]*)\s*گروه/g, [f.groups], 'groups'],
  [/(?<![۰-۹٬])([۰-۹][۰-۹٬]*)\s*آیکون/g, [f.icons, 16, 20, 24], 'icons'],
  [/(?<![۰-۹٬])([۰-۹][۰-۹٬]*)\s*جفت/g, [f.contrastPairs], 'contrast pairs'],
  [/(?<![۰-۹٬])([۰-۹][۰-۹٬]*)\s*مستر/g, [f.masters, f.uniqueMasters, f.duplicateNames, 108], 'sketch masters'],
  [/(?<![۰-۹٬])([۰-۹][۰-۹٬]*)\s*قالب/g, [f.exports], 'token exports'],
];
/* A release note states what was true at that release; rewriting history is
   worse than a stale sentence. */
const EXEMPT_PAGES = new Set(['changelog.html']);

const SITE = join(ROOT, 'site');
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) { if (e !== 'assets') walk(p); }
    else if (e.endsWith('.html')) pages.push(p);
  }
})(SITE);

let bad = 0, checked = 0;
for (const p of pages) {
  const rel = p.slice(SITE.length + 1);
  if (EXEMPT_PAGES.has(rel)) continue;
  const text = readFileSync(p, 'utf8')
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<code[\s\S]*?<\/code>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  for (const [re, allowed, label] of CLAIMS) {
    for (const m of text.matchAll(re)) {
      const n = Number(toEn(m[1]));
      if (!Number.isFinite(n) || small(n)) continue;
      checked++;
      if (!allowed.includes(n)) {
        bad++;
        console.log(`  ✗ ${rel}: says ${m[0].trim().replace(/\s+/g, ' ')} — ${label} can only be ${allowed.join(' or ')}`);
      }
    }
  }
}
console.log(bad ? `\n✗ ${bad} stale number(s) of ${checked} checked` : `✓ ${checked} stated numbers all match the system`);
process.exit(bad ? 1 : 0);
