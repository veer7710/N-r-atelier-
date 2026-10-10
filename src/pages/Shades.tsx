import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { ShadeWall } from '../components/ShadeWall';
import { PRODUCTS, displayShade, launchSkuCount } from '../data/products';
import { ProductRender } from '../render/products';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

export function Shades() {
  usePageMeta('The shade index', 'All twenty-five NŌR ATELIER lip shades, filterable by depth and undertone. Thirteen available at first release.');

  return (
    <>
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: 'Shade index' }]} />
        <div className="phead__grid" style={{ marginTop: '1.5rem' }}>
          <div>
            <Eyebrow>The shade index</Eyebrow>
            <h1 className="display-l">Twenty-five shades,<br />five formats.</h1>
          </div>
          <p className="body">
            The same name can mean different things in different formats — Toffee in a pencil is
            opaque, Toffee Drip in a gloss is sheer. Each entry says which product it belongs to.
            {' '}{launchSkuCount} are in the first release.
          </p>
        </div>
      </section>

      <section className="shell section section--flush-t">
        <ShadeWall />
      </section>

      {/* One texture render per category, so the formats can be compared
          side by side rather than described. */}
      <section className="section" style={{ background: 'var(--c-paper)' }} aria-labelledby="fin-h">
        <div className="shell">
          <Eyebrow>Finishes, compared</Eyebrow>
          <h2 id="fin-h" className="display-l" style={{ marginBottom: 'var(--s-6)' }}>
            Five formats, one surface.
          </h2>
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {PRODUCTS.map((p, i) => {
              const s = displayShade(p);
              return (
                <Reveal key={p.id} delay={i * 60}>
                  <Link to={`/collections/${p.id}`} className="pcard">
                    <div className="pcard__frame">
                      <ProductRender
                        category={p.id}
                        shadeHex={s.hex}
                        view="texture"
                        set={p.id === 'veil' ? 'light' : 'stone'}
                        alt={`${p.name} ${p.type} texture in ${s.name}`}
                      />
                    </div>
                    <div className="pcard__body">
                      <div>
                        <p className="pcard__name">{p.name}</p>
                        <p className="pcard__meta">{s.name}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
