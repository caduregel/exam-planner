import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ITask } from "@/interfaces/ITask"
import { getTasks } from "@/util/api/Get/GetTasks"
import { useEffect, useRef, useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { updateTaskStatus } from "@/util/api/Put/PutTasks"
import { mutate } from "swr"
import TaskSkeleton from "../skeletons/TaskSkeleton"

function TodaysTasks() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const debounceTimers = useRef<{ [key: number]: NodeJS.Timeout }>({})

    const handleStatusChange = (taskId: number, checked: boolean) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status: checked } : task
            )
        )
        // Debounce API call
        if (debounceTimers.current[taskId]) {
            clearTimeout(debounceTimers.current[taskId])
        }
        debounceTimers.current[taskId] = setTimeout(async () => {
            const updatedTask: ITask = await updateTaskStatus(taskId, checked)
            console.log("Updated task:", updatedTask)

            // Optimistically update the SWR cache for the exam's tasks
            mutate(`exams/${updatedTask.exam_id}/tasks`, (tasks?: ITask[]) => {
                if (!tasks) return [] // fallback, shouldn't happen
                return tasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            }, false)
        }, 500)
    }

    useEffect(() => {
        getTasks()
            .then((data: ITask[]) => {
                // filter data to only include tasks for today
                const today = new Date().toISOString().split('T')[0]
                const todaysTasks = data.filter((task) => {
                    const taskDate = new Date(task.due_date).toISOString().split('T')[0]
                    return taskDate === today
                })
                setTasks(todaysTasks)

                setLoading(false)
                setError(false)
            }
            )
            .catch((error) => {
                console.error("Error fetching tasks:", error)
                setError(true)
            }
            )
    }, [])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="">
                    Todays Tasks
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex flex-col space-y-2">
                        <TaskSkeleton />
                        <TaskSkeleton />
                        <TaskSkeleton />
                    </div>
                ) : error ? (
                    <p>Error fetching tasks</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks for today</p>
                ) : (
                    <div className="flex flex-col space-y-2">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex items-center space-x-2">
                                <Checkbox className="hover:cursor-pointer"
                                    checked={task.status}
                                    onCheckedChange={(checked: boolean) =>
                                        handleStatusChange(task.id, checked)
                                    } />
                                <Label>
                                    {task.title}
                                </Label>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
export default TodaysTasks;