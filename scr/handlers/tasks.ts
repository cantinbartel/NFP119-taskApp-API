import { Request, Response } from 'express';
import { Task, ITask } from '../models/Task';

/* POST - ADD TASK */
export const addTask = async (req: Request, res: Response): Promise<void> => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET ALL TASKS */
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find().populate('user', 'name email');
        tasks ? res.json(tasks) : res.status(404).send('No tasks found');
    } catch (e) {
        res.status(500).send('Server Error');
    }
};

/* GET TASK BY ID */
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).populate('user', 'name email');
        task ? res.json(task) : res.status(404).send({ error: {
            code: 404,
            message: 'Task not found'
        }});
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET TASKS REALATED TO A USER */
export const getTaskByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        const tasks = await Task.find({ user: userId });
        tasks ? res.json(tasks) : res.status(404).send({ error: {
            code: 404,
            message: 'Tasks not found'
        }});
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* PUT - UPDATE TASK */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedTask: ITask | null = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updatedTask) res.status(404).send('Task not found');
        res.status(200).json({message: 'Task updated', updatedTask});
    } catch(error) {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
    }
}

/* DELETE TASK */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id).exec();
        if (!deletedTask) res.send('Task not found');
        res.status(200).json({message: 'Task deleted', deleteTask});
    } catch(error) {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
    }
}
