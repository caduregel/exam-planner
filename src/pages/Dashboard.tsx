import TodaysTasks from "@/components/TodaysTasks"


function Dashboard() {
    return (
        <>
            <h1 className="text-2xl md:text-4xl md:p-4 p-2 font-bold">Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-5 items-center p-2 md:p-4" >
                <TodaysTasks />
            </div>
        </>
    )
}

export default Dashboard
