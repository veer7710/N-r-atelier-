import type { ReactNode } from 'react';
import { alpha, shade, tint } from '../utils/color';

/* ============================================================
   Studio primitives for the product renderers.

   Every product image on this site is drawn, not photographed:
   no stock imagery and no competitor packaging stands in for
   NŌR ATELIER. The trade-off is that realism has to be built —
   a seamless sweep, a light pool, a contact shadow, cylindrical
   falloff and a grain pass, all derived from the shade's own value.
   ============================================================ */

export type Set = 'light' | 'dark' | 'stone' | 'rose';

const SETS: Record<Set, { top: string; base: string; pool: string; floor: string }> = {
  light: { top: '#FBF8F3', base: '#E8DFD2', pool: '#FFFDF9', floor: '#DCD0BF' },
  stone: { top: '#EFE7DA', base: '#DACDBA', pool: '#F8F2E8', floor: '#CDBDA7' },
  dark:  { top: '#352721', base: '#170F0D', pool: '#4A362D', floor: '#120C0A' },
  rose:  { top: '#F0DEDC', base: '#DCC0BF', pool: '#FBEEEC', floor: '#CFAFAE' },
};

/** Seamless sweep backdrop with a light pool behind the subject. */
export function Sweep({ id, set, horizon = 0.74 }: { id: string; set: Set; horizon?: number }) {
  const s = SETS[set];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.top} />
          <stop offset="0.62" stopColor={s.base} />
        </linearGradient>
        <radialGradient id={`${id}-pool`} cx="0.5" cy={horizon - 0.22} r="0.56">
          <stop offset="0" stopColor={s.pool} stopOpacity="0.95" />
          <stop offset="1" stopColor={s.pool} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          {/* A real seamless sweep curves into the floor rather than
              meeting it at a hard line, so the band fades in. */}
          <stop offset="0" stopColor={s.floor} stopOpacity="0" />
          <stop offset="0.22" stopColor={s.floor} stopOpacity="0.72" />
          <stop offset="0.45" stopColor={s.floor} stopOpacity="0.88" />
          <stop offset="1" stopColor={s.base} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      <rect width="400" height="500" fill={`url(#${id}-pool)`} />
      {/* A horizon at or past 1 means no floor: close-ups and flat-lays
          should not have a seamless-sweep band cutting through them. */}
      {horizon < 1 && (
        <rect
          y={500 * horizon - 34}
          width="400"
          height={500 * (1 - horizon) + 34}
          fill={`url(#${id}-floor)`}
        />
      )}
    </>
  );
}

/** The soft directional shadow a single large softbox throws to the right. */
export function CastShadow({
  id, cx, cy, rx, ry, strength = 0.3, skew = 14,
}: { id: string; cx: number; cy: number; rx: number; ry: number; strength?: number; skew?: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-cast`}>
          <stop offset="0" stopColor="#2B1C14" stopOpacity={strength} />
          <stop offset="0.55" stopColor="#2B1C14" stopOpacity={strength * 0.45} />
          <stop offset="1" stopColor="#2B1C14" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx} cy={cy} rx={rx} ry={ry}
        fill={`url(#${id}-cast)`}
        transform={`rotate(${skew} ${cx} ${cy})`}
      />
    </>
  );
}

/** Tight occlusion where the product meets the surface. Sells the contact. */
export function ContactShadow({ cx, cy, rx, ry = 3 }: { cx: number; cy: number; rx: number; ry?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#1E1310" opacity="0.4" style={{ filter: 'blur(2px)' }} />;
}

/**
 * Cylindrical body shading. Five stops across the width:
 * turned edge, falloff, specular core, falloff, deeper turned edge —
 * the gradient a cylinder actually produces under one soft source.
 */
export function cylinderStops(base: string, gloss = 0.5) {
  return [
    { offset: '0%',   color: shade(base, 0.52) },
    { offset: '9%',   color: shade(base, 0.26) },
    { offset: '27%',  color: tint(base, 0.08 + gloss * 0.34) },
    { offset: '38%',  color: tint(base, gloss * 0.1) },
    { offset: '70%',  color: shade(base, 0.2) },
    { offset: '88%',  color: shade(base, 0.44) },
    { offset: '100%', color: shade(base, 0.6) },
  ];
}

export function Cylinder({ id, base, gloss = 0.5 }: { id: string; base: string; gloss?: number }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      {cylinderStops(base, gloss).map((s) => (
        <stop key={s.offset} offset={s.offset} stopColor={s.color} />
      ))}
    </linearGradient>
  );
}

/** A narrow blown-out specular stripe. Used sparingly — one per surface. */
export function Specular({
  x, y, w, h, opacity = 0.5, r = 1,
}: { x: number; y: number; w: number; h: number; opacity?: number; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill="#FFFCF7" opacity={opacity} style={{ filter: 'blur(1.2px)' }} />;
}

/** Engraved brand mark: a dark bite above, a light lift below. */
export function Deboss({
  x, y, size, tone = 'light', text, letterSpacing = 1.6, weight = 500, family,
}: {
  x: number; y: number; size: number; tone?: 'light' | 'dark';
  text: string; letterSpacing?: number; weight?: number; family?: string;
}) {
  const hi = tone === 'light' ? '#FFF6E8' : '#FFFFFF';
  const lo = tone === 'light' ? '#1B110D' : '#2A1C16';
  const common = {
    x, fontSize: size, letterSpacing, textAnchor: 'middle' as const,
    fontWeight: weight, fontFamily: family ?? 'Instrument Sans, sans-serif',
  };
  return (
    <g>
      <text {...common} y={y - 0.5} fill={lo} opacity="0.5">{text}</text>
      <text {...common} y={y + 0.6} fill={hi} opacity="0.22">{text}</text>
      <text {...common} y={y} fill={tone === 'light' ? alpha('#F3E6D2', 0.72) : alpha('#2A1C16', 0.6)}>{text}</text>
    </g>
  );
}

/** Film grain. One pass over the whole frame keeps renders from looking vector-flat. */
export function Grain({ id, opacity = 0.17 }: { id: string; opacity?: number }) {
  return (
    <>
      <defs>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect
        width="400" height="500"
        filter={`url(#${id}-grain)`}
        opacity={opacity}
        style={{ mixBlendMode: 'overlay' }}
      />
    </>
  );
}

/** Vignette — pulls the eye to the product without looking like a filter. */
export function Vignette({ id, strength = 0.2 }: { id: string; strength?: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-vig`} cx="0.5" cy="0.46" r="0.72">
          <stop offset="0.55" stopColor="#1E1310" stopOpacity="0" />
          <stop offset="1" stopColor="#1E1310" stopOpacity={strength} />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-vig)`} />
    </>
  );
}

/** Frame wrapper: fixed 4:5 stage, fills its container, never shifts layout. */
export function Stage({
  id, set, children, label, horizon, grain = 0.16, vignette = 0.16, className,
}: {
  id: string; set: Set; children: ReactNode; label: string;
  horizon?: number; grain?: number; vignette?: number; className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label={label}
      style={{ width: '100%', height: '100%', display: 'block' }}
      preserveAspectRatio="xMidYMid slice"
    >
      <Sweep id={id} set={set} horizon={horizon} />
      {children}
      <Vignette id={id} strength={vignette} />
      <Grain id={id} opacity={grain} />
    </svg>
  );
}
