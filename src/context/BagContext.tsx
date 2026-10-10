import {
  createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState,
} from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS, byId, findShade, type Category } from '../data/products';

/* ============================================================
   Bag state.

   This is a prototype bag: it persists to this browser only and
   there is no checkout behind it. What it does have to get right
   is the thing that quietly breaks on real stores — a line is keyed
   on product AND shade, so adding Rouge never silently becomes
   Cinnamon, and two shades of the same lipstick stay two lines.
   ============================================================ */

export const MAX_QTY = 10;
const STORAGE_KEY = 'nor-atelier.bag.v1';

export type Line = {
  /** `${category}:${shadeId}` — the identity of a bag line. */
  key: string;
  category: Category;
  shadeId: string;
  qty: number;
};

type Action =
  | { type: 'add'; category: Category; shadeId: string; qty: number }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' }
  | { type: 'hydrate'; lines: Line[] };

const lineKey = (category: Category, shadeId: string) => `${category}:${shadeId}`;

function reducer(state: Line[], action: Action): Line[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const key = lineKey(action.category, action.shadeId);
      const existing = state.find((l) => l.key === key);
      if (existing) {
        return state.map((l) =>
          l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.qty) } : l,
        );
      }
      return [...state, { key, category: action.category, shadeId: action.shadeId, qty: Math.min(MAX_QTY, action.qty) }];
    }
    case 'setQty': {
      const qty = Math.round(action.qty);
      if (!Number.isFinite(qty) || qty < 1) return state.filter((l) => l.key !== action.key);
      return state.map((l) => (l.key === action.key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l));
    }
    case 'remove':
      return state.filter((l) => l.key !== action.key);
    case 'clear':
      return [];
    default:
      return state;
  }
}

/** Only resurrect lines that still exist in the catalogue, with sane quantities. */
function readStorage(): Line[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid: Line[] = [];
    for (const item of parsed) {
      if (typeof item !== 'object' || item === null) continue;
      const { category, shadeId, qty } = item as Record<string, unknown>;
      if (typeof category !== 'string' || typeof shadeId !== 'string') continue;
      const product = PRODUCTS.find((p) => p.id === category);
      if (!product) continue;
      const shade = product.shades.find((s) => s.id === shadeId);
      if (!shade || shade.release !== 'first') continue;
      const n = typeof qty === 'number' && Number.isFinite(qty) ? Math.round(qty) : 1;
      valid.push({
        key: lineKey(product.id, shade.id),
        category: product.id,
        shadeId: shade.id,
        qty: Math.max(1, Math.min(MAX_QTY, n)),
      });
    }
    return valid;
  } catch {
    return [];
  }
}

export type ResolvedLine = Line & {
  productName: string;
  productType: string;
  productSlug: string;
  shadeName: string;
  shadeHex: string;
  unitPrice: number;
  lineTotal: number;
};

type BagApi = {
  lines: Line[];
  resolved: ResolvedLine[];
  count: number;
  subtotal: number;
  add: (category: Category, shadeId: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Last add, for the confirmation toast. */
  lastAdded: { name: string; shade: string; qty: number; hex: string } | null;
  dismissToast: () => void;
};

const BagContext = createContext<BagApi | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [] as Line[]);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<BagApi['lastAdded']>(null);
  const hydrated = useRef(false);
  const toastTimer = useRef<number | undefined>(undefined);

  // Hydrate once, after mount, so the first server-equivalent render is stable.
  useEffect(() => {
    dispatch({ type: 'hydrate', lines: readStorage() });
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(lines.map(({ category, shadeId, qty }) => ({ category, shadeId, qty }))),
      );
    } catch {
      /* Private browsing, or storage full. The bag still works for this visit. */
    }
  }, [lines]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const add = useCallback((category: Category, shadeId: string, qty = 1) => {
    const product = byId(category);
    const shade = product && findShade(product, shadeId);
    if (!product || !shade || shade.release !== 'first') return;
    dispatch({ type: 'add', category, shadeId, qty: Math.max(1, Math.min(MAX_QTY, Math.round(qty))) });
    setLastAdded({ name: `${product.name} ${product.type}`, shade: shade.name, qty, hex: shade.hex });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setLastAdded(null), 5000);
  }, []);

  const resolved = useMemo<ResolvedLine[]>(
    () =>
      lines.flatMap((l) => {
        const product = byId(l.category);
        const shade = product && findShade(product, l.shadeId);
        if (!product || !shade) return [];
        return [{
          ...l,
          productName: product.name,
          productType: product.type,
          productSlug: product.slug,
          shadeName: shade.name,
          shadeHex: shade.hex,
          unitPrice: product.price,
          lineTotal: product.price * l.qty,
        }];
      }),
    [lines],
  );

  const value = useMemo<BagApi>(() => ({
    lines,
    resolved,
    count: resolved.reduce((n, l) => n + l.qty, 0),
    subtotal: resolved.reduce((n, l) => n + l.lineTotal, 0),
    add,
    setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
    remove: (key) => dispatch({ type: 'remove', key }),
    clear: () => dispatch({ type: 'clear' }),
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    lastAdded,
    dismissToast: () => setLastAdded(null),
  }), [lines, resolved, add, isOpen, lastAdded]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used inside BagProvider');
  return ctx;
}
