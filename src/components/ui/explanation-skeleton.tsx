import { Skeleton } from "./shadcn/skeleton";

interface ExplanationSkeletonProps {
  style?: React.CSSProperties;
}

export function ExplanationSkeleton({ style }: ExplanationSkeletonProps) {
  return (
    <div className="w-full p-4 rounded-lg space-y-2" style={style}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
} 