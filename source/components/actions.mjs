export default [
{
  name: 'Button', slug: 'button', group: 'Actions', status: 'revised',
  legacy: ['Button / Red / Default', 'Button / Red / Hover', 'Button / Red / Disable', 'Button/‌Blue/Default + Chevron', 'Button/‌Blue/Clicked + Chevron', 'Button/‌Blue/Hover + Chevron', 'Button/Black/Default', 'Button/Black/Hover', 'Button/Black/Disable', 'Button/Black ghost/Default', 'Button/Black ghost/Hover', 'Button/‌Blue ghost/Icon/Light', 'Button/‌Blue ghost/Icon/Dark', 'Button/Small/Blue/with-badge', 'Button/Xsmall/Secondary/Icon', 'Button/Normal/Primary/Icon', 'Button/Normal/Border/Icon'],
  summary: 'Triggers an action. One primary per screen.',
  description: [
    'The source kit modelled every state as its own symbol. <code>Button / Red / Hover</code> sat beside <code>Button / Red / Default</code> as a separate master. That cannot become a component API. Here, <strong>state is a state</strong> (CSS pseudo-classes and <code>data-</code> attributes) and only intent and size are props.',
    'Variants are named by <strong>intent</strong>, not by colour. <code>Button / Red</code> became <code>variant="primary"</code>: when the brand palette shifts, the code does not. The examples page had already started this migration on its own — <code>Button/Normal/Primary/Icon</code>, so this formalises a direction your team was already moving in.',
  ],
  use: [
    'Exactly one <code>primary</code> per screen: the thing the user came to do.',
    'Use <code>accent</code> for the secondary path, <code>ghost</code> for tertiary.',
    'Label with a verb naming the outcome: «مشاهده فروشندگان», not «بیشتر».',
    'Set <code>data-loading</code> during async work — the label is hidden but the width is held.',
  ],
  avoid: [
    'Two primary buttons side by side. If both matter, neither is primary.',
    'Disabling without explanation. Say why, next to the button.',
    'Colour-only variants (<code>variant="red"</code>). Intent survives a rebrand; colour does not.',
    'Icon-only buttons without <code>aria-label</code>.',
  ],
  anatomy: [
    ['Container', 'Sets height, radius 12, and the touch target. The visual box can be 24px tall; the tap area is never below 44px.'],
    ['Leading icon', 'Optional, 16px. Directional icons mirror in RTL.'],
    ['Label', '14px Bold. Never wraps — truncate the container instead.'],
    ['Trailing icon', 'Optional. A chevron here means "opens something", not "submits".'],
  ],
  props: [
    ['variant', "'primary' | 'accent' | 'neutral' | 'soft' | 'outline' | 'outline-accent' | 'ghost' | 'ghost-accent'", "'neutral'", 'Intent. Never a colour name.'],
    ['size', "'xs' | 'sm' | 'md' | 'lg' | 'xl'", "'lg'", '24 / 28 / 32 / 40 / 48 px. lg is the default, matching the source kit.'],
    ['block', 'boolean', 'false', 'Fill the inline axis.'],
    ['loading', 'boolean', 'false', 'Shows a spinner, holds the width, blocks pointer events.'],
    ['disabled', 'boolean', 'false', 'Collapses every variant to the same disabled treatment.'],
    ['iconStart / iconEnd', 'ReactNode', '—', 'Leading / trailing icon in logical order — they swap automatically in LTR.'],
  ],
  a11y: [
    'Renders a real <code>&lt;button&gt;</code>. Use <code>&lt;a class="t-btn"&gt;</code> only when it navigates.',
    'Loading sets <code>aria-busy="true"</code>; the accessible name stays stable so screen readers do not re-announce.',
    'Focus ring is 2px <code>--t-border-focus</code> at 2px offset, visible on both grounds.',
    'Disabled uses <code>disabled</code>, not <code>pointer-events: none</code>, which is invisible to assistive tech.',
    'Every size keeps a ≥44px touch target via a transparent <code>::after</code> on coarse pointers.',
  ],
  responsive: 'Buttons do not resize by breakpoint. Below 375px, use <code>block</code> so the label never truncates. In a footer of two actions, both go <code>block</code> and stack under 360px.',
  specimens: [
    { label: 'Intents', html: `<button class="t-btn t-btn--primary">افزودن به سبد</button>
<button class="t-btn t-btn--accent">مشاهده فروشندگان</button>
<button class="t-btn t-btn--neutral">مقایسه</button>
<button class="t-btn t-btn--soft">ذخیره</button>
<button class="t-btn t-btn--outline">انصراف</button>
<button class="t-btn t-btn--ghost">بیشتر</button>` },
    { label: 'Sizes', html: `<button class="t-btn t-btn--primary t-btn--xs">Xsmall</button>
<button class="t-btn t-btn--primary t-btn--sm">Small</button>
<button class="t-btn t-btn--primary t-btn--md">Medium</button>
<button class="t-btn t-btn--primary t-btn--lg">Large</button>
<button class="t-btn t-btn--primary t-btn--xl">XLarge</button>` },
    { label: 'States', note: 'Hover and focus are live — interact with them.', html: `<button class="t-btn t-btn--primary">Default</button>
<button class="t-btn t-btn--primary" data-loading="true">در حال ارسال</button>
<button class="t-btn t-btn--primary" disabled>Disabled</button>
<button class="t-btn t-btn--outline" disabled>Disabled outline</button>` },
    { label: 'With icons', html: `<button class="t-btn t-btn--accent">مسیریابی<svg class="t-icon t-icon--sm t-icon--directional" viewBox="0 0 16 16" fill="currentColor"><path d="M10 4 6 8l4 4V4z"/></svg></button>
<button class="t-btn t-btn--outline"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>نزدیک من</button>
<button class="t-btn t-btn--primary t-btn--block">تماس با فروشگاه</button>` },
  ],
  react: `import { forwardRef } from 'react';
import clsx from 'clsx';

export const Button = forwardRef(function Button(
  { variant = 'neutral', size = 'lg', block, loading, disabled,
    iconStart, iconEnd, children, className, ...rest }, ref) {
  return (
    <button
      ref={ref}
      className={clsx('t-btn', \`t-btn--\${variant}\`, \`t-btn--\${size}\`, block && 't-btn--block', className)}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
});`,
},
{
  name: 'IconButton', slug: 'icon-button', group: 'Actions', status: 'revised',
  legacy: ['Button/Icon/Icon', 'Button/Icon/Blue Icon', 'Button/Icon/Ghost Icon', 'Button/Icon/Icon Rounded', 'Button/Icon'],
  summary: 'A single icon as a target. Always carries an accessible name.',
  description: ['The kit had four masters (<code>Icon</code>, <code>Blue Icon</code>, <code>Ghost Icon</code>, <code>Icon Rounded</code>) differing only in fill and radius. One component, two props.'],
  use: ['Toolbars, card corners, map controls, anywhere a label would not fit.', 'Pair with a tooltip on pointer devices.', 'Use <code>glass</code> over a map or photograph so the content behind stays readable.'],
  avoid: ['Icon-only for an unfamiliar or destructive action. Label it.', 'Ambiguous glyphs. If two icons in a row could mean the same thing, use labels.'],
  anatomy: [['Container', '48px default, 32px small. Square with radius 12, or fully round.'], ['Icon', '20px, inherits colour from the container.']],
  props: [
    ['variant', "'ghost' | 'accent' | 'glass'", "'ghost'", 'glass is for use over a map or image.'],
    ['size', "'sm' | 'md'", "'md'", '32 / 48 px.'],
    ['round', 'boolean', 'false', 'Full radius instead of 12px.'],
    ['label', 'string', '— (required)', 'Becomes aria-label. There is no unlabelled variant.'],
  ],
  a11y: ['<code>label</code> is required and maps to <code>aria-label</code>. An icon button with no name is unusable by screen reader.', 'For a toggle, add <code>aria-pressed</code> and keep the name constant ("افزودن به علاقه‌مندی"), changing only the pressed state.'],
  responsive: '48px on touch, 32px acceptable on pointer-fine surfaces. Never below 32px visually, never below 44px in target size.',
  specimens: [
    { label: 'Variants', html: `<button class="t-icon-btn" aria-label="جستجو"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg></button>
<button class="t-icon-btn t-icon-btn--accent" aria-label="تماس"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 0 0-2 2c0 6.6 5.4 12 12 12a2 2 0 0 0 2-2v-2.3a1 1 0 0 0-.8-1l-2.7-.5a1 1 0 0 0-1 .4l-.8 1.1a9.6 9.6 0 0 1-4.1-4.1l1.1-.8a1 1 0 0 0 .4-1l-.5-2.7a1 1 0 0 0-1-.8H5z"/></svg></button>
<button class="t-icon-btn t-icon-btn--sm" aria-label="بستن"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg></button>
<button class="t-icon-btn t-icon-btn--round t-icon-btn--accent" aria-label="افزودن"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10.8 3H9.2v6.2H3v1.6h6.2V17h1.6v-6.2H17V9.2h-6.2V3z"/></svg></button>` },
    { label: 'Glass, over content', note: 'The glass variant is what makes a control readable on top of a map or a product photograph.', canvas: 'map', stageClass: 'spec__stage--center', html: `<button class="t-icon-btn t-icon-btn--glass" aria-label="موقعیت من"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10.8 1H9.2v2.1a7 7 0 0 0-6.1 6.1H1v1.6h2.1a7 7 0 0 0 6.1 6.1V19h1.6v-2.1a7 7 0 0 0 6.1-6.1H19V9.2h-2.1a7 7 0 0 0-6.1-6.1V1z"/></svg></button>
<button class="t-icon-btn t-icon-btn--glass" aria-label="لایه‌های نقشه"><svg class="t-icon" viewBox="0 0 20 20" fill="currentColor"><path d="m10 2 8 4.5-8 4.5-8-4.5L10 2zm5.6 7.2L18 10.5 10 15l-8-4.5 2.4-1.3L10 12l5.6-2.8z"/></svg></button>` },
  ],
  react: `export function IconButton({ variant = 'ghost', size = 'md', round, label, children, className, ...rest }) {
  return (
    <button
      className={clsx('t-icon-btn', variant !== 'ghost' && \`t-icon-btn--\${variant}\`,
                      size === 'sm' && 't-icon-btn--sm', round && 't-icon-btn--round', className)}
      aria-label={label}
      {...rest}
    >{children}</button>
  );
}`,
},
{
  name: 'BuyBoxButton', slug: 'buy-box-button', group: 'Actions', status: 'stable',
  legacy: ['Button/Buy box/Ad', 'Button/Buy box/Cheapest', 'Button/Offline Buy box/Ad'],
  summary: 'The PDP commerce target: price, seller and action in one tap.',
  description: ['Torob-specific and load-bearing. It is the row a shopper actually taps on a product page, so it carries the price as its primary content rather than a verb. The <code>ad</code> flag renders the آگهی marker — required disclosure, and deliberately quiet.'],
  use: ['On the product detail page, one per seller row.', 'Show the total price the shopper pays, including the currency word.', 'Mark sponsored placements with <code>ad</code>. Always. It is a disclosure, not a style.'],
  avoid: ['Hiding the ad marker to improve click-through.', 'Using it as a generic CTA. It means "buy from this seller at this price".'],
  anatomy: [['Container', 'Full-width, min 44px, radius 12, brand gradient.'], ['Price', '16px ExtraBold, tabular figures, Persian numerals.'], ['Meta', '12px at 86% opacity — seller name, shipping, ad marker.']],
  props: [['variant', "'primary' | 'accent' | 'offline'", "'primary'", 'offline is the un-filled treatment for a store with no online stock.'], ['ad', 'boolean', 'false', 'Renders the آگهی disclosure.'], ['price', 'string', '—', 'Pre-formatted with Persian numerals.']],
  a11y: ['The accessible name must include price and seller — "۱۵٬۸۰۰٬۰۰۰ تومان، خرید از تکنولایف" — not just "خرید".', 'The ad marker is real text, never a background image, so it reaches screen readers.'],
  responsive: 'Always block-level. Above md the meta line moves inline with the price rather than stacking.',
  specimens: [
    { label: 'Buy box', html: `<button class="t-buybox" style="max-inline-size:343px">
  <span class="t-buybox__body">
    <span class="t-buybox__price">۱۵٬۸۰۰٬۰۰۰ تومان</span>
    <span class="t-buybox__meta">خرید از تکنولایف · ارسال فوری</span>
  </span>
  <svg class="t-icon t-icon--directional" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5 7 10l5 5V5z"/></svg>
</button>
<button class="t-buybox" style="max-inline-size:343px">
  <span class="t-buybox__body">
    <span class="t-buybox__price">۱۶٬۱۰۰٬۰۰۰ تومان</span>
    <span class="t-buybox__meta">خرید از دیجی‌کالا · <span class="t-badge t-badge--ad" style="vertical-align:middle">آگهی</span></span>
  </span>
</button>
<button class="t-buybox t-buybox--offline" style="max-inline-size:343px">
  <span class="t-buybox__body">
    <span class="t-buybox__price">۱۵٬۸۰۰٬۰۰۰ تومان</span>
    <span class="t-buybox__meta">ادکلن شهر · ۱ کیلومتر · فروش حضوری</span>
  </span>
</button>` },
  ],
  react: `export function BuyBoxButton({ variant = 'primary', price, meta, ad, ...rest }) {
  return (
    <button className={clsx('t-buybox', variant !== 'primary' && \`t-buybox--\${variant}\`)} {...rest}>
      <span className="t-buybox__body">
        <span className="t-buybox__price">{price}</span>
        <span className="t-buybox__meta">
          {meta}{ad && <> · <span className="t-badge t-badge--ad">آگهی</span></>}
        </span>
      </span>
    </button>
  );
}`,
},
];
