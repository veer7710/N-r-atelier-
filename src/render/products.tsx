import { useId } from 'react';
import {
  CastShadow, ContactShadow, Cylinder, Deboss, Grain, Specular, Sweep, Vignette,
  type Set as StageSet,
} from './primitives';
import { alpha, luminance, shade, tint } from '../utils/color';

/* ============================================================
   NŌR ATELIER — drawn product renders

   Packaging architecture shared across the house:
     · espresso lacquer or ivory resin bodies, machined silhouettes
     · a single champagne hairline at the cap seam — the macron,
       wrapped around the product
     · the shade declared in lacquer at the base, never guessed at
     · NŌR debossed, never printed in full colour

   Each category then departs: SCULPT is slim and architectural,
   SIGNATURE is weighted and sculptural, ELIXIR is frosted glass,
   GLASS is optically clear, VEIL is ivory resin and colour-led.
   ============================================================ */

export type View = 'closed' | 'open' | 'macro' | 'texture';
export type Category = 'sculpt' | 'signature' | 'elixir' | 'glass' | 'veil';

const ESPRESSO = '#2B1E19';
const IVORY_RESIN = '#EFE6DA';
const CHAMPAGNE = '#C6AD8A';

/* ---------------------------------------------------------------- SCULPT */
function Sculpt({ id, c, view }: { id: string; c: string; view: View }) {
  if (view === 'macro') {
    // The sharpened end, close: lacquered barrel, the pale ring where the
    // blade has cut through to raw wood, then the pigment core.
    const WOOD = '#D9C4A8';
    return (
      <g>
        <defs>
          <linearGradient id={`${id}-barrel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={shade(ESPRESSO, 0.55)} />
            <stop offset="0.16" stopColor={shade(ESPRESSO, 0.22)} />
            <stop offset="0.36" stopColor={tint(ESPRESSO, 0.34)} />
            <stop offset="0.52" stopColor={tint(ESPRESSO, 0.06)} />
            <stop offset="0.8" stopColor={shade(ESPRESSO, 0.3)} />
            <stop offset="1" stopColor={shade(ESPRESSO, 0.6)} />
          </linearGradient>
          <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={shade(WOOD, 0.46)} />
            <stop offset="0.3" stopColor={tint(WOOD, 0.3)} />
            <stop offset="0.52" stopColor={WOOD} />
            <stop offset="1" stopColor={shade(WOOD, 0.44)} />
          </linearGradient>
          <linearGradient id={`${id}-cone`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={shade(c, 0.52)} />
            <stop offset="0.26" stopColor={tint(c, 0.26)} />
            <stop offset="0.46" stopColor={c} />
            <stop offset="0.74" stopColor={shade(c, 0.26)} />
            <stop offset="1" stopColor={shade(c, 0.56)} />
          </linearGradient>
          <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={shade(CHAMPAGNE, 0.5)} />
            <stop offset="0.36" stopColor={tint(CHAMPAGNE, 0.5)} />
            <stop offset="1" stopColor={shade(CHAMPAGNE, 0.42)} />
          </linearGradient>
        </defs>

        <CastShadow id={`${id}-s`} cx={236} cy={352} rx={176} ry={26} strength={0.3} skew={-9} />

        <g transform="rotate(-13 200 250)">
          {/* lacquered barrel, running off the right edge */}
          <rect x="196" y="212" width="248" height="76" fill={`url(#${id}-barrel)`} />
          <rect x="196" y="206" width="9" height="88" fill={`url(#${id}-ring)`} />
          <Specular x={226} y={230} w={212} h={6} opacity={0.34} />

          {/* raw wood cone, cut back by the sharpener */}
          <path d="M196 212 L196 288 L104 268 Q96 250 104 232 Z" fill={`url(#${id}-wood)`} />
          <path d="M196 250 L196 288 L104 268 Q100 259 100 250 Z" fill="#1B110D" opacity="0.12" />
          {/* the facets a blade leaves */}
          <path d="M196 224 L112 238" stroke="#FFF4E2" strokeWidth="1.3" opacity="0.4" fill="none" />
          <path d="M196 268 L110 262" stroke="#1B110D" strokeWidth="1.3" opacity="0.14" fill="none" />

          {/* pigment core */}
          <path d="M104 232 Q96 250 104 268 L62 258 Q56 250 62 242 Z" fill={`url(#${id}-cone)`} />
          <path d="M104 250 Q102 260 104 268 L62 258 Q59 254 59 250 Z" fill="#1B110D" opacity="0.16" />
          <path d="M62 242 Q56 250 62 258 Q66 250 62 242 Z" fill={shade(c, 0.18)} />
          <Specular x={74} y={243} w={26} h={3} opacity={0.3} />
        </g>
      </g>
    );
  }

  if (view === 'texture') return <PigmentStroke id={id} c={c} finish="matte" />;

  const open = view === 'open';
  return (
    <g>
      <defs>
        <Cylinder id={`${id}-barrel`} base={ESPRESSO} gloss={0.26} />
        <Cylinder id={`${id}-cap`} base={shade(ESPRESSO, -0.08)} gloss={0.42} />
        <Cylinder id={`${id}-band`} base={c} gloss={0.6} />
        <Cylinder id={`${id}-ring`} base={CHAMPAGNE} gloss={0.75} />
        <linearGradient id={`${id}-tip`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(c, 0.42)} />
          <stop offset="0.34" stopColor={tint(c, 0.14)} />
          <stop offset="1" stopColor={shade(c, 0.48)} />
        </linearGradient>
      </defs>

      <CastShadow id={`${id}-s`} cx={213} cy={388} rx={62} ry={11} strength={0.32} skew={4} />

      {open && (
        /* The cap, set down. Resting on its side, foreshortened. */
        <g>
          <CastShadow id={`${id}-s2`} cx={302} cy={390} rx={46} ry={10} strength={0.26} skew={0} />
          <g transform="rotate(-90 300 392)">
            <rect x="288.5" y="340" width="23" height="104" rx="1.5" fill={`url(#${id}-cap)`} />
            <rect x="288.5" y="340" width="23" height="4" fill={`url(#${id}-ring)`} />
            <ellipse cx="300" cy="444" rx="11.5" ry="3" fill={shade(ESPRESSO, 0.42)} />
            <ellipse cx="300" cy="444" rx="8" ry="2.1" fill="#120B09" />
          </g>
          <ContactShadow cx={300} cy={404} rx={46} ry={3} />
        </g>
      )}

      {/* Barrel */}
      <g>
        {!open && (
          <>
            <rect x="188.5" y="118" width="23" height="112" rx="1.5" fill={`url(#${id}-cap)`} />
            <ellipse cx="200" cy="118" rx="11.5" ry="3" fill={tint(ESPRESSO, 0.2)} />
            <rect x="188.5" y="228" width="23" height="3" fill={`url(#${id}-ring)`} />
            <Deboss x={200} y={160} size={6.6} text="NŌR" letterSpacing={1.1} />
          </>
        )}

        {open && (
          /* Exposed, sharpened tip */
          <g>
            <polygon points="191.5,150 208.5,150 200,102" fill={`url(#${id}-tip)`} />
            <polygon points="200,150 208.5,150 200,102" fill="#1B110D" opacity="0.18" />
            <polygon points="197,116 203,116 200,102" fill={shade(c, 0.22)} />
            <rect x="190" y="150" width="20" height="12" fill={tint(ESPRESSO, 0.34)} />
            <rect x="190" y="150" width="20" height="12" fill={`url(#${id}-barrel)`} opacity="0.5" />
          </g>
        )}

        <rect x="188.5" y={open ? 160 : 231} width="23" height={open ? 222 : 151} rx="1.5" fill={`url(#${id}-barrel)`} />
        <Specular x={193} y={open ? 176 : 244} w={3.4} h={open ? 190 : 124} opacity={0.32} />
        {open && <Deboss x={200} y={262} size={7} text="NŌR" letterSpacing={1.3} />}
        {/* Shade declared in lacquer at the base */}
        <rect x="188.5" y="366" width="23" height="16" fill={`url(#${id}-band)`} />
        <rect x="188.5" y="366" width="23" height="1" fill="#1B110D" opacity="0.3" />
        <ellipse cx="200" cy="382" rx="11.5" ry="2.8" fill={shade(c, 0.4)} />
      </g>
      <ContactShadow cx={200} cy={384} rx={14} ry={2.8} />
    </g>
  );
}

/* ------------------------------------------------------------- SIGNATURE */
function Signature({ id, c, view }: { id: string; c: string; view: View }) {
  if (view === 'texture') return <PigmentStroke id={id} c={c} finish="satin" />;

  if (view === 'macro') {
    /* The bullet, close. Satin means a broad soft highlight that wraps,
       not the hard specular line a gloss would throw. */
    return (
      <g>
        <defs>
          <linearGradient id={`${id}-bl`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={shade(c, 0.5)} />
            <stop offset="0.16" stopColor={shade(c, 0.18)} />
            <stop offset="0.4" stopColor={tint(c, 0.3)} />
            <stop offset="0.56" stopColor={c} />
            <stop offset="0.86" stopColor={shade(c, 0.34)} />
            <stop offset="1" stopColor={shade(c, 0.56)} />
          </linearGradient>
          <linearGradient id={`${id}-face`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor={tint(c, 0.42)} />
            <stop offset="0.5" stopColor={tint(c, 0.1)} />
            <stop offset="1" stopColor={shade(c, 0.24)} />
          </linearGradient>
          <Cylinder id={`${id}-case`} base={ESPRESSO} gloss={0.5} />
        </defs>
        <CastShadow id={`${id}-s`} cx={206} cy={414} rx={132} ry={24} strength={0.3} skew={6} />
        <g transform="rotate(8 200 250)">
          <rect x="112" y="300" width="176" height="130" fill={`url(#${id}-case)`} />
          <ellipse cx="200" cy="300" rx="88" ry="17" fill={shade(ESPRESSO, 0.22)} />
          <path d="M112 300 Q112 142 158 110 L252 70 Q288 92 288 300 Z" fill={`url(#${id}-bl)`} />
          <path d="M158 110 L252 70 Q268 78 272 96 L176 136 Q164 124 158 110 Z" fill={`url(#${id}-face)`} />
          <Specular x={150} y={150} w={16} h={150} opacity={0.3} r={8} />
          <Specular x={238} y={118} w={9} h={176} opacity={0.14} r={5} />
        </g>
      </g>
    );
  }

  const open = view === 'open';
  return (
    <g>
      <defs>
        <Cylinder id={`${id}-case`} base={ESPRESSO} gloss={0.52} />
        <Cylinder id={`${id}-cap`} base={shade(ESPRESSO, -0.06)} gloss={0.6} />
        <Cylinder id={`${id}-ring`} base={CHAMPAGNE} gloss={0.8} />
        <linearGradient id={`${id}-bullet`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(c, 0.46)} />
          <stop offset="0.2" stopColor={shade(c, 0.12)} />
          <stop offset="0.42" stopColor={tint(c, 0.26)} />
          <stop offset="0.58" stopColor={c} />
          <stop offset="0.86" stopColor={shade(c, 0.32)} />
          <stop offset="1" stopColor={shade(c, 0.52)} />
        </linearGradient>
        <linearGradient id={`${id}-slant`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor={tint(c, 0.4)} />
          <stop offset="1" stopColor={shade(c, 0.2)} />
        </linearGradient>
      </defs>

      <CastShadow id={`${id}-s`} cx={214} cy={370} rx={70} ry={13} strength={0.34} skew={5} />

      {open && (
        <g>
          <CastShadow id={`${id}-s2`} cx={308} cy={374} rx={52} ry={12} strength={0.26} />
          <g transform="rotate(-90 304 378)">
            <rect x="282" y="312" width="44" height="106" rx="2" fill={`url(#${id}-cap)`} />
            <rect x="282" y="414" width="44" height="4" fill={`url(#${id}-ring)`} />
            <ellipse cx="304" cy="312" rx="22" ry="5.5" fill={tint(ESPRESSO, 0.18)} />
            {/* open end: the rim catches light, the bore stays dark */}
            <ellipse cx="304" cy="418" rx="22" ry="5.5" fill={shade(ESPRESSO, 0.5)} />
            <ellipse cx="304" cy="418" rx="17" ry="4" fill="#120B09" />
          </g>
          <ContactShadow cx={304} cy={392} rx={50} ry={4} />
        </g>
      )}

      {/* Case */}
      {!open && (
        <>
          <rect x="177" y="114" width="46" height="128" rx="2" fill={`url(#${id}-cap)`} />
          <ellipse cx="200" cy="114" rx="23" ry="5.4" fill={tint(ESPRESSO, 0.2)} />
          <rect x="177" y="240" width="46" height="4" fill={`url(#${id}-ring)`} />
          <Deboss x={200} y={166} size={9.5} text="NŌR" letterSpacing={2} />
        </>
      )}

      {open && (
        /* Bullet extended. Narrower than the case it rises out of, and
           about a third of its length — the proportion a real twist-up has. */
        <g>
          <path d="M182 198 L182 176 L212 140 Q219 133 219 145 L219 198 Z" fill={`url(#${id}-bullet)`} />
          <path d="M182 176 L212 140 Q219 133 219 145 Q201 191 182 176 Z" fill={`url(#${id}-slant)`} />
          <path d="M182 176 Q201 191 219 145" stroke={tint(c, 0.5)} strokeWidth="1.2" fill="none" opacity="0.5" />
          <Specular x={188} y={168} w={5} h={30} opacity={0.3} r={2.5} />
          {/* the metal cup the bullet sits in */}
          <rect x="176" y="196" width="48" height="9" rx="1" fill={tint(ESPRESSO, 0.34)} />
          <rect x="176" y="196" width="48" height="9" fill={`url(#${id}-case)`} opacity="0.5" />
          <rect x="176" y="196" width="48" height="1.4" fill="#FFF6E8" opacity="0.26" />
        </g>
      )}

      <rect x="177" y={open ? 204 : 243} width="46" height={open ? 160 : 121} rx="2" fill={`url(#${id}-case)`} />
      <Specular x={186} y={open ? 220 : 258} w={6} h={open ? 132 : 94} opacity={0.34} r={3} />
      {open && <Deboss x={200} y={272} size={9} text="NŌR" letterSpacing={1.9} />}
      {/* Shade collar */}
      <rect x="177" y="348" width="46" height="18" fill={`url(#${id}-ring)`} opacity="0" />
      <rect x="177" y={open ? 348 : 348} width="46" height="16" fill={c} />
      <rect x="177" y={open ? 348 : 348} width="46" height="16" fill={`url(#${id}-bullet)`} opacity="0.55" />
      <rect x="177" y="348" width="46" height="1" fill="#1B110D" opacity="0.28" />
      <ellipse cx="200" cy="364" rx="23" ry="5" fill={shade(c, 0.42)} />
      <ContactShadow cx={200} cy={367} rx={27} ry={4} />
    </g>
  );
}

/* ---------------------------------------------------------------- ELIXIR */
function Elixir({ id, c, view }: { id: string; c: string; view: View }) {
  // "Glass" is a clear oil. It has to read as clear, so near-white shades
  // drop almost all tint and rely on refraction and the meniscus instead.
  const clear = luminance(c) > 0.74;
  const liquid = clear ? '#F4E9D8' : c;
  const liqOpacity = clear ? 0.5 : 0.9;

  if (view === 'texture') return <GlossPool id={id} c={c} clear={clear} spread={0.9} />;

  if (view === 'macro') {
    /* Brush applicator, loaded. A pendant drop catches the key light. */
    return (
      <g>
        <defs>
          <linearGradient id={`${id}-wand`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={shade(ESPRESSO, 0.4)} />
            <stop offset="0.35" stopColor={tint(ESPRESSO, 0.3)} />
            <stop offset="1" stopColor={shade(ESPRESSO, 0.5)} />
          </linearGradient>
          <radialGradient id={`${id}-drop`} cx="0.36" cy="0.3" r="0.76">
            <stop offset="0" stopColor={tint(liquid, 0.6)} stopOpacity="0.95" />
            <stop offset="0.45" stopColor={liquid} stopOpacity={liqOpacity} />
            <stop offset="1" stopColor={shade(liquid, 0.34)} stopOpacity={liqOpacity} />
          </radialGradient>
        </defs>
        <CastShadow id={`${id}-s`} cx={206} cy={424} rx={128} ry={22} strength={0.24} skew={-8} />
        <g transform="rotate(-32 200 240)">
          <rect x="186" y="40" width="28" height="196" rx="4" fill={`url(#${id}-wand)`} />
          {/* flocked applicator */}
          <path d="M184 236 Q172 288 200 342 Q228 288 216 236 Z" fill={shade(liquid, 0.3)} opacity="0.95" />
          <path d="M184 236 Q176 288 200 342 Q198 290 196 236 Z" fill="#1B110D" opacity="0.2" />
          <path d="M190 250 Q184 290 200 330" stroke={tint(liquid, 0.5)} strokeWidth="5" fill="none" opacity="0.4" />
          {/* pendant drop */}
          <ellipse cx="200" cy="364" rx="20" ry="26" fill={`url(#${id}-drop)`} />
          <ellipse cx="192" cy="354" rx="6" ry="8" fill="#FFFDF7" opacity="0.72" />
          <ellipse cx="208" cy="376" rx="4" ry="5" fill="#FFFDF7" opacity="0.3" />
        </g>
      </g>
    );
  }

  const open = view === 'open';
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7C6F5F" stopOpacity="0.62" />
          <stop offset="0.06" stopColor="#F6F0E6" stopOpacity="0.66" />
          <stop offset="0.3" stopColor="#FFFDF8" stopOpacity="0.8" />
          <stop offset="0.58" stopColor="#DFD3C1" stopOpacity="0.46" />
          <stop offset="0.9" stopColor="#B3A593" stopOpacity="0.8" />
          <stop offset="1" stopColor="#6E6253" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(liquid, 0.4)} stopOpacity={liqOpacity} />
          <stop offset="0.3" stopColor={tint(liquid, 0.18)} stopOpacity={liqOpacity * 0.82} />
          <stop offset="0.52" stopColor={liquid} stopOpacity={liqOpacity} />
          <stop offset="1" stopColor={shade(liquid, 0.44)} stopOpacity={liqOpacity} />
        </linearGradient>
        <Cylinder id={`${id}-cap`} base={ESPRESSO} gloss={0.5} />
        <Cylinder id={`${id}-ring`} base={CHAMPAGNE} gloss={0.8} />
      </defs>

      <CastShadow id={`${id}-s`} cx={216} cy={386} rx={66} ry={12} strength={0.28} skew={4} />
      {/* Light transmitted through the vial and thrown onto the sweep */}
      <ellipse cx="196" cy="394" rx="40" ry="9" fill={alpha(liquid, clear ? 0.16 : 0.26)} style={{ filter: 'blur(5px)' }} />

      {open && (
        <g>
          <CastShadow id={`${id}-s2`} cx={310} cy={386} rx={54} ry={11} strength={0.24} />
          <g transform="rotate(-90 306 376)">
            <rect x="292" y="300" width="28" height="98" rx="2" fill={`url(#${id}-cap)`} />
            <rect x="292" y="394" width="28" height="4" fill={`url(#${id}-ring)`} />
            {/* wand protruding from the cap */}
            <rect x="301" y="398" width="10" height="56" fill={shade(ESPRESSO, 0.3)} />
            <path d="M299 454 Q295 478 306 496 Q317 478 313 454 Z" fill={shade(liquid, 0.26)} />
          </g>
          <ContactShadow cx={300} cy={392} rx={54} ry={4} />
        </g>
      )}

      {/* Vial: frosted glass with shoulders */}
      <g>
        {!open && (
          <>
            <rect x="184" y="126" width="32" height="78" rx="2" fill={`url(#${id}-cap)`} />
            <ellipse cx="200" cy="126" rx="16" ry="4" fill={tint(ESPRESSO, 0.2)} />
            <rect x="184" y="202" width="32" height="3.5" fill={`url(#${id}-ring)`} />
            <Deboss x={200} y={164} size={7} text="NŌR" letterSpacing={1.3} />
          </>
        )}
        <path
          d={open
            ? 'M176 210 Q176 194 186 188 L214 188 Q224 194 224 210 L224 372 Q224 382 214 382 L186 382 Q176 382 176 372 Z'
            : 'M176 226 Q176 210 186 204 L214 204 Q224 210 224 226 L224 372 Q224 382 214 382 L186 382 Q176 382 176 372 Z'}
          fill={`url(#${id}-glass)`}
        />
        {/* liquid, with a meniscus that curves up the glass wall */}
        <path
          d={`M179 ${open ? 252 : 262} Q200 ${open ? 244 : 254} 221 ${open ? 252 : 262} L221 370 Q221 379 213 379 L187 379 Q179 379 179 370 Z`}
          fill={`url(#${id}-liq)`}
        />
        <path
          d={`M179 ${open ? 252 : 262} Q200 ${open ? 244 : 254} 221 ${open ? 252 : 262} L221 ${open ? 258 : 268} Q200 ${open ? 251 : 261} 179 ${open ? 258 : 268} Z`}
          fill="#FFFDF7" opacity="0.4"
        />
        {/* glass edges */}
        <rect x="177.4" y={open ? 212 : 228} width="2.6" height="162" fill="#FFFEFA" opacity="0.72" />
        <rect x="219.8" y={open ? 212 : 228} width="2.4" height="162" fill="#6E6253" opacity="0.52" />
        <Specular x={186} y={open ? 216 : 232} w={5} h={140} opacity={0.42} r={2.5} />
        <ellipse cx="200" cy="381" rx="24" ry="4" fill="#A3937F" opacity="0.5" />
        <Deboss x={200} y={356} size={6} text="ELIXIR" letterSpacing={2.4} tone="dark" />
      </g>
      <ContactShadow cx={200} cy={383} rx={26} ry={3.5} />
    </g>
  );
}

/* ----------------------------------------------------------------- GLASS */
function Glass({ id, c, view }: { id: string; c: string; view: View }) {
  const clear = luminance(c) > 0.76;
  const prod = clear ? '#F7EFE2' : c;
  const prodOp = clear ? 0.42 : 0.92;

  if (view === 'texture') return <GlossPool id={id} c={c} clear={clear} spread={1.06} />;

  if (view === 'macro') {
    /* Doe-foot, loaded, with the thread of gloss that follows it out
       of the tube. The single hardest-edged highlight in the house. */
    return (
      <g>
        <defs>
          <linearGradient id={`${id}-stem`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#CDC1B0" stopOpacity="0.8" />
            <stop offset="0.36" stopColor="#FFFEFA" stopOpacity="0.9" />
            <stop offset="1" stopColor="#B7A997" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`${id}-foot`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={shade(prod, 0.4)} stopOpacity={prodOp} />
            <stop offset="0.34" stopColor={tint(prod, 0.3)} stopOpacity={prodOp} />
            <stop offset="1" stopColor={shade(prod, 0.46)} stopOpacity={prodOp} />
          </linearGradient>
        </defs>
        <CastShadow id={`${id}-s`} cx={210} cy={430} rx={126} ry={20} strength={0.24} skew={-10} />
        <g transform="rotate(26 200 240)">
          <rect x="188" y="30" width="24" height="200" rx="3" fill={`url(#${id}-stem)`} />
          <path d="M180 230 Q166 294 200 352 Q234 294 220 230 Z" fill={`url(#${id}-foot)`} />
          <path d="M186 244 Q178 294 200 338" stroke="#FFFDF7" strokeWidth="7" fill="none" opacity="0.5" />
          <path d="M214 244 Q220 290 204 334" stroke={shade(prod, 0.4)} strokeWidth="5" fill="none" opacity="0.5" />
          {/* trailing thread */}
          <path d="M200 352 Q204 384 196 410 Q192 424 200 436" stroke={prod} strokeWidth="9" fill="none"
                opacity={prodOp} strokeLinecap="round" />
          <path d="M199 358 Q202 384 195 406" stroke="#FFFDF7" strokeWidth="2.6" fill="none" opacity="0.6" />
          <ellipse cx="200" cy="440" rx="11" ry="9" fill={prod} opacity={prodOp} />
          <ellipse cx="196" cy="436" rx="3.4" ry="2.6" fill="#FFFDF7" opacity="0.8" />
        </g>
      </g>
    );
  }

  const open = view === 'open';
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-tube`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6F6354" stopOpacity="0.55" />
          <stop offset="0.05" stopColor="#FFFEFB" stopOpacity="0.92" />
          <stop offset="0.14" stopColor={shade(prod, 0.3)} stopOpacity={prodOp} />
          <stop offset="0.4" stopColor={tint(prod, 0.36)} stopOpacity={prodOp * 0.9} />
          <stop offset="0.58" stopColor={prod} stopOpacity={prodOp} />
          <stop offset="0.84" stopColor={shade(prod, 0.36)} stopOpacity={prodOp} />
          <stop offset="0.94" stopColor="#FFFEFB" stopOpacity="0.72" />
          <stop offset="1" stopColor="#5F5447" stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(prod, 0.34)} stopOpacity={clear ? 0.3 : 0.85} />
          <stop offset="0.38" stopColor={tint(prod, 0.22)} stopOpacity={clear ? 0.24 : 0.78} />
          <stop offset="1" stopColor={shade(prod, 0.42)} stopOpacity={clear ? 0.3 : 0.85} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C2B5A3" stopOpacity="0.72" />
          <stop offset="0.3" stopColor="#FFFEFB" stopOpacity="0.82" />
          <stop offset="0.62" stopColor="#E9E0D2" stopOpacity="0.5" />
          <stop offset="1" stopColor="#A89B8A" stopOpacity="0.8" />
        </linearGradient>
        <Cylinder id={`${id}-ring`} base={CHAMPAGNE} gloss={0.85} />
      </defs>

      <CastShadow id={`${id}-s`} cx={218} cy={382} rx={64} ry={11} strength={0.26} skew={5} />
      {/* caustic: light focused through the tube */}
      <ellipse cx="192" cy="392" rx="46" ry="8" fill={alpha(prod, clear ? 0.2 : 0.3)} style={{ filter: 'blur(6px)' }} />

      {open && (
        <g>
          <CastShadow id={`${id}-s2`} cx={312} cy={382} rx={52} ry={10} strength={0.24} />
          <g transform="rotate(-90 308 374)">
            <rect x="294" y="300" width="28" height="92" rx="2" fill={`url(#${id}-cap)`} />
            <rect x="294" y="388" width="28" height="4" fill={`url(#${id}-ring)`} />
            <rect x="303" y="392" width="10" height="48" fill="#DCD2C2" opacity="0.8" />
            <path d="M301 440 Q296 466 308 486 Q320 466 315 440 Z" fill={shade(prod, 0.22)} opacity={prodOp} />
          </g>
          <ContactShadow cx={302} cy={390} rx={52} ry={4} />
        </g>
      )}

      {/* Chamfered clear tube — the silhouette that separates GLASS from ELIXIR */}
      <g>
        {!open && (
          <>
            <path d="M182 128 L218 128 L222 140 L222 198 L178 198 L178 140 Z" fill={`url(#${id}-cap)`} />
            <rect x="178" y="196" width="44" height="3.5" fill={`url(#${id}-ring)`} />
            <Specular x={186} y={136} w={4} h={56} opacity={0.5} r={2} />
          </>
        )}
        <path
          d={open
            ? 'M178 204 L222 204 L226 220 L226 366 Q226 378 214 378 L186 378 Q174 378 174 366 L174 220 Z'
            : 'M178 199 L222 199 L226 215 L226 366 Q226 378 214 378 L186 378 Q174 378 174 366 L174 215 Z'}
          fill={`url(#${id}-tube)`}
        />
        {/* chamfer facets catch light differently from the body */}
        {/* fill level: the product stops short of the shoulder */}
        <path
          d={`M175 ${open ? 244 : 239} Q200 ${open ? 252 : 247} 225 ${open ? 244 : 239} L225 364 Q225 377 213 377 L187 377 Q175 377 175 364 Z`}
          fill={`url(#${id}-fill)`}
        />
        <path d={`M175 ${open ? 244 : 239} Q200 ${open ? 252 : 247} 225 ${open ? 244 : 239}`}
              stroke="#FFFEF9" strokeWidth="1.6" fill="none" opacity="0.55" />
        <path d={open ? 'M178 204 L222 204 L226 220 L174 220 Z' : 'M178 199 L222 199 L226 215 L174 215 Z'}
              fill="#FFFEFB" opacity="0.4" />
        <rect x="175.2" y={open ? 222 : 217} width="2.8" height="155" fill="#FFFEFC" opacity="0.8" />
        <rect x="221.8" y={open ? 222 : 217} width="2.4" height="155" fill="#6B6052" opacity="0.46" />
        <Specular x={184} y={open ? 228 : 223} w={7} h={132} opacity={0.7} r={3.5} />
        <Specular x={213} y={open ? 240 : 235} w={3} h={108} opacity={0.34} r={1.5} />
        <ellipse cx="200" cy="377" rx="25" ry="4" fill={shade(prod, 0.3)} opacity={prodOp} />
        <Deboss x={200} y={352} size={6} text="GLASS" letterSpacing={2.6} tone="dark" />
      </g>
      <ContactShadow cx={200} cy={379} rx={27} ry={3.5} />
    </g>
  );
}

/* ------------------------------------------------------------------ VEIL */
function Veil({ id, c, view }: { id: string; c: string; view: View }) {
  if (view === 'texture') return <StainBlot id={id} c={c} />;

  if (view === 'macro') {
    /* Precision tip. VEIL is the one applicator in the range with a
       flat, chisel sponge — colour laid down, not painted on. */
    return (
      <g>
        <defs>
          <Cylinder id={`${id}-stem`} base={IVORY_RESIN} gloss={0.3} />
          <linearGradient id={`${id}-sponge`} x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor={shade(c, 0.36)} />
            <stop offset="0.4" stopColor={c} />
            <stop offset="1" stopColor={shade(c, 0.44)} />
          </linearGradient>
        </defs>
        <CastShadow id={`${id}-s`} cx={208} cy={420} rx={124} ry={20} strength={0.22} skew={-8} />
        <g transform="rotate(-20 200 240)">
          <rect x="182" y="40" width="36" height="208" rx="4" fill={`url(#${id}-stem)`} />
          <rect x="182" y="244" width="36" height="6" fill={shade(ESPRESSO, -0.1)} />
          <path d="M180 250 L220 250 L212 348 Q200 362 188 348 Z" fill={`url(#${id}-sponge)`} />
          <path d="M200 250 L220 250 L212 348 Q206 356 200 356 Z" fill="#1B110D" opacity="0.14" />
          <path d="M188 268 L196 340" stroke={tint(c, 0.36)} strokeWidth="4" opacity="0.4" />
          {/* colour already transferred, soft-edged */}
          <ellipse cx="200" cy="372" rx="26" ry="10" fill={c} opacity="0.5" style={{ filter: 'blur(5px)' }} />
        </g>
      </g>
    );
  }

  const open = view === 'open';
  return (
    <g>
      <defs>
        <Cylinder id={`${id}-body`} base={IVORY_RESIN} gloss={0.24} />
        <Cylinder id={`${id}-cap`} base={ESPRESSO} gloss={0.44} />
        <Cylinder id={`${id}-shade`} base={c} gloss={0.42} />
        <Cylinder id={`${id}-ring`} base={CHAMPAGNE} gloss={0.75} />
      </defs>

      <CastShadow id={`${id}-s`} cx={216} cy={388} rx={68} ry={12} strength={0.3} skew={4} />

      {open && (
        <g>
          <CastShadow id={`${id}-s2`} cx={310} cy={388} rx={50} ry={11} strength={0.26} />
          <g transform="rotate(-90 306 380)">
            <rect x="288" y="320" width="36" height="98" rx="3" fill={`url(#${id}-cap)`} />
            <rect x="288" y="414" width="36" height="4" fill={`url(#${id}-ring)`} />
            <ellipse cx="306" cy="320" rx="18" ry="4" fill={tint(ESPRESSO, 0.18)} />
          </g>
          <ContactShadow cx={302} cy={394} rx={50} ry={4} />
        </g>
      )}

      {/* Flat-oval ivory resin body. Lighter than the rest of the house
          on purpose: VEIL is the colour-led product, so the pack recedes. */}
      <g>
        {!open && (
          <>
            <rect x="180" y="124" width="40" height="92" rx="4" fill={`url(#${id}-cap)`} />
            <ellipse cx="200" cy="124" rx="20" ry="4.6" fill={tint(ESPRESSO, 0.2)} />
            <rect x="180" y="214" width="40" height="3.5" fill={`url(#${id}-ring)`} />
            <Deboss x={200} y={166} size={8} text="NŌR" letterSpacing={1.6} />
          </>
        )}

        {open && (
          <g>
            <rect x="192" y="150" width="16" height="58" rx="2" fill={`url(#${id}-body)`} />
            <path d="M190 112 L210 112 L206 152 L194 152 Z" fill={`url(#${id}-shade)`} />
            <path d="M200 112 L210 112 L206 152 L200 152 Z" fill="#1B110D" opacity="0.14" />
            <rect x="188" y="206" width="24" height="8" rx="1" fill={shade(ESPRESSO, -0.05)} />
          </g>
        )}

        <rect x="180" y={open ? 212 : 217} width="40" height={open ? 118 : 113} rx="4" fill={`url(#${id}-body)`} />
        <Specular x={188} y={open ? 226 : 230} w={5} h={open ? 88 : 86} opacity={0.4} r={2.5} />
        <Deboss x={200} y={open ? 262 : 268} size={7} text="VEIL" letterSpacing={2.8} tone="dark" />
        {/* The shade, declared as a wide lacquer band — VEIL's colour-led signature */}
        <rect x="180" y={open ? 330 : 330} width="40" height="48" rx="0" fill={`url(#${id}-shade)`} />
        <rect x="180" y="330" width="40" height="1" fill="#1B110D" opacity="0.2" />
        <rect x="180" y="374" width="40" height="8" rx="0" fill={shade(c, 0.26)} />
        <ellipse cx="200" cy="382" rx="20" ry="4.2" fill={shade(c, 0.44)} />
      </g>
      <ContactShadow cx={200} cy={384} rx={23} ry={3.5} />
    </g>
  );
}

/* ------------------------------------------------- texture illustrations */

/** A drawn stroke: matte reads dry-edged, satin keeps a soft sheen band. */
function PigmentStroke({ id, c, finish }: { id: string; c: string; finish: 'matte' | 'satin' }) {
  const sheen = finish === 'satin';
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-st`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(c, 0.2)} stopOpacity="0.5" />
          <stop offset="0.14" stopColor={c} />
          <stop offset="0.78" stopColor={c} />
          <stop offset="1" stopColor={shade(c, 0.1)} stopOpacity="0.35" />
        </linearGradient>
        <filter id={`${id}-rough`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.9" numOctaves="2" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={sheen ? 5 : 9} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id}-rough)`}>
        <path d="M44 236 Q200 190 356 244 Q200 302 44 266 Z" fill={`url(#${id}-st)`} />
      </g>
      {sheen && (
        <path d="M74 234 Q200 206 330 246" stroke={tint(c, 0.52)} strokeWidth="13" fill="none"
              opacity="0.4" style={{ filter: 'blur(7px)' }} />
      )}
      {/* a second, lighter pass — how a shade actually builds */}
      <g filter={`url(#${id}-rough)`} opacity="0.5">
        <path d="M96 328 Q200 306 306 336 Q200 366 96 348 Z" fill={c} />
      </g>
      <text x="200" y="420" textAnchor="middle" fontFamily="Instrument Sans, sans-serif"
            fontSize="9" letterSpacing="2.6" fill="#6E5950">
        {finish === 'satin' ? 'SATIN — TWO PASSES' : 'MATTE — TWO PASSES'}
      </text>
    </g>
  );
}

/** A pooled, wet drop. The rim catches light only where it turns away
 *  from the viewer — a stroke all the way round reads as vector outline,
 *  not liquid, so the highlight is a gradient along the lower edge. */
function GlossPool({ id, c, clear, spread }: { id: string; c: string; clear: boolean; spread: number }) {
  const col = clear ? '#F2E7D6' : c;
  const op = clear ? 0.5 : 0.94;
  const k = spread;
  const body = `M${200 - 128 * k} 258 Q200 ${214 - 10 * k} ${200 + 130 * k} 266 Q${200 + 92 * k} 330 200 328 Q${200 - 84 * k} 330 ${200 - 128 * k} 258 Z`;
  const lowerRim = `M${200 - 128 * k} 258 Q${200 - 84 * k} 330 200 328 Q${200 + 92 * k} 330 ${200 + 130 * k} 266`;

  return (
    <g>
      <defs>
        <radialGradient id={`${id}-pool`} cx="0.4" cy="0.28" r="0.8">
          <stop offset="0" stopColor={tint(col, 0.5)} stopOpacity={op} />
          <stop offset="0.46" stopColor={col} stopOpacity={op} />
          <stop offset="1" stopColor={shade(col, 0.28)} stopOpacity={op} />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFEF8" stopOpacity="0" />
          <stop offset="0.3" stopColor="#FFFEF8" stopOpacity={clear ? 0.95 : 0.7} />
          <stop offset="0.62" stopColor="#FFFEF8" stopOpacity={clear ? 0.75 : 0.5} />
          <stop offset="1" stopColor="#FFFEF8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* what a clear gloss actually shows is its shadow */}
      <ellipse cx={206} cy={322} rx={132 * k} ry={28 * k}
               fill={clear ? 'rgba(92,72,56,0.34)' : alpha(shade(col, 0.5), 0.38)}
               style={{ filter: 'blur(12px)' }} />
      <path d={body} fill={`url(#${id}-pool)`} />
      {/* the far edge, where the meniscus turns over */}
      <path d={lowerRim} stroke={`url(#${id}-rim)`} strokeWidth={clear ? 3.4 : 2.4}
            fill="none" strokeLinecap="round" style={{ filter: 'blur(0.6px)' }} />
      <path d={`M${200 - 112 * k} 262 Q200 ${226 - 8 * k} ${200 + 116 * k} 270`}
            stroke={clear ? 'rgba(120,98,78,0.34)' : alpha(shade(col, 0.45), 0.45)}
            strokeWidth="1.4" fill="none" />

      {/* specular: one blown-out pool, one small */}
      <ellipse cx={200 - 44 * k} cy={282} rx={30 * k} ry={8} fill="#FFFEF9" opacity="0.8" style={{ filter: 'blur(2.5px)' }} />
      <ellipse cx={200 + 58 * k} cy={304} rx={15 * k} ry={4.5} fill="#FFFEF9" opacity="0.42" style={{ filter: 'blur(2.5px)' }} />

      {/* satellite beads */}
      {([[284, 226, 12, 9], [122, 338, 8.5, 6.5], [252, 206, 6, 4.5]] as const).map(([cx, cy, rx, ry]) => (
        <g key={`${cx}-${cy}`}>
          <ellipse cx={cx + 2} cy={cy + 4} rx={rx} ry={ry * 0.66}
                   fill={clear ? 'rgba(92,72,56,0.3)' : alpha(shade(col, 0.5), 0.34)}
                   style={{ filter: 'blur(3px)' }} />
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-pool)`} />
          <path d={`M${cx - rx} ${cy} Q${cx} ${cy + ry * 1.25} ${cx + rx} ${cy}`}
                stroke="#FFFEF8" strokeWidth="1.3" fill="none" opacity={clear ? 0.9 : 0.55} />
          <ellipse cx={cx - rx * 0.3} cy={cy - ry * 0.34} rx={rx * 0.28} ry={ry * 0.24}
                   fill="#FFFEF9" opacity="0.9" />
        </g>
      ))}

      <text x="200" y="420" textAnchor="middle" fontFamily="Instrument Sans, sans-serif"
            fontSize="9" letterSpacing="2.6" fill="#6E5950">
        {clear ? 'CLEAR — HIGH SHINE' : 'TINTED — HIGH SHINE'}
      </text>
    </g>
  );
}

/** A stain blot: no specular at all, feathered edge, builds in layers. */
function StainBlot({ id, c }: { id: string; c: string }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-blot`} cx="0.44" cy="0.4" r="0.66">
          <stop offset="0" stopColor={c} stopOpacity="0.92" />
          <stop offset="0.6" stopColor={c} stopOpacity="0.62" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-feather`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="26" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <g filter={`url(#${id}-feather)`}>
        <ellipse cx="186" cy="268" rx="118" ry="70" fill={`url(#${id}-blot)`} />
        <ellipse cx="256" cy="310" rx="56" ry="34" fill={c} opacity="0.4" />
      </g>
      <ellipse cx="180" cy="262" rx="62" ry="36" fill={c} opacity="0.34" style={{ filter: 'blur(9px)' }} />
      <text x="200" y="420" textAnchor="middle" fontFamily="Instrument Sans, sans-serif"
            fontSize="9" letterSpacing="2.6" fill="#6E5950">
        SHEER WASH — BUILDABLE
      </text>
    </g>
  );
}

/* --------------------------------------------------------------- wrapper */

const RENDERERS: Record<Category, (p: { id: string; c: string; view: View }) => React.ReactElement> = {
  sculpt: Sculpt,
  signature: Signature,
  elixir: Elixir,
  glass: Glass,
  veil: Veil,
};

/* Framing. The drawings are built on a 400x500 stage, but a standing
   product only occupies its middle third, which left frames looking empty.
   Each view gets a scale about a sensible anchor — the floor for standing
   shots, the centre for flat ones — so the subject fills the crop. */
const FRAMING: Record<View, { scale: number; ax: number; ay: number }> = {
  closed:  { scale: 1.24, ax: 200, ay: 396 },
  open:    { scale: 1.2,  ax: 200, ay: 396 },
  macro:   { scale: 1.0,  ax: 200, ay: 250 },
  texture: { scale: 1.08, ax: 200, ay: 286 },
};

/* A seamless sweep has a floor; a close-up and a flat-lay do not. Pushing
   the horizon past the frame removes the hard band that was cutting
   through macro and texture renders. */
const HORIZON: Record<View, number> = { closed: 0.74, open: 0.74, macro: 1.1, texture: 1.1 };

/* Each pack is a different height, so each one's base lands somewhere
   different on the stage. This drops every standing product onto one
   common baseline, just below the horizon, so none of them hovers. */
const BASELINE: Record<Category, number> = {
  sculpt: 0, signature: 16, elixir: 2, glass: 5, veil: 0,
};

/** Default stage per category/view, so a clear gloss is never lost in espresso. */
function defaultSet(category: Category, view: View, clearish: boolean): StageSet {
  if (view === 'texture') return category === 'veil' ? 'light' : 'stone';
  if (view === 'macro') return clearish ? 'stone' : 'dark';
  if (category === 'veil') return 'stone';
  return 'light';
}

export function ProductRender({
  category,
  shadeHex,
  view = 'closed',
  set,
  alt,
  className,
}: {
  category: Category;
  shadeHex: string;
  view?: View;
  /** 'none' draws the product with no backdrop, for editorial compositions. */
  set?: StageSet | 'none';
  alt: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const Renderer = RENDERERS[category];
  const clearish = luminance(shadeHex) > 0.74;
  const resolved = set ?? defaultSet(category, view, clearish);

  const f = FRAMING[view];
  const dy = view === 'closed' || view === 'open' ? BASELINE[category] : 0;
  const subject = (
    <g transform={`translate(${f.ax} ${f.ay + dy}) scale(${f.scale}) translate(${-f.ax} ${-f.ay})`}>
      <Renderer id={uid} c={shadeHex} view={view} />
    </g>
  );

  if (resolved === 'none') {
    return (
      <svg viewBox="0 0 400 500" role="img" aria-label={alt} className={className}
           style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
        {subject}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={alt}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Sweep id={uid} set={resolved} horizon={HORIZON[view]} />
      {subject}
      <Vignette id={uid} strength={resolved === 'dark' ? 0.3 : 0.14} />
      <Grain id={uid} opacity={resolved === 'dark' ? 0.11 : 0.16} />
    </svg>
  );
}
