import { Skeleton } from "./shadcn/skeleton";

interface QuoteSkeletonProps {
  style?: React.CSSProperties;
}

export function QuoteSkeleton({ style }: QuoteSkeletonProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-4" style={style}>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-1/4 self-end" />
    </div>
  );
} 