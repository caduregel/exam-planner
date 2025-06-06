import ExampInput from "@/components/ExamInput"
import TodaysTasks from "@/components/DashboardComponents/TodaysTasks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import UpcomingExams from "@/components/DashboardComponents/UpcomingExams";
import TasksDistributionGraph from "@/components/ExamPageComponents/TasksDistributionGraph";
import TasksQuickStats from "@/components/TasksQuickStats";


function Dashboard() {
    const [examAddSuccess, setExamUpdateSuccess] = useState<boolean>(false)

    useEffect(() => {
        if (examAddSuccess) {
            const timer = setTimeout(() => {
                setExamUpdateSuccess(false);
            }, 3000); // Hide alert after 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount or state change
        }
    }, [examAddSuccess]);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:p-4 p-2">
                <h1 className="text-2xl md:text-4xl font-bold">Dashboard</h1>
                <span className="text-md md:text-lg text-gray-500 dark:text-gray-300 mt-2 md:mt-0">
                    {new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </span>
            </div>
            <div className="flex flex-col md:grid grid-cols-10 gap-5 items-center md:items-start p-2 md:p-4" >
                <div className="col-start-1 col-end-8 flex flex-col gap-5 w-full">
                    <div className="flex flex-col md:flex-row h-full gap-5">
                        <TodaysTasks />
                        <TasksDistributionGraph />
                    </div>
                    <UpcomingExams swrKey="dashboard/exams"/>
                </div>
                <div className="col-start-8 col-end-11 row-start-1 w-full flex flex-col gap-5">
                    <TasksQuickStats />
                    <ExampInput  />
                </div>
                {examAddSuccess && (
                    <Alert className="fixed bottom-5 max-w-fit right-4 bg-green-500 dark:bg-green-700 border-green-500 text-green-100 dark:text-green-400 transition-opacity opacity-100 duration-300 ease-in-out">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-300" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription className="text-green">
                            Exam Successfully added
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </>
    )
}

export default Dashboard