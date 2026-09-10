/* QuantityStepper — Torob Design System
 * Increment and decrement a small integer.
 * Docs: /components/quantity-stepper.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="t-stepper">
      <button className="t-stepper__btn" aria-label="کاهش تعداد"
              disabled={value <= min} onClick={() => onChange(value - 1)}><MinusIcon /></button>
      <span className="t-stepper__value" aria-live="polite">{toFa(value)}</span>
      <button className="t-stepper__btn" aria-label="افزایش تعداد"
              disabled={value >= max} onClick={() => onChange(value + 1)}><PlusIcon /></button>
    </div>
  );
}
