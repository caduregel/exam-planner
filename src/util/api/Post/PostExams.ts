import { IExamInputState } from "@/components/ExamInput";
import { supabase } from "@/lib/supabaseClient";
import { dateToDoMatcherFlat, getDates, SpreadType } from "@/util/dateToDoMatcher";

export const handleExamAdd = async (examToAdd: IExamInputState, taskSpread: SpreadType, userID: string) => {
    const { title, date, toDo } = examToAdd;

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

    console.log("Exam and tasks successfully inserted");
    return true;
}