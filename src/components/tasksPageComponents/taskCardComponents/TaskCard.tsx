import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SquareArrowOutUpRight, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ITask } from "@/interfaces/ITask"
import { updateTaskStatus } from "@/util/api/Put/PutTasks"
import { mutate } from "swr"
import { Link } from "react-router"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InlineTaskItemProps {
    task: ITask
    onDelete: (id: number) => void
    onUpdate: (newTask: ITask) => void
}

export function TaskCard({ task, onDelete }: InlineTaskItemProps) {
    const [status, setStatus] = useState(task.status)

    const debounceTimers = useRef<{ [key: number]: NodeJS.Timeout }>({})

    // Debounced status update
    const handleStatusChange = (checked: boolean) => {
        setStatus(checked)

        if (debounceTimers.current[task.id]) {
            clearTimeout(debounceTimers.current[task.id])
        }

        debounceTimers.current[task.id] = setTimeout(async () => {
            try {
                const updatedTask: ITask = await updateTaskStatus(task.id, checked)

                mutate(`exams/${updatedTask.exam_id}/tasks`, (tasks?: ITask[]) => {
                    if (!tasks) return []
                    return tasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
                }, false)
            } catch (error) {
                // Optionally handle error (e.g. rollback UI or show notification)
                console.error("Failed to update task status", error)
            }
        }, 500)
    }

    return (
        <Card className="w-full border border-muted p-2">
            <CardContent className="flex items-center space-x-3 py-1 px-2">
                <Checkbox
                    id={`task-${task.id}`}
                    checked={status}
                    onCheckedChange={(checked) => handleStatusChange(checked as boolean)}
                    className="flex-shrink-0 hover:cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                    <Label
                        htmlFor={`task-${task.id}`}
                        className="block truncate cursor-text select-text text-base hover:cursor-pointer"
                    >
                        {task.title}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Due: {format(new Date(task.due_date), "PPP")}
                    </p>
                </div>

                <div className="flex space-x-1 items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete task"
                        onClick={() => onDelete(task.id)}
                        className="hover:cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="flex items-center">
                                    <Link to={`/home/exams/${task.exam_id}`}>
                                        <SquareArrowOutUpRight className="w-4 h-4" />
                                    </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Go to exam page for this task</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    )
}