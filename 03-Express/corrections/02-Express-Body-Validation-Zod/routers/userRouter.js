import { Router } from 'express';
import validateSchema from '../middleware/validateSchema.js';
import userSchema from '../zod/userSchema.js';
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from '../controllers/users.js';
const userRouter = Router();

userRouter
    .route('/')
    .get(getUsers)
    .post(validateSchema(userSchema), createUser);
userRouter
    .route('/:id')
    .get(getUserById)
    .put(validateSchema(userSchema), updateUser)
    .delete(deleteUser);

export default userRouter;
