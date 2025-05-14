import { supabase } from "@/lib/supabaseClient";

// Add task to an exam
export async function addTask(task: { title: string; exam_id: string; due_date: string }) {
    const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .single();

    if (error) throw error;
    return data;
}
