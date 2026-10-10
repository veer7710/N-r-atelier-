import { Link } from 'react-router-dom';
import { ProductRender } from '../render/products';
import { moneyShort } from '../utils/format';
import { displayShade, type Product, type Shade } from '../data/products';

/* A product card shows a specific shade, not a generic pack shot, and
   cross-fades to a second drawn view on hover. The shade dots underneath
   are the range at a glance. */
export function ProductCard({
  product, shade, tag, showShades = true, set = 'light',
}: {
  product: Product;
  shade?: Shade;
  tag?: string;
  showShades?: boolean;
  set?: 'light' | 'stone' | 'dark' | 'rose';
}) {
  const s = shade ?? displayShade(product);
  const to = `/product/${product.slug}?shade=${s.id}`;

  return (
    <Link to={to} className="pcard">
      <div className="pcard__frame">
        <ProductRender
          category={product.id}
          shadeHex={s.hex}
          view="closed"
          set={set}
          alt={`${product.name} ${product.type} in ${s.name}, capped`}
        />
        <div className="pcard__alt" aria-hidden="true">
          <ProductRender
            category={product.id}
            shadeHex={s.hex}
            view="open"
            set={set}
            alt=""
          />
        </div>
        {tag && <span className="pcard__tag">{tag}</span>}
      </div>
      <div className="pcard__body">
        <div>
          <p className="pcard__name">{product.name}</p>
          <p className="pcard__meta">{product.type} — {s.name}</p>
          {showShades && (
            <span className="pcard__shades" aria-hidden="true">
              {product.shades.map((x) => (
                <span
                  key={x.id}
                  className="pcard__sw"
                  style={{ background: x.hex, opacity: x.release === 'first' ? 1 : 0.35 }}
                />
              ))}
            </span>
          )}
        </div>
        <p className="pcard__price">{moneyShort(product.price)}</p>
      </div>
    </Link>
  );
}
