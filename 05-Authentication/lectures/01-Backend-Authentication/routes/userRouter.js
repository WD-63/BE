import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.js";
import validateBody from "../middlewares/validateSchema.js";
import { userSchema } from "../zod/userSchema.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(validateBody(userSchema), createUser);

usersRouter
  .route("/:id")
  .get(getUserById)
  .put(validateBody(userSchema), updateUser)
  .delete(deleteUser);

export default usersRouter;
