import express from 'express';
import dotenv from 'dotenv';
import { getHello } from './controllers/generalControllers.js';
import {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
} from './controllers/postsControllers.js';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application instance

const port = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', getHello);

app.get('/posts', getAllPosts);

app.post('/posts', createPost);

app.get('/posts/:id', getPostById);

app.put('/posts/:id', updatePost);

app.delete('/posts/:id', deletePost);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
