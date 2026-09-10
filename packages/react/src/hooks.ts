/* Torob Design System — hooks the overlay components need.
   These are the pieces that make a dialog actually accessible; they are not
   optional extras. */
import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
  'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Trap focus inside `ref` while `active`, and return it to the trigger on close. */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const first = root.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const [a, z] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [active, ref]);
}

/** Lock body scroll without the layout shifting as the scrollbar disappears. */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { overflow, paddingInlineEnd } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingInlineEnd = `${gap}px`;
    return () => { document.body.style.overflow = overflow; document.body.style.paddingInlineEnd = paddingInlineEnd; };
  }, [active]);
}

/** Escape to dismiss. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, onEscape]);
}

export function useMediaQuery(query: string): boolean {
  const ref = useRef(typeof matchMedia === 'function' ? matchMedia(query).matches : false);
  const [, force] = useReducerLite();
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => { ref.current = mq.matches; force(); };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return ref.current;
}

function useReducerLite(): [number, () => void] {
  const r = useRef(0);
  const set = useRef<(n: number) => void>(() => {});
  return [r.current, () => { r.current++; set.current(r.current); }];
}
