import { IExamInfo } from "@/interfaces/IExamInfo";

function ExamPageHeader({ exam }: { exam: IExamInfo }) {
    return (
        <div className="flex flex-row items-center justify-between md:p-4- p-2">
            <h1 className="text-2xl md:text-4xl font-bold">{exam?.title}</h1>
            {exam?.exam_date && (
                <div className="flex flex-col md:items-end">
                    <span className="text-md md:text-lg text-gray-500 dark:text-gray-300">
                        {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-400">
                        {(() => {
                            const today = new Date();
                            const examDate = new Date(exam.exam_date);
                            const diffTime = examDate.getTime() - today.setHours(0, 0, 0, 0);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            if (diffDays > 0) {
                                return `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
                            } else if (diffDays === 0) {
                                return "Exam is today";
                            } else {
                                return "Exam has passed";
                            }
                        })()}
                    </span>
                </div>
            )}
        </div>
    )
}

export default ExamPageHeader