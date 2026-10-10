import { Link } from 'react-router-dom';
import { WordmarkStacked } from '../brand/Wordmark';
import { PRODUCTS } from '../data/products';

export function Footer() {
  return (
    <footer className="ftr on-dark grain" style={{ position: 'relative' }}>
      <div className="shell ftr__top">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <WordmarkStacked tone="light" size="sm" />
            <p className="micro" style={{ marginTop: '1.25rem', maxWidth: '30ch', color: 'rgba(239,230,218,0.66)' }}>
              A colour cosmetics brand in development, built around lips.
            </p>
          </div>
          <div className="ftr__cols" style={{ flex: '1 1 460px' }}>
            <div>
              <h2 className="ftr__h">The range</h2>
              <ul className="ftr__list">
                {PRODUCTS.map((p) => (
                  <li key={p.id}><Link to={`/collections/${p.id}`}>{p.name} — {p.type}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="ftr__h">Brand</h2>
              <ul className="ftr__list">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/shades">Shade index</Link></li>
                <li><Link to="/shop">Shop all</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="ftr__h">Information</h2>
              <ul className="ftr__list">
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/delivery">Delivery</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* The brand is pre-launch. The footer says so, on every page. */}
        <div className="notice" style={{ background: 'rgba(246,240,232,0.05)', borderLeftColor: 'var(--c-champagne)', color: 'rgba(239,230,218,0.74)' }}>
          <strong style={{ color: '#F6F0E8', fontWeight: 500 }}>This site is a brand prototype.</strong>{' '}
          NŌR ATELIER has no products in production, no checkout and no company behind it yet. Prices,
          shades and packaging shown here are design intent. Nothing on this site can be bought.{' '}
          <Link to="/about" className="link-u" style={{ color: 'inherit' }}>What that means</Link>.
        </div>
      </div>

      <div className="shell ftr__bar">
        <span>NŌR ATELIER — prototype, {new Date().getFullYear()}. Working name, not a registered trade mark.</span>
        <span>Designed and built in the United Kingdom</span>
      </div>
    </footer>
  );
}
