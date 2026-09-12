/* Component registry — inputs.
   The source of truth for each component's Farsi docs, specimens, props and
   React wrapper. Edit here; the site, MCP data and React package are built
   from it. Specimen HTML must use system classes only. */
export default [
  {
    "name": "SearchField",
    "slug": "search-field",
    "group": "Inputs",
    "status": "revised",
    "legacy": [
      "Search bar/Default",
      "Search bar/Typing",
      "Search bar/Searched",
      "Search bar"
    ],
    "summary": "ترب از جست‌وجو شروع می‌شود. سه حالت، یک کامپوننت.",
    "description": [
      "کیت اولیه <code>Default</code>، <code>Typing</code> و <code>Searched</code> را سه مستر جدای <span class=\"t-bidi\" dir=\"ltr\">۲۹۹×۴۸</span> فرستاده بود. اینها یک کامپوننت با یک <code>state</code> هستند و همان حالت تعیین می‌کند کدام ابزار انتهایی دیده شود.",
      "جست‌وجوی ترب دو ورودی دارد که بقیهٔ صنعت ندارند: <strong>صوت</strong> و <strong>دوربین</strong>. اینها در حالت خالی انتهای محور می‌نشینند و به‌محض وجود عبارت، جای خود را به دکمهٔ پاک‌کردن می‌دهند."
    ],
    "use": [
      "عبارت را پس از جست‌وجو نگه دارید تا کاربر بتواند اصلاح کند، نه اینکه دوباره تایپ کند.",
      "وقتی فیلد خالی است و فوکوس می‌گیرد، جست‌وجوهای اخیر را نشان دهید.",
      "پیشنهادها را حدود ۱۲۰ میلی‌ثانیه تعویق دهید؛ هرگز تایپ را پشت یک درخواست شبکه متوقف نکنید."
    ],
    "avoid": [
      "دکمهٔ ذره‌بین به‌عنوان تنها راه ثبت. کلید Enter باید کار کند.",
      "پاک‌کردن عبارت هنگام بازگشت به صفحهٔ قبل.",
      "متن راهنما به‌جای برچسب. دقیقاً وقتی ناپدید می‌شود که به آن نیاز است."
    ],
    "anatomy": [
      [
        "ظرف",
        "۴۸ پیکسل، گردی ۱۲، کادر ۱ پیکسلی کنترل. فوکوس یک هالهٔ ۳ پیکسلی اضافه می‌کند."
      ],
      [
        "ذره‌بین آغازین",
        "۲۰ پیکسل، رنگ ثانویه."
      ],
      [
        "ورودی",
        "۱۴ پیکسل. <code>text-align: start</code> — هرگز راست‌چین ثابت."
      ],
      [
        "ابزار انتهایی",
        "صوت و دوربین در حالت خالی؛ پاک‌کردن وقتی عبارتی هست."
      ]
    ],
    "props": [
      [
        "state",
        "'default' | 'typing' | 'searched'",
        "'default'",
        "تعیین می‌کند کدام ابزار انتهایی دیده شود."
      ],
      [
        "value",
        "string",
        "''",
        "عبارت کنترل‌شده."
      ],
      [
        "onClear",
        "() => void",
        "—",
        "وقتی حالت پیش‌فرض نیست اجباری است."
      ],
      [
        "tools",
        "('voice' | 'camera')[]",
        "['voice','camera']",
        "ورودی‌های مخصوص ترب."
      ]
    ],
    "a11y": [
      "<code>type=\"search\"</code> درون یک ناحیهٔ <code>role=\"search\"</code>.",
      "پیشنهادها از الگوی combobox پیروی می‌کنند: <code>aria-expanded</code>، <code>aria-controls</code>، <code>aria-activedescendant</code>.",
      "دکمهٔ پاک‌کردن برچسب صریح می‌خواهد («پاک کردن جست‌وجو»)؛ نشانهٔ ✕ به‌تنهایی نام نیست.",
      "تعداد نتایج را با <code>aria-live=\"polite\"</code> اعلام کنید، نه با هر ضربهٔ کلید."
    ],
    "responsive": "در هر اندازه تمام‌عرض ظرف خودش. در هدر چسبان، از نقطهٔ md سقف ۴۶۰ پیکسل می‌گیرد تا طول خط خوانا بماند.",
    "specimens": [
      {
        "label": "سه حالت",
        "stageClass": "spec__stage--stack spec__stage--center",
        "html": "<div class=\"t-search\" data-state=\"default\" role=\"search\" style=\"inline-size:100%;max-inline-size:343px\"><div class=\"t-input\"><svg class=\"t-input__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M15,14.3L10.7,10c1.9-2.3,1.6-5.8-0.7-7.7S4.2,0.7,2.3,3S0.7,8.8,3,10.7c2,1.7,5,1.7,7,0l4.3,4.3L15,14.3z M2,6.5\tC2,4,4,2,6.5,2S11,4,11,6.5S9,11,6.5,11S2,9,2,6.5z\"/></svg><input class=\"t-input__el\" type=\"search\" placeholder=\"جستجو در اطراف من\" aria-label=\"جستجو\"><span class=\"t-search__actions\"><button class=\"t-search__tool\" aria-label=\"جستجوی صوتی\"><svg class=\"t-icon\" width=\"20\" height=\"20\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M23,14v3A7,7,0,0,1,9,17V14H7v3a9,9,0,0,0,8,8.94V28H11v2H21V28H17V25.94A9,9,0,0,0,25,17V14Z\"/><path d=\"M16,22a5,5,0,0,0,5-5V7A5,5,0,0,0,11,7V17A5,5,0,0,0,16,22ZM13,7a3,3,0,0,1,6,0V17a3,3,0,0,1-6,0Z\"/></svg></button><button class=\"t-search__tool\" aria-label=\"جستجو با تصویر\"><svg class=\"t-icon\" width=\"16\" height=\"16\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M29,26H3a1,1,0,0,1-1-1V8A1,1,0,0,1,3,7H9.46l1.71-2.55A1,1,0,0,1,12,4h8a1,1,0,0,1,.83.45L22.54,7H29a1,1,0,0,1,1,1V25A1,1,0,0,1,29,26ZM4,24H28V9H22a1,1,0,0,1-.83-.45L19.46,6H12.54L10.83,8.55A1,1,0,0,1,10,9H4Z\"/><path d=\"M16,22a6,6,0,1,1,6-6A6,6,0,0,1,16,22Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,16,12Z\"/></svg></button></span></div></div>\n<div class=\"t-search\" data-state=\"typing\" role=\"search\" style=\"inline-size:100%;max-inline-size:343px\"><div class=\"t-input\"><input class=\"t-input__el\" type=\"search\" value=\"ادکلن کازاموراتی ۱۲۰ \" aria-label=\"جستجو\"><span class=\"t-search__actions\"><button class=\"t-search__clear\" aria-label=\"پاک کردن جستجو\"><svg class=\"t-icon\" width=\"20\" height=\"20\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z\"/></svg></button></span></div></div>\n<div class=\"t-search\" data-state=\"searched\" role=\"search\" style=\"inline-size:100%;max-inline-size:343px\"><div class=\"t-input\"><input class=\"t-input__el\" type=\"search\" value=\"ادکلن کازاموراتی ۱۲۰ میل\" aria-label=\"جستجو\"><span class=\"t-search__actions\"><button class=\"t-search__clear\" aria-label=\"پاک کردن جستجو\"><svg class=\"t-icon\" width=\"20\" height=\"20\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z\"/></svg></button></span></div></div>"
      }
    ],
    "react": "export function SearchField({ state = 'default', value, onChange, onClear, onVoice, onCamera, ...rest }) {\n  const idle = state === 'default';\n  return (\n    <div className=\"t-search\" data-state={state} role=\"search\">\n      <div className=\"t-input\">\n        {idle && <Search16 className=\"t-input__icon t-icon\" />}\n        <input className=\"t-input__el\" type=\"search\" value={value} onChange={onChange} aria-label=\"جستجو\" {...rest} />\n        <span className=\"t-search__actions\">\n          {idle ? <>\n            <button className=\"t-search__tool\" aria-label=\"جستجوی صوتی\" onClick={onVoice}><Microphone20 className=\"t-icon\" /></button>\n            <button className=\"t-search__tool\" aria-label=\"جستجو با تصویر\" onClick={onCamera}><Camera16 className=\"t-icon\" /></button>\n          </> : <button className=\"t-search__clear\" aria-label=\"پاک کردن جستجو\" onClick={onClear}><Close20 className=\"t-icon\" /></button>}\n        </span>\n      </div>\n    </div>\n  );\n}"
  },
  {
    "name": "TextField",
    "slug": "text-field",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "ورودی تک‌خطی با برچسب، راهنما و خطا.",
    "description": [
      "در کیت اولیه نبود؛ تنها ورودی متنی طراحی‌شده نوار جست‌وجو بود. هر فرمی که ترب می‌سازد به این نیاز دارد، پس اینجا تعریف می‌شود تا هر تیم دوباره اختراعش نکند."
    ],
    "use": [
      "همیشه برچسب دیده‌شونده رندر کنید. متن راهنما یک اشاره است، نه برچسب.",
      "خطا را زیر فیلد نشان دهید و <code>aria-describedby</code> بگذارید.",
      "اعتبارسنجی را روی blur انجام دهید، نه با هر ضربهٔ کلید؛ خطای وسط تایپ حس غر زدن دارد."
    ],
    "avoid": [
      "ظاهر خطا پیش از آنکه کاربر تمام کند.",
      "پاک‌کردن آنچه کاربر نوشته وقتی اعتبارسنجی شکست می‌خورد.",
      "برچسب فقط در متن راهنما."
    ],
    "anatomy": [
      [
        "برچسب",
        "۱۲ پیکسل Bold. فیلدهای اجباری ستارهٔ قرمز برند می‌گیرند."
      ],
      [
        "کنترل",
        "۴۸ پیکسل پیش‌فرض، ۴۰ در md، ۳۲ در sm."
      ],
      [
        "راهنما / خطا",
        "۱۲ پیکسل زیر کنترل. خطا جای راهنما را می‌گیرد و هرگز با آن روی هم انباشته نمی‌شود."
      ]
    ],
    "props": [
      [
        "size",
        "'sm' | 'md' | 'lg'",
        "'lg'",
        "۳۲ / ۴۰ / ۴۸ پیکسل."
      ],
      [
        "invalid",
        "boolean",
        "false",
        "کادر و هالهٔ بحرانی."
      ],
      [
        "hint / error",
        "string",
        "—",
        "خطا اولویت دارد."
      ],
      [
        "required",
        "boolean",
        "false",
        "ستاره و <code>aria-required</code> اضافه می‌کند."
      ]
    ],
    "a11y": [
      "برچسب یک <code>&lt;label for&gt;</code> واقعی است.",
      "خطاها <code>aria-invalid=\"true\"</code> به‌همراه <code>aria-describedby</code> می‌گیرند.",
      "هرگز فقط به کادر قرمز تکیه نکنید؛ رنگ برای همه یک کانال نیست.",
      "معیار ۳.۳.۷ نسخهٔ ۲.۲: اطلاعاتی را که کاربر در همان فرآیند وارد کرده دوباره نپرسید؛ آن را از پیش پر کنید یا امکان انتخاب بدهید."
    ],
    "responsive": "تمام‌عرض. دو فیلد فقط بالای ۷۶۸ پیکسل کنار هم می‌نشینند و زیر آن دوباره روی هم می‌روند.",
    "specimens": [
      {
        "label": "حالت‌ها",
        "stageClass": "spec__stage--stack",
        "html": "<div class=\"t-field\" style=\"max-inline-size:320px\">\n  <label class=\"t-field__label\" for=\"f1\">نام فروشگاه</label>\n  <div class=\"t-input\"><input class=\"t-input__el\" id=\"f1\" placeholder=\"مثلاً ادکلن شهر\"></div>\n  <span class=\"t-field__hint\">نامی که مشتریان می‌بینند.</span>\n</div>\n<div class=\"t-field\" style=\"max-inline-size:320px\">\n  <label class=\"t-field__label\" for=\"f2\">شماره تماس<span class=\"t-field__req\">*</span></label>\n  <div class=\"t-input\" data-invalid=\"true\"><input class=\"t-input__el\" id=\"f2\" value=\"۰۹۱۲۳۴\" aria-invalid=\"true\" aria-describedby=\"f2e\"></div>\n  <span class=\"t-field__error\" id=\"f2e\"><svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2\tc-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\"/><path d=\"M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8\tc0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z\" data-icon-path=\"inner-path\" opacity=\"0\"/></svg>شماره باید ۱۱ رقم باشد.</span>\n</div>\n<div class=\"t-field\" style=\"max-inline-size:320px\">\n  <label class=\"t-field__label\" for=\"f3\">کد فروشنده</label>\n  <div class=\"t-input\" data-disabled=\"true\"><input class=\"t-input__el\" id=\"f3\" value=\"TRB-۴۸۲۹\" disabled></div>\n</div>"
      }
    ],
    "react": "export function TextField({ label, hint, error, required, size = 'lg', id, ...rest }) {\n  const uid = useId(), fid = id ?? uid, msgId = fid + '-msg';\n  return (\n    <div className=\"t-field\">\n      <label className=\"t-field__label\" htmlFor={fid}>{label}{required && <span className=\"t-field__req\">*</span>}</label>\n      <div className={clsx('t-input', size !== 'lg' && `t-input--${size}`)} data-invalid={!!error || undefined}>\n        <input className=\"t-input__el\" id={fid} aria-invalid={!!error || undefined}\n               aria-describedby={(error || hint) ? msgId : undefined} aria-required={required} {...rest} />\n      </div>\n      {error ? <span className=\"t-field__error\" id={msgId}><WarningIcon />{error}</span>\n             : hint && <span className=\"t-field__hint\" id={msgId}>{hint}</span>}\n    </div>\n  );\n}"
  },
  {
    "name": "SegmentedControl",
    "slug": "segmented-control",
    "group": "Inputs",
    "status": "revised",
    "legacy": [
      "Switch/Left",
      "Switch/Right"
    ],
    "summary": "دو یا سه نمای هم‌وزن در یک ریل شیشه‌ای؛ مثل «فروشگاه‌ها ⇄ محصولات».",
    "description": [
      "در اسکچ نام این کنترل <code>Switch</code> است. در همهٔ سیستم‌های مرجع (Apple HIG، Material) این «Segmented control» است و «Switch» کلید روشن/خاموش. نام استاندارد شد و نام قدیمی کنارش ماند.",
      "گزینهٔ انتخاب‌شده خودِ دکمهٔ آبی کوچک است: ۲۸ پیکسل، گرادیان و لبهٔ داخلی. شست متحرکی زیر متن کشیده نمی‌شود، پس حالت انتخاب حتی در یک اسکرین‌شات هم خوانا است."
    ],
    "use": [
      "دو یا سه گزینه که هر کدام نمای دیگری از همان محتواست.",
      "روی نقشه یا عکس؛ ریل شیشه‌ای است و روی هر زمینه‌ای خوانا می‌ماند."
    ],
    "avoid": [
      "روشن/خاموش. برای آن <a href=\"./switch.html\">Switch</a> هست.",
      "بیش از سه گزینه. آنجا <a href=\"./choice-chip.html\">ChoiceChip</a> درست است."
    ],
    "anatomy": [
      [
        "ریل",
        "شیشهٔ «انتخاب‌شده»: پرشدگی ۶۰٪، تاری ۱۵، حلقهٔ ۰٫۵ پیکسلی Blue 300، گردی ۱۲، فاصلهٔ داخلی ۴."
      ],
      [
        "گزینه",
        "۲۸ پیکسل، Medium 12/20 با رنگ Sky 800. فاصلهٔ کناری ۴ پیکسل."
      ],
      [
        "گزینهٔ انتخاب‌شده",
        "دکمهٔ آبی کوچک: گرادیان، لبهٔ ۱ پیکسلی Blue 300، فاصلهٔ کناری ۸ پیکسل."
      ]
    ],
    "props": [
      [
        "options",
        "{ value, label }[]",
        "—",
        "دو یا سه گزینه."
      ],
      [
        "value",
        "string",
        "—",
        "کنترل‌شده."
      ],
      [
        "onChange",
        "(value) => void",
        "—",
        "اجباری."
      ],
      [
        "block",
        "boolean",
        "false",
        "تمام‌عرض؛ گزینه‌ها هم‌عرض می‌شوند."
      ]
    ],
    "a11y": [
      "<code>role=\"radiogroup\"</code> روی ریل و <code>role=\"radio\"</code> با <code>aria-checked</code> روی هر گزینه.",
      "کلیدهای جهت بین گزینه‌ها جابه‌جا می‌شوند؛ کل گروه یک توقف Tab است."
    ],
    "responsive": "عرض ذاتی. در موبایل با <code>t-segmented--block</code> تمام‌عرض می‌شود.",
    "specimens": [
      {
        "label": "فروشگاه‌ها / محصولات",
        "canvas": "map",
        "stageClass": "spec__stage--center",
        "html": "<div class=\"t-segmented\" role=\"radiogroup\" aria-label=\"نمایش\">\n  <button class=\"t-segmented__item\" role=\"radio\" aria-checked=\"true\">فروشگاه‌ها</button>\n  <button class=\"t-segmented__item\" role=\"radio\" aria-checked=\"false\">محصولات</button>\n</div>"
      },
      {
        "label": "تمام‌عرض، سه گزینه",
        "stageClass": "spec__stage--center",
        "html": "<div class=\"t-segmented t-segmented--block\" role=\"radiogroup\" aria-label=\"مرتب‌سازی\" style=\"max-inline-size:343px\">\n  <button class=\"t-segmented__item\" role=\"radio\" aria-checked=\"false\">نزدیک‌ترین</button>\n  <button class=\"t-segmented__item\" role=\"radio\" aria-checked=\"true\">ارزان‌ترین</button>\n  <button class=\"t-segmented__item\" role=\"radio\" aria-checked=\"false\">محبوب‌ترین</button>\n</div>"
      }
    ],
    "react": "export function SegmentedControl({ options, value, onChange, label, block = false }) {\n  const move = (e, i) => {\n    const d = { ArrowLeft: 1, ArrowRight: -1 }[e.key];   /* RTL: left is \"next\" */\n    if (!d) return;\n    e.preventDefault();\n    const n = options[(i + d + options.length) % options.length];\n    onChange(n.value);\n  };\n  return (\n    <div className={clsx('t-segmented', block && 't-segmented--block')} role=\"radiogroup\" aria-label={label}>\n      {options.map((o, i) => (\n        <button key={o.value} className=\"t-segmented__item\" role=\"radio\"\n                aria-checked={o.value === value} tabIndex={o.value === value ? 0 : -1}\n                onClick={() => onChange(o.value)} onKeyDown={e => move(e, i)}>\n          {o.label}\n        </button>\n      ))}\n    </div>\n  );\n}"
  },
  {
    "name": "Switch",
    "slug": "switch",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "کلید روشن/خاموش. بلافاصله اثر می‌گذارد، بدون دکمهٔ ذخیره.",
    "description": [
      "نام استاندارد کنترل بولی. کیت اسکچ چنین کنترلی نداشت؛ آنچه در اسکچ «Switch» نام دارد در واقع <a href=\"./segmented-control.html\">SegmentedControl</a> است.",
      "Switch یعنی تغییر همان لحظه اعمال می‌شود. اگر تنظیم به تأیید نیاز دارد، Checkbox درون فرم درست است."
    ],
    "use": [
      "تنظیماتی که فوراً اعمال می‌شوند — «فقط فروشگاه‌های باز».",
      "چیزی را که کنترل می‌شود برچسب بزنید، نه حالتش را. «اعلان‌ها»، نه «اعلان‌ها روشن»."
    ],
    "avoid": [
      "درون فرمی با دکمهٔ ذخیره — آنجا Checkbox درست است.",
      "برای تغییر مخرب بدون تأیید."
    ],
    "anatomy": [
      [
        "ریل",
        "<span class=\"t-bidi\" dir=\"ltr\">۴۴×۲۶</span>، گردی کامل. در حالت روشن رنگ آبی."
      ],
      [
        "شست",
        "۲۰ پیکسل، ارتفاع ۱، به سمت انتهای محور حرکت می‌کند."
      ]
    ],
    "props": [
      [
        "checked",
        "boolean",
        "false",
        "کنترل‌شده."
      ],
      [
        "onChange",
        "(v) => void",
        "—",
        "اجباری."
      ],
      [
        "label",
        "string",
        "—",
        "برچسب متنی دیده‌شونده."
      ]
    ],
    "a11y": [
      "یک <code>&lt;input type=\"checkbox\"&gt;</code> واقعی که پشت ریل پنهان شده؛ رفتار صفحه‌کلید و صفحه‌خوان رایگان به‌دست می‌آید.",
      "برچسب کلیک‌پذیر است و کنترل را در بر می‌گیرد."
    ],
    "responsive": "اندازهٔ ثابت در هر نقطهٔ شکست. ردیفی که در آن می‌نشیند کش می‌آید، نه خود کلید.",
    "specimens": [
      {
        "label": "کلید دوحالته",
        "stageClass": "spec__stage--stack",
        "html": "<label class=\"t-switch\"><input type=\"checkbox\" checked><span class=\"t-switch__track\"><span class=\"t-switch__thumb\"></span></span><span class=\"t-body-md\">فقط فروشگاه‌های باز</span></label>\n<label class=\"t-switch\"><input type=\"checkbox\"><span class=\"t-switch__track\"><span class=\"t-switch__thumb\"></span></span><span class=\"t-body-md\">ارسال فوری</span></label>\n<label class=\"t-switch\"><input type=\"checkbox\" disabled><span class=\"t-switch__track\"><span class=\"t-switch__thumb\"></span></span><span class=\"t-body-md t-tone-disabled\">پرداخت قسطی (در دسترس نیست)</span></label>"
      }
    ],
    "react": "export function Switch({ checked, onChange, label, disabled }) {\n  return (\n    <label className=\"t-switch\">\n      <input type=\"checkbox\" checked={checked} disabled={disabled}\n             onChange={e => onChange(e.target.checked)} />\n      <span className=\"t-switch__track\"><span className=\"t-switch__thumb\" /></span>\n      <span className=\"t-body-md\">{label}</span>\n    </label>\n  );\n}"
  },
  {
    "name": "RangeSlider",
    "slug": "range-slider",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "بازهٔ دو‌دسته. پرکاربردترین فیلتر ترب هیچ کنترلی نداشت.",
    "description": [
      "بازهٔ قیمت فیلتری است که خریدارها بیش از همه سراغش می‌روند و کیت هیچ چیزی برایش نداشت. قیمت‌ها با اعداد فارسی و ارقام جدولی قالب‌بندی می‌شوند تا دو سر بازه هنگام کشیدن خوانا بمانند."
    ],
    "use": [
      "همیشه با ورودی عددی جفت کنید؛ اسلایدر به‌تنهایی نمی‌تواند به قیمت دقیق برسد.",
      "به گام‌های معنادار بچسبید (۱۰۰٬۰۰۰ تومان)، نه به پیکسل خام.",
      "هنگام کشیدن، مقادیر زنده را بالای ریل نشان دهید."
    ],
    "avoid": [
      "اسلایدر به‌عنوان تنها راه تعیین مقدار.",
      "بازه‌های بیش از دو مرتبهٔ بزرگی روی مقیاس خطی؛ از مقیاس لگاریتمی استفاده کنید."
    ],
    "anatomy": [
      [
        "ریل",
        "۴ پیکسل، گردی کامل، زمینهٔ ملایم."
      ],
      [
        "پرشده",
        "آبی، بازهٔ انتخابی را می‌پوشاند."
      ],
      [
        "دسته‌ها",
        "۲۲ پیکسل، حلقهٔ آبی ۲ پیکسلی، ارتفاع ۱."
      ],
      [
        "مقادیر",
        "۱۲ پیکسل جدولی، در دو سر بازه."
      ]
    ],
    "props": [
      [
        "min / max",
        "number",
        "—",
        "کران‌ها."
      ],
      [
        "value",
        "[number, number]",
        "—",
        "کنترل‌شده."
      ],
      [
        "step",
        "number",
        "1",
        "گام چسبیدن."
      ],
      [
        "format",
        "(n) => string",
        "—",
        "قالب‌بند اعداد فارسی."
      ]
    ],
    "a11y": [
      "دو دستهٔ <code>role=\"slider\"</code>، هر کدام با <code>aria-valuemin/max/now</code> و <code>aria-valuetext</code> حاوی قیمت قالب‌بندی‌شده.",
      "کلیدهای جهت گام می‌زنند؛ Home و End به کران‌ها می‌پرند.",
      "دسته‌ها از هم رد نمی‌شوند؛ دستهٔ پایین روی دستهٔ بالا متوقف می‌شود.",
      "معیار ۲.۵.۷ نسخهٔ ۲.۲: کل بازه فقط با صفحه‌کلید یا با ورودی عددی جفت‌شده قابل تنظیم است؛ کشیدن هرگز تنها راه نیست."
    ],
    "responsive": "تمام‌عرض. زیر ۳۷۵ پیکسل برچسب مقادیر به زیر ریل می‌رود به‌جای دو طرف آن.",
    "specimens": [
      {
        "label": "بازهٔ قیمت",
        "canvas": "fog",
        "stageClass": "spec__stage--stack",
        "html": "<div class=\"t-range\" style=\"max-inline-size:320px\">\n  <div class=\"t-range__values\"><span>۱٬۲۰۰٬۰۰۰ تومان</span><span>۱۸٬۵۰۰٬۰۰۰ تومان</span></div>\n  <div class=\"t-range__track\">\n    <div class=\"t-range__fill\" style=\"inset-inline-start:14%;inline-size:58%\"></div>\n    <div class=\"t-range__thumb\" style=\"inset-inline-start:14%\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"30000000\" aria-valuenow=\"1200000\" aria-valuetext=\"۱٬۲۰۰٬۰۰۰ تومان\" tabindex=\"0\"></div>\n    <div class=\"t-range__thumb\" style=\"inset-inline-start:72%\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"30000000\" aria-valuenow=\"18500000\" aria-valuetext=\"۱۸٬۵۰۰٬۰۰۰ تومان\" tabindex=\"0\"></div>\n  </div>\n</div>"
      }
    ],
    "react": "export function RangeSlider({ min, max, value, onChange, step = 1, format = String }) {\n  const pct = v => ((v - min) / (max - min)) * 100;\n  return (\n    <div className=\"t-range\">\n      <div className=\"t-range__values\"><span>{format(value[0])}</span><span>{format(value[1])}</span></div>\n      <div className=\"t-range__track\">\n        <div className=\"t-range__fill\" style={{ insetInlineStart: pct(value[0]) + '%', inlineSize: (pct(value[1]) - pct(value[0])) + '%' }} />\n        {value.map((v, i) => (\n          <div key={i} className=\"t-range__thumb\" role=\"slider\" tabIndex={0}\n               style={{ insetInlineStart: pct(v) + '%' }}\n               aria-valuemin={min} aria-valuemax={max} aria-valuenow={v} aria-valuetext={format(v)}\n               onKeyDown={e => handleKey(e, i, v, { min, max, step, value, onChange })} />\n        ))}\n      </div>\n    </div>\n  );\n}"
  },
  {
    "name": "Checkbox",
    "slug": "checkbox",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "چندانتخابی درون یک فرم. با دکمهٔ ذخیره تأیید می‌شود.",
    "description": [
      "متمایز از Toggle: چک‌باکس بخشی از یک فرم است و وقتی فرم ثبت می‌شود اثر می‌گذارد. رادیو همان کامپوننت با <code>--radio</code> است."
    ],
    "use": [
      "برگهٔ فیلتر با دکمهٔ اعمال.",
      "پذیرش شرایط و هر فهرست چندانتخابی."
    ],
    "avoid": [
      "تنظیمات با اعمال فوری — آن کار Toggle است.",
      "یک چک‌باکس تنها، جایی که Toggle روشن‌تر است."
    ],
    "anatomy": [
      [
        "کادر",
        "۲۰ پیکسل، گردی ۴ (کامل برای رادیو). در حالت انتخاب پرشدهٔ آبی."
      ],
      [
        "برچسب",
        "کلیک‌پذیر، ۱۴ پیکسل، ارتفاع ردیف حداقل ۴۴ پیکسل."
      ]
    ],
    "props": [
      [
        "checked",
        "boolean",
        "false",
        "کنترل‌شده."
      ],
      [
        "indeterminate",
        "boolean",
        "false",
        "انتخاب جزئی در یک درخت."
      ],
      [
        "variant",
        "'checkbox' | 'radio'",
        "'checkbox'",
        ""
      ]
    ],
    "a11y": [
      "<code>&lt;input&gt;</code> واقعی، بصری پنهان، درون <code>&lt;label&gt;</code> خودش.",
      "گروه‌های رادیو یک <code>name</code> مشترک دارند و درون <code>&lt;fieldset&gt;</code> با <code>&lt;legend&gt;</code> می‌نشینند."
    ],
    "responsive": "ارتفاع ردیف در هیچ نقطهٔ شکستی زیر ۴۴ پیکسل نمی‌رود.",
    "specimens": [
      {
        "label": "چک‌باکس و رادیو",
        "stageClass": "spec__stage--stack",
        "html": "<label class=\"t-check\"><input type=\"checkbox\" checked><span class=\"t-check__box\"><svg class=\"t-check__mark\" width=\"12\" height=\"12\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z\"/></svg></span><span class=\"t-body-md\">ضمانت ترب</span></label>\n<label class=\"t-check\"><input type=\"checkbox\"><span class=\"t-check__box\"><svg class=\"t-check__mark\" width=\"12\" height=\"12\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z\"/></svg></span><span class=\"t-body-md\">نمایندگی رسمی</span></label>\n<label class=\"t-check t-check--radio\"><input type=\"radio\" name=\"sort\" checked><span class=\"t-check__box\"></span><span class=\"t-body-md\">ارزان‌ترین</span></label>\n<label class=\"t-check t-check--radio\"><input type=\"radio\" name=\"sort\"><span class=\"t-check__box\"></span><span class=\"t-body-md\">نزدیک‌ترین</span></label>"
      }
    ],
    "react": "export function Checkbox({ variant = 'checkbox', checked, onChange, label, ...rest }) {\n  return (\n    <label className={clsx('t-check', variant === 'radio' && 't-check--radio')}>\n      <input type={variant} checked={checked} onChange={e => onChange(e.target.checked)} {...rest} />\n      <span className=\"t-check__box\">{variant === 'checkbox' && <CheckMark className=\"t-check__mark\" />}</span>\n      <span className=\"t-body-md\">{label}</span>\n    </label>\n  );\n}"
  },
  {
    "name": "QuantityStepper",
    "slug": "quantity-stepper",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "افزایش و کاهش یک عدد صحیح کوچک.",
    "description": [
      "برای تعداد در سبد و هر شمارش کران‌دار. زیر حدود ۱۰، گام‌شمار از ورودی عددی بهتر است: بدون صفحه‌کلید، بدون اعتبارسنجی، بدون غلط تایپی."
    ],
    "use": [
      "تعداد سبد، تعداد مهمان، هر چیزی زیر حدود ۱۰.",
      "در کران پایین دکمهٔ منها را غیرفعال کنید، نه پنهان؛ کنترلی که ناپدید می‌شود چیدمان را جابه‌جا می‌کند."
    ],
    "avoid": [
      "اعداد بی‌کران. آنجا TextField درست است.",
      "پنهان‌کردن مقدار هنگام به‌روزرسانی."
    ],
    "anatomy": [
      [
        "دکمه‌ها",
        "<span class=\"t-bidi\" dir=\"ltr\">۳۶×۳۶</span>، در دو سر محور."
      ],
      [
        "مقدار",
        "حداقل ۴۴ پیکسل، جدولی، وسط‌چین."
      ]
    ],
    "props": [
      [
        "value",
        "number",
        "—",
        "کنترل‌شده."
      ],
      [
        "min / max",
        "number",
        "1 / 99",
        "کران‌ها؛ دکمه‌ها در هر کران غیرفعال می‌شوند."
      ],
      [
        "onChange",
        "(n) => void",
        "—",
        "اجباری."
      ]
    ],
    "a11y": [
      "دکمه‌ها برچسب صریح دارند («افزایش تعداد» / «کاهش تعداد»).",
      "مقدار <code>aria-live=\"polite\"</code> است تا عدد جدید یک بار اعلام شود، نه در هر رندر."
    ],
    "responsive": "اندازهٔ ثابت. هرگز زیر دکمهٔ ۳۶ پیکسلی کوچک نمی‌شود.",
    "specimens": [
      {
        "label": "گام‌شمار",
        "html": "<div class=\"t-stepper\">\n  <button class=\"t-stepper__btn\" aria-label=\"کاهش تعداد\"><svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8 15H24V17H8z\"/></svg></button>\n  <span class=\"t-stepper__value\" aria-live=\"polite\">۲</span>\n  <button class=\"t-stepper__btn\" aria-label=\"افزایش تعداد\"><svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17 15 17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z\"/></svg></button>\n</div>\n<div class=\"t-stepper\">\n  <button class=\"t-stepper__btn\" aria-label=\"کاهش تعداد\" disabled><svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8 15H24V17H8z\"/></svg></button>\n  <span class=\"t-stepper__value\" aria-live=\"polite\">۱</span>\n  <button class=\"t-stepper__btn\" aria-label=\"افزایش تعداد\"><svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17 15 17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z\"/></svg></button>\n</div>"
      }
    ],
    "react": "export function QuantityStepper({ value, onChange, min = 1, max = 99 }) {\n  return (\n    <div className=\"t-stepper\">\n      <button className=\"t-stepper__btn\" aria-label=\"کاهش تعداد\"\n              disabled={value <= min} onClick={() => onChange(value - 1)}><MinusIcon /></button>\n      <span className=\"t-stepper__value\" aria-live=\"polite\">{toFa(value)}</span>\n      <button className=\"t-stepper__btn\" aria-label=\"افزایش تعداد\"\n              disabled={value >= max} onClick={() => onChange(value + 1)}><PlusIcon /></button>\n    </div>\n  );\n}"
  }
];
