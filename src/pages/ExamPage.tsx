import ExamPageHeader from "@/components/ExamPageComponents/ExamPageHeader"
import ExamPageTasks from "@/components/ExamPageComponents/ExamPageTasks"
import TasksDistributionGraph from "@/components/ExamPageComponents/TasksDistributionGraph"
import ExamPageHeaderSkeleton from "@/components/skeletons/ExamPageHeaderSkeleton"
import TasksQuickStats from "@/components/TasksQuickStats"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { IExamInfo } from "@/interfaces/IExamInfo"

import { getExamById } from "@/util/api/Get/GetExams"
import { useParams } from "react-router"
import useSWR from "swr"
import { useState } from "react"
// import AddTaskDialogContent from "@/components/ExamPageComponents/AddTaskDialogContent"
import RescheduleExamDialogContent from "@/components/ExamPageComponents/RescheduleExamDialogContent"
import EditExamDialogContent from "@/components/ExamPageComponents/EditExamDialogContent"
import { CalendarSync, SquarePen } from "lucide-react"
import DeleteExamButton from "@/components/DeleteExamButton"

function ExamPage() {
    const { id } = useParams()
    const { data: exam, error, isLoading } = useSWR<IExamInfo>(`exams/${id}`, () => getExamById(Number(id)))
    console.log(exam)
    // Dialog open states
    // const [addTaskOpen, setAddTaskOpen] = useState(false)
    const [rescheduleOpen, setRescheduleOpen] = useState(false)
    const [editExamOpen, setEditExamOpen] = useState(false)

    return (
        <>
            {
                isLoading || !exam ? (
                    <ExamPageHeaderSkeleton />
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">Error loading exam data</p>
                    </div>
                ) : (
                    <ExamPageHeader exam={exam} />
                )
            }

            {/* Action buttons */}
            <div className="flex flex-col gap-2 justify-end my-5 mx-5 mb-2 md:flex-row">
                {/* <Dialog open={addTaskOpen} onOpenChange={setAddTaskOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default" className="hover:cursor-pointer"><Plus /> Add Task</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <AddTaskDialogContent />
                    </DialogContent>
                </Dialog> */}
                <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="hover:cursor-pointer"><CalendarSync /> Reschedule Exam</Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-4 md:max-w-[400px] max-h-[90vh] overflow-y-auto">
                        <div>
                            {
                                exam
                                    ? <RescheduleExamDialogContent exam={exam} />
                                    : null
                            }
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={editExamOpen} onOpenChange={setEditExamOpen}>
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="hover:cursor-pointer"><SquarePen />Edit Exam</Button>
                    </DialogTrigger>
                    <DialogContent >
                        {
                            exam
                                ? <EditExamDialogContent exam={exam} closeDialog={() => setEditExamOpen(!editExamOpen)} />
                                : null
                        }

                    </DialogContent>
                </Dialog>
                <DeleteExamButton examId={Number(id)} />
            </div>

            <div className="flex flex-col md:grid grid-cols-2 gap-5 m-2 mx-5">
                <div className="grid-stat-2 grid-end-3 flex flex-col gap-5">
                    <ExamPageTasks exam_id={Number(id)} />
                </div>
                <div className="grid-start-1 grid-end-2 flex flex-col gap-5">
                    <TasksQuickStats exam_id={Number(id)} />
                    <TasksDistributionGraph exam_id={Number(id)} />
                </div>
            </div>
        </>
    )
}

export default ExamPage