/* SearchField — Torob Design System
 * ترب از جست‌وجو شروع می‌شود. سه حالت، یک کامپوننت.
 * Docs: /components/search-field.html
 * Replaces: Search bar/Default, Search bar/Typing, Search bar/Searched, Search bar
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function SearchField({ state = 'default', value, onChange, onClear, onVoice, onCamera, ...rest }) {
  const idle = state === 'default';
  return (
    <div className="t-search" data-state={state} role="search">
      <div className="t-input">
        {idle && <Search16 className="t-input__icon t-icon" />}
        <input className="t-input__el" type="search" value={value} onChange={onChange} aria-label="جستجو" {...rest} />
        <span className="t-search__actions">
          {idle ? <>
            <button className="t-search__tool" aria-label="جستجوی صوتی" onClick={onVoice}><Microphone20 className="t-icon" /></button>
            <button className="t-search__tool" aria-label="جستجو با تصویر" onClick={onCamera}><Camera16 className="t-icon" /></button>
          </> : <button className="t-search__clear" aria-label="پاک کردن جستجو" onClick={onClear}><Close20 className="t-icon" /></button>}
        </span>
      </div>
    </div>
  );
}
