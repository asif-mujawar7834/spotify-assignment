export const SongLoadingSkeleton = () => {
  return (
    <div className="h-[80px] px-3 bg-gray-500/50 animate-pulse rounded-md flex items-center gap-2">
      <div className="h-[48px] w-[48px] rounded-full bg-gray-400 animate-pulse shrink-0"></div>
      <div className="w-full flex flex-col gap-2">
        <div className="h-[15px] w-[80%] flex-grow rounded-full bg-gray-400/60 animate-pulse "></div>
        <div className="h-[12px] w-[50%] flex-grow rounded-full bg-gray-400/60 animate-pulse "></div>
      </div>
      <div className="h-[12px] w-[15%] flex-grow rounded-full bg-gray-400/60 animate-pulse "></div>
    </div>
  );
};
