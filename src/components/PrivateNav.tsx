import { getUserProfile } from "@/util/api";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router";
import { LayoutDashboard, ListCheck, NotebookPen } from "lucide-react";
import { IProfile } from "@/interfaces/IProfile";

function PrivateNav() {
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

    if (!profile) {
        return (
            < Sidebar >
                <p>No profile found</p>
            </Sidebar >
        )
    }

    return (
        <>
            <Sidebar>
                {loading ? <p>Loading...</p> :
                    <SidebarHeader className="flex flex-row items-center gap-2 p-5">
                        <img src={profile.avatar_url} className="size-10 rounded-lg" />
                        <h1 className="text-xl font-semibold">{profile.username}</h1>
                    </SidebarHeader>
                }
                <SidebarContent>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/dashboard">
                                    <LayoutDashboard />
                                    <p className="text-lg">
                                        Dasboard
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton asChild>
                                <Link to="/home/exams">
                                    <NotebookPen />
                                    <p className="text-lg">
                                        Exams
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton asChild>
                                <Link to="/home/tasks">
                                    <ListCheck />
                                    <p className="text-lg">
                                        Tasks
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </>
    )
}

export default PrivateNav