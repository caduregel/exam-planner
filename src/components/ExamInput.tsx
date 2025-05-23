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
import { validateDate } from "@/util/dateHandlings"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SpreadType } from "@/util/dateToDoMatcher"
import { useAuth } from "./providers/AuthProvider"
import { handleExamAdd } from "@/util/api/Post/PostExams"
import { toast } from "sonner"

interface IExamInputProps {
    setExamUpdateSuccess: (value: boolean) => void;
}

export interface IExamInputState {
    title: string;
    date: Date;
    toDo: string[];
    color: string;
}

export const spreadOptions = [
    { value: "even", label: "Even Spread" },
    { value: "start", label: "Start Spread" },
    { value: "end", label: "End Spread" },
    { value: "middle", label: "Middle Spread" },
]

function ExampInput({ setExamUpdateSuccess }: IExamInputProps) {
    const [subject, setSubject] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date)
    const [toDos, setToDos] = useState<string[]>([""])
    const [taskSpread, setTaskSpread] = useState<SpreadType>("even")
    const [color, setColor] = useState<string>("")


    const [newExamInfo, setNewExamInfo] = useState<IExamInputState>({
        title: subject,
        date: date,
        toDo: toDos,
        color: color
    })


    const [filledStatus, setFilledStatus] = useState<boolean>(false)

    useEffect(() => {
        const updatedExamInfo = {
            title: subject,
            date: date,
            toDo: toDos,
            color: color
        }
        setNewExamInfo(updatedExamInfo)
        if (subject !== "" && validateDate(date) && toDos.length !== 0) {
            setFilledStatus(true)
        } else setFilledStatus(false)
    }, [
        subject, date, toDos, color
    ])

    const { session } = useAuth()

    const userID = session?.user.id
    const handleSubmission = () => {
        if (!userID) return;
        
        console.log(newExamInfo)
        handleExamAdd(newExamInfo, taskSpread, userID)
            .then(() => {
                setExamUpdateSuccess(true);
                toast("Exam successfully added", {
                    description: "sdafkmdasf"
                })
                setSubject("");
                setDate(new Date());
                setToDos([""]);
            })
            .catch((error) => {
                console.error("Error adding exam:", error);
            });
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
                    <Input placeholder="E.g Chemistry final " value={subject} onChange={(e) => { setSubject(e.target.value) }} />

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
                            <SelectTrigger className="w-[180px] hover:cursor-pointer">
                                <SelectValue placeholder="Select spread" />
                            </SelectTrigger>
                            <SelectContent>
                                {spreadOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value} className="hover:cursor-pointer">
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Show description below select */}
                    <p className="text-sm text-muted-foreground">
                        {taskSpread === "even" && "Tasks spread evenly between now and the exam."}
                        {taskSpread === "start" && "More tasks now, less as the exam approaches."}
                        {taskSpread === "end" && "Not a lot of tasks now, more intense as the exam approaches"}
                        {taskSpread === "middle" && "start off easy, work hard for a short while, and ease off before the exam"}

                    </p>

                    {/* Pick a color for this exam */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Label className="mb-1">Exam Color</Label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { name: "Red", color: "#ef4444" },
                                { name: "Orange", color: "#f59e42" },
                                { name: "Yellow", color: "#eab308" },
                                { name: "Green", color: "#22c55e" },
                                { name: "Blue", color: "#3b82f6" },
                                { name: "Purple", color: "#a855f7" },
                                { name: "Pink", color: "#ec4899" },
                            ].map((preset) => (
                                <button
                                    key={preset.color}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center transition hover:cursor-pointer
                                        ${color === preset.color ? "ring-2 ring-offset-2 ring-primary" : ""}
                                    `}
                                    style={{ backgroundColor: preset.color }}
                                    aria-label={preset.name}
                                    onClick={() =>
                                        setColor(preset.color)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {filledStatus ?
                        <Button variant="outline" className="hover:cursor-pointer" onClick={handleSubmission}> Make a study plan</Button>
                        : <Button variant="outline" disabled>Generate a study plan</Button>
                    }
                </CardFooter>
            </Card>
        </>
    )
}

export default ExampInput
