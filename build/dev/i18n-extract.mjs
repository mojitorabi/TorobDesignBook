#!/usr/bin/env node
/* Collect every Persian string the built book shows, so the English twin has
   something exact to translate rather than a guess at what is on the pages.

   Runs against site/ in a real browser, because the only reliable way to know
   what a page says is to let a DOM tell you. Skips code, specimen stages
   (those already have source/i18n.mjs) and anything already marked LTR.

   Writes source/i18n/pending.json, sorted by how much of the book each string
   accounts for, so the translation can be done biggest-first and stop being
   worth doing at a point you can see.

   Usage:  node build/serve.mjs 4321 &   then   node build/dev/i18n-extract.mjs */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../tokens-lib.mjs';
import { fa2en } from '../../source/i18n.mjs';

const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { chromium } = pw.chromium ? pw : pw.default;

const SITE = join(ROOT, 'site');
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!p.includes('/assets') && !p.endsWith('/en')) walk(p); }
    else if (f.endsWith('.html')) pages.push(p.slice(SITE.length + 1));
  }
})(SITE);

const OUT_DIR = join(ROOT, 'source', 'i18n');
mkdirSync(OUT_DIR, { recursive: true });
const donePath = join(OUT_DIR, 'pages.json');
const done = existsSync(donePath) ? JSON.parse(readFileSync(donePath, 'utf8')) : {};

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1400, height: 900 } })).newPage();

const seen = new Map();   // string → { n, pages:Set }
for (const p of pages) {
  await page.goto('http://localhost:4321/' + p, { waitUntil: 'domcontentloaded' });
  const found = await page.evaluate(() => {
    const PERSIAN = /[؀-ۿ]/;
    const out = [];
    const skip = el => !el || !!el.closest('pre, code, script, style, .spec__stage, .matrix__stage, .anatomy__stage, .play__stage, .sym__code, [dir="ltr"]');
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode, t = n.nodeValue.trim();
      if (!t || !PERSIAN.test(t) || skip(n.parentElement)) continue;
      out.push(t);
    }
    for (const el of document.querySelectorAll('[aria-label], [title], [placeholder], [alt]')) {
      if (skip(el)) continue;
      for (const a of ['aria-label', 'title', 'placeholder', 'alt']) {
        const v = el.getAttribute(a);
        if (v && PERSIAN.test(v)) out.push(v.trim());
      }
    }
    out.push(document.title);
    const d = document.querySelector('meta[name="description"]');
    if (d?.content) out.push(d.content.trim());
    return out;
  });
  for (const s of found) {
    if (!s) continue;
    const e = seen.get(s) ?? { n: 0, pages: new Set() };
    e.n++; e.pages.add(p);
    seen.set(s, e);
  }
}
await browser.close();

/* Already translated, either in the specimen dictionary or in a previous run. */
const known = { ...fa2en, ...done };
const rows = [...seen.entries()]
  .filter(([s]) => !known[s])
  .map(([s, e]) => ({ fa: s, en: '', weight: s.length * e.n, seen: e.n, pages: [...e.pages].slice(0, 3) }))
  .sort((a, b) => b.weight - a.weight);

writeFileSync(join(OUT_DIR, 'pending.json'), JSON.stringify(rows, null, 1));

const total = [...seen.entries()].reduce((a, [s, e]) => a + s.length * e.n, 0);
const left = rows.reduce((a, r) => a + r.weight, 0);
console.log(`${seen.size} distinct strings across ${pages.length} pages`);
console.log(`${rows.length} untranslated  ·  ${Math.round((1 - left / total) * 100)}% of the book's text is already covered`);
console.log(`→ source/i18n/pending.json`);
