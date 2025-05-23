import { IExamInputState } from "@/components/ExamInput";
import { supabase } from "@/lib/supabaseClient";
import { dateToDoMatcherFlat, getDates, SpreadType } from "@/util/dateToDoMatcher";
import { mutate } from "swr";

export const handleExamAdd = async (examToAdd: IExamInputState, taskSpread: SpreadType, userID: string) => {
    const { title, date, toDo, color } = examToAdd;
    console.log(date)
    // Insert exam
    // Ensure exam_date is stored as UTC 'YYYY-MM-DD'
    // Adjust for timezone offset to get the correct local date in UTC

    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];

    console.log(examToAdd)

    const { data: examData, error: examError } = await supabase
        .from('exams')
        .insert({ title, exam_date: formattedDate, user_id: userID, exam_color: color })
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
    const tasksPayload = tasks.map((task) => ({
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
        throw tasksError;
    }

    mutate("dashboard/exams");
    mutate("examsPage/exams");
    mutate(`exams/all/tasks`)
    return true;
}