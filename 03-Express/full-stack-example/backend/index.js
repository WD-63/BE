import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './DB/DBconnection.js';
import usersRouter from './routes/usersRoutes.js';

// Load environment variables from .env file
dotenv.config();
connectDB(); // Connect to the database
const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
	// res.status(200).json({message: "Welcome to the CRUD Operations API"});
	res.send('Welcome to the CRUD Operations API');
});

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);
