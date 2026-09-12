/* DateField — Torob Design System
 * تاریخ شمسی. تقویم میلادی در پنل فروشنده قابل استفاده نیست.
 * Docs: /components/date-field.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

/* Jalali conversion belongs in a library, not in the component.
   The component's job is the interaction and the accessible names. */
import { toJalali, jalaliMonthName, jalaliDaysInMonth } from '@torob/date';

export function DateField({ value, onChange, range, presets = true }) {
  const [y, mo] = value.split('/').map(Number);
  const days = jalaliDaysInMonth(y, mo);
  return (
    <div className="t-cal__grid" role="grid" aria-label={`${jalaliMonthName(mo)} ${toFa(y)}`}>
      {/* شنبه first — the Iranian week does not start on Sunday.
          Every cell sits inside a row: a grid without rows is not a grid. */}
      <div className="t-cal__row" role="row">
        {['ش','ی','د','س','چ','پ','ج'].map((d, i) => (
          <div key={d} className="t-cal__dow" role="columnheader" data-weekend={i >= 5 || undefined}>{d}</div>
        ))}
      </div>
      {weeksOf(y, mo, days).map((week, r) => (
        <div key={r} className="t-cal__row" role="row">
          {week.map(day => day === null ? <div key={`e${r}`} /> : (
            <button key={day} className="t-cal__day" role="gridcell"
                    aria-selected={day === Number(value.split('/')[2])}
                    aria-label={`${toFa(day)} ${jalaliMonthName(mo)} ${toFa(y)}`}
                    onClick={() => onChange(`${y}/${mo}/${day}`)}>
              {toFa(day)}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
