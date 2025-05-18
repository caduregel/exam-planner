import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { SelectGroup } from "@radix-ui/react-select"
import useSWR from "swr"
import { getExams } from "@/util/api/Get/GetExams"
import { IExamInfo } from "@/interfaces/IExamInfo"

interface ExamFilterDropdownProps {
    currentExam: string
    setCurrentExam: (exam: string) => void
}

function ExamFilterDropdown({ currentExam, setCurrentExam }: ExamFilterDropdownProps) {
    const { data: exams, error, isLoading } = useSWR<IExamInfo[]>("exams", () => getExams())


    return (
        <Select value={currentExam} onValueChange={setCurrentExam}>
            <SelectTrigger className="w-1/2 hover:cursor-pointer">
                <Filter />
                <SelectValue placeholder="Filter by Exam" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Exams</SelectLabel>
                    <SelectItem value="all" className="hover:cursor-pointer">All</SelectItem>
                    {isLoading && <SelectItem value="loading">Loading...</SelectItem>}
                    {error && <SelectItem value="error">Error loading exams</SelectItem>}
                    {exams && exams.map((exam) => (
                        <SelectItem key={exam.id} value={String(exam.id)} className="hover:cursor-pointer">
                            {exam.title}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default ExamFilterDropdown