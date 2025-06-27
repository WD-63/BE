import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

export default usersRouter;