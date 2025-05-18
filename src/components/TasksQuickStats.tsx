import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTasks, getTasksForExam } from "@/util/api/Get/GetTasks";
import { ITask } from "@/interfaces/ITask";
import useSWR from "swr";
import { CheckCircle2, Clock, ListChecks, ScrollText } from "lucide-react";

interface TasksQuickStatsProps {
    exam_id?: number;
}

function TasksQuickStats({ exam_id }: TasksQuickStatsProps) {
    const fetcher = () => exam_id ? getTasksForExam(Number(exam_id)) : getTasks()

    const { data: tasks, error: tasksError, isLoading: tasksLoading } = useSWR<ITask[]>(`exams/${exam_id}/tasks`, fetcher);

    // Calculate stats
    const totalTasks: number = tasks?.length || 0;
    const completedTasks: number = tasks?.filter((task: ITask) => task.status).length || 0;
    const remainingTasks: number = totalTasks - completedTasks;

    // Calculate completion percentage
    const completionPercentage: number = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    // Calculate past due tasks
    const pastDueTasks: number = tasks?.filter((task: ITask) => {
        const dueDate = new Date(task.due_date);
        const currentDate = new Date();
        return dueDate < currentDate && task.status === false;
    }).length || 0;

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Quick stats</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {tasksLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-sm text-gray-500">Loading stats...</p>
                    </div>
                ) : tasksError ? (
                    <div className="flex items-center justify-center h-32">
                        <p className="text-sm text-red-500">Error loading tasks</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {/* Total Tasks */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900">
                                <ListChecks className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Total Tasks</p>
                                <p className="text-xl font-bold">{totalTasks}</p>
                            </div>
                        </div>

                        {/* Completed Tasks */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-green-600 dark:text-green-400">Completed</p>
                                <p className="text-xl font-bold">{completedTasks}</p>
                            </div>
                        </div>

                        {/* Remaining Tasks */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900">
                                <ScrollText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Remaining</p>
                                <p className="text-xl font-bold">{remainingTasks}</p>
                            </div>
                        </div>

                        {/* Past due tasks */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900">
                                <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-red-600 dark:text-red-400">Past due</p>
                                <p className="text-xl font-bold">{pastDueTasks}</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="col-span-2 mt-2">
                            <div className="flex justify-between mb-1">
                                <p className="text-xs font-medium">Overall Progress</p>
                                <p className="text-xs font-medium">{completionPercentage}%</p>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    className="h-2 bg-blue-600 rounded-full dark:bg-blue-500"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default TasksQuickStats;