import { IdateToDo } from "@/util/dateToDoMatcher";
import { Card, CardContent, CardTitle } from "./ui/card";

function DateToDo({ date, toDos }: IdateToDo) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const dateString = `${weekday[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]}`

    return (
        <>
            <Card className="p-5 rounded-none md:min-h-40 md:min-w-40 min-h-[60vw] min-w-[60vw]">
                <CardTitle className="flex items-start px-6">{dateString} </CardTitle>
                <CardContent className="flex flex-col items-start">
                    {toDos.map(todo => <p className="">{todo}</p>)}
                </CardContent>
            </Card>
        </>
    )
}

export default DateToDo