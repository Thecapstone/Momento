export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-2xl font-semibold mb-2">No Capsules Yet</h2>

      <p className="text-gray-400 mb-6 max-w-sm">
        Capsules are your projects over time. Create one to start capturing
        ideas, progress, and reflections.
      </p>

      <button className="px-6 py-3 bg-white text-black rounded-xl">
        Create Capsule
      </button>
    </div>
  );
};
