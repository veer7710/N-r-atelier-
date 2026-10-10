import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, type Product, type Shade } from '../data/products';

type Depth = 'all' | 'light' | 'mid' | 'deep';
type Tone = 'all' | 'neutral' | 'warm' | 'cool';

const DEPTHS: { id: Depth; label: string }[] = [
  { id: 'all', label: 'All depths' },
  { id: 'light', label: 'Light' },
  { id: 'mid', label: 'Mid' },
  { id: 'deep', label: 'Deep' },
];
const TONES: { id: Tone; label: string }[] = [
  { id: 'all', label: 'All undertones' },
  { id: 'neutral', label: 'Neutral' },
  { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' },
];

type Entry = { product: Product; shade: Shade };

const ALL: Entry[] = PRODUCTS.flatMap((product) => product.shades.map((shade) => ({ product, shade })));

/** The shade index. Every swatch links to its own product page with that
 *  shade already selected, so discovery and purchase are one path. */
export function ShadeWall({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [depth, setDepth] = useState<Depth>('all');
  const [tone, setTone] = useState<Tone>('all');
  const [firstOnly, setFirstOnly] = useState(false);

  const entries = useMemo(() => {
    const out = ALL.filter(
      ({ shade }) =>
        (depth === 'all' || shade.depth === depth) &&
        (tone === 'all' || shade.undertone === tone) &&
        (!firstOnly || shade.release === 'first'),
    );
    return limit ? out.slice(0, limit) : out;
  }, [depth, tone, firstOnly, limit]);

  return (
    <div>
      {showFilters && (
        <>
          <div className="wall__filters" role="group" aria-label="Filter by depth">
            {DEPTHS.map((d) => (
              <button key={d.id} className="chip" aria-pressed={depth === d.id} onClick={() => setDepth(d.id)}>
                {d.label}
              </button>
            ))}
          </div>
          <div className="wall__filters" role="group" aria-label="Filter by undertone and release">
            {TONES.map((t) => (
              <button key={t.id} className="chip" aria-pressed={tone === t.id} onClick={() => setTone(t.id)}>
                {t.label}
              </button>
            ))}
            <button className="chip" aria-pressed={firstOnly} onClick={() => setFirstOnly((v) => !v)}>
              First release only
            </button>
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">{entries.length} shades shown</p>

      {entries.length === 0 ? (
        <p className="body" style={{ paddingBlock: '2rem' }}>
          No shade matches that combination yet. The first release is deliberately narrow —
          try clearing a filter.
        </p>
      ) : (
        <div className="swgrid">
          {entries.map(({ product, shade }) => (
            <Link
              key={`${product.id}-${shade.id}`}
              to={`/product/${product.slug}?shade=${shade.id}`}
              className="swcard"
            >
              <span
                className="swcard__disc"
                style={{ background: shade.hex, opacity: shade.release === 'first' ? 1 : 0.55 }}
                aria-hidden="true"
              />
              <span className="swcard__name">{shade.name}</span>
              <span className="swcard__meta">{product.name} · {shade.depth} · {shade.undertone}</span>
              {shade.release === 'later' && <span className="swcard__later">Second release</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
