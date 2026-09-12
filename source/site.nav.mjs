/* معماری اطلاعات سایت. یک منبع برای ناوبری، جست‌وجو، نقشهٔ سایت و llms.txt. */
export const SITE_NAME = 'کتاب دیزاین ترب';
export const SITE_TAGLINE = 'سیستم طراحی ترب';

export const GROUP_FA = {
  Actions: 'کنش‌ها',
  Inputs: 'ورودی‌ها',
  Navigation: 'ناوبری',
  Commerce: 'تجارت',
  Feedback: 'بازخورد',
  Overlays: 'لایه‌ها',
  Data: 'داده',
  Layout: 'چیدمان',
  Brand: 'برند',
};

export const UI_FA = {
  search: 'جست‌وجوی کامپوننت، توکن، آیکون…',
  searchLabel: 'جست‌وجو',
  onThisPage: 'در این صفحه',
  components: 'کامپوننت‌ها',
  prev: 'قبلی',
  next: 'بعدی',
  skip: 'رفتن به محتوا',
  toggleNav: 'باز و بستن ناوبری',
  noMatch: 'چیزی برای',
  code: 'کد',
  copy: 'کپی',
  copied: 'کپی شد',
  examples: 'نمونه‌ها',
  usage: 'کاربرد',
  anatomy: 'ساختار',
  props: 'پراپ‌ها',
  a11y: 'دسترس‌پذیری',
  responsive: 'رفتار واکنش‌گرا',
  do: 'درست',
  dont: 'نادرست',
  was: 'قبلاً',
  legacyFold: 'نام قدیمی در اسکچ به این کامپوننت نگاشت می‌شود',
  statusStable: 'پایدار',
  statusNew: 'تازه در این سیستم',
  statusRevised: 'تغییر نام و ساختار',
  copyClass: 'کپی کلاس',
};

export const nav = [
  { title: 'مرور کلی', items: [
    { slug: 'index', title: 'مقدمه' },
    { slug: 'start', title: 'شروع کار' },
    { slug: 'ai', title: 'اتصال به هوش مصنوعی' },
    { slug: 'symbols', title: 'سیمبل‌های اسکچ' },
    { slug: 'migration', title: 'نام‌گذاری و مهاجرت' },
    { slug: 'changelog', title: 'تغییرات' },
  ]},
  { title: 'مبانی', items: [
    { slug: 'foundations/color', title: 'رنگ' },
    { slug: 'foundations/typography', title: 'تایپوگرافی' },
    { slug: 'foundations/glass', title: 'شیشه' },
    { slug: 'foundations/elevation', title: 'ارتفاع و عمق' },
    { slug: 'foundations/spacing', title: 'فاصله و چیدمان' },
    { slug: 'foundations/radius', title: 'گردی گوشه' },
    { slug: 'foundations/motion', title: 'حرکت' },
    { slug: 'foundations/iconography', title: 'آیکون‌نگاری' },
    { slug: 'foundations/rtl', title: 'راست‌چین و فارسی' },
    { slug: 'foundations/responsive', title: 'واکنش‌گرایی' },
    { slug: 'foundations/accessibility', title: 'دسترس‌پذیری' },
    { slug: 'foundations/content', title: 'محتوا و لحن' },
  ]},
  { title: 'الگوها', items: [
    { slug: 'patterns/nearby-stores', title: 'فروشگاه‌های اطراف' },
    { slug: 'patterns/product-detail', title: 'صفحهٔ محصول' },
    { slug: 'patterns/search-and-filter', title: 'جست‌وجو و فیلتر' },
    { slug: 'patterns/feedback-and-errors', title: 'بازخورد و خطا' },
    { slug: 'patterns/seller-panel', title: 'پنل فروشنده (B2B)' },
  ]},
  { title: 'منابع', items: [
    { slug: 'tokens', title: 'مرورگر توکن' },
    { slug: 'icons', title: 'کتابخانهٔ آیکون' },
  ]},
];
