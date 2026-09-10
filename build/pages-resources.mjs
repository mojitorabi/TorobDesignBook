import { specimen, section, table, guidance, esc } from './site-lib.mjs';

/* ─────────────────────────── ICONS ─────────────────────────── */
export function iconsPage(cats, count) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const catList = Object.entries(cats).sort((a, b) => Object.values(b[1]).reduce((x, y) => x + y, 0) - Object.values(a[1]).reduce((x, y) => x + y, 0));

  let body = `<div class="prose">
    <p><strong>${count.toLocaleString('en-US')} icons</strong> at 16px and 20px, from IBM Carbon — the exact set in <code>T IBM Icons (16px, 20px).sketch</code>, matched by name against Carbon 11.88.</p>
    <p>Search by name, alias or category. Click any icon to copy its name; use the size toggle to switch between the two shipped sizes.</p>
  </div>

  <div class="wide" style="margin-block:22px">
    <div style="display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-block-end:14px">
      <div class="site-search" style="flex:1;min-inline-size:220px;max-inline-size:none">
        <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2zm0 1.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"/></svg>
        <input id="iconSearch" type="search" placeholder="Search ${count.toLocaleString('en-US')} icons — try “filter”, “location”, “receipt”…" autocomplete="off">
      </div>
      <button class="site-tool" id="iconSize" data-size="20">20px</button>
      <select class="site-tool" id="iconCat" style="padding-inline:10px">
        <option value="">All categories</option>
        ${catList.map(([c, subs]) => `<option value="${esc(c)}">${esc(c)} (${Object.values(subs).reduce((x, y) => x + y, 0)})</option>`).join('')}
      </select>
      <span class="t-body-sm t-tone-secondary" id="iconCount"></span>
    </div>
    <div id="iconGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:5px"></div>
    <div id="iconMore" style="text-align:center;margin-block-start:18px"></div>
  </div>`;

  body += S('rtl', 'Direction', `<div class="prose">
      <p>Carbon ships purpose-drawn <code>--mirror</code> twins for the icons whose meaning depends on reading direction. Where a twin exists, render it in RTL rather than applying a CSS flip — a transform also mirrors any glyphs drawn inside the icon.</p>
      <p>Five of the icons in this set have twins: <code>search--locate</code>, <code>run</code>, <code>list--checked</code>, <code>list--numbered</code>, <code>summary--KPI</code>. Chevrons and arrows have no twin and use <code>.t-icon--directional</code> instead. Everything else — cameras, hearts, phones — must not flip.</p>
    </div>`);

  body += S('usage', 'Using icons', `${specimen({ label: 'Three ways in', canvas: 'plain', dir: 'ltr', html: `<pre class="code" style="inline-size:100%;background:var(--t-bg-sunken);border-radius:10px"><code>&lt;!-- 1. Sprite — one request, any icon --&gt;
&lt;svg class="t-icon"&gt;&lt;use href="/assets/sprite-20.svg#t-filter"/&gt;&lt;/svg&gt;

&lt;!-- 2. Inline — when you need to style the paths --&gt;
&lt;svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"&gt;…&lt;/svg&gt;

&lt;!-- 3. React --&gt;
import { Filter } from '@torob/icons';
&lt;Filter size={20} /&gt;</code></pre>` })}
    ${guidance([
      'Size with <code>.t-icon</code> (20px), <code>--sm</code> (16px) or <code>--lg</code> (24px). Only 16 and 20 are drawn; 24 is a scale.',
      'Let icons inherit <code>currentColor</code> so they follow their container\'s state.',
      'Add <code>.t-icon--directional</code> to chevrons and arrows.',
      'Give a standalone icon an accessible name; mark a decorative one <code>aria-hidden</code>.',
    ], [
      'Mixing 16 and 20 in the same row — the optical weight differs.',
      'Recolouring icon paths individually. One colour per icon.',
      'Mirroring non-directional icons in RTL.',
      'Icons at sizes other than 16, 20 or 24. Carbon\'s hinting is drawn for those.',
    ])}`);

  body += `<script>(function(){
  var grid=document.getElementById('iconGrid'), input=document.getElementById('iconSearch'),
      sizeBtn=document.getElementById('iconSize'), catSel=document.getElementById('iconCat'),
      countEl=document.getElementById('iconCount'), moreEl=document.getElementById('iconMore');
  var idx=null, geo=null, size=20, shown=0, filtered=[], PAGE=180;
  var root=(document.querySelector('link[href$="assets/site.css"]')||{}).href.replace(/site\\.css$/,'');

  function cell(it){
    var g=geo&&geo[it.n]&&geo[it.n].sizes[size];
    return '<button class="swatch" data-copy-text="'+it.n+'" title="'+it.n+'" style="padding:11px 6px;display:flex;flex-direction:column;align-items:center;gap:7px;border-radius:9px">'
      +(g?'<svg viewBox="'+g.viewBox+'" width="'+size+'" height="'+size+'" fill="currentColor" style="color:var(--t-fg-default)">'+g.content+'</svg>':'<span style="inline-size:'+size+'px;block-size:'+size+'px"></span>')
      +'<span style="font-size:9.5px;line-height:1.3;color:var(--t-fg-secondary);word-break:break-word;text-align:center;max-inline-size:86px">'+it.n+'</span></button>';
  }
  function renderMore(){
    var next=filtered.slice(shown, shown+PAGE);
    grid.insertAdjacentHTML('beforeend', next.map(cell).join(''));
    shown+=next.length;
    moreEl.innerHTML = shown<filtered.length
      ? '<button class="t-btn t-btn--outline t-btn--md" id="iconMoreBtn">Show '+Math.min(PAGE,filtered.length-shown)+' more of '+(filtered.length-shown)+'</button>' : '';
    var b=document.getElementById('iconMoreBtn'); if(b) b.onclick=renderMore;
  }
  function apply(){
    var q=(input.value||'').toLowerCase().trim(), c=catSel.value;
    filtered=idx.filter(function(it){
      if(c && it.c!==c) return false;
      if(!q) return true;
      return (it.n+' '+it.f+' '+it.s+' '+(it.a||[]).join(' ')).toLowerCase().indexOf(q)>=0;
    });
    countEl.textContent=filtered.length.toLocaleString('en-US')+' icons';
    grid.innerHTML=''; shown=0; renderMore();
  }
  Promise.all([fetch(root+'icons-index.json').then(function(r){return r.json()}),
               fetch(root+'icons.json').then(function(r){return r.json()})])
    .then(function(res){ idx=res[0]; geo=res[1]; apply(); })
    .catch(function(){ countEl.textContent='Could not load the icon index.'; });
  var t; input.addEventListener('input',function(){clearTimeout(t);t=setTimeout(apply,110)});
  catSel.addEventListener('change',apply);
  sizeBtn.addEventListener('click',function(){ size=size===20?16:20; sizeBtn.textContent=size+'px'; sizeBtn.dataset.size=size; apply(); });
})();</script>`;

  return { body, toc, title: 'Icon library', description: `${count.toLocaleString('en-US')} IBM Carbon icons at 16 and 20px — the exact set from the Torob Sketch library.`, eyebrow: 'Resources' };
}

/* ─────────────────────────── TOKENS ─────────────────────────── */
export function tokensPage(m) {
  const toc = [], S = (id, t, i) => { toc.push({ id, label: t }); return section(id, t, i); };
  const nBase = Object.keys(m.base).length, nSem = Object.keys(m.modes.light).length;

  let body = `<div class="prose">
    <p><strong>${nBase} primitives</strong> and <strong>${nSem} semantic tokens per mode</strong>, generated from <code>source/tokens/*.json</code> in W3C DTCG format. Every artefact below — every stylesheet, every platform export, this website, and the MCP server — is generated from those files. Nothing is hand-maintained downstream.</p>
  </div>`;

  body += S('exports', 'Exports', `<div class="prose"><p>One command, twelve artefacts:</p></div>
    <div class="spec" data-spec><div class="spec__bar"><span class="spec__label">terminal</span><div class="spec__tools"><button class="site-tool copy-btn" data-copy="tok-cmd">Copy</button></div></div>
    <pre class="code" id="tok-cmd"><code>node build/tokens-build.mjs</code></pre></div>
    ${table(['File', 'Format', 'For'], [
      ['<code>tokens.css</code>', 'CSS custom properties', 'The canonical layer. Light, dark and reduced-transparency in one file.'],
      ['<code>tokens.tailwind.css</code>', 'Tailwind v4 <code>@theme</code>', 'Tailwind v4 projects — maps to <code>bg-*</code>, <code>text-*</code>, <code>rounded-*</code> utilities.'],
      ['<code>tokens.scss</code>', 'SCSS variables', 'Legacy Sass build pipelines.'],
      ['<code>tokens.ts</code> / <code>tokens.js</code>', 'Typed nested object', 'JS/TS consumers, styled-components, CSS-in-JS.'],
      ['<code>tokens.flat.json</code>', 'Flat key/value', 'Design tools, third-party pipelines, Tokens Studio.'],
      ['<code>tokens.resolved.json</code>', 'Full resolved model', 'The MCP server and this site read this.'],
      ['<code>TorobTokens.swift</code>', 'SwiftUI', 'iOS. Colours carry both modes in one call.'],
      ['<code>colors.xml</code> / <code>colors-night.xml</code> / <code>dimens.xml</code>', 'Android resources', 'Drop into <code>values/</code> and <code>values-night/</code>.'],
      ['<code>tokens.llms.md</code>', 'Markdown', 'AI agents without MCP access.'],
    ])}
    <div class="prose" style="margin-block-start:18px"><p>Download any of them:</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-block-start:10px">
        ${['tokens.css', 'tokens.tailwind.css', 'tokens.scss', 'tokens.ts', 'tokens.flat.json'].map(f =>
          `<a class="t-btn t-btn--outline t-btn--md" href="../packages/css/dist/${f}" download>${f}</a>`).join('')}
      </div>
    </div>`);

  body += S('architecture', 'Three tiers', `<div class="prose">
      <p>The standard architecture — Material 3, Adobe Spectrum and Salesforce Lightning all use a version of it, and the reason a rebrand is a token edit rather than a codebase rewrite.</p>
      <ol>
        <li><strong>Primitive</strong> — <code>--t-color-sky-800</code>. The raw palette. Product code never touches these.</li>
        <li><strong>Semantic</strong> — <code>--t-fg-default</code>. Role-based, resolves per mode. <em>This is the layer you use.</em></li>
        <li><strong>Component</strong> — <code>--t-action-primary-bg-hover</code>. Internals of one component.</li>
      </ol>
    </div>
    ${specimen({ label: 'Resolution chain', canvas: 'plain', dir: 'ltr', html: `<pre class="code" style="inline-size:100%;background:var(--t-bg-sunken);border-radius:10px"><code>--t-fg-default
  ↳ light: {color.sky.800} → #1E293B
  ↳ dark:  {color.sky.100} → #F1F5F9

--t-action-primary-bg-gradient
  ↳ linear-gradient(180deg, {color.red.300} 0%, {color.brand.red} 100%)
  ↳ linear-gradient(180deg, #F04151 0%, #D73948 100%)</code></pre>` })}`);

  body += S('browser', 'Browse', `<div class="wide">
    <div style="display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-block-end:12px">
      <div class="site-search" style="flex:1;min-inline-size:220px;max-inline-size:none">
        <svg class="site-search__icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M7 2a5 5 0 1 0 3.1 8.9l3.2 3.3 1.1-1.1-3.3-3.2A5 5 0 0 0 7 2zm0 1.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"/></svg>
        <input id="tokenSearch" type="search" placeholder="Search tokens — try “glass”, “status”, “radius”…" autocomplete="off">
      </div>
      <span class="t-body-sm t-tone-secondary" id="tokenCount"></span>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Tier</th></tr></thead><tbody id="tokenRows"></tbody></table></div>
  </div>
  <script>(function(){
    var root=(document.querySelector('link[href$="assets/site.css"]')||{}).href.replace(/site\\.css$/,'');
    var rows=document.getElementById('tokenRows'), input=document.getElementById('tokenSearch'), countEl=document.getElementById('tokenCount');
    var all=[];
    function chip(v){
      var isC=/^(#|rgb|hsl|linear-gradient)/.test(String(v));
      return (isC?'<span style="display:inline-block;inline-size:14px;block-size:14px;border-radius:4px;border:1px solid var(--t-border-subtle);background:'+v+';vertical-align:-2px;margin-inline-end:6px"></span>':'')
        +'<code style="font-size:11.5px">'+String(v).replace(/</g,'&lt;')+'</code>';
    }
    function render(list){
      countEl.textContent=list.length+' tokens';
      rows.innerHTML=list.slice(0,400).map(function(t){
        return '<tr><td><button class="site-tool copy-btn" data-copy-text="var('+t.k+')" style="font-family:inherit;font-size:11.5px;padding:2px 7px;block-size:auto">'+t.k+'</button></td><td>'+chip(t.l)+'</td><td>'+(t.d!=null?chip(t.d):'<span style="color:var(--t-fg-disabled)">—</span>')+'</td><td>'+t.tier+'</td></tr>';
      }).join('');
    }
    fetch(root+'tokens.json').then(function(r){return r.json()}).then(function(m){
      Object.keys(m.base).forEach(function(p){
        var k='--t-'+p.replace(/\\./g,'-'); var v=m.base[p].value;
        all.push({k:k,l:Array.isArray(v)?v.join(', '):v,d:null,tier:p.indexOf('glass')===0?'Material':p.indexOf('color.')===0?'Primitive':'Scale'});
      });
      Object.keys(m.modes.light).forEach(function(p){
        var k='--t-'+p.replace(/\\./g,'-');
        all.push({k:k,l:m.modes.light[p].value,d:(m.modes.dark[p]||{}).value,tier:'Semantic'});
      });
      all.sort(function(a,b){ return (a.tier==='Semantic'?0:1)-(b.tier==='Semantic'?0:1) || a.k.localeCompare(b.k); });
      render(all);
    });
    var t; input.addEventListener('input',function(){clearTimeout(t);t=setTimeout(function(){
      var q=input.value.toLowerCase().trim();
      render(q?all.filter(function(x){return x.k.toLowerCase().indexOf(q)>=0}):all);
    },110)});
  })();</script>`);

  return { body, toc, title: 'Token browser', description: `${nBase} primitives, ${nSem} semantic tokens per mode, twelve export formats.`, eyebrow: 'Resources' };
}
