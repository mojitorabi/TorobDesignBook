/* Where the coded symbol deliberately differs from its Sketch master, and why.
   Four reasons, and only four:

     source  the Sketch file contradicts itself; code follows the majority
     wcag    Sketch fails WCAG 2.2 AA; code corrects it
     type    the master uses IRANYekan (no X) or an Apple-only glyph; code
             uses IRANYekanX / Carbon so the whole product has one typeface
     instance the master is an instance stretched to a size its parts cannot
             take (a 53px badge pulled to 59); code keeps the part's own size

   Everything not listed here is meant to match pixel for pixel; the score on
   the symbols page shows how close it gets. */
export const KIND = {
  source:   { fa: 'ناسازگاری در اسکچ', tone: 'caution' },
  wcag:     { fa: 'اصلاح دسترس‌پذیری', tone: 'info' },
  type:     { fa: 'یکدست‌سازی فونت و آیکون', tone: 'neutral' },
  instance: { fa: 'نمونهٔ کش‌آمده', tone: 'neutral' },
};

const RIM_RED = ['source', 'در اسکچ این دکمه لبهٔ داخلی Red 50 ندارد، اما Red/Icon، دکمهٔ دوتکه و Buy box دارند. کد از اکثریت پیروی می‌کند.'];
const LOW_1PX = ['source', 'برچسب در این مستر ۱ پیکسل پایین‌تر از مرکز نشسته. مسترهای جدیدتر (با Stack) وسط‌چین‌اند و کد هم وسط‌چین است.'];
const SLOT = ['source', 'مستر عرض ثابت ۱۱۱ دارد و متن به ابتدا چسبیده. کد برچسب را در دکمه وسط‌چین می‌کند؛ اختلاف زیر ۲ پیکسل است.'];
const BADGE_59 = ['instance', 'نشان «آگهی» در این مستر از ۵۳ به ۵۹ پیکسل کش آمده و آیکونش کج شده. کد اندازهٔ خود نشان را نگه می‌دارد.'];
const OPEN_GREEN = ['wcag', 'سبز «باز» و فاصله در اسکچ Green 500 است که روی سفید ۲٫۸ به ۱ است و AA را رد می‌کند. کد سبز ۶۵۰ (۵٫۱ به ۱) می‌گذارد.'];
const SF = ['type', 'آیکون دسته از SF Symbols است که مجوز استفاده بیرون از پلتفرم‌های اپل ندارد. کد آیکون Carbon (restaurant) می‌گذارد.'];
const YEKAN = ['type', 'این متن در اسکچ با IRANYekan (نسخهٔ بدون X) است. کل محصول روی IRANYekanX است.'];
const INK = ['source', 'رنگ متن از پالت قدیمی Ink است (#333 یا #737373). کد روی پالت Sky است (Sky 800 و Sky 500).'];
const DIM_BLUE = ['wcag', 'متن Blue 500 روی زمینهٔ تیره ۲٫۹ به ۱ است. در تم dim کد آبی روشن‌تر می‌گذارد (۴٫۵ به ۱ به بالا).'];
const SPLIT_STRETCH = ['instance', 'دکمهٔ دوتکه در این مستر کش آمده (بخش شورون از ۴۴ به ۳۸ یا ۵۲ پیکسل). کد دکمه را با اندازهٔ خودش می‌سازد.'];

export const NOTES = {
  '7BE18F04-4654-4C3A-81E4-991626D590FB': [RIM_RED, LOW_1PX, SLOT],
  '394E4478-1EA8-462E-A041-D332C0241F8D': [LOW_1PX, SLOT],
  '3E6E9397-637C-4B37-8080-82E31462F562': [LOW_1PX, SLOT],
  'ACABA83F-4A6F-4221-BE1E-109DB5357E73': [LOW_1PX],
  'A7D7E08F-4F3C-4F24-AE0A-944973305015': [LOW_1PX],
  '17F27B29-82A7-4835-9CF5-62EE492DD36B': [LOW_1PX],
  '2C9CE530-4396-4529-A844-88D1A4989DEA': [LOW_1PX],
  '3030DFDE-AADC-490A-928C-525CBF581E09': [LOW_1PX],
  '58C31AC1-6BCF-4917-943C-CAD03D4AF0D1': [LOW_1PX],
  'C07442FE-F899-4509-9542-13467E49BF26': [LOW_1PX],
  '30985458-21FF-45EB-B83D-92DA3272B6D5': [LOW_1PX, ['source', 'نام «Clicked» در اسکچ؛ در واقع حالت باز یک دکمهٔ منودار است. در کد <code>aria-expanded="true"</code> است، نه یک گونهٔ جدا.']],
  '51800D41-20BE-460E-855F-9669DFF68041': [['source', 'این مستر لبهٔ Blue 300 ندارد، اما Blue/Default + Chevron و Small/Blue دارند. کد از اکثریت پیروی می‌کند.']],
  '76FC76F5-42F1-4BCE-A05C-04151B492E30': [DIM_BLUE],
  'D4AC33F9-CA8E-4652-8230-EE1E1EE74474': [['source', 'متن این Buy box ۲۴ پیکسل از لبه فاصله دارد و در Offline Buy box ۱۶. کد ۱۶ را برای هر دو گرفته. برچسب «آگهی» اینجا Medium است و در نشان کتابخانه Bold.']],
  'EA7A75AF-3DA7-4F06-BFAB-6479DC719785': [YEKAN],
  '4BF08B65-CAD6-4882-8DCD-3158721D53F6': [INK, OPEN_GREEN],
  'F1BBEC31-4D16-4BB3-892C-7257C2A43601': [SF],
  '7341B7CF-E5B7-45CF-9F55-517731648668': [SF, ['source', 'این مستر با POI/Normal یکی است؛ نام فروشگاه در آن پنهان است.']],
  '56045C40-7EC5-4AB7-8A14-A132D3511AE1': [BADGE_59],
  '99973E3D-5B46-4C18-BA6D-EBBAF70D0DD4': [BADGE_59],
  '1F956E7E-BC4C-44BD-843A-A2844E748D14': [['source', 'نسخهٔ دوم Product Pic/Small با همین نام؛ نشان در اینجا گروه آزاد است، نه نمونهٔ سیمبل.']],
  '010F7DA2-C959-4036-B6D1-E1A10BE1705F': [BADGE_59, ['wcag', 'عنوان ۱۰ پیکسلی برای فارسی کوچک است. WCAG کمینهٔ اندازه ندارد، اما در ۱۰ پیکسل نقطه‌ها و دندانه‌ها گم می‌شوند؛ پیشنهاد: ۱۲.']],
  '811403E0-0303-4036-9872-91C4A192C1A5': [['source', 'نسخهٔ دوم Product Card/Small با همین نام.']],
  '641CDD78-38C5-4142-A597-74BBABBB77D6': [YEKAN, BADGE_59],
  '24B92E1D-830A-4F1A-87E4-8E0432DBC4CB': [OPEN_GREEN, ['instance', 'نقطهٔ وضعیت در دکمهٔ «بسته تا» بیضی شده (کش‌آمدن نمونه). کد دایره می‌کشد.']],
  '91C9981D-8479-45B5-ABA9-71CB166E7A74': [OPEN_GREEN],
  '6E4C8C1C-BA6E-4200-BEE7-239DD4B0D65F': [OPEN_GREEN],
  'C924F389-BA2C-46BF-AEFF-F855728BC745': [DIM_BLUE],
  'BF7AF680-AA4A-4DE6-B551-840D08F3D790': [DIM_BLUE],
  '09EB68E3-D89A-4C8C-9D08-9FFDE396B14B': [DIM_BLUE],
  '6867FED2-4D53-4C52-AD54-C93776F8E53B': [YEKAN, INK],
  '262C26ED-53BA-4CD8-B2C4-00322D945A1F': [YEKAN, INK, SPLIT_STRETCH],
  'C1BF73E9-DD90-4643-9141-D246A3347492': [YEKAN, INK, SPLIT_STRETCH],
  'D8CA050D-7C28-4F10-BEB8-97D42C72D086': [['source', 'اسکچ این را «Switch» نامیده؛ نام استاندارد SegmentedControl است. Switch در این سیستم کلید روشن/خاموش است.']],
  '2A388996-6F45-4842-8001-33C49394B07B': [['source', 'اسکچ این را «Switch» نامیده؛ نام استاندارد SegmentedControl است.']],
  '6462765E-2967-441D-A712-B646C6EB5B96': [['source', 'اسکچ این ردیف را «Tab» نامیده. در واقع ردیف ChoiceChip است؛ تب زیرخط‌دار یک کامپوننت جداست.']],
  '3C1C31C5-310C-48AE-B3E8-C31E30F506E0': [['source', 'نشان یک‌رنگ از روی نشان رنگی ساخته شده؛ شکل «Combined Shape» اسکچ برگ‌ها و حلقه را در یک مسیر دارد.']],
};
