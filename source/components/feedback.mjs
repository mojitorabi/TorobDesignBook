/* Component registry.
   The source of truth for each component's Farsi docs, specimens, props and
   React wrapper. Edit here; the site, MCP data and React package are built
   from it. Specimen HTML must use system classes only. */
export default [
  {
    "name": "Toast",
    "root": "t-toast",
    "slug": "toast",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "تأیید می‌کند که چیزی اتفاق افتاد. هرگز مسدود نمی‌کند.",
    "description": [
      "بزرگ‌ترین خلأ کیت اولیه. بیست‌ونه صفحه، و حتی یک تأیید برای کنش کاربر وجود نداشت.",
      "توست‌های ترب <strong>به پایین لنگر می‌اندازند</strong>. پیش‌فرض صنعت بالا-راست است، اما بالای صفحهٔ ترب جای جست‌وجوست و پایین همان‌جایی است که شست از قبل هست. لنگر پایین یعنی توست هرگز هدری را که کاربر با آن ناوبری می‌کند نمی‌پوشاند."
    ],
    "use": [
      "کنشی را که کاربر انجام داد تأیید کنید: «به علاقه‌مندی‌ها اضافه شد».",
      "وقتی کنش بازگشت‌پذیر است «واگرد» بدهید؛ همین است که توست را از دیالوگ بهتر می‌کند.",
      "چهار تا پنج ثانیه. برای هر چیزی که کنش دارد، بیشتر."
    ],
    "avoid": [
      "خطاهایی که نیاز به تصمیم دارند. آنجا Alert یا دیالوگ درست است.",
      "انباشتن بیش از سه تا؛ به یک شمارنده جمع کنید.",
      "توست برای چیزی که رابط از قبل نشان می‌دهد؛ اگر قلب پر شد، توست فقط نویز است."
    ],
    "anatomy": [
      [
        "ناحیه",
        "ثابت در پایین، فاصلهٔ ۱۶ پیکسلی، آگاه به ناحیهٔ امن. بالای md سقف ۳۸۰ پیکسل می‌گیرد و به انتهای محور می‌چسبد."
      ],
      [
        "توست",
        "سطح معکوس، گردی ۱۲، ارتفاع ۳.",
        ":root"
      ],
      [
        "کنش",
        "واگرد اختیاری — زیرخط‌دار، هم‌رنگ معکوس.",
        ".t-toast__action"
      ],
      [
        "بستن",
        "هرجا کنش هست، همیشه حاضر.",
        ".t-toast__close"
      ]
    ],
    "props": [
      [
        "tone",
        "'default' | 'positive' | 'critical' | 'caution'",
        "'default'",
        ""
      ],
      [
        "title / desc",
        "string",
        "—",
        ""
      ],
      [
        "action",
        "{ label, onClick }",
        "—",
        "معمولاً واگرد."
      ],
      [
        "duration",
        "number",
        "4200",
        "میلی‌ثانیه. صفر یعنی نیازمند بستن دستی."
      ]
    ],
    "a11y": [
      "ناحیه <code>role=\"status\"</code> با <code>aria-live=\"polite\"</code> است — اعلام می‌شود بدون آنکه فوکوس را بدزدد.",
      "توست بحرانی <code>role=\"alert\"</code> و <code>aria-live=\"assertive\"</code> می‌گیرد. کم استفاده کنید؛ کار کاربر را قطع می‌کند.",
      "توستی که کنش دارد نباید پیش از آنکه کاربر صفحه‌کلید به آن برسد خودبه‌خود بسته شود — دست‌کم هشت ثانیه، یا ماندگار.",
      "هرگز تنها راه رسیدن به یک کنش را داخل توست نگذارید."
    ],
    "responsive": "روی موبایل تمام‌عرض با فاصله؛ از md عرض ۳۸۰ پیکسل چسبیده به انتهای محور. همیشه بالای ناوبری پایین.",
    "specimens": [
      {
        "label": "توست‌های زنده",
        "note": "این‌ها توست واقعی در صفحه ایجاد می‌کنند — پایین نمایشگر.",
        "canvas": "fog",
        "html": "<button class=\"t-btn t-btn--outline t-btn--md\" onclick=\"torobToast({title:'به علاقه‌مندی‌ها اضافه شد',action:'واگرد'})\">Default + undo</button>\n<button class=\"t-btn t-btn--outline t-btn--md\" onclick=\"torobToast({variant:'positive',title:'آدرس ذخیره شد',desc:'می‌توانید از حساب کاربری ویرایش کنید.'})\">Positive</button>\n<button class=\"t-btn t-btn--outline t-btn--md\" onclick=\"torobToast({variant:'critical',title:'اتصال برقرار نشد',desc:'دوباره تلاش کنید.',action:'تلاش مجدد'})\">Critical</button>\n<button class=\"t-btn t-btn--outline t-btn--md\" onclick=\"torobToast({variant:'caution',title:'موجودی این فروشگاه کم است'})\">Caution</button>"
      },
      {
        "label": "ساختار",
        "canvas": "plain",
        "html": "<div class=\"t-toast\" style=\"position:relative;max-inline-size:340px\">\n  <div class=\"t-toast__body\"><div class=\"t-toast__title\">به علاقه‌مندی‌ها اضافه شد</div><div class=\"t-toast__desc\">کازاموراتی مفیستو ۱۰۰ میل</div></div>\n  <button class=\"t-toast__action\">واگرد</button>\n  <button class=\"t-toast__close\" aria-label=\"بستن\">✕</button>\n</div>"
      }
    ],
    "react": "const ToastContext = createContext(null);\nexport const useToast = () => useContext(ToastContext);\n\nexport function ToastProvider({ children }) {\n  const [items, setItems] = useState([]);\n  const show = useCallback(t => {\n    const id = crypto.randomUUID();\n    setItems(x => [...x.slice(-2), { ...t, id }]);          // never more than three\n    const ms = t.duration ?? (t.action ? 8000 : 4200);       // actions need reachable time\n    if (ms) setTimeout(() => setItems(x => x.filter(i => i.id !== id)), ms);\n  }, []);\n  return (\n    <ToastContext.Provider value={{ show }}>\n      {children}\n      <div className=\"t-toast-region\" role=\"status\" aria-live=\"polite\">\n        {items.map(t => (\n          <div key={t.id} className={clsx('t-toast', t.tone && `t-toast--${t.tone}`)}\n               role={t.tone === 'critical' ? 'alert' : undefined}>\n            <div className=\"t-toast__body\">\n              <div className=\"t-toast__title\">{t.title}</div>\n              {t.desc && <div className=\"t-toast__desc\">{t.desc}</div>}\n            </div>\n            {t.action && <button className=\"t-toast__action\" onClick={t.action.onClick}>{t.action.label}</button>}\n            <button className=\"t-toast__close\" aria-label=\"بستن\"\n                    onClick={() => setItems(x => x.filter(i => i.id !== t.id))}>✕</button>\n          </div>\n        ))}\n      </div>\n    </ToastContext.Provider>\n  );\n}"
  },
  {
    "name": "Alert",
    "root": "t-alert",
    "slug": "alert",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "وضعیت سطح‌صفحه که تا حل‌نشدن می‌ماند.",
    "description": [
      "جایی که Toast می‌گذرد، Alert می‌ماند. برای شرایطی که کاربر باید هنگام کار از آنها خبر داشته باشد: قطعی سرویس، فیلد ناقص پروفایل، محدودیت ارسال در شهرش."
    ],
    "use": [
      "اول مشکل را بگویید، بعد راه جبران را — به همین ترتیب.",
      "وقتی راه‌حلی هست، آن را به‌صورت دکمه داخل هشدار بگذارید.",
      "در هر ناحیه یک هشدار. دو هشدار روی هم یعنی جای دیگری در طراحی اشتباه شده."
    ],
    "avoid": [
      "هشدار برای موفقیت — آن کار Toast است.",
      "کادر رنگی کناری ضخیم‌تر از یک خط مویی؛ زمینهٔ رنگی از قبل وضعیت را می‌رساند.",
      "هشدار قابل‌بستن برای شرایطی که پس از بستن هنوز برقرارند."
    ],
    "anatomy": [
      [
        "ظرف",
        "زمینهٔ رنگی، کادر ۱ پیکسلی هم‌رنگ، گردی ۱۲.",
        ":root"
      ],
      [
        "آیکون",
        "هم‌فام، ۲۰ پیکسل، تراز بالا.",
        ".t-icon"
      ],
      [
        "بدنه",
        "عنوان Bold، سپس توضیح.",
        ".t-alert__body"
      ],
      [
        "کنش‌ها",
        "دکمه‌های اختیاری، زیر بدنه.",
        ".t-alert__actions"
      ]
    ],
    "props": [
      [
        "tone",
        "'info' | 'positive' | 'caution' | 'critical' | 'guarantee'",
        "'info'",
        ""
      ],
      [
        "title / children",
        "string",
        "—",
        ""
      ],
      [
        "actions",
        "ReactNode",
        "—",
        ""
      ],
      [
        "onDismiss",
        "() => void",
        "—",
        "فقط وقتی که شرط واقعاً قابل بستن است."
      ]
    ],
    "a11y": [
      "<code>role=\"status\"</code> برای فام‌های اطلاعی؛ <code>role=\"alert\"</code> فقط برای بحرانی.",
      "آیکون <code>aria-hidden</code> است — فام از قبل در متن آمده.",
      "معیار ۳.۲.۶ نسخهٔ ۲.۲: اگر هشدار راه کمک می‌دهد، آن راه باید در همهٔ صفحه‌ها در جای یکسانی باشد."
    ],
    "responsive": "تمام‌عرض ظرف خودش. زیر ۳۷۵ پیکسل کنش‌ها تمام‌عرض می‌شوند.",
    "specimens": [
      {
        "label": "فام‌ها",
        "canvas": "fog",
        "stageClass": "spec__stage--stack",
        "html": "<div class=\"t-alert t-alert--critical\" role=\"alert\" style=\"max-inline-size:440px\">\n  <svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\"/><path d=\"M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\" data-icon-path=\"inner-path\" opacity=\"0\"/></svg>\n  <div class=\"t-alert__body\"><div class=\"t-alert__title\">اتصال به اینترنت برقرار نیست</div><div>نتایج نمایش‌داده‌شده مربوط به آخرین بازدید شماست.</div>\n    <div class=\"t-alert__actions\"><button class=\"t-btn t-btn--outline t-btn--sm\">تلاش مجدد</button></div>\n  </div>\n</div>\n<div class=\"t-alert t-alert--caution\" role=\"status\" style=\"max-inline-size:440px\">\n  <svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\"/><path d=\"M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\" data-icon-path=\"inner-path\" opacity=\"0\"/></svg><div class=\"t-alert__body\"><div class=\"t-alert__title\">ارسال به این شهر انجام نمی‌شود</div><div>می‌توانید محصول را حضوری از فروشگاه تهیه کنید.</div></div>\n</div>\n<div class=\"t-alert t-alert--guarantee\" role=\"status\" style=\"max-inline-size:440px\">\n  <svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z\"/><path d=\"M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z\" data-icon-path=\"inner-path\" opacity=\"0\"/></svg><div class=\"t-alert__body\"><div class=\"t-alert__title\">این خرید تحت ضمانت ترب است</div><div>تا ۷ روز امکان بازگشت کالا وجود دارد.</div></div>\n</div>\n<div class=\"t-alert t-alert--info\" role=\"status\" style=\"max-inline-size:440px\">\n  <svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z\"/><path d=\"M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z\" data-icon-path=\"inner-path\" opacity=\"0\"/></svg><div class=\"t-alert__body\"><div>قیمت‌ها هر ۲۰ دقیقه به‌روزرسانی می‌شوند.</div></div>\n</div>"
      }
    ],
    "react": "export function Alert({ tone = 'info', title, actions, onDismiss, children }) {\n  return (\n    <div className={clsx('t-alert', `t-alert--${tone}`)} role={tone === 'critical' ? 'alert' : 'status'}>\n      <span className=\"t-alert__icon\" aria-hidden=\"true\">{TONE_ICON[tone]}</span>\n      <div className=\"t-alert__body\">\n        {title && <div className=\"t-alert__title\">{title}</div>}\n        <div>{children}</div>\n        {actions && <div className=\"t-alert__actions\">{actions}</div>}\n      </div>\n      {onDismiss && <IconButton size=\"sm\" label=\"بستن\" onClick={onDismiss}><CloseIcon /></IconButton>}\n    </div>\n  );\n}"
  },
  {
    "name": "EmptyState",
    "root": "t-empty",
    "slug": "empty-state",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "یک حالت معتبر که چیزی در آن نیست. همیشه راه خروج را نام می‌برد.",
    "description": [
      "منبع دو تا از اینها را درجا کشیده — «محصولی اضافه نشده» و «عدم اتصال محصولات به ترب» — اما هرگز به‌عنوان کامپوننت، پس هر تیمی دوباره می‌کشیدشان.",
      "قرارداد این است: <strong>حالت خالی بدون کنش یک بن‌بست است.</strong> اگر واقعاً کاری برای انجام‌دادن نیست، همین را صریح بگویید، نه اینکه سکوت کنید."
    ],
    "use": [
      "«نتیجه‌ای نبود» را از «هنوز چیزی اینجا نیست» جدا کنید؛ این دو متن و کنش متفاوت می‌خواهند.",
      "برای نبود نتیجه، شل‌ترین فیلتر را برای حذف پیشنهاد دهید.",
      "تصویر را آرام نگه دارید. یک تابلوی راهنماست، نه یک شخصیت."
    ],
    "avoid": [
      "«چیزی یافت نشد» بدون قدم بعدی.",
      "سرزنش کاربر برای ترکیب فیلتری که خود رابط اجازه‌اش را داد.",
      "یک تصویر مشترک برای خالی و خطا؛ این دو معنای متفاوتی دارند."
    ],
    "anatomy": [
      [
        "تصویر",
        "نشانهٔ اختیاری ۳۰ تا ۴۸ پیکسلی، فام غیرفعال (بحرانی برای خطا).",
        ".t-empty__art"
      ],
      [
        "عنوان",
        "۱۶ پیکسل Bold — وضعیت را نام می‌برد.",
        ".t-empty__title"
      ],
      [
        "توضیح",
        "۱۴ پیکسل ثانویه، حداکثر ۴۶ نویسه — توضیح می‌دهد و به جلو اشاره می‌کند.",
        ".t-empty__desc"
      ],
      [
        "کنش‌ها",
        "یک جبران اصلی، حداکثر یک ثانویه.",
        ".t-empty__actions"
      ]
    ],
    "props": [
      [
        "variant",
        "'empty' | 'error'",
        "'empty'",
        "error تصویر را بحرانی می‌کند."
      ],
      [
        "inline",
        "boolean",
        "false",
        "فشرده، برای استفاده درون کارت."
      ],
      [
        "title / desc / action",
        "—",
        "—",
        ""
      ]
    ],
    "a11y": [
      "عنوان یک هدینگ واقعی در سطح درست جایگاهش است.",
      "وقتی نتایج پس از تغییر فیلتر خالی می‌شوند، با <code>aria-live=\"polite\"</code> اعلام کنید؛ فهرستی که بی‌صدا خالی شود خراب به نظر می‌رسد."
    ],
    "responsive": "فاصلهٔ عمودی زیر ۳۷۵ پیکسل نصف می‌شود. توضیح در هیچ اندازه‌ای از ۴۶ نویسه فراتر نمی‌رود.",
    "specimens": [
      {
        "label": "نتیجه‌ای نبود",
        "canvas": "fog",
        "html": "<div class=\"t-empty\" style=\"inline-size:100%;max-inline-size:420px\">\n  <div class=\"t-empty__art\"><svg class=\"t-icon\" width=\"40\" height=\"40\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z\"/></svg></div>\n  <div class=\"t-empty__title\">فروشگاهی با این فیلترها پیدا نشد</div>\n  <div class=\"t-empty__desc\">در شعاع ۲ کیلومتری، ۷۸ فروشگاه هست. فیلتر «باز الان» را بردارید تا همه را ببینید.</div>\n  <div class=\"t-empty__actions\">\n    <button class=\"t-btn t-btn--primary t-btn--md\">حذف فیلتر «باز الان»</button>\n    <button class=\"t-btn t-btn--ghost t-btn--md\">همه فیلترها</button>\n  </div>\n</div>"
      },
      {
        "label": "خطا",
        "canvas": "fog",
        "html": "<div class=\"t-empty t-empty--error\" style=\"inline-size:100%;max-inline-size:420px\">\n  <div class=\"t-empty__art\"><svg width=\"40\" height=\"40\" viewBox=\"0 0 20 20\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z\"/><path d=\"M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z\" data-icon-path=\"inner-path\" opacity=\"0\"/></svg></div>\n  <div class=\"t-empty__title\">نتوانستیم فروشگاه‌ها را بارگذاری کنیم</div>\n  <div class=\"t-empty__desc\">اتصال اینترنت را بررسی کنید و دوباره تلاش کنید. اگر مشکل ادامه داشت، چند دقیقه بعد سر بزنید.</div>\n  <div class=\"t-empty__actions\"><button class=\"t-btn t-btn--primary t-btn--md\">تلاش مجدد</button></div>\n  <div class=\"t-empty__code\">ERR_NEARBY_TIMEOUT</div>\n</div>"
      }
    ],
    "react": "export function EmptyState({ variant = 'empty', inline, art, title, desc, action, code }) {\n  return (\n    <div className={clsx('t-empty', variant === 'error' && 't-empty--error', inline && 't-empty--inline')}>\n      {art && <div className=\"t-empty__art\" aria-hidden=\"true\">{art}</div>}\n      <div className=\"t-empty__title\">{title}</div>\n      {desc && <div className=\"t-empty__desc\">{desc}</div>}\n      {action && <div className=\"t-empty__actions\">{action}</div>}\n      {code && <div className=\"t-empty__code\">{code}</div>}\n    </div>\n  );\n}"
  },
  {
    "name": "Skeleton",
    "root": "t-skeleton",
    "slug": "skeleton",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "شکل محتوایی را نگه می‌دارد که هنوز نرسیده.",
    "description": [
      "اسکلتی که با چیدمان واقعی نخواند بدتر از اسپینر است؛ وقتی محتوا می‌رسد صفحه می‌پرد. اسکلت‌ها را از همان ابزارهای چیدمان کامپوننت واقعی بسازید."
    ],
    "use": [
      "برای محتوایی که شکلش را از پیش می‌دانید: کارت، فهرست، جدول.",
      "ابعاد را دقیقاً با عنصر واقعی یکی کنید.",
      "فقط بعد از حدود ۲۰۰ میلی‌ثانیه نشان دهید؛ سریع‌تر از آن چشمک می‌زند."
    ],
    "avoid": [
      "اسکلت برای محتوای با شکل نامعلوم. آنجا اسپینر درست است.",
      "درخشش روی بیش از حدود یک صفحه؛ به نویز بصری تبدیل می‌شود.",
      "اسکلتی که از چیزی که جایش را می‌گیرد بلندتر یا کوتاه‌تر است."
    ],
    "anatomy": [
      [
        "بلوک",
        "گرادیان ملایم تا فرورفته، درخشش ۱٫۴ ثانیه‌ای، گردی ۸ (۴ برای متن).",
        ":root"
      ]
    ],
    "props": [
      [
        "variant",
        "'block' | 'text' | 'title' | 'circle'",
        "'block'",
        ""
      ]
    ],
    "a11y": [
      "ظرف <code>aria-busy=\"true\"</code> می‌گیرد؛ خود اسکلت‌ها <code>aria-hidden</code> هستند.",
      "پایان بارگذاری را یک بار با <code>aria-live=\"polite\"</code> اعلام کنید، نه به‌ازای هر آیتم.",
      "درخشش زیر <code>prefers-reduced-motion</code> کاملاً متوقف می‌شود."
    ],
    "responsive": "رفتار واکنش‌گرای کامپوننت واقعی را به ارث می‌برد، چون از همان کلاس‌های چیدمان استفاده می‌کند.",
    "specimens": [
      {
        "label": "اسکلت کارت فروشگاه",
        "canvas": "plain",
        "html": "<div class=\"t-store-card\" aria-busy=\"true\" style=\"max-inline-size:340px;border-radius:12px\">\n  <div class=\"t-store-card__head\">\n    <div class=\"t-store-card__logo t-skeleton\"></div>\n    <div class=\"t-store-card__body\" style=\"gap:6px\">\n      <div class=\"t-skeleton t-skeleton--title\" style=\"inline-size:58%\"></div>\n      <div class=\"t-skeleton t-skeleton--text\" style=\"inline-size:76%\"></div>\n    </div>\n  </div>\n  <div class=\"t-store-card__rail\">\n    <div><div class=\"t-thumb t-thumb--sm t-skeleton\"></div></div>\n    <div><div class=\"t-thumb t-thumb--sm t-skeleton\"></div></div>\n    <div><div class=\"t-thumb t-thumb--sm t-skeleton\"></div></div>\n  </div>\n</div>"
      }
    ],
    "react": "export function Skeleton({ variant = 'block', width, height, className }) {\n  return <div className={clsx('t-skeleton', variant !== 'block' && `t-skeleton--${variant}`, className)}\n              style={{ inlineSize: width, blockSize: height }} aria-hidden=\"true\" />;\n}"
  },
  {
    "name": "Spinner",
    "root": "t-spinner",
    "slug": "spinner",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "انتظار نامعین برای محتوای با شکل نامعلوم.",
    "description": [
      "اسپینر را فقط جایی به کار ببرید که اسکلت کار نمی‌کند، چون شکل آنچه در راه است را نمی‌دانید."
    ],
    "use": [
      "داخل دکمه هنگام ثبت (خود Button این را مدیریت می‌کند).",
      "تمام‌صفحه فقط برای عملیات مسدودکننده‌ای که کاربر شروع کرده."
    ],
    "avoid": [
      "اسپینر جایی که چیدمان معلوم است — آنجا Skeleton درست است.",
      "اسپینر بی‌سقف. پس از حدود ده ثانیه به خطا با دکمهٔ تلاش مجدد سوئیچ کنید."
    ],
    "anatomy": [
      [
        "حلقه",
        "۲۰ پیکسل پیش‌فرض، ۲ پیکسل ضخامت، بالای آبی روی حلقهٔ کادر پیش‌فرض، ۶۲۰ میلی‌ثانیه خطی.",
        ":root"
      ]
    ],
    "props": [
      [
        "size",
        "'sm' | 'md' | 'lg'",
        "'md'",
        "۱۴ / ۲۰ / ۳۲ پیکسل."
      ]
    ],
    "a11y": [
      "درون <code>role=\"status\"</code> با یک «در حال بارگذاری» بصری‌پنهان بپیچید.",
      "زیر <code>prefers-reduced-motion</code> چرخش کند می‌شود، نه اینکه بایستد؛ اسپینر یخ‌زده مثل صفحهٔ کرش‌کرده خوانده می‌شود."
    ],
    "responsive": "اندازه‌های ثابت.",
    "specimens": [
      {
        "label": "اندازه‌ها",
        "canvas": "fog",
        "html": "<span class=\"t-spinner t-spinner--sm\"></span><span class=\"t-spinner\"></span><span class=\"t-spinner t-spinner--lg\"></span>\n<div role=\"status\" style=\"display:flex;align-items:center;gap:8px\"><span class=\"t-spinner\"></span><span class=\"t-body-md t-tone-secondary\">در حال بارگذاری فروشگاه‌ها…</span></div>"
      }
    ],
    "react": "export function Spinner({ size = 'md', label = 'در حال بارگذاری' }) {\n  return (\n    <span role=\"status\">\n      <span className={clsx('t-spinner', size !== 'md' && `t-spinner--${size}`)} />\n      <span className=\"t-visually-hidden\">{label}</span>\n    </span>\n  );\n}"
  },
  {
    "name": "Tooltip",
    "root": "t-tooltip",
    "slug": "tooltip",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "نام یک کنترل فقط‌آیکون، روی دسکتاپ. نه بیشتر.",
    "description": [
      "راهنمای شناور در ترب یک کاربرد دارد: گفتن نام دکمه‌ای که فقط آیکون دارد، آن هم روی دسکتاپ که اشاره‌گر وجود دارد. روی لمس، هاور نیست؛ پس هر چیزی که فقط در راهنمای شناور گفته شود، برای کاربر موبایل گفته نشده است.",
      "به همین دلیل این کامپوننت هرگز حامل اطلاعات لازم نیست. توضیح ضروری در متن صفحه می‌آید، خطا زیر فیلد، و جزئیات در <a href=\"../components/bottom-sheet.html\">BottomSheet</a>."
    ],
    "use": [
      "برای نام دکمه‌های فقط‌آیکون در پنل فروشنده.",
      "۲۰۰ تا ۳۰۰ میلی‌ثانیه تأخیر پیش از نمایش؛ بدون تأخیر، حرکت ماوس روی نوار ابزار چشمک‌زن می‌شود.",
      "متن را در حد دو تا چهار کلمه نگه دارید."
    ],
    "avoid": [
      "راهنمای شناور روی لمس. آنجا وجود ندارد.",
      "قراردادن لینک یا دکمه داخلش؛ با صفحه‌کلید قابل رسیدن نیست.",
      "استفاده به‌جای برچسب. <code>aria-label</code> جای برچسب است."
    ],
    "anatomy": [
      [
        "حباب",
        "زمینهٔ معکوس، گردی ۴، ارتفاع ۲، بدون شکست خط.",
        ".t-tooltip"
      ]
    ],
    "props": [
      [
        "label",
        "string",
        "—",
        "متن راهنما."
      ],
      [
        "placement",
        "'top' | 'bottom'",
        "'top'",
        "روی محور عمودی؛ محور افقی در راست‌چین قرینه می‌شود."
      ],
      [
        "delay",
        "number",
        "250",
        "میلی‌ثانیه تا نمایش."
      ]
    ],
    "a11y": [
      "متن راهنما نباید تنها نام کنترل باشد: دکمه <code>aria-label</code> خودش را دارد و راهنما فقط همان را نشان می‌دهد.",
      "با <code>aria-describedby</code> وصل می‌شود، نه <code>aria-labelledby</code>، مگر اینکه واقعاً نام باشد.",
      "با فوکوس صفحه‌کلید هم باز می‌شود، نه فقط با هاور (معیار ۱.۴.۱۳).",
      "کلید Escape می‌بنددش و تا وقتی اشاره‌گر روی خودش است باز می‌ماند."
    ],
    "responsive": "زیر md اصلاً نمایش داده نمی‌شود. اگر متنی روی گوشی لازم است، جایش در صفحه است نه در راهنمای شناور.",
    "specimens": [
      {
        "label": "روی دکمهٔ فقط‌آیکون",
        "canvas": "plain",
        "stageClass": "spec__stage--center",
        "html": "<div style=\"position:relative;padding-block-start:38px\">\n  <span class=\"t-tooltip\" data-open=\"true\" role=\"tooltip\" id=\"tt1\" style=\"inset-block-start:0;inset-inline-start:50%;translate:50% 0\">خروجی اکسل</span>\n  <button class=\"t-icon-btn\" aria-label=\"خروجی اکسل\" aria-describedby=\"tt1\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zM26 14l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10 10-10z\"/></svg></button>\n</div>",
        "note": "در این نمونه باز نگه داشته شده. در محصول، با هاور یا فوکوس و با ۲۵۰ میلی‌ثانیه تأخیر باز می‌شود."
      }
    ],
    "react": "export function Tooltip({ label, children, delay = 250 }) {\n  const [open, setOpen] = useState(false);\n  const timer = useRef();\n  const id = useId();\n  const show = () => { timer.current = setTimeout(() => setOpen(true), delay); };\n  const hide = () => { clearTimeout(timer.current); setOpen(false); };\n  useEffect(() => {\n    const onKey = e => e.key === 'Escape' && hide();\n    document.addEventListener('keydown', onKey);\n    return () => document.removeEventListener('keydown', onKey);\n  }, []);\n  return (\n    <span style={{ position: 'relative', display: 'inline-flex' }}\n          onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={hide}>\n      {cloneElement(children, { 'aria-describedby': id })}\n      <span className=\"t-tooltip\" role=\"tooltip\" id={id} data-open={open || undefined}>{label}</span>\n    </span>\n  );\n}"
  },
  {
    "name": "ProgressBar",
    "root": "t-progress",
    "slug": "progress-bar",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "کاری که پیشرفتش را می‌شود شمرد. اگر نمی‌شود، اسپینر است.",
    "description": [
      "نوار پیشرفت وقتی درست است که عددی پشتش باشد: چند فایل از چند فایل، چند مگابایت از چند مگابایت. اگر آن عدد را ندارید، <a href=\"spinner.html\">Spinner</a> صادق‌تر است — و نوار نامعین (<code>--indeterminate</code>) فقط برای کاری است که طولانی است اما اندازه‌اش معلوم نیست، مثل پردازش سمت سرور.",
      "ارتفاعش ۴ پیکسل است و عمداً نازک؛ نوار پیشرفت یک حاشیه است، نه محتوای صفحه."
    ],
    "use": [
      "برای بارگذاری فایل، درصد تکمیل پروفایل فروشنده، مراحل یک فرم بلند.",
      "درصد را در کنارش بنویسید. نوار به‌تنهایی عدد را منتقل نمی‌کند.",
      "وقتی به ۱۰۰ رسید، جایش را با نتیجه عوض کنید؛ نوار پر، پیام موفقیت نیست."
    ],
    "avoid": [
      "نوار پیشرفت برای انتظار کوتاه زیر یک ثانیه.",
      "پیشرفت جعلی که با زمان جلو می‌رود نه با کار.",
      "نوار نامعین جایی که عدد واقعی در دسترس است."
    ],
    "anatomy": [
      [
        "ریل",
        "۴ پیکسل، گردی کامل، زمینهٔ ملایم، سرریز پنهان.",
        ".t-progress"
      ],
      [
        "پرشده",
        "آبی کنش، عرضش با <code>inline-size</code> عوض می‌شود و انتقال استاندارد دارد.",
        ".t-progress__bar"
      ]
    ],
    "props": [
      [
        "value",
        "number",
        "—",
        "۰ تا ۱۰۰. اگر ندهید، نامعین می‌شود."
      ],
      [
        "label",
        "string",
        "—",
        "نام کاری که پیش می‌رود؛ برای صفحه‌خوان لازم است."
      ]
    ],
    "a11y": [
      "<code>role=\"progressbar\"</code> با <code>aria-valuenow</code>، <code>aria-valuemin</code> و <code>aria-valuemax</code>.",
      "نوار نامعین <code>aria-valuenow</code> ندارد؛ نبودش یعنی «نمی‌دانیم».",
      "نام دسترس‌پذیر لازم است: <code>aria-label</code> یا <code>aria-labelledby</code> به متن کنارش.",
      "با <code>prefers-reduced-motion</code> انیمیشن نوار نامعین متوقف می‌شود."
    ],
    "responsive": "تمام‌عرض ظرفش. درصد را روی گوشی بالای نوار بگذارید نه کنارش، تا برای عددهای بلند جا کم نیاید.",
    "specimens": [
      {
        "label": "معین و نامعین",
        "canvas": "plain",
        "stageClass": "spec__stage--stack",
        "html": "<div style=\"inline-size:100%;max-inline-size:360px;display:flex;flex-direction:column;gap:18px\">\n  <div>\n    <div style=\"display:flex;justify-content:space-between;margin-block-end:6px\"><span class=\"t-body-sm\">بارگذاری تصاویر</span><span class=\"t-body-sm t-tone-secondary t-num\">۶۰٪</span></div>\n    <div class=\"t-progress\" role=\"progressbar\" aria-label=\"بارگذاری تصاویر\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\"><div class=\"t-progress__bar\" style=\"inline-size:60%\"></div></div>\n  </div>\n  <div>\n    <div class=\"t-body-sm\" style=\"margin-block-end:6px\">در حال پردازش</div>\n    <div class=\"t-progress t-progress--indeterminate\" role=\"progressbar\" aria-label=\"در حال پردازش\"><div class=\"t-progress__bar\"></div></div>\n  </div>\n</div>",
        "note": "نوار بالا عدد دارد، پس <code>aria-valuenow</code> هم دارد. نوار پایین ندارد."
      }
    ],
    "react": "export function ProgressBar({ value, label }) {\n  const indeterminate = value == null;\n  return (\n    <div className={clsx('t-progress', indeterminate && 't-progress--indeterminate')}\n         role=\"progressbar\" aria-label={label}\n         aria-valuenow={indeterminate ? undefined : value}\n         aria-valuemin={0} aria-valuemax={100}>\n      <div className=\"t-progress__bar\" style={indeterminate ? undefined : { inlineSize: `${value}%` }} />\n    </div>\n  );\n}"
  },
  {
    "name": "InlineMessage",
    "root": "t-inline-msg",
    "slug": "inline-message",
    "group": "Feedback",
    "status": "new",
    "legacy": [],
    "summary": "یک خط زیر فیلد: راهنما، خطا یا تأیید — همان‌جا که مشکل است.",
    "description": [
      "خطای فرم باید کنار همان فیلدی باشد که مشکل دارد. <a href=\"alert.html\">Alert</a> بالای فرم می‌گوید «چیزی درست نیست» و کاربر را می‌فرستد دنبال اینکه کجا؛ پیام درون‌خطی خودش جواب است.",
      "سه لحن دارد و هر سه ۱۲ پیکسل‌اند: خنثی برای راهنما، بحرانی برای خطا، مثبت برای تأییدی که ارزش گفتن دارد («این نام فروشگاه آزاد است»). رنگ تنها حامل معنا نیست؛ آیکون و متن هم هستند."
    ],
    "use": [
      "خطا را بعد از خروج از فیلد نشان دهید، نه هنگام تایپ اولین حرف.",
      "بگویید چه چیزی اشتباه است و چطور درست می‌شود: «شمارهٔ موبایل باید با ۰۹ شروع شود».",
      "فضای پیام را از اول رزرو کنید تا فرم هنگام ظاهر شدن خطا نپرد."
    ],
    "avoid": [
      "«ورودی نامعتبر». چیزی نمی‌گوید.",
      "پاک‌کردن مقدار فیلد هنگام خطا.",
      "خطای درون‌خطی و هشدار بالای فرم، هر دو برای یک مشکل."
    ],
    "anatomy": [
      [
        "ردیف",
        "آیکون ۱۲ پیکسلی و متن، با فاصلهٔ ۴ پیکسل.",
        ".t-inline-msg"
      ]
    ],
    "props": [
      [
        "tone",
        "'neutral' | 'critical' | 'positive'",
        "'neutral'",
        "لحن پیام."
      ],
      [
        "children",
        "ReactNode",
        "—",
        "متن پیام."
      ]
    ],
    "a11y": [
      "پیام با <code>aria-describedby</code> به فیلد وصل می‌شود تا صفحه‌خوان آن را با خود فیلد بخواند.",
      "فیلد خطادار <code>aria-invalid=\"true\"</code> می‌گیرد.",
      "پیام خطایی که بعد از ثبت ظاهر می‌شود، در ناحیهٔ <code>aria-live=\"polite\"</code> می‌نشیند.",
      "آیکون تزئینی است و <code>aria-hidden</code> می‌گیرد؛ معنا در متن است."
    ],
    "responsive": "تمام‌عرض فیلد، و اجازه دارد به خط دوم برود. متن خطا را برای جاشدن کوتاه نکنید.",
    "specimens": [
      {
        "label": "سه لحن",
        "canvas": "plain",
        "stageClass": "spec__stage--stack",
        "html": "<div style=\"display:flex;flex-direction:column;gap:10px\">\n  <span class=\"t-inline-msg\">شمارهٔ موبایل برای اطلاع‌رسانی سفارش استفاده می‌شود.</span>\n  <span class=\"t-inline-msg t-inline-msg--critical\"><svg class=\"t-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1V4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\"/></svg>شمارهٔ موبایل باید با ۰۹ شروع شود.</span>\n  <span class=\"t-inline-msg t-inline-msg--positive\"><svg class=\"t-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z\"/></svg>این نام فروشگاه آزاد است.</span>\n</div>",
        "note": "هر سه ۱۲ پیکسل‌اند. خطا و تأیید آیکون دارند، راهنما ندارد."
      }
    ],
    "react": "export function InlineMessage({ tone = 'neutral', children }) {\n  return (\n    <span className={clsx('t-inline-msg', tone !== 'neutral' && `t-inline-msg--${tone}`)}>\n      {tone === 'critical' && <WarningIcon className=\"t-icon\" width={12} height={12} aria-hidden=\"true\" />}\n      {tone === 'positive' && <CheckIcon className=\"t-icon\" width={12} height={12} aria-hidden=\"true\" />}\n      {children}\n    </span>\n  );\n}"
  }
];
