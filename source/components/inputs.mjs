/* Component registry — inputs.
   The source of truth for each component's Farsi docs, specimens, props and
   React wrapper. Edit here; the site, MCP data and React package are built
   from it. Specimen HTML must use system classes only. */
export default [
  {
    "name": "SearchField",
    "root": "t-search",
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
        "۴۸ پیکسل، گردی ۱۲، کادر ۱ پیکسلی کنترل. فوکوس یک هالهٔ ۳ پیکسلی اضافه می‌کند.",
        ":root"
      ],
      [
        "ذره‌بین آغازین",
        "۲۰ پیکسل، رنگ ثانویه.",
        ".t-input__icon"
      ],
      [
        "ورودی",
        "۱۴ پیکسل. <code>text-align: start</code> — هرگز راست‌چین ثابت.",
        ".t-input__el"
      ],
      [
        "ابزار انتهایی",
        "صوت و دوربین در حالت خالی؛ پاک‌کردن وقتی عبارتی هست.",
        ".t-search__actions"
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
    "root": "t-field",
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
        "۱۲ پیکسل Bold. فیلدهای اجباری ستارهٔ قرمز برند می‌گیرند.",
        ".t-field__label"
      ],
      [
        "کنترل",
        "۴۸ پیکسل پیش‌فرض، ۴۰ در md، ۳۲ در sm.",
        ".t-input"
      ],
      [
        "راهنما / خطا",
        "۱۲ پیکسل زیر کنترل. خطا جای راهنما را می‌گیرد و هرگز با آن روی هم انباشته نمی‌شود.",
        ".t-field__error"
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
    "root": "t-segmented",
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
        "شیشهٔ «انتخاب‌شده»: پرشدگی ۶۰٪، تاری ۱۵، حلقهٔ ۰٫۵ پیکسلی Blue 300، گردی ۱۲، فاصلهٔ داخلی ۴.",
        ":root"
      ],
      [
        "گزینه",
        "۲۸ پیکسل، Medium 12/20 با رنگ Sky 800. فاصلهٔ کناری ۴ پیکسل.",
        ".t-segmented__item"
      ],
      [
        "گزینهٔ انتخاب‌شده",
        "دکمهٔ آبی کوچک: گرادیان، لبهٔ ۱ پیکسلی Blue 300، فاصلهٔ کناری ۸ پیکسل.",
        ".t-segmented__item[aria-checked=\"true\"]"
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
    "root": "t-switch",
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
        "<span class=\"t-bidi\" dir=\"ltr\">۴۴×۲۶</span>، گردی کامل. در حالت روشن رنگ آبی.",
        ".t-switch__track"
      ],
      [
        "شست",
        "۲۰ پیکسل، ارتفاع ۱، به سمت انتهای محور حرکت می‌کند.",
        ".t-switch__thumb"
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
    "root": "t-range",
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
        "۴ پیکسل، گردی کامل، زمینهٔ ملایم.",
        ".t-range__track"
      ],
      [
        "پرشده",
        "آبی، بازهٔ انتخابی را می‌پوشاند.",
        ".t-range__fill"
      ],
      [
        "دسته‌ها",
        "۲۲ پیکسل، حلقهٔ آبی ۲ پیکسلی، ارتفاع ۱.",
        ".t-range__thumb"
      ],
      [
        "مقادیر",
        "۱۲ پیکسل جدولی، در دو سر بازه.",
        ".t-range__values"
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
        "html": "<div class=\"t-range\" style=\"max-inline-size:320px\">\n  <div class=\"t-range__values\"><span>۱٬۲۰۰٬۰۰۰ تومان</span><span>۱۸٬۵۰۰٬۰۰۰ تومان</span></div>\n  <div class=\"t-range__track\">\n    <div class=\"t-range__fill\" style=\"inset-inline-start:14%;inline-size:58%\"></div>\n    <div class=\"t-range__thumb\" style=\"inset-inline-start:14%\" role=\"slider\" aria-label=\"کمترین قیمت\" aria-valuemin=\"0\" aria-valuemax=\"30000000\" aria-valuenow=\"1200000\" aria-valuetext=\"۱٬۲۰۰٬۰۰۰ تومان\" tabindex=\"0\"></div>\n    <div class=\"t-range__thumb\" style=\"inset-inline-start:72%\" role=\"slider\" aria-label=\"بیشترین قیمت\" aria-valuemin=\"0\" aria-valuemax=\"30000000\" aria-valuenow=\"18500000\" aria-valuetext=\"۱۸٬۵۰۰٬۰۰۰ تومان\" tabindex=\"0\"></div>\n  </div>\n</div>"
      }
    ],
    "react": "export function RangeSlider({ min, max, value, onChange, step = 1, format = String }) {\n  const pct = v => ((v - min) / (max - min)) * 100;\n  return (\n    <div className=\"t-range\">\n      <div className=\"t-range__values\"><span>{format(value[0])}</span><span>{format(value[1])}</span></div>\n      <div className=\"t-range__track\">\n        <div className=\"t-range__fill\" style={{ insetInlineStart: pct(value[0]) + '%', inlineSize: (pct(value[1]) - pct(value[0])) + '%' }} />\n        {value.map((v, i) => (\n          <div key={i} className=\"t-range__thumb\" role=\"slider\" aria-label=\"بیشترین قیمت\" tabIndex={0}\n               style={{ insetInlineStart: pct(v) + '%' }}\n               aria-valuemin={min} aria-valuemax={max} aria-valuenow={v} aria-valuetext={format(v)}\n               onKeyDown={e => handleKey(e, i, v, { min, max, step, value, onChange })} />\n        ))}\n      </div>\n    </div>\n  );\n}"
  },
  {
    "name": "Checkbox",
    "root": "t-check",
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
        "۲۰ پیکسل، گردی ۴ (کامل برای رادیو). در حالت انتخاب پرشدهٔ آبی.",
        ".t-check__box"
      ],
      [
        "برچسب",
        "کلیک‌پذیر، ۱۴ پیکسل، ارتفاع ردیف حداقل ۴۴ پیکسل.",
        ".t-body-md"
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
    "root": "t-stepper",
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
        "<span class=\"t-bidi\" dir=\"ltr\">۳۶×۳۶</span>، در دو سر محور.",
        ".t-stepper__btn"
      ],
      [
        "مقدار",
        "حداقل ۴۴ پیکسل، جدولی، وسط‌چین.",
        ".t-stepper__value"
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
  },
  {
    "name": "Select",
    "root": "t-select",
    "slug": "select",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "یک انتخاب از فهرستی که ارزش باز کردن یک برگه را ندارد.",
    "description": [
      "این کامپوننت یک <code>&lt;select&gt;</code> واقعی است با ظاهر سیستم. دلیلش ساده است: روی اندروید و آی‌اواس، انتخابگر بومی چرخ لمسی خودش را می‌آورد، با صفحه‌کلید سخت‌افزاری کار می‌کند، و صفحه‌خوان بدون هیچ کد اضافه‌ای درست می‌خواندش. هر جایگزین ساخته‌شده با <code>div</code> باید همهٔ اینها را از نو بنویسد و معمولاً نصفه می‌ماند.",
      "اگر گزینه‌ها بیش از حدود ده تا شدند، یا هر گزینه به توضیح، آیکون یا قیمت نیاز داشت، این کامپوننت جواب نیست: <a href=\"bottom-sheet.html\">BottomSheet</a> با فهرست بگذارید. اگر گزینه‌ها دو یا سه تای کوتاه‌اند، <a href=\"segmented-control.html\">SegmentedControl</a> سریع‌تر است چون همه‌شان هم‌زمان دیده می‌شوند."
    ],
    "use": [
      "برای فهرست‌های بسته و آشنا: استان، مرتب‌سازی، تعداد در صفحه.",
      "گزینهٔ پیش‌فرض را همان چیزی بگذارید که بیشتر کاربران می‌خواهند، نه «انتخاب کنید».",
      "برچسب را بیرون از کنترل نگه دارید؛ <code>&lt;option&gt;</code> اول به‌جای برچسب، هنگام انتخاب ناپدید می‌شود."
    ],
    "avoid": [
      "بازنویسی انتخابگر با <code>div</code> فقط برای شکل شورون.",
      "فهرست بلند بدون جست‌وجو. بالای ده گزینه، برگهٔ پایینی با جست‌وجو بگذارید.",
      "گروه‌بندی با خط تیره در متن گزینه؛ <code>&lt;optgroup&gt;</code> برای همین هست."
    ],
    "anatomy": [
      [
        "ظرف",
        "فقط جایگاه نسبی می‌سازد تا شورون روی کنترل بنشیند.",
        ".t-select"
      ],
      [
        "کنترل",
        "همان <code>.t-input</code> بقیهٔ فرم‌ها، پس ارتفاع و کادر و فوکوس یکی است.",
        ".t-input"
      ],
      [
        "شورون",
        "۱۶ پیکسل، ثانویه، بدون رویداد اشاره‌گر تا کلیک به خود کنترل برسد.",
        ".t-select__chevron"
      ]
    ],
    "props": [
      [
        "value / onChange",
        "string",
        "—",
        "کنترل‌شده، مثل هر ورودی دیگر."
      ],
      [
        "options",
        "{ value, label }[]",
        "—",
        "گزینه‌ها؛ گروه‌بندی با <code>group</code> اختیاری است."
      ],
      [
        "size",
        "'sm' | 'md' | 'lg'",
        "'lg'",
        "همان مقیاس <code>.t-input</code>."
      ],
      [
        "invalid",
        "boolean",
        "false",
        "کادر بحرانی و <code>aria-invalid</code>."
      ]
    ],
    "a11y": [
      "یک <code>&lt;select&gt;</code> بومی است، پس نقش، وضعیت و پیمایش با صفحه‌کلید رایگان به‌دست می‌آید.",
      "برچسب با <code>&lt;label for&gt;</code> به کنترل وصل می‌شود؛ <code>placeholder</code> در انتخابگر وجود ندارد.",
      "شورون تزئینی است: <code>aria-hidden</code> و <code>pointer-events: none</code>.",
      "خطا را با <code>aria-describedby</code> به پیام زیر فیلد وصل کنید، نه فقط با رنگ کادر."
    ],
    "responsive": "در همهٔ اندازه‌ها یکی است. روی گوشی، سیستم‌عامل خودش فهرست را تمام‌عرض باز می‌کند؛ همین یکی از دلایل استفاده از کنترل بومی است.",
    "specimens": [
      {
        "label": "انتخابگر",
        "canvas": "plain",
        "stageClass": "spec__stage--center",
        "html": "<div class=\"t-field\" style=\"max-inline-size:280px\">\n  <label class=\"t-field__label\" for=\"s1\">استان</label>\n  <div class=\"t-select\">\n    <div class=\"t-input t-input--md\">\n      <select class=\"t-input__el\" id=\"s1\">\n        <option>تهران</option>\n        <option>اصفهان</option>\n        <option>خراسان رضوی</option>\n        <option>فارس</option>\n      </select>\n    </div>\n    <svg class=\"t-icon t-icon--sm t-select__chevron\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8 11 3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z\"/></svg>\n  </div>\n</div>",
        "note": "کنترل بومی است؛ روی گوشی همان انتخابگر سیستم‌عامل باز می‌شود."
      }
    ],
    "react": "export function Select({ value, onChange, options, size = 'lg', invalid, ...rest }) {\n  return (\n    <div className=\"t-select\">\n      <div className={clsx('t-input', size !== 'lg' && `t-input--${size}`)}\n           data-invalid={invalid || undefined}>\n        <select className=\"t-input__el\" value={value} aria-invalid={invalid || undefined}\n                onChange={e => onChange(e.target.value)} {...rest}>\n          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}\n        </select>\n      </div>\n      <ChevronDown className=\"t-icon t-icon--sm t-select__chevron\" aria-hidden=\"true\" />\n    </div>\n  );\n}"
  },
  {
    "name": "Radio",
    "root": "t-check",
    "slug": "radio",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "یکی از چند گزینه، وقتی همه باید هم‌زمان دیده شوند.",
    "description": [
      "رادیو و <a href=\"checkbox.html\">Checkbox</a> یک کلاس مشترک دارند و فقط در دو چیز فرق می‌کنند: شکل (دایره به‌جای مربع) و معنا (یکی از چند، به‌جای هر تعداد). چون همه‌چیز دیگرشان یکی است — اندازهٔ کادر، فاصلهٔ برچسب، ناحیهٔ لمس ۴۴ پیکسلی، حلقهٔ فوکوس — در سیستم هم یک کامپوننت با یک گونه‌اند، نه دو پیاده‌سازی موازی که با هم از رده خارج می‌شوند.",
      "انتخاب بین رادیو و بقیه ساده است: <strong>دو تا سه گزینهٔ کوتاه</strong> که با هم مقایسه می‌شوند، <a href=\"segmented-control.html\">SegmentedControl</a> است. <strong>چهار تا حدود هفت گزینه</strong> رادیو است. <strong>بیشتر از آن</strong> انتخابگر یا برگهٔ پایینی است."
    ],
    "use": [
      "همیشه یکی را از پیش انتخاب کنید. گروه رادیوی خالی یعنی کاربر باید حدس بزند پیش‌فرض چیست.",
      "گروه را در <code>fieldset</code> با <code>legend</code> بگذارید تا صفحه‌خوان بداند این گزینه‌ها یک سؤال‌اند.",
      "برچسب‌ها را هم‌طول و هم‌ساختار بنویسید؛ مقایسه با چشم انجام می‌شود."
    ],
    "avoid": [
      "رادیو برای چیزی که می‌شود خاموش کرد. آن <a href=\"switch.html\">Switch</a> است.",
      "گروه رادیو با یک گزینه.",
      "اجرای کنش بلافاصله بعد از انتخاب، مگر اینکه برگشتش برای کاربر آسان باشد."
    ],
    "anatomy": [
      [
        "دایره",
        "۲۰ پیکسل، کادر ۱ پیکسلی؛ در حالت انتخاب کادر به ۶ پیکسل آبی ضخیم می‌شود و مرکز سفید می‌ماند.",
        ".t-check__box"
      ],
      [
        "برچسب",
        "۱۴ پیکسل، کل ردیف قابل کلیک است چون همه‌چیز داخل <code>&lt;label&gt;</code> است.",
        ".t-body-md"
      ]
    ],
    "props": [
      [
        "name",
        "string",
        "—",
        "گزینه‌های یک گروه باید نام یکسان داشته باشند."
      ],
      [
        "checked / onChange",
        "boolean",
        "—",
        "کنترل‌شده."
      ],
      [
        "disabled",
        "boolean",
        "false",
        "دایره خاکستری می‌شود و برچسب کم‌رنگ."
      ]
    ],
    "a11y": [
      "<code>&lt;input type=\"radio\"&gt;</code> واقعی، پس کلیدهای جهت بین گزینه‌های هم‌نام حرکت می‌کنند و Tab از کل گروه رد می‌شود.",
      "ورودی پنهان است اما حذف نشده؛ حلقهٔ فوکوس روی دایره کشیده می‌شود.",
      "گروه <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> می‌گیرد، وگرنه صفحه‌خوان هر گزینه را جدا می‌خواند.",
      "کل ردیف هدف لمس است و دست‌کم ۴۴ پیکسل ارتفاع دارد."
    ],
    "responsive": "روی گوشی هر گزینه یک ردیف کامل است. فهرست افقی نکنید؛ در راست‌چین ترتیب خواندن را می‌شکند و هدف‌ها را کوچک می‌کند.",
    "specimens": [
      {
        "label": "گروه رادیو",
        "canvas": "plain",
        "stageClass": "spec__stage--center",
        "html": "<fieldset style=\"border:0;padding:0;margin:0;display:flex;flex-direction:column;gap:4px\">\n  <legend class=\"t-field__label\" style=\"margin-block-end:6px\">مرتب‌سازی</legend>\n  <label class=\"t-check t-check--radio\"><input type=\"radio\" name=\"sort\" checked><span class=\"t-check__box\"></span><span class=\"t-body-md\">مرتبط‌ترین</span></label>\n  <label class=\"t-check t-check--radio\"><input type=\"radio\" name=\"sort\"><span class=\"t-check__box\"></span><span class=\"t-body-md\">ارزان‌ترین</span></label>\n  <label class=\"t-check t-check--radio\"><input type=\"radio\" name=\"sort\"><span class=\"t-check__box\"></span><span class=\"t-body-md\">نزدیک‌ترین</span></label>\n</fieldset>",
        "note": "یکی همیشه از پیش انتخاب است. کلیدهای جهت بین گزینه‌ها حرکت می‌کنند."
      }
    ],
    "react": "export function RadioGroup({ name, value, onChange, options, legend }) {\n  return (\n    <fieldset className=\"t-fieldset\">\n      <legend className=\"t-field__label\">{legend}</legend>\n      {options.map(o => (\n        <label key={o.value} className=\"t-check t-check--radio\">\n          <input type=\"radio\" name={name} value={o.value}\n                 checked={value === o.value} onChange={() => onChange(o.value)} />\n          <span className=\"t-check__box\" />\n          <span className=\"t-body-md\">{o.label}</span>\n        </label>\n      ))}\n    </fieldset>\n  );\n}"
  },
  {
    "name": "Textarea",
    "root": "t-input",
    "slug": "textarea",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "متن چندخطی: نقد کاربر، توضیح محصول، پاسخ فروشنده.",
    "description": [
      "همان کنترل <a href=\"text-field.html\">TextField</a> با ارتفاع آزاد. ارتفاع اولیه پنج خط است و کاربر می‌تواند فقط عمودی بزرگش کند؛ تغییر عرض، چیدمان فرم را می‌شکند.",
      "در فارسی طول متن حدس‌ناپذیرتر از انگلیسی است، چون نه خلاصه‌نویسی رایج است و نه شکستن کلمه ممکن. پس به‌جای محدودکردن کاراکتر، ارتفاع را باز بگذارید و شمارنده را فقط وقتی نشان دهید که سقف واقعی وجود دارد."
    ],
    "use": [
      "برای متنی که ممکن است بیش از یک خط شود؛ زیر آن، نه.",
      "اگر سقف کاراکتر دارید، شمارنده را از ۸۰ درصد به بعد نشان دهید، نه از صفر.",
      "ورودی کاربر را هنگام خطای شبکه نگه دارید. دوباره تایپ‌کردن یک نقد، کاربر را برای همیشه می‌برد."
    ],
    "avoid": [
      "تغییر اندازه در هر دو محور.",
      "ارتفاع یک‌خطی که با تایپ بزرگ می‌شود و صفحه را می‌پراند.",
      "سقف کاراکتر بدون نمایش آن."
    ],
    "anatomy": [
      [
        "ظرف",
        "<code>--textarea</code> ارتفاع ثابت را برمی‌دارد و محتوا را به بالا می‌چسباند.",
        ".t-input"
      ],
      [
        "ناحیهٔ متن",
        "کمینه پنج خط، تغییر اندازه فقط عمودی.",
        ".t-input__el"
      ]
    ],
    "props": [
      [
        "rows",
        "number",
        "5",
        "ارتفاع اولیه بر حسب خط."
      ],
      [
        "maxLength",
        "number",
        "—",
        "وقتی هست، شمارنده هم نشان داده می‌شود."
      ],
      [
        "invalid",
        "boolean",
        "false",
        "کادر بحرانی و <code>aria-invalid</code>."
      ]
    ],
    "a11y": [
      "<code>&lt;textarea&gt;</code> واقعی با <code>&lt;label for&gt;</code>.",
      "شمارندهٔ کاراکتر <code>aria-live=\"polite\"</code> می‌گیرد اما فقط نزدیک سقف اعلام می‌کند، وگرنه هر کلید یک اعلام می‌شود.",
      "پیام خطا با <code>aria-describedby</code> وصل می‌شود.",
      "هرگز Enter را برای ثبت فرم نگیرید؛ در متن چندخطی، Enter یعنی خط جدید."
    ],
    "responsive": "تمام‌عرض ظرفش در همهٔ اندازه‌ها. روی گوشی ارتفاع اولیه را کوتاه‌تر بگیرید (سه خط) تا دکمهٔ ثبت زیر صفحه نرود.",
    "specimens": [
      {
        "label": "نقد کاربر",
        "canvas": "plain",
        "stageClass": "spec__stage--center",
        "html": "<div class=\"t-field\" style=\"max-inline-size:380px\">\n  <label class=\"t-field__label\" for=\"ta1\">نقد شما</label>\n  <div class=\"t-input t-input--textarea\">\n    <textarea class=\"t-input__el\" id=\"ta1\" rows=\"5\" placeholder=\"تجربه‌تان از این فروشگاه چطور بود؟\"></textarea>\n  </div>\n  <span class=\"t-field__hint\">دست‌کم ۲۰ کاراکتر</span>\n</div>",
        "note": "فقط عمودی بزرگ می‌شود. تغییر عرض، چیدمان فرم را می‌شکند."
      }
    ],
    "react": "export function Textarea({ value, onChange, rows = 5, maxLength, invalid, hint, label, id }) {\n  const near = maxLength && value.length > maxLength * 0.8;\n  return (\n    <div className=\"t-field\">\n      <label className=\"t-field__label\" htmlFor={id}>{label}</label>\n      <div className=\"t-input t-input--textarea\" data-invalid={invalid || undefined}>\n        <textarea className=\"t-input__el\" id={id} rows={rows} value={value}\n                  maxLength={maxLength} aria-invalid={invalid || undefined}\n                  onChange={e => onChange(e.target.value)} />\n      </div>\n      {hint && <span className=\"t-field__hint\">{hint}</span>}\n      {near && <span className=\"t-field__hint\" aria-live=\"polite\">{toFa(maxLength - value.length)} کاراکتر مانده</span>}\n    </div>\n  );\n}"
  },
  {
    "name": "OTP",
    "root": "t-otp",
    "slug": "otp",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "کد پیامکی. اولین کنترلی که هر کاربر ایرانی لمس می‌کند.",
    "description": [
      "ورود به ترب با رمز نیست، با کد پیامکی است. یعنی این کنترل، پیش از هر دکمه و هر کارتی، اولین چیزی است که کاربر تازه با آن روبه‌رو می‌شود — و هر ثانیه‌ای که اینجا از دست برود، پیش از دیدن محصول از دست رفته است.",
      "سه تصمیم این کامپوننت را می‌سازد. <strong>ارقام لاتین</strong>، چون کد در پیامک لاتین می‌آید و تبدیلش کار اضافه است. <strong>جهت چپ‌به‌راست</strong> برای خود کنترل، چون کد یک عدد است نه یک جمله. و <strong>چسباندن کل کد در هر خانه</strong>، چون کاربر کد را از نوار اعلان کپی می‌کند و انتظار دارد پخش شود.",
      "روی موبایل <code>autocomplete=\"one-time-code\"</code> اجازه می‌دهد سیستم‌عامل خودش کد را پیشنهاد بدهد. این یک خط کد است و تفاوتش در نرخ تکمیل، بیشتر از هر تغییر بصری در این صفحه."
    ],
    "use": [
      "<code>inputmode=\"numeric\"</code> بگذارید تا صفحه‌کلید عددی باز شود.",
      "بعد از پرشدن آخرین خانه خودکار ثبت کنید؛ دکمهٔ «تأیید» فقط برای تلاش دوباره بماند.",
      "شمارش معکوس ارسال دوباره را همیشه نشان دهید، حتی وقتی صفر است."
    ],
    "avoid": [
      "ارقام فارسی در خانه‌ها. کد لاتین می‌آید.",
      "پاک‌کردن همهٔ خانه‌ها هنگام خطا؛ کاربر معمولاً یک رقم را اشتباه زده.",
      "قفل‌کردن فیلد هنگام انتظار برای پاسخ سرور بدون هیچ نشانه‌ای."
    ],
    "anatomy": [
      [
        "ردیف",
        "چپ‌به‌راست، فاصلهٔ ۸ پیکسل؛ زیر ۳۸۰ پیکسل خانه‌ها کوچک‌تر می‌شوند.",
        ".t-otp"
      ],
      [
        "خانه",
        "۴۸×۵۶، ارقام جدولی ۲۴ پیکسلی Bold؛ خانهٔ پرشده کادر پررنگ‌تر می‌گیرد.",
        ".t-otp__slot"
      ]
    ],
    "props": [
      [
        "length",
        "number",
        "5",
        "تعداد رقم‌ها."
      ],
      [
        "value / onChange",
        "string",
        "—",
        "کنترل‌شده؛ فقط رقم می‌پذیرد."
      ],
      [
        "onComplete",
        "(code) => void",
        "—",
        "وقتی آخرین رقم پر شد."
      ],
      [
        "invalid",
        "boolean",
        "false",
        "کادر بحرانی روی همهٔ خانه‌ها."
      ]
    ],
    "a11y": [
      "خانه‌ها در یک <code>&lt;fieldset&gt;</code> با <code>&lt;legend&gt;</code> می‌نشینند: «کد پنج‌رقمی پیامک‌شده».",
      "هر خانه برچسب خودش را دارد («رقم ۱ از ۵»)، وگرنه صفحه‌خوان پنج فیلد بی‌نام می‌خواند.",
      "Backspace روی خانهٔ خالی، فوکوس را به خانهٔ قبلی می‌برد.",
      "خطا در ناحیهٔ <code>aria-live=\"assertive\"</code> اعلام می‌شود؛ اینجا استثنای «فقط برای بحرانی» است، چون کاربر منتظر همین جواب است.",
      "<code>autocomplete=\"one-time-code\"</code> روی خانهٔ اول."
    ],
    "responsive": "زیر ۳۸۰ پیکسل خانه‌ها به ۴۰×۴۸ و فاصله به ۴ پیکسل می‌رسند تا پنج رقم در باریک‌ترین گوشی هم بدون اسکرول جا شوند.",
    "specimens": [
      {
        "label": "کد پنج‌رقمی",
        "canvas": "plain",
        "stageClass": "spec__stage--center",
        "html": "<fieldset style=\"border:0;padding:0;margin:0\">\n  <legend class=\"t-field__label\" style=\"margin-block-end:10px\">کد پنج‌رقمی پیامک‌شده</legend>\n  <div class=\"t-otp\">\n    <input class=\"t-otp__slot\" data-filled=\"true\" inputmode=\"numeric\" maxlength=\"1\" value=\"4\" aria-label=\"رقم ۱ از ۵\" autocomplete=\"one-time-code\">\n    <input class=\"t-otp__slot\" data-filled=\"true\" inputmode=\"numeric\" maxlength=\"1\" value=\"8\" aria-label=\"رقم ۲ از ۵\">\n    <input class=\"t-otp__slot\" data-filled=\"true\" inputmode=\"numeric\" maxlength=\"1\" value=\"1\" aria-label=\"رقم ۳ از ۵\">\n    <input class=\"t-otp__slot\" inputmode=\"numeric\" maxlength=\"1\" aria-label=\"رقم ۴ از ۵\">\n    <input class=\"t-otp__slot\" inputmode=\"numeric\" maxlength=\"1\" aria-label=\"رقم ۵ از ۵\">\n  </div>\n  <div class=\"t-inline-msg\" style=\"margin-block-start:10px\">ارسال دوباره تا <span class=\"t-bidi t-num\" dir=\"ltr\">۰۰:۴۲</span></div>\n</fieldset>",
        "note": "ارقام لاتین‌اند چون کد در پیامک لاتین می‌آید. شمارش معکوس فارسی است."
      }
    ],
    "react": "export function OTP({ length = 5, value, onChange, onComplete, invalid }) {\n  const refs = useRef([]);\n  const set = (i, ch) => {\n    const next = (value.padEnd(length).slice(0, i) + ch + value.slice(i + 1)).trim();\n    onChange(next);\n    if (ch && i < length - 1) refs.current[i + 1]?.focus();\n    if (next.length === length) onComplete?.(next);\n  };\n  return (\n    <fieldset className=\"t-fieldset\">\n      <legend className=\"t-field__label\">{`کد ${toFa(length)}‌رقمی پیامک‌شده`}</legend>\n      <div className={clsx('t-otp', invalid && 't-otp--error')}>\n        {Array.from({ length }, (_, i) => (\n          <input key={i} ref={el => (refs.current[i] = el)} className=\"t-otp__slot\"\n                 inputMode=\"numeric\" maxLength={1} value={value[i] ?? ''}\n                 data-filled={value[i] ? true : undefined}\n                 aria-label={`رقم ${toFa(i + 1)} از ${toFa(length)}`}\n                 autoComplete={i === 0 ? 'one-time-code' : undefined}\n                 onChange={e => set(i, e.target.value.replace(/\\D/g, ''))}\n                 onKeyDown={e => {\n                   if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();\n                 }}\n                 onPaste={e => {\n                   e.preventDefault();\n                   const code = e.clipboardData.getData('text').replace(/\\D/g, '').slice(0, length);\n                   onChange(code);\n                   if (code.length === length) onComplete?.(code);\n                 }} />\n        ))}\n      </div>\n    </fieldset>\n  );\n}"
  },
  {
    "name": "FileUpload",
    "root": "t-upload",
    "slug": "file-upload",
    "group": "Inputs",
    "status": "new",
    "legacy": [],
    "summary": "عکس محصول و مدارک فروشگاه. از دوربین گوشی یا از پوشهٔ دسکتاپ.",
    "description": [
      "فروشنده عکس محصول را معمولاً همان لحظه با گوشی می‌گیرد، و مدارک فروشگاه را پشت میز از پوشه می‌کشد. یک کنترل باید هر دو را بگیرد: یک <code>&lt;input type=\"file\"&gt;</code> واقعی که روی گوشی دوربین را باز می‌کند و روی دسکتاپ ناحیهٔ رهاکردن هم هست.",
      "ناحیهٔ رهاکردن تنها راه نیست و نباید باشد: کشیدن و رهاکردن روی لمس وجود ندارد و با صفحه‌کلید هم ممکن نیست. کل ناحیه یک برچسب است، پس کلیک و Enter هم همان کار را می‌کنند.",
      "فهرست فایل‌های اضافه‌شده <strong>زیر</strong> ناحیه می‌آید، نه داخلش. ناحیه‌ای که با هر فایل بلندتر می‌شود، دکمهٔ ثبت را از صفحه بیرون می‌برد."
    ],
    "use": [
      "سقف حجم و قالب‌های مجاز را پیش از انتخاب بنویسید، نه در پیام خطا.",
      "پیش‌نمایش تصویر را بلافاصله نشان دهید؛ منتظر آپلود نمانید.",
      "هر فایل را جدا قابل حذف کنید."
    ],
    "avoid": [
      "فقط کشیدن و رهاکردن.",
      "«فایل نامعتبر» بدون گفتن اینکه چه چیزی مجاز است.",
      "آپلود بی‌صدا بدون نوار پیشرفت برای فایل‌های بزرگ."
    ],
    "anatomy": [
      [
        "ناحیه",
        "کمینه ۱۳۲ پیکسل، کادر خط‌چین؛ در حالت کشیدن، کادر توپر و زمینهٔ آبی ملایم می‌شود.",
        ".t-upload"
      ],
      [
        "عنوان",
        "کنش را نام می‌برد: «انتخاب عکس».",
        ".t-upload__title"
      ],
      [
        "راهنما",
        "قالب و سقف حجم، همیشه پیش از انتخاب.",
        ".t-upload__hint"
      ],
      [
        "فهرست",
        "زیر ناحیه؛ هر فایل با نام، حجم و دکمهٔ حذف.",
        ".t-upload-list"
      ]
    ],
    "props": [
      [
        "accept",
        "string",
        "—",
        "قالب‌های مجاز؛ همان چیزی که در راهنما نوشته‌اید."
      ],
      [
        "multiple",
        "boolean",
        "false",
        "چند فایل هم‌زمان."
      ],
      [
        "maxSize",
        "number",
        "—",
        "بایت؛ برای پیام خطای دقیق."
      ],
      [
        "onFiles",
        "(File[]) => void",
        "—",
        "بعد از انتخاب یا رهاکردن."
      ]
    ],
    "a11y": [
      "کل ناحیه یک <code>&lt;label&gt;</code> است که به <code>&lt;input type=\"file\"&gt;</code> وصل می‌شود، پس با صفحه‌کلید و لمس هم کار می‌کند.",
      "ورودی پنهان است اما حذف نشده؛ <code>display: none</code> آن را از دسترس صفحه‌کلید خارج می‌کند.",
      "حالت کشیدن با رنگ <em>و</em> تغییر متن اعلام می‌شود.",
      "افزودن و حذف فایل در ناحیهٔ <code>aria-live=\"polite\"</code> اعلام می‌شود.",
      "دکمهٔ حذف نام فایل را در برچسبش دارد."
    ],
    "responsive": "روی گوشی ناحیه کوتاه‌تر می‌شود و متنش به «انتخاب از دوربین یا گالری» تغییر می‌کند؛ کشیدن و رهاکردن آنجا وجود ندارد و نباید تبلیغ شود.",
    "specimens": [
      {
        "label": "عکس محصول",
        "canvas": "plain",
        "stageClass": "spec__stage--center",
        "html": "<div style=\"inline-size:100%;max-inline-size:420px\">\n  <label class=\"t-upload\">\n    <svg class=\"t-icon t-upload__icon\" width=\"28\" height=\"28\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zM6 12l1.41 1.41L15 5.83V24h2V5.83l7.59 7.58L26 12 16 2 6 12z\"/></svg>\n    <span class=\"t-upload__title\">انتخاب عکس</span>\n    <span class=\"t-upload__hint\">JPG یا PNG، هر فایل تا ۵ مگابایت، حداکثر ۸ عکس</span>\n    <input type=\"file\" accept=\"image/png,image/jpeg\" multiple>\n  </label>\n  <div class=\"t-upload-list\">\n    <div class=\"t-upload-item\">\n      <svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M19 14a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z\"/><path d=\"M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H6v-6l5-5 5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5zm0-4.83-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20z\"/></svg>\n      <span class=\"t-upload-item__name\">product-front.jpg</span>\n      <span class=\"t-upload-item__size\">۱٫۲ مگابایت</span>\n      <button class=\"t-icon-btn t-icon-btn--sm\" aria-label=\"حذف product-front.jpg\"><svg class=\"t-icon t-icon--sm\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z\"/></svg></button>\n    </div>\n  </div>\n</div>",
        "note": "کل ناحیه یک برچسب است، پس Enter هم بازش می‌کند. فهرست زیر ناحیه می‌ماند."
      }
    ],
    "react": "export function FileUpload({ accept, multiple, maxSize, files, onFiles, hint }) {\n  const [dragging, setDragging] = useState(false);\n  const take = list => onFiles([...list].filter(f => !maxSize || f.size <= maxSize));\n  return (\n    <>\n      <label className=\"t-upload\" data-dragging={dragging || undefined}\n             onDragOver={e => { e.preventDefault(); setDragging(true); }}\n             onDragLeave={() => setDragging(false)}\n             onDrop={e => { e.preventDefault(); setDragging(false); take(e.dataTransfer.files); }}>\n        <UploadIcon className=\"t-icon t-upload__icon\" aria-hidden=\"true\" />\n        <span className=\"t-upload__title\">{dragging ? 'رها کنید' : 'انتخاب عکس'}</span>\n        <span className=\"t-upload__hint\">{hint}</span>\n        <input type=\"file\" accept={accept} multiple={multiple}\n               onChange={e => take(e.target.files)} />\n      </label>\n      <div className=\"t-upload-list\" aria-live=\"polite\">\n        {files.map(f => (\n          <div className=\"t-upload-item\" key={f.name}>\n            <ImageIcon className=\"t-icon t-icon--sm\" aria-hidden=\"true\" />\n            <span className=\"t-upload-item__name\">{f.name}</span>\n            <span className=\"t-upload-item__size\">{faSize(f.size)}</span>\n            <IconButton size=\"sm\" label={`حذف ${f.name}`} onClick={() => onFiles(files.filter(x => x !== f))}>\n              <CloseIcon />\n            </IconButton>\n          </div>\n        ))}\n      </div>\n    </>\n  );\n}"
  }
];
