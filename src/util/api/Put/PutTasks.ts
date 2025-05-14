import { supabase } from "@/lib/supabaseClient"

export async function updateTaskStatus(taskId: number, status: boolean) {
    const { data, error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", taskId)
    if (error) throw error
    return data
}