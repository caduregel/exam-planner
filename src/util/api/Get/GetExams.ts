import { supabase } from "@/lib/supabaseClient";

// Fetch exams for current user
export async function getExams() {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', user?.id);

    if (error) throw error;
    return data;
}


// Fetch exam by id
export async function getExamById(id: number) {
    const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}