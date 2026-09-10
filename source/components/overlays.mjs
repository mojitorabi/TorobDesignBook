const chevD = `<svg class="t-accordion__chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="m8 11-5-5 1-1 4 4 4-4 1 1z"/></svg>`;

export default [
{
  name: 'BottomSheet', slug: 'bottom-sheet', group: 'Overlays', status: 'new',
  legacy: [],
  summary: 'Torob\'s dominant overlay. Filters, sort, store detail, variant picker.',
  description: [
    'The examples are full of bottom sheets — the filter panel, the sort list, the store detail card, the spec sheet, and not one existed as a component. Every one was drawn by hand.',
    'Above 768px a bottom sheet is the wrong shape: there is horizontal room and no thumb constraint. <code>adaptive</code> turns the same component into a side panel at md, with the same markup, the same props and the same focus behaviour. One component, two surfaces.',
  ],
  use: ['Anything the user opens to make a choice and then closes.', 'Snap points for tall content: peek, half, full.', 'Keep the primary action pinned in the footer, above the safe area.'],
  avoid: ['A sheet for content that deserves its own screen.', 'Sheets stacked on sheets.', 'Dismiss-on-outside-tap for a sheet with unsaved input — confirm instead.'],
  anatomy: [['Scrim', '48% ink (64% dark), fades in over 220ms.'], ['Grip', 'The whole 36px strip is the drag target, not the 4px bar.'], ['Head', 'Title and close.'], ['Body', 'Scrolls with <code>overscroll-behavior: contain</code> so the page behind stays put.'], ['Foot', 'Hairline-separated, equal-width actions.']],
  props: [['open', 'boolean', '—', 'Controlled.'], ['adaptive', 'boolean', 'true', 'Becomes a side panel from md.'], ['snapPoints', 'number[]', '[0.9]', 'Fractions of viewport height.'], ['dismissible', 'boolean', 'true', 'Outside tap and Escape.']],
  a11y: ['<code>role="dialog" aria-modal="true"</code> with <code>aria-labelledby</code> pointing at the title.', 'Focus moves in on open and returns to the trigger on close. Focus is trapped while open.', 'Escape closes. The grip is keyboard-operable, or the sheet has a visible close button — a drag-only sheet is not accessible.', 'Body scroll is locked behind the sheet, not just visually covered.'],
  responsive: 'Bottom sheet to 767px, 420px inline-end panel from 768px. The animation swaps with it: slide-up becomes slide-in-from-inline-end, which mirrors correctly in RTL.',
  specimens: [
    { label: 'Filter sheet', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div style="position:relative;inline-size:375px;max-inline-size:100%;block-size:420px;border-radius:16px;overflow:hidden;border:1px solid var(--t-border-default)">
  <div style="position:absolute;inset:0;background:var(--t-bg-scrim)"></div>
  <div class="t-sheet" style="position:absolute;animation:none">
    <div class="t-sheet__grip"></div>
    <div class="t-sheet__head"><span class="t-sheet__title">فیلترها</span><button class="t-icon-btn t-icon-btn--sm" aria-label="بستن"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="m12.7 4.3-1-1L8 7 4.3 3.3l-1 1L7 8l-3.7 3.7 1 1L8 9l3.7 3.7 1-1L9 8z"/></svg></button></div>
    <div class="t-sheet__body">
      <label class="t-check"><input type="checkbox" checked><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">ضمانت ترب</span></label>
      <label class="t-check"><input type="checkbox"><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">نمایندگی رسمی</span></label>
      <label class="t-check"><input type="checkbox" checked><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">باز الان</span></label>
      <label class="t-check"><input type="checkbox"><span class="t-check__box"><svg class="t-check__mark" width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg></span><span class="t-body-md">ارسال فوری</span></label>
    </div>
    <div class="t-sheet__foot"><button class="t-btn t-btn--ghost t-btn--md">حذف همه</button><button class="t-btn t-btn--primary t-btn--md">نمایش ۴۳ نتیجه</button></div>
  </div>
</div>` },
  ],
  react: `export function BottomSheet({ open, onClose, title, adaptive = true, children, footer }) {
  const ref = useRef(null);
  useFocusTrap(ref, open);
  useLockBodyScroll(open);
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <>
      <div className="t-scrim" onClick={onClose} />
      <div className={clsx('t-sheet', adaptive && 't-sheet--adaptive')} ref={ref}
           role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="t-sheet__grip" />
        <div className="t-sheet__head">
          <span className="t-sheet__title" id="sheet-title">{title}</span>
          <IconButton size="sm" label="بستن" onClick={onClose}><CloseIcon /></IconButton>
        </div>
        <div className="t-sheet__body">{children}</div>
        {footer && <div className="t-sheet__foot">{footer}</div>}
      </div>
    </>, document.body);
}`,
},
{
  name: 'Modal', slug: 'modal', group: 'Overlays', status: 'new',
  legacy: [],
  summary: 'Interrupts to get a decision. Use rarely.',
  description: ['A modal is the most expensive interaction in the system: it stops everything. Reserve it for a decision that genuinely cannot wait — a destructive confirmation, a required choice. Everything else is a BottomSheet or an inline change.'],
  use: ['Confirm something irreversible: deleting a saved address.', 'Title states the decision; buttons name the outcomes.', 'Put the destructive action in the outline variant and the safe action as primary.'],
  avoid: ['Modals for information. That is an Alert.', 'Buttons labelled OK/Cancel. Name the action: «حذف آدرس» / «انصراف».', 'Nesting modals.'],
  anatomy: [['Scrim', 'Same as BottomSheet.'], ['Container', 'max 440px, radius 16, elevation-3, scale-in from 0.97.'], ['Foot', 'Equal-width buttons; primary at the inline end.']],
  props: [['open / onClose', '—', '—', 'Controlled.'], ['title', 'string', '—', ''], ['tone', "'default' | 'critical'", "'default'", '']],
  a11y: ['Focus trap, focus return, Escape to close, <code>aria-modal</code>, <code>aria-labelledby</code> and <code>aria-describedby</code>.', 'Initial focus goes to the least destructive action, never to Delete.'],
  responsive: 'Below 375px it becomes a BottomSheet — a full-width centred box on a small phone is a worse shape than a sheet.',
  specimens: [
    { label: 'Destructive confirmation', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div style="position:relative;inline-size:100%;max-inline-size:440px;padding:26px 0">
  <div class="t-modal" style="position:relative;inset:auto;translate:none;animation:none;margin-inline:auto">
    <div class="t-modal__head"><span class="t-modal__title">حذف آدرس ذخیره‌شده؟</span></div>
    <div class="t-modal__body t-body-md t-tone-secondary">«خانه — ولیعصر، حافظ» حذف می‌شود. این کار قابل بازگشت نیست.</div>
    <div class="t-modal__foot"><button class="t-btn t-btn--outline">انصراف</button><button class="t-btn t-btn--primary">حذف آدرس</button></div>
  </div>
</div>` },
  ],
  react: `export function Modal({ open, onClose, title, children, footer }) {
  const ref = useRef(null);
  useFocusTrap(ref, open);
  useLockBodyScroll(open);
  if (!open) return null;
  return createPortal(
    <>
      <div className="t-scrim" onClick={onClose} />
      <div className="t-modal" ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="t-modal__head">
          <span className="t-modal__title" id="modal-title">{title}</span>
        </div>
        <div className="t-modal__body">{children}</div>
        {footer && <div className="t-modal__foot">{footer}</div>}
      </div>
    </>, document.body);
}`,
},
{
  name: 'Accordion', slug: 'accordion', group: 'Overlays', status: 'new',
  legacy: [],
  summary: 'Progressive disclosure for long, scannable content.',
  description: ['The spec sheet on screen 3-5 is a wall of forty attribute rows. An accordion lets the shopper find the two that matter without scrolling past thirty-eight that do not.'],
  use: ['Product specs grouped by theme.', 'FAQ and policy content.', 'Open the first section by default when there is an obvious starting point.'],
  avoid: ['Hiding the primary content of a page behind a click.', 'Accordions inside accordions.', 'Single-item accordions: that is a Collapsible.'],
  anatomy: [['Item', 'Hairline-separated, no outer border.'], ['Trigger', '52px, 14px Bold, full-row target.'], ['Chevron', 'Rotates 180° over 220ms.'], ['Panel', '14px secondary, indented to the trigger text.']],
  props: [['items', '{ id, label, content }[]', '—', ''], ['multiple', 'boolean', 'false', 'Allow several open at once.'], ['defaultOpen', 'string[]', '[]', '']],
  a11y: ['Trigger is a <code>&lt;button&gt;</code> with <code>aria-expanded</code> and <code>aria-controls</code>; the panel has <code>aria-labelledby</code>.', 'Panels use the <code>hidden</code> attribute, not <code>height: 0</code> — collapsed content must leave the accessibility tree.', 'The whole trigger row is the target, not just the chevron.'],
  responsive: 'Identical at every size. Above lg, consider showing all panels open instead.',
  specimens: [
    { label: 'Product specifications', canvas: 'plain', note: 'Live — click a row to expand.', html: `<div class="t-accordion" style="max-inline-size:375px">
  <div class="t-accordion__item">
    <button class="t-accordion__trigger" aria-expanded="true" aria-controls="ac1"><span class="t-accordion__label">مشخصات کلی</span>${chevD}</button>
    <div class="t-accordion__panel" id="ac1">سیستم عامل: iOS ۲۶ · حافظه داخلی: ۱۲۸ گیگابایت · سال تولید: ۲۰۲۵</div>
  </div>
  <div class="t-accordion__item">
    <button class="t-accordion__trigger" aria-expanded="false" aria-controls="ac2"><span class="t-accordion__label">دوربین</span>${chevD}</button>
    <div class="t-accordion__panel" id="ac2" hidden>دوربین اصلی: ۴۸ مگاپیکسل · دوربین سلفی: ۱۲ مگاپیکسل · فیلم‌برداری ۴K</div>
  </div>
  <div class="t-accordion__item">
    <button class="t-accordion__trigger" aria-expanded="false" aria-controls="ac3"><span class="t-accordion__label">بدنه و مقاومت</span>${chevD}</button>
    <div class="t-accordion__panel" id="ac3" hidden>گواهینامه IP53 — مقاوم در برابر پاشیده شدن آب و گرد و غبار. پوشش گوریلا گلس ۳.</div>
  </div>
</div>` },
  ],
  react: `export function Accordion({ items, multiple, defaultOpen = [] }) {
  const [open, setOpen] = useState(new Set(defaultOpen));
  const toggle = id => setOpen(prev => {
    const next = new Set(multiple ? prev : []);
    prev.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  return (
    <div className="t-accordion">
      {items.map(it => (
        <div className="t-accordion__item" key={it.id}>
          <button className="t-accordion__trigger" aria-expanded={open.has(it.id)}
                  aria-controls={\`panel-\${it.id}\`} id={\`trigger-\${it.id}\`}
                  onClick={() => toggle(it.id)}>
            <span className="t-accordion__label">{it.label}</span>
            <ChevronDown className="t-accordion__chevron" />
          </button>
          <div className="t-accordion__panel" id={\`panel-\${it.id}\`}
               aria-labelledby={\`trigger-\${it.id}\`} hidden={!open.has(it.id)}>
            {it.content}
          </div>
        </div>
      ))}
    </div>
  );
}`,
},
{
  name: 'Menu', slug: 'menu', group: 'Overlays', status: 'new',
  legacy: [],
  summary: 'A short list of actions or options anchored to a trigger.',
  description: ['For overflow actions and single-select options that do not warrant a sheet. Above about seven items, a sheet is easier to reach on a phone.'],
  use: ['Overflow on a card or header: اشتراک‌گذاری, گزارش, ذخیره.', 'Single-select where the current value is visible on the trigger.', 'Mark destructive items with <code>--critical</code>.'],
  avoid: ['Menus as primary navigation.', 'Right-click as the only way in.', 'More than seven items on a phone.'],
  anatomy: [['Container', 'Opaque fog, radius 12, elevation-2, 4px padding.'], ['Item', '40px, radius 8, 14px.'], ['Separator', '1px, 4px vertical margin.']],
  props: [['items', '{ label, icon?, onSelect, tone? }[]', '—', ''], ['trigger', 'ReactNode', '—', ''], ['align', "'start' | 'end'", "'start'", 'Logical — mirrors in RTL.']],
  a11y: ['<code>role="menu"</code> with <code>role="menuitem"</code> children; arrow keys move, Escape closes, focus returns to the trigger.', 'For single-select use <code>role="menuitemradio"</code> with <code>aria-checked</code>.', 'The popover flips to stay in the viewport, and flips along the logical axis, so it behaves correctly in RTL.'],
  responsive: 'From md it is a popover; below it, a BottomSheet. Reaching the top of a phone screen one-handed is the problem it avoids.',
  specimens: [
    { label: 'Overflow menu', canvas: 'plain', stageClass: 'spec__stage--center', html: `<div class="t-popover" style="position:relative;inset:auto;animation:none;inline-size:220px">
  <button class="t-menu-item"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M11 10.4a2 2 0 0 0-1.4.6L6.2 9a2 2 0 0 0 0-2l3.4-2a2 2 0 1 0-.6-1L5.6 6A2 2 0 1 0 5.6 10l3.4 2a2 2 0 1 0 2-1.6z"/></svg>اشتراک‌گذاری</button>
  <button class="t-menu-item"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M12 2H4a1 1 0 0 0-1 1v11l5-2.6 5 2.6V3a1 1 0 0 0-1-1z"/></svg>ذخیره</button>
  <button class="t-menu-item" aria-checked="true" role="menuitemradio"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M6.3 11.6 3 8.3l1.1-1.1 2.2 2.2 5.6-5.6L13 4.9z"/></svg>اعلان تغییر قیمت</button>
  <div class="t-menu-sep"></div>
  <button class="t-menu-item t-menu-item--critical"><svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5 15 14H1zM7.3 6v4h1.4V6zm0 5v1.4h1.4V11z"/></svg>گزارش تخلف</button>
</div>` },
  ],
  react: `export function Menu({ trigger, items, align = 'start' }) {
  const [open, setOpen] = useState(false);
  const isPhone = useMediaQuery('(max-width: 767px)');
  if (isPhone) return <><span onClick={() => setOpen(true)}>{trigger}</span>
    <BottomSheet open={open} onClose={() => setOpen(false)} title="عملیات">
      {items.map(i => <ListItem key={i.label} title={i.label} lead={i.icon} onClick={i.onSelect} />)}
    </BottomSheet></>;
  return (
    <Popover open={open} onOpenChange={setOpen} trigger={trigger} align={align}>
      <div className="t-popover" role="menu">
        {items.map(i => i.separator
          ? <div key={i.key} className="t-menu-sep" role="separator" />
          : <button key={i.label} role="menuitem" onClick={i.onSelect}
                    className={clsx('t-menu-item', i.tone === 'critical' && 't-menu-item--critical')}>
              {i.icon}{i.label}
            </button>)}
      </div>
    </Popover>
  );
}`,
},
];
