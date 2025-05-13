import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ITask } from "@/interfaces/ITask"
import { getTasks } from "@/util/api"
import { useEffect, useState } from "react"

function TodaysTasks() {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

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
                console.log("Tasks fetched successfully:", data)
            }
            )
            .catch((error) => {
                console.error("Error fetching tasks:", error)
                setError(true)
            }
            )
    }, [])

    return (
        <Card className="w-full md:w-1/2">
            <CardHeader>
                <CardTitle className="">
                    Todays Tasks
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error fetching tasks</p>
                ) : tasks.length === 0 ? (
                    <p>No tasks for today</p>
                ) : (
                    <ul className="list-disc pl-5">
                        {tasks.map((task) => (
                            <li key={task.id} className="py-1">
                                {task.title}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
export default TodaysTasks;