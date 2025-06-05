const Skeleton = () => {
  return (
    <div
      className="w-full grid gap-3 p-1 "
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
    >
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  );
};

export default Skeleton;

const SkeletonCard = () => {
  return (
    <div className="w-full  flex flex-col gap-1 animate-pulse">
      <div className="w-full aspect-[226/300]  bg-white/20 dark:bg-primary/20 rounded-xl" />
      <div className="h-4 w-11/12 bg-white/20 dark:bg-primary/20 rounded-sm" />
      <div className="h-4 w-11/12 bg-white/20 dark:bg-primary/20 rounded-sm" />
    </div>
  );
};
