#!/usr/bin/env node
/* Redlines, read from the stylesheet.
   A specification table that is typed by hand starts drifting the day after
   it is written. These are the component's own declarations, grouped by the
   part they belong to, with the token each value comes from and what that
   token resolves to in the light theme. */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, buildModel } from './tokens-lib.mjs';

/* Only the properties a specification answers questions about. Transitions,
   cursors and overflow are behaviour, not measurement. */
const SPEC_PROPS = [
  'block-size', 'min-block-size', 'inline-size', 'min-inline-size', 'max-inline-size',
  'padding', 'padding-block', 'padding-inline', 'gap',
  'border', 'border-radius', 'border-width', 'border-color',
  'background', 'background-color', 'background-image', 'box-shadow', 'color',
  'font-size', 'line-height', 'font-weight', 'letter-spacing',
];

const FA = {
  'block-size': 'ارتفاع', 'min-block-size': 'کمینهٔ ارتفاع', 'inline-size': 'عرض',
  'min-inline-size': 'کمینهٔ عرض', 'max-inline-size': 'بیشینهٔ عرض',
  'padding': 'حاشیهٔ داخلی', 'padding-block': 'حاشیهٔ عمودی', 'padding-inline': 'حاشیهٔ افقی',
  'gap': 'فاصله', 'border': 'کادر', 'border-radius': 'گردی گوشه', 'border-width': 'ضخامت کادر',
  'border-color': 'رنگ کادر', 'background': 'زمینه', 'background-color': 'رنگ زمینه',
  'background-image': 'گرادیان', 'box-shadow': 'سایه', 'color': 'رنگ متن',
  'font-size': 'اندازهٔ قلم', 'line-height': 'ارتفاع خط', 'font-weight': 'وزن قلم',
  'letter-spacing': 'فاصلهٔ حرفی',
};

function parse(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim();
    if (!sel || sel.startsWith('@') || sel === 'from' || sel === 'to' || /^\d/.test(sel)) continue;
    const decls = [];
    for (const d of m[2].split(';')) {
      const i = d.indexOf(':');
      if (i < 0) continue;
      const prop = d.slice(0, i).trim();
      const val = d.slice(i + 1).trim();
      if (prop && val) decls.push([prop, val]);
    }
    if (decls.length) rules.push([sel, decls]);
  }
  return rules;
}

let RULES = null;
export function rules() {
  if (RULES) return RULES;
  const src = join(ROOT, 'packages', 'css', 'src');
  let css = '';
  for (const f of readdirSync(src).filter(f => f.endsWith('.css')).sort()) css += readFileSync(join(src, f), 'utf8');
  return (RULES = parse(css));
}

/** The base declarations for one class: its own rule, no states, no modifiers. */
export function specFor(cls) {
  const out = new Map();
  for (const [sel, decls] of rules()) {
    for (const part of sel.split(',')) {
      const s = part.trim();
      if (s !== `.${cls}` && s !== `.${cls}, ` ) continue;
      /* "border: 0" answers nothing a reader asked. Declarations that only
         switch something off stay out of the table. */
      for (const [p, v] of decls) {
        if (!SPEC_PROPS.includes(p)) continue;
        if (/^(0|none|transparent|auto|inherit|initial|unset)$/.test(v.trim())) continue;
        out.set(p, v);
      }
    }
  }
  return [...out].map(([p, v]) => ({ prop: p, fa: FA[p] ?? p, value: v }));
}

/** Custom-property indirection: --_h is set on the root, used on the part. */
export function resolveLocals(cls, value) {
  if (!/var\(--_/.test(value)) return value;
  const locals = new Map();
  for (const [sel, decls] of rules()) {
    if (!sel.split(',').some(s => s.trim().startsWith(`.${cls}`))) continue;
    for (const [p, v] of decls) if (p.startsWith('--_')) locals.set(p, v);
  }
  return value.replace(/var\((--_[\w-]+)(?:,\s*([^)]+))?\)/g, (m, name, fb) => locals.get(name) ?? fb ?? m);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const model = buildModel();
  const flat = { ...model.base, ...model.modes.light };
  const out = {};
  for (const [sel] of rules()) {
    const m = /^\.(t-[a-z0-9_-]+)$/.exec(sel.trim());
    if (!m) continue;
    const specs = specFor(m[1]);
    if (specs.length) out[m[1]] = specs.map(s => {
      const value = resolveLocals(m[1], s.value);
      const tokens = [...value.matchAll(/var\((--t-[\w-]+)/g)].map(t => t[1]);
      /* --t-size-control-xl is size.control-xl, not size.control.xl: only the
         first hyphen of each group is a level. Try the longest match first. */
      const lookup = name => {
        const bare = name.replace('--t-', '');
        const parts = bare.split('-');
        for (let i = parts.length - 1; i >= 1; i--) {
          const key = parts.slice(0, i).join('.') + '.' + parts.slice(i).join('-');
          if (flat[key]) return flat[key].value;
        }
        return flat[bare]?.value;
      };
      return { ...s, value, tokens, resolved: tokens.map(lookup).filter(Boolean) };
    });
  }
  mkdirSync(join(ROOT, 'source', 'generated'), { recursive: true });
  writeFileSync(join(ROOT, 'source', 'generated', 'specs.json'), JSON.stringify(out, null, 1));
  console.log(`✓ specs for ${Object.keys(out).length} classes → source/generated/specs.json`);
}
