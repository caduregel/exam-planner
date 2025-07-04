import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabaseClient" // adjust import path
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function CalendarPage() {
    const currentDate = new Date()
    const monthsAhead = 12
    const currentMonthValue = `${currentDate.getMonth()}-${currentDate.getFullYear()}`

    const [selectedMonth, setSelectedMonth] = useState<{ month: number; year: number }>({
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
    })
    const [itemsByDay, setItemsByDay] = useState<Record<number, any[]>>({})

    const monthOptions = Array.from({ length: monthsAhead }, (_, i) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1)
        return { label: date.toLocaleString("default", { month: "long", year: "numeric" }), month: date.getMonth(), year: date.getFullYear() }
    })

    const daysInMonthCount = new Date(selectedMonth.year, selectedMonth.month + 1, 0).getDate()
    const firstDayOfWeek = new Date(selectedMonth.year, selectedMonth.month, 1).getDay()
    const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => i + 1)
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Fetch tasks and exams when month changes
    useEffect(() => {
        async function fetchData() {
            const startDate = new Date(Date.UTC(selectedMonth.year, selectedMonth.month, 1, 0, 0, 0, 0))
            const endDate = new Date(Date.UTC(selectedMonth.year, selectedMonth.month + 1, 0, 23, 59, 59, 999))

            // 1. Fetch tasks for the month
            const { data: tasks, error: taskError } = await supabase
                .from("tasks")
                .select("*")
                .gte("due_date", startDate.toISOString())
                .lte("due_date", endDate.toISOString())

            // 2. Get all unique examIds from those tasks
            const examIdsFromTasks = tasks ? [...new Set(tasks.map((task: any) => task.exam_id).filter(Boolean))] : []

            // 3. Fetch all exams with those IDs (regardless of date)
            let examsById: any[] = []
            if (examIdsFromTasks.length > 0) {
                const { data: examsByTask, error: examsByTaskError } = await supabase
                    .from("exams")
                    .select("*")
                    .in("id", examIdsFromTasks)
                if (examsByTaskError) {
                    console.error("Error fetching exams by id", examsByTaskError)
                } else {
                    examsById = examsByTask || []
                }
            }

            // 4. Fetch exams in the current month (as before)
            const { data: exams, error: examError } = await supabase
                .from("exams")
                .select("*")
                .gte("exam_date", startDate.toISOString())
                .lte("exam_date", endDate.toISOString())

            if (taskError || examError) {
                console.error("Error fetching data", taskError || examError)
                return
            }

            // 5. Merge and deduplicate exams
            const allExams = [...(exams || []), ...examsById]
            const examsMap = new Map()
            allExams.forEach((exam: any) => examsMap.set(exam.id, exam))
            const dedupedExams = Array.from(examsMap.values())

            // 6. Group items by day
            const grouped: Record<number, any[]> = {}
            ;[...(tasks || []), ...dedupedExams].forEach((item) => {
                const date = new Date(item.due_date || item.exam_date)
                const day = date.getDate()
                if (!grouped[day]) grouped[day] = []
                grouped[day].push(item)
            })

            setItemsByDay(grouped)
        }
        fetchData()
    }, [selectedMonth])
    
    console.log(itemsByDay)

    return (
        <div className="flex flex-col gap-5 md:p-5 py-5">
            <Select
                defaultValue={currentMonthValue}
                onValueChange={(value) => {
                    const [month, year] = value.split("-").map(Number)
                    setSelectedMonth({ month, year })
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {monthOptions.map((opt) => (
                        <SelectItem key={`${opt.month}-${opt.year}`} value={`${opt.month}-${opt.year}`}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="grid grid-cols-7 gap-2 md:hidden">
                {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium">
                        {day[0]}
                    </div>
                ))}
            </div>

            <div className="grid-cols-7 gap-1 hidden md:grid">
                {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {daysInMonth.map((day) => (
                    <div key={day} className="aspect-square rounded-md md:rounded-sm bg-muted/50 flex flex-col p-1 overflow-hidden">
                        <p className="text-xs md:text-base font-medium">{day}</p>
                        <div className="flex flex-col gap-0.5 overflow-auto">
                            {
                                (itemsByDay[day] || []).map((item, index) => {
                                    const isExam = !!item.exam_date
                                    let examColor = item.exam_color

                                    // If not an exam, try to find the corresponding exam's color
                                    if (!isExam && item.exam_id && itemsByDay) {
                                        // Search all items for the exam with matching id
                                        for (const dayItems of Object.values(itemsByDay)) {
                                            const foundExam = dayItems.find(
                                                (i: any) => i.exam_date && i.id === item.exam_id
                                            )
                                            if (foundExam && foundExam.exam_color) {
                                                examColor = foundExam.exam_color
                                                break
                                            }
                                        }
                                    }

                                    let style = {}
                                    if (isExam && examColor) {
                                        style = { backgroundColor: examColor }
                                    } else if (examColor) {
                                        // Make the color lighter for tasks (not exams)
                                        const hex = examColor.replace("#", "")
                                        if (hex.length === 6) {
                                            const r = parseInt(hex.slice(0, 2), 16)
                                            const g = parseInt(hex.slice(2, 4), 16)
                                            const b = parseInt(hex.slice(4, 6), 16)
                                            // Blend with white (e.g., 70% white, 30% original color)
                                            const lighten = (c: number) => Math.round(0.7 * 255 + 0.3 * c)
                                            style = {
                                                backgroundColor: `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`
                                            }
                                        } else {
                                            style = { backgroundColor: "rgba(34,197,94,0.2)" }
                                        }
                                    } else {
                                        style = { backgroundColor: "rgba(34,197,94,0.2)" }
                                    }

                                    if (isExam && item.exam_date) {
                                        const examDate = new Date(item.exam_date)
                                        if (
                                            examDate.getFullYear() !== selectedMonth.year ||
                                            examDate.getMonth() !== selectedMonth.month
                                        ) {
                                            // Skip rendering this exam if not in the selected month
                                            return null
                                        }
                                    }

                                    return (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger >
                                                    <div key={index} style={style} className="text-[10px] md:text-xs truncate text-start rounded px-1 dark:text-black">
                                                        {item.title}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {item.exam_date ? (
                                                            <b>{item.title}</b>
                                                        ) : (
                                                            <>
                                                                <b>
                                                                    {
                                                                        // Find the exam for this task
                                                                        (() => {
                                                                            if (item.exam_id && itemsByDay) {
                                                                                for (const dayItems of Object.values(itemsByDay)) {
                                                                                    const foundExam = dayItems.find(
                                                                                        (i: any) => i.exam_date && i.id === item.exam_id
                                                                                    )
                                                                                    if (foundExam) return foundExam.title
                                                                                }
                                                                            }
                                                                            return ""
                                                                        })()
                                                                    }
                                                                </b>
                                                                {item.exam_id && " - "}
                                                                {item.title}
                                                            </>
                                                        )}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )
                                })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarPage