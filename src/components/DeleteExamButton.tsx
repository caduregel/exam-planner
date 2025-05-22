import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { deleteExam } from "@/util/api/Delete/DeleteExam"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { Trash2 } from "lucide-react"

function DeleteExamButton({ examId }: { examId: number }) {
    const navigate = useNavigate();
    const handleDelete = () => {
        deleteExam(examId).then((result: boolean) => {
            if (result == true) toast("Exam deleted successfully", {
                description: "The exam has been deleted successfully.",
                duration: 3000,
            })
            navigate("/home", { replace: true })
        }).catch((error) => {
            toast("Error deleting exam", {
                description: "There was a problem deleting this exam, try again later",
                duration: 3000,
            })
            console.log(error)
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="destructive"><Trash2 />Delete Exam</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this exam and its tasks.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete}>Delete Exam</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteExamButton