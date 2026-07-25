const btnBase =
  'w-10 h-10 inline-flex items-center justify-center rounded-xl border text-sm font-semibold transition-colors duration-250 ' +
  'border-paper-line2 text-tx2 hover:border-brand-magenta hover:text-tx ' +
  'dark:border-white/15 dark:text-tx-inv2 dark:hover:border-brand-magenta dark:hover:text-tx-inv ' +
  'disabled:opacity-40 disabled:pointer-events-none';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center gap-2 mt-10" aria-label="Pagination">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={btnBase} aria-label="Назад">
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={p === page ? `${btnBase} bg-g1 text-white border-transparent hover:text-white` : btnBase}
        >
          {p}
        </button>
      ))}
      <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className={btnBase} aria-label="Вперёд">
        →
      </button>
    </nav>
  );
}
