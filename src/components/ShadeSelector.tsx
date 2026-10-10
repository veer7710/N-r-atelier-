import type { Shade } from '../data/products';
import { IconTick } from './Icons';

/* Shade selection, accessibly.
   · The swatch is a visual aid — the shade NAME is in every button's
     accessible name, so the control never relies on colour alone.
   · The selected state is carried by a ring AND a tick, not just colour.
   · Shades not in the first release are marked in the label, struck
     through visually, and cannot be selected. */
export function ShadeSelector({
  shades, selectedId, onSelect, label = 'Shade',
}: {
  shades: Shade[];
  selectedId: string;
  onSelect: (id: string) => void;
  label?: string;
}) {
  return (
    <div className="shades" role="group" aria-label={`${label} — ${shades.length} shades`}>
      {shades.map((s) => {
        const later = s.release === 'later';
        const selected = s.id === selectedId;
        return (
          <button
            key={s.id}
            type="button"
            className={`sw-btn ${later ? 'sw-btn--later' : ''}`}
            aria-pressed={selected}
            disabled={later}
            title={later ? `${s.name} — second release, not yet available` : s.name}
            onClick={() => onSelect(s.id)}
          >
            <span className="sw-btn__dot" style={{ background: s.hex }} aria-hidden="true" />
            <span className="sw-btn__tick" aria-hidden="true"><IconTick /></span>
            <span className="sr-only">
              {s.name}
              {later ? ' — second release, not yet available' : ''}
              {selected ? ' — selected' : ''}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Name, description and the on-screen-colour caveat. Lives under the swatches. */
export function ShadeReadout({ shade }: { shade: Shade }) {
  return (
    <div className="shade-meta" aria-live="polite">
      <p className="shade-meta__name">{shade.name}</p>
      <p className="shade-meta__desc">{shade.description}</p>
    </div>
  );
}
