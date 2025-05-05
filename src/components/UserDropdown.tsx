import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { IProfile } from "@/interfaces/IProfile"
import { getUserProfile } from "@/util/api"
import { useAuth } from "./providers/AuthProvider"
import { User } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) return error
}

export function UserDropdown() {
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

    const handleLogout = () => {
        signOut()
    }

    if (loading) return <p>Loading..</p>

    if (!profile) {
        return (
            <p>No profile found</p>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="py-5 hover:cursor-pointer md:px-5">
                    {profile.avatar_url == ""
                        ? <User />
                        : <img src={profile.avatar_url} alt="avatar" className="size-8 rounded-lg" />
                    }
                    <p>{profile.username}</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer">
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
