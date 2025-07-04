import { Router } from "express";
import validateBody from "../middleware/validateBody.js";
import { readingListSchema, userSchema } from "../zod/schemas.js";

import {
  addBookToList,
  createUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  removeBookFromList,
  updateBookInList,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validateBody(userSchema), createUser);

userRouter
  .route("/:id")
  .get(getOneUser)
  .put(validateBody(userSchema), updateUser)
  .delete(deleteOneUser);

userRouter
  .route("/:id/books")
  .post(validateBody(readingListSchema), addBookToList);

userRouter
  .route("/:id/books/:bookId")
  .put(
    validateBody(readingListSchema.omit({ bookRefId: true })),
    updateBookInList
  )
  .delete(removeBookFromList);

export default userRouter;
