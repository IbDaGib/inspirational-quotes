import { Skeleton } from "./shadcn/skeleton";

interface CarouselSkeletonProps {
  style?: React.CSSProperties;
}

export function CarouselSkeleton({ style }: CarouselSkeletonProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div 
          className="p-6 rounded-lg shadow-xl"
          style={style}
        >
          {/* Title skeleton */}
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          
          {/* Quote card skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-6 w-32 ml-auto" />
          </div>

          {/* Navigation skeleton */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 