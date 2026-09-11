/* SocialLink — Torob Design System
 * پیوند به پیام‌رسان فروشگاه. سه نشان، هیچ‌کدام قابل رنگ‌آمیزی دوباره.
 * Docs: /components/social-link.html
 * Replaces: Social-Icons/Bale, Social-Icons/Telegram, Social-Icons/Whatsapp
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

const MARK = { telegram: TelegramMark, whatsapp: WhatsappMark, bale: BaleMark };

export function SocialLink({ service, href, label, showLabel = true }) {
  const Mark = MARK[service];
  return (
    <a className="t-social" href={href} rel="noopener"
       aria-label={showLabel ? undefined : label}>
      <span className="t-social__mark"><Mark aria-hidden="true" /></span>
      {showLabel && label}
    </a>
  );
}
