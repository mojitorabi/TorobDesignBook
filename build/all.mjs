#!/usr/bin/env node
/* One command rebuilds the whole system, in dependency order, with the
   quality gates in the middle rather than at the end. */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { removeOrStash } from './fs-safe.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

/* A clean slate, so a page that no longer exists cannot survive locally
   while CI (which always starts clean) drops it. */
const cleared = removeOrStash(join(HERE, '..', 'site'));
if (cleared === 'stashed') console.log('  (old site/ moved to .transfer/stale — delete it when convenient)');
const steps = [
  ['tokens-build.mjs',   'Tokens → 12 artefacts'],
  ['contrast-check.mjs', 'GATE: WCAG AA contrast'],
  ['validate-css.mjs',   'GATE: every var() resolves'],
  ['sketch-coverage.mjs','GATE: every Sketch symbol has code'],
  ['css-bundle.mjs',     'Bundle the CSS layer'],
  ['css-map.mjs',        'GATE: every interactive component has a full state set'],
  ['css-specs.mjs',      'Redlines read from the stylesheet'],
  ['make-map.mjs',       'Specimen map backgrounds'],
  ['mcp-build.mjs',      'MCP server data'],
  ['react-build.mjs',    'React package'],
  ['site-build.mjs',     'Website'],
  ['llms-build.mjs',     'llms.txt + Markdown twins + agent rules'],
  ['facts-check.mjs',    'GATE: every number the book states about itself is true'],
];

let failed = 0;
for (const [file, label] of steps) {
  process.stdout.write(`\n▸ ${label}\n`);
  const r = spawnSync(process.execPath, [join(HERE, file)], { stdio: 'inherit', env: process.env });
  if (r.status !== 0) { failed++; console.error(`  ✗ ${file} exited ${r.status}`); break; }
}
console.log(failed ? `\n✗ build failed` : `\n✓ build complete`);
process.exit(failed ? 1 : 0);
