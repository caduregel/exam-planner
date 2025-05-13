export interface ITask {
    id: number;
    created_at: string;
    due_date: string;
    exam_id: number;
    status: boolean;
    title: string;
}