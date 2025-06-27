import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './routes/notesRoutes.js';
import sequelize from './DB/sequelize.js';

dotenv.config();
// Initialize Sequelize and sync models
sequelize
	.sync()
	.then(() => {
		console.log('Database connected and models synced successfully.');
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/notes', notesRouter);

app.get('/', (req, res) => {
	res.send('Welcome to the Express and Sequelize example!');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
