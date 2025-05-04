import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { IProfile } from "@/interfaces/IProfile"
import { getUserProfile } from "@/util/api"
import { useAuth } from "./providers/AuthProvider"

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

    if (loading) return <p>Loading..</p>

    if (!profile) {
        return (
            <p>No profile found</p>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="py-5 hover:cursor-pointer">
                    <img src={profile.avatar_url} alt="avatar" className="size-8 rounded-lg" />
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

                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
