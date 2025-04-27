import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import React, { useEffect, useState } from "react"

interface ExamInfo {
    subject: string
    date: string
    toDo: string[]
}

function ExampInput() {
    const [subject, setSubject] = useState<string>("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [toDos, setToDos] = useState<string[]>([""])

    const [examInfo, setExamInfo] = useState<ExamInfo>({
        subject: "",
        date: "",
        toDo: [],
    })

    useEffect(() => {
        const examInfo = {
            subject: subject,
            date: String(date),
            toDo: [...toDos],
        }
        setExamInfo(examInfo)
        console.log(examInfo)
    }, [subject, date, toDos])


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

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <Card className="w-[40vw]">
                    <CardHeader>
                        <CardTitle>Exam Info</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <Label className="m-1">Subject</Label>
                        <Input placeholder="Name of the subject" value={subject} onChange={(e) => { setSubject(e.target.value) }} />

                        <Label className="m-2">To Do</Label>
                        {examInfo.toDo.map((item, index) => (
                            <div className="flex flex-row items-center space-x-2" key={index}>
                                <Button variant="outline" className="hover:cursor-pointer" onClick={() => { handleToDoDelete(index) }}>X</Button>
                                <Input key={index} placeholder={`E.g Chapter ${index + 1}`} value={item} onChange={(e) => { handleToDoChange(e, index) }} />
                            </div>
                        ))}
                        <Button variant="outline" className="hover:cursor-pointer max-w-fit" onClick={() => { setToDos([...toDos, ""]) }}>Add To Do</Button>

                        <div className="flex flex-col items-center gap-2">
                            <Label className="m-1">Exam Date</Label>

                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border max-w-fit"
                            />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="hover:cursor-pointer"> Make a study plan</Button>
                    </CardFooter>
                </Card>

            </div>
        </>
    )
}

export default ExampInput
