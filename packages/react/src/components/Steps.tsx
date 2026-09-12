/* Steps — Torob Design System
 * یک کار چندمرحله‌ای، با جایی که هستید و راهی که مانده.
 * Docs: /components/steps.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Steps({ steps, current = 0, onJump }) {
  return (
    <nav className="t-steps" aria-label="مراحل">
      {steps.map((s, i) => (
        <Fragment key={s.label}>
          {i > 0 && <span className="t-steps__bar" />}
          <span className="t-steps__item"
                data-state={i < current ? 'done' : i === current ? 'current' : undefined}
                aria-current={i === current ? 'step' : undefined}>
            <span className="t-steps__dot">{i < current ? <CheckIcon /> : toFa(i + 1)}</span>
            <span className="t-body-sm">{s.label}</span>
            <span className="t-visually-hidden">
              {i < current ? 'انجام شد' : i === current ? 'در حال انجام' : 'مانده'}
            </span>
          </span>
        </Fragment>
      ))}
    </nav>
  );
}
