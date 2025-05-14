import { supabase } from "@/lib/supabaseClient";

// Add a new exam
export async function addExam(exam: { title: string; exam_date: string }) {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('exams')
        .insert([{ ...exam, user_id: user?.id }])
        .single();

    if (error) throw error;
    return data;
}