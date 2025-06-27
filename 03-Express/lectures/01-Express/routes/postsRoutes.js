import { Router } from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postsControllers.js';

const postsRouter = Router();

// postsRouter.get('/', getAllPosts);
// postsRouter.post('/', createPost);
postsRouter.route('/').get(getAllPosts).post(createPost);

// postsRouter.get('/:id', getPostById);
// postsRouter.put('/:id', updatePost);
// postsRouter.delete('/:id', deletePost);
postsRouter.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default postsRouter;