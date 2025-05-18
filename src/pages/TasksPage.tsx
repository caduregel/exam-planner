import ExamFilterDropdown from "@/components/ExamFilterDropdown"
import TasksSkeleton from "@/components/skeletons/TasksSkeleton"
import { TaskCard } from "@/components/tasksPageComponents/TaskCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ITask } from "@/interfaces/ITask"
import { deleteTask } from "@/util/api/Delete/DeleteTasks"
import { getTasks, getTasksForExam } from "@/util/api/Get/GetTasks"
import { addTask } from "@/util/api/Post/PostTasks"
import { Label } from "@radix-ui/react-dropdown-menu"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import useSWR, { mutate } from "swr"

function TasksPage() {
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
        <>
            <div className="flex flex-col p-2 md:grid md:grid-cols-3 gap-5 flex-grow">
                <Card className="col-start-1 col-end-3">
                    <CardHeader>
                        <CardTitle>To do</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {isLoading && <TasksSkeleton count={5} />}
                        {tasks && tasks.length > 0 && tasks.map((task) => {
                            return <TaskCard key={task.id} task={task} onDelete={handleDelete} onUpdate={() => { console.log("snlfaf") }} />
                        })}
                    </CardContent>
                </Card>


                <Card className="col-start-3">
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
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
                        <div className="flex flex-col gap-1">
                            <Label className="text-muted-foreground">Filter by exam</Label>
                            <ExamFilterDropdown currentExam={currentExamId} setCurrentExam={setCurrentExam} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-muted-foreground">Sort by due date</Label>
                            <Button onClick={handleSetSorting} variant="outline" className="hover:cursor-pointer w-full" >{ascending ? <><ArrowUp />  Ascending</> : <><ArrowDown /> Descending </>}</Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </>
    )
}
export default TasksPage