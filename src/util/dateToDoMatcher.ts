export interface IdateToDo {
    date: Date
    toDos: string[]
}

type SpreadType = "even" | "start" | "end" | "middle"

function spreadIndex(normalized: number, spread: SpreadType): number {
    switch (spread) {
        case "even":
            return normalized
        case "start":
            return Math.pow(normalized, 0.5) // bias toward 0
        case "end":
            return 1 - Math.pow(1 - normalized, 0.5) // bias toward 1
        case "middle":
            return 0.5 - Math.cos(normalized * Math.PI) / 2 // peak in center
        default:
            return normalized
    }
}

const dateToDoMatcher = (days: Date[], toDos: string[], spread: SpreadType = "even"): IdateToDo[] => {
    const datesToDos: IdateToDo[] = days.map(day => ({ date: day, toDos: [] }))

    const maxIndex = days.length - 1

    toDos.forEach((toDo, i) => {
        const normalized = i / (toDos.length - 1 || 1) // normalize to 0–1
        const weighted = spreadIndex(normalized, spread)
        const indexToAdd = Math.floor(weighted * maxIndex)
        datesToDos[indexToAdd].toDos.push(toDo)
    })

    return datesToDos
}

const getDates = (start: Date, end: Date) => {
    const arr = [];
    for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
}

export { dateToDoMatcher, getDates }