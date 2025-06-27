import express from 'express';
import dotenv from 'dotenv';
import { getHello } from './controllers/generalControllers.js';
import postsRouter from './routes/postsRoutes.js';
import { connectDB } from './DB/DBconnection.js';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application instance

const port = process.env.PORT || 4000;
connectDB(); // Connect to the database
// middlewares
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/posts", postsRouter); // Use the posts router for routes starting with /posts

// Routes
app.get('/', getHello);

// listen method
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
