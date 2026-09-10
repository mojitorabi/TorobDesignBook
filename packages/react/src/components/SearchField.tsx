/* SearchField — Torob Design System
 * Torob starts at search. Three states, one component.
 * Docs: /components/search-field.html
 * Replaces: Search bar/Default, Search bar/Typing, Search bar/Searched, Search bar
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function SearchField({ state = 'default', value, onChange, onClear, tools = ['voice','camera'], ...rest }) {
  return (
    <div className="t-search" data-state={state} role="search">
      <div className="t-input">
        <SearchIcon className="t-input__icon" />
        <input className="t-input__el" type="search" value={value} onChange={onChange} {...rest} />
        <span className="t-search__actions">
          {state === 'default'
            ? tools.map(t => <IconButton key={t} size="sm" className="t-search__tool" label={TOOL_LABEL[t]}>{TOOL_ICON[t]}</IconButton>)
            : <IconButton size="sm" className="t-search__clear" label="پاک کردن جستجو" onClick={onClear}><CloseIcon /></IconButton>}
        </span>
      </div>
    </div>
  );
}
