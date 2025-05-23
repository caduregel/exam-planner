import { supabase } from "@/lib/supabaseClient"
import { mutate } from "swr";

export async function updateTaskStatus(taskId: number, status: boolean) {
    const { data, error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", taskId)
        .select()
        .single()
    if (error) throw error
    mutate(`exams/${data.exam_uid}`);
    mutate(`exams/all/tasks`);
    return data
}