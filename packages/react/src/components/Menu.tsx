/* Menu — Torob Design System
 * A short list of actions or options anchored to a trigger.
 * Docs: /components/menu.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function Menu({ trigger, items, align = 'start' }) {
  const [open, setOpen] = useState(false);
  const isPhone = useMediaQuery('(max-width: 767px)');
  if (isPhone) return <><span onClick={() => setOpen(true)}>{trigger}</span>
    <BottomSheet open={open} onClose={() => setOpen(false)} title="عملیات">
      {items.map(i => <ListItem key={i.label} title={i.label} lead={i.icon} onClick={i.onSelect} />)}
    </BottomSheet></>;
  return (
    <Popover open={open} onOpenChange={setOpen} trigger={trigger} align={align}>
      <div className="t-popover" role="menu">
        {items.map(i => i.separator
          ? <div key={i.key} className="t-menu-sep" role="separator" />
          : <button key={i.label} role="menuitem" onClick={i.onSelect}
                    className={clsx('t-menu-item', i.tone === 'critical' && 't-menu-item--critical')}>
              {i.icon}{i.label}
            </button>)}
      </div>
    </Popover>
  );
}
