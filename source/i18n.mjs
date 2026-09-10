/* Persian → English for every string that appears in a specimen.
   Powers the locale switch in the docs site. Persian is the product truth;
   English exists so a non-Persian-reading developer can still evaluate
   hierarchy, density, truncation and layout. */
export const fa2en = {
  // ── Actions & labels ─────────────────────────────────────────────
  'افزودن به سبد': 'Add to cart', 'مشاهده فروشندگان': 'View sellers', 'مقایسه': 'Compare',
  'ذخیره': 'Save', 'انصراف': 'Cancel', 'بیشتر': 'More', 'مشاهده همه': 'View all',
  'مسیریابی': 'Directions', 'تماس تلفنی': 'Call store', 'تماس': 'Call',
  'تماس با فروشگاه': 'Call the store', 'نزدیک من': 'Near me', 'موقعیت من': 'My location',
  'لایه‌های نقشه': 'Map layers', 'اشتراک‌گذاری': 'Share', 'بازگشت': 'Back', 'بستن': 'Close',
  'جستجو': 'Search', 'افزودن': 'Add', 'تلاش مجدد': 'Try again', 'واگرد': 'Undo',
  'حذف همه': 'Clear all', 'همه فیلترها': 'All filters', 'حذف آدرس': 'Delete address',
  'گزارش تخلف': 'Report listing', 'اعلان تغییر قیمت': 'Price drop alerts',
  'در حال ارسال': 'Submitting', 'در حال بارگذاری فروشگاه‌ها…': 'Loading stores…',
  'افزودن به علاقه‌مندی': 'Add to favourites', 'پاک کردن جستجو': 'Clear search',
  'جستجوی صوتی': 'Voice search', 'جستجو با تصویر': 'Search by image',
  'افزایش تعداد': 'Increase quantity', 'کاهش تعداد': 'Decrease quantity',
  'حذف فیلتر «باز الان»': 'Remove the “Open now” filter', 'نمایش ۴۳ نتیجه': 'Show 43 results',

  // ── Navigation & structure ───────────────────────────────────────
  'خانه': 'Home', 'حساب من': 'My account', 'اطراف من': 'Near me',
  'فروشگاه‌ها': 'Stores', 'محصولات': 'Products', 'فروشنده‌ها': 'Sellers',
  'مشخصات': 'Specifications', 'نظرات': 'Reviews', 'نمودار قیمت': 'Price history',
  'فیلترها': 'Filters', 'مرتب‌سازی': 'Sort', 'فهرست': 'List', 'نقشه': 'Map',
  'فروشگاه‌های اطراف': 'Nearby stores', 'مسیر': 'Breadcrumb',
  'ناوبری اصلی': 'Main navigation', 'نمای اطراف': 'Nearby view', 'نمای نمایش': 'View mode',
  'بخش‌های محصول': 'Product sections', 'مشخصات کلی': 'General', 'دوربین': 'Camera',
  'بدنه و مقاومت': 'Body & durability', 'مشخصات کامل': 'Full specifications',

  // ── Filters & facets ─────────────────────────────────────────────
  'تهران': 'Tehran', 'برند': 'Brand', 'قیمت': 'Price', 'باز الان': 'Open now',
  'نمایندگی رسمی': 'Official dealer', 'ضمانت ترب': 'Torob Guarantee',
  'ارزان‌ترین': 'Cheapest', 'نزدیک‌ترین': 'Nearest', 'محبوب‌ترین': 'Most popular',
  'فقط فروشگاه‌های باز': 'Open stores only', 'ارسال فوری': 'Express delivery',

  // ── Commerce vocabulary ──────────────────────────────────────────
  'تومان': 'Toman', 'از': 'from', 'ناموجود': 'Out of stock', 'آگهی': 'Ad',
  'کالابرگ': 'Kalabarg', 'پرداخت قسطی': 'Installments', 'موجودی کم': 'Low stock',
  '۱۵٪ تخفیف': '15% off', '۱۵٪': '15%',
  'پرداخت قسطی (در دسترس نیست)': 'Installments (unavailable)',
  'در ۷۹ فروشگاه': 'in 79 stores', 'در ۱۲ فروشگاه': 'in 12 stores',
  '۲۳ فروشگاه': '23 stores', '۳ فروشگاه': '3 stores',
  '۲۳ فروشگاه در این ناحیه': '23 stores in this area',
  '۲۳ فروشگاه · ۱٫۲ کیلومتر': '23 stores · 1.2 km',
  'تهران، ۷۸ مورد': 'Tehran · 78 results',
  '۱ کیلومتر': '1 km', '۵۵۰ متر': '550 m',
  'باز تا ۲۲:۳۰': 'Open until 22:30', 'بسته — باز می‌شود ۹:۰۰': 'Closed — opens 9:00',
  '۱۵٫۸ م‌ت': '15.8 M', '۶٫۲ م‌ت': '6.2 M',
  'خرید از تکنولایف · ارسال فوری': 'Sold by Technolife · Express delivery',
  'خرید از دیجی‌کالا ·': 'Sold by Digikala ·',
  'ادکلن شهر · ۱ کیلومتر · فروش حضوری': 'Adkolan Shahr · 1 km · In-store only',

  // ── Store & product names ────────────────────────────────────────
  'ادکلن شهر': 'Adkolan Shahr', 'تکنولایف': 'Technolife', 'دیجی‌کالا': 'Digikala',
  'گالری رز': 'Rose Gallery', 'مرکز خرید پالادیوم': 'Palladium Mall',
  'کازاموراتی مفیستو': 'Casamorati Mefisto',
  'کازاموراتی مفیستو ۱۰۰ میل': 'Casamorati Mefisto 100 ml',
  'کازاموراتی مفیستو ادکلن شرکتی ۱۰۰ میل': 'Casamorati Mefisto eau de parfum 100 ml',
  'گوشی اپل iPhone 11 حافظه ۱۲۸ گیگابایت': 'Apple iPhone 11 128 GB',
  'گوشی اپل استوک': 'Apple iPhone (stock)',
  'ادکلن کازاموراتی': 'Casamorati perfume', 'ادکلن کازاموراتی ۱۲۰ میل': 'Casamorati perfume 120 ml',
  'ادکلن کازامو': 'Casamo', 'اسپری بدن نویا': 'Noya body spray',
  'ادکلن دیور ساواج': 'Dior Sauvage', 'عطر جیبی': 'Pocket perfume',
  'آرایشی و بهداشتی': 'Beauty & personal care', 'عطر و ادکلن': 'Fragrance',
  'ادکلن شهر، ۱۵٬۸۰۰٬۰۰۰ تومان': 'Adkolan Shahr, 15,800,000 Toman',
  'عطر سرای نیک، ۶٬۲۰۰٬۰۰۰ تومان': 'Atr Saraye Nik, 6,200,000 Toman',
  'فروشگاه': 'Store', 'محصولات فروشگاه': 'Store products',

  // ── Forms ────────────────────────────────────────────────────────
  'نام فروشگاه': 'Store name', 'مثلاً ادکلن شهر': 'e.g. Adkolan Shahr',
  'نامی که مشتریان می‌بینند.': 'The name customers see.',
  'شماره تماس': 'Phone number', 'شماره باید ۱۱ رقم باشد.': 'Number must be 11 digits.',
  'کد فروشنده': 'Seller code', 'جستجو در اطراف من': 'Search near me',

  // ── Feedback copy ────────────────────────────────────────────────
  'به علاقه‌مندی‌ها اضافه شد': 'Added to favourites',
  'آدرس ذخیره شد': 'Address saved',
  'می‌توانید از حساب کاربری ویرایش کنید.': 'You can edit it from your account.',
  'اتصال برقرار نشد': 'Connection failed', 'دوباره تلاش کنید.': 'Please try again.',
  'موجودی این فروشگاه کم است': 'This store is low on stock',
  'اتصال به اینترنت برقرار نیست': 'No internet connection',
  'نتایج نمایش‌داده‌شده مربوط به آخرین بازدید شماست.': 'Showing results from your last visit.',
  'ارسال به این شهر انجام نمی‌شود': 'No delivery to this city',
  'می‌توانید محصول را حضوری از فروشگاه تهیه کنید.': 'You can buy it in store instead.',
  'این خرید تحت ضمانت ترب است': 'This purchase is covered by Torob Guarantee',
  'تا ۷ روز امکان بازگشت کالا وجود دارد.': 'Returns accepted within 7 days.',
  'قیمت‌ها هر ۲۰ دقیقه به‌روزرسانی می‌شوند.': 'Prices refresh every 20 minutes.',
  'محصولی اضافه نشده': 'No products added yet',
  'برای اطلاع از محصولات فروشگاه با آن تماس بگیرید.': 'Call the store to ask what they stock.',
  'فروشگاهی با این فیلترها پیدا نشد': 'No stores match these filters',
  'در شعاع ۲ کیلومتری، ۷۸ فروشگاه هست. فیلتر «باز الان» را بردارید تا همه را ببینید.':
    'There are 78 stores within 2 km. Remove the “Open now” filter to see them all.',
  'نتوانستیم فروشگاه‌ها را بارگذاری کنیم': 'We couldn’t load nearby stores',
  'اتصال اینترنت را بررسی کنید و دوباره تلاش کنید. اگر مشکل ادامه داشت، چند دقیقه بعد سر بزنید.':
    'Check your connection and try again. If it keeps failing, come back in a few minutes.',
  'حذف آدرس ذخیره‌شده؟': 'Delete this saved address?',
  '«خانه — ولیعصر، حافظ» حذف می‌شود. این کار قابل بازگشت نیست.':
    '“Home — Valiasr, Hafez” will be removed. This cannot be undone.',

  // ── Spec sheet ───────────────────────────────────────────────────
  'سیستم عامل': 'Operating system', 'ظرفیت باتری': 'Battery capacity',
  'کیفیت دوربین اصلی': 'Main camera', '۴۸ مگاپیکسل': '48 MP',
  '۴۸۳۲ میلی‌آمپرساعت': '4832 mAh', 'iOS ۲۶': 'iOS 26',
  'سیستم عامل: iOS ۲۶ · حافظه داخلی: ۱۲۸ گیگابایت · سال تولید: ۲۰۲۵':
    'OS: iOS 26 · Storage: 128 GB · Released: 2025',
  'دوربین اصلی: ۴۸ مگاپیکسل · دوربین سلفی: ۱۲ مگاپیکسل · فیلم‌برداری ۴K':
    'Main: 48 MP · Selfie: 12 MP · 4K video',
  'گواهینامه IP53 — مقاوم در برابر پاشیده شدن آب و گرد و غبار. پوشش گوریلا گلس ۳.':
    'IP53 rated — splash and dust resistant. Gorilla Glass 3.',
  'TRB-۴۸۲۹': 'TRB-4829',
};
