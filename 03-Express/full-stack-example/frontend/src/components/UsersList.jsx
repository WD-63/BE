
function UsersList({users}) {
	return (
		<ul>
			{users.map((user) => (
				<li key={user.user_id}>
					{user.first_name} {user.last_name} - {user.age}
				</li>
			))}
		</ul>
	);
}

export default UsersList;
