export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center gap-2 mt-10" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-colors"
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            p === page ? 'bg-brand-accent text-white border-brand-accent' : 'hover:bg-gray-100 dark:hover:bg-brand-navy-light'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-colors"
      >
        →
      </button>
    </nav>
  );
}
