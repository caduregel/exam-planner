import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getExams } from "@/util/api/Get/GetExams"
import { IExamInfo } from "@/interfaces/IExamInfo"
import ExamCard from "../ExamCard"
import useSWR from "swr"

function UpcomingExams() {
    const { data: exams, error, isLoading } = useSWR<IExamInfo[]>("exams", () => getExams())

    if (exams){
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="">
                        Upcoming Exams
                    </CardTitle>
                </CardHeader>
                <CardContent >
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
        );
    }
}
export default UpcomingExams;