import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function ExpiredTasks() {
  return (
                    <Card>
                    <CardHeader>
                        <CardTitle>Past due tasks</CardTitle>
                        <CardDescription>Tasks that havent been completed before their due date</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Task 1</p>
                        <p>Task 2</p>
                        <p>Task 3</p>
                    </CardContent>
                </Card>
  )
}

export default ExpiredTasks