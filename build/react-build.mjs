#!/usr/bin/env node
/* Generate the React package from the component registry, so the code on the
   website and the code you install are the same code. */
import { writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { loadComponents } from './site-lib.mjs';
import { removeOrStash } from './fs-safe.mjs';

const OUT = join(ROOT, 'packages', 'react', 'src');
mkdirSync(join(OUT, 'components'), { recursive: true });
const components = await loadComponents();

/* A renamed component must not leave its old file behind. */
const expected = new Set(components.map(c => `${c.name}.tsx`));
for (const f of readdirSync(join(OUT, 'components')))
  if (f.endsWith('.tsx') && !expected.has(f)) console.log(`  stale ${f}: ${removeOrStash(join(OUT, 'components', f))}`);

/* Shared utilities every generated component leans on. */
writeFileSync(join(OUT, 'utils.ts'), `/* Torob Design System — shared utilities. */

/** Minimal class joiner. Drop this and import clsx if you already depend on it. */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

const FA = '۰۱۲۳۴۵۶۷۸۹';

/** Latin digits → Persian-Indic. Every product-surface number goes through this. */
export const toFa = (n: number | string): string =>
  String(n).replace(/\\d/g, d => FA[+d]);

/** A price, formatted the Torob way: Persian numerals, ٬ thousands separator. */
export const formatPrice = (n: number): string =>
  toFa(n.toLocaleString('en-US')).replace(/,/g, '٬');

/** A distance, in the unit the shopper expects. */
export const formatDistance = (metres: number): string =>
  metres < 1000 ? \`\${toFa(Math.round(metres))} متر\` : \`\${toFa((metres / 1000).toFixed(1))} کیلومتر\`;
`);

writeFileSync(join(OUT, 'hooks.ts'), `/* Torob Design System — hooks the overlay components need.
   These are the pieces that make a dialog actually accessible; they are not
   optional extras. */
import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
  'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Trap focus inside \`ref\` while \`active\`, and return it to the trigger on close. */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const first = root.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const [a, z] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [active, ref]);
}

/** Lock body scroll without the layout shifting as the scrollbar disappears. */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { overflow, paddingInlineEnd } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingInlineEnd = \`\${gap}px\`;
    return () => { document.body.style.overflow = overflow; document.body.style.paddingInlineEnd = paddingInlineEnd; };
  }, [active]);
}

/** Escape to dismiss. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, onEscape]);
}

export function useMediaQuery(query: string): boolean {
  const ref = useRef(typeof matchMedia === 'function' ? matchMedia(query).matches : false);
  const [, force] = useReducerLite();
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => { ref.current = mq.matches; force(); };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return ref.current;
}

function useReducerLite(): [number, () => void] {
  const r = useRef(0);
  const set = useRef<(n: number) => void>(() => {});
  return [r.current, () => { r.current++; set.current(r.current); }];
}
`);

const files = [];
for (const c of components) {
  if (!c.react) continue;
  const body = `/* ${c.name} — Torob Design System
 * ${c.summary}
 * Docs: /components/${c.slug}.html
${c.legacy?.length ? ` * Replaces: ${c.legacy.join(', ')}\n` : ''} */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

${c.react}
`;
  writeFileSync(join(OUT, 'components', `${c.name}.tsx`), body);
  files.push(c.name);
}

writeFileSync(join(OUT, 'index.ts'), `/* Torob Design System — React.
 * Generated from source/components/*.mjs. Do not edit by hand.
 *
 * These components are a thin wrapper over the framework-free CSS layer.
 * Import the stylesheet once, at your app root:
 *
 *   import '@torob/css/dist/torob.css';
 *   import '@torob/css/dist/fonts.css';
 */
export * from './utils';
export * from './hooks';
${files.map(n => `export { ${n} } from './components/${n}';`).join('\n')}
`);

writeFileSync(join(ROOT, 'packages/react/package.json'), JSON.stringify({
  name: '@torob/react', version: '1.0.0', type: 'module',
  description: 'React components for the Torob Design System.',
  main: './src/index.ts', types: './src/index.ts',
  peerDependencies: { react: '>=18', 'react-dom': '>=18' },
  files: ['src'],
}, null, 2));

writeFileSync(join(ROOT, 'packages/react/README.md'), `# @torob/react

React wrappers over the Torob Design System CSS layer.

\`\`\`tsx
import '@torob/css/dist/torob.css';
import '@torob/css/dist/fonts.css';
import { Button, StoreCard, useToast } from '@torob/react';
\`\`\`

Set direction once, at the document root — never on a component:

\`\`\`html
<html lang="fa" dir="rtl">
\`\`\`

${files.length} components. Full documentation, including the accessibility
contract for each, is on the design system site.

These files are generated from \`source/components/*.mjs\`. Edit that, then run
\`node build/react-build.mjs\`.
`);

console.log(`✓ React package: ${files.length} components + utils + hooks`);
