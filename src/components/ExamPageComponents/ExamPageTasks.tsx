import TasksSkeleton from "@/components/skeletons/TasksSkeleton"
import { TaskCard } from "@/components/tasksPageComponents/TaskCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { addTask } from "@/util/api/Post/PostTasks"
import { getTasksForExam } from "@/util/api/Get/GetTasks"
import { ITask } from "@/interfaces/ITask"
import { deleteTask } from "@/util/api/Delete/DeleteTasks"
import useSWR, { mutate } from "swr"

function ExamPageTasks({exam_id}: { exam_id: number }) {
    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useSWR<ITask[]>(`exams/${exam_id}/tasks`, () => getTasksForExam(Number(exam_id)))


    const handleDelete = async (taskId: number) => {
        const tasksKey = `exams/${exam_id}/tasks`
        const deletedTask = tasks?.find((task) => task.id === taskId)
        const success = await deleteTask(taskId)
        mutate(tasksKey, (prevTasks: ITask[] | undefined) => {
            if (!prevTasks) return []
            return prevTasks.filter((task) => task.id !== taskId)
        })
        if (success) toast.success("Task deleted successfully", {
            duration: 3000,
            action: deletedTask
                ? {
                    label: "Undo",
                    onClick: () => {
                        const oldTask = { title: deletedTask.title, exam_id: deletedTask.exam_id, due_date: deletedTask.due_date }
                        addTask(oldTask)
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
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                    {tasksLoading || !tasks
                        ? "Loading tasks..."
                        : tasks?.length > 0
                            ? `${tasks.length} task${tasks.length > 1 ? "s" : ""}`
                            : "No tasks found"}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {tasksLoading && <TasksSkeleton count={5} />}
                {tasksError && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">Error loading tasks</p>
                    </div>
                )}

                {tasks && tasks.length > 0 && !tasksError && tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} onDelete={handleDelete} examNav={false} />
                })}
            </CardContent>
        </Card>
    )
}

export default ExamPageTasks