import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getExams } from "@/util/api/Get/GetExams"
import { IExamInfo } from "@/interfaces/IExamInfo"
import ExamCard from "../ExamCard"
import useSWR from "swr"
import ExamCardSkeleton from "../skeletons/ExamCardSkeleton"



function UpcomingExams({ swrKey }: { swrKey: string }) {
    const { data: exams, error, isLoading } = useSWR<IExamInfo[]>(swrKey, () => getExams());
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="">
                    Upcoming Exams
                </CardTitle>
            </CardHeader>
            <CardContent >
                {isLoading ? (
                    <div>
                        <ExamCardSkeleton />
                        <ExamCardSkeleton />
                    </div>
                ) : error ? (
                    <p>Error fetching exams</p>
                ) : exams && exams.length === 0 ? (
                    <p>No upcoming exams</p>
                ) : exams && (
                    <div>
                        {exams
                            .slice()
                            .sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime())
                            .map((exam) => (
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

export default UpcomingExams;