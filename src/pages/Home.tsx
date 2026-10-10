import { Link } from 'react-router-dom';
import { BtnLink, Cta } from '../components/Btn';
import { Eyebrow, usePageMeta } from '../components/Page';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { ShadeWall } from '../components/ShadeWall';
import { WordmarkStacked } from '../brand/Wordmark';
import { PRODUCTS, byId, displayShade, launchSkuCount } from '../data/products';
import { ProductRender } from '../render/products';
import { moneyShort } from '../utils/format';

/* One-line differences, written so a customer can tell five lip products
   apart in a single pass. This is the job of the range section. */
const DIFFERENCE: Record<string, string> = {
  sculpt: 'Draws the edge, then fills it. Matte, sharpenable.',
  signature: 'Full colour in one pass. Satin, opaque, weighted case.',
  elixir: 'Thinnest of the three finishes. Sheer, slippery, no mirror.',
  glass: 'Thicker than the oil. High shine, clear tube.',
  veil: 'Colour with no finish at all. A wash you build.',
};

export function Home() {
  usePageMeta(
    'Lip, considered',
    'NŌR ATELIER — five lip products, thirteen shades at first release. A colour cosmetics brand in development. This site is a prototype; nothing on it can be bought.',
  );

  const signature = byId('signature')!;
  const sculpt = byId('sculpt')!;
  const glassP = byId('glass')!;
  const veil = byId('veil')!;
  const minPrice = Math.min(...PRODUCTS.map((p) => p.price));

  return (
    <>
      {/* ---------------------------------------------------------- 01 HERO */}
      <section className="hero grain" aria-labelledby="hero-h">
        <div className="shell hero__grid">
          <div>
            <Reveal>
              <p className="hero__kicker">
                <span className="index-no">01</span>
                <span className="macron" aria-hidden="true" />
                <span className="label">The first release</span>
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 id="hero-h" className="display-xl hero__h1">
                Begin with<br />the <em>line</em>.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="lede hero__sub">
                Five lip products, built in the order you would use them. A pencil to draw with,
                a satin to fill with, and three ways to finish. Nothing in the range exists to
                round out a grid.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="hero__actions">
                <BtnLink to="/shop" size="lg">Shop the range</BtnLink>
                <Cta to="/shades">The shade index</Cta>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <dl className="hero__meta">
                <div>
                  <dt>Products</dt>
                  <dd>Five</dd>
                </div>
                <div>
                  <dt>First release</dt>
                  <dd>{launchSkuCount} shades</dd>
                </div>
                <div>
                  <dt>From</dt>
                  <dd>{moneyShort(minPrice)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>In development</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal className="hero__art" delay={100}>
            <div className="hero__frame">
              {/* The hero render is the one image deliberately not lazy-loaded
                  or revealed late — it is the first thing the brand says. */}
              <ProductRender
                category="signature"
                shadeHex={signature.shades[2].hex}
                view="open"
                set="light"
                alt="SIGNATURE Satin Lipstick in Cinnamon, bullet extended beside its cap, on a warm ivory sweep"
              />
            </div>
            <div className="hero__chip">
              <span className="hero__chip-sw" style={{ background: signature.shades[2].hex }} aria-hidden="true" />
              <span>
                <span className="label" style={{ display: 'block' }}>02 · Signature</span>
                <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem' }}>Cinnamon</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- 02 THE RANGE */}
      <section className="section shell" aria-labelledby="range-h">
        <div className="phead__grid" style={{ marginBottom: 'var(--s-6)' }}>
          <div>
            <Eyebrow no="02">The range</Eyebrow>
            <h2 id="range-h" className="display-l">
              Five products, in<br />the order you use them.
            </h2>
          </div>
          <p className="body">
            Pencil, lipstick, oil, gloss, stain. The difference between them is written on each
            card, because “lip oil” and “lip gloss” are not the same thing and most sites behave
            as though they are.
          </p>
        </div>

        <div className="range">
          {PRODUCTS.map((p, i) => {
            const s = displayShade(p);
            return (
              <Reveal key={p.id} delay={i * 70}>
                <Link to={`/collections/${p.id}`} className="rcard">
                  <div className="rcard__frame">
                    <ProductRender
                      category={p.id}
                      shadeHex={s.hex}
                      view="closed"
                      set={p.id === 'veil' ? 'stone' : 'light'}
                      alt={`${p.name} ${p.type} in ${s.name}`}
                    />
                    <span className="rcard__no" aria-hidden="true">{p.index}</span>
                  </div>
                  <p className="rcard__name">{p.name}</p>
                  <p className="rcard__type">{p.type} · {moneyShort(p.price)}</p>
                  <p className="rcard__diff">{DIFFERENCE[p.id]}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* --------------------------------------------- 03 DARK BRAND STATEMENT */}
      <section className="stmt on-dark grain section" aria-labelledby="stmt-h">
        <div className="shell stmt__grid">
          <div>
            <Eyebrow no="03">Where it comes from</Eyebrow>
            <h2 id="stmt-h" className="display-l stmt__q">
              It starts at a <em>makeup chair</em>, not a mood board.
            </h2>
            <div className="stmt__cite">
              <p className="body" style={{ maxWidth: '46ch' }}>
                NŌR ATELIER grew out of Makeover by Norrie — a working makeup practice with
                around two hundred regular clients. The range is short on purpose. It is the
                list of things that actually get reached for, in the order they get reached for.
              </p>
              <p className="micro" style={{ marginTop: '0.75rem' }}>
                That practice is the brand's starting advantage, not proof that anyone will buy
                this. No product has been manufactured, sampled or sold.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <BtnLink to="/about" variant="outline">Read the full position</BtnLink>
              </div>
            </div>
          </div>
          <Reveal className="stmt__art">
            <ProductRender
              category="sculpt"
              shadeHex={sculpt.shades[4].hex}
              view="macro"
              set="dark"
              alt="Close view of the sharpened tip of SCULPT Lip Pencil in Merlot, lit against espresso"
            />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- 04 FEATURED THREE */}
      <section className="section shell" aria-labelledby="feat-h">
        <div className="phead__grid" style={{ marginBottom: 'var(--s-6)' }}>
          <div>
            <Eyebrow no="04">Three to start with</Eyebrow>
            <h2 id="feat-h" className="display-l">Where most people<br />should begin.</h2>
          </div>
          <p className="body">
            Not bestsellers — nothing here has sold. These three are the range's own logic:
            a liner, a red, and a clear gloss that works over both.
          </p>
        </div>

        <div className="feat">
          <Reveal>
            <ProductCard product={sculpt} shade={sculpt.shades[2]} tag="01 · Pencil" />
          </Reveal>
          <div className="feat__side">
            <Reveal delay={80}>
              <ProductCard product={signature} shade={signature.shades[4]} tag="02 · Satin" />
            </Reveal>
            {/* The third pick is a clear gloss, which photographs as almost
                nothing — so it gets a note panel rather than a third frame. */}
            <Reveal delay={160}>
              <Link to={`/product/${glassP.slug}?shade=crystal`} className="feat__note">
                <span className="feat__note-art">
                  <ProductRender
                    category="glass"
                    shadeHex={glassP.shades[0].hex}
                    view="closed"
                    set="stone"
                    alt="GLASS Lip Gloss in Crystal, a clear tube"
                  />
                </span>
                <span>
                  <span className="label label--ink" style={{ fontSize: '0.6875rem' }}>04 · Gloss — Crystal</span>
                  <span className="display-s" style={{ display: 'block', marginTop: '0.5rem' }}>
                    The clear one that goes over both.
                  </span>
                  <span className="micro" style={{ display: 'block', marginTop: '0.55rem' }}>
                    No tint, no shimmer. Put it over the pencil for shine, or over the satin to
                    soften it. {moneyShort(glassP.price)}.
                  </span>
                  <span className="cta" style={{ marginTop: '1rem' }}>
                    <span>View Crystal</span>
                    <span className="cta__rule" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- 05 SHADE DISCOVERY */}
      <section className="wall section" aria-labelledby="wall-h">
        <div className="shell">
          <div className="phead__grid" style={{ marginBottom: 'var(--s-6)' }}>
            <div>
              <Eyebrow no="05">The shade index</Eyebrow>
              <h2 id="wall-h" className="display-l">
                Twenty-five shades.<br />{launchSkuCount} at first release.
              </h2>
            </div>
            <p className="body">
              Filter by depth and undertone. Swatches are drawn for a screen, and a screen is
              not a lip — treat them as a guide to the family, not a colour match.
            </p>
          </div>
          <ShadeWall limit={14} />
          <div style={{ marginTop: 'var(--s-6)' }}>
            <BtnLink to="/shades" variant="outline">All twenty-five shades</BtnLink>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- 06 POSITION */}
      <section className="section shell" aria-labelledby="pos-h">
        <div className="split split--art-right">
          <Reveal className="split__art">
            <ProductRender
              category="veil"
              shadeHex={veil.shades[2].hex}
              view="texture"
              set="light"
              alt="A single feathered pass of VEIL Lip Stain in Cherry Pop on a pale surface"
            />
          </Reveal>
          <div>
            <Eyebrow no="06">Position</Eyebrow>
            <h2 id="pos-h" className="display-l">Accessible,<br />not cheap.</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              The range sits between the high street and the beauty hall: £12 to £16.
            </p>
            <p className="body" style={{ marginTop: '1rem', maxWidth: '48ch' }}>
              That gap is deliberate. Far enough above the drugstore to pay for a pack worth
              keeping on a table; far enough below the counter that you do not have to think
              about it first. Comparable pencils from brands NŌR looks up to sell at £18 to £22
              in the UK today — the arithmetic behind that choice is written down rather than
              implied.
            </p>
            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <BtnLink to="/shop">See the range</BtnLink>
              <Cta to="/about">How the price was set</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- 07 WHAT ISN'T DECIDED YET */}
      <section className="candid section--tight grain" aria-labelledby="candid-h" style={{ position: 'relative' }}>
        <div className="shell candid__grid">
          <div>
            <p className="eyebrow">
              <span className="index-no" style={{ color: 'rgba(246,237,230,0.6)' }}>07</span>
              <span className="macron" aria-hidden="true" style={{ background: '#F6EDE6' }} />
              <span className="label" style={{ color: 'rgba(246,237,230,0.8)' }}>In development</span>
            </p>
            <h2 id="candid-h" className="display-m">What isn't<br />decided yet.</h2>
            <p className="micro" style={{ marginTop: '1rem', color: 'rgba(246,237,230,0.7)', maxWidth: '32ch' }}>
              Published because a manufacturer will ask, and because a customer should be able
              to tell a prototype from a shop.
            </p>
          </div>
          <ul className="candid__list">
            <li><span className="index-no">01</span><span>No formula exists. Nothing has been briefed to a cosmetics laboratory, so texture, pigment load and wear are all open.</span></li>
            <li><span className="index-no">02</span><span>No supplier has quoted. Packaging shown here is drawn to a design intent, not to a tooling drawing.</span></li>
            <li><span className="index-no">03</span><span>No UK Responsible Person is appointed and no product has been notified to the government's SCPN service — both are required before a single unit can be sold in Great Britain.</span></li>
            <li><span className="index-no">04</span><span>No safety assessment, stability test or packaging compatibility test has been carried out.</span></li>
            <li><span className="index-no">05</span><span>Prices are provisional. They are built from an open cost model, not a supplier quote.</span></li>
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- 08 CLOSING */}
      <section className="closing section" aria-labelledby="close-h">
        <div className="shell closing__inner">
          <WordmarkStacked size="md" />
          <h2 id="close-h" className="display-m" style={{ maxWidth: '26ch', marginTop: '0.5rem' }}>
            Five products. One lip. Nothing extra.
          </h2>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <BtnLink to="/shop" size="lg">Shop the range</BtnLink>
            <BtnLink to="/about" size="lg" variant="outline">About the brand</BtnLink>
          </div>
        </div>
      </section>
    </>
  );
}
