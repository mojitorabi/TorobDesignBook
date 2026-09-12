#!/usr/bin/env node
/* Crawl the built site: every page loads, every internal link resolves,
   every asset referenced exists, no duplicate ids, no obvious a11y misses. */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

const SITE = join(ROOT, 'site');
const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) { if (e !== 'assets') walk(p); }
    else if (e.endsWith('.html')) pages.push(p);
  }
})(SITE);

let errors = 0, warnings = 0;
const err = m => { errors++; console.log(`  ✗ ${m}`); };
const warn = m => { warnings++; console.log(`  ! ${m}`); };

const stats = { links: 0, assets: 0, ids: 0, specimens: 0 };

for (const p of pages) {
  const rel = relative(SITE, p);
  const raw = readFileSync(p, 'utf8');
  // Code samples inside <pre> are text, not markup — they must not be crawled
  // for links, ids or a11y issues.
  const html = raw.replace(/<pre[\s\S]*?<\/pre>/g, '<pre></pre>');
  const base = dirname(p);
  const issues = [];

  // internal links + assets
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|data:|mailto:|#|\/\/)/.test(u)) continue;
    const clean = u.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = resolve(base, clean);
    const isAsset = /\.(css|js|json|svg|png|woff2?|md|txt|scss|ts|swift|xml)$/.test(clean);
    isAsset ? stats.assets++ : stats.links++;
    if (!existsSync(target)) issues.push(`missing target: ${u}`);
    /* Only site/ is published. A link that resolves on this machine but points
       outside the published folder is a 404 for everyone else — which is how
       the token downloads were broken for two releases. */
    else if (!resolve(target).startsWith(SITE)) issues.push(`points outside the published site: ${u}`);
  }

  // duplicate ids
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  stats.ids += ids.length;
  const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupes.length) issues.push(`duplicate id(s): ${[...new Set(dupes)].join(', ')}`);

  // structure
  if (!/<h1[^>]*>/.test(html)) issues.push('no <h1>');
  if ((html.match(/<h1[^>]*>/g) ?? []).length > 1) issues.push('more than one <h1>');
  if (!/<title>/.test(html)) issues.push('no <title>');
  if (!/lang="/.test(html)) issues.push('no lang attribute');

  // a11y spot checks on the generated markup
  // Flag only buttons whose entire content is an icon — a button with a
  // visible text label does not need aria-label.
  let iconOnly = 0;
  for (const m of html.matchAll(/<button(?![^>]*aria-label)([^>]*)>([\s\S]*?)<\/button>/g)) {
    const inner = m[2];
    if (!/<svg/.test(inner)) continue;
    const text = inner.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').trim();
    if (!text) iconOnly++;
  }
  if (iconOnly) issues.push(`${iconOnly} icon-only button(s) without aria-label`);
  const imgNoAlt = [...html.matchAll(/<img(?![^>]*\balt=)/g)];
  if (imgNoAlt.length) issues.push(`${imgNoAlt.length} <img> without alt`);

  stats.specimens += (html.match(/class="spec"/g) ?? []).length;

  if (issues.length) { console.log(`\n${rel}`); issues.forEach(i => /missing target|duplicate id|no <h1>|no <title>/.test(i) ? err(i) : warn(i)); }
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`pages: ${pages.length}   internal links: ${stats.links}   assets: ${stats.assets}   ids: ${stats.ids}   specimens: ${stats.specimens}`);
console.log(errors ? `✗ ${errors} error(s), ${warnings} warning(s)` : `✓ no broken links, no duplicate ids${warnings ? `, ${warnings} warning(s)` : ''}`);
process.exit(errors ? 1 : 0);
