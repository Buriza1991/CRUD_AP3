import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';
import { validateTaskInput } from '../middlewares/validateTask';
import { TaskInput, TaskResponse } from '../types/task';

const router = Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks as TaskResponse[]);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error while fetching tasks' });
  }
});

// Create a new task
router.post('/', validateTaskInput, async (req: Request, res: Response) => {
  try {
    const taskData = req.body as TaskInput;
    const task = await Task.create(taskData);
    res.status(201).json(task as TaskResponse);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', validateTaskInput, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskData = req.body as TaskInput;
    
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.update(taskData);
    res.json(task as TaskResponse);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

export default router; 