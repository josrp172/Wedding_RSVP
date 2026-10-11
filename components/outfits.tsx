/**
 * Hand-drawn fashion illustrations. Every garment takes a `color` so the
 * attire section can re-dress the figures in any palette shade.
 */

const SKIN = "#e8c1a5";
const SKIN_SHADE = "#d9a98b";
const HAIR = "#3a2622";

export function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const fill = (c: string) => ({ fill: c, transition: "fill 0.9s cubic-bezier(0.22,1,0.36,1)" });

type FigureProps = { color: string; className?: string };

function Svg({ children, className, id }: { children: React.ReactNode; className?: string; id: string }) {
  return (
    <svg viewBox="0 0 160 360" className={className} aria-hidden>
      <defs>
        <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="348" rx="46" ry="5" fill="#3e1f2c" opacity="0.12" />
      {children}
    </svg>
  );
}

const ManHead = () => (
  <>
    <path d="M74 60 h12 v16 q-6 4 -12 0z" style={fill(SKIN_SHADE)} />
    <ellipse cx="80" cy="44" rx="15" ry="18" style={fill(SKIN)} />
    <path d="M64.5 42 Q64 22 80 21 Q97 22 95.5 42 Q93 30 80 29 Q70 29 64.5 42z" style={fill(HAIR)} />
  </>
);

const Trousers = ({ c }: { c: string }) => (
  <>
    <path d="M60 196 L56 338 L76 338 L80 222 L84 338 L104 338 L100 196 Z" style={fill(c)} />
    <path d="M80 222 L80 300" stroke="#000" strokeOpacity="0.15" strokeWidth="0.8" />
    <path d="M53 336 h25 v5 q-13 4 -27 0z M82 336 h25 v5 q-13 4 -27 0z" fill="#2a1a20" />
  </>
);

export function Suit({ color, className }: FigureProps) {
  const dark = shade(color, -0.28);
  return (
    <Svg className={className} id="suit">
      <Trousers c={dark} />
      <path d="M58 80 Q48 84 46 100 L40 192 L52 194 L60 122 Z" style={fill(color)} />
      <path d="M102 80 Q112 84 114 100 L120 192 L108 194 L100 122 Z" style={fill(color)} />
      <circle cx="46" cy="198" r="5" style={fill(SKIN)} />
      <circle cx="114" cy="198" r="5" style={fill(SKIN)} />
      <path d="M58 78 Q80 70 102 78 L108 202 Q80 210 52 202 Z" style={fill(color)} />
      <path d="M58 78 Q80 70 102 78 L108 202 Q80 210 52 202 Z" fill="url(#sheen-suit)" />
      <path d="M70 75 L80 112 L90 75 Z" fill="#fffaf6" />
      <path d="M78 80 L82 80 L83.5 100 L80 107 L76.5 100 Z" fill="#9b3a5c" />
      <path d="M77 78 h6 l-1 3 h-4z" fill="#7a2a47" />
      <path d="M70 75 L80 112 L74 132 L61 84 Z" style={fill(dark)} />
      <path d="M90 75 L80 112 L86 132 L99 84 Z" style={fill(dark)} />
      <path d="M64 104 l9 0 l-4.5 6z" fill="#f6d3da" />
      <circle cx="80" cy="152" r="1.8" style={fill(dark)} />
      <circle cx="80" cy="168" r="1.8" style={fill(dark)} />
      <path d="M62 170 h12 M86 170 h12" stroke="#000" strokeOpacity="0.2" strokeWidth="0.8" />
      <ManHead />
    </Svg>
  );
}

export function Barong({ color, className }: FigureProps) {
  const pina = "#f8f0e1";
  const motifs = Array.from({ length: 8 }, (_, i) => 92 + i * 14);
  return (
    <Svg className={className} id="barong">
      <Trousers c="#3b2a30" />
      {/* sheer piña sleeves */}
      <path d="M59 80 Q49 84 47 100 L41 190 L53 192 L61 122 Z" fill={pina} opacity="0.88" />
      <path d="M101 80 Q111 84 113 100 L119 190 L107 192 L99 122 Z" fill={pina} opacity="0.88" />
      <path d="M41 184 L53 186 M119 184 L107 186" style={{ stroke: color, transition: "stroke .9s" }} strokeWidth="2" />
      <circle cx="47" cy="196" r="5" style={fill(SKIN)} />
      <circle cx="113" cy="196" r="5" style={fill(SKIN)} />
      {/* camisa de chino underneath shows through */}
      <path d="M62 82 Q80 76 98 82 L100 210 Q80 214 60 210 Z" fill="#ffffff" opacity="0.7" />
      <path d="M58 78 Q80 70 102 78 L106 216 Q80 224 54 216 Z" fill={pina} opacity="0.86" stroke="#e7dcc6" strokeWidth="0.6" />
      <path d="M58 78 Q80 70 102 78 L106 216 Q80 224 54 216 Z" fill="url(#sheen-barong)" />
      {/* embroidered placket */}
      <path d="M80 80 V214" style={{ stroke: color, transition: "stroke .9s" }} strokeWidth="1.2" />
      {motifs.map((y) => (
        <g key={y} style={{ fill: color, transition: "fill .9s" }} opacity="0.85">
          <ellipse cx="74.5" cy={y} rx="2.2" ry="4.5" transform={`rotate(-30 74.5 ${y})`} />
          <ellipse cx="85.5" cy={y} rx="2.2" ry="4.5" transform={`rotate(30 85.5 ${y})`} />
          <circle cx="80" cy={y + 6} r="1.3" />
        </g>
      ))}
      {/* scalloped embroidered hem */}
      <path
        d="M55 211 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0"
        fill="none"
        style={{ stroke: color, transition: "stroke .9s" }}
        strokeWidth="1"
      />
      <path d="M64 120 q6 10 0 22 M96 120 q-6 10 0 22" fill="none" style={{ stroke: color, transition: "stroke .9s" }} strokeWidth="0.8" opacity="0.6" />
      <path d="M71 66 L80 80 L89 66 L89 74 L80 84 L71 74 Z" fill={pina} stroke="#e7dcc6" strokeWidth="0.6" />
      <ManHead />
    </Svg>
  );
}

const WomanHeadBun = () => (
  <>
    <circle cx="80" cy="25" r="9" style={fill(HAIR)} />
    <path d="M74 60 h12 v14 q-6 3 -12 0z" style={fill(SKIN_SHADE)} />
    <ellipse cx="80" cy="44" rx="14" ry="17" style={fill(SKIN)} />
    <path d="M65 44 Q64 27 80 26 Q96 27 95 44 Q92 33 80 32 Q68 33 65 44z" style={fill(HAIR)} />
    <circle cx="93" cy="35" r="2.4" fill="#f6d3da" />
  </>
);

export function Gown({ color, className, veil }: FigureProps & { veil?: boolean }) {
  const dark = shade(color, -0.22);
  const light = shade(color, 0.25);
  const id = veil ? "bride" : "gown";
  return (
    <Svg className={className} id={id}>
      {veil && <path d="M70 30 Q40 120 30 330 Q80 345 130 330 Q120 120 90 30 Z" fill="#ffffff" opacity="0.45" />}
      <path d="M64 74 Q56 86 54 120 L50 186 L56 188 L62 130 L68 94 Z" style={fill(SKIN)} />
      <path d="M96 74 Q104 86 106 120 L110 186 L104 188 L98 130 L92 94 Z" style={fill(SKIN)} />
      <circle cx="53" cy="190" r="4.5" style={fill(SKIN)} />
      <circle cx="107" cy="190" r="4.5" style={fill(SKIN)} />
      <path d="M64 74 Q80 68 96 74 L96 86 L64 86 Z" style={fill(SKIN)} />
      <path d="M66 144 Q80 150 94 144 Q120 232 134 342 Q80 356 26 342 Q40 232 66 144 Z" style={fill(color)} />
      <path d="M66 144 Q80 150 94 144 Q120 232 134 342 Q80 356 26 342 Q40 232 66 144 Z" fill={`url(#sheen-${id})`} />
      <path d="M74 152 Q64 252 48 344 M80 152 Q80 252 80 350 M86 152 Q98 252 112 344 M70 150 Q56 240 36 340" fill="none" style={{ stroke: dark, transition: "stroke .9s" }} strokeOpacity="0.45" strokeWidth="1" />
      <path d="M64 84 Q72 78 80 86 Q88 78 96 84 L94 140 Q80 146 66 140 Z" style={fill(color)} />
      <path d="M72 92 Q80 120 74 138 M88 92 Q80 120 86 138" fill="none" style={{ stroke: dark, transition: "stroke .9s" }} strokeOpacity="0.4" strokeWidth="0.8" />
      <path d="M66 138 Q80 144 94 138 L94 147 Q80 153 66 147 Z" style={fill(light)} />
      <circle cx="80" cy="145" r="3" style={fill(dark)} />
      <path d="M72 70 Q80 80 88 70" fill="none" stroke="#d4a26a" strokeWidth="0.9" />
      <WomanHeadBun />
      {veil && <path d="M70 30 Q60 50 62 70" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />}
    </Svg>
  );
}

export function Midi({ color, className }: FigureProps) {
  const dark = shade(color, -0.22);
  const light = shade(color, 0.2);
  return (
    <Svg className={className} id="midi">
      <path d="M63 46 Q59 22 80 21 Q101 22 97 46 L101 104 Q93 108 91 90 Q92 36 80 33 Q68 36 69 90 Q67 108 59 104 Z" style={fill(HAIR)} />
      <path d="M70 262 L67 332 L74 332 L79 262 Z M81 262 L86 332 L93 332 L90 262 Z" style={fill(SKIN)} />
      <path d="M63 331 h12 l-1 5 h-12z M85 331 h12 l1 5 h-12z" fill="#7a2a47" />
      <path d="M57 94 L50 178 L56 180 L65 102 Z" style={fill(SKIN)} />
      <path d="M103 94 L110 178 L104 180 L95 102 Z" style={fill(SKIN)} />
      <circle cx="53" cy="183" r="4.5" style={fill(SKIN)} />
      <circle cx="107" cy="183" r="4.5" style={fill(SKIN)} />
      <path d="M68 136 Q80 142 92 136 L116 266 Q80 278 44 266 Z" style={fill(color)} />
      <path d="M68 136 Q80 142 92 136 L116 266 Q80 278 44 266 Z" fill="url(#sheen-midi)" />
      <path d="M74 142 L62 268 M80 143 L80 274 M86 142 L98 268" stroke={dark} strokeOpacity="0.35" strokeWidth="0.9" style={{ transition: "stroke .9s" }} />
      {/* floral print */}
      {[
        [62, 200], [90, 180], [76, 228], [100, 236], [56, 250], [84, 256], [70, 166],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`} opacity="0.55">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} rx="1.6" ry="3" cy="-2.6" fill="#fff" transform={`rotate(${r})`} />
          ))}
        </g>
      ))}
      <path d="M66 80 Q80 88 94 80 L92 138 Q80 142 68 138 Z" style={fill(color)} />
      <ellipse cx="62" cy="88" rx="10" ry="9" style={fill(light)} />
      <ellipse cx="98" cy="88" rx="10" ry="9" style={fill(light)} />
      <path d="M71 79 h18 v8 h-18z" style={fill(SKIN)} />
      <path d="M68 134 Q80 140 92 134 L92 140 Q80 146 68 140 Z" style={fill(dark)} />
      <path d="M80 140 l-7 -5 v10z M80 140 l7 -5 v10z" style={fill(dark)} />
      <path d="M74 60 h12 v18 q-6 3 -12 0z" style={fill(SKIN_SHADE)} />
      <ellipse cx="80" cy="44" rx="14" ry="17" style={fill(SKIN)} />
      <path d="M65 46 Q64 26 80 25 Q96 26 95 46 Q90 32 80 32 Q70 32 65 46z" style={fill(HAIR)} />
    </Svg>
  );
}
