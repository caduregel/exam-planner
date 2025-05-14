import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ITask } from "@/interfaces/ITask"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { getExams } from "@/util/api/Get/GetExams"

function UpcomingExams() {
    const [exams, setExams] = useState<ITask[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        getExams()
            .then((data: ITask[]) => {
                setExams(data)
                setLoading(false)
                setError(false)
            }
            )
            .catch((error) => {
                console.error("Error fetching exams:", error)
                setError(true)
            }
            )
    }, [])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="">
                    Upcoming Exams
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error fetching exams</p>
                ) : exams.length === 0 ? (
                    <p>No upcoming exams</p>
                ) : (
                    <div>
                        {exams.map((exam) => (
                            <div key={exam.id} className="flex items-center space-x-2">
                                <Label >{exam.title}</Label>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
export default UpcomingExams;