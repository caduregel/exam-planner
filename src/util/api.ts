import { supabase } from '../lib/supabaseClient';

// Fetch current user profile
export async function getUserProfile() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

    if (error) throw error;
    return data;
}

// Update user profile
export async function updateUserProfile(updates: { full_name?: string; avatar_url?: string }) {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)
        .single();

    if (error) throw error;
    return data;
}

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

// Add a new exam
export async function addExam(exam: { name: string; date: string }) {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('exams')
        .insert([{ ...exam, user_id: user?.id }])
        .single();

    if (error) throw error;
    return data;
}

// Fetch tasks for a specific exam
export async function getTasksForExam(examId: string) {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('exam_id', examId);

    if (error) throw error;
    return data;
}

// Add task to an exam
export async function addTask(task: { title: string; exam_id: string; due_date: string }) {
    const { data, error } = await supabase
        .from('tasks')
        .insert([task])
        .single();

    if (error) throw error;
    return data;
}

// Delete task
export async function deleteTask(taskId: string) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

    if (error) throw error;
}