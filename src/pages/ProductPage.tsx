import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Btn, BtnLink } from '../components/Btn';
import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { ProductCard } from '../components/ProductCard';
import { QuantityStepper } from '../components/QuantityStepper';
import { Reveal } from '../components/Reveal';
import { ShadeReadout, ShadeSelector } from '../components/ShadeSelector';
import { useBag } from '../context/BagContext';
import { byId, bySlug, findShade } from '../data/products';
import { ProductRender } from '../render/products';
import { money } from '../utils/format';
import { NotFound } from './NotFound';

/* Each category gets its own detail band, so a lip pencil page is not a
   lipstick page with the title swapped. The copy and the two renders
   change with the product. */
const DETAIL: Record<string, { title: string; body: string; aLabel: string; bLabel: string }> = {
  sculpt: {
    title: 'The tip does the work.',
    body:
      'SCULPT is designed to be sharpened, not twisted up. A wood barrel holds a finer point than ' +
      'a retractable one, which is the whole reason for choosing it — the edge of a lip is a line, ' +
      'and a line needs a point. The trade-off is that you need a sharpener.',
    aLabel: 'Sharpened point, close',
    bLabel: 'Two passes, drawn',
  },
  signature: {
    title: 'A slant cut, and some weight.',
    body:
      'The bullet is cut on a slant so one stroke covers the width of a lip. The case is the ' +
      'heaviest component in the range on purpose: a lipstick gets taken out in front of people, ' +
      'and the moment it is set down on a table is part of the product.',
    aLabel: 'The slant cut, close',
    bLabel: 'Satin, two passes',
  },
  elixir: {
    title: 'Oil, not gloss.',
    body:
      'A brush rather than a doe-foot, and a thinner fluid than GLASS — less tack, more slip, no ' +
      'mirror required. The vial is frosted glass so the shade reads through the wall before the ' +
      'cap comes off. Glass is left untinted so it can go over anything else here.',
    aLabel: 'Loaded brush',
    bLabel: 'Pooled, wet',
  },
  glass: {
    title: 'The tube is the swatch.',
    body:
      'GLASS is the one product in the range housed in clear material instead of lacquer, because ' +
      'the shade is the proposition and hiding it would be perverse. Thicker and more cushioned ' +
      'than ELIXIR. Crystal is a true clear — no tint, no shimmer.',
    aLabel: 'Loaded doe-foot',
    bLabel: 'High shine, pooled',
  },
  veil: {
    title: 'Colour, with nothing on top.',
    body:
      'A flat precision tip lays a thin wash down rather than painting it on. One pass reads as a ' +
      'flush; three build towards a lipstick. No shine at all, which is what separates VEIL from ' +
      'everything else in the range.',
    aLabel: 'The precision tip',
    bLabel: 'One pass, feathered',
  },
};

export function ProductPage() {
  const { slug } = useParams();
  const product = slug ? bySlug(slug) : undefined;
  const [params, setParams] = useSearchParams();
  const { add } = useBag();

  const firstAvailable = product?.shades.find((s) => s.release === 'first') ?? product?.shades[0];
  const requested = params.get('shade');
  const shade =
    (product && requested && findShade(product, requested)) || firstAvailable;

  const [qty, setQty] = useState(1);
  const [activeView, setActiveView] = useState(0);

  usePageMeta(
    product ? `${product.name} ${product.type}${shade ? ` — ${shade.name}` : ''}` : 'Product',
    product?.short,
  );

  const related = useMemo(
    () => (product ? product.related.map((r) => byId(r)).filter(Boolean) : []),
    [product],
  );

  if (!product || !shade) return <NotFound />;

  const unavailable = shade.release === 'later';
  const detail = DETAIL[product.id];
  const view = product.views[activeView] ?? product.views[0];

  const selectShade = (id: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('shade', id);
        return next;
      },
      { replace: true },
    );
    setActiveView(0);
  };

  return (
    <>
      <section className="shell" style={{ paddingTop: 'var(--s-5)' }}>
        <Crumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: product.name, to: `/collections/${product.id}` },
            { label: shade.name },
          ]}
        />
      </section>

      {/* ---------------------------------------------- Gallery + buy panel */}
      <section className="shell pdp">
        <div className="pdp__gallery">
          <div className="pdp__thumbs">
            {product.views.map((v, i) => (
              <button
                key={v.view}
                className="pdp__thumb"
                aria-current={i === activeView}
                aria-label={`View ${i + 1} of ${product.views.length} — ${v.caption}`}
                onClick={() => setActiveView(i)}
              >
                <ProductRender
                  category={product.id}
                  shadeHex={shade.hex}
                  view={v.view}
                  set={v.set}
                  alt=""
                />
              </button>
            ))}
          </div>
          <div className="pdp__main">
            <ProductRender
              category={product.id}
              shadeHex={shade.hex}
              view={view.view}
              set={view.set}
              alt={`${product.name} ${product.type} in ${shade.name} — ${view.caption}`}
            />
            <span className="pdp__caption">{view.caption}</span>
          </div>
        </div>

        <div className="pdp__info">
          <Eyebrow no={product.index}>{product.type}</Eyebrow>
          <h1 className="display-l" style={{ marginBottom: '0.75rem' }}>{product.name}</h1>
          <p className="pdp__price">{money(product.price)}</p>
          <p className="micro" style={{ marginTop: '0.3rem' }}>
            Provisional price, includes UK VAT at 20%.
          </p>

          <div className="pdp__block">
            <p className="label label--ink" style={{ marginBottom: '0.9rem' }}>
              Shade — {product.shades.filter((s) => s.release === 'first').length} of {product.shades.length} available
            </p>
            <ShadeSelector
              shades={product.shades}
              selectedId={shade.id}
              onSelect={selectShade}
              label={`${product.name} shade`}
            />
            <ShadeReadout shade={shade} />
            <p className="shade-note">
              Swatches are drawn for a screen. Colour varies between displays, and a lip is not a
              screen.
            </p>
          </div>

          <div className="pdp__block">
            {unavailable ? (
              <>
                <p className="notice notice--inline">
                  <strong style={{ color: 'var(--c-oxblood)', fontWeight: 600 }}>{shade.name} is a second-release shade. </strong>
                  It is drawn here so the range reads whole, but it is not part of the first
                  production run and cannot be added to a bag.
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <Btn variant="outline" block onClick={() => selectShade(firstAvailable!.id)}>
                    Show {firstAvailable!.name} instead
                  </Btn>
                </div>
              </>
            ) : (
              <>
                <div className="pdp__buy">
                  <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${product.name} in ${shade.name}`} />
                  <Btn onClick={() => { add(product.id, shade.id, qty); setQty(1); }}>
                    Add to bag — {money(product.price * qty)}
                  </Btn>
                </div>
                <p className="micro" style={{ marginTop: '0.85rem' }}>
                  The bag works. Checkout does not — there is no payment system and no stock.{' '}
                  <Link to="/faq" className="link-u">What that means</Link>.
                </p>
              </>
            )}
          </div>

          <div className="pdp__block">
            <p className="body body--ink" style={{ color: 'var(--c-espresso)' }}>{product.long}</p>
            <p className="body" style={{ marginTop: '1rem' }}>
              <strong style={{ color: 'var(--c-espresso)', fontWeight: 500 }}>Its job in the range. </strong>
              {product.role}
            </p>
          </div>

          {/* Design decisions and open questions are separated on purpose:
              one list is what NŌR controls, the other is what it does not
              know yet. Neither is dressed up as the other. */}
          <div style={{ marginTop: 'var(--s-6)' }}>
            <Accordion>
              <AccordionItem title="Specification" defaultOpen>
                <ul className="facts">
                  {product.facts.map((f) => (
                    <li key={f.label}>
                      <span className="facts__k">{f.label}</span>
                      <span className="facts__v">
                        {f.value}
                        {f.status === 'unconfirmed' && <span className="flag flag--open">Not confirmed</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="micro" style={{ marginTop: '1rem' }}>
                  Items marked “not confirmed” have no supplier quote or test result behind them.
                  No ingredient list, net weight or wear claim is published, because none exists.
                </p>
              </AccordionItem>

              <AccordionItem title="What is still open">
                <ul style={{ listStyle: 'none', display: 'grid', gap: '0.7rem' }}>
                  {product.openQuestions.map((q, i) => (
                    <li key={q} style={{ display: 'grid', gridTemplateColumns: '1.6rem 1fr', gap: '0.6rem', fontSize: 'var(--t-body-s)', color: 'var(--c-cocoa-dk)', lineHeight: 1.55 }}>
                      <span className="index-no">{String(i + 1).padStart(2, '0')}</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Delivery and returns">
                <p className="body" style={{ fontSize: 'var(--t-body-s)' }}>
                  Not yet set. No carrier has been chosen, no rates negotiated and no returns
                  process written. Draft intentions are on the{' '}
                  <Link to="/delivery" className="link-u">delivery</Link> and{' '}
                  <Link to="/returns" className="link-u">returns</Link> pages, clearly marked.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* -------------------------------------- Category-specific detail band */}
      <section className="section" style={{ background: 'var(--c-paper)' }} aria-labelledby="detail-h">
        <div className="shell">
          <div className="phead__grid" style={{ marginBottom: 'var(--s-6)' }}>
            <div>
              <Eyebrow>Detail</Eyebrow>
              <h2 id="detail-h" className="display-l">{detail.title}</h2>
            </div>
            <p className="body">{detail.body}</p>
          </div>
          <div className="grid-2">
            <Reveal>
              <figure style={{ margin: 0 }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--c-stone)', borderRadius: 'var(--r-1)' }}>
                  <ProductRender
                    category={product.id}
                    shadeHex={shade.hex}
                    view="macro"
                    set={product.id === 'sculpt' || product.id === 'signature' ? 'dark' : 'stone'}
                    alt={`${product.name} in ${shade.name} — ${detail.aLabel.toLowerCase()}`}
                  />
                </div>
                <figcaption className="micro" style={{ marginTop: '0.7rem' }}>{detail.aLabel} · {shade.name}</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={90}>
              <figure style={{ margin: 0 }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--c-stone)', borderRadius: 'var(--r-1)' }}>
                  <ProductRender
                    category={product.id}
                    shadeHex={shade.hex}
                    view="texture"
                    set={product.id === 'veil' ? 'light' : 'stone'}
                    alt={`${product.name} in ${shade.name} — ${detail.bLabel.toLowerCase()}`}
                  />
                </div>
                <figcaption className="micro" style={{ marginTop: '0.7rem' }}>{detail.bLabel} · {shade.name}</figcaption>
              </figure>
            </Reveal>
          </div>
          <p className="notice" style={{ marginTop: 'var(--s-6)' }}>
            Every image on this page is drawn in the browser from the shade's own colour value —
            no photography exists, because no product exists. Textures show the intended
            behaviour of the format, not a tested formula.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ Goes with it */}
      <section className="shell section" aria-labelledby="rel-h">
        <Eyebrow>Goes with it</Eyebrow>
        <h2 id="rel-h" className="display-m" style={{ marginBottom: 'var(--s-6)' }}>
          What {product.name} is usually worn with.
        </h2>
        <div className="grid-3">
          {related.map((p, i) => (
            <Reveal key={p!.id} delay={i * 80}>
              <ProductCard
                product={p!}
                tag={`${p!.index} · ${p!.type}`}
                set={p!.id === 'veil' ? 'stone' : 'light'}
              />
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 'var(--s-5)', background: 'var(--c-espresso)', color: '#F6F0E8', borderRadius: 'var(--r-1)' }}>
              <div>
                <p className="label" style={{ color: 'var(--c-champagne)' }}>The shade index</p>
                <p className="display-s" style={{ marginTop: '0.75rem' }}>
                  Twenty-five shades, filterable by depth and undertone.
                </p>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <BtnLink to="/shades" variant="light" size="sm" block>Browse shades</BtnLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
