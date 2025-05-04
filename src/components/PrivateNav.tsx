import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link } from "react-router";
import { CalendarRange, LayoutDashboard, ListCheck, NotebookPen } from "lucide-react";

function PrivateNav() {

    return (
        <>
            <Sidebar>
                <SidebarHeader className="flex flex-row items-center gap-2 p-5">
                    <Link to="/home/" className="flex items-center gap-5">
                        <img src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png" className="size-10 rounded-lg" />
                        <h1 className="text-xl font-semibold">Exam Planner</h1>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/">
                                    <LayoutDashboard />
                                    <p className="text-lg">
                                        Dasboard
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/calendar">
                                    <CalendarRange />
                                    <p className="text-lg">
                                        Calendar
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/exams">
                                    <NotebookPen />
                                    <p className="text-lg">
                                        Exams
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
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
                </SidebarContent >
                <SidebarFooter />
            </Sidebar >
        </>
    )
}

export default PrivateNav