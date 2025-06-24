import { client } from '../DB/DBconnection.js';

export const createUsers = async(req, res) => {
    try {
        const { username, email, password } = req.body;
    if (!username|| !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if user already exists
    const foundUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (foundUser.rows.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
    }
    // Insert new user into the database
    const results = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};