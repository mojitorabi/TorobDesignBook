import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SRC = join(ROOT, 'source', 'tokens');

/** Read every token file, keyed by filename stem. */
export function readTokenFiles() {
  const out = {};
  for (const f of readdirSync(SRC).filter(f => f.endsWith('.json')).sort()) {
    out[f.replace(/\.json$/, '')] = JSON.parse(readFileSync(join(SRC, f), 'utf8'));
  }
  return out;
}

const isMeta = k => k.startsWith('$');

/**
 * Flatten a DTCG tree into { 'dot.path': { value, type, description } }.
 * A node is a token when it carries $value.
 */
export function flatten(tree, prefix = [], acc = {}, inheritedType = null) {
  const type = tree.$type ?? inheritedType;
  if (Object.prototype.hasOwnProperty.call(tree, '$value')) {
    acc[prefix.join('.')] = { value: tree.$value, type, description: tree.$description ?? null };
    return acc;
  }
  for (const [k, v] of Object.entries(tree)) {
    if (isMeta(k) || v === null || typeof v !== 'object') continue;
    flatten(v, [...prefix, k], acc, type);
  }
  return acc;
}

/** Resolve {a.b.c} aliases against a lookup table. Handles aliases inside larger strings. */
export function resolveValue(value, lookup, seen = new Set()) {
  if (Array.isArray(value)) return value.map(v => resolveValue(v, lookup, seen));
  if (typeof value !== 'string') return value;
  return value.replace(/\{([^}]+)\}/g, (whole, path) => {
    if (seen.has(path)) throw new Error(`Circular token alias: ${path}`);
    const hit = lookup[path];
    if (!hit) throw new Error(`Unknown token alias: {${path}}`);
    const next = new Set(seen); next.add(path);
    const r = resolveValue(hit.value, lookup, next);
    return Array.isArray(r) ? r.join(', ') : String(r);
  });
}

/** Build the complete resolved model. */
export function buildModel() {
  const files = readTokenFiles();

  // Primitives + glass + motion + scale are mode-independent.
  const base = {};
  for (const [name, tree] of Object.entries(files)) {
    if (name.startsWith('semantic.')) continue;
    Object.assign(base, flatten(tree));
  }

  const modes = {};
  for (const [name, tree] of Object.entries(files)) {
    if (!name.startsWith('semantic.')) continue;
    modes[tree.$mode ?? name.split('.')[1]] = flatten(tree);
  }

  // Lookup for alias resolution: primitives, then this mode's semantics.
  const resolved = { base: {}, modes: {} };
  for (const [k, t] of Object.entries(base)) {
    resolved.base[k] = { ...t, value: resolveValue(t.value, base) };
  }
  for (const [mode, tokens] of Object.entries(modes)) {
    const lookup = { ...base, ...tokens };
    resolved.modes[mode] = {};
    for (const [k, t] of Object.entries(tokens)) {
      resolved.modes[mode][k] = { ...t, value: resolveValue(t.value, lookup) };
    }
  }
  return resolved;
}

export const cssVar = path => '--t-' + path.replace(/\./g, '-');

export function fmtCssValue(t) {
  const v = t.value;
  if (Array.isArray(v)) {
    if (t.type === 'cubicBezier') return `cubic-bezier(${v.join(', ')})`;
    if (t.type === 'fontFamily') return v.map(f => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
    return v.join(', ');
  }
  return String(v);
}
