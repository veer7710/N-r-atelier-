import { Link, useParams } from 'react-router-dom';
import { BtnLink, Cta } from '../components/Btn';
import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { Reveal } from '../components/Reveal';
import { PRODUCTS, byId, displayShade } from '../data/products';
import { ProductRender } from '../render/products';
import { moneyShort } from '../utils/format';
import { NotFound } from './NotFound';

export function Collection() {
  const { id } = useParams();
  const product = id ? byId(id) : undefined;

  usePageMeta(
    product ? `${product.name} — ${product.type}` : 'Collection',
    product?.short,
  );

  if (!product) return <NotFound />;

  const firstShades = product.shades.filter((s) => s.release === 'first');
  const others = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <>
      {/* ------------------------------------------------- Collection header */}
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.name }]} />
        <div className="collhero" style={{ marginTop: '1.75rem' }}>
          <div>
            <Eyebrow no={product.index}>{product.type}</Eyebrow>
            <h1 className="display-xl" style={{ marginBottom: '1.25rem' }}>{product.name}</h1>
            <p className="lede">{product.long}</p>
            <dl className="hero__meta" style={{ marginTop: '2rem' }}>
              <div><dt>Price</dt><dd>{moneyShort(product.price)}</dd></div>
              <div><dt>Shades</dt><dd>{product.shades.length}</dd></div>
              <div><dt>At launch</dt><dd>{firstShades.length}</dd></div>
            </dl>
            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <BtnLink to={`/product/${product.slug}?shade=${firstShades[0].id}`} size="lg">
                Choose a shade
              </BtnLink>
              <Cta to="/shades">All shades</Cta>
            </div>
          </div>
          <Reveal className="collhero__art">
            <ProductRender
              category={product.id}
              shadeHex={firstShades[0].hex}
              view="open"
              set={product.id === 'veil' ? 'stone' : 'light'}
              alt={`${product.name} ${product.type} in ${firstShades[0].name}, open`}
            />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------- The role in the range */}
      <section className="section--tight" style={{ background: 'var(--c-paper)' }}>
        <div className="shell" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.42fr) minmax(0,1fr)', gap: 'var(--gutter)', alignItems: 'baseline' }}>
          <p className="label">What it is for</p>
          <p className="display-s" style={{ maxWidth: '44ch' }}>{product.role}</p>
        </div>
      </section>

      {/* --------------------------------------------------- Shade by shade
          Alternating rows rather than a flat grid: each shade gets a drawn
          render in a view chosen for that category, and real copy. */}
      <section className="shell section" aria-labelledby="shades-h">
        <div className="phead__grid" style={{ marginBottom: 'var(--s-5)' }}>
          <div>
            <Eyebrow>Shade by shade</Eyebrow>
            <h2 id="shades-h" className="display-l">{product.shades.length} shades,<br />described properly.</h2>
          </div>
          <p className="body">
            Each render is drawn from the shade's own colour value, so a clear product reads clear
            and a deep one reads deep. On-screen colour still varies by display.
          </p>
        </div>

        <div>
          {product.shades.map((s, i) => {
            const flip = i % 2 === 1;
            const view = (['closed', 'open', 'texture', 'macro', 'closed'] as const)[i % 5];
            const later = s.release === 'later';
            return (
              <Reveal key={s.id} className={`shaderow ${flip ? 'shaderow--flip' : ''}`}>
                <div className={`shaderow__art ${i % 2 === 1 ? 'shaderow__art--sm' : ''}`}>
                  <ProductRender
                    category={product.id}
                    shadeHex={s.hex}
                    view={view}
                    set={view === 'macro' ? (product.id === 'veil' ? 'stone' : 'dark') : product.id === 'veil' ? 'stone' : 'light'}
                    alt={`${product.name} in ${s.name} — ${view === 'texture' ? 'texture swatch' : view === 'macro' ? 'close detail' : view === 'open' ? 'open' : 'capped'}`}
                  />
                </div>
                <div>
                  <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>
                    <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="macron" aria-hidden="true" />
                    <span className="label">{s.depth} · {s.undertone}</span>
                  </p>
                  <h3 className="display-m" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span
                      style={{ width: 22, height: 22, borderRadius: '50%', background: s.hex, boxShadow: 'inset 0 0 0 1px rgba(38,27,23,0.2)', flex: '0 0 auto' }}
                      aria-hidden="true"
                    />
                    {s.name}
                  </h3>
                  <p className="body" style={{ marginTop: '0.75rem', maxWidth: '44ch' }}>{s.description}</p>
                  <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {later ? (
                      <>
                        <span className="flag flag--open">Second release</span>
                        <span className="micro">Not available at launch — drawn here as range intent.</span>
                      </>
                    ) : (
                      <BtnLink to={`/product/${product.slug}?shade=${s.id}`} size="sm">
                        {moneyShort(product.price)} — view {s.name}
                      </BtnLink>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------- Rest of the range */}
      <section className="section" style={{ background: 'var(--c-cream)' }} aria-labelledby="rest-h">
        <div className="shell">
          <Eyebrow>The rest of the range</Eyebrow>
          <h2 id="rest-h" className="display-m" style={{ marginBottom: 'var(--s-6)' }}>
            How {product.name} sits beside the others.
          </h2>
          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
            {others.map((p) => {
              const s = displayShade(p);
              return (
                <Link key={p.id} to={`/collections/${p.id}`} className="rcard">
                  <div className="rcard__frame">
                    <ProductRender category={p.id} shadeHex={s.hex} view="closed" set={p.id === 'veil' ? 'stone' : 'light'} alt={`${p.name} ${p.type}`} />
                    <span className="rcard__no" aria-hidden="true">{p.index}</span>
                  </div>
                  <p className="rcard__name">{p.name}</p>
                  <p className="rcard__type">{p.type} · {moneyShort(p.price)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
