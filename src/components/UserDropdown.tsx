import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Link } from "react-router"
import { UserDropdownSkeleton } from "./skeletons/UserDropdownSkeleton"
import useSWR from "swr"
import { getUserProfile } from "@/util/api/Get/GetUserProfiles"

async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) return error
}

export function UserDropdown() {
    const { data: profile, isLoading } = useSWR("profile", () => getUserProfile())

    const handleLogout = () => {
        signOut()
    }

    if (isLoading) return <UserDropdownSkeleton />

    if (!profile) {
        return (
            <p>No profile found</p>
        )
    }

    // return <UserDropdownSkeleton />

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="py-5 hover:cursor-pointer md:px-5">
                    {profile.avatar_url
                        ? <img src={profile.avatar_url} alt="avatar" className="size-8 rounded-lg" />
                        : <User />
                    }
                    <p>{profile.username}</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <Link to="/home/profile" className="w-full">
                            Profile
                        </Link>
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
