import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { WordmarkInline } from '../brand/Wordmark';
import { PRODUCTS } from '../data/products';
import { useBag } from '../context/BagContext';
import { IconBag, IconClose, IconMenu, IconSearch } from './Icons';
import { Cta } from './Btn';

export function Header({ onSearch }: { onSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuWrap = useRef<HTMLDivElement>(null);
  const { count, open: openBag } = useBag();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change closes everything.
  useEffect(() => { setMenuOpen(false); setNavOpen(false); }, [pathname]);

  // The mobile drawer is full-screen, so the page behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      setNavOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuWrap.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [menuOpen]);

  return (
    <>
      <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''}`}>
        <div className="shell hdr__inner">
          <nav className="hdr__nav hdr__nav--left" aria-label="Main">
            <NavLink to="/shop" className="hdr__link">Shop</NavLink>

            <div
              className="menu-wrap"
              ref={menuWrap}
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="hdr__link"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                onClick={() => setMenuOpen((o) => !o)}
              >
                Lips
              </button>
              <div className={`menu ${menuOpen ? 'is-open' : ''}`} role="group" aria-label="Lip categories">
                {PRODUCTS.map((p) => (
                  <Link key={p.id} to={`/collections/${p.id}`} className="menu__row" tabIndex={menuOpen ? 0 : -1}>
                    <span className="index-no">{p.index}</span>
                    <span>
                      <span className="menu__name">{p.name}</span>
                      <span className="menu__type"> · {p.type}</span>
                      <span className="menu__type" style={{ display: 'block' }}>{p.short}</span>
                    </span>
                    <span className="menu__swatches" aria-hidden="true">
                      {p.shades.map((s) => (
                        <span key={s.id} className="menu__sw" style={{ background: s.hex }} />
                      ))}
                    </span>
                  </Link>
                ))}
                <div className="menu__foot">
                  <Cta to="/shades">The shade index</Cta>
                </div>
              </div>
            </div>

            <NavLink to="/about" className="hdr__link">About</NavLink>
          </nav>

          <button
            className="icon-btn hdr__burger"
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={navOpen}
          >
            <IconMenu />
          </button>

          <Link to="/" className="hdr__brand" aria-label="NŌR ATELIER — home">
            <WordmarkInline size="md" />
          </Link>

          <div className="hdr__nav hdr__nav--right">
            <div className="hdr__icons">
              <button className="icon-btn" onClick={onSearch} aria-label="Search products">
                <IconSearch />
              </button>
              <button className="icon-btn" onClick={openBag} aria-label={`Open bag — ${count} ${count === 1 ? 'item' : 'items'}`}>
                <IconBag />
                <span className="icon-btn__count" aria-hidden="true">{count}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Mobile drawer: full-screen, typographic, not a shrunk desktop menu ---- */}
      <div className={`mnav ${navOpen ? 'is-open' : ''}`} aria-hidden={!navOpen} inert={!navOpen}>
        <div className="shell mnav__head">
          <Link to="/" aria-label="NŌR ATELIER — home"><WordmarkInline size="sm" /></Link>
          <button className="icon-btn" onClick={() => setNavOpen(false)} aria-label="Close menu">
            <IconClose />
          </button>
        </div>
        <div className="shell mnav__body">
          <Link to="/shop" className="mnav__item">
            <span className="mnav__item-name">Shop all</span>
            <span className="mnav__item-meta">5 products</span>
          </Link>
          {PRODUCTS.map((p) => (
            <Link key={p.id} to={`/collections/${p.id}`} className="mnav__item">
              <span className="mnav__item-name">{p.name}</span>
              <span className="mnav__item-meta">{p.type}</span>
            </Link>
          ))}
          <Link to="/shades" className="mnav__item">
            <span className="mnav__item-name">Shade index</span>
            <span className="mnav__item-meta">25 shades</span>
          </Link>
          <Link to="/about" className="mnav__item">
            <span className="mnav__item-name">About</span>
          </Link>
          <nav className="mnav__sub" aria-label="Secondary">
            <Link to="/contact">Contact</Link>
            <Link to="/faq">Frequently asked questions</Link>
            <Link to="/delivery">Delivery</Link>
            <Link to="/returns">Returns</Link>
          </nav>
        </div>
      </div>
    </>
  );
}
