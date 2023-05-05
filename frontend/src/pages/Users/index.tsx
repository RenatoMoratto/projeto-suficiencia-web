import { useContext, useEffect, useState } from "react";
import Message from "../../components/Message";
import styles from "./users.module.css";
import { UserService } from "../../api/services/UserService";
import { UserResponse } from "../../api/models/UserResponse";
import { UserTable } from "../../components/UserTable";
import AuthContext from "../../contexts/auth";

export function Users() {
	const { token, logout } = useContext(AuthContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [users, setUsers] = useState<Array<UserResponse>>([]);

	const fetchUsers = async () => {
		try {
			setIsLoading(true);
			const users = await UserService.getAll(token);

			setUsers(users);
		} catch (e) {
			setUsers([]);
			setErrorMessage(String(e));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<main>
			<section className={styles.title}>
				<h2>Users</h2>
				<div className={styles.actions}>
					<button className={styles.logout} onClick={logout}>
						Logout
					</button>
					<button>New User</button>
				</div>
			</section>
			{errorMessage.length > 0 && <Message>{errorMessage}</Message>}
			<UserTable users={users} loading={isLoading} />
		</main>
	);
}
