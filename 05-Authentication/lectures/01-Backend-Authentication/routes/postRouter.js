import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/posts.js";
import validateBody from "../middlewares/validateSchema.js";
import postSchema from "../zod/postSchema.js";

const postsRouter = Router();

postsRouter
  .route("/")
  .get(getAllPosts)
  .post(validateBody(postSchema), createPost);

postsRouter
  .route("/:id")
  .get(getPostById)
  .put(validateBody(postSchema), updatePost)
  .delete(deletePost);

export default postsRouter;
