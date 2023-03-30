import { Router } from 'express';

import { getUserById, getAllUsers, addUser } from '../handlers/users';

const router = Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', getUserById);

export default router;
