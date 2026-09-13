/* IconButton — Torob Design System
 * یک آیکون به‌عنوان هدف لمس. همیشه نام دسترس‌پذیر دارد.
 * Docs: /components/icon-button.html
 * Replaces: Button/Icon/Icon, Button/Icon/Blue Icon, Button/Icon/Ghost Icon, Button/Icon/Icon Rounded, Button/Icon
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function IconButton({ variant = 'ghost', size = 'md', round, label, children, className, ...rest }) {
  return (
    <button
      className={clsx('t-icon-button', variant !== 'ghost' && `t-icon-button--${variant}`,
                      size === 'sm' && 't-icon-button--sm', round && 't-icon-button--round', className)}
      aria-label={label}
      {...rest}
    >{children}</button>
  );
}
