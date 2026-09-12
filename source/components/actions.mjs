/* Component registry.
   The source of truth for each component's Farsi docs, specimens, props and
   React wrapper. Edit here; the site, MCP data and React package are built
   from it. Specimen HTML must use system classes only. */
export default [
  {
    "name": "Button",
    "root": "t-btn",
    "anatomySample": "<button class=\"t-btn t-btn--blue t-btn--lg\" aria-expanded=\"false\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M26,29h-.17C6.18,27.87,3.39,11.29,3,6.23A3,3,0,0,1,5.76,3H11.4a2,2,0,0,1,1.86,1.26L14.82,8.1a2,2,0,0,1-.44,2.15l-2.17,2.19a9.29,9.29,0,0,0,7.31,7.32l2.21-2.19a2,2,0,0,1,2.16-.41l3.87,1.55A2,2,0,0,1,29,20.6v5.52A3,3,0,0,1,26,29ZM6,5A1,1,0,0,0,5,6v.08C5.46,12,8.41,26,25.94,27A1,1,0,0,0,27,26.06V20.6l-3.87-1.55-2.92,2.9-.48-.06c-8.85-1.11-10-10-10-10.05l-.06-.48,2.89-2.92L11,5Z\"/></svg>اطلاعات تماس<svg class=\"t-icon t-icon--end\" viewBox=\"0 0 16 16\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M8 11 3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z\"/></svg></button>",
    "slug": "button",
    "group": "Actions",
    "status": "revised",
    "legacy": [
      "Button / Red / Default",
      "Button / Red / Hover",
      "Button / Red / Disable",
      "Button/‌Blue/Default + Chevron",
      "Button/‌Blue/Clicked + Chevron",
      "Button/‌Blue/Hover + Chevron",
      "Button/Black/Default",
      "Button/Black/Hover",
      "Button/Black/Disable",
      "Button/Black ghost/Default",
      "Button/Black ghost/Hover",
      "Button/‌Blue ghost/Icon/Light",
      "Button/‌Blue ghost/Icon/Dark",
      "Button/Small/Blue/with-badge",
      "Button/Xsmall/Secondary/Icon",
      "Button/Normal/Primary/Icon",
      "Button/Normal/Border/Icon",
      "Button / Red / Icon",
      "Button/‌Blue/Icon",
      "Button/Black ghost/Icon"
    ],
    "summary": "یک کنش را اجرا می‌کند. در هر صفحه فقط یک دکمهٔ اصلی.",
    "description": [
      "ترب <strong>سه خانوادهٔ رنگی</strong> دارد و رنگ اینجا تزئین نیست، معنا دارد: <strong class=\"fam-red\">قرمز</strong> کنش خرید اینترنتی است، <strong class=\"fam-blue\">آبی</strong> کنش حضوری و ارتباط با فروشگاه (مسیریابی، تماس) و <strong class=\"fam-black\">مشکی</strong> خنثی. به همین دلیل است که <code>Button/Offline Buy box</code> آبی است، نه دکمهٔ خط‌دار.",
      "دو جزئیات که هر دو از اسکچ اندازه‌گیری شده و هر دو به‌راحتی از دست می‌روند. <strong>حالت پیش‌فرض گرادیان است و هاور به رنگ تخت جمع می‌شود</strong>؛ یعنی دکمه زیر نشانگر می‌نشیند، نه اینکه بالا بیاید. و هر دکمهٔ پرشده یک <strong>لبهٔ داخلی ۱ پیکسلی هم‌خانواده با خودش</strong> دارد (قرمز از Red 50، آبی از Blue 300). همین لبه است که نمی‌گذارد یک سطح رنگی اشباع، مستطیل تخت دیده شود.",
      "کیت اولیه هر حالت را یک سیمبل جدا مدل کرده بود؛ <code>Button / Red / Hover</code> کنار <code>Button / Red / Default</code> به‌عنوان مستر مستقل. این ساختار هرگز به API کامپوننت تبدیل نمی‌شود. اینجا <strong>حالت، حالت است</strong> (سودوکلاس‌های CSS و صفت‌های <code>data-</code>) و فقط خانواده و اندازه پراپ هستند.",
      "نام‌گذاری بر پایهٔ <strong>نیت</strong> هم پشتیبانی می‌شود، نه فقط رنگ. <code>primary</code>، <code>accent</code> و <code>neutral</code> نام مستعار قرمز، آبی و مشکی‌اند. در کد محصول همین‌ها را ترجیح دهید: نیت از تغییر پالت جان سالم به در می‌برد، رنگ نه."
    ],
    "use": [
      "در هر صفحه دقیقاً یک دکمهٔ <code>red</code>؛ همان کاری که کاربر برای آن آمده است.",
      "<code>blue</code> برای کنش حضوری و ارتباط با فروشگاه، <code>ghost</code> برای کنش درجه‌سه.",
      "برچسب را با فعلی بنویسید که نتیجه را نام ببرد: «مشاهده فروشندگان»، نه «بیشتر».",
      "هنگام کار ناهمگام <code>data-loading</code> بگذارید؛ برچسب پنهان می‌شود اما عرض دکمه ثابت می‌ماند."
    ],
    "avoid": [
      "دو دکمهٔ اصلی کنار هم. اگر هر دو مهم‌اند، هیچ‌کدام اصلی نیست.",
      "غیرفعال‌کردن بدون توضیح. دلیلش را کنار دکمه بنویسید.",
      "قرمز برای کنش حضوری. رنگ اینجا یک قول است، نه یک سلیقه.",
      "دکمهٔ فقط آیکون بدون <code>aria-label</code>."
    ],
    "anatomy": [
      [
        "ظرف",
        "ارتفاع، گردی ۱۲ و ناحیهٔ لمس را تعیین می‌کند. کادر بصری می‌تواند ۲۴ پیکسل باشد؛ ناحیهٔ لمس هرگز زیر ۴۴ پیکسل نمی‌رود.",
        ":root"
      ],
      [
        "آیکون آغازین",
        "اختیاری، ۱۶ پیکسل. آیکون‌های جهت‌دار در راست‌چین قرینه می‌شوند.",
        ".t-icon:not(.t-icon--end)"
      ],
      [
        "برچسب",
        "۱۴ پیکسل Bold. هرگز به خط بعد نمی‌رود؛ به‌جایش ظرف را کوتاه کنید."
      ],
      [
        "آیکون پایانی",
        "اختیاری. شورون اینجا یعنی «چیزی باز می‌شود»، نه «ثبت می‌شود».",
        ".t-icon--end"
      ]
    ],
    "props": [
      [
        "variant",
        "'red' | 'blue' | 'black' | 'black-ghost' | 'blue-outline' | 'red-outline' | 'soft' | 'ghost' | 'blue-ghost' | 'glass'",
        "'black'",
        "خانوادهٔ رنگی. <code>primary</code>، <code>accent</code> و <code>neutral</code> نام مستعار قرمز، آبی و مشکی‌اند و در کد محصول ترجیح دارند."
      ],
      [
        "size",
        "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        "'lg'",
        "۲۴ / ۲۸ / ۳۲ / ۴۰ / ۴۸ پیکسل. <code>lg</code> پیش‌فرض است و با کیت اسکچ می‌خواند."
      ],
      [
        "block",
        "boolean",
        "false",
        "پرکردن کل محور درون‌خطی."
      ],
      [
        "loading",
        "boolean",
        "false",
        "اسپینر نشان می‌دهد، عرض را نگه می‌دارد و رویداد اشاره‌گر را می‌بندد."
      ],
      [
        "disabled",
        "boolean",
        "false",
        "همهٔ خانواده‌ها به یک ظاهر غیرفعال جمع می‌شوند."
      ],
      [
        "iconStart / iconEnd",
        "ReactNode",
        "—",
        "آیکون آغازین و پایانی به ترتیب منطقی؛ در چپ‌چین خودشان جا عوض می‌کنند."
      ]
    ],
    "a11y": [
      "یک <code>&lt;button&gt;</code> واقعی رندر می‌شود. <code>&lt;a class=\"t-btn\"&gt;</code> فقط وقتی که ناوبری می‌کند.",
      "حالت بارگذاری <code>aria-busy=\"true\"</code> می‌گذارد و نام دسترس‌پذیر ثابت می‌ماند تا صفحه‌خوان دوباره اعلام نکند.",
      "حلقهٔ فوکوس ۲ پیکسل با فاصلهٔ ۲ پیکسل است و در هر سه پوسته نسبت <span class=\"t-bidi\" dir=\"ltr\">۳:۱</span> را نگه می‌دارد (معیار ۲.۴.۱۳ نسخهٔ ۲.۲).",
      "غیرفعال با صفت <code>disabled</code>، نه با <code>pointer-events: none</code> که برای فناوری کمکی نامرئی است.",
      "برچسب غیرفعال با نسبت <span class=\"t-bidi\" dir=\"ltr\">۴٫۸:۱</span> خوانا می‌ماند؛ سیگنال غیرفعال‌بودن را سطح خاکستری و نبود لبه می‌رسانند، نه متن ناخوانا.",
      "در هر اندازه ناحیهٔ لمس دست‌کم ۴۴ پیکسل است — بسیار بالاتر از حداقل <span class=\"t-bidi\" dir=\"ltr\">۲۴×۲۴</span> در معیار ۲.۵.۸."
    ],
    "responsive": "دکمه با نقطهٔ شکست تغییر اندازه نمی‌دهد. زیر ۳۷۵ پیکسل از <code>block</code> استفاده کنید تا برچسب هرگز بریده نشود. در فوتری با دو کنش، هر دو <code>block</code> می‌شوند و زیر ۳۶۰ پیکسل روی هم می‌نشینند.",
    "specimens": [
      {
        "label": "سه خانوادهٔ رنگی",
        "note": "قرمز خرید اینترنتی است، آبی کنش فروشگاهی و مشکی خنثی. روی هر کدام هاور کنید: گرادیان به رنگ تخت جمع می‌شود.",
        "stageClass": "spec__stage--stack",
        "html": "<div style=\"display:flex;gap:12px;flex-wrap:wrap;align-items:center\">\n  <button class=\"t-btn t-btn--red\">خرید اینترنتی</button>\n  <button class=\"t-btn t-btn--blue\">اطلاعات تماس</button>\n  <button class=\"t-btn t-btn--black\">عنوان</button>\n</div>\n<div style=\"display:flex;gap:12px;flex-wrap:wrap;align-items:center\">\n  <button class=\"t-btn t-btn--red-outline\">خرید اینترنتی</button>\n  <button class=\"t-btn t-btn--blue-outline\">اطلاعات تماس</button>\n  <button class=\"t-btn t-btn--black-ghost\">عنوان</button>\n</div>\n<div style=\"display:flex;gap:12px;flex-wrap:wrap;align-items:center\">\n  <button class=\"t-btn t-btn--soft\">ذخیره</button>\n  <button class=\"t-btn t-btn--blue-ghost\">بیشتر</button>\n  <button class=\"t-btn t-btn--ghost\">انصراف</button>\n</div>"
      },
      {
        "label": "اندازه‌ها",
        "html": "<button class=\"t-btn t-btn--red t-btn--xs\">Xsmall</button>\n<button class=\"t-btn t-btn--red t-btn--sm\">Small</button>\n<button class=\"t-btn t-btn--red t-btn--md\">Medium</button>\n<button class=\"t-btn t-btn--red t-btn--lg\">Large</button>\n<button class=\"t-btn t-btn--red t-btn--xl\">XLarge</button>"
      },
      {
        "label": "حالت‌ها",
        "note": "همهٔ خانواده‌ها به یک ظاهر غیرفعال جمع می‌شوند. برچسب با نسبت <span class=\"t-bidi\" dir=\"ltr\">۴٫۸:۱</span> خوانا می‌ماند؛ سطح تخت و نبود لبه سیگنال را می‌رسانند، نه متن ناخوانا.",
        "html": "<button class=\"t-btn t-btn--red\">خرید اینترنتی</button>\n<button class=\"t-btn t-btn--red\" data-loading=\"true\">در حال ارسال</button>\n<button class=\"t-btn t-btn--red\" disabled>خرید اینترنتی</button>\n<button class=\"t-btn t-btn--blue\" disabled>اطلاعات تماس</button>\n<button class=\"t-btn t-btn--black\" disabled>عنوان</button>"
      },
      {
        "label": "همراه آیکون",
        "html": "<button class=\"t-btn t-btn--blue\" aria-expanded=\"false\">اطلاعات تماس<svg class=\"t-icon t-icon--tiny t-icon--stroke t-icon--end\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11 7L8 10L5 7\"/></svg></button>\n<button class=\"t-btn t-btn--black-ghost\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M16,2A11.0134,11.0134,0,0,0,5,13a10.8885,10.8885,0,0,0,2.2163,6.6s.3.3945.3482.4517L16,30l8.439-9.9526c.0444-.0533.3447-.4478.3447-.4478l.0015-.0024A10.8846,10.8846,0,0,0,27,13,11.0134,11.0134,0,0,0,16,2Zm0,15a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,17Z\"/><circle cx=\"16\" cy=\"13\" r=\"4\" fill=\"none\"/></svg>مسیریابی</button>\n<button class=\"t-btn t-btn--red t-btn--block\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M26,29h-.17C6.18,27.87,3.39,11.29,3,6.23A3,3,0,0,1,5.76,3h5.51a2,2,0,0,1,1.86,1.26L14.65,8a2,2,0,0,1-.44,2.16l-2.13,2.15a9.37,9.37,0,0,0,7.58,7.6l2.17-2.15A2,2,0,0,1,24,17.35l3.77,1.51A2,2,0,0,1,29,20.72V26A3,3,0,0,1,26,29ZM6,5A1,1,0,0,0,5,6v.08C5.46,12,8.41,26,25.94,27A1,1,0,0,0,27,26.06V20.72l-3.77-1.51-2.87,2.85L19.88,22C11.18,20.91,10,12.21,10,12.12l-.06-.48,2.84-2.87L11.28,5Z\"/></svg>تماس با فروشگاه</button>"
      }
    ],
    "react": "import { forwardRef } from 'react';\nimport clsx from 'clsx';\n\nexport const Button = forwardRef(function Button(\n  { variant = 'neutral', size = 'lg', block, loading, disabled,\n    iconStart, iconEnd, children, className, ...rest }, ref) {\n  return (\n    <button\n      ref={ref}\n      className={clsx('t-btn', `t-btn--${variant}`, `t-btn--${size}`, block && 't-btn--block', className)}\n      data-loading={loading || undefined}\n      aria-busy={loading || undefined}\n      disabled={disabled || loading}\n      {...rest}\n    >\n      {iconStart}\n      {children}\n      {iconEnd}\n    </button>\n  );\n});"
  },
  {
    "name": "IconButton",
    "root": "t-icon-btn",
    "slug": "icon-button",
    "group": "Actions",
    "status": "revised",
    "legacy": [
      "Button/Icon/Icon",
      "Button/Icon/Blue Icon",
      "Button/Icon/Ghost Icon",
      "Button/Icon/Icon Rounded",
      "Button/Icon"
    ],
    "summary": "یک آیکون به‌عنوان هدف لمس. همیشه نام دسترس‌پذیر دارد.",
    "description": [
      "کیت اولیه چهار مستر داشت — <code>Icon</code>، <code>Blue Icon</code>، <code>Ghost Icon</code> و <code>Icon Rounded</code> — که فقط در پرکردن و گردی گوشه فرق داشتند. اینجا یک کامپوننت با دو پراپ.",
      "نسخهٔ شیشه‌ای همان چیزی است که یک کنترل را روی نقشه یا عکس محصول خوانا نگه می‌دارد."
    ],
    "use": [
      "نوار ابزار، گوشهٔ کارت، کنترل‌های نقشه؛ هرجا که برچسب جا نمی‌شود.",
      "روی دستگاه‌های اشاره‌گردار با تولتیپ جفت کنید.",
      "روی نقشه یا عکس از <code>glass</code> استفاده کنید تا محتوای پشت خوانا بماند."
    ],
    "avoid": [
      "آیکون تنها برای کنش ناآشنا یا مخرب. برچسب بگذارید.",
      "نشانه‌های مبهم. اگر دو آیکون کنار هم می‌توانند یک معنی بدهند، از برچسب استفاده کنید."
    ],
    "anatomy": [
      [
        "ظرف",
        "۴۸ پیکسل پیش‌فرض، ۳۲ پیکسل کوچک. مربع با گردی ۱۲ یا کاملاً گرد.",
        ":root"
      ],
      [
        "آیکون",
        "۲۰ پیکسل، رنگ را از ظرف به ارث می‌برد.",
        ".t-icon"
      ]
    ],
    "props": [
      [
        "variant",
        "'ghost' | 'accent' | 'glass'",
        "'ghost'",
        "<code>glass</code> برای استفاده روی نقشه یا تصویر."
      ],
      [
        "size",
        "'sm' | 'md'",
        "'md'",
        "۳۲ / ۴۸ پیکسل."
      ],
      [
        "round",
        "boolean",
        "false",
        "گردی کامل به‌جای ۱۲."
      ],
      [
        "label",
        "string",
        "— (required)",
        "به <code>aria-label</code> تبدیل می‌شود. نسخهٔ بدون برچسب وجود ندارد."
      ]
    ],
    "a11y": [
      "<code>label</code> اجباری است و به <code>aria-label</code> نگاشت می‌شود؛ دکمهٔ آیکونی بدون نام برای کاربر صفحه‌خوان بی‌استفاده است.",
      "برای دکمهٔ دوحالته <code>aria-pressed</code> بگذارید و نام را ثابت نگه دارید («افزودن به علاقه‌مندی»)؛ فقط حالت فشرده تغییر کند."
    ],
    "responsive": "۴۸ پیکسل روی لمس، ۳۲ پیکسل روی اشاره‌گر قابل قبول است. هرگز از ۳۲ پیکسل بصری و ۴۴ پیکسل ناحیهٔ لمس پایین‌تر نروید.",
    "specimens": [
      {
        "label": "گونه‌ها",
        "html": "<button class=\"t-icon-btn\" aria-label=\"جستجو\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z\"/></svg></button>\n<button class=\"t-icon-btn t-icon-btn--accent\" aria-label=\"تماس\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M26,29h-.17C6.18,27.87,3.39,11.29,3,6.23A3,3,0,0,1,5.76,3h5.51a2,2,0,0,1,1.86,1.26L14.65,8a2,2,0,0,1-.44,2.16l-2.13,2.15a9.37,9.37,0,0,0,7.58,7.6l2.17-2.15A2,2,0,0,1,24,17.35l3.77,1.51A2,2,0,0,1,29,20.72V26A3,3,0,0,1,26,29ZM6,5A1,1,0,0,0,5,6v.08C5.46,12,8.41,26,25.94,27A1,1,0,0,0,27,26.06V20.72l-3.77-1.51-2.87,2.85L19.88,22C11.18,20.91,10,12.21,10,12.12l-.06-.48,2.84-2.87L11.28,5Z\"/></svg></button>\n<button class=\"t-icon-btn t-icon-btn--sm\" aria-label=\"بستن\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z\"/></svg></button>\n<button class=\"t-icon-btn t-icon-btn--round t-icon-btn--accent\" aria-label=\"افزودن\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M17 15 17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z\"/></svg></button>"
      },
      {
        "label": "شیشه، روی محتوا",
        "note": "نسخهٔ شیشه‌ای همان چیزی است که کنترل را روی نقشه یا عکس محصول خوانا نگه می‌دارد.",
        "canvas": "map",
        "stageClass": "spec__stage--center",
        "html": "<button class=\"t-icon-btn t-icon-btn--glass\" aria-label=\"موقعیت من\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M4,12.9835a1,1,0,0,0,.6289.9448l9.6015,3.8409,3.8407,9.6019A1,1,0,0,0,19,28h.0162a1.0009,1.0009,0,0,0,.9238-.6582l8-22.0007A1,1,0,0,0,26.658,4.0594l-22,8A1.0011,1.0011,0,0,0,4,12.9835Z\"/></svg></button>\n<button class=\"t-icon-btn t-icon-btn--glass\" aria-label=\"لایه‌های نقشه\"><svg class=\"t-icon\" viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M16,24a.9967.9967,0,0,1-.4741-.12l-13-7L3.4741,15.12,16,21.8643,28.5259,15.12l.9482,1.7607-13,7A.9967.9967,0,0,1,16,24Z\"/><path d=\"M16,30a.9967.9967,0,0,1-.4741-.12l-13-7L3.4741,21.12,16,27.8643,28.5259,21.12l.9482,1.7607-13,7A.9967.9967,0,0,1,16,30Z\"/><path d=\"M16,18a.9967.9967,0,0,1-.4741-.12l-13-7a1,1,0,0,1,0-1.7607l13-7a.9982.9982,0,0,1,.9482,0l13,7a1,1,0,0,1,0,1.7607l-13,7A.9967.9967,0,0,1,16,18ZM5.1094,10,16,15.8643,26.8906,10,16,4.1358Z\"/></svg></button>"
      }
    ],
    "react": "export function IconButton({ variant = 'ghost', size = 'md', round, label, children, className, ...rest }) {\n  return (\n    <button\n      className={clsx('t-icon-btn', variant !== 'ghost' && `t-icon-btn--${variant}`,\n                      size === 'sm' && 't-icon-btn--sm', round && 't-icon-btn--round', className)}\n      aria-label={label}\n      {...rest}\n    >{children}</button>\n  );\n}"
  },
  {
    "name": "BuyBoxButton",
    "root": "t-buybox",
    "slug": "buy-box-button",
    "group": "Actions",
    "status": "revised",
    "legacy": [
      "Button/Buy box/Ad",
      "Button/Buy box/Cheapest",
      "Button/Offline Buy box/Ad",
      "Badge / Ad on Buy Box"
    ],
    "summary": "هدف خرید در صفحهٔ محصول. رنگ می‌گوید اینترنتی یا حضوری.",
    "description": [
      "مخصوص ترب و تعیین‌کننده: همان ردیفی که خریدار واقعاً در صفحهٔ محصول لمس می‌کند. دقیقاً بر پایهٔ هندسهٔ اسکچ بازسازی شده — <span class=\"t-bidi\" dir=\"ltr\">۳۴۳×۷۲</span> با گردی ۱۶، پشتهٔ فروشنده و قیمت در انتهای محور و نشان «آگهی» در ابتدای آن.",
      "رنگ اینجا معنا است، نه تأکید. <strong class=\"fam-red\">قرمز</strong> فروشندهٔ اینترنتی است که همین حالا از او می‌خرید؛ <strong class=\"fam-blue\">آبی</strong> فروشندهٔ حضوری است که باید به فروشگاهش بروید. نسخهٔ فشردهٔ <span class=\"t-bidi\" dir=\"ltr\">۳۴۳×۴۴</span> با گردی ۱۲ میان‌بر «ارزان‌ترین فروشنده» است و یک برچسب وسط‌چین دارد.",
      "یک اندازه‌گیری ارزش گفتن دارد چون شبیه اشتباه به نظر می‌رسد و نیست: <strong>نام فروشنده Bold ۱۶ است و قیمت Medium ۱۶</strong>. خریدار محدودهٔ قیمت را از فهرست می‌داند؛ در این ردیف دارد انتخاب می‌کند که <em>از چه کسی</em> بخرد، پس وزن به فروشنده می‌رسد."
    ],
    "use": [
      "در صفحهٔ محصول، برای هر فروشنده یک ردیف.",
      "مبلغی را نشان دهید که خریدار می‌پردازد، همراه با واحد پول.",
      "جایگاه‌های تبلیغاتی را همیشه با نشان «آگهی» مشخص کنید؛ این یک افشای قانونی است، نه یک انتخاب سلیقه‌ای.",
      "برای فروشندهٔ حضوری آبی بگذارید تا خریدار پیش از لمس بداند این یک سفر است، نه یک پرداخت."
    ],
    "avoid": [
      "پنهان‌کردن یا تغییر ظاهر نشان آگهی برای بالابردن نرخ کلیک.",
      "استفاده به‌عنوان دکمهٔ عمومی. معنایش این است: «این را، از این فروشنده، به این قیمت بخر».",
      "بلندتر کردن قیمت از فروشنده. این تصمیمی را که در حال گرفتن است وارونه می‌کند.",
      "قرمز برای فروشندهٔ حضوری. رنگ اینجا یک قول است."
    ],
    "anatomy": [
      [
        "ظرف",
        "<span class=\"t-bidi\" dir=\"ltr\">۳۴۳×۷۲</span>، گردی ۱۶، گرادیان خانواده، لبهٔ داخلی ۱ پیکسلی هم‌خانواده.",
        ":root"
      ],
      [
        "نشان آگهی",
        "<span class=\"t-bidi\" dir=\"ltr\">۴۵×۲۴</span>، گردی ۱۲، پرشدهٔ #D70040 با برچسب سفید Medium ۱۲. ابتدای محور.",
        ".t-buybox__ad"
      ],
      [
        "فروشنده",
        "Bold ۱۶. خط اصلی.",
        ".t-buybox__seller"
      ],
      [
        "قیمت",
        "Medium ۱۶، ارقام جدولی، اعداد فارسی.",
        ".t-buybox__price"
      ],
      [
        "فشرده",
        "<span class=\"t-bidi\" dir=\"ltr\">۳۴۳×۴۴</span>، گردی ۱۲، یک برچسب وسط‌چین Bold ۱۶."
      ]
    ],
    "props": [
      [
        "variant",
        "'red' | 'blue'",
        "'red'",
        "قرمز فروشندهٔ اینترنتی، آبی فروشندهٔ حضوری. <code>offline</code> نام مستعار آبی است."
      ],
      [
        "compact",
        "boolean",
        "false",
        "میان‌بر ۴۴ پیکسلی ارزان‌ترین فروشنده."
      ],
      [
        "ad",
        "boolean",
        "false",
        "نشان افشای «آگهی» را رندر می‌کند."
      ],
      [
        "seller / price",
        "string",
        "—",
        "قیمت از پیش با اعداد فارسی قالب‌بندی شده است."
      ]
    ],
    "a11y": [
      "نام دسترس‌پذیر باید قیمت، فروشنده و در صورت وجود افشای آگهی را با هم بیاورد: «۱۵٬۸۰۰٬۰۰۰ تومان، خرید از تکنولایف، آگهی».",
      "نشان آگهی متن واقعی است، نه تصویر پس‌زمینه، تا به صفحه‌خوان برسد.",
      "قیمت را بین چند عنصر نشکنید؛ صفحه‌خوان آن را دو عدد جدا می‌خواند.",
      "با ارتفاع ۷۲ پیکسل، ناحیهٔ لمس بسیار بالاتر از حداقل <span class=\"t-bidi\" dir=\"ltr\">۲۴×۲۴</span> در معیار ۲.۵.۸ است."
    ],
    "responsive": "سقف ۳۴۳ پیکسل، یعنی صفحهٔ ۳۷۵ پیکسلی منهای حاشیه‌های ۱۶ پیکسلی‌اش. زیر آن تمام‌عرض. از نقطهٔ md فروشنده و قیمت در یک خط می‌نشینند و ارتفاع ردیف به ۵۶ پیکسل می‌رسد.",
    "specimens": [
      {
        "label": "فروشندهٔ اینترنتی، تبلیغاتی",
        "canvas": "fog",
        "stageClass": "spec__stage--stack spec__stage--center",
        "html": "<button class=\"t-buybox\">\n  <span class=\"t-buybox__body\">\n    <span class=\"t-buybox__seller\">خرید از تکنولایف</span>\n    <span class=\"t-buybox__price\">۱۶٫۱۰۰٫۰۰۰ تومان</span>\n  </span>\n  <span class=\"t-buybox__ad\">آگهی</span>\n</button>\n<button class=\"t-buybox\">\n  <span class=\"t-buybox__body\">\n    <span class=\"t-buybox__seller\">خرید از دیجی‌کالا</span>\n    <span class=\"t-buybox__price\">۱۵٫۸۰۰٫۰۰۰ تومان</span>\n  </span>\n</button>"
      },
      {
        "label": "فروشندهٔ حضوری",
        "note": "آبی اینجا دکمهٔ درجه‌دو نیست. پیش از لمس به خریدار می‌گوید این خرید در فروشگاه اتفاق می‌افتد.",
        "canvas": "fog",
        "stageClass": "spec__stage--stack spec__stage--center",
        "html": "<button class=\"t-buybox t-buybox--offline\">\n  <span class=\"t-buybox__body\">\n    <span class=\"t-buybox__seller\">خرید از ادکلن شهر</span>\n    <span class=\"t-buybox__price\">۱۶٫۱۰۰٫۰۰۰ تومان</span>\n  </span>\n  <span class=\"t-buybox__ad\">آگهی</span>\n</button>\n<button class=\"t-buybox t-buybox--offline\">\n  <span class=\"t-buybox__body\">\n    <span class=\"t-buybox__seller\">خرید از موبایل ولیعصر</span>\n    <span class=\"t-buybox__price\">۱۵٫۸۰۰٫۰۰۰ تومان</span>\n  </span>\n</button>"
      },
      {
        "label": "میان‌بر ارزان‌ترین فروشنده",
        "canvas": "fog",
        "stageClass": "spec__stage--center",
        "html": "<button class=\"t-buybox t-buybox--compact\">\n  <span class=\"t-buybox__body\"><span class=\"t-buybox__seller\">خرید از ارزان‌ترین فروشنده</span></span>\n</button>"
      }
    ],
    "react": "export function BuyBoxButton({ variant = 'red', compact, ad, seller, price, ...rest }) {\n  const label = [price, seller, ad && 'آگهی'].filter(Boolean).join('، ');\n  return (\n    <button\n      className={clsx('t-buybox', variant === 'blue' && 't-buybox--offline', compact && 't-buybox--compact')}\n      aria-label={label}\n      {...rest}\n    >\n      <span className=\"t-buybox__body\">\n        <span className=\"t-buybox__seller\">{seller}</span>\n        {!compact && <span className=\"t-buybox__price\">{price}</span>}\n      </span>\n      {ad && <span className=\"t-buybox__ad\">آگهی</span>}\n    </button>\n  );\n}"
  }
];
