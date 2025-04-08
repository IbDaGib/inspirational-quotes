import { Skeleton } from "./shadcn/skeleton";

interface TagsSkeletonProps {
  style?: React.CSSProperties;
}

export function TagsSkeleton({ style }: TagsSkeletonProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2" style={style}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-20 rounded-full" />
      ))}
    </div>
  );
} 