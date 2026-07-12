/**
 * Фирменные иконки TB Group: линейные, 24px-сетка, штрих 1.8,
 * обводка — общий градиент G1 (#tbg из GradientDefs в Layout).
 * Эмодзи в интерфейсе запрещены дизайн-системой.
 */

export function GradientDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="tbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B21B6" />
          <stop offset=".5" stopColor="#D946EF" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const paths = {
  package: (
    <>
      <path d="M21 8 12 3 3 8l9 5 9-5ZM3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  nodes: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M6.6 7.4 10 10m4 0 3.4-2.6M6.6 16.6 10 14m4 0 3.4 2.6" />
    </>
  ),
  wave: <path d="M4 12h3l2-5 3 10 2.5-7 1.5 2h4" />,
  cloud: <path d="M17.5 18a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6.2 10.4 4 4 0 0 0 7 18h10.5Z" />,
  chart: (
    <>
      <path d="M5 20V11m7 9V4m7 16v-7" />
      <path d="M21 20H3" opacity=".4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 5V3m0 18v-2m7-7h2M3 12h2m11.6-4.6 1.4-1.4M6 18l1.4-1.4m10.2 0L19 18M6 6l1.4 1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.4 2.4L15.5 9.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 8h2m2 0h2M9 12h2m2 0h2M9 16h2m2 0h2M3 21h18" />
    </>
  ),
  chat: (
    <>
      <path d="M20 12a8 8 0 1 0-3.2 6.4L20 19l-.6-3.2A7.9 7.9 0 0 0 20 12Z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.4" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z" />
      <path d="M14 3v4.5h4.5M9 12h6M9 16h6" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 17.5h2" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 6 .4l2.5-2.5a4 4 0 1 0-5.7-5.7L11.6 7.4" />
      <path d="M14 10a4 4 0 0 0-6-.4L5.5 12.1a4 4 0 1 0 5.7 5.7l1.2-1.2" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a2 2 0 0 0 2.8-2.8L12 12.4l1.3-1.3a3 3 0 0 1 4.2 0l3 3M3.5 14 8 18.5a2 2 0 0 0 2.8-2.8" />
      <path d="m3 8 4-4 5 2 4-2 5 4-3 3" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15c-2 0-3-1-3-3 0-4 3-8 7-9 .5 0 1 .5 1 1-1 4-1 7-5 11Z" />
      <path d="M9 12 4.5 13.5 8 10m1 5-1.5 4.5L11 16m3.5-8.5h.01" />
    </>
  ),
};

export default function BrandIcon({ name, size = 24, className = '', strokeWidth = 1.8 }) {
  const body = paths[name] || paths.gear;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="url(#tbg)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {body}
    </svg>
  );
}

/** соответствие старых эмодзи-иконок фирменным (для данных из БД/serviceContent) */
export const emojiToIcon = {
  '📦': 'package',
  '👥': 'nodes',
  '📞': 'wave',
  '☁️': 'cloud',
  '⚙️': 'gear',
  '✅': 'check',
  '🌐': 'globe',
  '🏢': 'building',
  '💬': 'chat',
  '📄': 'doc',
  '📊': 'chart',
  '📱': 'mobile',
  '🔗': 'link',
  '🤝': 'handshake',
  package: 'package',
  users: 'nodes',
  phone: 'wave',
  cloud: 'cloud',
};
