export default function ProductGridSkeleton({
  label,
  count = 8,
}: {
  label: string;
  count?: number;
}) {
  return (
    <div role="status" aria-label={label}>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="animate-pulse">
            <div className="aspect-square rounded-3xl bg-sand" />
            <div className="mt-4 h-4 w-3/4 rounded-full bg-sand" />
            <div className="mt-2.5 h-4 w-1/3 rounded-full bg-sand" />
          </li>
        ))}
      </ul>
    </div>
  );
}
