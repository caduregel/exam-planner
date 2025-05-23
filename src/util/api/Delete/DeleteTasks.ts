import { supabase } from "@/lib/supabaseClient";
import { mutate } from "swr";

// Delete task
export async function deleteTask(taskId: number) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

    if (error) throw error;
    mutate(`exams/all/tasks`)
    return true
}