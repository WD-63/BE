import { Router } from "express";
import validateBody from "../middleware/validateBody.js";
import { bookSchema } from "../zod/schemas.js";

import {
  createBook,
  deleteOneBook,
  getAllBooks,
  getOneBook,
  updateBook,
} from "../controllers/books.js";

const bookRouter = Router();

bookRouter
  .route("/")
  .get(getAllBooks)
  .post(validateBody(bookSchema), createBook);

bookRouter
  .route("/:id")
  .get(getOneBook)
  .put(validateBody(bookSchema), updateBook)
  .delete(deleteOneBook);
//test
export default bookRouter;
