export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-paper-2 dark:bg-ink-3 rounded-lg ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="card-tb p-6 space-y-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
