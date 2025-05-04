import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function CalenderPage() {
    const currentDate = new Date()
    const monthsAhead = 12
    const currentMonthValue = `${currentDate.getMonth()}-${currentDate.getFullYear()}`

    const [selectedMonth, setSelectedMonth] = useState<{ month: number; year: number }>({
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
    })

    const monthOptions = Array.from({ length: monthsAhead }, (_, i) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1)
        return { label: date.toLocaleString("default", { month: "long", year: "numeric" }), month: date.getMonth(), year: date.getFullYear() }
    })

    const daysInMonthCount = new Date(selectedMonth.year, selectedMonth.month + 1, 0).getDate()
    const firstDayOfWeek = new Date(selectedMonth.year, selectedMonth.month, 1).getDay()

    const daysInMonth = Array.from({ length: daysInMonthCount }, (_, i) => i + 1)
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="flex flex-col gap-5 p-5">
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

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2">
                {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium">
                        {day}
                    </div>
                ))}
            </div>

            {/* Dates grid with offset */}
            <div className="grid grid-cols-7 gap-2">
                {/* Empty slots for alignment */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {/* Day cells */}
                {daysInMonth.map((day) => (
                    <div
                        key={day}
                        className="aspect-square rounded-xl bg-muted/50 flex items-center justify-center"
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalenderPage