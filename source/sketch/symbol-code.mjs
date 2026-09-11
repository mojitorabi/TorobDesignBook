/* What each Sketch symbol becomes in code.

   `code`  the class string (or selector, for the symbols that were only ever
           a state or a position) that reproduces the symbol.
   `kind`  variant  — a real component variant
           state    — a pseudo-class or data- attribute, not a component
           position — a structural selector; Sketch cannot express one
           theme    — a token value, not a component
           asset    — a fixed mark, outside the token pipeline

   Anything not listed falls back to the mapped component's base class. */
export const SYMBOL_CODE = {
  /* ---- Badge ---- */
  'Badge/Card':                       { code: 't-badge t-badge--lg',                      kind: 'variant' },
  'Badge/Card-Picture':               { code: 't-badge',                                  kind: 'variant' },
  'Badge/Card/Guarantee':             { code: 't-guarantee-badge',                        kind: 'variant' },
  'Badge/Card/Normal':                { code: 't-badge',                                  kind: 'variant' },

  /* ---- Button: families ---- */
  'Button / Red / Default':           { code: 't-btn t-btn--red',                         kind: 'variant' },
  'Button / Red / Hover':             { code: '.t-btn--red:hover',                        kind: 'state' },
  'Button / Red / Disable':           { code: 't-btn t-btn--red  +  disabled',            kind: 'state' },
  'Button / Red / Icon':              { code: 't-btn t-btn--red   (+ leading icon)',      kind: 'variant' },
  'Button/Black/Default':             { code: 't-btn t-btn--black',                       kind: 'variant' },
  'Button/Black/Hover':               { code: '.t-btn--black:hover',                      kind: 'state' },
  'Button/Black/Disable':             { code: 't-btn t-btn--black  +  disabled',          kind: 'state' },
  'Button/Black ghost/Default':       { code: 't-btn t-btn--black-ghost',                 kind: 'variant' },
  'Button/Black ghost/Hover':         { code: '.t-btn--black-ghost:hover',                kind: 'state' },
  'Button/Black ghost/Icon':          { code: 't-btn t-btn--black-ghost   (+ icon)',      kind: 'variant' },
  'Button/‌Blue/Default + Chevron':    { code: 't-btn t-btn--blue   (+ chevron--down)',    kind: 'variant' },
  'Button/‌Blue/Hover + Chevron':      { code: '.t-btn--blue:hover',                       kind: 'state' },
  'Button/‌Blue/Clicked + Chevron':    { code: 't-btn t-btn--blue-outline',                kind: 'variant' },
  'Button/‌Blue/Icon':                 { code: 't-btn t-btn--blue   (+ leading icon)',     kind: 'variant' },
  'Button/‌Blue ghost/Icon/Light':     { code: 't-btn t-btn--blue-ghost t-btn--glass',     kind: 'variant' },
  'Button/‌Blue ghost/Icon/Dark':      { code: 't-btn t-btn--blue-ghost t-btn--glass',     kind: 'theme' },
  'Button/Small/Blue/with-badge':     { code: 't-btn t-btn--blue t-btn--sm  +  t-badge',  kind: 'variant' },
  'Button/Xsmall/Secondary/Icon':     { code: 't-btn t-btn--xs t-btn--black-ghost',       kind: 'variant' },

  /* ---- Button: split ---- */
  'Button / Red /split':              { code: 't-btn-split  >  t-btn--red  ×2',           kind: 'variant' },
  'Button / Blue /split':             { code: 't-btn-split  >  t-btn--blue ×2',           kind: 'variant' },

  /* ---- Button: icon-only ---- */
  'Button/Icon/Icon':                 { code: 't-icon-btn',                               kind: 'variant' },
  'Button/Icon/Blue Icon':            { code: 't-icon-btn t-icon-btn--accent',            kind: 'variant' },
  'Button/Icon/Ghost Icon':           { code: 't-icon-btn t-icon-btn--glass',             kind: 'variant' },
  'Button/Icon/Icon Rounded':         { code: 't-icon-btn t-icon-btn--sm t-icon-btn--round', kind: 'variant' },

  /* ---- Buy box ---- */
  'Button/Buy box/Ad':                { code: 't-buybox',                                 kind: 'variant' },
  'Button/Offline Buy box/Ad':        { code: 't-buybox t-buybox--offline',               kind: 'variant' },
  'Button/Buy box/Cheapest':          { code: 't-buybox t-buybox--compact',               kind: 'variant' },

  /* ---- Filter ---- */
  'Filter/Cell/Cell':                 { code: 't-chip',                                   kind: 'variant' },
  'Filter/Cell/Icon':                 { code: 't-chip   (+ leading icon)',                kind: 'variant' },
  'Filter/Cell/Icon+Chevron':         { code: 't-chip   (+ icon + chevron--down)',        kind: 'variant' },
  'Filter/Filter':                    { code: 't-filter-bar',                             kind: 'variant' },

  /* ---- Navigation & layout ---- */
  'Header/Profile':                   { code: 't-page-header',                            kind: 'variant' },
  'Tab/Selected':                     { code: 't-tabs  >  .t-tab[aria-selected="true"]',  kind: 'state' },
  'List / Item':                      { code: 't-list-item',                              kind: 'variant' },
  'List / last item':                 { code: '.t-list-item:last-child',                  kind: 'position' },
  'Segmented Controls/Selected':        { code: '.t-segmented__item[aria-selected="true"]', kind: 'state' },
  'Segmented Controls/Not-selected':    { code: 't-segmented__item',                        kind: 'variant' },
  'Segmented Controls/Icon Selected':   { code: '.t-segmented__item[aria-selected="true"]   (+ icon)', kind: 'state' },
  'Segmented Controls/Icon Not-selected': { code: 't-segmented__item   (+ icon)',           kind: 'variant' },

  /* ---- Inputs ---- */
  'Search bar/Default':               { code: 't-search  >  t-input',                     kind: 'variant' },
  'Search bar/Typing':                { code: '.t-search:focus-within',                   kind: 'state' },
  'Search bar/Searched':              { code: 't-search[data-filled="true"]',             kind: 'state' },
  'Switch/Left':                      { code: 't-switch   (option 1 selected)',           kind: 'state' },
  'Switch/Right':                     { code: 't-switch   (option 2 selected)',           kind: 'state' },

  /* ---- Commerce ---- */
  'Product Card/Normal':              { code: 't-product-card',                           kind: 'variant' },
  'Product Card/Small':               { code: 't-product-card t-product-card--sm',        kind: 'variant' },
  'Product Card/Small Empty':         { code: 't-product-card t-product-card--empty',     kind: 'variant' },
  'Product Card/Empty/Light':         { code: 't-product-card t-product-card--empty',     kind: 'variant' },
  'Product Card/Empty/Dark':          { code: 't-product-card t-product-card--empty',     kind: 'theme' },
  'Product Card/More/Light':          { code: 't-product-card t-product-card--more',      kind: 'variant' },
  'Product Card/More/Dark':           { code: 't-product-card t-product-card--more',      kind: 'theme' },
  'Product Pic/Normal':               { code: 't-thumb',                                  kind: 'variant' },
  'Product Pic/Small':                { code: 't-thumb t-thumb--sm',                      kind: 'variant' },
  'Store-Card/VLP/With product/Light':    { code: 't-store-card   (+ t-store-card__rail)', kind: 'variant' },
  'Store-Card/VLP/With product/Dark':     { code: 't-store-card   (+ t-store-card__rail)', kind: 'theme' },
  'Store-Card/VLP/Without product/Light': { code: 't-store-card',                          kind: 'variant' },
  'Store-Card/VLP/Without product/Dark':  { code: 't-store-card',                          kind: 'theme' },
  'Store-Card/PDP/No product/Light':      { code: 't-store-card t-store-card--glass',      kind: 'variant' },
  'Store-Card/PDP/No product/Dark':       { code: 't-store-card t-store-card--glass',      kind: 'theme' },
  'Store-Card/PDP/Online':                { code: 't-store-card t-store-card--glass   (+ t-buybox)', kind: 'variant' },
  'Store-Card/PDP/Offline':               { code: 't-store-card t-store-card--glass   (+ t-buybox--offline)', kind: 'variant' },
  'Store-Card/PDP/Online-Offline':        { code: 't-store-card t-store-card--glass   (+ both buy boxes)', kind: 'variant' },

  /* ---- Map ---- */
  'Pin':                              { code: 't-pin',                                    kind: 'variant' },
  'POI/Normal':                       { code: 't-pin',                                    kind: 'variant' },
  'POI/Dot':                          { code: 't-pin t-pin--dot',                         kind: 'variant' },
  'POI/Cluster':                      { code: 't-cluster',                                kind: 'variant' },
  'POI/Selected':                     { code: '.t-pin[aria-pressed="true"]',              kind: 'state' },
  'POI/Selected + Price':             { code: '.t-pin[aria-pressed="true"]   (+ price)',  kind: 'state' },
  'Open Pin/Light':                   { code: '.t-pin[data-open="true"]',                 kind: 'state' },
  'Open Pin/Dark':                    { code: '.t-pin[data-open="true"]',                 kind: 'theme' },
  'Close Pin/Light':                  { code: '.t-pin[data-open="false"]',                kind: 'state' },
  'Close Pin/Dark':                   { code: '.t-pin[data-open="false"]',                kind: 'theme' },

  /* ---- Brand ---- */
  'Torob_Logo':                       { code: 't-brand',                                  kind: 'asset' },
  'Brand / Logo':                     { code: 't-brand   (on a white plate)',             kind: 'asset' },
  'Torob star hologram':              { code: 't-guarantee',                              kind: 'asset' },
  'Social-Icons/Telegram':            { code: 't-social  >  t-social__mark',              kind: 'asset' },
  'Social-Icons/Whatsapp':            { code: 't-social  >  t-social__mark',              kind: 'asset' },
  'Social-Icons/Bale':                { code: 't-social  >  t-social__mark',              kind: 'asset' },
};

export const KIND_FA = {
  variant:  'گونه',
  state:    'حالت',
  position: 'جایگاه',
  theme:    'پوسته',
  asset:    'نشان',
};

export const KIND_NOTE = {
  variant:  'گونهٔ واقعی کامپوننت: یک پراپ یا یک کلاس تغییردهنده.',
  state:    'حالت است، نه کامپوننت. سودوکلاس CSS یا صفت <code>data-</code>.',
  position: 'سلکتور ساختاری. فقط به این دلیل سیمبل شده بود که اسکچ نمی‌تواند سلکتور بنویسد.',
  theme:    'همان کامپوننت، زیر مقادیر توکن متفاوت. کد یکی است.',
  asset:    'نشان ثابت، بیرون از خط لولهٔ توکن. با پوسته رنگ عوض نمی‌کند.',
};
