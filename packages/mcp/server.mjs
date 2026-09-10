#!/usr/bin/env node
/**
 * Torob Design System — MCP server.
 *
 * Exposes the design system to AI coding agents so generated code uses real
 * tokens, real component APIs and real icon names instead of plausible-looking
 * inventions. Everything it serves is read from the generated artefacts, so it
 * cannot drift from the website or the CSS package.
 *
 * Transport: stdio.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema, ListToolsRequestSchema,
  ListResourcesRequestSchema, ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.TOROB_DS_ROOT ?? join(HERE, '..', '..');
const read = p => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const readText = p => existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), 'utf8') : '';

/* ── data ───────────────────────────────────────────────────────── */
const tokens = read('packages/css/dist/tokens.resolved.json');
const icons = read('packages/icons/index.json');
const iconGeo = read('packages/icons/icons.json');
const components = read('packages/mcp/components.json');
const guidelines = read('packages/mcp/guidelines.json');

const cssVar = p => '--t-' + p.replace(/\./g, '-');
const ok = text => ({ content: [{ type: 'text', text }] });
const stripTags = s => String(s ?? '').replace(/<[^>]+>/g, '');

/* ── tools ──────────────────────────────────────────────────────── */
const TOOLS = [
  {
    name: 'search_components',
    description:
      'Find Torob components by name, purpose, or LEGACY Sketch symbol name. Use this first whenever a task mentions a UI element. Searching a legacy name (e.g. "Button / Red / Default", "Store-Card/VLP", "POI/Cluster") returns the component that replaced it.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Name, purpose, or legacy Sketch symbol name.' },
        group: { type: 'string', description: 'Optional filter: Actions, Inputs, Navigation, Commerce, Feedback, Overlays.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_component',
    description:
      'Full specification for one component: props, variants, states, CSS classes, ready-to-paste HTML and React, accessibility contract, responsive behaviour, do/don\'t rules, and every legacy Sketch name it replaces. Call this before writing any component markup.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Component name or slug, e.g. "Button" or "bottom-sheet".' },
        format: { type: 'string', enum: ['full', 'code', 'props'], description: 'Default full.' },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_tokens',
    description:
      'Design tokens, resolved. Returns real values in the format you ask for. Use this instead of guessing a hex code, a spacing value, or a radius — every hardcoded value is a bug.',
    inputSchema: {
      type: 'object',
      properties: {
        filter: { type: 'string', description: 'Substring, e.g. "glass", "status", "action.primary", "radius", "commerce".' },
        format: { type: 'string', enum: ['css', 'js', 'json', 'scss', 'swift', 'android'], description: 'Default css.' },
        mode: { type: 'string', enum: ['light', 'dark', 'both'], description: 'Default both.' },
      },
    },
  },
  {
    name: 'resolve_token',
    description: 'Trace one semantic token to its primitive and final value in both modes. Use when you need to know what --t-fg-default actually is.',
    inputSchema: { type: 'object', properties: { token: { type: 'string', description: 'e.g. "fg.default" or "--t-fg-default".' } }, required: ['token'] },
  },
  {
    name: 'search_icons',
    description: 'Search the 2,041 IBM Carbon icons in the Torob set by name, alias or category. Returns exact names plus whether an RTL mirror twin exists. Never invent an icon name — search first.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        category: { type: 'string', description: 'Actions, Organization, Enterprise, Planning, Tools, Person, Brand, Status.' },
        limit: { type: 'number', description: 'Default 30.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_icon',
    description: 'SVG markup for one icon at 16 or 20px, plus its import snippet and RTL guidance.',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string' }, size: { type: 'number', enum: [16, 20], description: 'Default 20.' } },
      required: ['name'],
    },
  },
  {
    name: 'get_guidelines',
    description:
      'Design system rules for a topic: glass, rtl, motion, accessibility, responsive, naming, commerce, content. Read the relevant topic before writing UI — these encode decisions that are not obvious from the code.',
    inputSchema: {
      type: 'object',
      properties: { topic: { type: 'string', description: 'glass | rtl | motion | accessibility | responsive | naming | commerce | content | all' } },
      required: ['topic'],
    },
  },
  {
    name: 'validate_code',
    description:
      'Lint a snippet of HTML/CSS/JSX against the Torob Design System. Catches hardcoded colours, off-scale spacing, non-token radii, physical direction properties that break RTL, missing focus states, legacy class names, and glass budget violations. Run this on any UI you generate before presenting it.',
    inputSchema: {
      type: 'object',
      properties: { code: { type: 'string' }, language: { type: 'string', enum: ['css', 'html', 'jsx', 'auto'], description: 'Default auto.' } },
      required: ['code'],
    },
  },
  {
    name: 'get_migration',
    description: 'Old Sketch symbol name → new component name and class. Use when working with existing Torob code or designs that still use the legacy vocabulary.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'Legacy name, or omit for the full map.' } } },
  },
];

/* ── implementations ────────────────────────────────────────────── */
function searchComponents({ query, group }) {
  const q = query.toLowerCase();
  const hits = components.filter(c => {
    if (group && c.group.toLowerCase() !== group.toLowerCase()) return false;
    const hay = [c.name, c.slug, c.group, c.summary, ...(c.legacy ?? []), ...(c.classes ?? [])].join(' ').toLowerCase();
    return hay.includes(q);
  });
  if (!hits.length) {
    return ok(`No component matches "${query}".\n\nAvailable components:\n${components.map(c => `  ${c.name} (${c.group}) — ${c.summary}`).join('\n')}`);
  }
  return ok(hits.map(c => {
    const viaLegacy = (c.legacy ?? []).filter(l => l.toLowerCase().includes(q));
    return `## ${c.name}  [${c.group}]  status: ${c.status}
${c.summary}
CSS: ${(c.classes ?? []).join(', ') || '—'}
Docs: /components/${c.slug}.html${viaLegacy.length ? `\nMatched legacy name(s): ${viaLegacy.join(', ')}  →  use ${c.name}` : ''}`;
  }).join('\n\n'));
}

function getComponent({ name, format = 'full' }) {
  const key = name.toLowerCase().replace(/\s+/g, '-');
  const c = components.find(x => x.name.toLowerCase() === name.toLowerCase() || x.slug === key);
  if (!c) return ok(`No component named "${name}". Try search_components first.`);

  if (format === 'props') {
    return ok(`# ${c.name} props\n\n${(c.props ?? []).map(p => `- ${p[0]}: ${p[1]} (default ${p[2]}) — ${stripTags(p[3])}`).join('\n')}`);
  }
  if (format === 'code') {
    return ok(`# ${c.name}\n\n## HTML\n\`\`\`html\n${(c.specimens ?? [])[0]?.html ?? ''}\n\`\`\`\n\n## React\n\`\`\`jsx\n${c.react ?? ''}\n\`\`\``);
  }

  const parts = [
    `# ${c.name}`,
    `${c.summary}`,
    ``,
    `- Group: ${c.group}`,
    `- Status: ${c.status}`,
    `- CSS classes: ${(c.classes ?? []).join(', ') || '—'}`,
    `- Docs: /components/${c.slug}.html`,
  ];
  if (c.legacy?.length) parts.push(``, `## Replaces these legacy Sketch symbols`, ...c.legacy.map(l => `- ${l}`));
  if (c.description?.length) parts.push(``, `## Why it is shaped this way`, ...c.description.map(d => stripTags(d)));
  if (c.props?.length) parts.push(``, `## Props`, ...c.props.map(p => `- \`${p[0]}\`: ${stripTags(p[1])} — default \`${p[2]}\`. ${stripTags(p[3])}`));
  if (c.anatomy?.length) parts.push(``, `## Anatomy`, ...c.anatomy.map(a => `- ${a[0]}: ${stripTags(a[1])}`));
  if (c.use?.length) parts.push(``, `## Do`, ...c.use.map(u => `- ${stripTags(u)}`));
  if (c.avoid?.length) parts.push(``, `## Don't`, ...c.avoid.map(a => `- ${stripTags(a)}`));
  if (c.a11y?.length) parts.push(``, `## Accessibility contract`, ...c.a11y.map(a => `- ${stripTags(a)}`));
  if (c.responsive) parts.push(``, `## Responsive`, stripTags(c.responsive));
  if (c.specimens?.length) {
    parts.push(``, `## HTML`);
    for (const s of c.specimens) parts.push(``, `### ${s.label}`, '```html', s.html, '```');
  }
  if (c.react) parts.push(``, `## React`, '```jsx', c.react, '```');
  return ok(parts.join('\n'));
}

function getTokens({ filter = '', format = 'css', mode = 'both' }) {
  const f = filter.toLowerCase();
  const pick = obj => Object.entries(obj).filter(([p]) => !f || p.toLowerCase().includes(f));
  const base = pick(tokens.base);
  const light = pick(tokens.modes.light);
  const dark = pick(tokens.modes.dark);
  const val = t => Array.isArray(t.value) ? t.value.join(', ') : t.value;

  if (format === 'json') {
    return ok(JSON.stringify({
      base: Object.fromEntries(base.map(([p, t]) => [cssVar(p), val(t)])),
      ...(mode !== 'dark' && { light: Object.fromEntries(light.map(([p, t]) => [cssVar(p), val(t)])) }),
      ...(mode !== 'light' && { dark: Object.fromEntries(dark.map(([p, t]) => [cssVar(p), val(t)])) }),
    }, null, 2));
  }
  if (format === 'js') {
    return ok(base.concat(light).map(([p, t]) => `export const ${p.replace(/[.\-]/g, '_')} = ${JSON.stringify(val(t))};`).join('\n'));
  }
  if (format === 'scss') {
    return ok(base.concat(light).map(([p, t]) => `$t-${p.replace(/\./g, '-')}: ${val(t)};`).join('\n'));
  }
  if (format === 'swift') return ok(readText('packages/css/dist/TorobTokens.swift').split('\n').filter(l => !f || l.toLowerCase().includes(f)).join('\n'));
  if (format === 'android') return ok(readText('packages/css/dist/colors.xml').split('\n').filter(l => !f || l.toLowerCase().includes(f)).join('\n'));

  const out = [];
  if (base.length) out.push('/* primitives, material and scale */', ...base.map(([p, t]) => `${cssVar(p)}: ${val(t)};`));
  if (mode !== 'dark' && light.length) out.push('', '/* semantic — light */', ...light.map(([p, t]) => `${cssVar(p)}: ${val(t)};`));
  if (mode !== 'light' && dark.length) out.push('', '/* semantic — dark */', ...dark.map(([p, t]) => `${cssVar(p)}: ${val(t)};`));
  return ok(out.join('\n') || `No token matches "${filter}".`);
}

function resolveToken({ token }) {
  const key = token.replace(/^--t-/, '').replace(/-/g, '.');
  const tryKeys = [key, token.replace(/^--t-/, '').replace(/-/g, '.')];
  for (const k of tryKeys) {
    const l = tokens.modes.light[k], d = tokens.modes.dark[k], b = tokens.base[k];
    if (l || b) {
      return ok([
        `# var(${cssVar(k)})`,
        b ? `Tier: primitive/material` : `Tier: semantic`,
        l ? `Light: ${l.value}` : `Value: ${b.value}`,
        d ? `Dark:  ${d.value}` : '',
        (l ?? b).description ? `Note: ${(l ?? b).description}` : '',
      ].filter(Boolean).join('\n'));
    }
  }
  const near = Object.keys({ ...tokens.base, ...tokens.modes.light }).filter(k => k.includes(key.split('.')[0])).slice(0, 12);
  return ok(`Unknown token "${token}".${near.length ? `\n\nDid you mean:\n${near.map(n => '  ' + cssVar(n)).join('\n')}` : ''}`);
}

function searchIcons({ query, category, limit = 30 }) {
  const q = query.toLowerCase();
  const hits = icons.filter(i => {
    if (category && i.c.toLowerCase() !== category.toLowerCase()) return false;
    return (i.n + ' ' + i.f + ' ' + i.s + ' ' + (i.a ?? []).join(' ')).toLowerCase().includes(q);
  }).slice(0, limit);
  if (!hits.length) return ok(`No icon matches "${query}". Categories: Actions, Organization, Enterprise, Planning, Tools, Person, Brand, Status.`);
  return ok(`${hits.length} icon(s):\n\n` + hits.map(i =>
    `- ${i.n}  [${i.c} / ${i.s}]  sizes ${i.z.join(',')}${i.m ? '  — has RTL mirror twin: ' + i.n + '--mirror' : ''}`).join('\n'));
}

function getIcon({ name, size = 20 }) {
  const e = iconGeo[name];
  if (!e) return ok(`No icon "${name}". Use search_icons first — do not invent icon names.`);
  const g = e.sizes[size] ?? e.sizes[20] ?? Object.values(e.sizes)[0];
  return ok([
    `# ${name}  [${e.category} / ${e.subcategory}]`,
    e.mirror ? `RTL: render \`${e.mirror}\` instead of applying a CSS flip.` : `RTL: does not mirror (unless it is a chevron/arrow — then add class \`t-icon--directional\`).`,
    ``,
    '## Inline SVG',
    '```html',
    `<svg class="t-icon${size === 16 ? ' t-icon--sm' : ''}" viewBox="${g.viewBox}" fill="currentColor" aria-hidden="true">${g.content}</svg>`,
    '```',
    ``,
    '## Sprite',
    '```html',
    `<svg class="t-icon"><use href="/assets/sprite-${size}.svg#t-${name}"/></svg>`,
    '```',
  ].join('\n'));
}

function getGuidelines({ topic }) {
  if (topic === 'all') return ok(Object.entries(guidelines).map(([k, v]) => `# ${k}\n${v}`).join('\n\n---\n\n'));
  const g = guidelines[topic.toLowerCase()];
  if (!g) return ok(`No guideline "${topic}". Available: ${Object.keys(guidelines).join(', ')}.`);
  return ok(g);
}

/* The lint. This is the tool that actually enforces adoption. */
function validateCode({ code, language = 'auto' }) {
  const findings = [];
  const add = (sev, rule, msg, line) => findings.push({ sev, rule, msg, line });
  const lines = code.split('\n');

  const KNOWN_HEX = new Set(Object.values(tokens.base).concat(Object.values(tokens.modes.light), Object.values(tokens.modes.dark))
    .map(t => String(t.value).toUpperCase()));

  lines.forEach((ln, i) => {
    const n = i + 1;

    // Hardcoded colours
    for (const m of ln.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      if (ln.includes('--t-') && ln.trim().startsWith('--t-')) continue;   // a token definition is allowed
      const hex = m[0].toUpperCase();
      const known = KNOWN_HEX.has(hex);
      add('error', 'hardcoded-colour', `${m[0]} is a literal colour.${known ? ` It matches a token — use var(${cssVar(Object.entries({ ...tokens.base, ...tokens.modes.light }).find(([, t]) => String(t.value).toUpperCase() === hex)?.[0] ?? '')}) instead.` : ' Add a token rather than inlining it.'}`, n);
    }
    for (const m of ln.matchAll(/\brgba?\([^)]*\)/g)) {
      if (ln.trim().startsWith('--t-')) continue;
      add('warn', 'hardcoded-colour', `${m[0]} is a literal colour. Prefer a token or color-mix() on one.`, n);
    }

    // Physical direction — the RTL killer
    for (const m of ln.matchAll(/\b(margin|padding)-(left|right)\b/g))
      add('error', 'rtl-physical', `${m[0]} breaks RTL. Use ${m[1]}-inline-${m[2] === 'left' ? 'start' : 'end'}.`, n);
    for (const m of ln.matchAll(/(?<![\w-])(left|right)\s*:/g))
      if (!/background|object-|text-align|float/.test(ln))
        add('error', 'rtl-physical', `"${m[1]}:" breaks RTL. Use inset-inline-${m[1] === 'left' ? 'start' : 'end'}.`, n);
    if (/text-align\s*:\s*(left|right)/.test(ln))
      add('error', 'rtl-physical', 'text-align: left/right breaks RTL. Use start/end.', n);
    for (const m of ln.matchAll(/\bborder-(left|right)\b/g))
      add('error', 'rtl-physical', `${m[0]} breaks RTL. Use border-inline-${m[1] === 'left' ? 'start' : 'end'}.`, n);
    if (/\b(width|height)\s*:/.test(ln) && !/max-|min-|line-height|border/.test(ln))
      add('info', 'logical-size', 'Prefer inline-size / block-size over width / height.', n);

    // Off-scale spacing
    for (const m of ln.matchAll(/(?:margin|padding|gap|inset)[\w-]*\s*:\s*([^;{]+)/g)) {
      for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
        const px = parseFloat(v[1]);
        if (px !== 0 && px % 4 !== 0) add('warn', 'off-grid', `${px}px is off the 4px grid. Nearest tokens: ${Math.floor(px / 4) * 4}px, ${Math.ceil(px / 4) * 4}px.`, n);
      }
    }
    // Off-scale radius
    for (const m of ln.matchAll(/border-radius\s*:\s*([^;{]+)/g)) {
      for (const v of m[1].matchAll(/(\d+(?:\.\d+)?)px/g)) {
        const px = parseFloat(v[1]);
        if (![0, 4, 8, 12, 16, 24].includes(px)) add('warn', 'off-scale-radius', `${px}px is not on the radius scale (4/8/12/16/24). Default is var(--t-radius-md) = 12px.`, n);
      }
    }
    // Motion
    for (const m of ln.matchAll(/transition[\w-]*\s*:\s*[^;{]*?(\d+)ms/g)) {
      const ms = +m[1];
      if (![0, 1, 120, 220, 320, 480].includes(ms)) add('warn', 'off-scale-duration', `${ms}ms is not a duration token (120/220/320/480). Use var(--t-duration-*).`, n);
    }
    if (/letter-spacing\s*:\s*-/.test(ln))
      add('error', 'persian-tracking', 'Negative letter-spacing breaks Persian letterform joining. Never use it.', n);

    // A11y
    if (/outline\s*:\s*(none|0)/.test(ln) && !/:focus:not\(:focus-visible\)/.test(code))
      add('error', 'focus-removed', 'outline: none removes the focus ring. Replace it, or scope it to :focus:not(:focus-visible).', n);
    if (/<button[^>]*>\s*<svg/.test(ln) && !/aria-label/.test(ln))
      add('error', 'icon-button-unnamed', 'An icon-only button needs aria-label.', n);
    if (/<img(?![^>]*\balt=)/.test(ln)) add('error', 'img-no-alt', '<img> without alt.', n);
    if (/<div[^>]*onClick/.test(ln)) add('error', 'div-onclick', 'A clickable <div> is not keyboard reachable. Use <button>.', n);

    // Legacy names
    for (const c of components) for (const l of c.legacy ?? []) {
      if (l.length > 6 && ln.includes(l)) add('warn', 'legacy-name', `"${l}" is a legacy Sketch name. The component is now ${c.name} (${(c.classes ?? [])[0] ?? ''}).`, n);
    }
  });

  // Glass budget — a whole-file check, not a per-line one
  const glassCount = (code.match(/backdrop-filter|t-glass\b/g) ?? []).length;
  if (glassCount > 3) add('warn', 'glass-budget', `${glassCount} glass surfaces. The budget is 3 per viewport — backdrop-filter re-samples every frame and drops scroll frame rate on mid-range Android.`, 0);
  if (/t-glass[^"']*t-glass/.test(code)) add('error', 'glass-nested', 'Nested glass. The inner layer re-composites the outer one\'s output.', 0);

  const bySev = s => findings.filter(f => f.sev === s);
  const head = findings.length
    ? `${bySev('error').length} error(s), ${bySev('warn').length} warning(s), ${bySev('info').length} suggestion(s).`
    : 'Clean — no Torob Design System violations found.';
  return ok([head, '', ...findings
    .sort((a, b) => ({ error: 0, warn: 1, info: 2 })[a.sev] - ({ error: 0, warn: 1, info: 2 })[b.sev] || a.line - b.line)
    .map(f => `${f.sev.toUpperCase().padEnd(5)} ${f.line ? `line ${f.line}` : 'file'}  [${f.rule}]  ${f.msg}`)].join('\n'));
}

function getMigration({ name }) {
  const rows = [];
  for (const c of components) for (const l of c.legacy ?? []) rows.push([l, c.name, (c.classes ?? [])[0] ?? '', c.slug]);
  if (!name) {
    return ok(`# Legacy Sketch name → component  (${rows.length} mappings)\n\n` +
      rows.sort((a, b) => a[0].localeCompare(b[0])).map(r => `${r[0]}\n  → ${r[1]}   ${r[2]}   /components/${r[3]}.html`).join('\n'));
  }
  const q = name.toLowerCase();
  const hits = rows.filter(r => r[0].toLowerCase().includes(q) || r[1].toLowerCase().includes(q));
  if (!hits.length) return ok(`No mapping for "${name}".`);
  return ok(hits.map(r => `${r[0]}\n  → ${r[1]}   ${r[2]}   /components/${r[3]}.html`).join('\n'));
}

const HANDLERS = {
  search_components: searchComponents, get_component: getComponent,
  get_tokens: getTokens, resolve_token: resolveToken,
  search_icons: searchIcons, get_icon: getIcon,
  get_guidelines: getGuidelines, validate_code: validateCode,
  get_migration: getMigration,
};

/* ── wiring ─────────────────────────────────────────────────────── */
const server = new Server(
  { name: 'torob-design-system', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async req => {
  const fn = HANDLERS[req.params.name];
  if (!fn) return { content: [{ type: 'text', text: `Unknown tool: ${req.params.name}` }], isError: true };
  try {
    return fn(req.params.arguments ?? {});
  } catch (err) {
    return { content: [{ type: 'text', text: `Error in ${req.params.name}: ${err.message}` }], isError: true };
  }
});

const RESOURCES = [
  { uri: 'torob://tokens/all.json', name: 'All design tokens (resolved)', mimeType: 'application/json' },
  { uri: 'torob://tokens/tokens.css', name: 'CSS custom properties', mimeType: 'text/css' },
  { uri: 'torob://components/index', name: 'Component index', mimeType: 'text/markdown' },
  { uri: 'torob://icons/index.json', name: 'Icon index (2,041 icons)', mimeType: 'application/json' },
  { uri: 'torob://guidelines/all', name: 'All design guidelines', mimeType: 'text/markdown' },
  { uri: 'torob://migration/map', name: 'Legacy name → component map', mimeType: 'text/markdown' },
];

server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: RESOURCES }));

server.setRequestHandler(ReadResourceRequestSchema, async req => {
  const { uri } = req.params;
  const text =
    uri === 'torob://tokens/all.json' ? JSON.stringify(tokens, null, 2) :
    uri === 'torob://tokens/tokens.css' ? readText('packages/css/dist/tokens.css') :
    uri === 'torob://components/index' ? components.map(c => `- ${c.name} (${c.group}): ${c.summary}`).join('\n') :
    uri === 'torob://icons/index.json' ? JSON.stringify(icons) :
    uri === 'torob://guidelines/all' ? Object.entries(guidelines).map(([k, v]) => `# ${k}\n${v}`).join('\n\n') :
    uri === 'torob://migration/map' ? getMigration({}).content[0].text :
    null;
  if (text == null) throw new Error(`Unknown resource: ${uri}`);
  return { contents: [{ uri, mimeType: RESOURCES.find(r => r.uri === uri).mimeType, text }] };
});

await server.connect(new StdioServerTransport());
console.error('Torob Design System MCP server ready (stdio).');
