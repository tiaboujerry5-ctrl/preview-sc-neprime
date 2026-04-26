export default function SceneCardSkeleton() {
  return (
    <div className="rounded-2xl bg-surface-900 border border-surface-800 overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-4 w-full rounded skeleton" />
        <div className="h-4 w-2/3 rounded skeleton" />
        <div className="pt-3 border-t border-surface-800">
          <div className="h-3 w-20 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}
