import { supabase } from "@/lib/supabaseClient";

export async function deleteExam(examId: number) {
    const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', examId);
    if (error) throw error;
    return true 
}