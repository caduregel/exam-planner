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
import { IExamInfo } from "@/interfaces/IExamInfo"
import { Link } from "react-router"
import { validateDate } from "@/util/dateHandlings"

function ExampInput() {
    const localExam = localStorage.getItem("exam")

    const [examInfo, setExamInfo] = useState<IExamInfo>(localExam ? JSON.parse(localExam || "") : {
        subject: "",
        date: new Date,
        toDo: [],
    })

    const [subject, setSubject] = useState<string>(examInfo.subject)
    const [date, setDate] = useState<Date>(new Date(examInfo.date))
    const [toDos, setToDos] = useState<string[]>([...examInfo.toDo])

    const [filledStatus, setFilledStatus] = useState<boolean>(false)

    useEffect(() => {
        const newExamInfo = {
            subject: subject,
            date: date,
            toDo: [...toDos],
        }
        console.log(subject !== "" && toDos.length > 0 && validateDate(date))
        if (subject !== "" && toDos.length > 0 && validateDate(date)) {
            setFilledStatus(true)
        } else {
            setFilledStatus(false)
        }

        setExamInfo(newExamInfo)
        localStorage.setItem("exam", JSON.stringify(newExamInfo))
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

    const handleDateChange = (newDate: Date | undefined) => {
        newDate ? setDate(newDate) : console.log("Invalid Date")
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <Card className="min-w-[40vw]">
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
                            <Link to="/exam-plan" >
                                <Button variant="outline" className="hover:cursor-pointer"> Make a study plan</Button>
                            </Link> : <Button variant="outline" disabled> Make a study plan</Button>
                        }
                    </CardFooter>
                </Card>

            </div>
        </>
    )
}

export default ExampInput
