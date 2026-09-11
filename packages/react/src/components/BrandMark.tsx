/* BrandMark — Torob Design System
 * نشان ترب و نشان ضمانت. تنها بخشی از سیستم که با پوسته رنگ عوض نمی‌کند.
 * Docs: /components/brand-mark.html
 * Replaces: Torob_Logo, Brand / Logo, Torob star hologram
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

import guarantee from '@torob/brand/torob-guarantee.svg';

export function BrandMark({ size = 'md', as = 'span', ...rest }) {
  const Tag = as === 'link' ? 'a' : 'span';
  return (
    <Tag className={clsx('t-brand', size !== 'md' && `t-brand--${size}`)} {...rest}>
      <TorobLogo aria-hidden="true" />
    </Tag>
  );
}

/* The mark carries the claim on its own, so it needs a name when it stands alone. */
export function GuaranteeMark({ size = 24, labelled = false }) {
  return (
    <span className="t-guarantee" style={{ '--_s': `${Math.max(size, 16)}px` }}>
      <img src={guarantee} alt={labelled ? '' : 'ضمانت ترب'} role={labelled ? undefined : 'img'} />
    </span>
  );
}
