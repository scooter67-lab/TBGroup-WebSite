export default function PageLoader() {
  // Фирменный лоадер: пиксельный «роспад» знака, мигающий каскадом
  const px = [
    { x: 0, y: 0, s: 12, d: 0 },
    { x: 16, y: 4, s: 8, d: 0.15 },
    { x: 4, y: 16, s: 8, d: 0.3 },
    { x: 18, y: 18, s: 12, d: 0.45 },
    { x: 32, y: 12, s: 6, d: 0.6 },
    { x: 30, y: 28, s: 7, d: 0.75 },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink">
      <svg viewBox="0 0 40 40" width="44" height="44" aria-label="Загрузка">
        <defs>
          <linearGradient id="tbg-load" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B21B6" />
            <stop offset=".5" stopColor="#D946EF" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
        {px.map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.s}
            height={p.s}
            rx="2"
            fill="url(#tbg-load)"
            className="animate-twk"
            style={{ animationDelay: `${p.d}s`, animationDuration: '1.2s' }}
          />
        ))}
      </svg>
    </div>
  );
}
