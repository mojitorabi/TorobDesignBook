#!/usr/bin/env node
/* Replace hand-drawn SVG paths in specimens with the real Carbon icons.
   The user's icon set is the source of truth; a doc site that draws its own
   approximations is documenting something that does not exist. */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { readdirSync } from 'node:fs';

const icons = JSON.parse(readFileSync(join(ROOT, 'packages/icons/icons.json'), 'utf8'));

/** Emit a Carbon icon at the given size, preserving the caller's classes. */
export function carbon(name, { cls = 't-icon', size = 20, hidden = true } = {}) {
  const e = icons[name];
  if (!e) throw new Error(`No Carbon icon "${name}"`);
  const g = e.sizes[size] ?? e.sizes[20] ?? Object.values(e.sizes)[0];
  return `<svg class="${cls}" viewBox="${g.viewBox}" fill="currentColor"${hidden ? ' aria-hidden="true"' : ''}>${g.content}</svg>`;
}

/* A hand-drawn path in a specimen is replaced by the Carbon icon whose job it
   was doing. The mapping is by intent, keyed on a fragment of the old path. */
const MAP = [
  // [distinctive path fragment, carbon name, size]
  ['M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3z', 'search', 20],
  ['M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2z', 'search', 16],
  ['m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z', 'close', 16],
  ['M12 5 7 10l5 5V5z', 'chevron--left', 20],
  ['M10 3 5 8l5 5V3z', 'chevron--left', 16],
  ['M6 3l5 5-5 5V3z', 'chevron--right', 16],
  ['m8 11-5-5 1-1 4 4 4-4 1 1z', 'chevron--down', 16],
  ['m10 13-5-5 1-1 4 4 4-4 1 1z', 'chevron--down', 20],
  ['M2 3h12v1.4H2zm2 4h8v1.4H4zm2 4h4v1.4H6z', 'filter', 16],
  ['M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1z', 'location--filled', 16],
  ['M10 2a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6z', 'location--filled', 20],
  ['M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5z', 'location--filled', 16],
  ['M4 2a1.6 1.6 0 0 0-1.6 1.6C2.4 8.9 6.7 13.2 12 13.2A1.6 1.6', 'phone', 16],
  ['M5 3a2 2 0 0 0-2 2c0 6.6 5.4 12 12 12a2 2 0 0 0 2-2v-2.3', 'phone', 20],
  ['M8 14S1.5 9.9 1.5 5.8A3.3 3.3 0 0 1 8 4.3a3.3 3.3 0 0 1 6.5 1.5C14.5 9.9 8 14 8 14z', 'favorite', 16],
  ['M10 17S3 12.5 3 7.8A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.8C17 12.5 10 17 10 17z', 'favorite', 20],
  ['M8 1.5a4 4 0 0 0-4 4v3L2.5 11h11L12 8.5v-3a4 4 0 0 0-4-4zM6.5 12a1.5 1.5 0 0 0 3 0z', 'notification', 16],
  ['M8.7 3H7.3v4.3H3v1.4h4.3V13h1.4V8.7H13V7.3H8.7z', 'add', 16],
  ['M10.8 3H9.2v6.2H3v1.6h6.2V17h1.6v-6.2H17V9.2h-6.2V3z', 'add', 20],
  ['M3 7.3h10v1.4H3z', 'subtract', 16],
  ['M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z', 'checkmark', 16],
  ['M8 1.5 15 14H1zM7.3 6v4h1.4V6zm0 5v1.4h1.4V11z', 'warning--filled', 16],
  ['M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 11 3.9 7.9 5 6.8 7 8.8l4-4 1.1 1.1z', 'checkmark--filled', 16],
  ['M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.7 3h1.4v1.4H7.3zm2.2 8H6.5v-1.2h1V7.7h-1V6.5h2.2v4.3h1z', 'information--filled', 16],
  ['M8 10a2 2 0 0 0 2-2V4a2 2 0 1 0-4 0v4a2 2 0 0 0 2 2zm4-2a4 4 0 0 1-8 0H3a5 5 0 0 0 4.3 4.9V15h1.4v-2.1A5 5 0 0 0 13 8z', 'microphone', 16],
  ['M13 4h-2l-1-1.5H6L5 4H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM8 11.2A2.7 2.7 0 1 1 8 5.8a2.7 2.7 0 0 1 0 5.4z', 'camera', 16],
  ['M15 5h-2l-1.2-1.8H8.2L7 5H5a1.2 1.2 0 0 0-1.2 1.2v8.6A1.2 1.2 0 0 0 5 16h10a1.2 1.2 0 0 0 1.2-1.2V6.2A1.2 1.2 0 0 0 15 5zm-5 9a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8z', 'camera', 20],
  ['M14 13a2.5 2.5 0 0 0-1.8.8l-4.3-2.5a2.5 2.5 0 0 0 0-2.6l4.3-2.5a2.5 2.5 0 1 0-.7-1.3L7.2 7.4a2.5 2.5 0 1 0 0 5.2l4.3 2.5A2.5 2.5 0 1 0 14 13z', 'share', 20],
  ['M11 10.4a2 2 0 0 0-1.4.6L6.2 9a2 2 0 0 0 0-2l3.4-2a2 2 0 1 0-.6-1L5.6 6A2 2 0 1 0 5.6 10l3.4 2a2 2 0 1 0 2-1.6z', 'share', 16],
  ['M12 2H4a1 1 0 0 0-1 1v11l5-2.6 5 2.6V3a1 1 0 0 0-1-1z', 'bookmark', 16],
  ['M10 2a8 8 0 1 0 8 8h-1.6A6.4 6.4 0 1 1 10 3.6zM9.2 6v4.6l3.6 2.1.8-1.3-3-1.7V6z', 'recently-viewed', 20],
  ['M10 2 2 9h2v9h5v-6h2v6h5V9h2z', 'home', 20],
  ['M10 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3.5 17a6.5 6.5 0 0 1 13 0z', 'user--avatar', 20],
  ['M2 4h12v1.4H2zm0 3.3h12v1.4H2zm0 3.3h12V12H2z', 'menu', 16],
  ['M2 3h12v2H2zm0 4h12v2H2zm0 4h8v2H2z', 'list', 16],
  ['M8 1 2 4v8l6 3 6-3V4zm0 1.7 4 2v.1L8 6.8 4 4.8v-.1z', 'box', 16],
  ['M2 12h2V7H2zm4 0h2V3H6zm4 0h2V9h-2z', 'chart--column', 16],
  ['M8 5.5A2.5 2.5 0 1 0 8 10.5 2.5 2.5 0 0 0 8 5.5zM7 1h2l.3 1.8', 'settings', 16],
  ['M10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10.8 1H9.2v2.1', 'location--current', 20],
  ['m10 2 8 4.5-8 4.5-8-4.5L10 2zm5.6 7.2L18 10.5 10 15l-8-4.5 2.4-1.3L10 12l5.6-2.8z', 'layers', 20],
  ['M14 7 9 2v3H6a4 4 0 0 0 0 8h1v-1.6H6A2.4 2.4 0 0 1 6 6.6h3V9z', 'direction--fork', 16],
  ['m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z', 'star--filled', 16],
  ['M14 3a11 11 0 1 0 6.7 19.7', 'search', 20],
  ['M26 8h-4V6a4 4 0 0 0-8 0v2h-4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z', 'shopping--bag', 20],
];

const files = readdirSync(join(ROOT, 'source/components')).filter(f => f.endsWith('.mjs')).map(f => join(ROOT, 'source/components', f))
  .concat(readdirSync(join(ROOT, 'build')).filter(f => /^pages-.*\.mjs$/.test(f)).map(f => join(ROOT, 'build', f)));

let replaced = 0, unmatched = new Map();
for (const path of files) {
  let s = readFileSync(path, 'utf8');
  const before = s;
  // Find every inline <svg> whose paths we drew by hand and swap the innards.
  /* The translated registries are JSON-serialised, so their quotes arrive
     escaped as \". Match both forms. */
  const SVG = /<svg([^>]*?)viewBox=\\?"0 0 (?:16|20|32) 0?(?:16|20|32)\\?"([^>]*?)>([\s\S]*?)<\/svg>/g;
  s = s.replace(SVG, (whole, pre, post, inner) => {
    const attrs = pre + post;
    const esc = whole.includes('\\"');
    const hit = MAP.find(([frag]) => inner.includes(frag.slice(0, 34)));
    if (!hit) {
      const key = inner.slice(0, 44);
      unmatched.set(key, (unmatched.get(key) ?? 0) + 1);
      return whole;
    }
    const [, name, size] = hit;
    const e = icons[name];
    if (!e) return whole;
    const g = e.sizes[size] ?? e.sizes[20] ?? Object.values(e.sizes)[0];
    const cls = (/class=\\?"([^"\\]*)/.exec(attrs) ?? [, 't-icon'])[1];
    const width = (/width=\\?"(\d+)/.exec(attrs) ?? [])[1];
    const height = (/height=\\?"(\d+)/.exec(attrs) ?? [])[1];
    replaced++;
    const q = esc ? '\\"' : '"';
    const content = esc ? g.content.replace(/"/g, '\\"') : g.content;
    return `<svg class=${q}${cls}${q}${width ? ` width=${q}${width}${q}` : ''}${height ? ` height=${q}${height}${q}` : ''} viewBox=${q}${g.viewBox}${q} fill=${q}currentColor${q} aria-hidden=${q}true${q}>${content}</svg>`;
  });
  if (s !== before) writeFileSync(path, s);
}

console.log(`✓ ${replaced} hand-drawn icons replaced with Carbon originals`);
if (unmatched.size) {
  console.log(`  ${unmatched.size} inline SVG(s) left as-is (brand marks, illustrations, chart bars):`);
  for (const [k, n] of [...unmatched].slice(0, 6)) console.log(`    ${n}× ${k.replace(/\s+/g, ' ').slice(0, 60)}…`);
}
