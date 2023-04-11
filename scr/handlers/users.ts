import { Request, Response } from 'express';
import { User } from '../models/User';

/* POST - ADD USER */
export const addUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET USER BY ID */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) res.status(404).send({ error: { code: 404, message: 'User not found' }});
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET ALL USERS */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        users ? res.json(users) : res.status(404).send('No users found');
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};
