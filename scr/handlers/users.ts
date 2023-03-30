import { Request, Response } from 'express';
import { User, IUser } from '../models/User';

const addUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        user ? res.json(user) : res.status(404).send({ error: {
            code: 404,
            message: 'User not found'
        }});
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        users ? res.json(users) : res.status(404).send('No users found');
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

export { addUser, getUserById, getAllUsers };
