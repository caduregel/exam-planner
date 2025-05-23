import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTasks, getTasksForExam } from "@/util/api/Get/GetTasks"
import { ITask } from "@/interfaces/ITask"
import useSWR from "swr"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig } from "@/components/ui/chart"
import ChartSkeleton from "../skeletons/ChartSkeleton"

const chartConfig = {
    tasks: {
        label: "Tasks",
        color: "#2563eb",
    },
} satisfies ChartConfig

function TasksDistributionGraph({ exam_id }: { exam_id?: number }) {
    const fetcher = () => exam_id ? getTasksForExam(Number(exam_id)) : getTasks()
    const key = exam_id ? `exams${exam_id}/tasks` : "exams"
    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useSWR<ITask[]>(key, fetcher)

    // Compute chartData: count of tasks per day between first and last task date
    const chartData = (() => {
        if (!tasks || tasks.length === 0) return [];

        // Get all task dates as strings (YYYY-MM-DD)
        const dates = tasks
            .map(task => task.due_date)
            .filter(Boolean)
            .map(date => new Date(date))
            .sort((a, b) => a.getTime() - b.getTime());

        const start = dates[0];
        const end = dates[dates.length - 1];

        // Helper to format date as YYYY-MM-DD
        const formatDate = (date: Date) =>
            date.toISOString().slice(0, 10);

        // Count tasks per day
        const taskCountByDay: Record<string, number> = {};
        tasks.forEach(task => {
            const day = formatDate(new Date(task.due_date));
            taskCountByDay[day] = (taskCountByDay[day] || 0) + 1;
        });

        // Generate all days between start and end
        const days: { day: string; tasks: number }[] = [];
        for (
            let d = new Date(start);
            d <= end;
            d.setDate(d.getDate() + 1)
        ) {
            const dayStr = formatDate(d);
            days.push({
                day: dayStr,
                tasks: taskCountByDay[dayStr] || 0,
            });
        }

        return days;
    })();

    if (tasksError) console.log("error loading tasks", tasksError)

    if (tasksLoading) return <ChartSkeleton />

    return (
        <Card className="h-fit w-full">
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Task distribution</CardTitle>
                <CardDescription>
                    Ammount of tasks per day
                </CardDescription>
            </CardHeader>
            <CardContent>
                {tasksError && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">Error loading tasks</p>
                    </div>
                )}
                {chartData && chartData.length > 0 && (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(5, 10)} // Shows "MM-DD"
                            />
                            <YAxis
                                allowDecimals={false}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}

export default TasksDistributionGraph