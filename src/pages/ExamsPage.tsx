import { IExamInfo } from "@/interfaces/IExamInfo"
import ExampInput from "../components/ExamInput"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabaseClient"
import { dateToDoMatcherFlat, getDates, SpreadType } from "@/util/dateToDoMatcher"
import { useAuth } from "@/components/providers/AuthProvider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

function ExamsPage() {
    const [newExamInfo, setNewExamInfo] = useState<IExamInfo>({
        title: "",
        date: new Date,
        toDo: [""],
    })

    const [taskSpread, setTaskSpread] = useState<SpreadType>("even")

    const [examAddSuccess, setExamUpdateSuccess] = useState<boolean>(false)

    useEffect(() => {
        if (examAddSuccess) {
            const timer = setTimeout(() => {
                setExamUpdateSuccess(false);
            }, 3000); // Hide alert after 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount or state change
        }
    }, [examAddSuccess]);


    const { session } = useAuth()

    const userID = session?.user.id

    const handleExamAdd = async () => {
        const { title, date, toDo } = newExamInfo;

        // Insert exam
        const { data: examData, error: examError } = await supabase
            .from('exams')
            .insert({ title, exam_date: date, user_id: userID })
            .select()
            .single();

        if (examError) {
            console.error("Failed to insert exam:", examError);
            return;
        }

        const examId = examData.id;

        // Generate date range (today to day before exam)
        const today = new Date();
        const dayBeforeExam = new Date(date);
        dayBeforeExam.setDate(dayBeforeExam.getDate() - 1);

        const dateRange = getDates(today, dayBeforeExam);
        const tasks = dateToDoMatcherFlat(dateRange, toDo, taskSpread);

        // Prepare tasks array for Supabase
        const tasksPayload = tasks.map(task => ({
            exam_id: examId,
            title: task.title,
            due_date: task.due_date.toISOString().split('T')[0], // format as 'YYYY-MM-DD'
            status: false,
        }));

        // Insert tasks in bulk
        const { error: tasksError } = await supabase
            .from('tasks')
            .insert(tasksPayload);

        if (tasksError) {
            console.error("Failed to insert tasks:", tasksError);
            return;
        }

        console.log("Exam and tasks successfully inserted");
        setExamUpdateSuccess(true);
    }

    return (
        <>
            <div className="p-5 w-full">
                <div className="flex gap-5 md:flex-row flex-col md:justify-between">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Upcoming exams</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>some content</p>
                        </CardContent>
                    </Card>
                    <ExampInput examInfo={newExamInfo} setExamInfo={setNewExamInfo} handleExamAdd={handleExamAdd} setTaskSpread={setTaskSpread} taskSpread={taskSpread} />
                    {examAddSuccess && (
                    <Alert className="fixed bottom-5 max-w-fit right-4 bg-green-500 dark:bg-green-700 border-green-500 text-green-100 dark:text-green-400 transition-opacity opacity-100 duration-300 ease-in-out">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-300" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription className="text-green">
                            Exam Successfully added
                        </AlertDescription>
                    </Alert>
                )}
                </div>
            </div>
        </>
    )
}

export default ExamsPage
