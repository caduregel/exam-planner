import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function UpcomingTasks() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>This week</CardTitle>
                <CardDescription>All tasks of this week</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <p>Task 1</p>
                <p>Task 2</p>
                <p>Task 3</p>
            </CardContent>
        </Card>
    )
}

export default UpcomingTasks
