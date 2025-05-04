import { useParams } from "react-router"

function ExamPage() {
    const { id } = useParams()

    return (
        <>
            <div className="flex flex-col md:items-start gap-5 items-center" >
                <p>Exam {id} page</p>
            </div>
        </>
    )
}

export default ExamPage
