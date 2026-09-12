# کتاب دیزاین ترب — the Torob Design System

راهنما, "the guide". The single source of truth for how Torob and Torob Nearby
look, behave and are built.

Generated from `Torob Tokens.sketch` and `T IBM Icons (16px, 20px).sketch`.
Tokens in, everything else out: the website, the CSS package, the React
components, nine platform export formats and the MCP server are all generated
from the same source files, so nothing downstream can drift.

```bash
node build/all.mjs     # rebuild everything, with the quality gates in the middle
node build/serve.mjs   # http://localhost:4321
```

## What is here

| | |
|---|---|
| **32 components** | Six groups. 16 of them are new — the whole feedback and overlay layers were missing from the kit. |
| **250 tokens** | 166 primitives + 84 semantic per mode, in W3C DTCG format. |
| **2,041 icons** | IBM Carbon at 16 and 20px, matched by name against the Sketch library. |
| **9 export formats** | CSS, Tailwind v4, SCSS, TS, JS, JSON, SwiftUI, Android, Markdown. |
| **9 MCP tools** | Including `validate_code`, which lints generated code against the system. |
| **4 pattern flows** | Real screens, built from system parts only. |
| **55 pages** | The documentation website. |

## Layout

```
source/                  ← EDIT HERE. Everything else is generated.
  tokens/*.json            W3C DTCG token source
  components/*.mjs         component registry: docs, props, examples, React
  i18n.mjs                 Persian → English for the locale switch
  site.nav.mjs             information architecture
build/                   generators and quality gates
packages/
  css/src/                 the canonical CSS layer (hand-written)
  css/dist/                generated token artefacts + bundled torob.css
  icons/                   4,082 SVGs, two sprites, a searchable index
  react/src/               generated React wrappers
  fonts/                   IRANYekanX, 11 weights as woff2
  mcp/                     the MCP server
site/                    the generated website
```

**Never edit `packages/*/dist`, `packages/react/src`, or `site/`.** They are
generated and will be overwritten on the next build.

## Quality gates

`build/all.mjs` fails the build if either of these does:

- `contrast-check.mjs` — 28 foreground/background pairs across both modes
  against WCAG AA. Run this before committing any colour change.
- `validate-css.mjs` — every `var()` reference in the CSS layer resolves.

And `verify.mjs` crawls the built site for broken links, duplicate ids,
unlabelled icon buttons and missing alt text.

## For AI agents

Four channels, because coding tools do not agree on a protocol:

1. **MCP server** — `packages/mcp/server.mjs`. Nine tools over stdio.
   `cd packages/mcp && npm install && node test-server.mjs` to verify.
2. **`llms.txt`** — at the site root, plus a `.md` twin of every page.
3. **Agent rules** — `CLAUDE.md` and `.cursorrules` in this repo root,
   generated from the guidelines.
4. **Token exports** — including a Markdown token reference.

## Fonts

IRANYekanX is supplied by Torob and licensed to Torob. `packages/fonts/`
holds all eleven weights as woff2 (904 KB of TTF → 291 KB). The site loads
five. Do not redistribute these files outside Torob.

## Known gaps

- 21 of 2,062 icons in the Sketch library have no match in Carbon 11.88.
  Thirteen are deprecated IBM-internal glyphs; four are artboards whose names
  contain two icon names separated by a comma. See
  `packages/icons/unmatched.json`.
- The React package is source-only; it is not published to a registry yet.
- The Sketch source itself has 24 duplicate symbol masters and two coexisting
  naming generations. See the Naming & migration page for the full list.
