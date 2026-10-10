import './wordmark.css';

/* ============================================================
   NŌR ATELIER — wordmark system
   Four lockups, all built from live text so the macron (U+014C)
   renders from the typeface rather than being faked as a bar.
   The separate hairline rule is the brand's graphic device.
   ============================================================ */

type Tone = 'ink' | 'light';

/** Stacked primary lockup. Hero, footer, brand moments. */
export function WordmarkStacked({
  tone = 'ink',
  size = 'md',
}: {
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <span className={`wm wm--stacked wm--${size} wm--${tone}`} role="img" aria-label="NŌR ATELIER">
      <span className="wm__nor" aria-hidden="true">NŌR</span>
      <span className="wm__rule" aria-hidden="true" />
      <span className="wm__atelier" aria-hidden="true">Atelier</span>
    </span>
  );
}

/** Horizontal secondary lockup. Navigation, compact headers. */
export function WordmarkInline({
  tone = 'ink',
  size = 'md',
}: {
  tone?: Tone;
  size?: 'sm' | 'md';
}) {
  return (
    <span className={`wm wm--inline wm--${size} wm--${tone}`} role="img" aria-label="NŌR ATELIER">
      <span className="wm__nor" aria-hidden="true">NŌR</span>
      <span className="wm__divider" aria-hidden="true" />
      <span className="wm__atelier" aria-hidden="true">Atelier</span>
    </span>
  );
}

/** Compact monogram. Favicon, product caps, social avatar, debossing. */
export function Monogram({
  tone = 'ink',
  size = 28,
  title = 'NŌR ATELIER',
}: {
  tone?: Tone;
  size?: number;
  title?: string;
}) {
  const fg = tone === 'light' ? '#F6F0E8' : '#261B17';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={title}
      className="wm__mono"
    >
      <rect x="0.5" y="0.5" width="39" height="39" fill="none" stroke={fg} strokeOpacity="0.4" />
      {/* The macron, drawn — the device the identity is built on */}
      <rect x="11" y="10.5" width="18" height="1.4" fill={fg} />
      {/* O, geometric, slightly narrowed — a didone counter in outline */}
      <ellipse cx="20" cy="23" rx="7.4" ry="8.4" fill="none" stroke={fg} strokeWidth="2.6" />
    </svg>
  );
}
