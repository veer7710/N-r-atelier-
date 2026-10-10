import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem } from '../components/Accordion';
import { Crumbs, DraftNote, Eyebrow, usePageMeta } from '../components/Page';
import { PRODUCTS, launchSkuCount } from '../data/products';

/* All five information pages share one layout. The important thing about
   them is what they do NOT say: no delivery times, no returns window, no
   address, no company number, no legal text passed off as approved. */
function Doc({
  title, lede, nav, children, crumb,
}: { title: string; lede: string; nav: { id: string; label: string }[]; children: ReactNode; crumb: string }) {
  return (
    <>
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: crumb }]} />
        <div className="phead__grid" style={{ marginTop: '1.5rem' }}>
          <div>
            <Eyebrow>Information</Eyebrow>
            <h1 className="display-l">{title}</h1>
          </div>
          <p className="body">{lede}</p>
        </div>
      </section>
      <section className="shell section section--flush-t">
        <div className="doc">
          <aside className="doc__aside">
            <p className="label" style={{ marginBottom: '0.9rem' }}>On this page</p>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="micro link-u">{n.label}</a>
                </li>
              ))}
            </ul>
            <p className="label" style={{ margin: '1.75rem 0 0.9rem' }}>Elsewhere</p>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
              <li><Link to="/faq" className="micro link-u">FAQ</Link></li>
              <li><Link to="/delivery" className="micro link-u">Delivery</Link></li>
              <li><Link to="/returns" className="micro link-u">Returns</Link></li>
              <li><Link to="/privacy" className="micro link-u">Privacy</Link></li>
              <li><Link to="/terms" className="micro link-u">Terms</Link></li>
            </ul>
          </aside>
          <div className="doc__body">{children}</div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ FAQ */
export function Faq() {
  usePageMeta('Frequently asked questions', 'What NŌR ATELIER is, what it is not, and what has to happen before anything can be sold.');

  return (
    <Doc
      crumb="FAQ"
      title="Frequently asked questions."
      lede="Mostly about what this is. The brand is in development, so the honest answer to several of these is “not yet”."
      nav={[{ id: 'faq-the-site', label: 'The site' }, { id: 'faq-products', label: 'Products' }, { id: 'faq-buying', label: 'Buying' }]}
    >
      <h2 id="faq-the-site">The site</h2>
      <Accordion>
        <AccordionItem title="Can I buy anything here?" defaultOpen>
          <p>
            No. There is no checkout, no payment system, no stock and no company behind this site.
            The bag works so that the range can be reviewed as a shopping experience — add a
            product, change a shade, change a quantity — but nothing can be paid for and nothing
            can be shipped.
          </p>
        </AccordionItem>
        <AccordionItem title="Are these real products?">
          <p>
            Not yet. The five products are concepts with a design intent behind them. Every image
            on the site is drawn in the browser from the shade's own colour value rather than
            photographed, because there is nothing to photograph. No stock photography and no
            other brand's product appears anywhere on this site.
          </p>
        </AccordionItem>
        <AccordionItem title="Is NŌR ATELIER a registered company or trade mark?">
          <p>
            No. It is a working name. Nothing has been registered, filed or secured — not the
            name, not a company, not a domain, not a social handle. If the name turns out to be
            unavailable it will change.
          </p>
        </AccordionItem>
      </Accordion>

      <h2 id="faq-products">Products</h2>
      <Accordion>
        <AccordionItem title="What is the difference between the lip oil and the lip gloss?">
          <p>
            ELIXIR is an oil: thinner, more slip, less tack, applied with a brush, in a frosted
            glass vial. GLASS is a gloss: thicker, more cushioned, higher shine, applied with a
            doe-foot, in a clear tube. They are different products with different jobs, which is
            why they are priced and packaged differently.
          </p>
        </AccordionItem>
        <AccordionItem title="Why are only some shades available?">
          <p>
            Twenty-five shades is far too many for a first production run. Each shade is a separate
            minimum order, a separate batch and a separate piece of stock that may not sell.{' '}
            <strong>{launchSkuCount} shades</strong> are proposed for the first release across the
            five products; the rest are drawn so the range reads as a whole and are marked
            “second release” wherever they appear.
          </p>
        </AccordionItem>
        <AccordionItem title="What is in them? Are they vegan or cruelty-free?">
          <p>
            Unknown, and so not claimed. No formula has been briefed to a cosmetics laboratory, so
            there is no ingredient list, no net weight, no wear time and no basis for a vegan,
            cruelty-free, dermatologically tested or hypoallergenic claim. Those claims will only
            appear here if and when they are substantiated.
          </p>
        </AccordionItem>
        <AccordionItem title="How long do they last?">
          <p>
            No wear-time claim is made, because nothing has been tested. Any number printed here
            would be invented.
          </p>
        </AccordionItem>
      </Accordion>

      <h2 id="faq-buying">Buying, eventually</h2>
      <Accordion>
        <AccordionItem title="What has to happen before these can be sold in the UK?">
          <p>
            Quite a lot. Cosmetics sold in Great Britain need, among other things, a UK Responsible
            Person, a Product Information File, a Cosmetic Product Safety Report prepared by a
            qualified safety assessor, compliant labelling, and notification to the government's
            Submit Cosmetic Product Notifications service. None of that has been done. The
            project's <strong>PRE_LAUNCH_CHECKLIST.md</strong> file lists the outstanding work.
          </p>
        </AccordionItem>
        <AccordionItem title="Why do the sets have a price if they cannot be bought?">
          <p>
            Because the arithmetic is useful and the number is honest: each set price is set below
            the sum of the individual prices on this site, and that sum is calculated from the
            same data the product pages use. What is missing is a cost for the set's own outer
            packaging — so the sets are shown as concepts and left out of the bag.
          </p>
        </AccordionItem>
      </Accordion>

      <DraftNote>
        This page will need rewriting once suppliers, formulas and a legal entity exist. It is
        written to be accurate today rather than to sound finished.
      </DraftNote>
    </Doc>
  );
}

/* ------------------------------------------------------------- Delivery */
export function Delivery() {
  usePageMeta('Delivery', 'Draft delivery intentions for NŌR ATELIER. No carrier, rates or delivery times have been set.');

  return (
    <Doc
      crumb="Delivery"
      title="Delivery."
      lede="Nothing here is agreed. No carrier has been approached and no rates have been negotiated, so this page sets out intentions rather than terms."
      nav={[{ id: 'd-status', label: 'Status' }, { id: 'd-intent', label: 'Intentions' }, { id: 'd-open', label: 'Still open' }]}
    >
      <h2 id="d-status">Status</h2>
      <p>
        There is no delivery service behind this site. No orders can be placed, so no orders can
        be sent. Everything below is a draft position to be tested against real carrier quotes.
      </p>
      <DraftNote>
        No delivery timescale, price or carrier name appears on this page on purpose. Publishing
        one before it is agreed would be a promise the brand cannot keep.
      </DraftNote>

      <h2 id="d-intent">Intentions</h2>
      <ul>
        <li>UK delivery first. International is out of scope until the UK operation works.</li>
        <li>A tracked standard service as the default, with a faster option if the economics allow.</li>
        <li>A free-delivery threshold, set once the average basket is known — not guessed at now.</li>
        <li>Packaging light enough to post as a large letter where the product allows, because the postage band changes the unit economics more than most people expect.</li>
        <li>Plastic-free outer packaging if it survives transit testing.</li>
      </ul>

      <h2 id="d-open">Still open</h2>
      <ul>
        <li>Carrier, service level and negotiated rates.</li>
        <li>Whether fulfilment is handled in-house at first or by a third party.</li>
        <li>Whether a glass vial (ELIXIR) survives postal handling in the intended mailer.</li>
        <li>The free-delivery threshold, and how much of the cost the brand absorbs.</li>
        <li>Returns logistics, covered on the <Link to="/returns" className="link-u">returns</Link> page.</li>
      </ul>
    </Doc>
  );
}

/* -------------------------------------------------------------- Returns */
export function Returns() {
  usePageMeta('Returns', 'Draft returns position for NŌR ATELIER. No returns policy has been written or legally reviewed.');

  return (
    <Doc
      crumb="Returns"
      title="Returns."
      lede="A returns policy is a legal document. This is not one — it is a note on what the policy will have to cover."
      nav={[{ id: 'r-status', label: 'Status' }, { id: 'r-intent', label: 'Intentions' }, { id: 'r-law', label: 'What the law requires' }]}
    >
      <h2 id="r-status">Status</h2>
      <p>
        No returns policy exists. Nothing can be bought, so nothing can be returned. No window,
        no address and no process is published here because none has been decided or reviewed.
      </p>
      <DraftNote>
        Any returns policy will need checking against UK consumer law — including the rules on
        distance selling and the specific position on cosmetics and hygiene — by someone
        qualified to do it. That has not happened.
      </DraftNote>

      <h2 id="r-intent">Intentions</h2>
      <ul>
        <li>Unopened products returnable within a clearly stated window.</li>
        <li>Faulty or damaged products replaced or refunded without argument.</li>
        <li>A position on opened cosmetics that is stated plainly up front rather than buried.</li>
        <li>Return postage treated as a cost of doing business where the fault is the brand's.</li>
      </ul>

      <h2 id="r-law">What the law requires</h2>
      <p>
        UK consumer protection law gives customers rights that a policy cannot reduce, and there
        are specific considerations for sealed hygiene products once they have been opened. The
        exact position has not been confirmed with a qualified adviser, so it is not summarised
        here. Getting this wrong is both a legal and a trust problem, and it is on the pre-launch
        checklist.
      </p>
    </Doc>
  );
}

/* -------------------------------------------------------------- Privacy */
export function Privacy() {
  usePageMeta('Privacy', 'What this NŌR ATELIER prototype does and does not collect. No personal data is gathered.');

  return (
    <Doc
      crumb="Privacy"
      title="Privacy."
      lede="Short, because this prototype collects nothing. It is not a privacy notice for a business, because there is no business yet."
      nav={[{ id: 'p-now', label: 'What this site does' }, { id: 'p-storage', label: 'Local storage' }, { id: 'p-later', label: 'What a real notice needs' }]}
    >
      <h2 id="p-now">What this site does</h2>
      <ul>
        <li>No account system, no sign-up, no newsletter.</li>
        <li>No analytics, no tracking pixels, no advertising tags, no cookies set by this site.</li>
        <li>No server receives anything you type. The contact form is wired to nothing and clears itself.</li>
        <li>No payment details are requested anywhere, because there is no checkout.</li>
        <li>Fonts are served from this site rather than a third-party font service, so loading a page does not tell anyone else that you visited.</li>
      </ul>

      <h2 id="p-storage">Local storage</h2>
      <p>
        One thing is stored, and only in your own browser: the contents of your bag, under the key{' '}
        <strong>nor-atelier.bag.v1</strong>. It never leaves your device and nobody can read it.
        Clearing your browser's site data removes it. It exists so that refreshing the page does
        not empty your bag.
      </p>

      <h2 id="p-later">What a real privacy notice will need</h2>
      <p>
        Once there is a company, a checkout and a mailing list, this page has to be replaced by a
        proper UK GDPR privacy notice: who the data controller is, the lawful basis for each
        purpose, retention periods, processors, and how to exercise your rights. That is a job for
        someone qualified, and it is on the pre-launch checklist.
      </p>
      <DraftNote>
        Nothing on this page should be read as a legally reviewed privacy notice. It is a
        description of a prototype's behaviour.
      </DraftNote>
    </Doc>
  );
}

/* ---------------------------------------------------------------- Terms */
export function Terms() {
  usePageMeta('Terms', 'Terms for the NŌR ATELIER prototype. No sales terms exist because nothing is for sale.');

  return (
    <Doc
      crumb="Terms"
      title="Terms."
      lede="There are no terms of sale, because there is nothing for sale. What follows is a plain statement of what this site is."
      nav={[{ id: 't-what', label: 'What this is' }, { id: 't-prices', label: 'Prices and products' }, { id: 't-ip', label: 'Names and imagery' }]}
    >
      <h2 id="t-what">What this is</h2>
      <p>
        A design prototype for a cosmetics brand that is being developed. It is published for
        review and discussion. It is not an offer to sell, an invitation to treat, or a
        representation that any product exists or can be supplied.
      </p>

      <h2 id="t-prices">Prices and products</h2>
      <ul>
        <li>All prices are provisional working figures and include an assumption of UK VAT at 20%. They are not offers.</li>
        <li>All five products — {PRODUCTS.map((p) => p.name).join(', ')} — are concepts. None has been manufactured.</li>
        <li>Packaging, shades, finishes and copy are design intent and will change.</li>
        <li>No claim is made about ingredients, performance, safety, testing or origin anywhere on this site.</li>
      </ul>

      <h2 id="t-ip">Names and imagery</h2>
      <p>
        NŌR ATELIER is a working name with no registered rights behind it. Makeover by Norrie is
        an existing makeup practice referred to factually as the brand's starting point. All
        product imagery on this site is original work drawn specifically for it; no third-party
        photography and no other brand's products are used.
      </p>
      <DraftNote>
        Real terms and conditions of sale will have to be written and reviewed before anything can
        be sold. This page is not that document and should not be used as one.
      </DraftNote>
    </Doc>
  );
}
