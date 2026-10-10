# NŌR ATELIER — brand prototype

A website prototype for NŌR ATELIER, a colour cosmetics brand in development.
Five lip products, twenty-five shades, thirteen proposed for a first release.

**This is a prototype.** There is no checkout, no stock, no company and no
product. Everything on the site is design intent, and the site says so on
every page rather than hiding it.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built output
npx tsc --noEmit -p tsconfig.app.json   # typecheck
```

Node 22. No backend, no environment variables, no API keys.

## Where things live

| What | Where |
|---|---|
| Product data, prices, shades, bundles | `src/data/products.ts` |
| Design tokens (colour, type, space, motion) | `src/styles/tokens.css` |
| Base styles and typography | `src/styles/base.css` |
| Component styles | `src/styles/components.css` |
| Page layouts | `src/styles/pages.css` |
| Wordmark, monogram, favicon | `src/brand/`, `public/favicon.svg` |
| Product image renderers | `src/render/products.tsx` |
| Studio primitives (sweeps, shadows, grain) | `src/render/primitives.tsx` |
| Bag state and persistence | `src/context/BagContext.tsx` |
| Fonts (self-hosted) | `src/styles/fonts/` |

## Common edits

**Change a price** — `src/data/products.ts`, the `price` field on the product.
Everything downstream (cards, product pages, the bag, bundle "bought
separately" totals) recalculates from it.

**Change or add a shade** — the `shades` array on a product. `hex` drives both
the interface swatch and the drawn product image, so a new shade needs no new
artwork. `release: 'first'` makes a shade purchasable; `release: 'later'` shows
it as second-release and blocks add-to-bag.

**Change which shade a card shows** — the `cardShade` field on a product.

**Change the palette** — `src/styles/tokens.css`. Product renders derive their
espresso, champagne and ivory from constants at the top of
`src/render/products.tsx`.

## About the imagery

Every product image is drawn in SVG at render time from the shade's own colour
value. There is no photography and no stock imagery anywhere on this site, and
no competitor's product is used to stand in for a NŌR ATELIER one. The
trade-off is that these are concept visuals, not product shots — they show
intended form and finish, not a manufactured object.

## Not connected

- No checkout, payment provider or order system.
- No analytics, tracking or cookies.
- The contact form posts nowhere and stores nothing.
- The only persisted data is the bag, in the visitor's own browser, under
  `nor-atelier.bag.v1`.

## Still provisional

Prices, shades, packaging, copy and the brand name itself. Nothing has been
manufactured, tested, costed by a supplier, or registered.

Routing uses `HashRouter` so the static build works on any host without
server-side rewrite rules.
