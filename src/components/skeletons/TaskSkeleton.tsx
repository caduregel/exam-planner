import { Skeleton } from "../ui/skeleton"

const TaskSkeleton = () => (
    <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-1/3" />
    </div>
)

export default TaskSkeleton