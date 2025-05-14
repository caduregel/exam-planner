import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import React, { useEffect, useState } from "react"
import { IExamInfo } from "@/interfaces/IExamInfo"
import { validateDate } from "@/util/dateHandlings"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { dateToDoMatcherFlat, getDates, SpreadType } from "@/util/dateToDoMatcher"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "./providers/AuthProvider"

interface IExamInputProps {
    setExamUpdateSuccess: (value: boolean) => void;
}

function ExampInput({ setExamUpdateSuccess }: IExamInputProps) {
    const [subject, setSubject] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date)
    const [toDos, setToDos] = useState<string[]>([""])
    const [taskSpread, setTaskSpread] = useState<SpreadType>("even")


    const [newExamInfo, setNewExamInfo] = useState<IExamInfo>({
        title: subject,
        date: date,
        toDo: toDos,
    })

    const spreadOptions = [
        { value: "even", label: "Even Spread" },
        { value: "start", label: "Start Spread" },
        { value: "end", label: "End Spread" },
        { value: "middle", label: "Middle Spread" },
    ]

    const [filledStatus, setFilledStatus] = useState<boolean>(false)

    useEffect(() => {
        const updatedExamInfo = {
            title: subject,
            date: date,
            toDo: toDos
        }
        setNewExamInfo(updatedExamInfo)
        if (subject !== "" && validateDate(date) && toDos.length !== 0) {
            setFilledStatus(true)
        } else setFilledStatus(false)
    }, [
        subject, date, toDos
    ])

    const { session } = useAuth()

    const userID = session?.user.id

    const handleExamAdd = async () => {
        const { title, date, toDo } = newExamInfo;

        // Insert exam
        const { data: examData, error: examError } = await supabase
            .from('exams')
            .insert({ title, exam_date: date, user_id: userID })
            .select()
            .single();

        if (examError) {
            console.error("Failed to insert exam:", examError);
            return;
        }

        const examId = examData.id;

        // Generate date range (today to day before exam)
        const today = new Date();
        const dayBeforeExam = new Date(date);
        dayBeforeExam.setDate(dayBeforeExam.getDate() - 1);

        const dateRange = getDates(today, dayBeforeExam);
        const tasks = dateToDoMatcherFlat(dateRange, toDo, taskSpread);

        // Prepare tasks array for Supabase
        const tasksPayload = tasks.map(task => ({
            exam_id: examId,
            title: task.title,
            due_date: task.due_date.toISOString().split('T')[0], // format as 'YYYY-MM-DD'
            status: false,
        }));

        // Insert tasks in bulk
        const { error: tasksError } = await supabase
            .from('tasks')
            .insert(tasksPayload);

        if (tasksError) {
            console.error("Failed to insert tasks:", tasksError);
            return;
        }

        console.log("Exam and tasks successfully inserted");
        setExamUpdateSuccess(true);
    }

    const handleToDoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let newTodo: string[] = [...toDos];
        newTodo[index] = e.target.value;
        setToDos(newTodo)
    }

    const handleToDoDelete = (index: number) => {
        let newTodo: string[] = [...toDos];
        newTodo.splice(index, 1);
        setToDos(newTodo)
    }

    const handleDateChange = (newDate: Date | undefined) => {
        newDate ? setDate(newDate) : console.log("Invalid Date")
    }

    return (
        <>
            <Card className="max-w-200">
                <CardHeader>
                    <CardTitle>Add an exam</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <Label className="m-1">Exam name</Label>
                    <Input placeholder="E.g Bio Nervous System" value={subject} onChange={(e) => { setSubject(e.target.value) }} />

                    <Label className="m-2">To Do</Label>
                    {newExamInfo.toDo.map((item, index) => (
                        <div className="flex flex-row items-center space-x-2" key={index}>
                            <Button variant="outline" className="hover:cursor-pointer" onClick={() => { handleToDoDelete(index) }}>X</Button>
                            <Input key={index} placeholder={`E.g Revise Chapter ${index + 1}`} value={item} onChange={(e) => { handleToDoChange(e, index) }} />
                        </div>
                    ))}
                    <Button variant="outline" className="hover:cursor-pointer max-w-fit" onClick={() => { setToDos([...toDos, ""]) }}>Add To Do</Button>

                    <div className="flex flex-col items-center gap-2">
                        <Label className="m-1">Exam Date</Label>

                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange}
                            className="rounded-md border max-w-fit"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-sm">Task Spread</label>
                        <Select
                            value={taskSpread}
                            onValueChange={(value) => setTaskSpread(value as SpreadType)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select spread" />
                            </SelectTrigger>
                            <SelectContent>
                                {spreadOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Optional: Show description below select */}
                    <p className="text-sm text-muted-foreground">
                        {taskSpread === "even" && "Tasks spread evenly between now and the exam."}
                        {taskSpread === "start" && "More tasks now, less as the exam approaches."}
                        {taskSpread === "end" && "Not a lot of tasks now, more intense as the exam approaches"}
                        {taskSpread === "middle" && "start off easy, work hard for a short while, and ease off before the exam"}

                    </p>
                </CardContent>
                <CardFooter>
                    {filledStatus ?
                        <Button variant="outline" className="hover:cursor-pointer" onClick={handleExamAdd}> Make a study plan</Button>
                        : <Button variant="outline" disabled>Generate a study plan</Button>
                    }
                </CardFooter>
            </Card>
        </>
    )
}

export default ExampInput
