import ExampInput from "../components/ExamInput"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import UpcomingExams from "@/components/DashboardComponents/UpcomingExams"

function ExamsPage() {
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
            <div className="p-5 w-full">
                <div className="flex gap-5 lg:flex-row flex-col lg:justify-between">
                    <UpcomingExams />
                    <ExampInput setExamUpdateSuccess={setExamUpdateSuccess} />
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
            </div>
        </>
    )

}

export default ExamsPage
