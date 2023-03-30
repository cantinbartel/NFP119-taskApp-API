import { Router } from 'express';

import {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../handlers/tasks';

const router = Router();

router.get('/', getAllTasks);
router.post('/', addTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
