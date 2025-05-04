import { IExamInfo } from "@/interfaces/IExamInfo"
import ExampInput from "../components/ExamInput"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ExamsPage() {
    const [newExamInfo, setNewExamInfo] = useState<IExamInfo>({
        subject: "",
        date: new Date,
        toDo: [""],
    })

    const handleExamAdd = () => {
        console.log(newExamInfo)
    }

    return (
        <>
            <div className="p-5 w-full">
                <div className="flex gap-5 md:flex-row flex-col md:justify-between">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Upcoming exams</CardTitle>
                        </CardHeader>
<CardContent>
    <p>some content</p>
</CardContent>
                    </Card>
                    <ExampInput examInfo={newExamInfo} setExamInfo={setNewExamInfo} handleExamAdd={handleExamAdd} />
                </div>
            </div>
        </>
    )
}

export default ExamsPage
