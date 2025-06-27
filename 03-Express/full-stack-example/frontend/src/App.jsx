import './App.css';
import { useState, useEffect } from 'react';
import { getUsers } from './server/users';
import Register from './components/Register';
import UsersList from './components/UsersList';

function App() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		getUsers(setUsers);
	}, []);

	console.log(users);
	return (
		<div className='App'>
			<h1>Users</h1>
			{error && <p className='error'>{error}</p>}
			<Register users={users} setUsers={setUsers} />
			<h2>List of Users</h2>
			<p>Here is the list of users registered in the system:</p>
			<UsersList users={users} />
			{users.length === 0 && <p>No users registered yet.</p>}
		</div>
	);
}

export default App;
