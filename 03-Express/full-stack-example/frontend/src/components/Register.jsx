import { useState } from 'react';
import { createUser } from '../server/users';

function Register({ users, setUsers }) {
	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		age: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser(() => ({
			...user,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!user.first_name || !user.last_name || !user.age) {
			return alert('Please fill in all fields');
		}
		createUser(user, setUsers);
		setUser({
			first_name: '',
			last_name: '',
			age: '',
		});
		alert('User registered successfully');
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='firstName'>First Name:</label>
					<input
						onChange={handleChange}
						value={user.first_name}
						type='text'
						id='firstName'
						name='first_name'
						required
					/>
				</div>
				<div>
					<label htmlFor='lastName'>Last Name:</label>
					<input
						onChange={handleChange}
						value={user.last_name}
						type='text'
						id='lastName'
						name='last_name'
						required
					/>
				</div>
				<div>
					<label htmlFor='age'>Age:</label>
					<input
						onChange={handleChange}
						value={user.age}
						type='number'
						id='age'
						name='age'
						required
					/>
				</div>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}

export default Register;
