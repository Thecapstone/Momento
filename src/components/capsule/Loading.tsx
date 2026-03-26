export const LoadingState = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="h-6 w-40 bg-gray-700 animate-pulse rounded" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-60 bg-gray-800 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    </div>
  )
}