export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface TaskAttributes {
  id?: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskInput extends Omit<TaskAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface TaskResponse extends TaskAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export const VALID_STATUSES: TaskStatus[] = ['pending', 'in_progress', 'completed']; 