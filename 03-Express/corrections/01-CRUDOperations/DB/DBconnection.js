import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({ connectionString: process.env.PG_URI });

export const connectDB = async (req, res) => {
    try {
        await client.connect();
        const results = await client.query('SELECT $1::text as message', ['Database connected']);
        console.log(results.rows[0].message);
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    };
};


