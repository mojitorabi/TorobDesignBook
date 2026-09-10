const warn = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5 15 14H1zM7.3 6v4h1.4V6zm0 5v1.4h1.4V11z"/></svg>`;
const check = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7 11 3.9 7.9 5 6.8 7 8.8l4-4 1.1 1.1z"/></svg>`;
const info = `<svg class="t-icon t-icon--sm" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.7 3h1.4v1.4H7.3zm2.2 8H6.5v-1.2h1V7.7h-1V6.5h2.2v4.3h1z"/></svg>`;

export default [
{
  name: 'Toast', slug: 'toast', group: 'Feedback', status: 'new',
  legacy: [],
  summary: 'Confirms something happened. Never blocks.',
  description: [
    'The single largest gap in the source kit. Twenty-nine screens, not one confirmation of an action.',
    'Torob toasts are <strong>bottom-anchored</strong>. The industry default is top-right, but the top of a Torob screen is search and the bottom is where the thumb already is. Bottom-anchored also means a toast never covers the header the user is navigating with.',
  ],
  use: ['Confirm an action the user took: «به علاقه‌مندی‌ها اضافه شد».', 'Offer undo when the action is reversible: that is what makes a toast better than a dialog.', '4–5 seconds. Longer for anything with an action.'],
  avoid: ['Errors that need a decision. Use Alert or a dialog.', 'Stacking more than three; collapse to a count.', 'A toast for something the UI already shows — if the heart filled in, the toast is noise.'],
  anatomy: [['Region', 'Fixed bottom, inline-inset 16, safe-area aware. Above md it caps at 380px and hugs the inline end.'], ['Toast', 'Inverse surface, radius 12, elevation-3.'], ['Action', 'Optional undo — underlined, inherits the inverse colour.'], ['Close', 'Always present when there is an action.']],
  props: [['tone', "'default' | 'positive' | 'critical' | 'caution'", "'default'", ''], ['title / desc', 'string', '—', ''], ['action', '{ label, onClick }', '—', 'Usually undo.'], ['duration', 'number', '4200', 'Milliseconds. Pass 0 to require dismissal.']],
  a11y: ['The region is <code>role="status"</code> with <code>aria-live="polite"</code> — announced without stealing focus.', 'Critical toasts use <code>role="alert"</code> and <code>aria-live="assertive"</code>. Use that sparingly; it interrupts.', 'A toast with an action must not auto-dismiss before a keyboard user can reach it — extend to at least 8 seconds, or make it persistent.', 'Never put the only path to an action inside a toast.'],
  responsive: 'Full-width inset on phones; 380px anchored to the inline end from md. Always above the bottom navigation.',
  specimens: [
    { label: 'Live toasts', note: 'These fire real toasts into the page — bottom of the viewport.', canvas: 'fog', html: `<button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({title:'به علاقه‌مندی‌ها اضافه شد',action:'واگرد'})">Default + undo</button>
<button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'positive',title:'آدرس ذخیره شد',desc:'می‌توانید از حساب کاربری ویرایش کنید.'})">Positive</button>
<button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'critical',title:'اتصال برقرار نشد',desc:'دوباره تلاش کنید.',action:'تلاش مجدد'})">Critical</button>
<button class="t-btn t-btn--outline t-btn--md" onclick="torobToast({variant:'caution',title:'موجودی این فروشگاه کم است'})">Caution</button>` },
    { label: 'Anatomy', canvas: 'plain', html: `<div class="t-toast" style="position:relative;max-inline-size:340px">
  <div class="t-toast__body"><div class="t-toast__title">به علاقه‌مندی‌ها اضافه شد</div><div class="t-toast__desc">کازاموراتی مفیستو ۱۰۰ میل</div></div>
  <button class="t-toast__action">واگرد</button>
  <button class="t-toast__close" aria-label="بستن">✕</button>
</div>` },
  ],
  react: `const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const show = useCallback(t => {
    const id = crypto.randomUUID();
    setItems(x => [...x.slice(-2), { ...t, id }]);          // never more than three
    const ms = t.duration ?? (t.action ? 8000 : 4200);       // actions need reachable time
    if (ms) setTimeout(() => setItems(x => x.filter(i => i.id !== id)), ms);
  }, []);
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="t-toast-region" role="status" aria-live="polite">
        {items.map(t => (
          <div key={t.id} className={clsx('t-toast', t.tone && \`t-toast--\${t.tone}\`)}
               role={t.tone === 'critical' ? 'alert' : undefined}>
            <div className="t-toast__body">
              <div className="t-toast__title">{t.title}</div>
              {t.desc && <div className="t-toast__desc">{t.desc}</div>}
            </div>
            {t.action && <button className="t-toast__action" onClick={t.action.onClick}>{t.action.label}</button>}
            <button className="t-toast__close" aria-label="بستن"
                    onClick={() => setItems(x => x.filter(i => i.id !== t.id))}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}`,
},
{
  name: 'Alert', slug: 'alert', group: 'Feedback', status: 'new',
  legacy: [],
  summary: 'Page-level status that stays until it is resolved.',
  description: ['Where a Toast passes, an Alert persists. Use it for conditions the user must know about while they work — an outage, a missing profile field, a delivery restriction in their city.'],
  use: ['State the problem, then the recovery, in that order.', 'Put the fix in the alert as a button when there is one.', 'One alert per region. Two stacked alerts is a design failure upstream.'],
  avoid: ['Alerts for success: that is a Toast.', 'A coloured left border thicker than a hairline. The tinted ground already carries the status.', 'Dismissible alerts for conditions that are still true after dismissal.'],
  anatomy: [['Container', 'Tinted ground, 1px tinted border, radius 12.'], ['Icon', 'Matches the tone, 20px, top-aligned.'], ['Body', 'Bold title, then description.'], ['Actions', 'Optional buttons, below the body.']],
  props: [['tone', "'info' | 'positive' | 'caution' | 'critical' | 'guarantee'", "'info'", ''], ['title / children', 'string', '—', ''], ['actions', 'ReactNode', '—', ''], ['onDismiss', '() => void', '—', 'Only when the condition can genuinely be dismissed.']],
  a11y: ['<code>role="status"</code> for informational tones; <code>role="alert"</code> only for critical.', 'The icon is <code>aria-hidden</code> — the tone is already in the text.'],
  responsive: 'Full width of its container. Actions go block-level below 375px.',
  specimens: [
    { label: 'Tones', canvas: 'fog', stageClass: 'spec__stage--stack', html: `<div class="t-alert t-alert--critical" role="alert" style="max-inline-size:440px">
  ${warn}
  <div class="t-alert__body"><div class="t-alert__title">اتصال به اینترنت برقرار نیست</div><div>نتایج نمایش‌داده‌شده مربوط به آخرین بازدید شماست.</div>
    <div class="t-alert__actions"><button class="t-btn t-btn--outline t-btn--sm">تلاش مجدد</button></div>
  </div>
</div>
<div class="t-alert t-alert--caution" role="status" style="max-inline-size:440px">
  ${warn}<div class="t-alert__body"><div class="t-alert__title">ارسال به این شهر انجام نمی‌شود</div><div>می‌توانید محصول را حضوری از فروشگاه تهیه کنید.</div></div>
</div>
<div class="t-alert t-alert--guarantee" role="status" style="max-inline-size:440px">
  ${check}<div class="t-alert__body"><div class="t-alert__title">این خرید تحت ضمانت ترب است</div><div>تا ۷ روز امکان بازگشت کالا وجود دارد.</div></div>
</div>
<div class="t-alert t-alert--info" role="status" style="max-inline-size:440px">
  ${info}<div class="t-alert__body"><div>قیمت‌ها هر ۲۰ دقیقه به‌روزرسانی می‌شوند.</div></div>
</div>` },
  ],
  react: `export function Alert({ tone = 'info', title, actions, onDismiss, children }) {
  return (
    <div className={clsx('t-alert', \`t-alert--\${tone}\`)} role={tone === 'critical' ? 'alert' : 'status'}>
      <span className="t-alert__icon" aria-hidden="true">{TONE_ICON[tone]}</span>
      <div className="t-alert__body">
        {title && <div className="t-alert__title">{title}</div>}
        <div>{children}</div>
        {actions && <div className="t-alert__actions">{actions}</div>}
      </div>
      {onDismiss && <IconButton size="sm" label="بستن" onClick={onDismiss}><CloseIcon /></IconButton>}
    </div>
  );
}`,
},
{
  name: 'EmptyState', slug: 'empty-state', group: 'Feedback', status: 'new',
  legacy: [],
  summary: 'A valid state with nothing in it. Always names the way out.',
  description: [
    'The source has two of these drawn inline — «محصولی اضافه نشده» and «عدم اتصال محصولات به ترب», but never as a component, so every team would redraw them.',
    'The contract: <strong>an empty state without an action is a dead end.</strong> If there is genuinely nothing to do, say so explicitly rather than leaving silence.',
  ],
  use: ['Distinguish "no results" from "nothing here yet" — they need different copy and different actions.', 'For no results, offer the loosest filter to drop.', 'Keep the art quiet. It is a signpost, not a mascot.'],
  avoid: ['«چیزی یافت نشد» with no next step.', 'Blaming the user for a filter combination the UI allowed.', 'The same illustration for empty and error — they mean different things.'],
  anatomy: [['Art', 'Optional 30–48px glyph, disabled tone (critical for errors).'], ['Title', '16px Bold — names the situation.'], ['Description', '14px secondary, max 46ch — explains and points forward.'], ['Actions', 'One primary recovery, one secondary at most.']],
  props: [['variant', "'empty' | 'error'", "'empty'", 'error tints the art critical.'], ['inline', 'boolean', 'false', 'Compact, for use inside a card.'], ['title / desc / action', '—', '—', '']],
  a11y: ['The title is a real heading at the right level for its position.', 'When results become empty after a filter change, announce it with <code>aria-live="polite"</code> — a silently emptied list looks broken.'],
  responsive: 'Vertical padding halves below 375px. The description never exceeds 46ch at any size.',
  specimens: [
    { label: 'No results', canvas: 'fog', html: `<div class="t-empty" style="inline-size:100%;max-inline-size:420px">
  <div class="t-empty__art"><svg width="40" height="40" viewBox="0 0 32 32" fill="currentColor"><path d="M14 3a11 11 0 1 0 6.7 19.7l6.9 7 1.4-1.4-6.9-6.9A11 11 0 0 0 14 3zm0 2.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z"/></svg></div>
  <div class="t-empty__title">فروشگاهی با این فیلترها پیدا نشد</div>
  <div class="t-empty__desc">در شعاع ۲ کیلومتری، ۷۸ فروشگاه هست. فیلتر «باز الان» را بردارید تا همه را ببینید.</div>
  <div class="t-empty__actions">
    <button class="t-btn t-btn--primary t-btn--md">حذف فیلتر «باز الان»</button>
    <button class="t-btn t-btn--ghost t-btn--md">همه فیلترها</button>
  </div>
</div>` },
    { label: 'Error', canvas: 'fog', html: `<div class="t-empty t-empty--error" style="inline-size:100%;max-inline-size:420px">
  <div class="t-empty__art"><svg width="40" height="40" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3 30 28H2zM14.6 12v8h2.8v-8zm0 10v2.8h2.8V22z"/></svg></div>
  <div class="t-empty__title">نتوانستیم فروشگاه‌ها را بارگذاری کنیم</div>
  <div class="t-empty__desc">اتصال اینترنت را بررسی کنید و دوباره تلاش کنید. اگر مشکل ادامه داشت، چند دقیقه بعد سر بزنید.</div>
  <div class="t-empty__actions"><button class="t-btn t-btn--primary t-btn--md">تلاش مجدد</button></div>
  <div class="t-empty__code">ERR_NEARBY_TIMEOUT</div>
</div>` },
  ],
  react: `export function EmptyState({ variant = 'empty', inline, art, title, desc, action, code }) {
  return (
    <div className={clsx('t-empty', variant === 'error' && 't-empty--error', inline && 't-empty--inline')}>
      {art && <div className="t-empty__art" aria-hidden="true">{art}</div>}
      <div className="t-empty__title">{title}</div>
      {desc && <div className="t-empty__desc">{desc}</div>}
      {action && <div className="t-empty__actions">{action}</div>}
      {code && <div className="t-empty__code">{code}</div>}
    </div>
  );
}`,
},
{
  name: 'Skeleton', slug: 'skeleton', group: 'Feedback', status: 'new',
  legacy: [],
  summary: 'Holds the shape of content that has not arrived.',
  description: ['A skeleton that does not match the real layout is worse than a spinner — the page jumps when content lands. Build skeletons from the same layout primitives as the real component.'],
  use: ['For content whose shape you know in advance: cards, lists, tables.', 'Match the real element\'s dimensions exactly.', 'Show it only after ~200ms — faster than that and it flashes.'],
  avoid: ['Skeletons for unknown-shape content. Use a spinner.', 'Shimmer on more than about a screenful — it becomes visual noise.', 'A skeleton that is taller or shorter than what replaces it.'],
  anatomy: [['Block', 'Subtle-to-sunken gradient, 1.4s shimmer, radius 8 (4 for text).']],
  props: [['variant', "'block' | 'text' | 'title' | 'circle'", "'block'", '']],
  a11y: ['The container is <code>aria-busy="true"</code>; the skeletons themselves are <code>aria-hidden</code>.', 'Announce completion once with <code>aria-live="polite"</code>, not per item.', 'The shimmer stops entirely under <code>prefers-reduced-motion</code>.'],
  responsive: 'Inherits the real component\'s responsive behaviour, because it uses the same layout classes.',
  specimens: [
    { label: 'Store card skeleton', canvas: 'plain', html: `<div class="t-store-card" aria-busy="true" style="max-inline-size:340px;border-radius:12px">
  <div class="t-store-card__head">
    <div class="t-store-card__logo t-skeleton"></div>
    <div class="t-store-card__body" style="gap:6px">
      <div class="t-skeleton t-skeleton--title" style="inline-size:58%"></div>
      <div class="t-skeleton t-skeleton--text" style="inline-size:76%"></div>
    </div>
  </div>
  <div class="t-store-card__rail">
    <div><div class="t-thumb t-thumb--sm t-skeleton"></div></div>
    <div><div class="t-thumb t-thumb--sm t-skeleton"></div></div>
    <div><div class="t-thumb t-thumb--sm t-skeleton"></div></div>
  </div>
</div>` },
  ],
  react: `export function Skeleton({ variant = 'block', width, height, className }) {
  return <div className={clsx('t-skeleton', variant !== 'block' && \`t-skeleton--\${variant}\`, className)}
              style={{ inlineSize: width, blockSize: height }} aria-hidden="true" />;
}`,
},
{
  name: 'Spinner', slug: 'spinner', group: 'Feedback', status: 'new',
  legacy: [],
  summary: 'Indeterminate wait for unknown-shape content.',
  description: ['Use a spinner only where a skeleton cannot work, because you do not know the shape of what is coming.'],
  use: ['Inside buttons during submit (Button handles this itself).', 'Full-screen only for a blocking operation the user started.'],
  avoid: ['A spinner where the layout is known — use Skeleton.', 'A spinner with no ceiling. After ~10 seconds, switch to an error with a retry.'],
  anatomy: [['Ring', '20px default, 2px, accent top on a default-border ring, 620ms linear.']],
  props: [['size', "'sm' | 'md' | 'lg'", "'md'", '14 / 20 / 32 px.']],
  a11y: ['Wrap in <code>role="status"</code> with a visually hidden "در حال بارگذاری".', 'Under <code>prefers-reduced-motion</code> the spin slows rather than stopping — a frozen spinner reads as a crash.'],
  responsive: 'Fixed sizes.',
  specimens: [
    { label: 'Sizes', canvas: 'fog', html: `<span class="t-spinner t-spinner--sm"></span><span class="t-spinner"></span><span class="t-spinner t-spinner--lg"></span>
<div role="status" style="display:flex;align-items:center;gap:8px"><span class="t-spinner"></span><span class="t-body-md t-tone-secondary">در حال بارگذاری فروشگاه‌ها…</span></div>` },
  ],
  react: `export function Spinner({ size = 'md', label = 'در حال بارگذاری' }) {
  return (
    <span role="status">
      <span className={clsx('t-spinner', size !== 'md' && \`t-spinner--\${size}\`)} />
      <span className="t-visually-hidden">{label}</span>
    </span>
  );
}`,
},
];
