import { supabase } from "@/lib/supabaseClient";

// Delete task
export async function deleteTask(taskId: number) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

    if (error) throw error;
    return true
}