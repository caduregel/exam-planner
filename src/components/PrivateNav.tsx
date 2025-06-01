import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { Link } from "react-router";
import { CalendarRange, LayoutDashboard, ListCheck, NotebookPen } from "lucide-react";
import Logo from "./Logo";

function PrivateNav() {
    const { setOpenMobile, isMobile } = useSidebar();

    const handleNavigation = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <>
            <Sidebar className="duration-700 transition-all bg-white dark:bg-neutral-950">
                <SidebarHeader className="flex flex-row items-center gap-2 p-5">
                    <Link to="/home/" className="flex items-center gap-5">
                        <Logo />
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden list-none">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/" onClick={handleNavigation}>
                                    <LayoutDashboard />
                                    <p className="text-lg">
                                        Dashboard
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/calendar" onClick={handleNavigation}>
                                    <CalendarRange />
                                    <p className="text-lg">
                                        Calendar
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/exams" onClick={handleNavigation}>
                                    <NotebookPen />
                                    <p className="text-lg">
                                        Exams
                                    </p>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/home/tasks" onClick={handleNavigation}>
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