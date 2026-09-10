import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

export const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escape for a <pre><code> block. Content is already HTML-ish source. */
export const codeEsc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const slugToPath = slug => slug === 'index' ? 'index.html' : `${slug}.html`;
export const depthOf = slug => slug === 'index' ? 0 : slug.split('/').length - 1;
export const rel = (slug, target) => '../'.repeat(depthOf(slug)) + target;

export async function loadComponents() {
  const dir = join(ROOT, 'source', 'components');
  const out = [];
  for (const f of readdirSync(dir).filter(f => f.endsWith('.mjs')).sort()) {
    const mod = await import(new URL(`file://${join(dir, f)}`));
    out.push(...mod.default);
  }
  return out;
}

/** Turn heading text into a stable anchor id. */
export const anchor = s => String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function layout({ slug, title, description, nav, components, body, toc = [], eyebrow, prev, next }) {
  const R = t => rel(slug, t);
  const navHtml = nav.map(group => `
      <div class="site-nav__group">
        <div class="site-nav__title">${esc(group.title)}</div>
        ${group.items.map(i => `<a href="${R(slugToPath(i.slug))}"${i.slug === slug ? ' aria-current="page"' : ''}>${esc(i.title)}</a>`).join('\n        ')}
      </div>`).join('') + `
      <div class="site-nav__group">
        <div class="site-nav__title">Components</div>
        ${components.map(c => `<a href="${R('components/' + c.slug + '.html')}"${'components/' + c.slug === slug ? ' aria-current="page"' : ''}>${esc(c.name)}</a>`).join('\n        ')}
      </div>`;

  const tocHtml = toc.length ? `
      <nav class="site-toc" aria-label="On this page">
        <div class="site-toc__title">On this page</div>
        ${toc.map(t => `<a href="#${t.id}">${esc(t.label)}</a>`).join('\n        ')}
      </nav>` : '';

  const pageNav = (prev || next) ? `
        <nav class="page-nav" aria-label="Previous and next page">
          ${prev ? `<a href="${R(slugToPath(prev.slug))}"><div class="page-nav__dir">Previous</div><div class="page-nav__name">${esc(prev.title)}</div></a>` : '<span style="flex:1"></span>'}
          ${next ? `<a href="${R(slugToPath(next.slug))}"><div class="page-nav__dir">Next</div><div class="page-nav__name">${esc(next.title)}</div></a>` : '<span style="flex:1"></span>'}
        </nav>` : '';

  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title === 'Rahnamā' ? 'Rahnamā · Torob Design System' : esc(title) + ' — Rahnamā · Torob Design System'}</title>
<meta name="description" content="${esc(description ?? '')}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23D73948'/><path d='M9 11h14v3h-5.2v10h-3.6V14H9z' fill='white'/></svg>">
<link rel="stylesheet" href="${R('assets/fonts.css')}">
<link rel="preload" href="${R('assets/fonts/IRANYekanX-Medium.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${R('assets/fonts/IRANYekanX-Bold.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R('assets/tokens.css')}">
<link rel="stylesheet" href="${R('assets/torob.css')}">
<link rel="stylesheet" href="${R('assets/site.css')}">
<link rel="alternate" type="text/markdown" href="${R(slug === 'index' ? 'index.md' : slug + '.md')}">
<script>
  // Applied before paint so the page never flashes the wrong theme.
  try {
    var t = localStorage.getItem('torob-theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
</script>
</head>
<body class="site">
<a class="site-skip" href="#main">Skip to content</a>

<header class="site-bar">
  <button class="site-tool site-nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M2 4h12v1.4H2zm0 3.3h12v1.4H2zm0 3.3h12V12H2z"/></svg>
  </button>
  <a class="site-brand" href="${R('index.html')}">
    <span class="site-brand__mark">ت</span>
    <span>Rahnamā</span>
    <span class="site-brand__sub">Torob Design System</span>
  </a>

  <div class="site-search" role="search">
    <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2zm0 1.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"/></svg>
    <input id="siteSearch" type="search" placeholder="Search components, tokens, icons…" autocomplete="off" aria-label="Search" aria-controls="siteResults" aria-expanded="false">
    <span class="site-search__kbd"><kbd>/</kbd></span>
    <div class="site-results" id="siteResults" role="listbox" hidden></div>
  </div>

  <div class="site-bar__tools">
    <button class="site-tool" id="localeToggle" data-locale="fa" aria-label="Switch every specimen between Persian (RTL) and English (LTR)" title="Language and direction of every specimen on this page">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm4.9 4.5h-2a11 11 0 0 0-.9-2.7 5.6 5.6 0 0 1 2.9 2.7zM8 2.5c.5.7.9 1.7 1.2 3H6.8c.3-1.3.7-2.3 1.2-3zM2.6 9.5a5.5 5.5 0 0 1 0-3h2.3a13 13 0 0 0 0 3zm.5 1.5h2a11 11 0 0 0 .9 2.7 5.6 5.6 0 0 1-2.9-2.7zm2-5.5h-2a5.6 5.6 0 0 1 2.9-2.7c-.4.8-.7 1.7-.9 2.7zM8 13.5c-.5-.7-.9-1.7-1.2-3h2.4c-.3 1.3-.7 2.3-1.2 3zm1.5-4.5h-3a11.6 11.6 0 0 1 0-3h3a11.6 11.6 0 0 1 0 3zm.5 4.7c.4-.8.7-1.7.9-2.7h2a5.6 5.6 0 0 1-2.9 2.7zm1.1-4.2a13 13 0 0 0 0-3h2.3a5.5 5.5 0 0 1 0 3z"/></svg>
      <span id="localeLabel">فارسی</span>
    </button>
    <button class="site-tool" id="themeToggle" aria-label="Toggle colour theme">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5A6.5 6.5 0 1 0 14.5 8 5 5 0 0 1 8 1.5z"/></svg>
      <span id="themeLabel">Light</span>
    </button>
  </div>
</header>

<div class="site-shell">
  <nav class="site-nav" id="siteNav" aria-label="Documentation">${navHtml}
  </nav>

  <main class="site-main" id="main">
    <div class="page-head">
      ${eyebrow ? `<div class="page-eyebrow">${esc(eyebrow)}</div>` : ''}
      <h1 style="font-size:34px;line-height:1.14;letter-spacing:-0.028em;font-weight:720">${esc(title)}</h1>
      ${description ? `<p class="page-lede" style="margin-block-start:10px">${description}</p>` : ''}
    </div>
${body}
${pageNav}
  </main>
${tocHtml}
</div>

<script src="${R('assets/site.js')}"></script>
</body>
</html>`;
}

/** A specimen block: live stage + code drawer with HTML / React tabs. */
let specId = 0;
export function specimen({ label, html, react, note, canvas, dir = 'rtl', stageClass = '' }) {
  const id = `sp${++specId}`;
  const tabs = [['HTML', codeEsc(html)]];
  if (react) tabs.push(['React', codeEsc(react)]);
  return `<div class="spec" data-spec>
  <div class="spec__bar">
    <span class="spec__label">${esc(label)}</span>
    <div class="spec__tools">
      <button class="site-tool" data-spec-locale data-locale="fa" aria-label="Switch this specimen between Persian and English" title="Language and direction of this specimen">فارسی</button>
      <button class="site-tool" data-spec-code aria-expanded="false">Code</button>
      <button class="site-tool copy-btn" data-copy="${id}-html" title="Copy HTML">Copy</button>
    </div>
  </div>
  <div class="spec__stage ${stageClass}"${canvas ? ` data-canvas="${canvas}"` : ''} dir="${dir}" lang="fa">${html}</div>
  ${note ? `<div style="padding:9px 14px;font-size:12.5px;color:var(--t-fg-secondary);border-block-start:1px solid var(--t-border-subtle)">${note}</div>` : ''}
  <div class="spec__code" hidden>
    <div class="spec__tabs" role="tablist">
      ${tabs.map(([t], i) => `<button class="spec__tab" role="tab" aria-selected="${i === 0}" data-tab="${i}">${t}</button>`).join('')}
    </div>
    ${tabs.map(([, code], i) => `<pre class="code" id="${id}-${i === 0 ? 'html' : 'react'}" data-panel="${i}"${i ? ' hidden' : ''}><code>${code}</code></pre>`).join('')}
  </div>
</div>`;
}

export const section = (id, title, inner) =>
  `<section class="prose" style="max-inline-size:none"><h2 id="${id}" style="font-size:21px;line-height:1.3;letter-spacing:-0.02em;font-weight:670;margin-block-start:52px">${title}</h2>${inner}</section>`;

export const table = (heads, rows) => `<div class="tbl-wrap"><table class="tbl">
  <thead><tr>${heads.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;

export const guidance = (use, avoid) => `<div class="guidance">
  <div class="guidance__col guidance__col--do">
    <div class="guidance__head"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg>Do</div>
    <ul>${use.map(u => `<li>${u}</li>`).join('')}</ul>
  </div>
  <div class="guidance__col guidance__col--dont">
    <div class="guidance__head"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg>Don't</div>
    <ul>${avoid.map(a => `<li>${a}</li>`).join('')}</ul>
  </div>
</div>`;
