import { useAuth } from "@/components/providers/AuthProvider";
import { IProfile } from "@/interfaces/IProfile";
import { getUserProfile } from "@/util/api/Get/GetUserProfiles";
import { useEffect, useState } from "react";

function useProfile() {
    const { session } = useAuth()
    const [profile, setProfile] = useState<IProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!session) return;

        async function fetchProfile() {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile()
    }, [session])

    return { profile, loading, setProfile }  // ⬅ expose setProfile
}
export default useProfile