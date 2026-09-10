# Torob Design System — rules for AI agents

This project uses the Torob Design System (Rahnamā). An MCP server named
"torob-design" exposes it. Use it — do not guess at values.

## Before writing any UI
1. search_components(<what you are building>) — it also accepts legacy Sketch
   names like "Button / Red / Default", "Store-Card/VLP", "POI/Cluster".
2. get_component(<name>) for props, HTML and the accessibility contract.
3. get_guidelines("rtl") and get_guidelines("glass") if either is involved.

## Non-negotiable
- NEVER hardcode a colour, spacing, radius or duration. get_tokens() first.
- NEVER write a physical direction: no margin-left, padding-right, left:,
  text-align:right, border-left. Logical properties only. This product is RTL.
- NEVER use negative letter-spacing. It breaks Persian letterform joining.
- Persian numerals (۰۱۲۳۴۵۶۷۸۹) with ٬ separators in product surfaces.
- Icon-only buttons require aria-label.
- Touch targets >= 44px.
- At most 3 glass surfaces per viewport; never on repeating elements.
- Direction lives on <html dir>, never on a component.

## Before you present code
Run validate_code() on it and fix everything it reports.

## Quick reference
Surfaces   var(--t-bg-canvas) var(--t-bg-fog) var(--t-bg-subtle)
Text       var(--t-fg-default) var(--t-fg-secondary) var(--t-fg-disabled)
Borders    var(--t-border-subtle) var(--t-border-default) var(--t-border-control)
Actions    var(--t-action-primary-bg) var(--t-action-accent-bg)
Spacing    var(--t-space-1..20)   4px grid
Radius     var(--t-radius-md)     12px default
Motion     var(--t-duration-micro|standard|sheet) + var(--t-easing-out)
Glass      class="t-glass" / --list / --solid / --selected / --filters
