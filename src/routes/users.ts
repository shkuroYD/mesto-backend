import { Router } from 'express';
import {
  getUsers, getUser, updateUser, updateUserAvatar,
} from '../controllers/users';
import { getUserValidator, updateUserValidator, updateUserAvatarValidator } from '../validators/user';

const { celebrate } = require('celebrate');

const router = Router();

router.get('/', getUsers);

router.get('/:id', celebrate(getUserValidator), getUser);

router.patch('/me', celebrate(updateUserValidator), updateUser);

router.patch('/me/avatar', celebrate(updateUserAvatarValidator), updateUserAvatar);

export default router;
