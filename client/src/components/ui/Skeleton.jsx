export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-brand-navy-light rounded-lg ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
