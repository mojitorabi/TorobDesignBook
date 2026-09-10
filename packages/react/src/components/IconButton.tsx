/* IconButton — Torob Design System
 * A single icon as a target. Always carries an accessible name.
 * Docs: /components/icon-button.html
 * Replaces: Button/Icon/Icon, Button/Icon/Blue Icon, Button/Icon/Ghost Icon, Button/Icon/Icon Rounded, Button/Icon
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function IconButton({ variant = 'ghost', size = 'md', round, label, children, className, ...rest }) {
  return (
    <button
      className={clsx('t-icon-btn', variant !== 'ghost' && `t-icon-btn--${variant}`,
                      size === 'sm' && 't-icon-btn--sm', round && 't-icon-btn--round', className)}
      aria-label={label}
      {...rest}
    >{children}</button>
  );
}
