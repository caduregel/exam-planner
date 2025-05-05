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
import useProfile from "@/hooks/use-profile"

async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) return error
}

export function UserDropdown() {
    const { profile, loading } = useProfile()

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
