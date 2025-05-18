import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { Input } from "../ui/input"
import ExamFilterDropdown from "../ExamFilterDropdown"
import { ITask } from "@/interfaces/ITask"
import useSWR, { mutate } from "swr"
import { getTasks, getTasksForExam } from "@/util/api/Get/GetTasks"
import { TaskCard } from "./taskCardComponents/TaskCard"
import { deleteTask } from "@/util/api/Delete/DeleteTasks"
import { toast } from "sonner"
import { addTask } from "@/util/api/Post/PostTasks"
import TasksSkeleton from "../skeletons/TasksSkeleton"

function AllTasks() {
    const [ascending, setAscending] = useState<boolean>(true)
    const [search, setSearch] = useState("")
    const [currentExamId, setCurrentExam] = useState("")

    const tasksKey = `exams/${currentExamId.length > 0 ? currentExamId : "all"}/tasks`
    const fetcher = () => currentExamId === "" ? getTasks() : getTasksForExam(Number(currentExamId))

    const { data: tasksRaw, isLoading } = useSWR<ITask[]>(tasksKey, fetcher)
    // Sort tasks by due_date based on ascending state
    const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase()

    const tasks = tasksRaw
        ? tasksRaw
            .filter(task =>
                search.trim() === ""
                    ? true
                    : normalize(task.title).includes(normalize(search))
            )
            .sort((a, b) =>
                ascending
                    ? new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
                    : new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
            )
        : []

    const handleSetSorting = () => {
        setAscending(!ascending)
    }

    const handleSearch = () => {
        // Handle search logic here
        console.log("Searching for:", search)
    }

    const handleDelete = async (taskId: number) => {
        // Find the task to be deleted so we can restore it on undo
        const deletedTask = tasks?.find((task) => task.id === taskId)
        const success = await deleteTask(taskId)
        mutate(tasksKey, (prevTasks: ITask[] | undefined) => {
            if (!prevTasks) return []
            return prevTasks.filter((task) => task.id !== taskId)
        }
        )
        if (success) toast("Task deleted successfully", {
            description: "The task has been deleted successfully.",
            duration: 3000,
            action: deletedTask
                ? {
                    label: "Undo",
                    onClick: () => {
                        // Restore the full deleted task object
                        const oldTask = { title: deletedTask.title, exam_id: deletedTask.exam_id, due_date: deletedTask.due_date }
                        addTask(oldTask)
                        // Update the tasks list with the deleted task
                        mutate(tasksKey, (prevTasks: ITask[] | undefined) => {
                            if (!prevTasks) return []
                            return [...prevTasks, deletedTask]
                        })
                    },
                }
                : undefined,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>To do</CardTitle>
                <CardDescription>All upcoming tasks that are not complete</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"></Search>
                    <Input
                        type="text"
                        placeholder="Search tasks"
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                // Handle search
                                handleSearch
                            }
                        }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleSetSorting} variant="secondary" className="hover:cursor-pointer w-1/2" >{ascending ? <><ArrowUp />  Ascending</> : <><ArrowDown /> Descending </>}</Button>
                    <ExamFilterDropdown currentExam={currentExamId} setCurrentExam={setCurrentExam} />
                </div>
                <Separator className="w-full" />
                {isLoading && <TasksSkeleton count={5} />}
                {tasks && tasks.length > 0 && tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} onDelete={handleDelete} onUpdate={() => { console.log("snlfaf") }} />
                })}
            </CardContent>
        </Card>

    )
}

export default AllTasks