// HOROLOGY — Procedural Vector Watch Illustrations
// Renders brand-neutral, luxury vector timepieces in the Obsidian Luxury aesthetic

export function generateWatchSvg(type = 'chronograph', options = {}) {
  const {
    dialColor = '#0B131D',
    bezelColor = '#1B344B',
    caseColor = '#A6B2C2',
    accentColor = '#38BDF8',
    handsColor = '#F4F4F0',
    hasSubdials = type === 'chronograph',
    hasDate = true,
    brand = 'HOROLOGY'
  } = options;

  return `
    <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="watch-vector-render" aria-label="Horological Timepiece Illustration">
      <defs>
        <!-- Gradients -->
        <radialGradient id="caseShine" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#E2E8F0" />
          <stop offset="40%" stop-color="${caseColor}" />
          <stop offset="85%" stop-color="#334155" />
          <stop offset="100%" stop-color="#0F172A" />
        </radialGradient>
        <radialGradient id="dialDepth" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#152B46" />
          <stop offset="70%" stop-color="${dialColor}" />
          <stop offset="100%" stop-color="#040A12" />
        </radialGradient>
        <linearGradient id="bezelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="50%" stop-color="${bezelColor}" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        <linearGradient id="sapphireSheen" x1="0%" y1="0%" x2="80%" y2="80%">
          <stop offset="0%" stop-color="rgba(56, 189, 248, 0.2)" />
          <stop offset="40%" stop-color="transparent" />
          <stop offset="70%" stop-color="rgba(255, 255, 255, 0.08)" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
        <filter id="caseShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#02060D" flood-opacity="0.85"/>
        </filter>
      </defs>

      <!-- Lug Integration (Top and Bottom) -->
      <g filter="url(#caseShadow)">
        <path d="M 115 45 L 115 100 L 205 100 L 205 45 Z" fill="#1E293B" stroke="#334155" stroke-width="2"/>
        <path d="M 115 220 L 115 275 L 205 275 L 205 220 Z" fill="#1E293B" stroke="#334155" stroke-width="2"/>
        <!-- Crown and Pushers -->
        <rect x="268" y="146" width="16" height="28" rx="3" fill="#64748B" stroke="#475569" stroke-width="1.5" />
        ${hasSubdials ? `
          <rect x="262" y="112" width="12" height="18" rx="2" fill="#64748B" stroke="#475569" stroke-width="1.5" />
          <rect x="262" y="190" width="12" height="18" rx="2" fill="#64748B" stroke="#475569" stroke-width="1.5" />
        ` : ''}

        <!-- Outer Watch Case -->
        <circle cx="160" cy="160" r="112" fill="url(#caseShine)" stroke="#475569" stroke-width="1.5"/>
        <!-- Bezel -->
        <circle cx="160" cy="160" r="98" fill="url(#bezelGradient)" stroke="#1E293B" stroke-width="2"/>
        <!-- Dial -->
        <circle cx="160" cy="160" r="88" fill="url(#dialDepth)"/>
      </g>

      <!-- Bezel Tachymeter / Minute Indices -->
      <g stroke="rgba(255, 255, 255, 0.45)" stroke-width="1">
        ${[...Array(12)].map((_, i) => {
    const angle = i * 30;
    return `<line x1="160" y1="65" x2="160" y2="72" transform="rotate(${angle} 160 160)" stroke-width="${i % 3 === 0 ? '2.5' : '1.5'}" stroke="${i % 3 === 0 ? accentColor : '#94A3B8'}"/>`;
  }).join('')}
      </g>

      <!-- Sub-dials (if Chronograph) -->
      ${hasSubdials ? `
        <!-- Left Sub-dial (Seconds) -->
        <circle cx="120" cy="160" r="22" fill="#07111F" stroke="#263A50" stroke-width="1.5"/>
        <line x1="120" y1="160" x2="120" y2="144" stroke="${accentColor}" stroke-width="1.5"/>
        <!-- Right Sub-dial (30-min counter) -->
        <circle cx="200" cy="160" r="22" fill="#07111F" stroke="#263A50" stroke-width="1.5"/>
        <line x1="200" y1="160" x2="210" y2="152" stroke="${accentColor}" stroke-width="1.5"/>
        <!-- Bottom Sub-dial (12-hour counter) -->
        <circle cx="160" cy="195" r="22" fill="#07111F" stroke="#263A50" stroke-width="1.5"/>
        <line x1="160" y1="195" x2="152" y2="204" stroke="${accentColor}" stroke-width="1.5"/>
      ` : ''}

      <!-- Dial Typography / Brand -->
      <text x="160" y="125" font-family="'Cormorant Garamond', Georgia, serif" font-size="10" font-weight="600" letter-spacing="1.5" fill="#F1F4F8" text-anchor="middle">${brand.toUpperCase()}</text>
      <text x="160" y="136" font-family="'Inter', sans-serif" font-size="5" letter-spacing="1" fill="#38BDF8" text-anchor="middle">CHRONOMETER</text>

      <!-- Date Window (at 3 or 4:30) -->
      ${hasDate ? `
        <rect x="206" y="152" width="18" height="16" rx="2" fill="#07111F" stroke="#263A50" stroke-width="1"/>
        <text x="215" y="164" font-family="'JetBrains Mono', monospace" font-size="9" fill="#F1F4F8" font-weight="bold" text-anchor="middle">12</text>
      ` : ''}

      <!-- Watch Hands -->
      <!-- Hour Hand -->
      <line x1="160" y1="160" x2="125" y2="125" stroke="${handsColor}" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="160" y1="160" x2="126" y2="126" stroke="${accentColor}" stroke-width="2" stroke-linecap="round"/>
      <!-- Minute Hand -->
      <line x1="160" y1="160" x2="198" y2="105" stroke="${handsColor}" stroke-width="3" stroke-linecap="round"/>
      <!-- Seconds Hand -->
      <line x1="160" y1="175" x2="160" y2="88" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Center Pin Cap -->
      <circle cx="160" cy="160" r="5" fill="#F1F4F8" stroke="#1E293B" stroke-width="1"/>

      <!-- Sapphire Glare Effect -->
      <circle cx="160" cy="160" r="88" fill="url(#sapphireSheen)" pointer-events="none"/>
    </svg>
  `;
}
