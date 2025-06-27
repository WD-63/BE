import pg from 'pg';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export const client = new Client({ connectionString: process.env.PG_URI });

export const connectDB = async (req, res) => {
	try {
		await client.connect();
		const results = await client.query('SELECT $1::text as message', [
			'Database connected successfully!',
		]);
		console.log(results.rows[0].message); // Log the message from the database
	} catch (error) {
		console.error('Error connecting to the database:', error);
		res.status(500).json({ error: 'Database connection failed' });
	}
};
