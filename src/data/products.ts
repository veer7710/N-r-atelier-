import type { Category, View } from '../render/products';

export type { Category } from '../render/products';

/* ============================================================
   NŌR ATELIER — central product catalogue

   Everything on the site reads from this file: collection pages,
   product pages, shade selectors, search, the bag and the bundles.
   Nothing about a product is written twice.

   HONESTY RULES BAKED INTO THE TYPES
   · `price` is provisional and editable (see PRICING_MODEL.md).
   · A fact is either `design` — a decision NŌR has actually made and
     controls — or `unconfirmed`, which means no supplier has quoted or
     tested it yet. Nothing in between, and nothing invented.
   · No field exists for ingredients, wear time, net weight, vegan or
     cruelty-free status, because none of those are known. They are
     listed in `openQuestions` instead.
   · `release: 'later'` shades are not purchasable. They are shown as
     range intent, not stock.
   ============================================================ */

export type FactStatus = 'design' | 'unconfirmed';

export type Fact = {
  label: string;
  value: string;
  status: FactStatus;
};

export type Shade = {
  id: string;
  name: string;
  /** How the colour behaves, in a makeup artist's terms. */
  description: string;
  /** Interface swatch value. A visual aid, not a colour match promise. */
  hex: string;
  /** Depth band, used for the shade-finder filter. */
  depth: 'light' | 'mid' | 'deep';
  undertone: 'neutral' | 'warm' | 'cool';
  release: 'first' | 'later';
};

export type Product = {
  id: Category;
  /** Range name, always set. */
  name: string;
  /** Category, in plain words. */
  type: string;
  /** Index position in the range — used as an editorial device. */
  index: string;
  slug: string;
  /** One line. Used on cards and in search results. */
  short: string;
  /** Two or three sentences. Product page lede. */
  long: string;
  /** Why this product exists in the range and what it is for. */
  role: string;
  price: number;
  currency: 'GBP';
  /** The shade a card or range tile shows. Not always the first in the
   *  list: ELIXIR and GLASS lead with a tinted shade, because a clear
   *  product rendered on a pale sweep tells you nothing about the format. */
  cardShade: string;
  shades: Shade[];
  facts: Fact[];
  openQuestions: string[];
  /** Which gallery views this product's art direction calls for. */
  views: { view: View; set?: 'light' | 'dark' | 'stone' | 'rose'; caption: string }[];
  related: Category[];
  tags: string[];
  /** Accent used for this category's editorial moments. */
  accent: string;
};

export const CURRENCY = 'GBP';

/* ---- The range -------------------------------------------------------- */

export const PRODUCTS: Product[] = [
  {
    id: 'sculpt',
    name: 'SCULPT',
    type: 'Lip Pencil',
    index: '01',
    slug: 'sculpt-lip-pencil',
    short: 'A precise pencil for drawing the lip line and filling it in.',
    long:
      'SCULPT is the pencil the rest of the range is built around. A slim barrel and a sharpenable ' +
      'tip, intended to hold a clean edge and then fill the whole lip without dragging. Five shades ' +
      'chosen as structure first, colour second — they are meant to sit under SIGNATURE and GLASS ' +
      'as much as they are meant to be worn on their own.',
    role: 'Structure. Draw the line, fill the lip, then leave it bare or layer something over it.',
    price: 12,
    currency: 'GBP',
    accent: '#80695B',
    cardShade: 'toffee',
    shades: [
      { id: 'bare', name: 'Bare', description: 'A neutral nude a shade deeper than most lips — the one that reads as "nothing on".', hex: '#B5837A', depth: 'light', undertone: 'neutral', release: 'first' },
      { id: 'rose', name: 'Rosé', description: 'A muted rosy pink. Cool enough to lift a face, dusty enough not to read as pink.', hex: '#C07C7C', depth: 'light', undertone: 'cool', release: 'later' },
      { id: 'toffee', name: 'Toffee', description: 'Warm caramel brown. The nineties liner shade, redrawn slightly softer.', hex: '#A9674B', depth: 'mid', undertone: 'warm', release: 'first' },
      { id: 'mocha', name: 'Mocha', description: 'A deep neutral brown. Gives a nude lip a defined edge without a visible outline.', hex: '#7A4A3A', depth: 'deep', undertone: 'neutral', release: 'later' },
      { id: 'merlot', name: 'Merlot', description: 'Deep burgundy with a cool base. Reads near-black in low light, wine in daylight.', hex: '#6B2B35', depth: 'deep', undertone: 'cool', release: 'first' },
    ],
    facts: [
      { label: 'Format', value: 'Sharpenable wood-cased pencil', status: 'design' },
      { label: 'Intended finish', value: 'Matte, with a soft-touch lay-down', status: 'design' },
      { label: 'Body', value: 'Espresso lacquer, champagne seam, shade declared at the base', status: 'design' },
      { label: 'Shades at first release', value: 'Three of five (Bare, Toffee, Merlot)', status: 'design' },
      { label: 'Net weight', value: 'Not yet set — depends on the barrel the filler runs', status: 'unconfirmed' },
    ],
    openQuestions: [
      'Bulk formula — no laboratory has been briefed, so hardness, slip and pigment load are all open.',
      'Whether the barrel can be sharpened without crumbling at this pigment load.',
      'Net weight, which follows from the chosen barrel.',
    ],
    views: [
      { view: 'closed', set: 'light', caption: 'SCULPT, capped' },
      { view: 'open', set: 'light', caption: 'Sharpened tip, cap set down' },
      { view: 'macro', set: 'dark', caption: 'The tip, close' },
      { view: 'texture', set: 'stone', caption: 'Two passes, drawn' },
    ],
    related: ['signature', 'veil'],
    tags: ['pencil', 'liner', 'lip liner', 'matte', 'definition'],
  },
  {
    id: 'signature',
    name: 'SIGNATURE',
    type: 'Satin Lipstick',
    index: '02',
    slug: 'signature-satin-lipstick',
    short: 'A satin bullet with weight in the hand and colour you can see from across a room.',
    long:
      'SIGNATURE is the range at full opacity. A satin finish rather than a matte one, because satin ' +
      'is what most people actually reach for: colour that reads clearly without going flat or dry ' +
      'across the lip. The case is the heaviest thing NŌR intends to make, and the one piece of the ' +
      'range designed to be set down on a table in front of someone.',
    role: 'Colour, declared. The product for the days that want a decision made.',
    price: 16,
    currency: 'GBP',
    accent: '#632D37',
    cardShade: 'cinnamon',
    shades: [
      { id: 'nude-muse', name: 'Nude Muse', description: 'A neutral nude with enough brown in it to hold its own on camera.', hex: '#BE8A7B', depth: 'light', undertone: 'neutral', release: 'first' },
      { id: 'blush-hour', name: 'Blush Hour', description: 'Soft rose pink. The lightest shade in the range and the most forgiving.', hex: '#CE8A8E', depth: 'light', undertone: 'cool', release: 'later' },
      { id: 'cinnamon', name: 'Cinnamon', description: 'Warm cinnamon brown with a red pull. Looks like autumn and wears all year.', hex: '#A95B42', depth: 'mid', undertone: 'warm', release: 'first' },
      { id: 'after-hours', name: 'After Hours', description: 'Deep brown-red. Dark without tipping into burgundy or black.', hex: '#7A3330', depth: 'deep', undertone: 'warm', release: 'later' },
      { id: 'rouge', name: 'Rouge', description: 'A classic rich red, balanced between blue and orange so it suits most skins.', hex: '#B62A2E', depth: 'mid', undertone: 'neutral', release: 'first' },
    ],
    facts: [
      { label: 'Format', value: 'Twist-up bullet, slant cut', status: 'design' },
      { label: 'Intended finish', value: 'Satin — opaque, with a low sheen', status: 'design' },
      { label: 'Case', value: 'Weighted espresso lacquer, champagne seam at the cap', status: 'design' },
      { label: 'Refillable', value: 'Intended, not engineered — the mechanism has not been sourced', status: 'unconfirmed' },
      { label: 'Net weight', value: 'Not yet set', status: 'unconfirmed' },
    ],
    openQuestions: [
      'Bulk formula and pigment load — nothing has been briefed to a laboratory.',
      'Whether a refillable mechanism is affordable at the volumes NŌR would order.',
      'Case weight and tolerance, which decide whether the cap clicks or rattles.',
    ],
    views: [
      { view: 'closed', set: 'light', caption: 'SIGNATURE, capped' },
      { view: 'open', set: 'light', caption: 'Bullet extended' },
      { view: 'macro', set: 'dark', caption: 'The slant cut' },
      { view: 'texture', set: 'stone', caption: 'Satin, two passes' },
    ],
    related: ['sculpt', 'glass'],
    tags: ['lipstick', 'satin', 'bullet', 'opaque', 'colour'],
  },
  {
    id: 'elixir',
    name: 'ELIXIR',
    type: 'Lip Oil',
    index: '03',
    slug: 'elixir-lip-oil',
    short: 'A sheer, slippery oil in frosted glass. The least decided product in the range.',
    long:
      'ELIXIR is the one you put on without a mirror. A fluid oil rather than a gloss — thinner, less ' +
      'tacky, closer to a treatment than a colour. The vial is frosted glass with a brush applicator, ' +
      'so the shade is visible through the wall before the cap comes off. Glass is left untinted on purpose.',
    role: 'Comfort. Sheer colour and shine for the days you are not making a decision.',
    price: 14,
    currency: 'GBP',
    accent: '#C6AD8A',
    cardShade: 'rose-veil',
    shades: [
      { id: 'glass', name: 'Glass', description: 'Untinted. Shine and slip with no colour at all — wearable over any other product here.', hex: '#F6EFE4', depth: 'light', undertone: 'neutral', release: 'first' },
      { id: 'rose-veil', name: 'Rosé Veil', description: 'A sheer pink wash. Barely a shade — more of a flush.', hex: '#E4A3A6', depth: 'light', undertone: 'cool', release: 'first' },
      { id: 'honey-nude', name: 'Honey Nude', description: 'Warm nude with a golden pull. Sits well over Toffee and Cinnamon.', hex: '#D9A887', depth: 'light', undertone: 'warm', release: 'later' },
      { id: 'cherry-kiss', name: 'Cherry Kiss', description: 'Sheer cherry. Clearly red, still see-through.', hex: '#D2555C', depth: 'mid', undertone: 'cool', release: 'later' },
      { id: 'cocoa-glow', name: 'Cocoa Glow', description: 'A sheer brown. Deepens a bare lip by one step and nothing more.', hex: '#B07A62', depth: 'mid', undertone: 'warm', release: 'later' },
    ],
    facts: [
      { label: 'Format', value: 'Frosted glass vial, brush applicator', status: 'design' },
      { label: 'Intended texture', value: 'Fluid oil — thinner and less tacky than GLASS', status: 'design' },
      { label: 'Shade visibility', value: 'Read through the vial wall before opening', status: 'design' },
      { label: 'Oil blend', value: 'No formula briefed — base oils entirely open', status: 'unconfirmed' },
      { label: 'Fill volume', value: 'Not yet set', status: 'unconfirmed' },
    ],
    openQuestions: [
      'The oil base, which decides almost everything about how this product feels.',
      'Whether glass passes drop testing in a mailer at the weight NŌR wants.',
      'Fill volume and the compatibility of tint with the chosen base.',
    ],
    views: [
      { view: 'closed', set: 'light', caption: 'ELIXIR, capped' },
      { view: 'open', set: 'light', caption: 'Brush, withdrawn' },
      { view: 'macro', set: 'stone', caption: 'A loaded brush' },
      { view: 'texture', set: 'stone', caption: 'Pooled, wet' },
    ],
    related: ['glass', 'veil'],
    tags: ['lip oil', 'oil', 'sheer', 'shine', 'clear', 'treatment'],
  },
  {
    id: 'glass',
    name: 'GLASS',
    type: 'Lip Gloss',
    index: '04',
    slug: 'glass-lip-gloss',
    short: 'High shine in an optically clear tube. Thicker than ELIXIR, and meant to be.',
    long:
      'GLASS is the shine product. A thicker, more cushioned gloss than ELIXIR, in a clear chamfered ' +
      'tube that shows exactly what is inside — the one place in the range where the pack is ' +
      'transparent rather than lacquered. Crystal is a true clear. The tinted shades are built to ' +
      'read as their own colour, not as five versions of the same beige.',
    role: 'Shine. Worn alone, or put over SCULPT and SIGNATURE to change the finish.',
    price: 13,
    currency: 'GBP',
    accent: '#C99C9D',
    cardShade: 'toffee-drip',
    shades: [
      { id: 'crystal', name: 'Crystal', description: 'A true clear. No tint, no shimmer — just shine and a little cushion.', hex: '#F7F1E7', depth: 'light', undertone: 'neutral', release: 'first' },
      { id: 'sugar', name: 'Sugar', description: 'Pale pink, visibly pink in the tube and on the lip. Cool and soft.', hex: '#EFBFC4', depth: 'light', undertone: 'cool', release: 'later' },
      { id: 'toffee-drip', name: 'Toffee Drip', description: 'Caramel nude with a warm pull. The shade that made the brief for this product.', hex: '#C89173', depth: 'mid', undertone: 'warm', release: 'first' },
      { id: 'cocoa-glass', name: 'Cocoa Glass', description: 'A brown nude, deeper than Toffee Drip and more neutral.', hex: '#A97358', depth: 'mid', undertone: 'neutral', release: 'later' },
      { id: 'berry-glaze', name: 'Berry Glaze', description: 'Berry pink. The most pigmented gloss in the range — nearly a sheer lipstick.', hex: '#B55870', depth: 'deep', undertone: 'cool', release: 'first' },
    ],
    facts: [
      { label: 'Format', value: 'Clear chamfered tube, doe-foot applicator', status: 'design' },
      { label: 'Intended texture', value: 'Cushioned, high shine, non-stringy', status: 'design' },
      { label: 'Shade visibility', value: 'Full — the tube is the swatch', status: 'design' },
      { label: 'Base', value: 'No formula briefed', status: 'unconfirmed' },
      { label: 'Fill volume', value: 'Not yet set', status: 'unconfirmed' },
    ],
    openQuestions: [
      'The gloss base, and whether it can be non-sticky at this shine level.',
      'Whether a clear tube can be moulded to the chamfer NŌR has drawn without visible seams.',
      'Fill volume and applicator pick-up.',
    ],
    views: [
      { view: 'closed', set: 'light', caption: 'GLASS, capped' },
      { view: 'open', set: 'light', caption: 'Doe-foot, withdrawn' },
      { view: 'macro', set: 'stone', caption: 'Loaded applicator' },
      { view: 'texture', set: 'stone', caption: 'High shine, pooled' },
    ],
    related: ['elixir', 'signature'],
    tags: ['gloss', 'lip gloss', 'shine', 'clear', 'glass'],
  },
  {
    id: 'veil',
    name: 'VEIL',
    type: 'Lip Stain',
    index: '05',
    slug: 'veil-lip-stain',
    short: 'A sheer wash of colour in an ivory pack. The quietest product in the range.',
    long:
      'VEIL is colour without a finish. A thin, buildable wash applied with a flat precision tip, ' +
      'designed to be worn as a flush rather than a full lip. It is the only product in the range ' +
      'housed in ivory resin instead of espresso lacquer — when colour is the whole proposition, ' +
      'the pack should get out of the way.',
    role: 'Colour, quietly. One pass for a flush, three for something closer to a lipstick.',
    price: 13,
    currency: 'GBP',
    accent: '#C99C9D',
    cardShade: 'rosewater',
    shades: [
      { id: 'rosewater', name: 'Rosewater', description: 'A soft rose. The lightest wash here — one pass is almost a blush.', hex: '#D08D92', depth: 'light', undertone: 'cool', release: 'first' },
      { id: 'pink-theory', name: 'Pink Theory', description: 'A clean mid pink. Cooler and more saturated than Rosewater.', hex: '#D4707F', depth: 'light', undertone: 'cool', release: 'later' },
      { id: 'cherry-pop', name: 'Cherry Pop', description: 'Cherry red, bright and blue-leaning. Builds to a full red in three passes.', hex: '#C33B41', depth: 'mid', undertone: 'cool', release: 'first' },
      { id: 'spiced-berry', name: 'Spiced Berry', description: 'A warm berry with brown underneath. The most wearable deep shade here.', hex: '#A8404B', depth: 'deep', undertone: 'warm', release: 'later' },
      { id: 'fig', name: 'Fig', description: 'A muted deep rose, dusty rather than bright. Quiet at one pass, serious at three.', hex: '#8A4A52', depth: 'deep', undertone: 'neutral', release: 'later' },
    ],
    facts: [
      { label: 'Format', value: 'Flat precision tip, ivory resin body', status: 'design' },
      { label: 'Intended finish', value: 'Sheer, buildable, no shine', status: 'design' },
      { label: 'Body', value: 'Ivory resin with the shade declared as a full base band', status: 'design' },
      { label: 'Base', value: 'No formula briefed — water, gel or oil base all still open', status: 'unconfirmed' },
      { label: 'Wear', value: 'Untested. NŌR makes no wear-time claim', status: 'unconfirmed' },
    ],
    openQuestions: [
      'Base chemistry, which decides whether this stains evenly or patchily.',
      'Whether the flat tip lays colour down cleanly at this viscosity.',
      'Wear and transfer, neither of which has been tested.',
    ],
    views: [
      { view: 'closed', set: 'stone', caption: 'VEIL, capped' },
      { view: 'open', set: 'stone', caption: 'Precision tip' },
      { view: 'macro', set: 'stone', caption: 'The tip, close' },
      { view: 'texture', set: 'light', caption: 'One pass, feathered' },
    ],
    related: ['sculpt', 'elixir'],
    tags: ['stain', 'lip stain', 'sheer', 'buildable', 'tint', 'wash'],
  },
];

/* ---- Lookups --------------------------------------------------------- */

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id);
export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export function findShade(product: Product, shadeId: string) {
  return product.shades.find((s) => s.id === shadeId);
}

export function firstAvailableShade(product: Product) {
  return product.shades.find((s) => s.release === 'first') ?? product.shades[0];
}

/** The shade to show when nothing more specific is chosen. */
export function displayShade(product: Product) {
  return findShade(product, product.cardShade) ?? firstAvailableShade(product);
}

export const launchSkuCount = PRODUCTS.reduce(
  (n, p) => n + p.shades.filter((s) => s.release === 'first').length,
  0,
);

/* ---- Bundles ---------------------------------------------------------
   Bundle prices are set below the sum of their parts, and that sum is
   computed from this file rather than typed in — so the saving shown on
   the site is always arithmetically true. No invented "was" price is
   used anywhere.
   -------------------------------------------------------------------- */

export type Bundle = {
  id: string;
  name: string;
  slug: string;
  short: string;
  price: number;
  /** [category, shadeId] pairs that make up the set. */
  contents: [Category, string][];
};

export const BUNDLES: Bundle[] = [
  {
    id: 'everyday-duo',
    name: 'Everyday Duo',
    slug: 'everyday-duo',
    short: 'SCULPT in Bare with GLASS in Crystal. Definition, then shine.',
    price: 23,
    contents: [['sculpt', 'bare'], ['glass', 'crystal']],
  },
  {
    id: 'signature-pair',
    name: 'Signature Pair',
    slug: 'signature-pair',
    short: 'SCULPT in Toffee with SIGNATURE in Cinnamon. The artist-led pairing.',
    price: 26,
    contents: [['sculpt', 'toffee'], ['signature', 'cinnamon']],
  },
  {
    id: 'gloss-ritual',
    name: 'Gloss Ritual',
    slug: 'gloss-ritual',
    short: 'ELIXIR in Glass with GLASS in Toffee Drip. Two kinds of shine.',
    price: 25,
    contents: [['elixir', 'glass'], ['glass', 'toffee-drip']],
  },
  {
    id: 'lip-edit',
    name: 'The Lip Edit',
    slug: 'the-lip-edit',
    short: 'One of each: the whole range, in its first-release shades.',
    price: 60,
    contents: [
      ['sculpt', 'bare'],
      ['signature', 'nude-muse'],
      ['elixir', 'glass'],
      ['glass', 'crystal'],
      ['veil', 'rosewater'],
    ],
  },
];

export function bundleSeparatePrice(bundle: Bundle) {
  return bundle.contents.reduce((sum, [cat]) => sum + (byId(cat)?.price ?? 0), 0);
}
