/* Carousel — Torob Design System
 * ریل افقی با نقطهٔ توقف: عکس‌های محصول، محصولات یک فروشگاه.
 * Docs: /components/carousel.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Carousel({ label, children }) {
  const ref = useRef(null);
  const by = dir => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="t-carousel">
      <div className="t-carousel__track" ref={ref} role="group" aria-label={label} tabIndex={0}>
        {Children.map(children, c => <div className="t-carousel__item">{c}</div>)}
      </div>
      <IconButton className="t-carousel__nav t-carousel__nav--prev" label="قبلی" onClick={() => by(1)}><ChevronStart /></IconButton>
      <IconButton className="t-carousel__nav t-carousel__nav--next" label="بعدی" onClick={() => by(-1)}><ChevronEnd /></IconButton>
    </div>
  );
}
