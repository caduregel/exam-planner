import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ExamCardSkeleton() {
    return (
        <Card className="w-full mb-2">
            <CardContent className="
                flex gap-3
                flex-col items-start
                md:flex-row md:justify-between md:gap-4
                lg:flex-row lg:justify-between lg:gap-5
            ">
                <div className="
                    flex flex-col w-full
                    md:flex-row md:items-center md:gap-4 md:overflow-x-auto
                    lg:flex-row lg:items-center lg:gap-5 lg:overflow-x-auto
                ">
                    <Skeleton className="h-4 w-24 md:mr-3 lg:mr-4" />
                    <Skeleton className="h-4 w-40 md:w-32 md:mr-3 lg:w-40 lg:mr-4" />
                </div>
                <div className="
                    flex items-center gap-2 w-full flex-col
                    md:w-auto md:justify-end md:flex-row
                    lg:w-auto lg:justify-end lg:flex-row
                " style={{ minWidth: "120px" }}>
                    <Skeleton className="h-3 w-full md:w-48 lg:w-64 rounded" />
                    <Skeleton className="h-3 w-16 md:w-16 lg:w-20 md:ml-2 lg:ml-2" />
                </div>
            </CardContent>
        </Card>
    );
}

export default ExamCardSkeleton;