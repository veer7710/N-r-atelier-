import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductRender } from '../render/products';
import { moneyShort } from '../utils/format';
import { IconClose } from './Icons';

type Hit = {
  key: string;
  to: string;
  title: string;
  meta: string;
  price: number;
  category: (typeof PRODUCTS)[number]['id'];
  hex: string;
  score: number;
};

/** Searches product names, categories, shade names, shade descriptions and
 *  tags. Shade matches are ranked above product matches, because someone
 *  typing "merlot" wants that shade, not the whole pencil collection. */
function search(q: string): Hit[] {
  const query = q.trim().toLowerCase();
  if (query.length < 2) return [];
  const terms = query.split(/\s+/).filter(Boolean);
  const hits: Hit[] = [];

  for (const p of PRODUCTS) {
    const productHay = [p.name, p.type, p.short, ...p.tags].join(' ').toLowerCase();
    const productScore = terms.reduce((n, t) => n + (productHay.includes(t) ? 1 : 0), 0);

    for (const s of p.shades) {
      const shadeHay = `${s.name} ${s.description} ${p.name} ${p.type}`.toLowerCase();
      const shadeScore = terms.reduce(
        (n, t) => n + (s.name.toLowerCase().startsWith(t) ? 6 : s.name.toLowerCase().includes(t) ? 4 : shadeHay.includes(t) ? 1 : 0),
        0,
      );
      if (shadeScore >= terms.length) {
        hits.push({
          key: `${p.id}-${s.id}`,
          to: `/product/${p.slug}?shade=${s.id}`,
          title: `${p.name} — ${s.name}`,
          meta: s.release === 'first' ? `${p.type} · ${s.description}` : `${p.type} · Second release`,
          price: p.price,
          category: p.id,
          hex: s.hex,
          score: shadeScore + 2,
        });
      }
    }

    if (productScore >= terms.length) {
      const s = p.shades.find((x) => x.release === 'first') ?? p.shades[0];
      hits.push({
        key: p.id,
        to: `/collections/${p.id}`,
        title: `${p.name} ${p.type}`,
        meta: `${p.shades.length} shades · ${p.short}`,
        price: p.price,
        category: p.id,
        hex: s.hex,
        score: productScore,
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 10);
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const hits = useMemo(() => search(q), [q]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => input.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => { if (!open) setQ(''); }, [open]);

  const go = (to: string) => { onClose(); navigate(to); };

  return (
    <div className={`search ${open ? 'is-open' : ''}`} role="dialog" aria-modal={open} aria-label="Search" inert={!open}>
      <div className="shell">
        <div className="search__head">
          <label htmlFor="search-field" className="sr-only">Search products and shades</label>
          <input
            id="search-field"
            ref={input}
            className="search__field"
            type="search"
            placeholder="Search a shade, a finish, a product"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
            onKeyDown={(e) => { if (e.key === 'Enter' && hits[0]) go(hits[0].to); }}
          />
          <button className="icon-btn" onClick={onClose} aria-label="Close search"><IconClose /></button>
        </div>

        <div className="search__results">
          {q.trim().length < 2 && (
            <div style={{ paddingTop: '1.5rem' }}>
              <p className="label">Try</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.9rem' }}>
                {['Merlot', 'clear gloss', 'satin', 'lip oil', 'nude', 'stain'].map((t) => (
                  <button key={t} className="btn btn--outline btn--sm" onClick={() => setQ(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {q.trim().length >= 2 && hits.length === 0 && (
            <div style={{ paddingTop: '1.5rem', maxWidth: '44ch' }}>
              <p className="display-s">No match for “{q.trim()}”.</p>
              <p className="body" style={{ marginTop: '0.6rem' }}>
                The range is five products and twenty-five shades. Try a shade name, a finish
                — satin, gloss, stain — or just “lip”.
              </p>
            </div>
          )}

          {hits.map((h) => (
            <button key={h.key} className="search__row" onClick={() => go(h.to)} style={{ background: 'none', border: 0, borderBottom: '1px solid var(--c-line)', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
              <span className="search__thumb">
                <ProductRender category={h.category} shadeHex={h.hex} view="closed" set="stone" alt="" />
              </span>
              <span>
                <span style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {h.title}
                </span>
                <span className="micro" style={{ display: 'block', marginTop: '0.2rem' }}>{h.meta}</span>
              </span>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem' }}>{moneyShort(h.price)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
