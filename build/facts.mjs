#!/usr/bin/env node
/* Numbers the book states about itself.
   Every count that appears in prose is computed here, from the same files the
   build reads, so a sentence cannot go on claiming forty-three components
   after the sixty-third is added. */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, buildModel } from './tokens-lib.mjs';
import { loadComponents } from './site-lib.mjs';

const read = p => readFileSync(join(ROOT, p), 'utf8');

let CACHE = null;

/** The facts, once computed. Page builders read them synchronously. */
export function getFacts() {
  if (!CACHE) throw new Error('facts not initialised — call initFacts() first');
  return CACHE;
}

export async function initFacts() {
  CACHE = await facts();
  return CACHE;
}

export async function facts() {
  const components = await loadComponents();
  const model = buildModel();
  const symbols = JSON.parse(read('source/sketch/symbols.json'));
  const icons = JSON.parse(read('packages/icons/index.json'));
  const pairs = (read('build/contrast-check.mjs').match(/^\s*\['/gm) ?? []).length;
  /* torob.css and fonts.css live in the same folder but are the CSS layer and
     the typeface, not token exports. */
  const exportFiles = readdirSync(join(ROOT, 'packages/css/dist'))
    .filter(f => !f.startsWith('.') && f !== 'torob.css' && f !== 'fonts.css');
  const exports = exportFiles.length;
  const themes = Object.keys(model.modes).length;
  const groups = new Set(components.map(c => c.group));
  const masters = symbols.masters ?? symbols.symbols?.length ?? 0;
  const uniqueMasters = symbols.unique ?? masters;
  const dupNames = symbols.duplicateNames?.length ?? 0;
  const legacy = new Set(components.flatMap(c => c.legacy ?? []));
  const newOnes = components.filter(c => c.status === 'new').length;

  let pages = 0;
  (function walk(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) { if (!p.includes('/assets')) walk(p); }
      else if (f.endsWith('.html')) pages++;
    }
  })(join(ROOT, 'site'));

  return {
    components: components.length,
    groups: groups.size,
    newComponents: newOnes,
    legacyNames: legacy.size,
    tokensBase: Object.keys(model.base).length,
    tokensSemantic: Object.keys(model.modes.light).length,
    themes,
    icons: icons.length,
    exports,
    exportFiles,
    contrastPairs: pairs,
    masters,
    duplicateNames: dupNames,
    duplicateNameList: symbols.duplicateNames ?? [],
    uniqueMasters,
    pages,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const f = await facts();
  for (const [k, v] of Object.entries(f)) console.log(String(k).padEnd(18), v);
}
