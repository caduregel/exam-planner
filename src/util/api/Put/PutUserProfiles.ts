import { supabase } from "@/lib/supabaseClient";

// Update user profile
export async function updateUserProfile(updates: { username?: string; avatar_url?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)
        .single();

    if (error) throw error;
    return data;
}

export async function addProfilePicture(image: File, userId: string) {
    const { error } = await supabase.storage
        .from('avatars')
        .upload(`${userId}/avatar`, image, {
            cacheControl: '3600',
            upsert: true,
        });
    if (error) throw error
}