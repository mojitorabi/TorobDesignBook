import { readdirSync } from 'node:fs';
import { SITE_NAME, SITE_TAGLINE, UI_FA, GROUP_FA } from '../source/site.nav.mjs';
import { join } from 'node:path';
import { ROOT } from './tokens-lib.mjs';

export const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escape for a <pre><code> block. Content is already HTML-ish source. */
export const codeEsc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const slugToPath = slug => slug === 'index' ? 'index.html' : `${slug}.html`;
export const depthOf = slug => slug === 'index' ? 0 : slug.split('/').length - 1;
export const rel = (slug, target) => '../'.repeat(depthOf(slug)) + target;

/* A registry specimen may embed a Sketch symbol by id — {{sym:<id>}} — so a
   component page and the symbols gallery render the very same markup and can
   never drift apart. */
let SYM = null;
export async function resolveSymbols(html) {
  if (!html || !html.includes('{{sym:')) return html;
  SYM ??= (await import(new URL(`file://${join(ROOT, 'source', 'sketch', 'specimens.mjs')}`))).SPECIMENS;
  return html.replace(/\{\{sym:([0-9A-F-]{36})\}\}/g, (_, id) => {
    if (!SYM[id]) throw new Error(`no specimen for symbol ${id}`);
    return SYM[id].html;
  });
}

export async function loadComponents() {
  const dir = join(ROOT, 'source', 'components');
  const out = [];
  for (const f of readdirSync(dir).filter(f => f.endsWith('.mjs')).sort()) {
    const mod = await import(new URL(`file://${join(dir, f)}`));
    out.push(...mod.default);
  }
  for (const c of out) for (const s of c.specimens ?? []) s.html = await resolveSymbols(s.html);
  return out;
}

/** Turn heading text into a stable anchor id. */
export const anchor = s => String(s).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function layout({ slug, title, description, nav, components, body, toc = [], eyebrow, prev, next }) {
  const R = t => rel(slug, t);
  const groups = {};
  for (const c of components) (groups[c.group] ??= []).push(c);

  const navHtml = nav.map(group => `
      <div class="site-nav__group">
        <div class="site-nav__title">${esc(group.title)}</div>
        ${group.items.map(i => `<a href="${R(slugToPath(i.slug))}"${i.slug === slug ? ' aria-current="page"' : ''}>${esc(i.title)}</a>`).join('\n        ')}
      </div>`).join('') +
    Object.entries(groups).map(([g, list]) => `
      <div class="site-nav__group">
        <div class="site-nav__title">${esc(GROUP_FA[g] ?? g)}</div>
        ${list.map(c => `<a href="${R('components/' + c.slug + '.html')}"${'components/' + c.slug === slug ? ' aria-current="page"' : ''}>${esc(c.name)}</a>`).join('\n        ')}
      </div>`).join('');

  const tocHtml = toc.length ? `
      <nav class="site-toc" aria-label="${esc(UI_FA.onThisPage)}">
        <div class="site-toc__title">${esc(UI_FA.onThisPage)}</div>
        ${toc.map(t => `<a href="#${t.id}">${esc(t.label)}</a>`).join('\n        ')}
      </nav>` : '';

  const pageNav = (prev || next) ? `
        <nav class="page-nav" aria-label="صفحهٔ قبلی و بعدی">
          ${prev ? `<a href="${R(slugToPath(prev.slug))}" rel="prev"><div class="page-nav__dir">${esc(UI_FA.prev)}</div><div class="page-nav__name">${esc(prev.title)}</div></a>` : '<span style="flex:1"></span>'}
          ${next ? `<a href="${R(slugToPath(next.slug))}" rel="next"><div class="page-nav__dir">${esc(UI_FA.next)}</div><div class="page-nav__name">${esc(next.title)}</div></a>` : '<span style="flex:1"></span>'}
        </nav>` : '';

  const pageTitle = title === SITE_NAME ? `${SITE_NAME} · ${SITE_TAGLINE}` : `${esc(title)} — ${SITE_NAME}`;

  return (`<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${pageTitle}</title>
<meta name="description" content="${esc(String(description ?? '').replace(/<[^>]+>/g, ''))}">
<meta name="color-scheme" content="light dark">
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
    if (t === 'light' || t === 'dim' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
</script>
</head>
<body class="site">
<a class="site-skip" href="#main">${esc(UI_FA.skip)}</a>

<header class="site-bar">
  <button class="site-tool site-nav-toggle" id="navToggle" aria-label="${esc(UI_FA.toggleNav)}" aria-expanded="false">
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2 4h12v1.4H2zm0 3.3h12v1.4H2zm0 3.3h12V12H2z"/></svg>
  </button>
  <a class="site-brand" href="${R('index.html')}">
    <span class="site-brand__mark" aria-hidden="true">ت</span>
    <span class="site-brand__name">${esc(SITE_NAME)}</span>
    <span class="site-brand__sub">${esc(SITE_TAGLINE)}</span>
  </a>

  <div class="site-search" role="search">
    <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2zm0 1.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"/></svg>
    <input id="siteSearch" type="search" placeholder="${esc(UI_FA.search)}" autocomplete="off" aria-label="${esc(UI_FA.searchLabel)}" role="combobox" aria-autocomplete="list" aria-controls="siteResults" aria-expanded="false">
    <span class="site-search__kbd" aria-hidden="true"><kbd>/</kbd></span>
    <div class="site-results" id="siteResultsBox" hidden>
      <div id="siteResults" role="listbox" aria-label="${esc(UI_FA.searchLabel)}"></div>
      <p class="site-results__empty" id="siteResultsEmpty" hidden></p>
    </div>
    <span class="t-visually-hidden" role="status" id="siteResultsStatus"></span>
  </div>

  <div class="site-bar__tools">
    <button class="site-tool" id="localeToggle" data-locale="fa" aria-label="زبان و جهت نمونه‌ها: فارسی — برای تغییر کلیک کنید" title="زبان و جهت همهٔ نمونه‌های این صفحه">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm4.9 4.5h-2a11 11 0 0 0-.9-2.7 5.6 5.6 0 0 1 2.9 2.7zM8 2.5c.5.7.9 1.7 1.2 3H6.8c.3-1.3.7-2.3 1.2-3zM2.6 9.5a5.5 5.5 0 0 1 0-3h2.3a13 13 0 0 0 0 3zm.5 1.5h2a11 11 0 0 0 .9 2.7 5.6 5.6 0 0 1-2.9-2.7zm2-5.5h-2a5.6 5.6 0 0 1 2.9-2.7c-.4.8-.7 1.7-.9 2.7zM8 13.5c-.5-.7-.9-1.7-1.2-3h2.4c-.3 1.3-.7 2.3-1.2 3zm1.5-4.5h-3a11.6 11.6 0 0 1 0-3h3a11.6 11.6 0 0 1 0 3zm.5 4.7c.4-.8.7-1.7.9-2.7h2a5.6 5.6 0 0 1-2.9 2.7zm1.1-4.2a13 13 0 0 0 0-3h2.3a5.5 5.5 0 0 1 0 3z"/></svg>
      <span id="localeLabel">فارسی</span>
    </button>
    <button class="site-tool" id="themeToggle" aria-label="تغییر پوسته">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path id="themeIcon" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 0h.01V3H8zm0 13h.01V16H8zM0 7.99h3V8H0zm13 0h3V8h-3zM2.3 3.3l2.1 2.1-1 1-2.1-2.1zm8.3 8.3 2.1 2.1-1 1-2.1-2.1zm3.1-9.3 1 1-2.1 2.1-1-1zM4.4 10.6l1 1-2.1 2.1-1-1z"/></svg>
      <span id="themeLabel">روشن</span>
    </button>
  </div>
</header>

<div class="site-shell">
  <nav class="site-nav" id="siteNav" aria-label="ناوبری مستندات">${navHtml}
  </nav>

  <main class="site-main" id="main">
    <div class="page-head">
      ${eyebrow ? `<div class="page-eyebrow">${esc(eyebrow)}</div>` : ''}
      <h1 class="page-title">${esc(title)}</h1>
      ${description ? `<p class="page-lede">${description}</p>` : ''}
    </div>
${body}
${pageNav}
  </main>
${tocHtml}
</div>

<script src="${R('assets/site.js')}"></script>
</body>
</html>`).replaceAll('%ASSETS%', R('assets'));
}

/** SVG paint servers (gradients, clip paths) are addressed by id, and a page
    that shows the same mark twice must not define the same id twice. Give
    every id that is referenced through url(#…) a per-block suffix. */
export function uniqueIds(html, suffix) {
  const ids = new Set([...html.matchAll(/url\(#([^)"']+)\)/g)].map(m => m[1]));
  for (const id of ids) {
    const e = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`id="${e}"`, 'g'), `id="${id}-${suffix}"`)
               .replace(new RegExp(`url\\(#${e}\\)`, 'g'), `url(#${id}-${suffix})`);
  }
  return html;
}

/** A specimen block: live stage + code drawer with HTML / React tabs. */
let specId = 0;
export function specimen({ label, html, react, note, canvas, dir = 'rtl', stageClass = '' }) {
  const id = `sp${++specId}`;
  html = uniqueIds(html, id);
  const tabs = [['HTML', codeEsc(html)]];
  if (react) tabs.push(['React', codeEsc(react)]);
  return `<div class="spec" data-spec>
  <div class="spec__bar">
    <span class="spec__label">${esc(label)}</span>
    <div class="spec__tools">
      <button class="site-tool" data-spec-locale data-locale="fa" aria-label="تغییر زبان و جهت این نمونه" title="زبان و جهت این نمونه">فارسی</button>
      <button class="site-tool" data-spec-code aria-expanded="false">${UI_FA.code}</button>
      <button class="site-tool copy-btn" data-copy="${id}-html" title="کپی کد HTML">${UI_FA.copy}</button>
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
    <div class="guidance__head"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg>${UI_FA.do}</div>
    <ul>${use.map(u => `<li>${u}</li>`).join('')}</ul>
  </div>
  <div class="guidance__col guidance__col--dont">
    <div class="guidance__head"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg>${UI_FA.dont}</div>
    <ul>${avoid.map(a => `<li>${a}</li>`).join('')}</ul>
  </div>
</div>`;
