import { Skeleton } from "../ui/skeleton"

export function UserDropdownSkeleton() {
    return (
        <div className="flex items-center gap-2  md:px-5">
            <Skeleton className="rounded-full size-8"/>
            <Skeleton className="h-4 w-15" />
        </div>
    )
}
