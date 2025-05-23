import { supabase } from "@/lib/supabaseClient";
import { mutate } from "swr";

export async function deleteExam(examId: number) {
    const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', examId);
    if (error) throw error;
    mutate("dashboard/exams");
    mutate("examsPage/exams");
    mutate(`exams/all/tasks`)
    return true
}