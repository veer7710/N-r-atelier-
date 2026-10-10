/* Hairline icons at 1px, matched to the type's stroke weight.
   Each is decorative: every control that uses one also carries a label. */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const IconBag = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" {...S}>
    <path d="M4 6.5h12l-1 10.5H5L4 6.5Z" />
    <path d="M7.2 6.5V5.3a2.8 2.8 0 0 1 5.6 0v1.2" />
  </svg>
);

export const IconSearch = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" {...S}>
    <circle cx="8.8" cy="8.8" r="5.4" />
    <path d="m13 13 3.6 3.6" />
  </svg>
);

export const IconMenu = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" {...S}>
    <path d="M2.5 6.5h15M2.5 13.5h15" />
  </svg>
);

export const IconClose = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" {...S}>
    <path d="m5 5 10 10M15 5 5 15" />
  </svg>
);

export const IconArrow = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" {...S}>
    <path d="M3.5 10h13M11.5 5l5 5-5 5" />
  </svg>
);

export const IconTick = ({ size = 8 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true"
       fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m1.6 5.2 2.1 2.2L8.4 2.6" />
  </svg>
);
