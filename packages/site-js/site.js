/* Rahnamā docs site behaviour. No dependencies. */
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
  const THEME_FA = { light: 'روشن', dim: 'ملایم', dark: 'تیره' };
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
    if (themeBtn) themeBtn.setAttribute('aria-label', `پوسته: ${THEME_FA[t]} — برای تغییر کلیک کنید`);
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
  localeBtn && localeBtn.addEventListener('click', async () => {
    const next = localeBtn.dataset.locale === 'fa' ? 'en' : 'fa';
    localeBtn.dataset.locale = next;
    localeLabel.textContent = next === 'fa' ? 'فارسی' : 'English';
    await setLocale(document, next);
    $$('[data-spec-locale]').forEach(b => {
      b.dataset.locale = next;
      b.textContent = next === 'fa' ? 'فارسی' : 'English';
    });
  });

  $$('[data-spec-locale]').forEach(btn => btn.addEventListener('click', async () => {
    const next = btn.dataset.locale === 'fa' ? 'en' : 'fa';
    btn.dataset.locale = next;
    btn.textContent = next === 'fa' ? 'فارسی' : 'English';
    await setLocale(btn.closest('[data-spec]'), next);
  }));

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
  navToggle && navToggle.addEventListener('click', () => {
    const open = siteNav.dataset.open !== 'true';
    siteNav.dataset.open = String(open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

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
      `<a id="siteResult-${i}" href="${assetRoot}../${it.u}" role="option" tabindex="-1" aria-selected="${i === 0}">
         <span>${it.t}</span><span class="site-results__group">${it.g}</span>
       </a>`).join('');
    if (resultsEmpty) {
      resultsEmpty.hidden = items.length > 0;
      if (!items.length) resultsEmpty.textContent = `نتیجه‌ای برای «${q}» پیدا نشد.`;
    }
    if (resultsStatus) resultsStatus.textContent = items.length ? `${items.length} نتیجه` : 'نتیجه‌ای پیدا نشد';
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
