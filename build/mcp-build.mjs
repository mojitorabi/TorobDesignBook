#!/usr/bin/env node
/* Generate the MCP server's data from the same registry the website uses,
   so the two can never disagree. */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';
import { loadComponents } from './site-lib.mjs';

const components = await loadComponents();

/* Derive the CSS class list from each component's own specimens — the classes
   it actually uses, not a hand-kept list that rots. */
const BLOCK = /\bt-[a-z0-9-]+\b/g;
for (const c of components) {
  const found = new Map();
  for (const s of c.specimens ?? []) for (const m of (s.html ?? '').matchAll(BLOCK)) found.set(m[0], (found.get(m[0]) ?? 0) + 1);
  // The component's own root block first, then its modifiers, then the rest.
  const root = [...found.keys()].find(k => k === `t-${c.slug}`) ??
               [...found.keys()].sort((a, b) => found.get(b) - found.get(a))[0];
  c.classes = [root, ...[...found.keys()].filter(k => k !== root && k.startsWith(root ?? '~'))].filter(Boolean);
}

writeFileSync(join(ROOT, 'packages/mcp/components.json'), JSON.stringify(components, null, 1));

const guidelines = {
  glass: `# Torob Glass

Thin, not thick. Apple uses 50-80px blur with a saturation lift and specular
highlights. Torob uses a translucent tint, one hairline edge, and a shadow small
enough to read as a lifted edge.

Recipe (light / dark):
  tint    rgba(255,255,255,0.30) / rgba(33,43,54,0.30)
  edge    1px #FFFFFF            / 1px #212B36
  shadow  -0.5px 0.5px 1px #CBD5E1 / -0.5px 0.5px 1px #475569
  blur    16px  (a quarter of Apple's; set --t-glass-blur:0 for the Sketch original)
  saturate 1    (no vibrancy lift — that is the most Apple-signature part)

Opacity ladder — the only lever that changes:
  .t-glass            30%  a surface floating ABOVE content (bars, sheets, rails)
  .t-glass--list      50%  a sheet content scrolls INSIDE
  .t-glass--solid     60%  resting, level with its surroundings
  .t-glass--selected  60%  + 0.5px blue ring
  .t-glass--filters   30%  + outside edge + top highlight (a rail above a list)

Elevation on glass is BINARY: the hairline micro-shadow is present or absent.
There is no shadow ramp on glass; that belongs to opaque surfaces.

HARD BUDGET: at most 3 backdrop-filtered surfaces per viewport.
backdrop-filter re-samples everything behind it every frame. Mid-range Android
is the target and it drops scroll frames past three layers.
- Never on repeating elements (cards, rows, cells).
- Never nested.
- Animate opacity and blur TOGETHER; blur alone reads as lag.

Degradation: @supports not (backdrop-filter) and
@media (prefers-reduced-transparency: reduce) both fall back to an opaque
surface in the same hue with identical geometry, so nothing reflows.`,

  rtl: `# RTL & Persian

Torob is Persian. RTL is the direction the system is BUILT in, not a mode it
supports. Every text style in the design source is align:right.

THE RULE: never write a physical direction.
  margin-left/right   -> margin-inline-start/end
  padding-top/bottom  -> padding-block-start/end
  left / right        -> inset-inline-start/end
  text-align: right   -> text-align: start
  width / height      -> inline-size / block-size
  border-left         -> border-inline-start
  border-radius 4-corner shorthand -> border-start-start-radius etc.

Icons, three cases:
  1. Directional (chevron, arrow, back): add class t-icon--directional. Mirrors.
  2. Carbon mirror twins: 5 icons ship a purpose-drawn --mirror variant
     (search--locate, run, list--checked, list--numbered, summary--KPI).
     Render the twin; do NOT CSS-flip, which also mirrors embedded glyphs.
  3. Everything else (camera, heart, phone): does NOT mirror. Flipping these is
     the most common RTL mistake and makes the UI feel broken.

Numerals: Persian-Indic ۰۱۲۳۴۵۶۷۸۹, ٬ thousands separator, ٫ decimal.
Always tabular figures in lists (.t-num-tabular).
Never split a number across elements — a screen reader reads it as two numbers.

Bidi: Latin product names sit inside Persian sentences constantly. Wrap any run
whose direction you cannot predict in .t-bidi (unicode-bidi: isolate). Phone
numbers, URLs and model codes are LTR runs — isolate them.

Typography: NEVER negative letter-spacing. Persian is cursive; tightening breaks
the joins between letters.

Motion has direction too. --t-dir is 1 in RTL, -1 in LTR, for the few animations
(drawer, side panel, toggle thumb) that a logical property cannot express.`,

  motion: `# Motion

A shopping tool used one-handed on a bus. Motion confirms; it never performs.

Durations: micro 120ms (hover/press/toggle) · standard 220ms (popover/tab/
accordion) · sheet 320ms (bottom sheet/drawer/modal) · slow 480ms (shimmer).

Easing:
  out     cubic-bezier(0.22, 1, 0.36, 1)   DEFAULT. Arrives fast, settles soft.
  in-out  cubic-bezier(0.65, 0, 0.35, 1)   reversible motion only
  in      cubic-bezier(0.55, 0, 1, 0.45)   exits only
  spring  cubic-bezier(0.34, 1.56, 0.64, 1) ONE overshoot, reserved for the
          favourites heart. Do not spread it.

Rules:
- Animate from an already-visible default. Nothing fades in from nothing.
- transform and opacity only. Never width/height/top/left.
- Glass animates opacity AND blur together.
- One authored moment per screen, not an entrance on every section.
- No parallax, no scroll-jacking, anywhere in a shopping flow.

prefers-reduced-motion collapses everything to 1ms. The one exception: the
Spinner slows rather than stopping — a frozen spinner reads as a crash.`,

  accessibility: `# Accessibility

Target: WCAG 2.1 AA. The palette is machine-verified — build/contrast-check.mjs
runs 28 foreground/background pairs across both modes and exits non-zero on any
failure. It is a gate, not a report.

- Text contrast >= 4.5:1; large text and non-text >= 3:1.
- border.control (not border.default) is the token for control boundaries;
  border.default is decorative and deliberately below 3:1.
- Touch targets >= 44px, even where the visual control is 24 or 32px. Buttons
  carry a transparent ::after that expands the target on coarse pointers.
- Focus: 2px --t-border-focus at 2px offset. Never removed, only replaced.
  outline:none is only acceptable inside :focus:not(:focus-visible).
- Icon-only controls require aria-label. There is no unlabelled variant.
- Never colour alone. Status badges pair colour with a word; current nav items
  pair colour with weight.
- Overlays: focus trap, focus return to trigger, Escape to close, aria-modal,
  body scroll locked (not just covered).
- Collapsed content uses the hidden attribute, not height:0 — it must leave the
  accessibility tree.
- Live regions: aria-live="polite" for results and toasts; assertive only for
  critical. A toast carrying the only path to an action is an accessibility
  failure — and it must not auto-dismiss before a keyboard user can reach it.
- A map alone is not accessible. Always provide the list equivalent.`,

  responsive: `# Responsive

Every screen in the design source is 375px. These breakpoints are the decision
about how it grows, derived from the source's own numbers.

  xs 360  small Android — the true floor, must not break
  sm 375  design origin (343 buy-box = 375 - 32 gutters)
  md 768  sheets become side panels, menus become popovers, grid goes 4-up
  lg 1024 persistent filter rail
  xl 1280 map and list side by side, grid 6-up
  2xl 1600 content capped, gutters grow

Adaptation:
  product grid  2 -> 3 (480) -> 4 (768) -> 5 (1024) -> 6 (1280)
  bottom sheet  sheet -> 420px inline-end panel at md
  menu          bottom sheet -> popover at md
  navigation    BottomNav -> top nav at md
  toast         full-width inset -> 380px inline-end at md

Corner cases that actually happen: sub-360 widths, long Persian store names
(truncate at the container, never mid-word), Latin runs inside Persian
(.t-bidi), 300% zoom (single column reflow), notch/home indicator
(env(safe-area-inset-*)), landscape phone (sheets cap at 90dvh), slow images
(skeletons match final dimensions so nothing shifts).

Test at 320, 360, 375, 768, 1024, 1440. 320 is the one people forget.`,

  naming: `# Naming

Components: PascalCase, named by ROLE not by colour or by where they first
appeared. Button/Red became variant="primary" — intent survives a rebrand,
colour does not.

State is a state, not a component. The Sketch source shipped
Button/Red/Hover as a separate master from Button/Red/Default; in code these
are CSS pseudo-classes and data- attributes.

Theme is a token, not a component. Store-Card/.../Light and .../Dark are one
component under a theme.

CSS: t- prefix, BEM-ish.
  block      .t-button
  modifier   .t-btn--primary
  element    .t-store-card__head
  state      :hover, :disabled, [aria-pressed], [data-loading]

Tokens: --t-{category}-{role}-{variant}-{state}
  primitive  --t-color-sky-800     (never used by product code)
  semantic   --t-fg-default        (this is the layer you use)
  component  --t-action-primary-bg-hover

Props: variant (intent), size, block, loading, disabled. Booleans read as
is/has where they describe state.

Every renamed component carries its legacy Sketch names in the docs and in
get_migration, so the old vocabulary still resolves.`,

  commerce: `# Commerce vocabulary

Torob-specific meanings that are load-bearing. Do not substitute generic status
colours for these.

  price        the number itself — Sky 800 / Sky 100
  price-from   "از ..." prefix and seller-count line — secondary
  discount     brand red
  ad           آگهی — a legal disclosure. ALWAYS shown, ALWAYS real text,
               deliberately quiet. Never hide it to lift click-through.
  oos          ناموجود — GREY, not red. Unavailability is not an error.
  open         باز الان — green dot + word
  official     نمایندگی رسمی — blue
  guarantee    ضمانت ترب — indigo. The Torob trust mark.
               (The Sketch swatches misspell it "Gaurantee".)
  distance     secondary, always leading in a nearby card — it is the reason
               the shopper is on that screen.

Price formatting: Persian numerals, ٬ separator, tabular figures, تومان always
secondary and never the same size as the number. Use "از X" when several
sellers offer the product.

Never overload brand red. It means price, brand, or destructive. Using it for
selection kills the price signal — selection is always blue.`,

  content: `# Content & voice

Persian, direct, no filler. The user is mid-task on a phone.

- Controls name their outcome: «مشاهده فروشندگان», not «بیشتر».
- Errors name the problem AND the recovery, in that order. An error without a
  next step is a dead end.
- Empty states distinguish "no results" from "nothing here yet" — different
  copy, different action. Always offer the loosest filter to drop.
- Never blame the user for a filter combination the UI allowed.
- Confirmation dialogs name the outcomes: «حذف آدرس» / «انصراف», never OK/Cancel.
- Numbers in Persian numerals throughout product surfaces.
- Toast copy is one line. If it needs two, it is an Alert.`,
};

writeFileSync(join(ROOT, 'packages/mcp/guidelines.json'), JSON.stringify(guidelines, null, 1));

console.log(`✓ MCP data: ${components.length} components, ${Object.keys(guidelines).length} guideline topics`);
console.log('  classes derived:', components.slice(0, 4).map(c => `${c.name}→${c.classes[0]}`).join('  '));
