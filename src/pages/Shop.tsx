import { BtnLink } from '../components/Btn';
import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { BUNDLES, PRODUCTS, bundleSeparatePrice, byId, displayShade, findShade, launchSkuCount } from '../data/products';
import { ProductRender } from '../render/products';
import { money, moneyShort } from '../utils/format';
import { Link } from 'react-router-dom';

export function Shop() {
  usePageMeta('Shop the range', 'All five NŌR ATELIER lip products — pencil, satin lipstick, lip oil, gloss and stain. Thirteen shades at first release.');

  return (
    <>
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
        <div className="phead__grid" style={{ marginTop: '1.5rem' }}>
          <div>
            <Eyebrow>Shop</Eyebrow>
            <h1 className="display-l">The whole range,<br />five products deep.</h1>
          </div>
          <p className="body">
            Every product is shown in a first-release shade. {launchSkuCount} of the twenty-five
            shades are available at launch; the rest are drawn so the range reads whole, and are
            marked where they appear.
          </p>
        </div>
      </section>

      <section className="shell section section--flush-t">
        <div className="grid-3">
          {PRODUCTS.map((p, i) => {
            const s = displayShade(p);
            return (
              <Reveal key={p.id} delay={(i % 3) * 70}>
                <ProductCard
                  product={p}
                  shade={s}
                  tag={`${p.index} · ${p.type}`}
                  set={p.id === 'veil' ? 'stone' : 'light'}
                />
              </Reveal>
            );
          })}
          {/* The fifth card sits beside a panel rather than leaving a hole in the grid. */}
          <Reveal delay={140}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'var(--s-5)', background: 'var(--c-paper)', borderRadius: 'var(--r-1)' }}>
              <div>
                <Eyebrow>Not sure where to start</Eyebrow>
                <p className="display-s">Work from the pencil outwards.</p>
                <p className="body" style={{ marginTop: '0.8rem', fontSize: 'var(--t-body-s)' }}>
                  SCULPT sets the shape. SIGNATURE fills it. The other three change the finish.
                  If you only buy one thing, buy the pencil.
                </p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'grid', gap: '0.5rem' }}>
                <BtnLink to="/collections/sculpt" size="sm" block>Start with SCULPT</BtnLink>
                <BtnLink to="/shades" size="sm" variant="outline" block>Browse by shade</BtnLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Bundles */}
      <section className="section" style={{ background: 'var(--c-cream)' }} aria-labelledby="sets-h">
        <div className="shell">
          <div className="phead__grid" style={{ marginBottom: 'var(--s-6)' }}>
            <div>
              <Eyebrow>Sets</Eyebrow>
              <h2 id="sets-h" className="display-l">Four pairings<br />that make sense.</h2>
            </div>
            <p className="body">
              Set prices are below the sum of the items in them, and that sum is calculated from
              the individual prices on this site — not from an invented recommended price.
            </p>
          </div>

          <div className="grid-2">
            {BUNDLES.map((b, i) => {
              const separate = bundleSeparatePrice(b);
              const saving = separate - b.price;
              return (
                <Reveal key={b.id} delay={(i % 2) * 80}>
                  <article style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1fr)', gap: 'var(--s-5)', alignItems: 'center', padding: 'var(--s-4)', border: '1px solid var(--c-line)', background: 'var(--c-ivory)', borderRadius: 'var(--r-1)', height: '100%' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {b.contents.slice(0, 2).map(([cat, shadeId]) => {
                        const p = byId(cat)!;
                        const s = findShade(p, shadeId)!;
                        return (
                          <div key={cat} style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden', background: 'var(--c-stone)', borderRadius: 'var(--r-1)' }}>
                            <ProductRender category={cat} shadeHex={s.hex} view="closed" set="stone" alt={`${p.name} in ${s.name}`} />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <p className="label label--ink" style={{ fontSize: '0.75rem' }}>{b.name}</p>
                      <p className="micro" style={{ marginTop: '0.4rem', lineHeight: 1.55 }}>{b.short}</p>
                      <ul style={{ listStyle: 'none', marginTop: '0.75rem', display: 'grid', gap: '0.25rem' }}>
                        {b.contents.map(([cat, shadeId]) => {
                          const p = byId(cat)!;
                          const s = findShade(p, shadeId)!;
                          return (
                            <li key={cat} className="micro" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.hex, boxShadow: 'inset 0 0 0 1px rgba(38,27,23,0.2)' }} aria-hidden="true" />
                              {p.name} — {s.name}
                            </li>
                          );
                        })}
                      </ul>
                      <p style={{ marginTop: '0.9rem', fontFamily: 'var(--f-display)', fontSize: '1.3rem' }}>
                        {moneyShort(b.price)}
                      </p>
                      <p className="micro">
                        Bought separately {money(separate)} · {money(saving)} less as a set
                      </p>
                      <p className="micro" style={{ marginTop: '0.6rem', color: 'var(--c-oxblood)' }}>
                        Concept only — sets are not in the bag until pack costs are quoted.
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="notice" style={{ marginTop: 'var(--s-6)' }}>
            Sets are deliberately not purchasable in this prototype. A set needs its own outer
            carton and its own cost line, and neither has been quoted — so the price above is a
            working number, not an offer. Individual products can be added to the bag.{' '}
            <Link to="/faq" className="link-u">Why</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
