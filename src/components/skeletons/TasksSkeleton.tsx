import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TasksSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} className="w-full border border-muted p-2">
          <CardContent className="flex items-center space-x-3 py-1 px-2">
            {/* Checkbox skeleton */}
            <Skeleton className="h-5 w-5 rounded" />

            {/* Title and due date */}
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/3" />
            </div>

            {/* Action buttons */}
            <div className="flex space-x-1 items-center">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}