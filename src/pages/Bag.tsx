import { Link } from 'react-router-dom';
import { BagLines, EmptyBag } from '../components/BagDrawer';
import { Btn, BtnLink } from '../components/Btn';
import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { useBag } from '../context/BagContext';
import { money } from '../utils/format';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export function Bag() {
  usePageMeta('Your bag', 'The NŌR ATELIER prototype bag. Quantities and shades work; checkout does not exist.');
  const { resolved, subtotal, count, clear } = useBag();

  // VAT shown as an assumption, not a fact: the brand is not VAT registered.
  const exVat = subtotal / 1.2;
  const vat = subtotal - exVat;

  const suggestions = PRODUCTS.filter((p) => !resolved.some((l) => l.category === p.id)).slice(0, 3);

  return (
    <>
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} />
        <div className="phead__row" style={{ marginTop: '1.5rem' }}>
          <Eyebrow>Bag</Eyebrow>
        </div>
        <h1 className="display-l">
          {count === 0 ? 'Nothing in the bag.' : `${count} ${count === 1 ? 'item' : 'items'}.`}
        </h1>
      </section>

      <section className="shell section section--flush-t">
        {resolved.length === 0 ? (
          <EmptyBag />
        ) : (
          <div className="bagpage">
            <div>
              <BagLines />
              <div style={{ marginTop: 'var(--s-6)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <BtnLink to="/shop" variant="outline" size="sm">Keep looking</BtnLink>
                <Btn variant="ghost" size="sm" onClick={clear}>Empty the bag</Btn>
              </div>
            </div>

            <aside className="bagpage__sum" aria-label="Order summary">
              <p className="label label--ink" style={{ marginBottom: '1.25rem' }}>Summary</p>
              <dl style={{ display: 'grid', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--t-body-s)' }}>
                  <dt style={{ color: 'var(--c-cocoa-dk)' }}>Items ({count})</dt>
                  <dd style={{ margin: 0 }}>{money(subtotal)}</dd>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--t-body-s)' }}>
                  <dt style={{ color: 'var(--c-cocoa-dk)' }}>Delivery</dt>
                  <dd style={{ margin: 0, color: 'var(--c-cocoa-dk)' }}>Not yet costed</dd>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--t-body-s)', paddingTop: '0.7rem', borderTop: '1px solid var(--c-line)' }}>
                  <dt style={{ color: 'var(--c-cocoa-dk)' }}>Of which VAT, assumed at 20%</dt>
                  <dd style={{ margin: 0, color: 'var(--c-cocoa-dk)' }}>{money(vat)}</dd>
                </div>
              </dl>

              <div className="subtotal" style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--c-line-strong)' }}>
                <span className="label label--ink">Subtotal</span>
                <span className="subtotal__val">{money(subtotal)}</span>
              </div>

              <button className="btn btn--block" disabled title="There is no checkout in this prototype">
                Checkout unavailable
              </button>

              <p className="notice notice--inline" style={{ marginTop: '1rem' }}>
                <strong style={{ color: 'var(--c-oxblood)', fontWeight: 600 }}>No order can be placed. </strong>
                There is no payment provider connected, no stock, and no company to fulfil an
                order. The bag exists so the shopping experience can be reviewed. Nothing you do
                here creates an order, and no payment details are requested anywhere on this site.
              </p>
              <p className="micro" style={{ marginTop: '0.9rem' }}>
                VAT is shown as a working assumption only. NŌR ATELIER is not VAT registered and
                may not need to be until it passes the registration threshold.{' '}
                <Link to="/terms" className="link-u">Terms</Link>.
              </p>
            </aside>
          </div>
        )}
      </section>

      {resolved.length > 0 && suggestions.length > 0 && (
        <section className="section" style={{ background: 'var(--c-cream)' }} aria-labelledby="also-h">
          <div className="shell">
            <Eyebrow>Also in the range</Eyebrow>
            <h2 id="also-h" className="display-m" style={{ marginBottom: 'var(--s-6)' }}>
              The products you have not looked at.
            </h2>
            <div className="grid-3">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} tag={`${p.index} · ${p.type}`} set={p.id === 'veil' ? 'stone' : 'light'} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
