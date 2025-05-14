import { supabase } from "@/lib/supabaseClient";

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