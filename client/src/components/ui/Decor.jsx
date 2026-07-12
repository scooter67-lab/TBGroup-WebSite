/**
 * Фирменная графика TB Group (бренд-бук, стр. 11–16):
 * орбитальная сцена, точечные поля, волновые линии.
 * Все элементы декоративные (aria-hidden) и уважают prefers-reduced-motion.
 */

/** Инженерная орбитальная сцена для Hero (утверждённый вариант A v2) */
export function OrbitalScene({ className = '' }) {
  return (
    <svg viewBox="0 0 780 680" fill="none" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="tb-coreg" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#D946EF" stopOpacity=".30" />
          <stop offset="1" stopColor="#D946EF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* орбиты */}
      <ellipse cx="400" cy="340" rx="345" ry="158" stroke="rgba(91,33,182,.55)" strokeDasharray="4 9" className="animate-dashflow" transform="rotate(-14 400 340)" />
      <ellipse cx="400" cy="340" rx="258" ry="116" stroke="rgba(217,70,239,.30)" transform="rotate(-14 400 340)" />
      <ellipse cx="400" cy="340" rx="172" ry="78" stroke="rgba(249,115,22,.32)" transform="rotate(-14 400 340)" />
      {/* свечение и ядро-«роспад» */}
      <circle cx="400" cy="340" r="130" fill="url(#tb-coreg)" />
      <circle cx="400" cy="340" r="52" stroke="rgba(217,70,239,.30)" />
      <g fill="url(#tbg)">
        <rect x="386" y="310" width="14" height="14" rx="3" />
        <rect x="405" y="316" width="10" height="10" rx="2" />
        <rect x="375" y="329" width="10" height="10" rx="2" />
        <rect x="396" y="333" width="14" height="14" rx="3" />
        <rect x="415" y="331" width="8" height="8" rx="2" />
        <rect x="386" y="348" width="10" height="10" rx="2" />
        <rect x="365" y="342" width="7" height="7" rx="1.5" className="animate-twk" />
        <rect x="424" y="316" width="6" height="6" rx="1.5" className="animate-twk" style={{ animationDelay: '1.1s' }} />
        <rect x="358" y="320" width="5" height="5" rx="1" className="animate-twk" style={{ animationDelay: '.6s' }} />
        <rect x="430" y="346" width="5" height="5" rx="1" className="animate-twk" style={{ animationDelay: '1.7s' }} />
        <rect x="404" y="360" width="7" height="7" rx="1.5" className="animate-twk" style={{ animationDelay: '2.2s' }} />
      </g>
      {/* коннекторы с узлами-изломами */}
      <g stroke="rgba(255,255,255,.15)">
        <path d="M352 314 L282 268 L204 252" />
        <path d="M448 318 L492 264 L516 250" />
        <path d="M452 366 L520 416 L556 426" />
        <path d="M348 366 L262 428 L206 446" />
      </g>
      <path d="M400 288 L400 196 L470 150" stroke="url(#tbg)" strokeWidth="1.5" strokeDasharray="2 7" className="animate-dashflow-fast" />
      <g fill="rgba(255,255,255,.4)">
        <rect x="279" y="265" width="4" height="4" />
        <rect x="490" y="262" width="4" height="4" />
        <rect x="518" y="414" width="4" height="4" />
        <rect x="259" y="425" width="4" height="4" />
        <rect x="398" y="194" width="4" height="4" />
      </g>
      {/* узлы-чипы интеграций (Michroma, латиница) */}
      <g fontFamily="Michroma" fontSize="9" letterSpacing="2" fill="#C9C4E0">
        <g>
          <rect x="112" y="238" width="94" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" />
          <circle cx="126" cy="251" r="3" fill="#D946EF" />
          <text x="136" y="255">MOYSKLAD</text>
        </g>
        <g>
          <rect x="512" y="236" width="90" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" />
          <circle cx="526" cy="249" r="3" fill="#F97316" />
          <text x="536" y="253">BITRIX24</text>
        </g>
        <g>
          <rect x="552" y="416" width="52" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" />
          <circle cx="566" cy="429" r="3" fill="#5B21B6" />
          <text x="576" y="433">SIP</text>
        </g>
        <g>
          <rect x="162" y="432" width="44" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" />
          <circle cx="176" cy="445" r="3" fill="#FACC15" />
          <text x="186" y="449">1C</text>
        </g>
        <g>
          <rect x="466" y="128" width="50" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.16)" />
          <circle cx="480" cy="141" r="3" fill="#2563EB" />
          <text x="490" y="145">API</text>
        </g>
      </g>
      {/* инженерные метки */}
      <g stroke="rgba(255,255,255,.16)" strokeWidth="1">
        <path d="M96 132h12M102 126v12" />
        <path d="M676 316h12M682 310v12" />
        <path d="M300 592h12M306 586v12" />
        <path d="M560 560h12M566 554v12" />
      </g>
      <circle cx="238" cy="140" r="4" fill="#D946EF" />
      <circle cx="238" cy="140" r="10" stroke="rgba(217,70,239,.35)" />
      <circle cx="700" cy="500" r="3.5" fill="#F97316" className="animate-twk" style={{ animationDelay: '.9s' }} />
    </svg>
  );
}

/** Точечное поле с затуханием (паттерн бренд-бука, стр. 16) */
export function DotsField({ className = '', opacity = 0.5 }) {
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false" style={{ opacity }}>
      <defs>
        <pattern id="tb-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.8" fill="url(#tbg)" />
        </pattern>
        <linearGradient id="tb-dots-m" x1="0" y1="0" x2="1" y2=".4">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity=".65" />
        </linearGradient>
        <mask id="tb-dots-k">
          <rect width="100%" height="100%" fill="url(#tb-dots-m)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#tb-dots)" mask="url(#tb-dots-k)" />
    </svg>
  );
}

/** Волновая линия из точек (бренд-бук, стр. 13–14) — разделитель, футер */
export function DotsWave({ className = '' }) {
  return (
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M-20 48 C 120 18, 240 66, 380 42 S 640 14, 780 46 S 1040 70, 1220 36"
        stroke="url(#tbg)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.1 11"
        fill="none"
        opacity=".7"
      />
    </svg>
  );
}

/** Пиксельный кластер (мотив «роспада» логотипа) — пустые состояния, буллеты */
export function PixelCluster({ size = 52, className = '' }) {
  return (
    <svg viewBox="0 0 52 52" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <g fill="url(#tbg)">
        <rect x="8" y="10" width="10" height="10" rx="2.5" />
        <rect x="22" y="14" width="7" height="7" rx="1.8" />
        <rect x="12" y="24" width="7" height="7" rx="1.8" />
        <rect x="25" y="27" width="10" height="10" rx="2.5" />
        <rect x="37" y="20" width="5" height="5" rx="1.2" />
        <rect x="33" y="38" width="6" height="6" rx="1.5" />
        <rect x="42" y="32" width="4" height="4" rx="1" />
      </g>
    </svg>
  );
}
