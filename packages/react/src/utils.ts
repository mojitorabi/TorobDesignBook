/* Torob Design System — shared utilities. */

/** Minimal class joiner. Drop this and import clsx if you already depend on it. */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

const FA = '۰۱۲۳۴۵۶۷۸۹';

/** Latin digits → Persian-Indic. Every product-surface number goes through this. */
export const toFa = (n: number | string): string =>
  String(n).replace(/\d/g, d => FA[+d]);

/** A price, formatted the Torob way: Persian numerals, ٬ thousands separator. */
export const formatPrice = (n: number): string =>
  toFa(n.toLocaleString('en-US')).replace(/,/g, '٬');

/** A distance, in the unit the shopper expects. */
export const formatDistance = (metres: number): string =>
  metres < 1000 ? `${toFa(Math.round(metres))} متر` : `${toFa((metres / 1000).toFixed(1))} کیلومتر`;
