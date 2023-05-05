import { UserResponse } from "../../api/models/UserResponse";

interface UserTableProps {
	users: Array<UserResponse>;
	loading: boolean;
}

export function UserTable({ users, loading }: UserTableProps) {
	return (
		<table>
			<thead>
				<tr>
					<td>ID</td>
					<td>Name</td>
					<td>Email</td>
				</tr>
			</thead>
			<tbody>
				{loading && (
					<tr>
						<td>Loading users...</td>
					</tr>
				)}
				{!loading &&
					users.map(user => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
