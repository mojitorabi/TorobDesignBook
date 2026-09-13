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
  'Badge/Card':                       { code: 't-badge t-badge--kalabarg',                kind: 'variant' },
  'Badge/Card-Picture':               { code: 't-badge t-badge--ad',                      kind: 'variant' },
  'Badge/Card/Guarantee':             { code: 't-badge t-badge--guarantee',               kind: 'variant' },
  'Badge/Card/Normal':                { code: 't-badge t-badge--plain',                   kind: 'variant' },

  /* ---- Button: families ---- */
  'Button / Red / Default':           { code: 't-button t-button--red',                         kind: 'variant' },
  'Button / Red / Hover':             { code: '.t-button--red:hover',                        kind: 'state' },
  'Button / Red / Disable':           { code: 't-button t-button--red  +  disabled',            kind: 'state' },
  'Button / Red / Icon':              { code: 't-button t-button--red   (+ leading icon)',      kind: 'variant' },
  'Button/Black/Default':             { code: 't-button t-button--black',                       kind: 'variant' },
  'Button/Black/Hover':               { code: '.t-button--black:hover',                      kind: 'state' },
  'Button/Black/Disable':             { code: 't-button t-button--black  +  disabled',          kind: 'state' },
  'Button/Black ghost/Default':       { code: 't-button t-button--black-ghost',                 kind: 'variant' },
  'Button/Black ghost/Hover':         { code: '.t-button--black-ghost:hover',                kind: 'state' },
  'Button/Black ghost/Icon':          { code: 't-button t-button--black-ghost   (+ icon)',      kind: 'variant' },
  'Button/‌Blue/Default + Chevron':    { code: 't-button t-button--blue   (+ chevron--down)',    kind: 'variant' },
  'Button/‌Blue/Hover + Chevron':      { code: '.t-button--blue:hover',                       kind: 'state' },
  'Button/‌Blue/Clicked + Chevron':    { code: 't-button t-button--blue[aria-expanded="true"]', kind: 'state' },
  'Button/‌Blue/Icon':                 { code: 't-button t-button--blue   (+ leading icon)',     kind: 'variant' },
  'Button/‌Blue ghost/Icon/Light':     { code: 't-button t-button--blue-ghost t-button--glass',     kind: 'variant' },
  'Button/‌Blue ghost/Icon/Dark':      { code: 't-button t-button--blue-ghost t-button--glass',     kind: 'theme' },
  'Button/Small/Blue/with-badge':     { code: 't-button t-button--blue t-button--sm  +  t-badge',  kind: 'variant' },
  'Button/Xsmall/Secondary/Icon':     { code: 't-button t-button--xs t-button--filter',            kind: 'variant' },

  /* ---- Button: split ---- */
  'Button / Red /split':              { code: 't-button-split  >  t-button--red  ×2',           kind: 'variant' },
  'Button / Blue /split':             { code: 't-button-split  >  t-button--blue ×2',           kind: 'variant' },

  /* ---- Button: icon-only ---- */
  'Button/Icon/Icon':                 { code: 't-icon-button t-icon-button--glass',             kind: 'variant' },
  'Button/Icon/Blue Icon':            { code: 't-icon-button t-icon-button--accent',            kind: 'variant' },
  'Button/Icon/Ghost Icon':           { code: 't-icon-button t-icon-button--accent-ghost',      kind: 'variant' },
  'Button/Icon/Icon Rounded':         { code: 't-icon-button t-icon-button--sm t-icon-button--round t-icon-button--filter', kind: 'variant' },

  /* ---- Buy box ---- */
  'Button/Buy box/Ad':                { code: 't-buy-box',                                 kind: 'variant' },
  'Button/Offline Buy box/Ad':        { code: 't-buy-box t-buy-box--offline',               kind: 'variant' },
  'Button/Buy box/Cheapest':          { code: 't-buy-box t-buy-box--compact',               kind: 'variant' },

  /* ---- Filter ---- */
  'Filter/Cell/Cell':                 { code: 't-chip',                                   kind: 'variant' },
  'Filter/Cell/Icon':                 { code: 't-chip   (+ leading icon)',                kind: 'variant' },
  'Filter/Cell/Icon+Chevron':         { code: 't-chip   (+ icon + t-chip__chevron)',      kind: 'variant' },
  'Filter/Filter':                    { code: 't-filter-bar',                             kind: 'variant' },

  /* ---- Navigation & layout ---- */
  'Header/Profile':                   { code: 't-page-header t-page-header--plain',                            kind: 'variant' },
  'Tab/Selected':                     { code: 't-chip-group  >  t-choice[aria-pressed="true"]', kind: 'state' },
  'List / Item':                      { code: 't-list-item',                              kind: 'variant' },
  'List / last item':                 { code: 't-list-item   (last: no divider after)',                  kind: 'position' },
  'Segmented Controls/Selected':        { code: 't-choice[aria-pressed="true"]',             kind: 'state' },
  'Segmented Controls/Not-selected':    { code: 't-choice',                                  kind: 'variant' },
  'Segmented Controls/Icon Selected':   { code: 't-choice[aria-pressed="true"]   (+ icon, + t-choice__clear)', kind: 'state' },
  'Segmented Controls/Icon Not-selected': { code: 't-choice   (+ icon)',                     kind: 'variant' },

  /* ---- Inputs ---- */
  'Search bar/Default':               { code: 't-search[data-state="default"]',                     kind: 'variant' },
  'Search bar/Typing':                { code: 't-search[data-state="typing"]',                   kind: 'state' },
  'Search bar/Searched':              { code: 't-search[data-state="searched"]',             kind: 'state' },
  'Switch/Left':                      { code: 't-segmented   (option 2 checked)',         kind: 'state' },
  'Switch/Right':                     { code: 't-segmented   (option 1 checked)',         kind: 'state' },

  /* ---- Commerce ---- */
  'Product Card/Normal':              { code: 't-product-card',                           kind: 'variant' },
  'Product Card/Small':               { code: 't-product-card t-product-card--sm',        kind: 'variant' },
  'Product Card/Small Empty':         { code: 't-product-card t-product-card--sm   (+ t-thumb--none)',     kind: 'variant' },
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
  'Store-Card/PDP/No product/Light':      { code: 't-store-card t-store-card--pdp',      kind: 'variant' },
  'Store-Card/PDP/No product/Dark':       { code: 't-store-card t-store-card--pdp',      kind: 'theme' },
  'Store-Card/PDP/Online':                { code: 't-offer   (+ t-button--red)', kind: 'variant' },
  'Store-Card/PDP/Offline':               { code: 't-offer   (+ t-button-split, blue)', kind: 'variant' },
  'Store-Card/PDP/Online-Offline':        { code: 't-offer   (+ t-button-split, red)', kind: 'variant' },

  /* ---- Map ---- */
  'Pin':                              { code: 't-pin t-pin--me',                                    kind: 'variant' },
  'POI/Normal':                       { code: 't-pin',                                    kind: 'variant' },
  'POI/Normal with name':             { code: 't-pin',                 kind: 'variant' },
  'POI/Not-selected + Price':         { code: 't-pin t-pin--price',                       kind: 'variant' },
  'POI/Dot':                          { code: 't-pin t-pin--dot',                         kind: 'variant' },
  'POI/Cluster':                      { code: 't-cluster',                                kind: 'variant' },
  'POI/Selected':                     { code: 't-pin t-pin--hero',              kind: 'state' },
  'POI/Selected + Price':             { code: 't-pin t-pin--price[aria-pressed="true"]',  kind: 'state' },
  'Open Pin/Light':                   { code: 't-status-dot',                 kind: 'state' },
  'Open Pin/Dark':                    { code: 't-status-dot',                 kind: 'theme' },
  'Close Pin/Light':                  { code: 't-status-dot t-status-dot--closed',                kind: 'state' },
  'Close Pin/Dark':                   { code: 't-status-dot t-status-dot--closed',                kind: 'theme' },

  /* ---- Brand ---- */
  'Torob_Logo':                       { code: 't-brand',                                  kind: 'asset' },
  'Brand / Logo':                     { code: 't-brand t-brand--plate',             kind: 'asset' },
  'Torob star hologram':              { code: 't-guarantee',                              kind: 'asset' },
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
