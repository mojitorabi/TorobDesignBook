#!/usr/bin/env node
/* One-off: swap the documentation site's bespoke chrome for the components the
   site documents. Run once, then delete. Kept in build/dev so the swap is
   reviewable rather than a wall of hand edits. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../tokens-lib.mjs';

const dir = join(ROOT, 'build');
const files = readdirSync(dir).filter(f => f.endsWith('.mjs')).map(f => join(dir, f));
const count = {};

const PAIRS = [
  /* A tool button is a button. Icon-only ones are icon buttons. */
  ['class="site-tool site-nav-toggle"', 'class="t-icon-btn t-icon-btn--sm site-nav-toggle"'],
  ['class="site-tool copy-btn"', 'class="t-btn t-btn--outline t-btn--sm copy-btn"'],
  ['class="site-tool"', 'class="t-btn t-btn--outline t-btn--sm"'],

  /* Status is a badge. */
  ['class="status-pill status-pill--new" style="font-size:9.5px;padding:1px 6px"', 'class="t-badge t-badge--guarantee"'],
  ['class="status-pill status-pill--new"', 'class="t-badge t-badge--guarantee"'],
  ['class="status-pill status-pill--${c.status}"', 'class="t-badge site-status" data-status="${c.status}"'],

  /* An old name is a tag; so is the copyable root class. */
  ['<span class="legacy">${esc(l)}</span>', '<span class="t-tag">${esc(l)}</span>'],
  ['<button class="class-chip copy-btn"', '<button class="t-tag site-tag-btn copy-btn"'],

  /* A note is an alert. */
  ['class="note note--warn"', 'class="t-alert t-alert--caution site-note"'],
  ['class="note note--new"', 'class="t-alert t-alert--info site-note"'],
  ['class="note"', 'class="t-alert site-note"'],
];

for (const f of files) {
  let s = readFileSync(f, 'utf8');
  const before = s;
  for (const [a, b] of PAIRS) {
    const n = s.split(a).length - 1;
    if (n) { s = s.split(a).join(b); count[a] = (count[a] ?? 0) + n; }
  }
  if (s !== before) writeFileSync(f, s);
}

for (const [k, v] of Object.entries(count)) console.log(String(v).padStart(4), k.slice(0, 70));
console.log('files scanned:', files.length);
