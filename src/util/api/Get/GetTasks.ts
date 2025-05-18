import { supabase } from "@/lib/supabaseClient";

// Fetch tasks for current user
export async function getTasks() {
    const { data: { user } } = await supabase.auth.getUser();

    // get exams that belong to user
    const { data: exams, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', user?.id);
    if (examError) throw examError;

    // get tasks that belong to exams
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .in('exam_id', exams.map((exam) => exam.id));
    if (error) throw error;
    return data;
}

// Fetch tasks for a specific exam
export async function getTasksForExam(examId: number) {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('exam_id', examId);

    if (error) throw error;
    return data;
}