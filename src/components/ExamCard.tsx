import { IExamInfo } from "@/interfaces/IExamInfo";
import { Card, CardContent } from "./ui/card";
import { getTasksForExam } from "@/util/api/Get/GetTasks";
import { Progress } from "./ui/progress";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ITask } from "@/interfaces/ITask";
import useSWR from "swr";
import { Link } from "react-router";



function ExamCard({ exam }: { exam: IExamInfo }) {
    const { data: examTasks, error, isLoading } = useSWR<ITask[]>("tasks" + exam.id, () => getTasksForExam(exam.id))

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching tasks</p>

    const completedTasks = examTasks ? examTasks.filter((task) => task.status).length : 0;
    const completedPercentage = examTasks ? Math.round(
        (completedTasks / examTasks.length) * 100
    ) : 0;

    console.log(completedTasks)
    return (
        <Link to={`/home/exams/${exam.id}`} className="w-full">
            <Card className="w-full mb-2" onClick={() => { console.log(exam) }} >
                <CardContent className="flex items-center gap-5">
                    <Label>{String(exam.exam_date)}</Label>
                    <p className="text-sm">{exam.title}</p>
                    {
                        examTasks?.length !== 0 ? (
                            <>
                                <Progress value={completedPercentage} />
                                <Label className="text-xs">{completedPercentage} % completed</Label>
                            </>
                        ) : null
                    }

                </CardContent>
            </Card>
        </Link>
    )
}

export default ExamCard;