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
  bgColor1 = '#fff8f4', bgColor2 = '#ffe4d8',
  archColor = '#fff5f5', textColor = '#6b2142', accentColor = '#d45c7a',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="fl-bg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor={bgColor1} /><stop offset="100%" stopColor={bgColor2} />
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

/* ─── 6. PEARL MINIMALIST ──────────────────────────────────────────────── */
export function PearlLayout({
  bgColor = '#f8fafc', textColor = '#334155', accentColor = '#94a3b8', highlightColor = '#cbd5e1',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="pearl-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor={bgColor} />
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#pearl-bg)" />
      
      {/* Very subtle border */}
      <rect x="24" y="24" width="352" height="512" rx="4" fill="none" stroke={highlightColor} strokeWidth="1" opacity="0.6" />
      <rect x="32" y="32" width="336" height="496" rx="2" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />

      {/* Modern thin arch */}
      <path d="M60 180 C60 120 130 90 200 90 C270 90 340 120 340 180 L340 480 Q340 490 330 490 L70 490 Q60 490 60 480 Z" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.4" />

      <g transform="translate(200,60) scale(0.8)">
         <path d={SL} fill={accentColor} opacity="0.6" />
      </g>

      <text x="200" y="210" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="24" fontWeight="600" fill={textColor} letterSpacing="1">ঈদ মুবারক</text>
      <text x="200" y="260" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="42" fontWeight="300" letterSpacing="4" fill={textColor}>EID</text>
      <text x="200" y="300" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="32" fontWeight="300" letterSpacing="6" fill={accentColor}>MUBARAK</text>

      <line x1="140" y1="330" x2="260" y2="330" stroke={highlightColor} strokeWidth="1" />

      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={390} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 390 + parseInt(messageSize) * 2.5 : 390} color={messageColor || accentColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || accentColor} x1={90} x2={310} y0={390} gap={28} n={3} dash="1,4" />}
    </svg>
  );
}

/* ─── 7. SAPPHIRE GEOMETRIC ────────────────────────────────────────────── */
export function SapphireLayout({
  bgColor = '#0f172a', archColor = '#1e293b', textColor = '#e2e8f0', accentColor = '#38bdf8',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Anek Bangla', messageSize = '13', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  
  // Generate some geometric background data
  const grid = [];
  for(let i=0; i<=400; i+=40) {
    grid.push(<line key={`v${i}`} x1={i} y1={0} x2={i} y2={560} stroke={accentColor} strokeWidth="1" opacity="0.05" />);
  }
  for(let j=0; j<=560; j+=40) {
    grid.push(<line key={`h${j}`} x1={0} y1={j} x2={400} y2={j} stroke={accentColor} strokeWidth="1" opacity="0.05" />);
  }

  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <rect width="400" height="560" fill={bgColor} />
      
      {/* Grid Pattern */}
      {grid}

      {/* Geometric background shapes */}
      <polygon points="0,0 200,100 0,200" fill={accentColor} opacity="0.03" />
      <polygon points="400,0 200,100 400,200" fill="#818cf8" opacity="0.03" />
      <polygon points="200,460 400,560 0,560" fill={accentColor} opacity="0.04" />

      {/* Hexagon Arch */}
      <path d="M100 120 L300 120 L350 200 L350 480 L200 530 L50 480 L50 200 Z" fill={archColor} stroke={accentColor} strokeWidth="2" strokeOpacity="0.4" />
      <path d="M110 130 L290 130 L335 205 L335 470 L200 515 L65 470 L65 205 Z" fill="none" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.3" />

      {/* Tech-style Mosque */}
      <g fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.7">
         <rect x="160" y="160" width="80" height="20" />
         <path d="M160 160 L200 120 L240 160" />
         <circle cx="200" cy="120" r="4" fill={accentColor} />
         
         <rect x="130" y="140" width="15" height="40" />
         <path d="M130 140 L137.5 120 L145 140" />
         
         <rect x="255" y="140" width="15" height="40" />
         <path d="M255 140 L262.5 120 L270 140" />
      </g>

      <text x="200" y="240" textAnchor="middle" fontFamily="'Anek Bangla',sans-serif" fontSize="26" fontWeight="700" fill={textColor}>ঈদ মুবারক</text>
      <text x="200" y="300" textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize="54" fontWeight="800" letterSpacing="2" fill={accentColor}>EID</text>
      <text x="200" y="340" textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize="28" fontWeight="600" letterSpacing="8" fill="#818cf8">MUBARAK</text>

      {hasMsg ? (
        <>
          <Msg text={messageBn} x={200} y={400} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
          <Msg text={messageEn} x={200} y={messageBn ? 400 + parseInt(messageSize) * 2.5 : 400} color={messageColor || "#94a3b8"} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
        </>
      ) : <Lines color={messageColor || accentColor} x1={80} x2={320} y0={410} gap={24} n={3} dash="4,4" />}
    </svg>
  );
}

/* ─── 8. POLAROID AESTHETIC ─────────────────────────────────────────────── */
export function PolaroidLayout({
  bgColor = '#f4f0ea', accentColor = '#e2a3b7', textColor = '#5c4b51',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Dancing Script', messageSize = '18', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id="pol-drop">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="2" dy="5" result="offsetblur" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="pol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffecd2" />
          <stop offset="100%" stopColor="#fcb69f" />
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill={bgColor} />
      
      {[20, 80, 150, 320, 380].map((x, i) => (
         <circle key={i} cx={x} cy={50 + i*100} r="1.5" fill={accentColor} opacity="0.4" />
      ))}

      <g transform="translate(200, 270) rotate(-3) translate(-200, -270)">
        <rect x="40" y="60" width="320" height="420" fill="#ffffff" filter="url(#pol-drop)" rx="2" />
        <rect x="55" y="75" width="290" height="300" fill="url(#pol-grad)" rx="2" />
        
        <circle cx="200" cy="180" r="45" fill="#ffffff" opacity="0.8" />
        <g transform="translate(0, 60)">
          <Mosque f="#ffffff" />
        </g>
        <g transform="translate(0, 30)">
          <Lan x="100" w="24" h="40" c="#ffffff" sw="1.5" />
          <Lan x="300" w="24" h="40" c="#ffffff" sw="1.5" />
        </g>
        
        <g transform="translate(160, 45) rotate(-5)">
          <rect x="0" y="0" width="80" height="25" fill="#fcd34d" opacity="0.6" />
          <path d="M0 0 L5 5 L0 10 L5 15 L0 20 L5 25 L80 25 L75 20 L80 15 L75 10 L80 5 L75 0 Z" fill="#f4f0ea" opacity="0.8" />
        </g>

        <text x="200" y="420" textAnchor="middle" fontFamily="'Dancing Script', cursive, sans-serif" fontSize="36" fontWeight="bold" fill={textColor}>
          Eid Mubarak
        </text>
        
        <g transform="translate(0, 40)">
          {hasMsg ? (
            <>
              <Msg text={messageBn} x={200} y={400} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
              <Msg text={messageEn} x={200} y={messageBn ? 400 + parseInt(messageSize) * 2.5 : 400} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
            </>
          ) : <Lines color={messageColor || accentColor} x1="100" x2="300" y0="410" gap={18} n={2} dash="2,4" />}
        </g>
      </g>
    </svg>
  );
}

/* ─── 9. GLASSMORPHISM DREAM ───────────────────────────────────────────── */
export function GlassmorphismLayout({
  bgColor = '#e0c3fc', accentColor = '#8ec5fc', textColor = '#ffffff',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Outfit', messageSize = '14', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="glass-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bgColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
        <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <linearGradient id="glass-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>
      
      <rect width="400" height="560" fill="url(#glass-bg)" />
      
      <circle cx="80" cy="120" r="90" fill="#ff9a9e" filter="url(#glass-blur)" opacity="0.7" />
      <circle cx="320" cy="400" r="110" fill="#fecfef" filter="url(#glass-blur)" opacity="0.8" />
      <circle cx="100" cy="450" r="80" fill="#a1c4fd" filter="url(#glass-blur)" opacity="0.6" />
      <circle cx="300" cy="100" r="70" fill="#c2e9fb" filter="url(#glass-blur)" opacity="0.6" />

      <rect x="30" y="40" width="340" height="480" fill="rgba(255, 255, 255, 0.1)" rx="24" stroke="url(#glass-border)" strokeWidth="1.5" />
      
      <rect x="45" y="55" width="310" height="450" fill="none" rx="16" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />

      <g transform="translate(200, 110)">
        <path d={SL} fill="#ffffff" opacity="0.9" transform="scale(1.5)" />
      </g>
      
      <text x="200" y="210" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontSize="22" fontWeight="300" letterSpacing="6" fill="#ffffff">EID MUBARAK</text>
      <text x="200" y="260" textAnchor="middle" fontFamily="'Anek Bangla', sans-serif" fontSize="32" fontWeight="700" fill="#ffffff">ঈদ মুবারক</text>

      <line x1="120" y1="300" x2="280" y2="300" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

      <g transform="translate(0, 350)">
        {hasMsg ? (
          <>
            <Msg text={messageBn} x={200} y={0} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
            <Msg text={messageEn} x={200} y={messageBn ? parseInt(messageSize) * 2.5 : 0} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
          </>
        ) : <Lines color={messageColor || textColor} x1="90" x2="310" y0="0" gap={28} n={3} dash="1,0" />}
      </g>
    </svg>
  );
}

/* ─── 10. VINTAGE TICKET ───────────────────────────────────────────────── */
export function VintageTicketLayout({
  bgColor = '#fdfbf7', accentColor = '#8c7a6b', textColor = '#2c2825',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Playfair Display', messageSize = '14', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <rect width="400" height="560" fill={bgColor} />
      
      <path d="M 20 20 L 380 20 L 380 180 A 15 15 0 0 1 365 195 A 15 15 0 0 1 380 210 L 380 540 L 20 540 L 20 210 A 15 15 0 0 1 35 195 A 15 15 0 0 1 20 180 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
      <path d="M 26 26 L 374 26 L 374 180 A 21 21 0 0 1 353 195 A 21 21 0 0 1 374 210 L 374 534 L 26 534 L 26 210 A 21 21 0 0 1 47 195 A 21 21 0 0 1 26 180 Z" fill="none" stroke={accentColor} strokeWidth="0.5" />

      <line x1="45" y1="195" x2="355" y2="195" stroke={accentColor} strokeWidth="1.5" strokeDasharray="6,4" />

      <text x="200" y="55" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="14" letterSpacing="4" fill={accentColor}>NO. 00814</text>
      <text x="200" y="100" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="34" fontWeight="bold" letterSpacing="2" fill={textColor}>EID AL-FITR</text>
      <text x="200" y="140" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="14" letterSpacing="8" fill={accentColor}>CELEBRATION</text>
      
      <path d="M 120 160 Q 200 170 280 160" fill="none" stroke={accentColor} strokeWidth="0.8" />
      <circle cx="200" cy="165" r="2.5" fill={accentColor} />

      <text x="200" y="250" textAnchor="middle" fontFamily="'Anek Bangla', sans-serif" fontSize="28" fontWeight="700" fill={textColor}>ঈদ মুবারক</text>
      
      <circle cx="200" cy="310" r="34" fill="none" stroke={accentColor} strokeWidth="0.8" />
      <circle cx="200" cy="310" r="30" fill="none" stroke={accentColor} strokeWidth="0.5" strokeDasharray="2,2" />
      <g transform="translate(133, 274) scale(0.34)"><Mosque f={accentColor} /></g>
      
      <rect x="60" y="370" width="280" height="0.5" fill={accentColor} />
      <rect x="60" y="374" width="280" height="0.5" fill={accentColor} />

      <g transform="translate(0, 410)">
        {hasMsg ? (
          <>
            <Msg text={messageBn} x={200} y={0} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
            <Msg text={messageEn} x={200} y={messageBn ? parseInt(messageSize) * 2.5 : 0} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
          </>
        ) : <Lines color={messageColor || accentColor} x1={70} x2={330} y0={0} gap={30} n={3} dash="1,0" />}
      </g>
      
      <g transform="translate(130, 500)">
        {[0, 4, 10, 12, 18, 22, 28, 30, 36, 40, 42, 48, 56, 60, 64, 66, 72, 80, 84, 90, 94, 100, 108, 112, 116, 124, 128, 134, 138, 140].map((x, i) => (
          <rect key={i} x={x} y="0" width={i%3===0 ? 2 : 1} height="15" fill={accentColor} opacity="0.7" />
        ))}
      </g>
    </svg>
  );
}

/* ─── 11. WATERCOLOR FLORAL (HANDMADE) ─────────────────────────────────── */
export function WatercolorFloralLayout({
  bgColor = '#ffffff', textColor = '#334155', accentColor = '#64748b',
  messageBn = '', messageEn = '', toName = '', fromName = '',
  messageFont = 'Cormorant Garamond', messageSize = '14', messageColor = '',
}) {
  const hasMsg = !!(messageBn || messageEn);
  const PLAQUE_PATH = "M 200,45 C 230,45 240,65 280,65 Q 340,65 340,125 C 340,175 315,195 315,280 C 315,365 340,385 340,435 Q 340,495 280,495 C 240,495 230,515 200,515 C 170,515 160,495 120,495 Q 60,495 60,435 C 60,385 85,365 85,280 C 85,195 60,175 60,125 Q 60,65 120,65 C 160,65 170,45 200,45 Z";

  return (
    <svg width="400" height="560" viewBox="0 0 400 560" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <filter id="wf-dropshadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
        </filter>
        <filter id="wf-waterblur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <clipPath id="wf-plaque-clip">
          <path d={PLAQUE_PATH} />
        </clipPath>
      </defs>
      
      {/* Background Canvas */}
      <rect width="400" height="560" fill={bgColor} />
      
      {/* Plaque Shadow */}
      <path d={PLAQUE_PATH} fill="none" filter="url(#wf-dropshadow)" />
      
      {/* Watercolor Fill Inside Plaque */}
      <g clipPath="url(#wf-plaque-clip)">
        <rect x="0" y="0" width="400" height="560" fill="#fdfbf5" />
        {/* Blurry blobs */}
        <circle cx="120" cy="150" r="140" fill="#bef264" filter="url(#wf-waterblur)" opacity="0.85" />
        <circle cx="280" cy="120" r="150" fill="#d8b4fe" filter="url(#wf-waterblur)" opacity="0.85" />
        <circle cx="160" cy="300" r="170" fill="#fde047" filter="url(#wf-waterblur)" opacity="0.8" />
        <circle cx="320" cy="320" r="160" fill="#67e8f9" filter="url(#wf-waterblur)" opacity="0.85" />
        <circle cx="250" cy="460" r="140" fill="#c084fc" filter="url(#wf-waterblur)" opacity="0.75" />
        <circle cx="100" cy="420" r="140" fill="#7dd3fc" filter="url(#wf-waterblur)" opacity="0.75" />
      </g>

      {/* Plaque Outline Stroke */}
      <path d={PLAQUE_PATH} fill="none" stroke="#9ca3af" strokeWidth="0.8" opacity="0.6" />

      {/* Hand-Drawn Text EID MUBARAK */}
      <g transform="translate(0, 50)">
        <text x="200" y="130" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="42" letterSpacing="6" fill="none" stroke="#1f2937" strokeWidth="1.2">EID</text>
        <text x="201.5" y="131.5" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="42" letterSpacing="6" fill="#374151" opacity="0.6">EID</text>

        <text x="200" y="190" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="38" letterSpacing="5" fill="none" stroke="#1f2937" strokeWidth="1.2">MUBARAK</text>
        <text x="201.5" y="191.5" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="38" letterSpacing="5" fill="#374151" opacity="0.6">MUBARAK</text>
      </g>

      {/* Dynamic user message text */}
      <g transform="translate(0, 270)">
        {hasMsg ? (
          <>
            <Msg text={messageBn} x={200} y={0} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={parseInt(messageSize)} />
            <Msg text={messageEn} x={200} y={messageBn ? parseInt(messageSize) * 2.5 : 0} color={messageColor || textColor} font={`'${messageFont}', sans-serif`} size={Math.max(10, parseInt(messageSize) - 1)} />
          </>
        ) : <Lines color={messageColor || accentColor} x1="120" x2="280" y0={0} gap={24} n={3} dash="2,2" />}
      </g>

      {/* Hand-Drawn Cosmos Flowers Overlay (Bottom Left) */}
      <g transform="translate(130, 420) scale(1.6) rotate(-15)">
        {/* Leaves */}
        <path d="M -10,-10 Q -30,20 -45,40 Q -60,20 -30,0 Z" fill="#84cc16" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round" />
        <path d="M 0,0 Q 20,30 35,50 Q 50,30 20,10 Z" fill="#84cc16" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round" transform="rotate(70)" />
        <path d="M 0,0 Q 20,-30 35,-50 Q 50,-30 20,-10 Z" fill="#84cc16" stroke="#374151" strokeWidth="0.8" strokeLinejoin="round" transform="rotate(-60)" />
        
        {/* Flower 1 (back) */}
        <g transform="translate(-25, -20) scale(0.85) rotate(30)">
          {Array.from({length: 12}).map((_, i) => {
             const angle = i * 30 + (i%3===0 ? 5 : 0);
             return (
               <g key={'f1-'+i} transform={`rotate(${angle})`}>
                 <path d="M 0,0 L 5,-15 Q 12,-35 5,-45 Q 0,-30 0,0" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" strokeLinejoin="round" />
                 <path d="M 0,0 L -5,-15 Q -12,-35 -5,-45 Q 0,-30 0,0" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" strokeLinejoin="round" />
                 <path d="M 0,-10 L 0,-35" fill="none" stroke="#6b7280" strokeWidth="0.4" />
               </g>
             );
          })}
          {/* Center */}
          <circle cx="0" cy="0" r="7" fill="#ffffff" stroke="#1f2937" strokeWidth="0.6" />
          {Array.from({length: 18}).map((_, i) => {
             const a = (i/18) * Math.PI * 2;
             const d = (i%2===0 ? 2 : 5);
             return <circle key={'d1-'+i} cx={d*Math.cos(a)} cy={d*Math.sin(a)} r="1" fill="#facc15" stroke="#1f2937" strokeWidth="0.4" />
          })}
        </g>
        
        {/* Flower 2 (front, slightly larger, overlapping) */}
        <g transform="translate(10, 10) scale(1) rotate(-15)">
          {Array.from({length: 14}).map((_, i) => {
             const angle = i * (360/14) + (i%2===0 ? 4 : 0);
             return (
               <g key={'f2-'+i} transform={`rotate(${angle})`}>
                 <path d="M 0,0 L 5,-15 Q 12,-35 5,-45 Q 0,-30 0,0" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" strokeLinejoin="round" />
                 <path d="M 0,0 L -5,-15 Q -12,-35 -5,-45 Q 0,-30 0,0" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" strokeLinejoin="round" />
                 <path d="M 0,-10 L 0,-35" fill="none" stroke="#6b7280" strokeWidth="0.4" />
               </g>
             );
          })}
          {/* Center */}
          <circle cx="0" cy="0" r="8" fill="#ffffff" stroke="#1f2937" strokeWidth="0.6" />
          {Array.from({length: 22}).map((_, i) => {
             const a = (i/22) * Math.PI * 2;
             const d = (i%3===0 ? 2 : 6);
             return <circle key={'d2-'+i} cx={d*Math.cos(a)} cy={d*Math.sin(a)} r="1" fill="#facc15" stroke="#1f2937" strokeWidth="0.4" />
          })}
        </g>
      </g>
    </svg>
  );
}
