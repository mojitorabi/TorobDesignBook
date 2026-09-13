/* Standard names.

   The first pass of this system named things the way the Sketch file did, or
   the way a stylesheet author types quickly: `bg`, `fg`, `btn`, `check`,
   `action-red`. Those are fine to type and bad to read. Every mature system —
   Material 3, Apple's HIG, Carbon, Polaris — names a semantic token by the
   ROLE it plays, spells the role out, and keeps colour words for the palette
   underneath.

   So the rules here are four:

     1. A semantic colour lives under `color.`, like every other system's
        semantic layer, so `--t-color-…` is one prefix you can scan for.
     2. Surfaces are `surface`, text on them is `on-surface`, lines are
        `outline`. That is the Material 3 vocabulary and it is the closest
        thing the industry has to a lingua franca.
     3. Intent, not pigment: `action-primary`, not `action-red`. Intent
        survives a rebrand; red does not. The class modifiers already had this
        pair (`--red` / `--primary`) — this makes the intent name the real one.
     4. No abbreviations in a public name. `button`, not `btn`. `checkbox`,
        not `check`. `line-height`, not `leading`.

   Nothing is broken by this. Every old token is still defined, as an alias of
   its new name, and every old class still selects, because css-bundle.mjs
   expands a renamed class to `:is(.new, .old)` — specificity-neutral, since
   `:is()` takes the specificity of its most specific argument and both are
   plain classes. The compatibility layer is generated from this file, so it
   cannot drift, and `rename-check.mjs` fails the build if an old name stops
   resolving. */

/* ── Tokens ───────────────────────────────────────────────────────────────
   Written in dotted token-path form (the form the DTCG files use), not CSS
   custom-property form: `bg.canvas`, not `--t-bg-canvas`. The build converts. */

const statusRoles = (intent) => ({
  [`status.${intent}.bg`]:       `color.status.${intent}.container`,
  [`status.${intent}.fg`]:       `color.status.${intent}.on-container`,
  [`status.${intent}.border`]:   `color.status.${intent}.outline`,
  [`status.${intent}.solid`]:    `color.status.${intent}.solid`,
  [`status.${intent}.on-solid`]: `color.status.${intent}.on-solid`,
});

/* The four action families do not all carry the same roles — black has no
   gradient, blue has the soft pair, red has no ghost border. The map lists
   every role any family uses; a pair whose token does not exist is filtered
   out where the map is consumed, against the built model, so this file stays
   declarative and cannot go stale when a role is added. */
const actionRoles = (from, to) => Object.fromEntries(
  ['bg', 'bg-gradient', 'bg-hover', 'bg-active', 'border', 'fg',
   'outline-fg', 'outline-border', 'ghost-fg', 'ghost-border',
   'ghost-border-hover', 'ghost-bg-hover', 'soft-bg', 'soft-fg']
    .map(role => [`action.${from}.${role}`, `color.action.${to}.${role}`]));

export const TOKEN_RENAMES = {
  /* Surfaces — Material's `surface` family. "fog" and "canvas" were Torob's
     own words for two greys; they said nothing about which sits on top. */
  'bg.canvas':          'color.surface',
  'bg.fog':             'color.surface-raised',
  'bg.subtle':          'color.surface-container',
  'bg.sunken':          'color.surface-sunken',
  'bg.inverse':         'color.surface-inverse',
  'bg.scrim':           'color.scrim',
  'bg.store-card':      'color.surface-store-card',
  'bg.store-card-rule': 'color.outline-store-card',

  /* Text and icons on a surface. `on-` is the standard prefix for "this is
     what goes on top of that". */
  'fg.default':   'color.on-surface',
  'fg.secondary': 'color.on-surface-variant',
  'fg.disabled':  'color.on-surface-disabled',
  'fg.inverse':   'color.on-surface-inverse',
  'fg.brand':     'color.brand',
  'fg.link':      'color.link',
  'fg.on-solid':  'color.on-solid',

  /* Lines. A border colour and a border WIDTH were both called `border.*`,
     which is why `--t-border-thin` and `--t-border-default` looked like the
     same kind of thing and were not. */
  'border.subtle':   'color.outline-subtle',
  'border.default':  'color.outline',
  'border.control':  'color.outline-control',
  'border.strong':   'color.outline-strong',
  'border.selected': 'color.outline-selected',
  'border.focus':    'color.focus-ring',
  'border.hairline': 'border.width.hairline',
  'border.thin':     'border.width.thin',
  'border.thick':    'border.width.thick',

  ...actionRoles('red', 'primary'),
  ...actionRoles('blue', 'accent'),
  ...actionRoles('black', 'neutral'),
  ...actionRoles('disabled', 'disabled'),

  ...statusRoles('positive'), ...statusRoles('caution'), ...statusRoles('critical'),
  ...statusRoles('info'), ...statusRoles('guarantee'), ...statusRoles('neutral'),
  'status.dot-halo': 'color.status.dot-halo',

  /* Stacking order. `z` alone is a coordinate; `z-index` is the property. */
  'z.base': 'z-index.base', 'z.raised': 'z-index.raised', 'z.sticky': 'z-index.sticky',
  'z.header': 'z-index.header', 'z.drawer': 'z-index.drawer', 'z.modal': 'z-index.modal',
  'z.popover': 'z-index.popover', 'z.toast': 'z-index.toast', 'z.tooltip': 'z-index.tooltip',

  'brand.plate-bg': 'color.brand-plate.bg',
  'brand.plate-fg': 'color.brand-plate.fg',
};

/* Commerce and map colours keep their meaning, and only move under `color.`
   so the semantic layer is one prefix. */
for (const p of ['price', 'price-from', 'discount', 'ad', 'oos', 'open', 'closed',
  'official', 'distance', 'kalabarg-bg', 'ad-badge', 'ad-badge-fg', 'guarantee-bg',
  'guarantee-accent', 'holo-text', 'open-dot', 'closed-dot', 'rating-bg', 'rating-fg',
  'rating-star', 'perk-bg', 'distance-near', 'open-text'])
  TOKEN_RENAMES[`commerce.${p}`] = `color.commerce.${p}`;

for (const p of ['pill-fg', 'poi', 'poi-selected', 'poi-dot', 'poi-ring', 'poi-fg',
  'poi-selected-ring', 'cluster-bg', 'cluster-fg', 'label', 'label-halo', 'me', 'me-halo'])
  TOKEN_RENAMES[`map.${p}`] = `color.map.${p}`;

/* "Leading" is typesetter's jargon for the CSS property `line-height`. */
for (const n of [12, 14, 16, 18, 20, 24, 30, 36])
  TOKEN_RENAMES[`font.leading.${n}`] = `font.line-height.${n}`;

/* ── Classes ──────────────────────────────────────────────────────────────
   Only abbreviations and compounds that read wrong. A component whose name is
   already the industry word (`.t-badge`, `.t-toast`, `.t-sheet`) is left
   alone: renaming for its own sake costs everyone and teaches nobody. */
export const CLASS_RENAMES = {
  't-btn':        't-button',
  't-btn-split':  't-button-split',
  't-icon-btn':   't-icon-button',
  't-check':      't-checkbox',
  't-inline-msg':'t-inline-message',
  't-taginput':   't-tag-input',
  't-datefield':  't-date-field',
  't-cal':        't-calendar',
  't-dl':         't-description-list',
  't-navitem':    't-nav-item',
  't-navgroup':   't-nav-group',
  't-buybox':     't-buy-box',
  't-num-fa':     't-numerals-fa',
  't-num-tabular':'t-numerals-tabular',
  't-h1': 't-heading-1', 't-h2': 't-heading-2', 't-h3': 't-heading-3',
  't-h4': 't-heading-4', 't-h5': 't-heading-5',
};

/* ── Modifiers ────────────────────────────────────────────────────────────
   Both names already exist and share a rule. This says which one the book
   prints and which one it calls the old name. Intent wins. */
export const MODIFIER_CANONICAL = {
  'red': 'primary', 'blue': 'accent', 'black': 'neutral', 'black-ghost': 'outline',
};

/* CSS custom-property form of a dotted token path. */
export const cssVar = path => '--t-' + path.replace(/\./g, '-');
