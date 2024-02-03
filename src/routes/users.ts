import { Router } from 'express';
import {
  getUsers, createUser, getUser, updateUser, updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);

router.get('/:id', getUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

export default router;
