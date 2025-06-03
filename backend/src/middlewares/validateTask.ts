import { Request, Response, NextFunction } from 'express';
import { TaskInput } from '../types/task';

export const validateTaskInput = (req: Request, res: Response, next: NextFunction) => {
  const taskData = req.body as TaskInput;

  if (!taskData.title || taskData.title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (taskData.status && !['pending', 'in_progress', 'completed'].includes(taskData.status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  next();
}; 