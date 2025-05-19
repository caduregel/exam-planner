import { IExamInfo } from "@/interfaces/IExamInfo";
import { supabase } from "@/lib/supabaseClient";
import { dateToDoMatcherFlat, getDates, SpreadType } from "@/util/dateToDoMatcher";
import { mutate } from "swr";

/**
 * Reschedule an exam and its associated tasks.
 * @param examId - The exam's ID to update.
 * @param taskIds - Array of task IDs to update.
 * @param toDo - Array of to-do strings for the exam.
 * @param taskSpread - SpreadType for distributing tasks.
 * @param newExamDate - (Optional) New exam date as a string (YYYY-MM-DD).
 * @returns true if successful, throws error otherwise.
 */
export const handleExamReschedule = async (
    examId: number,
    taskIds: number[],
    toDo: string[],
    taskSpread: SpreadType,
    newExamDate?: Date
) => {
    // 1. Optionally update the exam date
    if (newExamDate) {
        // Adjust for timezone offset to ensure correct date is stored
        const localDate = new Date(newExamDate.getTime() - newExamDate.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split('T')[0];

        const { error: examError } = await supabase
            .from('exams')
            .update({ exam_date: formattedDate })
            .eq('id', examId);

        if (examError) {
            console.error("Failed to update exam date:", examError);
            throw examError;
        }
    }

    // 2. Fetch the (possibly updated) exam date
    const { data: examData, error: fetchExamError } = await supabase
        .from('exams')
        .select('exam_date')
        .eq('id', examId)
        .single();

    if (fetchExamError || !examData) {
        console.error("Failed to fetch exam date:", fetchExamError);
        throw fetchExamError;
    }

    const examDate = examData.exam_date;

    // 3. Generate new due dates for tasks (today to day before exam)
    const today = new Date();
    const dayBeforeExam = new Date(examDate);
    dayBeforeExam.setDate(dayBeforeExam.getDate() - 1);

    const dateRange = getDates(today, dayBeforeExam);
    const tasks = dateToDoMatcherFlat(dateRange, toDo, taskSpread);

    // 4. Update each task with new title and due_date
    for (let i = 0; i < taskIds.length && i < tasks.length; i++) {
        const { title, due_date } = tasks[i];
        const { error: taskError } = await supabase
            .from('tasks')
            .update({
                title,
                due_date: due_date.toISOString().split('T')[0],
            })
            .eq('id', taskIds[i]);

        if (taskError) {
            console.error(`Failed to update task ${taskIds[i]}:`, taskError);
            throw taskError;
        }
    }

    console.log("Exam and tasks successfully rescheduled");
    mutate(`exams/${examId}/tasks`); // Revalidate the SWR cache for tasks
    mutate(`exams/${examId}`); // Revalidate the SWR cache for the exam
    mutate(`exams`); // Revalidate the SWR cache for all exams
    return true;
};

export const handleExamUpdate = async (
    examId: number,
    examToAdd: IExamInfo,
) => {
    const { title, exam_color } = examToAdd;

    // Update exam
    const { error: examError } = await supabase
        .from('exams')
        .update({ title, exam_color: exam_color })
        .eq('id', examId);

    if (examError) {
        console.error("Failed to update exam:", examError);
        throw examError;
    }

    console.log("Exam successfully updated");
    mutate(`exams/${examId}`);
    mutate(`exams/${examId}/color`) // Revalidate the SWR cache for the exam
    mutate(`exams`);
    return true;
}