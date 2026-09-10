import { specimen, section, table, guidance, esc } from './site-lib.mjs';

/* ─────────────────────────── HOME ─────────────────────────── */
export function indexPage({ components, iconCount, tokenCount }) {
  const groups = {};
  for (const c of components) (groups[c.group] ??= []).push(c);

  let body = `<div class="prose" style="max-inline-size:none;margin-block-start:-14px">
    <div class="note" style="border-inline-start-color:var(--t-fg-brand)">
      <strong>Rahnamā</strong> (راهنما — "the guide") is the single source of truth for how Torob and Torob Nearby look, behave and are built. Tokens in, everything else out: this website, the CSS package, the React components, nine platform export formats and the MCP server are all generated from the same files. Nothing downstream is hand-maintained, so nothing downstream can drift.
    </div>
  </div>

  <div class="wide" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));margin-block:26px">
    ${[[components.length, 'components', 'components/button.html'],
       [tokenCount, 'design tokens', 'tokens.html'],
       [iconCount.toLocaleString('en-US'), 'icons', 'icons.html'],
       ['9', 'export formats', 'tokens.html#exports'],
       ['9', 'MCP tools', 'ai.html']].map(([n, l, href]) =>
      `<a href="${href}" style="text-decoration:none;color:inherit;padding:16px 18px;border:1px solid var(--t-border-default);border-radius:12px;background:var(--t-bg-fog);display:block">
        <div style="font-size:27px;font-weight:800;line-height:1.1">${n}</div>
        <div class="t-body-sm t-tone-secondary" style="margin-block-start:3px">${l}</div>
      </a>`).join('')}
  </div>`;

  body += section('start', 'Start here', `<div class="wide" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(258px,1fr))">
    ${[
      ['For developers', 'Install the tokens, copy a component, ship. Framework-free CSS with React on top.', 'start.html', 'Getting started'],
      ['For AI agents', 'Point Claude Code, Cursor or Copilot at the MCP server and they write real Torob code, not plausible-looking code.', 'ai.html', 'AI & MCP setup'],
      ['For designers', 'Every legacy Sketch symbol name, and what replaced it.', 'migration.html', 'Naming & migration'],
      ['The material', 'Torob glass — what it is, what it costs, and where the line is.', 'foundations/glass.html', 'Glass'],
    ].map(([t, d, href, cta]) =>
      `<a href="${href}" style="text-decoration:none;color:inherit;padding:19px 20px;border:1px solid var(--t-border-default);border-radius:12px;background:var(--t-bg-fog);display:flex;flex-direction:column;gap:6px">
        <div style="font-weight:700;font-size:15px">${t}</div>
        <div class="t-body-sm t-tone-secondary" style="flex:1;line-height:1.6">${d}</div>
        <div style="color:var(--t-fg-link);font-size:13px;font-weight:600;margin-block-start:4px">${cta} →</div>
      </a>`).join('')}
  </div>`);

  body += section('material', 'The material', `<div class="prose">
      <p>Apple's glass is thick — 50–80px of blur, a saturation lift, specular highlights. Torob glass is <strong>thin</strong>: a translucent sheet of the surface colour, one hairline edge, and a shadow small enough to read as a lifted edge. It marks a surface that floats above content. It is never decoration.</p>
    </div>
    ${specimen({ label: 'Torob glass over the map', canvas: 'map', stageClass: 'spec__stage--center', html: `<div style="display:flex;flex-direction:column;gap:11px;align-items:center;inline-size:100%;max-inline-size:330px">
  <div class="t-segmented" role="tablist" aria-label="نمای اطراف" style="align-self:center">
    <button class="t-segmented__item" role="tab" aria-selected="true">فروشگاه‌ها<span class="t-chip__count">۴۳</span></button>
    <button class="t-segmented__item" role="tab" aria-selected="false">محصولات<span class="t-chip__count">۵۵</span></button>
  </div>
  <article class="t-store-card t-store-card--glass" style="inline-size:100%">
    <div class="t-store-card__head">
      <div class="t-store-card__logo"></div>
      <div class="t-store-card__body">
        <h3 class="t-store-card__name">ادکلن شهر</h3>
        <div class="t-store-card__meta">
          <span class="t-store-card__distance"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a4.5 4.5 0 0 0-4.5 4.5C3.5 9 8 15 8 15s4.5-6 4.5-9.5A4.5 4.5 0 0 0 8 1zm0 6.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></svg>۱ کیلومتر</span>
          <span>باز تا ۲۲:۳۰</span>
        </div>
      </div>
    </div>
    <div class="t-store-card__badges"><span class="t-badge t-badge--guarantee">ضمانت ترب</span><span class="t-badge">کالابرگ</span></div>
  </article>
</div>` })}`);

  body += section('components', 'Components', `<div class="prose"><p>${components.length} components across six groups. Every one carries the legacy Sketch symbol names it replaces, so the old vocabulary still resolves.</p></div>
    <div class="wide">
    ${Object.entries(groups).map(([g, list]) => `
      <h3 style="font-size:14px;font-weight:700;margin-block:26px 9px;color:var(--t-fg-secondary);text-transform:uppercase;letter-spacing:0.07em">${esc(g)}</h3>
      <div style="display:grid;gap:7px;grid-template-columns:repeat(auto-fill,minmax(216px,1fr))">
        ${list.map(c => `<a href="components/${c.slug}.html" style="text-decoration:none;color:inherit;padding:11px 13px;border:1px solid var(--t-border-subtle);border-radius:9px;background:var(--t-bg-fog);display:flex;align-items:center;gap:8px">
          <span style="font-weight:600;font-size:13.5px">${esc(c.name)}</span>
          ${c.status === 'new' ? '<span class="status-pill status-pill--new" style="font-size:9.5px;padding:1px 6px">new</span>' : ''}
          ${c.status === 'revised' ? '<span class="status-pill status-pill--revised" style="font-size:9.5px;padding:1px 6px">renamed</span>' : ''}
        </a>`).join('')}
      </div>`).join('')}
    </div>`);

  body += section('principles', 'Principles', `<div class="prose">
    <ol style="list-style:none;padding:0">
      ${[
        ['RTL is the direction, not a mode.', 'Every text style in the source is align:right. Logical properties throughout; LTR is the secondary case, and every specimen on this site can switch to it.'],
        ['Intent, not colour.', '<code>Button / Red</code> became <code>variant="primary"</code>. When the palette shifts, the code does not.'],
        ['State is a state.', 'The source shipped <code>Button/Red/Hover</code> as its own symbol. Here it is a pseudo-class. Theme is a token, not a component.'],
        ['Glass is structural.', 'A material with a budget — three layers per viewport — not a decoration applied where a card looked plain.'],
        ['Accessibility is a gate.', '28 contrast pairs are machine-checked in both modes on every build. A failure exits non-zero.'],
        ['Machine-readable by construction.', 'Nine MCP tools, an <code>llms.txt</code>, a Markdown twin of every page. AI agents are first-class consumers, not an afterthought.'],
      ].map(([t, d], i) => `<li style="display:flex;gap:15px;padding-block:13px;border-block-end:1px solid var(--t-border-subtle)">
        <span style="flex:none;inline-size:24px;block-size:24px;border-radius:7px;background:var(--t-bg-subtle);display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--t-fg-secondary)">${i + 1}</span>
        <span><strong style="color:var(--t-fg-default)">${t}</strong> <span style="color:var(--t-fg-secondary)">${d}</span></span>
      </li>`).join('')}
    </ol></div>`);

  return {
    body, toc: [{ id: 'start', label: 'Start here' }, { id: 'material', label: 'The material' }, { id: 'components', label: 'Components' }, { id: 'principles', label: 'Principles' }],
    title: 'Rahnamā', description: 'The Torob Design System. Tokens, components, icons and guidelines — for people and for machines.', eyebrow: 'Torob Design System',
  };
}

/* ─────────────────────────── AI / MCP ─────────────────────────── */
export function aiPage(nComponents, nIcons) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };

  let body = `<div class="prose">
    <p>An AI agent that has not been told what your design system is will invent one. It will produce <code>#3B82F6</code> because that is Tailwind's blue, <code>gap: 10px</code> because ten is a round number, and <code>margin-left</code> because that is what most of its training data says, and every one of those is a bug in a Persian, RTL, token-driven product.</p>
    <p>This system is machine-readable through <strong>four channels</strong>, because coding tools do not agree on a protocol.</p>
  </div>
  ${table(['Channel', 'What it is', 'Who it serves'], [
    ['<strong>MCP server</strong>', 'Nine tools over stdio — components, tokens, icons, guidelines, migration, and a linter', 'Claude Code, Cursor, Windsurf, Zed'],
    ['<strong>llms.txt</strong>', 'AI-readable index at the site root, plus a <code>.md</code> twin of every page', 'Any model with web access'],
    ['<strong>Agent rules</strong>', 'Generated <code>CLAUDE.md</code>, <code>.cursorrules</code>, <code>copilot-instructions.md</code>', 'Repo-level guardrails'],
    ['<strong>Token exports</strong>', 'Nine formats including a Markdown token reference', 'Anything that can read a file'],
  ])}`;

  body += S('mcp', 'MCP server', `<div class="prose"><p>The primary channel. It reads the same generated artefacts this website does, so it cannot drift from what you are looking at.</p></div>
    ${table(['Tool', 'What it does'], [
      ['<code>search_components</code>', 'Find a component by name, purpose, or <strong>legacy Sketch symbol name</strong>. Searching <code>"Button / Red / Default"</code> returns Button.'],
      ['<code>get_component</code>', 'Full spec: props, anatomy, do/don\'t, a11y contract, responsive behaviour, HTML and React.'],
      ['<code>get_tokens</code>', 'Resolved token values in css, js, json, scss, swift or android format.'],
      ['<code>resolve_token</code>', 'Trace one semantic token to its primitive and final value in both modes.'],
      ['<code>search_icons</code>', `Search all ${nIcons.toLocaleString('en-US')} icons by name, alias or category. Returns exact names and RTL mirror twins.`],
      ['<code>get_icon</code>', 'SVG markup plus the import snippet and RTL guidance.'],
      ['<code>get_guidelines</code>', 'The rules for glass, rtl, motion, accessibility, responsive, naming, commerce, content.'],
      ['<code><strong>validate_code</strong></code>', 'Lint generated code against the system. This is the tool that actually enforces adoption.'],
      ['<code>get_migration</code>', 'Legacy Sketch name → component name and class.'],
    ])}`);

  body += S('install', 'Install', `<div class="prose"><p>Node 18+. No global install needed.</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Claude Code — .mcp.json in your repo root</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="mcp-claude">Copy</button></div></div>
    <pre class="code" id="mcp-claude"><code>{
  "mcpServers": {
    "torob-design": {
      "command": "node",
      "args": ["./design-system/packages/mcp/server.mjs"],
      "env": { "TOROB_DS_ROOT": "./design-system" }
    }
  }
}</code></pre></div>

    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Cursor — .cursor/mcp.json</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="mcp-cursor">Copy</button></div></div>
    <pre class="code" id="mcp-cursor"><code>{
  "mcpServers": {
    "torob-design": {
      "command": "node",
      "args": ["/absolute/path/to/design-system/packages/mcp/server.mjs"]
    }
  }
}</code></pre></div>

    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Verify it works</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="mcp-test">Copy</button></div></div>
    <pre class="code" id="mcp-test"><code>cd design-system/packages/mcp
npm install
node test-server.mjs      # exercises all nine tools and prints the output</code></pre></div>`);

  body += S('validate', 'The linter is the part that matters', `<div class="prose">
      <p>Documentation an agent <em>can</em> read is not the same as documentation it <em>did</em> read. <code>validate_code</code> closes that gap: run it on any generated UI and it returns the specific violations, with the token that should have been used.</p>
    </div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">In → out</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="lint-demo">Copy</button></div></div>
    <pre class="code" id="lint-demo"><code>validate_code({ code: \`
.card {
  background: #FFFFFF;
  margin-left: 14px;
  border-radius: 10px;
  text-align: right;
  letter-spacing: -0.02em;
  transition: opacity 250ms ease;
  outline: none;
}\` })

→ 5 error(s), 4 warning(s), 0 suggestion(s).

ERROR line 3  [hardcoded-colour]     #FFFFFF is a literal colour. It matches a
                                     token — use var(--t-color-white) instead.
ERROR line 4  [rtl-physical]         margin-left breaks RTL. Use margin-inline-start.
ERROR line 6  [rtl-physical]         text-align: left/right breaks RTL. Use start/end.
ERROR line 7  [persian-tracking]     Negative letter-spacing breaks Persian
                                     letterform joining. Never use it.
ERROR line 9  [focus-removed]        outline: none removes the focus ring.
WARN  line 4  [off-grid]             14px is off the 4px grid. Nearest: 12px, 16px.
WARN  line 5  [off-scale-radius]     10px is not on the radius scale (4/8/12/16/24).
WARN  line 8  [off-scale-duration]   250ms is not a duration token (120/220/320/480).</code></pre></div>
    <div class="prose"><p>It also catches nested glass, glass-budget violations, unnamed icon buttons, <code>&lt;img&gt;</code> without <code>alt</code>, clickable <code>&lt;div&gt;</code>s, and any legacy Sketch name still present in the code.</p></div>`);

  body += S('prompt', 'What to tell the agent', `<div class="prose"><p>Drop this into <code>CLAUDE.md</code> or <code>.cursorrules</code>. The build generates it for you at <code>packages/mcp/AGENT_RULES.md</code>.</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">AGENT_RULES.md</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="agent-rules">Copy</button></div></div>
    <pre class="code" id="agent-rules"><code># Torob Design System — rules for AI agents

This project uses the Torob Design System (Rahnamā). An MCP server named
"torob-design" exposes it. Use it — do not guess at values.

## Before writing any UI
1. search_components(&lt;what you are building&gt;) — it also accepts legacy
   Sketch names like "Store-Card/VLP" or "POI/Cluster".
2. get_component(&lt;name&gt;) for the props, the HTML and the a11y contract.
3. get_guidelines("rtl") and get_guidelines("glass") if either is involved.

## Non-negotiable
- NEVER hardcode a colour, spacing, radius or duration. get_tokens() first.
- NEVER write a physical direction: no margin-left, padding-right, left:,
  text-align:right, border-left. Logical properties only. This product is RTL.
- NEVER use negative letter-spacing. It breaks Persian letterform joining.
- Persian numerals (۰۱۲۳۴۵۶۷۸۹) with ٬ separators in all product surfaces.
- Icon-only buttons require aria-label.
- Touch targets >= 44px.
- At most 3 glass surfaces per viewport; never on repeating elements.

## Before you present code
Run validate_code() on it and fix everything it reports.</code></pre></div>`);

  body += S('llms', 'llms.txt and Markdown twins', `<div class="prose">
      <p>For tools without MCP. <a href="llms.txt"><code>/llms.txt</code></a> is a structured index of the whole system; <a href="llms-full.txt"><code>/llms-full.txt</code></a> is the entire thing in one file. Every page also has a Markdown twin — append <code>.md</code> to any URL:</p>
    </div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">Markdown twins</span></div>
    <pre class="code"><code>/components/button.html   →  /components/button.md
/foundations/glass.html   →  /foundations/glass.md
/tokens.html              →  /tokens.md</code></pre></div>`);

  return { body, toc, title: 'AI & MCP setup', description: 'Nine MCP tools, an llms.txt, generated agent rules, and a linter that enforces them.', eyebrow: 'Overview' };
}

/* ─────────────────────────── MIGRATION ─────────────────────────── */
export function migrationPage(components) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const rows = [];
  for (const c of components) for (const l of c.legacy ?? []) rows.push({ old: l, name: c.name, cls: c.classes?.[0] ?? '', slug: c.slug, group: c.group });
  rows.sort((a, b) => a.old.localeCompare(b.old));
  const nNew = components.filter(c => c.status === 'new').length;

  let body = `<div class="prose">
    <p><strong>${rows.length} legacy Sketch symbol names</strong> map onto ${components.length - nNew} components. ${nNew} more components are new — they cover gaps the kit never had.</p>
    <p>Renaming that nobody can execute is renaming that nobody adopts, so every old name stays searchable here, in the MCP server's <code>get_migration</code>, and on each component page.</p>
  </div>`;

  body += S('why', 'Four collapses', `<div class="prose"><p>The 110 Sketch masters reduce to ${components.length - nNew} components through four mechanical rules. None of them is a taste call.</p></div>
    ${table(['Rule', 'Example', 'Why'], [
      ['<strong>State is a state</strong>', '<code>Button / Red / Hover</code> · <code>/ Default</code> · <code>/ Disable</code> → one <code>Button</code>', 'A component API cannot have a separate component per pseudo-class.'],
      ['<strong>Theme is a token</strong>', '<code>Store-Card/VLP/With product/Light</code> + <code>/Dark</code> → one <code>StoreCard</code>', 'Light and dark are the same component under different token values.'],
      ['<strong>Intent, not colour</strong>', '<code>Button / Red</code> → <code>variant="primary"</code>', 'When the palette shifts, the code should not.'],
      ['<strong>Position is not a component</strong>', '<code>List / last item</code> → <code>:last-child</code>', 'It existed only because Sketch cannot express a selector.'],
    ])}`);

  body += S('map', 'The map', `<div class="wide">
    <div class="site-search" style="max-inline-size:none;margin-block-end:12px">
      <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2zm0 1.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"/></svg>
      <input id="migSearch" type="search" placeholder="Search ${rows.length} legacy names…" autocomplete="off">
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Legacy Sketch name</th><th>Component</th><th>CSS class</th><th>Group</th></tr></thead>
    <tbody id="migRows">${rows.map(r => `<tr data-k="${esc((r.old + ' ' + r.name + ' ' + r.cls).toLowerCase())}">
      <td><span class="legacy">${esc(r.old)}</span></td>
      <td><a href="components/${r.slug}.html" style="font-weight:600">${esc(r.name)}</a></td>
      <td><code>${esc(r.cls)}</code></td>
      <td>${esc(r.group)}</td></tr>`).join('')}</tbody></table></div></div>
    <script>(function(){
      var i=document.getElementById('migSearch'), rows=[].slice.call(document.querySelectorAll('#migRows tr'));
      var t; i.addEventListener('input', function(){ clearTimeout(t); t=setTimeout(function(){
        var q=i.value.toLowerCase().trim();
        rows.forEach(function(r){ r.style.display = !q || r.dataset.k.indexOf(q)>=0 ? '' : 'none'; });
      },90); });
    })();</script>`);

  body += S('new', 'New components', `<div class="prose"><p>${nNew} components the kit did not have. The feedback layer is the largest gap — 29 example screens and not one confirmation, error or empty state as a component.</p></div>
    <div class="wide" style="display:grid;gap:7px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">
    ${components.filter(c => c.status === 'new').map(c => `<a href="components/${c.slug}.html" style="text-decoration:none;color:inherit;padding:12px 14px;border:1px solid var(--t-border-subtle);border-radius:9px;background:var(--t-bg-fog);display:block">
      <div style="font-weight:650;font-size:13.5px">${esc(c.name)}</div>
      <div class="t-body-sm t-tone-secondary" style="margin-block-start:2px;line-height:1.5">${esc(c.summary)}</div></a>`).join('')}
    </div>`);

  body += S('hygiene', 'Source-file findings', `<div class="prose"><p>Issues found while parsing the Sketch files. Worth fixing at the source so the two stop diverging.</p></div>
    ${table(['Finding', 'Detail'], [
      ['<strong>24 duplicate symbol masters</strong>', 'Same name, distinct symbol IDs. <code>Segmented Controls/Selected</code> exists <strong>four</strong> times; <code>Search bar/Default</code>, <code>Product Card/Normal</code>, <code>Header/Profile</code> and 20 others exist twice.'],
      ['<strong>Two generations of symbols coexist</strong>', 'The examples page uses <code>Button/Normal/Primary/Icon</code> and <code>Store-Card/With product</code>; the components page uses <code>Button / Red / Icon</code> and <code>Store-Card/VLP/With product/Light</code>. The examples had already begun migrating to intent-based naming.'],
      ['<strong>Undocumented components</strong>', '<code>city filter</code>, <code>official seller</code> and <code>Badge / Ad on Buy Box</code> appear only on the examples page, never in the component library.'],
      ['<strong>Zero-width non-joiners in symbol names</strong>', '<code>Button/‌Blue/…</code> and <code>Glass - Dark - ‌List Background</code> contain U+200C. Invisible in Sketch, and it silently breaks any code generation keyed on the name.'],
      ['<strong>Inconsistent separators</strong>', '<code>Button / Red / Hover</code> vs <code>Button/Black ghost/Default</code>; <code>Store-Card</code> vs <code>Product Card</code>; a trailing space in <code>Glass - Dark - selected&nbsp;</code>; <code>Glass -Dark</code> missing a space.'],
      ['<strong>"Gaurantee" misspelled</strong>', 'Three colour swatches. The Badge symbol spells it correctly, so the two do not match.'],
      ['<strong>Verb where an adjective belongs</strong>', '<code>Close Pin</code> reads as an instruction. It means <em>closed</em>.'],
      ['<strong>Off-system values</strong>', '<code>#979797</code> borders and a <code>#D8D8D8</code> gradient stop are Sketch defaults that leaked in — neither is in the palette.'],
      ['<strong>Two unused font weights</strong>', 'IRANYekanX Regular and DemiBold are loaded but no text style uses them. Trimming them would cut the webfont payload.'],
      ['<strong>4 icon artboards named with commas</strong>', '<code>"high severity, caution"</code> and three others hold two icon names in one artboard name.'],
    ])}`);

  return { body, toc, title: 'Naming & migration', description: `${rows.length} legacy Sketch names, and what each became.`, eyebrow: 'Overview' };
}
