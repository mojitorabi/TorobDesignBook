const chev = `<svg class="t-input__icon" viewBox="0 0 20 20" fill="currentColor"><path d="m10 13-5-5 1-1 4 4 4-4 1 1z"/></svg>`;
const mag = `<svg class="t-input__icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 1 0 3.4 9.8l3.6 3.7 1.1-1.1-3.7-3.6A5.5 5.5 0 0 0 8.5 3zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`;

export default [
{
  name: 'SearchField', slug: 'search-field', group: 'Inputs', status: 'revised',
  legacy: ['Search bar/Default', 'Search bar/Typing', 'Search bar/Searched', 'Search bar'],
  summary: 'Torob starts at search. Three states, one component.',
  description: [
    'The kit shipped <code>Default</code>, <code>Typing</code> and <code>Searched</code> as three separate 299×48 masters. They are one component with a <code>state</code>, and the state drives which trailing affordances appear.',
    'Torob search carries two extra entry points the rest of the industry does not: <strong>voice</strong> and <strong>camera</strong>. They live at the trailing edge in the empty state and yield to the clear button once there is a query.',
  ],
  use: ['Persist the query after submit so the user can refine rather than retype.', 'Show recent searches (جستجوهای اخیر) on focus when the field is empty.', 'Debounce suggestions at ~120ms; never block typing on a request.'],
  avoid: ['A magnifier button as the only way to submit — Enter must work.', 'Clearing the query on navigation back.', 'Placeholder text as the label. It disappears exactly when it is needed.'],
  anatomy: [['Container', '48px, radius 12, 1px control border. Focus adds a 3px accent halo.'], ['Leading magnifier', '20px, secondary.'], ['Input', '14px. <code>text-align: start</code>, never hardcoded right.'], ['Trailing tools', 'Voice and camera when empty; clear when there is a query.']],
  props: [['state', "'default' | 'typing' | 'searched'", "'default'", 'Drives which trailing affordances show.'], ['value', 'string', "''", 'Controlled query.'], ['onClear', '() => void', '—', 'Required when state is not default.'], ['tools', "('voice' | 'camera')[]", "['voice','camera']", 'Torob-specific entry points.']],
  a11y: ['<code>type="search"</code> inside a <code>role="search"</code> landmark.', 'Suggestions use the combobox pattern: <code>aria-expanded</code>, <code>aria-controls</code>, <code>aria-activedescendant</code>.', 'The clear button needs an explicit label ("پاک کردن جستجو") — the ✕ glyph alone is not a name.', 'Announce result counts with <code>aria-live="polite"</code>, not on every keystroke.'],
  responsive: 'Full width inside its container at every size. In a sticky header above md it caps at 460px so the line length stays readable.',
  specimens: [
    { label: 'Three states', stageClass: 'spec__stage--stack', html: `<div class="t-search" data-state="default" style="max-inline-size:340px">
  <div class="t-input">${mag}<input class="t-input__el" type="search" placeholder="جستجو در اطراف من">
    <span class="t-search__actions">
      <button class="t-icon-btn t-icon-btn--sm t-search__tool" aria-label="جستجوی صوتی"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 10a2 2 0 0 0 2-2V4a2 2 0 1 0-4 0v4a2 2 0 0 0 2 2zm4-2a4 4 0 0 1-8 0H3a5 5 0 0 0 4.3 4.9V15h1.4v-2.1A5 5 0 0 0 13 8z"/></svg></button>
      <button class="t-icon-btn t-icon-btn--sm t-search__tool" aria-label="جستجو با تصویر"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M13 4h-2l-1-1.5H6L5 4H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM8 11.2A2.7 2.7 0 1 1 8 5.8a2.7 2.7 0 0 1 0 5.4z"/></svg></button>
    </span>
  </div>
</div>
<div class="t-search" data-state="typing" style="max-inline-size:340px">
  <div class="t-input">${mag}<input class="t-input__el" type="search" value="ادکلن کازامو">
    <span class="t-search__actions"><button class="t-icon-btn t-icon-btn--sm t-search__clear" aria-label="پاک کردن جستجو"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg></button></span>
  </div>
</div>
<div class="t-search" data-state="searched" style="max-inline-size:340px">
  <div class="t-input">${mag}<input class="t-input__el" type="search" value="ادکلن کازاموراتی ۱۲۰ میل">
    <span class="t-search__actions"><button class="t-icon-btn t-icon-btn--sm t-search__clear" aria-label="پاک کردن جستجو"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg></button></span>
  </div>
</div>` },
  ],
  react: `export function SearchField({ state = 'default', value, onChange, onClear, tools = ['voice','camera'], ...rest }) {
  return (
    <div className="t-search" data-state={state} role="search">
      <div className="t-input">
        <SearchIcon className="t-input__icon" />
        <input className="t-input__el" type="search" value={value} onChange={onChange} {...rest} />
        <span className="t-search__actions">
          {state === 'default'
            ? tools.map(t => <IconButton key={t} size="sm" className="t-search__tool" label={TOOL_LABEL[t]}>{TOOL_ICON[t]}</IconButton>)
            : <IconButton size="sm" className="t-search__clear" label="پاک کردن جستجو" onClick={onClear}><CloseIcon /></IconButton>}
        </span>
      </div>
    </div>
  );
}`,
},
{
  name: 'TextField', slug: 'text-field', group: 'Inputs', status: 'new',
  legacy: [],
  summary: 'Single-line text entry with label, hint and error.',
  description: ['Absent from the source kit — the only text input designed was the search bar. Every form Torob builds needs this, so it is defined here rather than reinvented per team.'],
  use: ['Always render a visible label. Placeholder is a hint, never a label.', 'Show the error under the field and set <code>aria-describedby</code>.', 'Validate on blur, not on every keystroke — mid-typing errors read as nagging.'],
  avoid: ['Error styling before the user has finished.', 'Clearing what the user typed when validation fails.', 'Placeholder-only labels.'],
  anatomy: [['Label', '12px Bold. Required fields carry a brand-red asterisk.'], ['Control', '48px default, 40px md, 32px sm.'], ['Hint / Error', '12px under the control. Error replaces hint, never stacks with it.']],
  props: [['size', "'sm' | 'md' | 'lg'", "'lg'", '32 / 40 / 48 px.'], ['invalid', 'boolean', 'false', 'Critical border and halo.'], ['hint / error', 'string', '—', 'Error takes precedence.'], ['required', 'boolean', 'false', 'Adds the asterisk and <code>aria-required</code>.']],
  a11y: ['Label is a real <code>&lt;label for&gt;</code>.', 'Errors use <code>aria-invalid="true"</code> plus <code>aria-describedby</code> pointing at the message.', 'Never rely on the red border alone — colour is not a channel for everyone.'],
  responsive: 'Full width. Two fields sit side by side only above 768px, and stack again below it.',
  specimens: [
    { label: 'States', stageClass: 'spec__stage--stack', html: `<div class="t-field" style="max-inline-size:320px">
  <label class="t-field__label" for="f1">نام فروشگاه</label>
  <div class="t-input"><input class="t-input__el" id="f1" placeholder="مثلاً ادکلن شهر"></div>
  <span class="t-field__hint">نامی که مشتریان می‌بینند.</span>
</div>
<div class="t-field" style="max-inline-size:320px">
  <label class="t-field__label" for="f2">شماره تماس<span class="t-field__req">*</span></label>
  <div class="t-input" data-invalid="true"><input class="t-input__el" id="f2" value="۰۹۱۲۳۴" aria-invalid="true" aria-describedby="f2e"></div>
  <span class="t-field__error" id="f2e"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5 15 14H1zM7.3 6v4h1.4V6zm0 5v1.4h1.4V11z"/></svg>شماره باید ۱۱ رقم باشد.</span>
</div>
<div class="t-field" style="max-inline-size:320px">
  <label class="t-field__label" for="f3">کد فروشنده</label>
  <div class="t-input" data-disabled="true"><input class="t-input__el" id="f3" value="TRB-۴۸۲۹" disabled></div>
</div>` },
  ],
  react: `export function TextField({ label, hint, error, required, size = 'lg', id, ...rest }) {
  const uid = useId(), fid = id ?? uid, msgId = fid + '-msg';
  return (
    <div className="t-field">
      <label className="t-field__label" htmlFor={fid}>{label}{required && <span className="t-field__req">*</span>}</label>
      <div className={clsx('t-input', size !== 'lg' && \`t-input--\${size}\`)} data-invalid={!!error || undefined}>
        <input className="t-input__el" id={fid} aria-invalid={!!error || undefined}
               aria-describedby={(error || hint) ? msgId : undefined} aria-required={required} {...rest} />
      </div>
      {error ? <span className="t-field__error" id={msgId}><WarningIcon />{error}</span>
             : hint && <span className="t-field__hint" id={msgId}>{hint}</span>}
    </div>
  );
}`,
},
{
  name: 'Switch', slug: 'switch', group: 'Inputs', status: 'revised',
  legacy: ['Switch/Left', 'Switch/Right'],
  summary: 'A two-position selector. Both positions are named destinations.',
  description: [
    'The source shipped <code>Switch/Left</code> and <code>Switch/Right</code> at 135×36. This is <strong>not a boolean toggle</strong> — Torob uses it for map ⇄ list, and both positions are places you can be.',
    'That distinction matters for accessibility: a boolean is a <code>checkbox</code>, but a named two-way choice is a <code>radiogroup</code>. Getting this wrong makes the control unusable by screen reader. For true on/off, use <a href="./toggle.html">Toggle</a>.',
  ],
  use: ['Exactly two options, both nameable in one or two words.', 'Glass, so it can float over a map.', 'Keep both labels visible, never hide the inactive one.'],
  avoid: ['On/off semantics. That is Toggle.', 'Three or more options. That is SegmentedControl.', 'Icon-only positions without accessible names.'],
  anatomy: [['Track', 'Glass, radius 12, 3px inset padding.'], ['Thumb', 'Opaque fog surface with elevation-1, animated to the active option.'], ['Options', '30px, 12px Bold. Inactive is secondary; active is default.']],
  props: [['options', '{ value, label, icon? }[2]', '—', 'Exactly two.'], ['value', 'string', '—', 'Controlled.'], ['onChange', '(v) => void', '—', 'Required.']],
  a11y: ['<code>role="radiogroup"</code> on the track, <code>role="radio"</code> + <code>aria-checked</code> on each option.', 'Arrow keys move between options; the group is a single tab stop.'],
  responsive: 'Fixed intrinsic width. Below 360px the labels shorten rather than the control shrinking.',
  specimens: [
    { label: 'Map / list', canvas: 'map', stageClass: 'spec__stage--center', html: `<div class="t-switch" role="radiogroup" aria-label="نمای نمایش">
  <span class="t-switch__thumb"></span>
  <button class="t-switch__option" role="radio" aria-checked="true">فهرست</button>
  <button class="t-switch__option" role="radio" aria-checked="false">نقشه</button>
</div>` },
  ],
  react: `export function Switch({ options, value, onChange, label }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current, active = el?.querySelector('[aria-checked="true"]');
    if (!el || !active) return;
    /* inset-inline-start is measured from the RIGHT edge in RTL, but offsetLeft
       is always from the left. Measure the logical distance, or the thumb lands
       under the wrong option in RTL. */
    const cs = getComputedStyle(el);
    const rtl = cs.direction === 'rtl';
    const p = el.getBoundingClientRect(), a = active.getBoundingClientRect();
    const border = parseFloat(rtl ? cs.borderInlineEndWidth : cs.borderInlineStartWidth) || 0;
    const thumb = el.querySelector('.t-switch__thumb');
    thumb.style.insetInlineStart = ((rtl ? p.right - a.right : a.left - p.left) - border) + 'px';
    thumb.style.inlineSize = active.offsetWidth + 'px';
  }, [value]);
  return (
    <div className="t-switch" role="radiogroup" aria-label={label} ref={ref}>
      <span className="t-switch__thumb" />
      {options.map(o => (
        <button key={o.value} className="t-switch__option" role="radio"
                aria-checked={o.value === value} onClick={() => onChange(o.value)}>
          {o.icon}{o.label}
        </button>
      ))}
    </div>
  );
}`,
},
{
  name: 'Toggle', slug: 'toggle', group: 'Inputs', status: 'new',
  legacy: [],
  summary: 'A boolean. Takes effect immediately — no Save.',
  description: ['The kit had no boolean control. A toggle means the change applies the moment it moves; if the setting needs confirming, use a Checkbox inside a form instead.'],
  use: ['Settings that apply instantly — "فقط فروشگاه‌های باز".', 'Label the thing being controlled, not the state. "اعلان‌ها", not "اعلان‌ها روشن".'],
  avoid: ['Inside a form with a Save button — use a Checkbox.', 'For a destructive change without a confirmation.'],
  anatomy: [['Track', '44×26, full radius. Accent when on.'], ['Thumb', '20px, elevation-1, travels toward the inline end.']],
  props: [['checked', 'boolean', 'false', 'Controlled.'], ['onChange', '(v) => void', '—', 'Required.'], ['label', 'string', '—', 'Visible text label.']],
  a11y: ['A real <code>&lt;input type="checkbox"&gt;</code> visually hidden behind the track — free keyboard and screen-reader behaviour.', 'The label is clickable and wraps the control.'],
  responsive: 'Fixed size at every breakpoint. The row it sits in stretches, not the toggle.',
  specimens: [
    { label: 'Toggle', stageClass: 'spec__stage--stack', html: `<label class="t-toggle"><input type="checkbox" checked><span class="t-toggle__track"><span class="t-toggle__thumb"></span></span><span class="t-body-md">فقط فروشگاه‌های باز</span></label>
<label class="t-toggle"><input type="checkbox"><span class="t-toggle__track"><span class="t-toggle__thumb"></span></span><span class="t-body-md">ارسال فوری</span></label>
<label class="t-toggle"><input type="checkbox" disabled><span class="t-toggle__track"><span class="t-toggle__thumb"></span></span><span class="t-body-md t-tone-disabled">پرداخت قسطی (در دسترس نیست)</span></label>` },
  ],
  react: `export function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label className="t-toggle">
      <input type="checkbox" checked={checked} disabled={disabled}
             onChange={e => onChange(e.target.checked)} />
      <span className="t-toggle__track"><span className="t-toggle__thumb" /></span>
      <span className="t-body-md">{label}</span>
    </label>
  );
}`,
},
{
  name: 'RangeSlider', slug: 'range-slider', group: 'Inputs', status: 'new',
  legacy: [],
  summary: 'Two-handle range. Torob\'s most-used filter had no control.',
  description: ['Price range is the filter shoppers reach for most, and the kit had nothing for it. Prices are formatted with Persian numerals and tabular figures so the two ends stay readable as the handles move.'],
  use: ['Always pair with numeric inputs — a slider alone cannot hit an exact price.', 'Snap to meaningful steps (۱۰۰٬۰۰۰ تومان), not to raw pixels.', 'Show the live values above the track while dragging.'],
  avoid: ['A slider as the only way to set a value.', 'Ranges wider than two orders of magnitude on a linear scale — use a log scale.'],
  anatomy: [['Track', '4px, full radius, subtle ground.'], ['Fill', 'Accent, spans the selected range.'], ['Handles', '22px, 2px accent ring, elevation-1, grab cursor.'], ['Values', '12px tabular, at the two ends.']],
  props: [['min / max', 'number', '—', 'Bounds.'], ['value', '[number, number]', '—', 'Controlled.'], ['step', 'number', '1', 'Snap increment.'], ['format', '(n) => string', '—', 'Persian numeral formatter.']],
  a11y: ['Two <code>role="slider"</code> handles, each with <code>aria-valuemin/max/now</code> and <code>aria-valuetext</code> carrying the formatted price.', 'Arrow keys step; Home/End jump to the bounds.', 'Handles cannot cross; the lower one clamps at the upper.'],
  responsive: 'Full width. Below 375px the value labels move under the track rather than flanking it.',
  specimens: [
    { label: 'Price range', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div class="t-range" style="max-inline-size:320px">
  <div class="t-range__values"><span>۱٬۲۰۰٬۰۰۰ تومان</span><span>۱۸٬۵۰۰٬۰۰۰ تومان</span></div>
  <div class="t-range__track">
    <div class="t-range__fill" style="inset-inline-start:14%;inline-size:58%"></div>
    <div class="t-range__thumb" style="inset-inline-start:14%" role="slider" aria-valuemin="0" aria-valuemax="30000000" aria-valuenow="1200000" aria-valuetext="۱٬۲۰۰٬۰۰۰ تومان" tabindex="0"></div>
    <div class="t-range__thumb" style="inset-inline-start:72%" role="slider" aria-valuemin="0" aria-valuemax="30000000" aria-valuenow="18500000" aria-valuetext="۱۸٬۵۰۰٬۰۰۰ تومان" tabindex="0"></div>
  </div>
</div>` },
  ],
  react: `export function RangeSlider({ min, max, value, onChange, step = 1, format = String }) {
  const pct = v => ((v - min) / (max - min)) * 100;
  return (
    <div className="t-range">
      <div className="t-range__values"><span>{format(value[0])}</span><span>{format(value[1])}</span></div>
      <div className="t-range__track">
        <div className="t-range__fill" style={{ insetInlineStart: pct(value[0]) + '%', inlineSize: (pct(value[1]) - pct(value[0])) + '%' }} />
        {value.map((v, i) => (
          <div key={i} className="t-range__thumb" role="slider" tabIndex={0}
               style={{ insetInlineStart: pct(v) + '%' }}
               aria-valuemin={min} aria-valuemax={max} aria-valuenow={v} aria-valuetext={format(v)}
               onKeyDown={e => handleKey(e, i, v, { min, max, step, value, onChange })} />
        ))}
      </div>
    </div>
  );
}`,
},
{
  name: 'Checkbox', slug: 'checkbox', group: 'Inputs', status: 'new',
  legacy: [],
  summary: 'Multi-select within a form. Confirmed by a Save.',
  description: ['Distinct from Toggle: a checkbox is part of a form and takes effect when the form is submitted. Radio is the same component with <code>--radio</code>.'],
  use: ['Filter sheets with an Apply button.', 'Terms acceptance and any multi-select list.'],
  avoid: ['Instant-apply settings: that is Toggle.', 'A single checkbox where a Toggle would be clearer.'],
  anatomy: [['Box', '20px, radius 4 (full for radio). Accent fill when checked.'], ['Label', 'Clickable, 14px, minimum 44px row height.']],
  props: [['checked', 'boolean', 'false', 'Controlled.'], ['indeterminate', 'boolean', 'false', 'Partial selection in a tree.'], ['variant', "'checkbox' | 'radio'", "'checkbox'", '']],
  a11y: ['Real <code>&lt;input&gt;</code>, visually hidden, wrapped by its <code>&lt;label&gt;</code>.', 'Radio groups share a <code>name</code> and sit inside a <code>&lt;fieldset&gt;</code> with a <code>&lt;legend&gt;</code>.'],
  responsive: 'Row height never drops below 44px, at any breakpoint.',
  specimens: [
    { label: 'Checkbox and radio', stageClass: 'spec__stage--stack', html: `<label class="t-check"><input type="checkbox" checked><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">ضمانت ترب</span></label>
<label class="t-check"><input type="checkbox"><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">نمایندگی رسمی</span></label>
<label class="t-check t-check--radio"><input type="radio" name="sort" checked><span class="t-check__box"></span><span class="t-body-md">ارزان‌ترین</span></label>
<label class="t-check t-check--radio"><input type="radio" name="sort"><span class="t-check__box"></span><span class="t-body-md">نزدیک‌ترین</span></label>` },
  ],
  react: `export function Checkbox({ variant = 'checkbox', checked, onChange, label, ...rest }) {
  return (
    <label className={clsx('t-check', variant === 'radio' && 't-check--radio')}>
      <input type={variant} checked={checked} onChange={e => onChange(e.target.checked)} {...rest} />
      <span className="t-check__box">{variant === 'checkbox' && <CheckMark className="t-check__mark" />}</span>
      <span className="t-body-md">{label}</span>
    </label>
  );
}`,
},
{
  name: 'QuantityStepper', slug: 'quantity-stepper', group: 'Inputs', status: 'new',
  legacy: [],
  summary: 'Increment and decrement a small integer.',
  description: ['For cart quantities and any bounded count. Below about 10, a stepper beats a number input: no keyboard, no validation, no typos.'],
  use: ['Cart quantity, guest counts, anything under ~10.', 'Disable the minus at the lower bound rather than hiding it — a disappearing control moves the layout.'],
  avoid: ['Unbounded numbers. Use a TextField.', 'Hiding the value while it updates.'],
  anatomy: [['Buttons', '36×36, at the two inline ends.'], ['Value', '44px minimum, tabular, centred.']],
  props: [['value', 'number', '—', 'Controlled.'], ['min / max', 'number', '1 / 99', 'Bounds; buttons disable at each.'], ['onChange', '(n) => void', '—', 'Required.']],
  a11y: ['Buttons carry explicit labels ("افزایش تعداد" / "کاهش تعداد").', 'The value is <code>aria-live="polite"</code> so the new count is announced once, not on each render.'],
  responsive: 'Fixed size. Never shrinks below the 36px button.',
  specimens: [
    { label: 'Stepper', html: `<div class="t-stepper">
  <button class="t-stepper__btn" aria-label="کاهش تعداد"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M3 7.3h10v1.4H3z"/></svg></button>
  <span class="t-stepper__value" aria-live="polite">۲</span>
  <button class="t-stepper__btn" aria-label="افزایش تعداد"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8.7 3H7.3v4.3H3v1.4h4.3V13h1.4V8.7H13V7.3H8.7z"/></svg></button>
</div>
<div class="t-stepper">
  <button class="t-stepper__btn" aria-label="کاهش تعداد" disabled><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M3 7.3h10v1.4H3z"/></svg></button>
  <span class="t-stepper__value" aria-live="polite">۱</span>
  <button class="t-stepper__btn" aria-label="افزایش تعداد"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8.7 3H7.3v4.3H3v1.4h4.3V13h1.4V8.7H13V7.3H8.7z"/></svg></button>
</div>` },
  ],
  react: `export function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="t-stepper">
      <button className="t-stepper__btn" aria-label="کاهش تعداد"
              disabled={value <= min} onClick={() => onChange(value - 1)}><MinusIcon /></button>
      <span className="t-stepper__value" aria-live="polite">{toFa(value)}</span>
      <button className="t-stepper__btn" aria-label="افزایش تعداد"
              disabled={value >= max} onClick={() => onChange(value + 1)}><PlusIcon /></button>
    </div>
  );
}`,
},
];
