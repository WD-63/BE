import { Router } from 'express';
// import asyncHandler from '../utils/asyncHandler.js';
import postSchema from '../zod/postSchema.js';
import validateSchema from '../middleware/validateSchema.js';

import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
} from '../controllers/posts.js';

const postRouter = Router();

postRouter
    .route('/')
    .get(getPosts)
    .post(validateSchema(postSchema), createPost);
postRouter
    .route('/:id')
    .get(getPostById)
    .put(validateSchema(postSchema), updatePost)
    .delete(deletePost);

export default postRouter;
