import { Skeleton } from "@/components/ui/skeleton"

export default function ExamPageHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between md:p-4 p-2">
      {/* Title skeleton */}
      <Skeleton className="h-8 md:h-12 w-2/3 md:w-1/3 mb-2 md:mb-0" />

      {/* Date and countdown skeletons */}
      <div className="flex flex-col md:items-end space-y-1">
        <Skeleton className="h-5 w-32 md:w-40" />
        <Skeleton className="h-4 w-24 md:w-32" />
      </div>
    </div>
  )
}