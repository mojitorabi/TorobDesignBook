# DESIGN.md — Torob Design System visual world

Authority: `Torob Tokens.sketch` + `T IBM Icons (16px, 20px).sketch`. This file records the
world extracted from that source and the decisions taken where the source was silent.
Where they disagree, the extracted value wins and the decision is marked **[NEW]**.

## The material: Torob Glass

Not Apple glass. Apple's glass is thick — 50–80px blur, saturation boost, layered specular
highlights, a lens that distorts what is behind it. Torob glass is **thin**: a translucent
sheet of the surface colour, one hairline edge, and a shadow so small it reads as a
lifted edge rather than a drop shadow.

```
Light   fill #FFFFFF @ 30%   hairline 1px #FFFFFF   shadow -0.5 0.5 1  #CBD5E1
Dark    fill #212B36 @ 30%   hairline 1px #212B36   shadow -0.5 0.5 1  #475569
```

**Opacity ladder** — the only lever that changes:
- `30%` — floating surface over content (bars, sheets, filter rails)
- `50%` — list background, a sheet that content scrolls *inside*
- `60%` — selected / resting, no elevation

**Elevation is binary.** A glass surface either has the hairline micro-shadow or it does
not. There is no shadow ramp on glass. Depth beyond that is expressed by opacity and by
the `0.5px #60A5FA` selection ring.

**[NEW] Backdrop blur = 16px.** The source has no blur at all — translucency alone. Over a
map or a dense product grid that reads muddy, not glassy. 16px is a quarter of Apple's,
enough to separate figure from ground and no more. Token `--t-glass-blur`; set to `0` to
return exactly to the Sketch source. Saturation stays at 100% — no vibrancy boost.

**Budget:** at most **3** concurrent blurred surfaces per viewport. Below that, glass is
free. Above it, mid-range Android drops frames on scroll. Enforced by lint, not discipline.

## Colour

Neutral ramp is **Sky** and it inverts wholesale between modes — this is the spine of the
system. Semantic families: Blue (accent/info), Red (brand + critical), Green (positive),
Yellow (caution), Purple, Orange, Guarantee (indigo — the ضمانت ترب trust mark).

- Brand `#D73948`. Fixed. Never re-tinted.
- Two gradients only: Red `#F04151 → #D73948`, Blue `#3A75E6 → #3468CC`. Buttons only.
- Selection is always Blue 300 `#60A5FA`, at 0.5px. Never brand red — red means price,
  brand, or destructive, and overloading it kills the price signal.

**[NEW]** Dark mode gets its own status ramps. The source reuses light values verbatim,
which puts `#003D01` green on a `#15202B` ground. Every status colour is re-derived for
dark and contrast-checked.

## Typography

IRANYekanX. Three weights carry everything: **Medium 500** is the body default (not
Regular — Regular is too light for Persian at UI sizes), **Bold 700** for emphasis and
H4/H5, **ExtraBold 800** for H1–H3.

Line heights are Persian-generous and non-negotiable — Persian has deep descenders and
stacked diacritics:

```
12 / 20    14 / 24    16 / 28    18 / 32    20 / 36    24 / 40
```

Text colour roles map onto Sky: `main` 800 · `secondary` 500 · `disabled` 300 · `reverse` 50.

**RTL is the default direction.** `text-align: start`, logical properties only, Persian
numerals in all product surfaces. Latin runs inside Persian strings are normal.

## Form

- **Radius 12px is the default.** 4px for chips and inline marks, 8px for nested elements,
  16px for sheets and large surfaces, full for pills and avatars.
- **Grid is 4px.** Spacing scale 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64.
- **Touch target 44px minimum**, even where the visual control is 32px or 40px.
- Icons are IBM Carbon at 16 and 20. RTL uses Carbon's `--mirror` variants automatically.

## Motion

Restrained and functional. The interface is a shopping tool used one-handed on a bus.

- Micro (hover, press, toggle): **120ms**
- Standard (sheets, popovers, tabs): **220ms**
- Sheet / large surface: **320ms**
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — exponential ease-out, arrives fast, settles soft.
- Glass surfaces animate **opacity and blur together**, never blur alone (blur-only reads
  as lag).
- `prefers-reduced-motion` collapses everything to a 1ms opacity change.

## The docs site itself

Mode: **Read** with an Operate playground. The site is not a Torob app screen and must not
cosplay as one — it is a reference tool that *displays* Torob surfaces.

- Site chrome is quiet: near-flat, Sky neutrals, one glass element (the sticky header) so
  the material is present without the site being a glass demo.
- The specimen area is where colour and glass live. Every demo has real content in Persian,
  a direction toggle, a theme toggle, and a viewport toggle.
- Site UI is LTR English (developers read English docs, code is LTR); every *specimen*
  inside it defaults to RTL Persian.
