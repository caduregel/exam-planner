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

            {/* Weekday headers mobile */}
            <div className="grid grid-cols-7 gap-2 md:hidden">
                {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium">
                        {day[0]}
                    </div>
                ))}
            </div>

            {/* Weekday headers */}
            <div className="grid-cols-7 gap-1 hidden md:grid">
                {weekdays.map((day) => (
                    <div key={day} className="text-center font-medium">
                        {day}
                    </div>
                ))}
            </div>

            {/* Dates grid with offset */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
                {/* Empty slots for alignment */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {/* Day cells */}
                {daysInMonth.map((day) => (
                    <div
                        key={day}
                        className="aspect-square rounded-md md:rounded-sm bg-muted/50 flex"
                    >
                        <p className="p-1 md:p-2 text-xs md:text-base font-medium">{day}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalenderPage