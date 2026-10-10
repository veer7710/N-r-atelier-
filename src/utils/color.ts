/* Small colour helpers used by the SVG product renderers so that every
   highlight, shadow and tint is derived from the shade's own value.
   This is what keeps a clear gloss reading clear and a cherry stain
   reading cherry, instead of every shade looking the same. */

export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
}

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

export function rgbToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, '0')).join('');
}

/** Darken towards a warm black rather than pure black — keeps shadows cosmetic, not muddy. */
export function shade(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const t = { r: 26, g: 17, b: 15 };
  return rgbToHex({
    r: r + (t.r - r) * amount,
    g: g + (t.g - g) * amount,
    b: b + (t.b - b) * amount,
  });
}

/** Lighten towards warm cream, the colour of the studio light in this brand's set. */
export function tint(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const t = { r: 255, g: 250, b: 243 };
  return rgbToHex({
    r: r + (t.r - r) * amount,
    g: g + (t.g - g) * amount,
    b: b + (t.b - b) * amount,
  });
}

/** Relative luminance, 0–1. Used to decide whether a shade needs a dark or light outline. */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function alpha(hex: string, a: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
