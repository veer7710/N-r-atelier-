const GBP = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

/** Always two decimals, always £. Prices on this site are whole pounds,
 *  but subtotals and bundle maths are not, so formatting is centralised. */
export const money = (n: number) => GBP.format(n);

/** Whole pounds without the trailing .00, for large display prices. */
export const moneyShort = (n: number) =>
  Number.isInteger(n) ? `£${n}` : GBP.format(n);
