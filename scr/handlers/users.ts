import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import { Task, ITask } from '../models/Task';

export const addUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) res.status(404).send({ error: { code: 404, message: 'User not found' }});
        const tasks = await Task.find({user: id})
        res.json({ user, tasks })
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        users ? res.json(users) : res.status(404).send('No users found');
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};
