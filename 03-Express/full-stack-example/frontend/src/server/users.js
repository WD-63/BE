import axios from 'axios';

const getUsers = async (setData) => {
	try {
		const { data } = await axios.get('http://localhost:3000/users');
		if (!data || !Array.isArray(data)) {
			throw new Error('Invalid data format received from the server');
		}
		console.log('Fetched users:', data);
		setData(data);
	} catch (error) {
		console.error('Error fetching users:', error);
	}
};

const createUser = async (user, setData) => {
	try {
		const { data } = await axios.post('http://localhost:3000/users', user);
		if (!data || typeof data !== 'object') {
			throw new Error('Invalid user data received from the server');
		}
		setData((prevData) => [...prevData, data.user]);
	} catch (error) {
		console.error('Error creating user:', error);
	}
};

export { getUsers, createUser };
