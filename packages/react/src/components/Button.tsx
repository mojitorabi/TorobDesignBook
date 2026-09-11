/* Button — Torob Design System
 * یک کنش را اجرا می‌کند. در هر صفحه فقط یک دکمهٔ اصلی.
 * Docs: /components/button.html
 * Replaces: Button / Red / Default, Button / Red / Hover, Button / Red / Disable, Button/‌Blue/Default + Chevron, Button/‌Blue/Clicked + Chevron, Button/‌Blue/Hover + Chevron, Button/Black/Default, Button/Black/Hover, Button/Black/Disable, Button/Black ghost/Default, Button/Black ghost/Hover, Button/‌Blue ghost/Icon/Light, Button/‌Blue ghost/Icon/Dark, Button/Small/Blue/with-badge, Button/Xsmall/Secondary/Icon, Button/Normal/Primary/Icon, Button/Normal/Border/Icon, Button / Red / Icon, Button/‌Blue/Icon, Button/Black ghost/Icon
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

import { forwardRef } from 'react';
import clsx from 'clsx';

export const Button = forwardRef(function Button(
  { variant = 'neutral', size = 'lg', block, loading, disabled,
    iconStart, iconEnd, children, className, ...rest }, ref) {
  return (
    <button
      ref={ref}
      className={clsx('t-btn', `t-btn--${variant}`, `t-btn--${size}`, block && 't-btn--block', className)}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
});
