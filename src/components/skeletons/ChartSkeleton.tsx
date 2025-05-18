import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChartSkeleton() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>
          <Skeleton className="h-6 w-40 mb-1" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 h-fit">
        {/* Bar chart skeleton */}
        <div className="w-full min-h-[200px] flex items-end gap-2 px-4 py-6">
          {/* Simulate 7 bars */}
          {[...Array(7)].map((_, i) => (
            <Skeleton
              key={i}
              className={`w-6 rounded ${[
                "h-12",
                "h-20",
                "h-16",
                "h-28",
                "h-10",
                "h-24",
                "h-18",
              ][i % 7]}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}