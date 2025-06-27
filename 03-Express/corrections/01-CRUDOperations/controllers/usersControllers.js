import { client } from '../DB/DBconnection.js';

const getAllUsers = async (req, res) => {
	try {
		const results = await client.query('SELECT * FROM users');
		const users = results.rows;
		res.status(200).json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = parseInt(id, 10);
		const results = await client.query(
			'SELECT * FROM users WHERE user_id = $1',
			[userId]
		);
		const user = results.rows[0];
		if (!user) {
			return res.status(404).json({ message: `User with ID: ${id} not found` });
		}
		return res.status(200).json(user);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const createUser = async (req, res) => {
	try {
		const { first_name, last_name, age } = req.body;
		if (!first_name || !last_name || !age) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const foundUser = await client.query(
			'SELECT * FROM users WHERE first_name = $1 AND last_name = $2',
			[first_name, last_name]
		);

		if (foundUser.rows.length > 0) {
			return res.status(409).json({ message: 'User already exists' });
		}

		const results = await client.query(
			'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
			[first_name, last_name, age]
		);
		const newUser = results.rows[0];
		return res.status(201).json({ message: 'User created', user: newUser });
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const updateUser = async (req, res) => {
	try {
		const userId = parseInt(req.params.id, 10);
		const { first_name, last_name, age } = req.body;
		if (!first_name || !last_name || !age) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const foundUser = await client.query(
			'SELECT * FROM users WHERE user_id = $1',
			[userId]
		);
		if (foundUser.rows.length === 0) {
			return res
				.status(404)
				.json({ message: `User with ID: ${userId} not found` });
		}
		const results = await client.query(
			'UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE user_id = $4 RETURNING *',
			[first_name, last_name, age, userId]
		);
        const updatedUser = results.rows[0];

		res
			.status(200)
			.json({ message: `User with ID: ${userId} updated`, user: updatedUser });
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const deleteUser = async (req, res) => {
	try {
		const userId = parseInt(req.params.id, 10);
        const foundUser = await client.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        if (foundUser.rows.length === 0) {
            return res.status(404).json({ message: `User with ID: ${userId} not found` });
        }
        await client.query('DELETE FROM users WHERE user_id = $1', [userId]);
		res.status(200).json({ message: `User with ID: ${userId} deleted`, user: foundUser.rows[0] });
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
