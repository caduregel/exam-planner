import ExampInput from "../components/ExamInput"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import ExamCard from "@/components/ExamCard"
import { IExamInfo } from "@/interfaces/IExamInfo"
import useSWR from "swr"
import { getExams } from "@/util/api/Get/GetExams"

function ExamsPage() {
    const { data: exams, error, isLoading } = useSWR<IExamInfo[]>("exams", () => getExams())

    const [examAddSuccess, setExamUpdateSuccess] = useState<boolean>(false)



    useEffect(() => {
        if (examAddSuccess) {
            const timer = setTimeout(() => {
                setExamUpdateSuccess(false);
            }, 3000); // Hide alert after 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount or state change
        }
    }, [examAddSuccess]);
    if (exams) {

        return (
            <>
                <div className="p-5 w-full">
                    <div className="flex gap-5 md:flex-row flex-col md:justify-between">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>Upcoming exams</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p>Error fetching exams</p>
                                ) : exams.length === 0 ? (
                                    <p>No upcoming exams</p>
                                ) : (
                                    <div>
                                        {exams.map((exam) => (
                                            <div key={exam.id} className="flex items-center space-x-2 hover:scale-103 transition-transform duration-200">
                                                <ExamCard exam={exam} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
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
}

export default ExamsPage
