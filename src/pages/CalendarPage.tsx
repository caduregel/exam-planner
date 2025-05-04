import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabaseClient" // adjust import path

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
            const startDate = new Date(selectedMonth.year, selectedMonth.month, 1)
            const endDate = new Date(selectedMonth.year, selectedMonth.month + 1, 0)

            const { data: tasks, error: taskError } = await supabase
                .from("tasks")
                .select("*")
                .gte("due_date", startDate.toISOString())
                .lte("due_date", endDate.toISOString())

            const { data: exams, error: examError } = await supabase
                .from("exams")
                .select("*")
                .gte("exam_date", startDate.toISOString())
                .lte("exam_date", endDate.toISOString())

            if (taskError || examError) {
                console.error("Error fetching data", taskError || examError)
                return
            }

            const grouped: Record<number, any[]> = {}
                ;[...(tasks || []), ...(exams || [])].forEach((item) => {
                    const date = new Date(item.due_date || item.exam_date)
                    const day = date.getDate()
                    if (!grouped[day]) grouped[day] = []
                    grouped[day].push(item)
                })

            setItemsByDay(grouped)
        }

        fetchData()
    }, [selectedMonth])

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
                            {(itemsByDay[day] || []).map((item, index) => {
                                const isExam = !!item.exam_date
                                const bgColor = isExam ? "bg-blue-500/20" : "bg-green-500/20"

                                return (
                                    <div key={index} className={`text-[10px] md:text-xs truncate rounded px-1 ${bgColor}`}>
                                        {item.title}
                                    </div>
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