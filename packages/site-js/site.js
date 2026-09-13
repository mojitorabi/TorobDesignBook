/* کتاب دیزاین ترب — docs site behaviour. No dependencies. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

  // Where assets live, derived from the stylesheet link so every page depth works.
  const assetRoot = ((document.querySelector('link[href$="assets/site.css"]') || {}).href || '')
    .replace(/site\.css$/, '');

  /* ---------- Theme ----------
     Three, not two. `light` and `dim` are the two the product already had;
     `dark` is true black for OLED and for readers who want maximum contrast.
     The system preference maps to `dim`, which is the gentler default. */
  const root = document.documentElement;
  const THEMES = ['light', 'dim', 'dark'];
  /* The English book is a different page, not a different script, so the two
     label sets live together and the page's own lang picks one. */
  const EN = document.documentElement.lang === 'en';
  const THEME_FA = EN
    ? { light: 'Light', dim: 'Dim', dark: 'Dark' }
    : { light: 'روشن', dim: 'ملایم', dark: 'تیره' };
  const THEME_ICON = {
    light: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 0h.01V3H8zm0 13h.01V16H8zM0 7.99h3V8H0zm13 0h3V8h-3zM2.3 3.3l2.1 2.1-1 1-2.1-2.1zm8.3 8.3 2.1 2.1-1 1-2.1-2.1zm3.1-9.3 1 1-2.1 2.1-1-1zM4.4 10.6l1 1-2.1 2.1-1-1z',
    dim:   'M8 1.5A6.5 6.5 0 1 0 14.5 8 5 5 0 0 1 8 1.5z',
    dark:  'M13.6 10.4A6 6 0 0 1 5.6 2.4 6.5 6.5 0 1 0 13.6 10.4z',
  };
  const themeBtn = $('#themeToggle');
  const themeLabel = $('#themeLabel');
  const themeIcon = $('#themeIcon');

  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dim' : 'light');
  }
  function paintTheme() {
    const t = currentTheme();
    if (themeLabel) themeLabel.textContent = THEME_FA[t];
    if (themeIcon) themeIcon.setAttribute('d', THEME_ICON[t]);
    if (themeBtn) themeBtn.setAttribute('aria-label', EN
      ? `Theme: ${THEME_FA[t]} — click to change`
      : `پوسته: ${THEME_FA[t]} — برای تغییر کلیک کنید`);
  }
  paintTheme();
  themeBtn && themeBtn.addEventListener('click', () => {
    const next = THEMES[(THEMES.indexOf(currentTheme()) + 1) % THEMES.length];
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('torob-theme', next); } catch (e) {}
    paintTheme();
  });

  /* ---------- Locale: direction + copy + numerals ----------
     Flipping direction alone leaves Persian copy sitting left-aligned, which
     tells you nothing. A locale switch swaps all three, so an English reader
     can judge hierarchy, density and truncation on the same components. */
  let dict = null, dictPromise = null;
  const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
  const originals = new WeakMap();

  function loadDict() {
    if (dict) return Promise.resolve(dict);
    if (!dictPromise) {
      dictPromise = fetch(assetRoot + 'i18n.json')
        .then(r => r.json())
        .then(d => (dict = d))
        .catch(() => (dict = {}));
    }
    return dictPromise;
  }

  const toLatinDigits = s => s
    .replace(/[۰-۹]/g, d => FA_DIGITS.indexOf(d))
    .replace(/٬/g, ',').replace(/٫/g, '.').replace(/٪/g, '%');

  function translate(text) {
    const key = text.trim();
    if (!key) return text;
    const hit = dict[key];
    // Fall back to numeral conversion so an untranslated string is still
    // readable rather than silently staying Persian.
    const out = hit !== undefined ? hit : toLatinDigits(key);
    return text.replace(key, out);
  }

  const ATTRS = ['aria-label', 'placeholder', 'title', 'aria-valuetext'];

  function localiseStage(stage, locale) {
    if (locale === 'fa') {
      const saved = originals.get(stage);
      if (saved) { stage.innerHTML = saved; originals.delete(stage); }
      stage.setAttribute('dir', 'rtl');
      stage.setAttribute('lang', 'fa');
      return;
    }
    if (!originals.has(stage)) originals.set(stage, stage.innerHTML);
    const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => { if (n.nodeValue.trim()) n.nodeValue = translate(n.nodeValue); });
    stage.querySelectorAll('*').forEach(el => {
      ATTRS.forEach(a => { if (el.hasAttribute(a)) el.setAttribute(a, translate(el.getAttribute(a))); });
      if (el.tagName === 'INPUT' && el.value) el.value = translate(el.value);
    });
    stage.setAttribute('dir', 'ltr');
    stage.setAttribute('lang', 'en');
  }

  async function setLocale(scope, locale) {
    await loadDict();
    const stages = scope === document
      ? $$('.spec__stage')
      : [$('.spec__stage', scope)].filter(Boolean);
    stages.forEach(s => localiseStage(s, locale));
  }

  const localeBtn = $('#localeToggle'), localeLabel = $('#localeLabel');
  /* The English book declares its locale on <body>; the specimens should come
     up in that language rather than in Persian waiting to be switched. */
  if (document.body.dataset.locale === 'en') addEventListener('load', () => setLocale(document, 'en'));
  localeBtn && localeBtn.addEventListener('click', async () => {
    const next = localeBtn.dataset.locale === 'fa' ? 'en' : 'fa';
    localeBtn.dataset.locale = next;
    localeLabel.textContent = next === 'fa' ? (EN ? 'Persian' : 'فارسی') : 'English';
    await setLocale(document, next);
  });

  /* ---------- Code drawers ---------- */
  $$('[data-spec-code]').forEach(btn => btn.addEventListener('click', () => {
    const drawer = $('.spec__code', btn.closest('[data-spec]'));
    const open = drawer.hasAttribute('hidden');
    drawer.toggleAttribute('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
    remarkScrollers();
  }));
  $$('.spec__tab').forEach(tab => tab.addEventListener('click', () => {
    const wrap = tab.closest('.spec__code');
    $$('.spec__tab', wrap).forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    $$('pre.code', wrap).forEach(p => p.toggleAttribute('hidden', p.dataset.panel !== tab.dataset.tab));
    remarkScrollers();
  }));

  /* ---------- Reference tabs ----------
     Roving tabindex so the tab strip is one stop, arrows move between tabs,
     and the visible panel is the only one in the accessibility tree. */
  $$('.tabset').forEach(set => {
    const tabs = $$('[role="tab"]', set), panels = $$('.tabset__panel', set);
    const show = i => {
      tabs.forEach((t, n) => {
        t.setAttribute('aria-selected', String(n === i));
        t.tabIndex = n === i ? 0 : -1;
      });
      panels.forEach((p, n) => {
        p.toggleAttribute('hidden', n !== i);
        if (n === i) p.tabIndex = 0; else p.removeAttribute('tabindex');
      });
      remarkScrollers();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(i));
      t.addEventListener('keydown', e => {
        /* RTL: ArrowLeft moves forward, the way the eye does. */
        const step = { ArrowLeft: 1, ArrowRight: -1, Home: -99, End: 99 }[e.key];
        if (step === undefined) return;
        e.preventDefault();
        const n = Math.abs(step) > 90 ? (step > 0 ? tabs.length - 1 : 0)
                                      : (i + step + tabs.length) % tabs.length;
        tabs[n].focus(); show(n);
      });
    });
  });

  /* ---------- Scrollable regions ----------
     A box that scrolls must be reachable by keyboard (WCAG 2.1.1). Only the
     boxes that actually overflow get a tab stop, so the page does not collect
     stops it does not need. Re-checked on resize and when a drawer opens. */
  const SCROLLERS = 'pre.code, .tbl-wrap, .sym__stage, .spec__stage--scroll, [data-scroll-region]';
  function markScrollers(root) {
    $$(SCROLLERS, root || document).forEach(el => {
      const scrolls = el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
      if (scrolls && !el.querySelector('a,button,input,select,textarea,[tabindex]')) {
        el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) el.setAttribute('role', 'group');
        if (!el.hasAttribute('aria-label')) {
          const kind = el.matches('pre.code') ? 'قطعهٔ کد' : el.matches('.tbl-wrap') ? 'جدول' : 'نمایش';
          el.setAttribute('aria-label', el.dataset.scrollLabel || kind + ' — قابل پیمایش');
        }
      } else if (el.getAttribute('role') === 'group' && el.getAttribute('tabindex') === '0') {
        el.removeAttribute('tabindex'); el.removeAttribute('role'); el.removeAttribute('aria-label');
      }
    });
  }
  markScrollers();
  let scrollTimer;
  const remarkScrollers = () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(() => markScrollers(), 120); };
  addEventListener('resize', remarkScrollers);

  /* ---------- Anatomy diagrams ----------
     The callout numbers are placed from the rendered component, not from a
     drawing, so they land on the real parts at the real size and follow any
     change to the CSS. Pointing at a legend row outlines its part. */
  function drawAnatomy(box) {
    const stage = $('.anatomy__stage', box);
    let sels;
    try { sels = JSON.parse(box.dataset.anatomy || '[]'); } catch (e) { return; }
    $$('.anatomy__pin, .anatomy__outline', box).forEach(el => el.remove());
    const base = stage.getBoundingClientRect();
    const taken = [];
    sels.forEach((sel, i) => {
      const el = sel === ':root' ? stage.firstElementChild : $(sel, stage);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pin = document.createElement('span');
      pin.className = 'anatomy__pin';
      pin.textContent = String(i + 1).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
      /* The root's number hangs off the outer corner; an inner part's number
         sits in the space just above it, so it points at the part without
         covering it. Two parts that share a corner step further out. */
      const isRoot = sel === ':root';
      const x = base.right - r.right - (isRoot ? 6 : 0);
      let y = r.top - base.top - (isRoot ? 0 : 13);
      while (taken.some(t => Math.abs(t.x - x) < 18 && Math.abs(t.y - y) < 18)) y -= 16;
      taken.push({ x, y });
      pin.style.insetInlineStart = x + 'px';
      pin.style.insetBlockStart = y + 'px';
      const out = document.createElement('span');
      out.className = 'anatomy__outline';
      out.dataset.for = sel;
      out.style.insetInlineStart = (base.right - r.right - 3) + 'px';
      out.style.insetBlockStart = (r.top - base.top - 3) + 'px';
      out.style.inlineSize = (r.width + 6) + 'px';
      out.style.blockSize = (r.height + 6) + 'px';
      stage.append(out, pin);
    });
  }
  $$('.anatomy').forEach(box => {
    drawAnatomy(box);
    const legend = box.parentElement && $('.anatomy__legend', box.parentElement);
    if (!legend) return;
    legend.addEventListener('pointerover', e => {
      const row = e.target.closest('.anatomy__row[data-part]');
      $$('.anatomy__outline', box).forEach(o => { o.dataset.on = String(!!row && o.dataset.for === row.dataset.part); });
    });
    legend.addEventListener('pointerleave', () => $$('.anatomy__outline', box).forEach(o => { o.dataset.on = 'false'; }));
  });
  addEventListener('resize', () => { clearTimeout(window.__anatomyT); window.__anatomyT = setTimeout(() => $$('.anatomy').forEach(drawAnatomy), 140); });

  /* ---------- Playground ----------
     One sample, the variants and states the stylesheet actually defines, and
     the markup those choices produce. Nothing here is hand-written per
     component: the options come from the build, which read them from the CSS. */
  const STATE_FA = { default: 'پیش‌فرض', hover: 'هاور', focus: 'فوکوس', active: 'فشرده',
                     disabled: 'غیرفعال', loading: 'بارگذاری', selected: 'انتخاب‌شده', error: 'خطا' };

  function playHtml(cfg, pick) {
    let html = cfg.sample;
    // strip the sample's own modifiers for the groups we control, then apply
    for (const group of ['variant', 'size']) {
      const list = group === 'variant' ? cfg.variants : cfg.sizes;
      if (!list.length) continue;
      const strip = new RegExp(`\\s*${cfg.root}--(?:${list.join('|')})\\b`, 'g');
      html = html.replace(/class="([^"]*)"/, (m, v) => `class="${v.replace(strip, '')}"`);
      if (pick[group]) html = html.replace(/class="([^"]*)"/, (m, v) => `class="${v.trim()} ${cfg.root}--${pick[group]}"`);
    }
    html = html.replace(/^(<[a-z0-9-]+)([^>]*?)\s(?:data-state|aria-disabled|aria-invalid)="[^"]*"/gi, '$1$2');
    if (pick.state && pick.state !== 'default') {
      if (pick.state === 'selected') {
        html = html.replace(/^(<[a-z0-9-]+)/i, '$1 data-state="selected"');
        const open = /^<[^>]*>/.exec(html)?.[0] ?? '';
        for (const a of ['aria-pressed', 'aria-checked', 'aria-selected']) {
          if (open.includes(a + '=')) { html = html.replace(new RegExp(`${a}="[^"]*"`), `${a}="true"`); break; }
        }
      } else {
        html = html.replace(/^(<[a-z0-9-]+)/i, `$1 data-state="${pick.state}"`);
        if (pick.state === 'disabled') html = html.replace(/^(<[a-z0-9-]+)/i, '$1 aria-disabled="true"');
        if (pick.state === 'error') html = html.replace(/^(<[a-z0-9-]+)/i, '$1 aria-invalid="true"');
      }
    }
    return html.replace(/\s{2,}/g, ' ').replace(/class="\s+/g, 'class="').replace(/\s+"/g, '"');
  }

  $$('.play').forEach(box => {
    let cfg;
    try { cfg = JSON.parse(box.dataset.play); } catch (e) { return; }
    const controls = $('.play__controls', box), stage = $('.play__stage', box), code = $('pre.code code', box);
    const pick = { variant: cfg.variants[0] || '', size: cfg.sizes.includes('md') ? 'md' : (cfg.sizes[0] || ''), state: 'default' };

    const group = (label, name, values, fa) => {
      if (values.length < 2) return '';
      return `<div class="play__group"><span class="play__label">${label}</span>` +
        values.map(v => `<button type="button" class="play__opt" data-name="${name}" data-value="${v}" aria-pressed="${String(pick[name] === v)}">${fa ? (STATE_FA[v] ?? v) : v}</button>`).join('') +
        '</div>';
    };
    controls.innerHTML = group('گونه', 'variant', cfg.variants) +
                         group('اندازه', 'size', cfg.sizes) +
                         group('حالت', 'state', cfg.states, true);

    function paint() {
      const html = playHtml(cfg, pick);
      stage.innerHTML = html;
      code.textContent = html;
      /* The code box only gets its content now, so whether it scrolls — and
         so whether it needs a tab stop — can only be known after this. */
      remarkScrollers();
    }
    controls.addEventListener('click', e => {
      const b = e.target.closest('.play__opt');
      if (!b) return;
      pick[b.dataset.name] = b.dataset.value;
      $$(`.play__opt[data-name="${b.dataset.name}"]`, controls).forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      paint();
    });
    paint();
  });

  /* ---------- Copy ---------- */
  function flash(btn, text) {
    const was = btn.textContent;
    btn.textContent = text; btn.dataset.copied = 'true';
    setTimeout(() => { btn.textContent = was; delete btn.dataset.copied; }, 1400);
  }
  async function writeClipboard(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      flash(btn, 'کپی شد');
    } catch (e) {
      // Clipboard API needs a secure context; file:// pages fall back.
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); flash(btn, 'کپی شد'); }
      catch (e2) { flash(btn, '⌘C را بزنید'); }
      ta.remove();
    }
  }
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const src = document.getElementById(btn.dataset.copy);
    if (src) writeClipboard(src.textContent, btn);
  });
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy-text]');
    if (btn) writeClipboard(btn.dataset.copyText, btn);
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = $('#navToggle'), siteNav = $('#siteNav');
  /* Off-canvas is not closed. A panel that is only translated off-screen keeps
     its sixty links in the tab order and in the accessibility tree, so a
     keyboard or screen-reader user on a phone walks the whole navigation
     before reaching the page. `inert` is what actually closes it. */
  const NAV_OFFCANVAS = () => matchMedia('(max-width: 1023px)').matches;
  function syncNavInert() {
    if (!siteNav) return;
    const closed = NAV_OFFCANVAS() && siteNav.dataset.open !== 'true';
    siteNav.toggleAttribute('inert', closed);
  }
  syncNavInert();
  addEventListener('resize', syncNavInert);
  navToggle && navToggle.addEventListener('click', () => {
    const open = siteNav.dataset.open !== 'true';
    siteNav.dataset.open = String(open);
    navToggle.setAttribute('aria-expanded', String(open));
    syncNavInert();
    if (open) {
      const first = $('a', siteNav);
      first && first.focus({ preventScroll: true });
    } else navToggle.focus({ preventScroll: true });
  });
  /* Escape closes it, and so does following a link — otherwise the panel stays
     open over the page it just navigated to. */
  siteNav && siteNav.addEventListener('keydown', e => {
    if (e.key === 'Escape' && siteNav.dataset.open === 'true') navToggle.click();
  });
  siteNav && siteNav.addEventListener('click', e => {
    if (e.target.closest('a') && NAV_OFFCANVAS() && siteNav.dataset.open === 'true') {
      siteNav.dataset.open = 'false';
      navToggle.setAttribute('aria-expanded', 'false');
      syncNavInert();
    }
  });

  /* ---------- Side nav: keep the reader's place ----------
     Two small things, both about never having to hunt for where you are.
     The group holding the current page is already open from the markup; here
     we scroll it into view, and remember any other group the reader opened so
     it survives the next page load. */
  if (siteNav) {
    const OPEN_KEY = 'torob-nav-open';
    const groups = $$('[data-nav-group]', siteNav);
    let opened = [];
    try { opened = JSON.parse(sessionStorage.getItem(OPEN_KEY) || '[]'); } catch (e) {}
    groups.forEach(g => { if (opened.indexOf(g.dataset.navGroup) >= 0) g.open = true; });
    const remember = () => {
      try {
        sessionStorage.setItem(OPEN_KEY, JSON.stringify(
          groups.filter(g => g.open).map(g => g.dataset.navGroup)));
      } catch (e) {}
    };
    groups.forEach(g => g.addEventListener('toggle', remember));

    /* Centre the current page in the panel, but only when it is not already
       comfortably visible — otherwise every navigation nudges the list. */
    const revealCurrent = () => {
      const here = $('a[aria-current="page"]', siteNav);
      if (!here || !siteNav.clientHeight) return;
      const a = here.getBoundingClientRect(), n = siteNav.getBoundingClientRect();
      if (a.top >= n.top + 48 && a.bottom <= n.bottom - 48) return;
      siteNav.scrollTop += a.top - n.top - (n.height - a.height) / 2;
    };
    revealCurrent();
    /* On a phone the panel has no height until it opens. */
    navToggle && navToggle.addEventListener('click', () => {
      if (siteNav.dataset.open === 'true') requestAnimationFrame(revealCurrent);
    });
  }

  /* ---------- Table of contents scroll-spy ---------- */
  const tocLinks = $$('.site-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(tocLinks.map(a => [a.getAttribute('href').slice(1), a]));
    const seen = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => en.isIntersecting ? seen.add(en.target.id) : seen.delete(en.target.id));
      let active = null;
      for (const [id, a] of map) if (seen.has(id)) { active = a; break; }
      tocLinks.forEach(a => a.toggleAttribute('data-active', a === active));
    }, { rootMargin: '-72px 0px -70% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Search ---------- */
  const input = $('#siteSearch'), results = $('#siteResults');
  const resultsBox = $('#siteResultsBox'), resultsEmpty = $('#siteResultsEmpty'), resultsStatus = $('#siteResultsStatus');
  let index = null, activeIdx = -1;

  /* ARIA 1.2 combobox: the input keeps focus, the active option is pointed at
     with aria-activedescendant, and the popup is closed by clearing the flag. */
  function setActive(i) {
    const links = $$('a', results);
    activeIdx = links.length ? (i + links.length) % links.length : -1;
    links.forEach((a, n) => a.setAttribute('aria-selected', String(n === activeIdx)));
    if (activeIdx >= 0) {
      input.setAttribute('aria-activedescendant', links[activeIdx].id);
      links[activeIdx].scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  }
  function closeResults() {
    if (!resultsBox) return;
    resultsBox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  async function ensureIndex() {
    if (index) return index;
    try {
      const r = await fetch(assetRoot + 'search.json');
      index = await r.json();
    } catch (e) { index = []; }
    return index;
  }
  function render(items, q) {
    results.innerHTML = items.map((it, i) =>
      `<a class="t-menu-item" id="siteResult-${i}" href="${assetRoot}../${it.u}" role="option" tabindex="-1" aria-selected="${i === 0}">
         <span>${it.t}</span><span class="site-results__group">${it.g}</span>
       </a>`).join('');
    if (resultsEmpty) {
      resultsEmpty.hidden = items.length > 0;
      if (!items.length) resultsEmpty.textContent = EN
        ? `Nothing found for “${q}”.`
        : `نتیجه‌ای برای «${q}» پیدا نشد.`;
    }
    if (resultsStatus) resultsStatus.textContent = items.length
      ? (EN ? `${items.length} results` : `${items.length} نتیجه`)
      : (EN ? 'Nothing found' : 'نتیجه‌ای پیدا نشد');
    setActive(0);
  }
  async function run(q) {
    const idx = await ensureIndex();
    const needle = q.toLowerCase().trim();
    if (!needle) { closeResults(); if (resultsStatus) resultsStatus.textContent = ''; return; }
    const scored = [];
    for (const it of idx) {
      const hay = (it.t + ' ' + it.g + ' ' + (it.k || '')).toLowerCase();
      const pos = hay.indexOf(needle);
      if (pos >= 0) scored.push([pos + (it.t.toLowerCase().startsWith(needle) ? -50 : 0), it]);
    }
    scored.sort((a, b) => a[0] - b[0]);
    render(scored.slice(0, 24).map(s => s[1]), q);
    resultsBox.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }
  if (input) {
    let t;
    input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => run(input.value), 90); });
    input.addEventListener('keydown', e => {
      const links = $$('a', results);
      if (e.key === 'Escape') { closeResults(); input.blur(); return; }
      if (!links.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(activeIdx + (e.key === 'ArrowDown' ? 1 : -1));
      }
      if (e.key === 'Enter' && links[activeIdx]) { e.preventDefault(); links[activeIdx].click(); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); input.focus();
      }
    });
    document.addEventListener('click', e => { if (!e.target.closest('.site-search')) closeResults(); });
  }

  /* ---------- Live demo behaviours used across specimens ---------- */
  document.addEventListener('click', e => {
    // Segmented / switch / chip / tab selection
    const seg = e.target.closest('.t-segmented__item, .t-switch__option, .t-tab');
    if (seg) {
      const group = seg.parentElement;
      const attr = seg.hasAttribute('aria-checked') ? 'aria-checked' : 'aria-selected';
      $$(seg.className.split(' ')[0].replace(/^/, '.'), group).forEach(x => x.setAttribute(attr, 'false'));
      seg.setAttribute(attr, 'true');
      if (seg.classList.contains('t-switch__option')) moveThumb(group);
    }
    const chip = e.target.closest('.t-chip[aria-pressed]');
    if (chip) chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');

    const acc = e.target.closest('.t-accordion__trigger');
    if (acc) {
      const open = acc.getAttribute('aria-expanded') !== 'true';
      acc.setAttribute('aria-expanded', String(open));
      const panel = document.getElementById(acc.getAttribute('aria-controls'));
      if (panel) panel.toggleAttribute('hidden', !open);
    }
    const pin = e.target.closest('.t-pin');
    if (pin) {
      $$('.t-pin', pin.closest('[data-pin-group]') || document).forEach(p => p.setAttribute('aria-pressed', 'false'));
      pin.setAttribute('aria-pressed', 'true');
    }

    /* A choice chip is one of several: pressing one releases the rest of its
       row. The clear button inside it removes the value instead. */
    const clear = e.target.closest('.t-choice__clear');
    if (clear) {
      e.preventDefault();
      const chip = clear.closest('.t-choice');
      const action = $('.t-choice__action', chip);
      if (action) action.setAttribute('aria-pressed', 'false');
      clear.remove();
      return;
    }
    const choice = e.target.closest('.t-choice, .t-choice__action');
    if (choice) {
      const chip = choice.closest('.t-choice');
      const row = chip.closest('.t-chip-group') || chip.parentElement;
      $$('.t-choice', row).forEach(c => {
        const t = $('.t-choice__action', c) ?? c;
        if (t.hasAttribute('aria-pressed')) t.setAttribute('aria-pressed', String(c === chip));
      });
    }

    /* Favourite, and anything else that is a two-state icon button. */
    const toggle = e.target.closest('.t-icon-button[aria-pressed], [data-toggle]');
    if (toggle) toggle.setAttribute('aria-pressed', toggle.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');

    /* Quantity stepper: the value between the two buttons. */
    const step = e.target.closest('.t-stepper__btn');
    if (step) {
      const wrap = step.closest('.t-stepper');
      const val = $('.t-stepper__value', wrap);
      const fa = '۰۱۲۳۴۵۶۷۸۹';
      const n = Number([...val.textContent.trim()].map(ch => { const i = fa.indexOf(ch); return i < 0 ? ch : i; }).join('')) || 1;
      const first = $$('.t-stepper__btn', wrap)[0] === step;
      const next = Math.max(1, Math.min(99, n + (first ? -1 : 1)));
      val.textContent = String(next).replace(/[0-9]/g, d => fa[+d]);
      $$('.t-stepper__btn', wrap)[0].disabled = next <= 1;
    }

    /* Anything with a close affordance inside a dismissible thing. */
    const dismiss = e.target.closest('.t-toast__close, .t-tag__remove, [data-dismiss]');
    if (dismiss) {
      const box = dismiss.closest('.t-toast, .t-tag, [data-dismissable]');
      if (box) {
        box.style.transition = 'opacity 160ms, scale 160ms';
        box.style.opacity = '0'; box.style.scale = '0.97';
        setTimeout(() => box.remove(), 170);
      }
    }

    /* Carousel arrows. The rail scrolls by most of its width, in the logical
       direction, so the same code works in both scripts. */
    const nav = e.target.closest('.t-carousel__nav');
    if (nav) {
      const track = $('.t-carousel__track', nav.closest('.t-carousel'));
      const dir = nav.classList.contains('t-carousel__nav--prev') ? 1 : -1;
      const rtl = getComputedStyle(track).direction === 'rtl';
      track.scrollBy({ left: dir * (rtl ? 1 : -1) * track.clientWidth * 0.8, behavior: 'smooth' });
    }
  });

  /* OTP: typing moves on, Backspace moves back, pasting fills the row. */
  document.addEventListener('input', e => {
    const slot = e.target.closest('.t-otp__slot');
    if (!slot) return;
    slot.value = slot.value.replace(/\D/g, '').slice(0, 1);
    slot.dataset.filled = slot.value ? 'true' : '';
    const slots = $$('.t-otp__slot', slot.closest('.t-otp'));
    const i = slots.indexOf(slot);
    if (slot.value && i < slots.length - 1) slots[i + 1].focus();
  });
  document.addEventListener('keydown', e => {
    const slot = e.target.closest('.t-otp__slot');
    if (!slot || e.key !== 'Backspace' || slot.value) return;
    const slots = $$('.t-otp__slot', slot.closest('.t-otp'));
    const i = slots.indexOf(slot);
    if (i > 0) slots[i - 1].focus();
  });
  document.addEventListener('paste', e => {
    const slot = e.target.closest('.t-otp__slot');
    if (!slot) return;
    e.preventDefault();
    const slots = $$('.t-otp__slot', slot.closest('.t-otp'));
    const code = (e.clipboardData.getData('text') || '').replace(/\D/g, '');
    slots.forEach((s, i) => { s.value = code[i] ?? ''; s.dataset.filled = s.value ? 'true' : ''; });
    (slots[Math.min(code.length, slots.length - 1)] || slot).focus();
  });

  /* The thumb is positioned with inset-inline-start, which is measured from the
     RIGHT edge in RTL — but offsetLeft is always measured from the left. Using
     one for the other puts the thumb under the wrong option in RTL. Measure the
     logical distance instead. */
  function logicalInlineStart(el, parent) {
    const cs = getComputedStyle(parent);
    const rtl = cs.direction === 'rtl';
    const p = parent.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    const border = parseFloat(rtl ? cs.borderInlineEndWidth : cs.borderInlineStartWidth) || 0;
    return (rtl ? p.right - e.right : e.left - p.left) - border;
  }

  function moveThumb(group) {
    const thumb = $('.t-switch__thumb', group);
    const active = $('.t-switch__option[aria-checked="true"]', group);
    if (!thumb || !active) return;
    thumb.style.insetInlineStart = logicalInlineStart(active, group) + 'px';
    thumb.style.inlineSize = active.offsetWidth + 'px';
  }
  /* Measure synchronously — requestAnimationFrame never fires in a background
     tab, which would leave the thumb unpositioned. Then re-measure whenever
     something that changes label width or direction settles. */
  const layoutSwitches = () => $$('.t-switch').forEach(moveThumb);
  layoutSwitches();
  addEventListener('load', layoutSwitches);
  addEventListener('resize', layoutSwitches);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutSwitches);
  new MutationObserver(layoutSwitches)
    .observe(document.body, { attributes: true, attributeFilter: ['dir', 'aria-checked'], subtree: true });

  /* Toast demo */
  window.torobToast = function (opts) {
    let region = $('.t-toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 't-toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    const el = document.createElement('div');
    el.className = 't-toast' + (opts.variant ? ' t-toast--' + opts.variant : '');
    el.setAttribute('dir', 'rtl');
    el.innerHTML = `<div class="t-toast__body"><div class="t-toast__title">${opts.title}</div>${opts.desc ? `<div class="t-toast__desc">${opts.desc}</div>` : ''}</div>${opts.action ? `<button class="t-toast__action">${opts.action}</button>` : ''}<button class="t-toast__close" aria-label="بستن">✕</button>`;
    region.appendChild(el);
    const kill = () => { el.dataset.leaving = 'true'; setTimeout(() => el.remove(), 240); };
    $('.t-toast__close', el).addEventListener('click', kill);
    setTimeout(kill, opts.duration || 4200);
  };
})();
