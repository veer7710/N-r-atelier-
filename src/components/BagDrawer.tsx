import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBag } from '../context/BagContext';
import { ProductRender } from '../render/products';
import { money } from '../utils/format';
import { IconClose } from './Icons';
import { QuantityStepper } from './QuantityStepper';
import { BtnLink } from './Btn';
import { byId } from '../data/products';

export function BagLines({ compact = false }: { compact?: boolean }) {
  const { resolved, setQty, remove } = useBag();

  return (
    <div>
      {resolved.map((l) => {
        const product = byId(l.category);
        return (
          <div className="bagline" key={l.key}>
            <div className="bagline__thumb">
              {product && (
                <ProductRender
                  category={product.id}
                  shadeHex={l.shadeHex}
                  view="closed"
                  set="stone"
                  alt={`${l.productName} in ${l.shadeName}`}
                />
              )}
            </div>
            <div>
              <div className="bagline__top">
                <div>
                  <Link to={`/product/${l.productSlug}?shade=${l.shadeId}`} className="bagline__name">
                    {l.productName}
                  </Link>
                  <p className="bagline__shade">
                    <span className="bagline__sw" style={{ background: l.shadeHex }} aria-hidden="true" />
                    {l.shadeName}
                    {!compact && <span style={{ opacity: 0.7 }}> · {l.productType}</span>}
                  </p>
                </div>
                <p style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem', whiteSpace: 'nowrap' }}>
                  {money(l.lineTotal)}
                </p>
              </div>
              <div className="bagline__ctrls">
                <QuantityStepper
                  value={l.qty}
                  onChange={(n) => setQty(l.key, n)}
                  label={`Quantity, ${l.productName} in ${l.shadeName}`}
                />
                <button
                  className="bagline__remove"
                  onClick={() => remove(l.key)}
                >
                  Remove<span className="sr-only"> {l.productName} in {l.shadeName}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function EmptyBag({ onBrowse }: { onBrowse?: () => void }) {
  return (
    <div style={{ paddingBlock: '2.5rem', maxWidth: '34ch' }}>
      <span className="macron" aria-hidden="true" />
      <p className="display-s" style={{ marginTop: '1.1rem' }}>Your bag is empty.</p>
      <p className="body" style={{ marginTop: '0.6rem' }}>
        Five products, thirteen shades in the first release. Start with the pencil — the rest of the
        range is built around it.
      </p>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <BtnLink to="/shop" size="sm" onClick={onBrowse}>Shop the range</BtnLink>
        <BtnLink to="/shades" size="sm" variant="outline">Shade index</BtnLink>
      </div>
    </div>
  );
}

export function BagDrawer() {
  const { isOpen, close, resolved, subtotal, count } = useBag();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // Navigating away closes the drawer rather than leaving it floating
  // over a page the person did not open it from.
  useEffect(() => { close(); }, [pathname, close]);

  // Escape closes, focus moves into the drawer, and the page behind is locked.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <div className={`scrim ${isOpen ? 'is-open' : ''}`} onClick={close} aria-hidden="true" />
      <aside
        className={`drawer ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Shopping bag"
        ref={panel}
        inert={!isOpen}
      >
        <div className="drawer__head">
          <p className="label label--ink">
            Bag {count > 0 && <span style={{ fontVariantNumeric: 'tabular-nums' }}>— {count}</span>}
          </p>
          <button className="icon-btn" onClick={close} aria-label="Close bag" ref={closeBtn}>
            <IconClose />
          </button>
        </div>

        <div className="drawer__body">
          {resolved.length === 0 ? <EmptyBag onBrowse={close} /> : <BagLines compact />}
        </div>

        {resolved.length > 0 && (
          <div className="drawer__foot">
            <div className="subtotal">
              <span className="label label--ink">Subtotal</span>
              <span className="subtotal__val">{money(subtotal)}</span>
            </div>
            <p className="micro" style={{ marginBottom: '1rem' }}>
              Delivery is not yet costed. Prices are provisional and include UK VAT at 20%.
            </p>
            {/* No checkout exists. The control says so rather than pretending. */}
            <button className="btn btn--block" disabled title="Checkout is not connected in this prototype">
              Checkout unavailable
            </button>
            <p className="notice notice--inline" style={{ marginTop: '0.9rem' }}>
              There is no payment system behind this site and no stock to send. The bag works so the
              range can be reviewed as a shopping experience — nothing more.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/bag" className="cta" onClick={close}>
                <span>View full bag</span><span className="cta__rule" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
