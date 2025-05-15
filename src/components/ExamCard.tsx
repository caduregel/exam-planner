import { IExamInfo } from "@/interfaces/IExamInfo";
import { Card, CardContent } from "./ui/card";
import { getTasksForExam } from "@/util/api/Get/GetTasks";
import { Progress } from "./ui/progress";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ITask } from "@/interfaces/ITask";
import useSWR from "swr";
import { Link } from "react-router";

function ExamCard({ exam }: { exam: IExamInfo }) {
    const { data: examTasks, error, isLoading } = useSWR<ITask[]>(`exams/${exam.id}/tasks`, () => getTasksForExam(exam.id))

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching tasks</p>

    const completedTasks = examTasks ? examTasks.filter((task) => task.status).length : 0;
    const completedPercentage = examTasks ? Math.round(
        (completedTasks / examTasks.length) * 100
    ) : 0;

    return (
        <Link to={`/home/exams/${exam.id}`} className="w-full">
            <Card className="w-full mb-2" onClick={() => { console.log(exam) }}>
            <CardContent className="flex gap-5 md:flex-row md:justify-between md:gap-5 flex-col items-start">
                <div className="flex flex-col md:flex-row md:items-center md:gap-5 w-full md:overflow-x-auto">
                <Label className="whitespace-nowrap md:mr-4">
                    {new Date(exam.exam_date).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
                </Label>
                <p
                    className="text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full md:w-auto md:mr-4"
                    title={exam.title}
                >
                    {exam.title}
                </p>
                </div>
                {examTasks?.length !== 0 ? (
                <div className="flex items-center gap-2 w-full md:w-auto md:justify-end md:flex-row flex-col" style={{ minWidth: "120px" }}>
                    <Progress value={completedPercentage} className="md:flex-1 md:w-64 w-full" />
                    <Label className="text-xs md:w-20 md:text-right whitespace-nowrap md:ml-2" style={{ minWidth: "60px", display: "inline-block" }}>
                    {completedPercentage.toString().padStart(3, " ")} % completed
                    </Label>
                </div>
                ) : null}
            </CardContent>
            </Card>
        </Link>
    )
}

export default ExamCard;