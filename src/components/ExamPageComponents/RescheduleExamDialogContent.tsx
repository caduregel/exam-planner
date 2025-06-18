import { IExamInfo } from "@/interfaces/IExamInfo"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { SpreadType } from "@/util/dateToDoMatcher"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { spreadOptions } from "../ExamInput"
import { Button } from "../ui/button"
import useSWR from "swr"
import { getTasksForExam } from "@/util/api/Get/GetTasks"
import { ITask } from "@/interfaces/ITask"
import { handleExamReschedule } from "@/util/api/Put/PutExam"
import { toast } from "sonner"


type rescheduleWhichTasks = "all" | "uncompleted" | "expired"

function RescheduleExamDialogContent({ exam }: { exam: IExamInfo }) {
  const { data: examTasks } = useSWR<ITask[]>(`exams/${exam.id}/tasks`, () => getTasksForExam(Number(exam.id)))

  const [date, setDate] = useState<Date | undefined>(new Date(exam.exam_date))
  const [rescheduleType, setRescheduleType] = useState<rescheduleWhichTasks>("all")
  const [taskSpread, setTaskSpread] = useState<SpreadType>("even")

  const [loading, setLoading] = useState(false)

  const spreadOptions = [
    { value: "even", label: "Even Spread" },
    { value: "start", label: "Start Spread" },
    { value: "end", label: "End Spread" },
    { value: "middle", label: "Middle Spread" },
  ]

  const handleSubmit = () => {
    setLoading(true)
    // Sort tasks by created_at before filtering and mapping
    const sortedTasks = examTasks?.slice().sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

    // Find the tasks to reschedule
    const tasksToReschedule: number[] | undefined = sortedTasks?.filter((task) => {
      if (rescheduleType === "all") return true
      if (rescheduleType === "uncompleted") return !task.status
      if (rescheduleType === "expired") return new Date(task.due_date) < new Date()
      return false
    })
    .map((task) => task.id)

    // Create to dos
    const toDo: string[] | undefined = sortedTasks?.filter((task) => {
      if (rescheduleType === "all") return true
      if (rescheduleType === "uncompleted") return !task.status
      if (rescheduleType === "expired") return new Date(task.due_date) < new Date()
      return false
    })
    .map((task) => task.title)

    if (!tasksToReschedule || tasksToReschedule.length === 0 || !toDo || toDo.length === 0) {
      console.error("No tasks to reschedule")
      return
    }

    handleExamReschedule(
      Number(exam?.id),
      tasksToReschedule,
      toDo,
      taskSpread,
      date
    ).then((data: boolean) => {
      if (data) setLoading(false)
      toast.success("Exam rescheduled successfully!")
    })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Reschedule Exam</DialogTitle>
        <DialogDescription>Automatically replan tasks</DialogDescription>
      </DialogHeader>
      <Separator className="my-2" />

      <div className="py-2 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label className="my-2">Reschedule only</Label>
          <RadioGroup defaultValue="all" value={rescheduleType} onValueChange={(value: string) => { setRescheduleType(value as rescheduleWhichTasks) }} className="grid w-full max-w-sm items-center gap-4">
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="uncompleted" className="hover:cursor-pointer" id="uncompleted" />
              <Label htmlFor="uncompleted" className="hover:cursor-pointer">Uncompleted tasks</Label>
            </div>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem value="expired" className="hover:cursor-pointer" id="expired" />
              <Label htmlFor="expired" className="hover:cursor-pointer">Past due tasks</Label>
            </div>
            <div className="flex items-center space-x-2 hover:cursor-pointer">
              <RadioGroupItem value="all" className="hover:cursor-pointer" id="all" />
              <Label htmlFor="all" className="hover:cursor-pointer">All tasks</Label>
            </div>
          </RadioGroup>
        </div>


        <div className="flex flex-col items-center gap-2">
          <Label className="m-1">New Exam Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
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
        {/* <p className="text-sm text-muted-foreground">
          {taskSpread === "even" && "Tasks spread evenly between now and the exam."}
          {taskSpread === "start" && "More tasks now, less as the exam approaches."}
          {taskSpread === "end" && "Not a lot of tasks now, more intense as the exam approaches"}
          {taskSpread === "middle" && "start off easy, work hard for a short while, and ease off before the exam"}
        </p> */}
      </div>

      <DialogFooter>
        <Button className="hover:cursor-pointer" variant="secondary" onClick={() => { }}>Cancel</Button>
        <Button className="hover:cursor-pointer" variant="default" onClick={handleSubmit} {...loading ? { disabled: true } : {}} >
          Reschedule
        </Button>
      </DialogFooter>
    </>
  )
}

export default RescheduleExamDialogContent