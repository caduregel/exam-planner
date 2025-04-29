import DateToDo from "@/components/DateToDo"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IExamInfo } from "@/interfaces/IExamInfo"
import { validateDate } from "@/util/dateHandlings"
import { dateToDoMatcher, getDates } from "@/util/dateToDoMatcher"
import { Link } from "react-router"

function InvalidExamInputted() {
    return <>
        <div className="flex flex-col items-center justify-center">
            <Card className="w-[40vw]">
                <CardHeader>
                    <CardTitle>Invalid Exam</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <p>Please enter a valid exam first</p>
                </CardContent>
                <CardFooter>
                    <Link to="/exam-info" >
                        <Button variant="outline" className="hover:cursor-pointer"> Go back</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    </>
}

function ExamPlan() {
    const localExam = localStorage.getItem("exam")

    if (!localExam) {
        return <InvalidExamInputted />
    }

    const exam: IExamInfo = JSON.parse(localExam)
    const subject = exam.subject
    const date = exam.date
    const toDos = exam.toDo

    if (subject == "" || !validateDate(date) || toDos.length == 0) {
        return <InvalidExamInputted />
    }

    const dateRange = getDates(new Date(), date)

    const dateToDos = dateToDoMatcher(dateRange, toDos)

    console.log(dateToDos)

    return (
        <>
            <div className="flex flex-col items-start gap-5" >
                <h1 className="text-2xl font-bold">Your {subject} schedule</h1>
                <div className="grid grid-cols-4 mt-auto w-full">
                    {dateToDos.map((dateToDo) => {
                        return (<DateToDo date={dateToDo.date} toDos={[...dateToDo.toDos]} />)
                    })}
                </div>
            </div>
        </>
    )
}

export default ExamPlan
