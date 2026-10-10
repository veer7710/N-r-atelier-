import { BtnLink } from '../components/Btn';
import { Monogram } from '../brand/Wordmark';
import { usePageMeta } from '../components/Page';
import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';

export function NotFound() {
  usePageMeta('Page not found');

  return (
    <section className="shell nf">
      <div>
        <div className="nf__art">
          <Monogram size={64} />
        </div>
        <p className="label" style={{ marginBottom: '0.9rem' }}>404 — nothing here</p>
        <h1 className="display-l" style={{ marginBottom: '1rem' }}>
          That page doesn't exist.
        </h1>
        <p className="body" style={{ margin: '0 auto', maxWidth: '40ch' }}>
          The range is five products deep, so there is not much to get lost in. Try one of these.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
          <BtnLink to="/">Home</BtnLink>
          <BtnLink to="/shop" variant="outline">Shop the range</BtnLink>
        </div>
        <nav aria-label="Products" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
          {PRODUCTS.map((p) => (
            <Link key={p.id} to={`/collections/${p.id}`} className="label link-u">{p.name}</Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
