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

interface IExamInputProps {
    examInfo: IExamInfo
    setExamInfo: (examInfo: IExamInfo) => void;
    handleExamAdd: () => void;
}

function ExampInput({ examInfo, setExamInfo, handleExamAdd }: IExamInputProps) {
    const [subject, setSubject] = useState<string>(examInfo.subject)
    const [date, setDate] = useState<Date>(new Date(examInfo.date))
    const [toDos, setToDos] = useState<string[]>([...examInfo.toDo])

    const [filledStatus, setFilledStatus] = useState<boolean>(false)

    useEffect(() => {
        const newExamIno = {
            subject: subject,
            date: date,
            toDo: toDos
        }
        setExamInfo(newExamIno)
        if (subject !== "" && validateDate(date) && toDos.length !== 0) { 
            setFilledStatus(true) 
        } else setFilledStatus(false)
    }, [
        subject, date, toDos
    ])

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
                    {examInfo.toDo.map((item, index) => (
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

                </CardContent>
                <CardFooter>
                    {filledStatus ?
                        <Button variant="outline" className="hover:cursor-pointer" onClick={handleExamAdd}> Make a study plan</Button>
                        : <Button variant="outline" disabled> Make a study plan</Button>
                    }
                </CardFooter>
            </Card>
        </>
    )
}

export default ExampInput
