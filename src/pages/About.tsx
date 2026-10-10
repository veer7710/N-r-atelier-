import { BtnLink, Cta } from '../components/Btn';
import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { Reveal } from '../components/Reveal';
import { WordmarkStacked } from '../brand/Wordmark';
import { PRODUCTS, byId } from '../data/products';
import { ProductRender } from '../render/products';
import { moneyShort } from '../utils/format';

export function About() {
  usePageMeta('About', 'NŌR ATELIER is a colour cosmetics brand in development, growing out of a working makeup practice. What is decided, what is not, and how the prices were set.');

  const sculpt = byId('sculpt')!;
  const elixir = byId('elixir')!;

  return (
    <>
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
        <div className="phead__grid" style={{ marginTop: '1.5rem' }}>
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 className="display-xl">A short range,<br />built in order.</h1>
          </div>
          <p className="lede">
            NŌR ATELIER is a colour cosmetics brand in development. Five lip products, one
            point of view, and an honest account of how far along it actually is.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- Where it came from */}
      <section className="shell section section--flush-t">
        <div className="split">
          <Reveal className="split__art">
            <ProductRender
              category="sculpt"
              shadeHex={sculpt.shades[2].hex}
              view="open"
              set="light"
              alt="SCULPT Lip Pencil in Toffee, sharpened, with its cap set down"
            />
          </Reveal>
          <div>
            <Eyebrow no="01">Where it comes from</Eyebrow>
            <h2 className="display-l">A makeup chair<br />in Britain.</h2>
            <p className="body" style={{ marginTop: '1.25rem' }}>
              The brand grew out of <strong style={{ color: 'var(--c-espresso)', fontWeight: 500 }}>Makeover by Norrie</strong>,
              a working makeup practice with around two hundred regular clients. That is the
              starting point: a professional who sits in front of a different face every week
              and knows which products get used and which get politely ignored.
            </p>
            <p className="body" style={{ marginTop: '1rem' }}>
              It is an advantage and nothing more. It means NŌR ATELIER can put samples in front
              of real people before committing money to a production run, and can hear the answer
              directly. It does not mean anyone has agreed to buy anything. No product has been
              manufactured, sampled, tested or sold.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- The thinking */}
      <section className="section on-dark grain" style={{ position: 'relative' }}>
        <div className="shell">
          <Eyebrow no="02">The thinking</Eyebrow>
          <h2 className="display-l" style={{ maxWidth: '22ch', marginBottom: 'var(--s-7)' }}>
            A range should be a sequence, not a catalogue.
          </h2>
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {[
              ['Short on purpose', 'Five products, because five is what a lip needs. A sixth would be there to fill a grid.'],
              ['In order', 'Pencil, then satin, then three finishes. The range is the sequence a makeup artist works in.'],
              ['Named by what it does', 'SCULPT draws. SIGNATURE fills. ELIXIR, GLASS and VEIL finish. Nothing is named for a feeling.'],
              ['Priced in a gap', 'Between the high street and the beauty hall. Close enough to the counter to justify the pack.'],
              ['Drawn, not borrowed', 'Every image on this site is drawn from the shade’s own colour value. No stock photography, no competitor’s product.'],
              ['Honest about the gaps', 'What is undecided is published rather than hidden. It is the fastest way to have a useful conversation with a manufacturer.'],
            ].map(([h, b], i) => (
              <Reveal key={h} delay={i * 50}>
                <div style={{ paddingTop: '1.1rem', borderTop: '1px solid rgba(246,240,232,0.18)' }}>
                  <p className="index-no" style={{ color: 'var(--c-champagne)' }}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="display-s" style={{ marginTop: '0.6rem' }}>{h}</h3>
                  <p className="body" style={{ marginTop: '0.6rem', fontSize: 'var(--t-body-s)' }}>{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Pricing */}
      <section className="shell section" aria-labelledby="price-h">
        <div className="phead__grid" style={{ marginBottom: 'var(--s-6)' }}>
          <div>
            <Eyebrow no="03">Price</Eyebrow>
            <h2 id="price-h" className="display-l">How the numbers<br />were set.</h2>
          </div>
          <p className="body">
            The range started at £9 to £12. Those numbers were raised after looking at what a unit
            actually costs to make and sell at a first-run volume. The reasoning is published in
            full in the project's research file rather than summarised into a slogan.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '0', borderTop: '1px solid var(--c-line)' }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2.2rem) minmax(0,1fr) minmax(0,1.4fr) auto', gap: '1rem', alignItems: 'baseline', padding: '1.05rem 0', borderBottom: '1px solid var(--c-line)' }}>
              <span className="index-no">{p.index}</span>
              <span>
                <span className="label label--ink" style={{ fontSize: '0.75rem' }}>{p.name}</span>
                <span className="micro" style={{ display: 'block' }}>{p.type}</span>
              </span>
              <span className="micro">{p.short}</span>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.3rem' }}>{moneyShort(p.price)}</span>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: 'var(--s-6)' }}>
          <div className="notice">
            <strong style={{ color: 'var(--c-espresso)', fontWeight: 600 }}>Why whole pounds. </strong>
            Across the UK brands researched for this project, premium lip products are almost
            universally priced in whole pounds — £18, £20, £22 — while prices ending in .99 cluster
            at the drugstore end. Whole pounds match where NŌR ATELIER wants to sit.
          </div>
          <div className="notice notice--inline">
            <strong style={{ color: 'var(--c-oxblood)', fontWeight: 600 }}>Why these are still provisional. </strong>
            No supplier has quoted a price. The cost model behind these figures uses labelled
            low, medium and high scenarios, not quotes. A real quote will move them.
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Status */}
      <section className="section" style={{ background: 'var(--c-paper)' }} aria-labelledby="status-h">
        <div className="shell split split--art-right">
          <Reveal className="split__art split__art--wide">
            <ProductRender
              category="elixir"
              shadeHex={elixir.shades[1].hex}
              view="macro"
              set="stone"
              alt="A loaded brush applicator from ELIXIR Lip Oil in Rosé Veil, with a pendant drop of oil"
            />
          </Reveal>
          <div>
            <Eyebrow no="04">Status</Eyebrow>
            <h2 id="status-h" className="display-l">What this site<br />actually is.</h2>
            <p className="body" style={{ marginTop: '1.25rem' }}>
              A design prototype. It exists so the brand can be looked at, argued with and shown
              to people who might help build it — a manufacturer, a stockist, a photographer,
              an investor.
            </p>
            <ul style={{ listStyle: 'none', marginTop: '1.5rem', display: 'grid', gap: '0.7rem' }}>
              {[
                'NŌR ATELIER is a working name. No trade mark, company or domain has been registered or secured.',
                'No products exist. Packaging shown here is drawn to a design intent, not to a tooling drawing.',
                'No formula has been briefed to a cosmetics laboratory.',
                'No UK Responsible Person is appointed and nothing is notified to the government’s cosmetic product notification service.',
                'There is no checkout, no payment system, no stock and no company to send you anything.',
                'All prices, shades and copy are provisional.',
              ].map((t) => (
                <li key={t} style={{ display: 'grid', gridTemplateColumns: '9px 1fr', gap: '0.75rem', alignItems: 'start', fontSize: 'var(--t-body-s)', color: 'var(--c-cocoa-dk)', lineHeight: 1.6 }}>
                  <span style={{ width: 9, height: 1, background: 'var(--c-line-strong)', marginTop: '0.72em' }} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <BtnLink to="/contact">Get in touch</BtnLink>
              <Cta to="/faq">Frequently asked questions</Cta>
            </div>
          </div>
        </div>
      </section>

      <section className="closing section">
        <div className="shell closing__inner">
          <WordmarkStacked size="md" />
          <p className="display-m" style={{ maxWidth: '24ch', marginTop: '0.5rem' }}>
            Have a look at the range.
          </p>
          <BtnLink to="/shop" size="lg">Shop the range</BtnLink>
        </div>
      </section>
    </>
  );
}
