import React from 'react';

const SL = 'M0,-22 C5,-5 5,-5 22,0 C5,5 5,5 0,22 C-5,5 -5,5 -22,0 C-5,-5 -5,-5 0,-22Z';
const SS = 'M0,-12 C3,-3 3,-3 12,0 C3,3 3,3 0,12 C-3,3 -3,3 -12,0 C-3,-3 -3,-3 0,-12Z';

function Lan({ x, w = 32, h = 55, c = 'white', sw = 1.8 }) {
  const hx = w / 2;
  return (
    <g stroke={c} strokeWidth={sw} fill="none">
      <line x1={x} y1={0} x2={x} y2={8} />
      <ellipse cx={x} cy={8} rx={hx * 0.8} ry={2.5} />
      <path d={`M${x-hx*.7} 8 L${x-hx} ${8+h*.35} L${x-hx} ${8+h*.65} L${x-hx*.7} ${8+h} L${x+hx*.7} ${8+h} L${x+hx} ${8+h*.65} L${x+hx} ${8+h*.35} L${x+hx*.7} 8Z`} />
      <line x1={x - hx} y1={8 + h * .33} x2={x + hx} y2={8 + h * .33} />
      <line x1={x - hx} y1={8 + h * .66} x2={x + hx} y2={8 + h * .66} />
      <line x1={x} y1={8 + h} x2={x} y2={8 + h + 10} />
      <ellipse cx={x} cy={8 + h + 13} rx={3.5} ry={4.5} fill={c} stroke="none" />
    </g>
  );
}

function Mosque({ f = 'white' }) {
  return (
    <g fill={f}>
      <rect x="62" y="172" width="276" height="14" rx="4" />
      <rect x="82" y="160" width="236" height="14" rx="3" />
      <path d="M155 166L155 118C155 58 245 58 245 118L245 166Z" />
      <rect x="145" y="158" width="110" height="11" rx="4" />
      <rect x="197" y="27" width="6" height="22" rx="3" />
      <ellipse cx="200" cy="25" rx="7" ry="9" />
      <ellipse cx="200" cy="16" rx="4" ry="6" />
      <rect x="121" y="64" width="20" height="110" rx="2" />
      <rect x="113" y="112" width="36" height="7" rx="3.5" />
      <path d="M115 66L131 37L147 66Z" />
      <ellipse cx="131" cy="32" rx="5.5" ry="7.5" />
      <rect x="259" y="64" width="20" height="110" rx="2" />
      <rect x="251" y="112" width="36" height="7" rx="3.5" />
      <path d="M253 66L269 37L285 66Z" />
      <ellipse cx="269" cy="32" rx="5.5" ry="7.5" />
      <rect x="78" y="90" width="14" height="84" rx="2" />
      <rect x="71" y="128" width="28" height="6" rx="3" />
      <path d="M73 92L85 68L97 92Z" />
      <rect x="308" y="90" width="14" height="84" rx="2" />
      <rect x="301" y="128" width="28" height="6" rx="3" />
      <path d="M303 92L315 68L327 92Z" />
    </g>
  );
}

function Lines({ n = 4, y0 = 326, gap = 26, x1 = 65, x2 = 335, color, dash = '2,7' }) {
  return <>{Array.from({ length: n }, (_, i) => (
    <line key={i} x1={x1} y1={y0 + i * gap} x2={x2} y2={y0 + i * gap}
      stroke={color} strokeWidth="1" strokeDasharray={dash} opacity="0.28" />
  ))}</>;
}

function Msg({ text, x, y, color, font = 'Inter,sans-serif', size = 13 }) {
  if (!text) return null;
  const lines = [];
  text.split('\n').forEach(p => {
    if (!p.trim()) return;
    for (let i = 0; i < p.length; i += 36) lines.push(p.slice(i, i + 36));
  });
  return <>{lines.slice(0, 4).map((l, i) => (
    <text key={i} x={x} y={y + i * 18} textAnchor="middle" fontFamily={font} fontSize={size} fill={color}>{l}</text>
  ))}</>;
}



/* ─── 1. CLASSIC MOSQUE ─────────────────────────────────────────────────── */
export function ClassicLayout({
  bgColor = '#1a5c9e', patternColor = 'rgba(100,170,230,0.28)',
  archColor = '#f5f0dc', textColor = '#1a5099', accentColor = '#f0a500',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <pattern id="cl-tr" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M18 0L36 18L18 36L0 18Z" fill="none" stroke={patternColor} strokeWidth="0.9" />
        </pattern>
        <pattern id="cl-gd" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M14 0L28 14L14 28L0 14Z" fill={accentColor} opacity="0.22" />
          <path d="M14 0L28 14L14 28L0 14Z" fill="none" stroke={accentColor} strokeWidth="0.8" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="560" fill={bgColor} />
      <rect width="400" height="560" fill="url(#cl-tr)" />
      <path d="M0 478L0 560L130 560L130 478Z" fill="url(#cl-gd)" />
      <path d="M0 478L0 560L130 560L130 478Z" fill={accentColor} opacity="0.15" />
      <path d="M270 478L270 560L400 560L400 478Z" fill="url(#cl-gd)" />
      <path d="M270 478L270 560L400 560L400 478Z" fill={accentColor} opacity="0.15" />
      <path d="M36 208C36 162 118 138 200 134C282 138 364 162 364 208L364 516Q364 534 346 534L54 534Q36 534 36 516Z" fill={archColor} />
      <path d="M36 208C36 162 118 138 200 134C282 138 364 162 364 208" fill="none" stroke={accentColor} strokeWidth="1.4" opacity="0.5" />
      <Mosque f="white" />
      <Lan x={55} w={34} h={55} c="white" sw={1.8} />
      <Lan x={345} w={34} h={55} c="white" sw={1.8} />
      <Lan x={103} w={22} h={38} c="white" sw={1.3} />
      <Lan x={297} w={22} h={38} c="white" sw={1.3} />
      <g transform="translate(42,235)"><path d={SL} fill={accentColor} /></g>
      <g transform="translate(358,230)"><path d={SL} fill={accentColor} /></g>
      <g transform="translate(58,274)"><path d={SS} fill={accentColor} opacity="0.75" /></g>
      <g transform="translate(342,272)"><path d={SS} fill={accentColor} opacity="0.75" /></g>
      <text x="200" y="198" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="28" fontWeight="700" fill={textColor}>ঈদ মুবারক</text>
      <text x="200" y="254" textAnchor="middle" fontFamily="Georgia,serif" fontSize="52" fontWeight="bold" fontStyle="italic" fill={textColor}>Eid</text>
      <text x="200" y="304" textAnchor="middle" fontFamily="Georgia,serif" fontSize="46" fontWeight="bold" fontStyle="italic" fill={textColor}>Mubarak</text>
      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={386} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 386 + parseInt(messageSize) * 2.5 : 386} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || textColor} y0={382} gap={26} n={3} />}
    </svg>
  );
}

/* ─── 2. COSMIC NIGHT ──────────────────────────────────────────────────── */
export function CosmicLayout({
  accentColor = '#c084fc', messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  const stars = Array.from({ length: 48 }, (_, i) => ({
    cx: (i * 73 + 23) % 400, cy: (i * 97 + 31) % 560, r: 0.4 + (i % 5) * 0.4,
  }));
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="co-bg" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1e1060" /><stop offset="100%" stopColor="#050510" />
        </radialGradient>
        <radialGradient id="co-gl" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" /><stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#co-bg)" />
      {stars.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={0.3 + (i % 4) * 0.18} />)}
      <ellipse cx="200" cy="128" rx="220" ry="90" fill="url(#co-gl)" opacity="0.7" />
      {/* crescent */}
      <circle cx="200" cy="100" r="56" fill="#fde68a" opacity="0.92" />
      <circle cx="226" cy="86" r="48" fill="#060620" />
      <circle cx="200" cy="100" r="62" fill="none" stroke="#fde68a" strokeWidth="1" opacity="0.2" />
      {[{ x: 152, y: 56 }, { x: 256, y: 70 }, { x: 244, y: 136 }, { x: 158, y: 134 }].map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}><path d={SS} fill="#fde68a" opacity="0.65" /></g>
      ))}
      <Lan x={38} w={28} h={48} c={accentColor} sw={1.5} />
      <Lan x={362} w={28} h={48} c={accentColor} sw={1.5} />
      <Lan x={90} w={20} h={34} c={accentColor} sw={1.2} />
      <Lan x={310} w={20} h={34} c={accentColor} sw={1.2} />
      {/* panel */}
      <rect x="28" y="158" width="344" height="374" rx="18" fill="rgba(8,4,32,0.88)" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.4" />
      <rect x="28" y="158" width="344" height="3" rx="1" fill={accentColor} opacity="0.35" />
      <text x="200" y="206" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="26" fontWeight="700" fill="#e9d5ff">ঈদ মুবারক</text>
      <text x="200" y="261" textAnchor="middle" fontFamily="Georgia,serif" fontSize="50" fontWeight="bold" fontStyle="italic" fill="#f3e8ff">Eid</text>
      <text x="200" y="309" textAnchor="middle" fontFamily="Georgia,serif" fontSize="44" fontWeight="bold" fontStyle="italic" fill="#f3e8ff">Mubarak</text>
      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={392} color={messageColor || '#d8b4fe'} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 392 + parseInt(messageSize) * 2.5 : 392} color={messageColor || '#c4b5fd'} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || accentColor} x1={70} x2={330} y0={394} gap={24} n={3} />}
    </svg>
  );
}

/* ─── 3. FLORAL GARDEN ─────────────────────────────────────────────────── */
function Petal({ cx, cy, r = 14, n = 8, color }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * 360;
        return <ellipse key={i} cx={cx} cy={cy - r * 0.6} rx={r * 0.38} ry={r * 0.7}
          fill={color} opacity="0.65" transform={`rotate(${a} ${cx} ${cy})`} />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.22} fill={color} />
    </g>
  );
}

export function FloralLayout({
  archColor = '#fff5f5', textColor = '#6b2142', accentColor = '#d45c7a',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="fl-bg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#fff8f4" /><stop offset="100%" stopColor="#ffe4d8" />
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#fl-bg)" />
      <rect x="10" y="10" width="380" height="540" rx="16" fill="none" stroke={accentColor} strokeWidth="0.8" opacity="0.25" />
      <rect x="18" y="18" width="364" height="524" rx="14" fill="none" stroke={accentColor} strokeWidth="0.4" opacity="0.15" />
      {/* Corner flowers */}
      <Petal cx={38} cy={38} color={accentColor} r={18} />
      <Petal cx={362} cy={38} color={accentColor} r={18} />
      <Petal cx={38} cy={522} color={accentColor} r={18} />
      <Petal cx={362} cy={522} color={accentColor} r={18} />
      {/* Top center floral cluster */}
      <Petal cx={200} cy={42} color={accentColor} r={20} />
      <Petal cx={162} cy={54} color="#f59e0b" r={14} />
      <Petal cx={238} cy={54} color="#f59e0b" r={14} />
      {/* Side mid flowers */}
      <Petal cx={22} cy={280} color={accentColor} r={12} />
      <Petal cx={378} cy={280} color={accentColor} r={12} />
      <Petal cx={22} cy={310} color="#f59e0b" r={8} />
      <Petal cx={378} cy={310} color="#f59e0b" r={8} />
      {/* White arch panel */}
      <path d="M48 165C48 128 120 108 200 104C280 108 352 128 352 165L352 506Q352 520 338 520L62 520Q48 520 48 506Z"
        fill="rgba(255,255,255,0.82)" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
      {/* Hanging lanterns */}
      <Lan x={55} w={26} h={44} c={accentColor} sw={1.4} />
      <Lan x={345} w={26} h={44} c={accentColor} sw={1.4} />
      {/* Mosque ghost */}
      <Mosque f={accentColor + '22'} />
      {/* Decorative vine */}
      <path d="M82 165Q140 142 200 140Q260 142 318 165" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.35" />
      <text x="200" y="202" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="28" fontWeight="700" fill={textColor}>ঈদ মুবারক</text>
      <text x="200" y="256" textAnchor="middle" fontFamily="Georgia,serif" fontSize="50" fontWeight="bold" fontStyle="italic" fill={accentColor}>Eid</text>
      <text x="200" y="304" textAnchor="middle" fontFamily="Georgia,serif" fontSize="44" fontWeight="bold" fontStyle="italic" fill={accentColor}>Mubarak</text>
      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={386} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 386 + parseInt(messageSize) * 2.5 : 386} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || accentColor} x1={72} x2={328} y0={385} gap={26} n={3} />}
    </svg>
  );
}

/* ─── 4. MANDALA GOLD ──────────────────────────────────────────────────── */
export function MandalaLayout({
  accentColor = '#e8c840', messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  const rings = [32, 55, 75, 96, 118, 142];
  const spokes = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { x2: 200 + 165 * Math.cos(a), y2: 200 + 165 * Math.sin(a) };
  });
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="md-bg" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#1a1508" /><stop offset="100%" stopColor="#050503" />
        </radialGradient>
        <radialGradient id="md-gl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.14" /><stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#md-bg)" />
      {spokes.map((s, i) => <line key={i} x1={200} y1={200} x2={s.x2} y2={s.y2} stroke={accentColor} strokeWidth="0.4" opacity="0.11" />)}
      {rings.map((r, i) => {
        const n = i % 2 === 0 ? 8 : 12;
        const pts = Array.from({ length: n }, (_, j) => {
          const a = (j / n) * Math.PI * 2 - Math.PI / 2;
          return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
        }).join(' ');
        return <polygon key={r} points={pts} fill="none" stroke={accentColor} strokeWidth="0.5" opacity={0.12 + i * 0.04} />;
      })}
      <circle cx="200" cy="200" r="155" fill="url(#md-gl)" />
      <circle cx="200" cy="200" r="18" fill={accentColor} opacity="0.15" />
      <circle cx="200" cy="200" r="8" fill={accentColor} opacity="0.3" />
      <Mosque f={`${accentColor}18`} />
      <Lan x={42} w={28} h={48} c={accentColor} sw={1.5} />
      <Lan x={358} w={28} h={48} c={accentColor} sw={1.5} />
      <g transform="translate(38,215)"><path d={SL} fill={accentColor} /></g>
      <g transform="translate(362,215)"><path d={SL} fill={accentColor} /></g>
      <rect x="14" y="14" width="372" height="532" rx="18" fill="none" stroke={accentColor} strokeWidth="0.6" opacity="0.28" />
      <rect x="36" y="195" width="328" height="345" rx="12" fill="rgba(0,0,0,0.6)" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.2" />
      <text x="200" y="238" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="26" fontWeight="700" fill={accentColor}>ঈদ মুবারক</text>
      <text x="200" y="292" textAnchor="middle" fontFamily="Georgia,serif" fontSize="50" fontWeight="bold" fontStyle="italic" fill={accentColor}>Eid</text>
      <text x="200" y="340" textAnchor="middle" fontFamily="Georgia,serif" fontSize="44" fontWeight="bold" fontStyle="italic" fill={accentColor}>Mubarak</text>
      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={418} color={messageColor || "#d4b896"} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 418 + parseInt(messageSize) * 2.5 : 418} color={messageColor || "#c9b88a"} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || accentColor} x1={65} x2={335} y0={418} gap={24} n={3} />}
    </svg>
  );
}
/* ─── 5. MAJESTIC EMERALD ──────────────────────────────────────────────── */
export function MajesticLayout({
  bgColor = '#064e3b', archColor = '#ecfdf5', textColor = '#064e3b', accentColor = '#fbbf24',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <pattern id="maj-pt" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
          <path d="M0 0 L60 60 M60 0 L0 60" stroke={accentColor} strokeWidth="0.3" opacity="0.15" />
          <circle cx="30" cy="30" r="10" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.25" />
        </pattern>
        <filter id="maj-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="400" height="560" fill={bgColor} />
      <rect width="400" height="560" fill="url(#maj-pt)" />

      {/* Ornate corner elements */}
      {[
        { t: "translate(0,0)", r: 0 },
        { t: "translate(400,0)", r: 90 },
        { t: "translate(400,560)", r: 180 },
        { t: "translate(0,560)", r: 270 }
      ].map((p, i) => (
        <g key={i} transform={`${p.t} rotate(${p.r})`}>
          <path d="M0 0 L80 0 Q40 40 0 80 Z" fill={accentColor} opacity="0.1" />
          <path d="M0 0 L60 0 Q30 30 0 60 Z" fill={accentColor} opacity="0.15" />
          <circle cx="20" cy="20" r="4" fill={accentColor} opacity="0.4" />
        </g>
      ))}

      {/* Elegant Arch Panel with Double Border */}
      <path d="M40 160C40 100 120 70 200 65C280 70 360 100 360 160L360 514Q360 530 340 530L60 530Q40 530 40 514Z"
        fill={archColor} stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M50 168C50 115 125 90 200 85C275 90 350 115 350 168L350 504Q350 520 334 520L66 520Q50 520 50 504Z"
        fill="none" stroke={accentColor} strokeWidth="0.8" strokeOpacity="0.2" />

      {/* Floating Lanterns with Glow */}
      <g filter="url(#maj-glow)">
        <Lan x={65} w={30} h={50} c={accentColor} sw={1.5} />
        <Lan x={335} w={30} h={50} c={accentColor} sw={1.5} />
      </g>

      <Mosque f={`${accentColor}22`} />

      {/* Central Star/Moon Icon */}
      <g transform="translate(200,120) scale(1.2)">
        <path d={SL} fill={accentColor} filter="url(#maj-glow)" />
      </g>

      <text x="200" y="205" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="30" fontWeight="700" fill={textColor}>ঈদ মুবারক</text>
      <text x="200" y="265" textAnchor="middle" fontFamily="Georgia,serif" fontSize="56" fontWeight="bold" fontStyle="italic" fill={textColor}>Eid</text>
      <text x="200" y="318" textAnchor="middle" fontFamily="Georgia,serif" fontSize="48" fontWeight="bold" fontStyle="italic" fill={textColor}>Mubarak</text>

      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={400} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 400 + parseInt(messageSize) * 2.5 : 400} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || accentColor} x1={75} x2={325} y0={400} gap={28} n={3} />}
    </svg>
  );
}
