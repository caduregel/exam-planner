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
  // Handle empty inputs
  if (days.length === 0 || toDos.length === 0) {
    return [];
  }

  // Sort days in ascending order to ensure chronological assignment
  const sortedDays = [...days].sort((a, b) => a.getTime() - b.getTime());
  
  // Calculate how many tasks to assign to each day based on the spread type
  const distribution = calculateDistribution(sortedDays.length, toDos.length, spread);
  
  // Create the result array by mapping tasks to days according to distribution
  const result: { title: string; due_date: Date }[] = [];
  let todoIndex = 0;
  
  for (let dayIndex = 0; dayIndex < sortedDays.length; dayIndex++) {
    const tasksForThisDay = distribution[dayIndex];
    
    for (let i = 0; i < tasksForThisDay; i++) {
      if (todoIndex < toDos.length) {
        result.push({
          title: toDos[todoIndex],
          due_date: sortedDays[dayIndex]
        });
        todoIndex++;
      }
    }
  }
  
  return result;
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

function calculateDistribution(
  numDays: number,
  numTasks: number,
  spread: "even" | "start" | "end" | "middle"
): number[] {
  const distribution = new Array(numDays).fill(0);
  
  if (spread === "even") {
    // Distribute tasks evenly, with any extras going to the first days
    const baseTasksPerDay = Math.floor(numTasks / numDays);
    const extraTasks = numTasks % numDays;
    
    for (let i = 0; i < numDays; i++) {
      distribution[i] = baseTasksPerDay + (i < extraTasks ? 1 : 0);
    }
  } else if (spread === "start") {
    // More tasks at the beginning, decreasing towards the end
    // Create a decreasing curve based on position
    const weights = Array(numDays).fill(0).map((_, i) => {
      return numDays - i;
    });
    distributeThroughWeights(distribution, numTasks, weights);
  } else if (spread === "end") {
    // More tasks at the end, increasing towards the end
    // Create an increasing curve based on position
    const weights = Array(numDays).fill(0).map((_, i) => {
      return i + 1;
    });
    distributeThroughWeights(distribution, numTasks, weights);
  } else if (spread === "middle") {
    // More tasks in the middle, fewer at both ends
    // Create a curve that peaks in the middle
    const weights = Array(numDays).fill(0).map((_, i) => {
      const distanceFromMiddle = Math.abs(i - (numDays - 1) / 2);
      return numDays - 2 * distanceFromMiddle;
    });
    distributeThroughWeights(distribution, numTasks, weights);
  }
  
  return distribution;
}

/**
 * Helper function to distribute tasks according to weights
 * @param distribution Array to be filled with the number of tasks per day
 * @param numTasks Total number of tasks
 * @param weights Weight values for each day
 */
function distributeThroughWeights(
  distribution: number[],
  numTasks: number,
  weights: number[]
): void {
  // Calculate total weight
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  
  // First pass: Distribute tasks based on weights (may have fractional tasks)
  const idealDistribution = weights.map(weight => (weight / totalWeight) * numTasks);
  
  // Second pass: Convert to integers, ensuring we distribute exactly numTasks
  let tasksAssigned = 0;
  
  // First assign the integer part to each day
  for (let i = 0; i < distribution.length; i++) {
    distribution[i] = Math.floor(idealDistribution[i]);
    tasksAssigned += distribution[i];
  }
  
  // Then distribute the remaining tasks based on the fractional parts
  const fractionalParts = idealDistribution.map((ideal, i) => ({
    index: i,
    fractional: ideal - distribution[i]
  }));
  
  // Sort by fractional part in descending order
  fractionalParts.sort((a, b) => b.fractional - a.fractional);
  
  // Assign remaining tasks to days with the highest fractional parts
  for (let i = 0; i < numTasks - tasksAssigned; i++) {
    distribution[fractionalParts[i].index]++;
  }
}


export { dateToDoMatcherFlat, getDates }