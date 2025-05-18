import AllTasks from "@/components/tasksPageComponents/AllTasks"
import ExpiredTasks from "@/components/tasksPageComponents/ExpiredTasks"
import UpcomingTasks from "@/components/tasksPageComponents/UpcomingTasks"

function TasksPage() {

    return (
        <>
            <div className="flex flex-col p-2 md:grid md:grid-cols-3 gap-5 flex-grow">
                <AllTasks/>
                <UpcomingTasks />
                <ExpiredTasks />
            </div>
        </>
    )
}
export default TasksPage