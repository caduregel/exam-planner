export interface IdateToDo {
    date: Date
    toDos: string[]
  }
  
  export type SpreadType = "even" | "start" | "end" | "middle"
  
  /**
   * Calculates a weighted index based on normalized position and spread type
   * @param normalized A value between 0 and 1 representing the normalized position
   * @param spread The type of distribution: "even", "start", "end", or "middle"
   * @returns A value between 0 and 1 representing the weighted position
   * 
   * Distribution behaviors:
   * - even: Distributes tasks evenly across all days
   * - start: Concentrates tasks heavily at the beginning with fewer at the end
   * - end: Concentrates tasks heavily at the end with fewer at the beginning
   * - middle: Concentrates tasks in the middle days (bell curve distribution)
   */
  function spreadIndex(normalized: number, spread: SpreadType): number {
    switch (spread) {
      case "even":
        return normalized;
      case "start":
        // Use stronger power for heavier bias toward start (0)
        return Math.pow(normalized, 2); 
      case "end":
        // Use stronger power for heavier bias toward end (1)
        return Math.pow(normalized, 0.5);
      case "middle":
        // Gaussian-like function to create a strong concentration in the middle
        // This creates a proper bell curve centered at 0.5
        return 0.5 + (normalized - 0.5) * Math.exp(-8 * Math.pow(normalized - 0.5, 2));
      default:
        return normalized;
    }
  }
  
  export interface ITaskItem {
    title: string;
    due_date: Date;
  }
  
  /**
   * Distributes to-do items across a range of dates based on specified spread type
   * @param days Array of dates to distribute to-dos across
   * @param toDos Array of to-do items to distribute
   * @param spread The type of distribution to use
   * @returns Array of task items with assigned due dates
   */
  const dateToDoMatcherFlat = (
    days: Date[],
    toDos: string[],
    spread: SpreadType = "even"
  ): ITaskItem[] => {
    // Handle edge cases
    if (!days.length || !toDos.length) {
      return [];
    }
    
    const datesToDos = days.map(day => ({ date: day, toDos: [] as string[] }));
    const maxIndex = days.length - 1;
    
    // Special case for single item
    if (toDos.length === 1) {
      // Place single item based on spread type
      let indexToAdd = 0;
      switch (spread) {
        case "even":
        case "start":
          indexToAdd = 0;
          break;
        case "end":
          indexToAdd = maxIndex;
          break;
        case "middle":
          indexToAdd = Math.floor(maxIndex / 2);
          break;
      }
      datesToDos[indexToAdd].toDos.push(toDos[0]);
    } else {
      // Distribute multiple items
      toDos.forEach((toDo, i) => {
        const normalized = i / (toDos.length - 1);
        const weighted = spreadIndex(normalized, spread);
        const indexToAdd = Math.min(Math.floor(weighted * days.length), maxIndex);
        datesToDos[indexToAdd].toDos.push(toDo);
      });
    }
  
    // Convert to flat task list
    const taskList: ITaskItem[] = [];
    datesToDos.forEach(({ date, toDos }) => {
      toDos.forEach(toDo => {
        taskList.push({ title: toDo, due_date: date });
      });
    });
    
    return taskList;
  };
  
  /**
   * Generates an array of consecutive dates from start to end (inclusive)
   * @param start Start date
   * @param end End date
   * @returns Array of dates
   */
  const getDates = (start: Date, end: Date) => {
    const arr = [];
    for (const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  }
  
  export { dateToDoMatcherFlat, getDates }